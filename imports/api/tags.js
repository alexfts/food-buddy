import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

// Meteor.methods({
//     'tags.onboardInput'(tag){
//         if(){
//             throw new Meteor.Error(
//                 'tags.onboardInput.not-authorized',
//             )
//         }
//     }
// })

export const Tags = new Mongo.Collection('tags');
