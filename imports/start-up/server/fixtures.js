import { Meteor } from 'meteor/meteor';
import { Tags } from '../../api/tags';
import { TagCategories } from '../../api/tagCategories';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  if (TagCategories.find().count() === 0) {
    TagCategories.insert({ titl: 'Cuisine' });
    TagCategories.insert({ title: 'Food types' });
    TagCategories.insert({ title: 'Preferences' });
    TagCategories.insert({ title: 'Extra' });

    const errors = TagCategories.simpleSchema()
      .namedContext()
      .validationErrors();
    if (errors) {
      console.log(errors);
    }
  }

  if (Tags.find().count() === 0) {
    Tags.insert(
      {
        title: 'Mediterranean',
        category: TagCategories.findOne({ title: 'Cuisine' })
      },
      (error, result) => {
        if (error) {
          console.log(error.invalidKeys);
        }
      }
    );
    Tags.insert({
      title: 'Vegetarian',
      category: TagCategories.findOne({ title: 'Preferences' })
    });
    Tags.insert({
      title: 'Burgers',
      category: TagCategories.findOne({ title: 'Food types' })
    });
    Tags.insert({
      title: 'Gluten free',
      category: TagCategories.findOne({ title: 'Preferences' })
    });
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
  }
});
