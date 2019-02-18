import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { TagCategoriesSchema } from './tagCategories';
export const Tags = new Mongo.Collection('tags');

/**
 * Each document in Tags must have:
 * _id
 * title (tag title)
 * category: {_id, title} (referenced from TagCategories)
 * Note that TagCategories are denormalized here because the application will rarely
 * change Tags and TagCategories, but will frequently read from both collections
 */
Tags.schema = new SimpleSchema({
  _id: { type: SimpleSchema.RegEx.Id },
  title: { type: String },
  category: TagCategoriesSchema
});
Tags.attachSchema(Tags.schema);

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
