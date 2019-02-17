import { Meteor } from 'meteor/meteor';
import { Tags } from './tags';
import SimpleSchema from 'simpl-schema';
import { TagCategories } from './tagCategories';

// Deny all client-side updates to user documents
Meteor.users.deny({
  update() {
    return true;
  }
});

/**
 * Users collection must contain profile object with:
 * tags (a list of _id's from Tags collection) -- optional before onboarding
 * favourites (a list of place objects from google api) -- optional
 */
const UserProfileSchema = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  tags: {
    type: Array,
    optional: true
  },
  'tags.$': {
    type: SimpleSchema.RegEx.Id
  },
  favourites: {
    type: Array,
    optional: true
  },
  'favourites.$': {
    type: Object,
    blackbox: true,
    optional: true
  }
});

const UserSchema = new SimpleSchema({
  username: {
    type: String,
    optional: true
  },
  emails: {
    type: Array,
    optional: true
  },
  'emails.$': {
    type: Object
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: UserProfileSchema,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: Array,
    optional: true
  },
  'roles.$': {
    type: String
  },
  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true
  }
});

Meteor.users.attachSchema(UserSchema);

const getAllRestrictions = allUserTagPairs => {
  allUserTagPairs = allUserTagPairs.reduce((acc, { tagid, user }) => {
    if (acc.hasOwnProperty(tagid)) {
      acc[tagid].push(user);
    } else {
      acc[tagid] = [user];
    }
    return acc;
  }, {});

  allUserTagPairs = Object.keys(allUserTagPairs)
    .filter(tagid => {
      const tag = Tags.findOne(tagid);
      return tag.category.title === 'Dietary Preferences';
    })
    .map(tagid => ({
      tagids: [tagid],
      users: allUserTagPairs[tagid]
    }));
  return allUserTagPairs;
};

const getTopIndividualTags = allUserTagPairs => {
  allUserTagPairs = allUserTagPairs.reduce((acc, { tagid, user }) => {
    if (acc.hasOwnProperty(tagid)) {
      acc[tagid].push(user);
    } else {
      acc[tagid] = [user];
    }
    return acc;
  }, {});

  allUserTagPairs = Object.keys(allUserTagPairs)
    .filter(tagid => {
      const tag = Tags.findOne(tagid);
      return (
        tag.category.title !== 'Dietary Preferences' &&
        allUserTagPairs[tagid].length > 1
      );
    })
    .map(tagid => ({
      tagids: [tagid],
      users: allUserTagPairs[tagid]
    }));
  return allUserTagPairs;
};

const getUserIntersection = (users1, users2) => {
  let results = [];
  for (let user1 of users1) {
    if (users2.find(user2 => user2._id === user1._id)) {
      results.push(user1);
    }
  }
  return results;
};

const findCommonTags = (cuisineTagUserPairs, foodTypeTagUserPairs) => {
  const cuisineTags = Object.keys(cuisineTagUserPairs);
  const foodTypeTags = Object.keys(foodTypeTagUserPairs);
  const results = [];
  cuisineTags.forEach(cuisineTagId => {
    foodTypeTags.forEach(foodTypeTagId => {
      const users = getUserIntersection(
        cuisineTagUserPairs[cuisineTagId],
        foodTypeTagUserPairs[foodTypeTagId]
      );

      if (users.length > 1) {
        results.push({
          tagids: [cuisineTagId, foodTypeTagId],
          users
        });
      }
    });
  });
  return results;
};

const getTopIntersectingTags = allUserTagPairs => {
  allUserTagPairs = allUserTagPairs.reduce((acc, { tagid, user }) => {
    if (acc.hasOwnProperty(tagid)) {
      acc[tagid].push(user);
    } else {
      acc[tagid] = [user];
    }
    return acc;
  }, {});

  const cuisineTagIds = Object.keys(allUserTagPairs).filter(tagid => {
    const tag = Tags.findOne(tagid);
    return tag.category.title === 'Cuisine';
  });
  const foodTypeTagIds = Object.keys(allUserTagPairs).filter(tagid => {
    const tag = Tags.findOne(tagid);
    return tag.category.title === 'Food Types';
  });

  const cuisineTagUserPairs = cuisineTagIds.reduce((acc, tagid) => {
    if (allUserTagPairs[tagid].length > 1) {
      acc[tagid] = allUserTagPairs[tagid];
    }
    return acc;
  }, {});
  const foodTypeTagUserPairs = foodTypeTagIds.reduce((acc, tagid) => {
    if (allUserTagPairs[tagid].length > 1) {
      acc[tagid] = allUserTagPairs[tagid];
    }
    return acc;
  }, {});

  let commonTags = findCommonTags(cuisineTagUserPairs, foodTypeTagUserPairs);
  return commonTags;
};

