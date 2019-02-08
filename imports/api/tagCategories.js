import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const TagCategories = new Mongo.Collection('tagCategories');

if (Meteor.isServer) {
  Meteor.publish('tagCategories', function tagCategoriesPublication() {
    if (!this.userId) {
      throw new Meteor.Error(
        'tagCategories.publish.not-authorized',
        'You are not logged in.'
      );
    }
    return TagCategories.find({});
  });
}
