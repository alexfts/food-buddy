import { Meteor } from 'meteor/meteor';
import { Tags } from '../../api/tags';
import { TagCategories } from '../../api/tagCategories';
import { Accounts } from 'meteor/accounts-base';
import { CuisineTags, FoodtypeTags, DietaryPreferenceTags } from './tagsData';

Meteor.startup(() => {
  if (TagCategories.find().count() === 0) {
    TagCategories.insert({ title: 'Cuisine' });
    TagCategories.insert({ title: 'Food Types' });
    TagCategories.insert({ title: 'Dietary Preferences' });
    TagCategories.insert({ title: 'Extra' });

    const errors = TagCategories.simpleSchema()
      .namedContext()
      .validationErrors();
    if (errors && errors.length > 0) {
      console.log(errors);
    }
  }

  if (Tags.find().count() === 0) {
    const tags = [...CuisineTags, ...FoodtypeTags, ...DietaryPreferenceTags];
    tags.forEach(tag => {
      Tags.insert({
        title: tag.title,
        category: TagCategories.findOne({ title: tag.category })
      });
    });
    const errors = Tags.simpleSchema()
      .namedContext()
      .validationErrors();
    if (errors && errors.length > 0) {
      console.log(errors);
    }
  }

  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      email: 'test@test.com',
      password: 'password',
      username: 'test',
      profile: {
        name: 'bob',
        tags: Tags.find({
          title: { $in: ['Mediterranean', 'Gluten free', 'Burgers'] }
        }).map(tag => tag._id)
      }
    });
    Accounts.createUser({
      email: 'hobs@hobs.com',
      password: 'hobs',
      username: 'username',
      profile: {
        name: 'hobs',
        tags: Tags.find({ title: { $in: ['Vegetarian', 'Burgers'] } }).map(
          tag => tag._id
        )
      }
    });
    Accounts.createUser({
      email: 'a@b.c',
      password: 'password',
      username: 'johndoe',
      profile: {
        name: 'johndoe',
        tags: Tags.find({ title: { $in: ['Burgers', 'Mediterranean'] } }).map(
          tag => tag._id
        )
      }
    });
    Accounts.createUser({
      email: 'not@onboarded.com',
      password: 'password',
      username: 'not_onboarded'
    });
    const errors = Meteor.users
      .simpleSchema()
      .namedContext()
      .validationErrors();
    if (errors && errors.length > 0) {
      console.log(errors);
    }
  }
});