Meteor.methods({
  'users.updateUserTags'(tagids) {
    if (!this.userId) {
      throw new Meteor.Error(
        'users.updateUserTags.not-authorized',
        'You are not logged in.'
      );
    }
    if (!tagids || !(tagids instanceof Array)) {
      throw new Meteor.Error(
        'users.updateUserTags.invalid-input',
        'Invalid input'
      );
    }

    // throw error if any of tagids are not in DB
    tagids.map(tagid => {
      const tag = Tags.findOne({ _id: tagid });
      if (!tag)
        throw new Meteor.Error(
          'users.updateUserTags.invalid-input',
          'Invalid input.'
        );
    });

    Meteor.users.update(this.userId, {
      $set: { 'profile.tags': tagids }
    });
  },

  'users.changeFavourites'(place, details, shouldAdd) {
    if (!this.userId) {
      throw new Meteor.Error(
        'users.updateUserTags.not-authorized',
        'You are not logged in.'
      );
    }

    const profile = Meteor.user().profile;
    if (!profile) {
      throw new Meteor.Error(
        'users.updateUserTags.not-onboarded',
        'You are not onboarded.'
      );
    }
    const placeObject = { ...place, details };

    if (profile && profile.favourites) {
      if (shouldAdd) {
        Meteor.users.update(
          { _id: this.userId },
          {
            $addToSet: { 'profile.favourites': placeObject }
          }
        );
      } else {
        Meteor.users.update(this.userId, {
          $pull: { 'profile.favourites': { place_id: place.place_id } }
        });
      }
    } else if (shouldAdd) {
      Meteor.users.update(this.userId, {
        $set: { 'profile.favourites': [placeObject] }
      });
    }
  },

  'users.updateUserTagsByCategory'(tagids, categoryid) {
    if (!this.userId) {
      throw new Meteor.Error(
        'users.updateUserTagsByCategory.not-authorized',
        'You are not logged in.'
      );
    }
    if (!tagids || !(tagids instanceof Array)) {
      throw new Meteor.Error(
        'users.updateUserTagsByCategory.invalid-input',
        'Invalid input'
      );
    }
    const category = TagCategories.findOne(categoryid);
    if (!category)
      throw new Meteor.Error(
        'users.updateUserTagsByCategory.invalid-category',
        'Invalid category.'
      );

    // throw error if any of tagids are not in DB
    tagids.map(tagid => {
      const tag = Tags.findOne({ _id: tagid });
      if (!tag || tag.category._id !== categoryid)
        throw new Meteor.Error(
          'users.updateUserTagsByCategory.invalid-input',
          'Invalid input.'
        );
    });
    let userTags =
      Meteor.user().profile && Meteor.user().profile.tags
        ? Meteor.user().profile.tags
        : [];
    userTags = userTags.filter(tagid => {
      const tag = Tags.findOne(tagid);
      return tag.category._id !== categoryid;
    });

    Meteor.users.update(this.userId, {
      $set: { 'profile.tags': [...userTags, ...tagids] }
    });
  },

  'users.updateName'(name) {
    if (!this.userId) {
      throw new Meteor.Error(
        'users.updateName.not-authorized',
        'You are not logged in.'
      );
    }

    if (!name || !(name instanceof String)) {
      throw new Meteor.Error('users.updateName.invalid-name', 'Invalid name.');
    }

    Meteor.users.update(this.userId, {
      $set: { 'profile.name': name }
    });
  },

  'users.findMatches'(userids) {
    if (!this.userId) {
      throw new Meteor.Error(
        'users.findMatches.not-authorized',
        'You are not logged in.'
      );
    }
    if (!userids || !(userids instanceof Array)) {
      throw new Meteor.Error(
        'users.findMatches.invalid-input',
        'Invalid input.'
      );
    }

    // get all users by userids
    const users = userids.map(userid => {
      const user = Meteor.users.findOne(
        { _id: userid },
        { fields: { username: 1, profile: 1, 'emails.address': 1 } }
      );
      if (!user)
        throw new Meteor.Error(
          'users.findMatches.invalid-input',
          'Invalid input.'
        );
      return user;
    });

    const getUserTagPairs = user => {
      return user.profile.tags.map(tagid => ({ tagid, user }));
    };

    let allUserTagPairs = users
      .map(getUserTagPairs)
      .reduce((a, b) => a.concat(b), []); // flatten all tag-user pairs

    const topIntersectingTags = getTopIntersectingTags(allUserTagPairs);
    const topIndividualTags = getTopIndividualTags(allUserTagPairs);
    const results = [...topIntersectingTags, ...topIndividualTags];
    results.sort((a, b) => {
      return b.users.length - a.users.length;
    });
    const restrictions = getAllRestrictions(allUserTagPairs);
    return { matches: results, restrictions };
  }
});

if (Meteor.isServer) {
  Meteor.publish('users', function usersPublication() {
    if (!this.userId) {
      throw new Meteor.Error(
        'users.publish.not-authorized',
        'You are not logged in.'
      );
    }
    return Meteor.users.find(
      {},
      { fields: { username: 1, profile: 1, 'emails.address': 1 } }
    );
  });
}
