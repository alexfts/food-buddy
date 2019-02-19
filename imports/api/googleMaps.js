import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  const googleMaps = require('@google/maps').createClient({
    key:
      process.env.GOOGLE_MAPS_KEY || 'AIzaSyA27rwWEMvWiG5EFFRJP6czivVgL4AMDTQ'
  });

  Meteor.methods({
    async 'googleMaps.getDetails'(placeid) {
      if (!this.userId) {
        throw new Meteor.Error(
          'users.updateUserTags.not-authorized',
          'You are not logged in.'
        );
      }

      const data = new Promise((resolve, reject) => {
        googleMaps.place(
          {
            placeid: placeid,
            language: 'en'
          },
          (err, res) => {
            if (!err) return resolve(res.json);
            reject(err);
          }
        );
      });
      return await data;
    }
  });
}
