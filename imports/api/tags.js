import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const Tags = new Mongo.Collection('tags');

Meteor.methods({
  'tags.toggleTag'(tag) {
    if (tag.owner !== this.userId) {
      throw new Meteor.Error(
        'tags.toggleTag.not-authorized',
        'You are not allowed to change tags.'
      );
    }
  }
});

if (Meteor.isServer) {
  Meteor.publish('tags', function tagsPublication() {
    if (!this.userId) {
      throw new Meteor.Error(
        'tags.publish.not-authorized',
        'You are not logged in.'
      );
    }
    return Tags.find({});
  });
}
