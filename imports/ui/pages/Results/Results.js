import React, { Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Grid from '@material-ui/core/Grid';
import ResultsCard from '../../components/ResultsCard/ResultsCard';

const Results = ({ location }) => {
  const query = location.state ? location.state.query : '';
  console.log('QUERY', query);
  return (
    <Fragment>
      <div>
        <div>results page</div>
      </div>

      <Grid container>
        <Grid item>
          <ResultsCard />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Results;

// <!DOCTYPE html>
// <html>
//   <head>
//     <script>
//       // This example requires the Places library. Include the libraries=places
//       // parameter when you first load the API. For example:
//       // <script src="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=indian&key=AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E">

//       function initMap() {
//         var map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: -33.866, lng: 151.196},
//           zoom: 15
//         });

//         var request = {
//           placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
//           fields: ['name', 'formatted_address', 'place_id', 'geometry']
//         };

//         var infowindow = new google.maps.InfoWindow();
//         var service = new google.maps.places.PlacesService(map);

//         service.getDetails(request, function(place, status) {
//           if (status === google.maps.places.PlacesServiceStatus.OK) {
//             var marker = new google.maps.Marker({
//               map: map,
//               position: place.geometry.location
//             });
//             google.maps.event.addListener(marker, 'click', function() {
//               infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
//                 'Place ID: ' + place.place_id + '<br>' +
//                 place.formatted_address + '</div>');
//               infowindow.open(map, this);
//             });
//           }
//         });
//       }
//     </script>
//   </head>
//   <body>
//     <div id="map"></div>
//     <script async defer
//     src="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=indian&key=AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E">
//     </script>
//   </body>
// </html>
