import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  const googleMaps = require('@google/maps').createClient({
    key: 'AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E'
  });

  Meteor.methods({
    async 'googleMapsWebsite.geocode'(placeid) {
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
