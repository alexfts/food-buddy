import { Meteor } from 'meteor/meteor';
import { Tags } from '../../api/tags';
import { TagCategories } from '../../api/tagCategories';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  if (TagCategories.find().count() === 0) {
    TagCategories.insert({ title: 'Cuisine' });
    TagCategories.insert({ title: 'Food types' });
    TagCategories.insert({ title: 'Preferences' });
    TagCategories.insert({ title: 'Extra' });
  }

  if (Tags.find().count() === 0) {
    Tags.insert({
      title: 'Mediterranean',
      categoryid: TagCategories.findOne({ title: 'Cuisine' })._id
    });
    Tags.insert({
      title: 'Vegetarian',
      categoryid: TagCategories.findOne({ title: 'Preferences' })._id
    });
    Tags.insert({
      title: 'Burgers',
      categoryid: TagCategories.findOne({ title: 'Food types' })._id
    });
    Tags.insert({
      title: 'Gluten free',
      categoryid: TagCategories.findOne({ title: 'Preferences' })._id
    });
  }

  if (Meteor.users.find().count() === 0) {
    user = Accounts.createUser({
      email: 'test@test.com',
      password: 'password',
      username: 'test',
      profile: {
        name: 'bob',
        tags: Tags.find({
          title: { $in: ['Mediterranean', 'Gluten free'] }
        }).map(tag => tag._id)
      }
    });
    user = Accounts.createUser({
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
  }
});
