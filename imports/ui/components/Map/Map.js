// import React from 'react';
// import { compose, withProps, withState, withHandlers } from 'recompose';
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker
// } from 'react-google-maps';
// import { withStyles } from '@material-ui/core/styles';
// import styles from './styles';
// // var infowindow = new google.maps.InfoWindow();
// // var service = new google.maps.places.PlacesService(map);
// const MapComponent = compose(
//   withProps({
//     googleMapURL:
//       'https://maps.googleapis.com/maps/api/js?key=AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E&v=3.exp&libraries=geometry,drawing,places',
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />
//   }),
//   withScriptjs,
//   withGoogleMap,
//   withState('places', 'updatePlaces', '', 'setResults'),
//   withHandlers({
//     fetchPlaces: ({ updatePlaces }) => () => {
//       const service = new google.maps.places.PlacesService();
//       var infowindow = new google.maps.InfoWindow();

//       const request = {
//         bounds: bounds,
//         keyword: '(thai) OR (indian)',
//         type: ['restaurant'],
//         placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
//         fields: ['name', 'formatted_address', 'place_id', 'geometry']
//       };
//       service.nearbySearch(request, (results, status) => {
//         if (status == google.maps.places.PlacesServiceStatus.OK) {
//           // console.log(results);
//           updatePlaces(results);
//         }
//       }),
//         service.getDetails(request, function(place, status) {
//           if (status === google.maps.places.PlacesServiceStatus.OK) {
//             var marker = new google.maps.Marker({
//               map: map,
//               position: place.geometry.location
//             });
//             google.maps.event.addListener(marker, 'click', function() {
//               console.log('hihi');
//               infowindow.setContent(
//                 '<div><strong>' +
//                   place.name +
//                   '</strong><br>' +
//                   'Place ID: ' +
//                   place.place_id +
//                   '<br>' +
//                   place.formatted_address +
//                   '</div>'
//               );
//               infowindow.open(map, this);
//             });
//           }
//         });
//     }
//   })
// )(props => (
//   <GoogleMap defaultZoom={8} defaultCenter={{ lat: 49.2632597, lng: -123.138 }}>
//     {props.isMarkerShown && (
//       <Marker
//         position={{ lat: 49.2632597, lng: -123.138 }}
//         onClick={props.onMarkerClick}
//       />
//     )}
//   </GoogleMap>
// ));

// export default withStyles(styles)(MapComponent);
import React, { Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Grid from '@material-ui/core/Grid';
import MediaCard from '../../components/ResultsCard/ResultsCard';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { compose, withProps, withHandlers, withState } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';

const refs = {
  map: undefined
};

class MapComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
    console.log(this.state);
  }
  onMarkerClick = (props, marker, e) => {
    console.log('hihihimarker', props, marker);
    return this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      console.log(this.state.showingInfoWindow);
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const props = this.props;
    console.log(props);
    return (
      <Grid container>
        <Grid item>
          <GoogleMap
            onClick={this.onMapClicked}
            onTilesLoaded={props.fetchPlaces}
            ref={props.onMapMounted}
            // onBoundsChanged={props.fetchPlaces}
            defaultZoom={15}
            defaultCenter={{ lat: 49.2632597, lng: -123.138 }}
          >
            {props.places &&
              props.places.map((place, i) => (
                <Marker
                  animation={google.maps.Animation.DROP}
                  onClick={this.onMarkerClick}
                  label={(i + 1).toString()}
                  key={i}
                  //   label={props.places.id}
                  position={{
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                  }}
                >
                  <InfoWindow
                    visible={this.showInfoWindow}
                    marker={this.state.activeMarker}

                    // style={styles.infoWindow}
                  >
                    <div>
                      <p>{`address:${place.vicinity}`}</p>
                    </div>
                  </InfoWindow>
                </Marker>
              ))}
          </GoogleMap>
        </Grid>
        <Grid>{props.places && <MediaCard places={props.places} />}</Grid>
      </Grid>
    );
  }
}

const Results = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, width: '500px' }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  withState('places', 'updatePlaces', '', 'setResults'),
  withHandlers({
    onMapMounted: () => ref => {
      refs.map = ref;
    },
    fetchPlaces: ({ updatePlaces }) => () => {
      const bounds = refs.map.getBounds();
      const service = new google.maps.places.PlacesService(
        refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
      );
      const request = {
        bounds: bounds,
        keyword: '(thai) OR (indian)',
        type: ['restaurant']
      };
      service.nearbySearch(request, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          // console.log(results);
          updatePlaces(results);
        }
      });
    }
  })
)(MapComponent);

export default withStyles(styles)(Results);
