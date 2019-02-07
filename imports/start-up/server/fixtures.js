import { Meteor } from 'meteor/meteor';
import { Tags } from '../../api/tags';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  if (Tags.find().count() === 0) {
    Tags.insert({ title: 'Seafood' });
    Tags.insert({ title: 'Vegetarian' });
    Tags.insert({ title: 'Burgers' });
  }

  if (Meteor.users.find().count() === 0) {
    user = Accounts.createUser({
      email: 'test@test.com',
      password: 'password',
      username: 'test',
      profile: {
        name: 'bob',
        tags: Tags.find({ title: 'Seafood' }).map(tag => tag._id)
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
