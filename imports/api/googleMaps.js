import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  const googleMaps = require('@google/maps').createClient({
    key: 'AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E',
    Promise: Promise
  });

  Meteor.methods({
    'googleMapsWebsite.geocode'(placeid) {
          googleMaps
            .place({
              placeid: placeid,
              language: 'en'
            }, (args) => {
              console.log(args);
            })
            .asPromise()
            .then(function(response) {
              console.log(response.json.result);
            });
    }
  });
}
