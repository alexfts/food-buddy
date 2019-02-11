import { Meteor } from 'meteor/meteor';
import { Tags } from '../../api/tags';
import { TagCategories } from '../../api/tagCategories';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(async () => {
  if (TagCategories.find().count() === 0) {
    try {
      await TagCategories.insert({ title: 'Cuisine' });
      await TagCategories.insert({ title: 'Food types' });
      await TagCategories.insert({ title: 'Preferences' });
      await TagCategories.insert({ title: 'Extra' });
    } catch (error) {
      console.log(error);
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
