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
  Marker
} from 'react-google-maps';

const refs = {
  map: undefined
};

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
)(props => {
  const query = props.location.state ? props.location.state.query : '';
  // console.log('QUERY', query);
  return (
    <Grid container>
      <Grid item>
        <GoogleMap
          onTilesLoaded={props.fetchPlaces}
          ref={props.onMapMounted}
          onBoundsChanged={props.fetchPlaces}
          defaultZoom={15}
          defaultCenter={{ lat: 49.2632597, lng: -123.138 }}
        >
          {props.places &&
            props.places.map((place, i) => (
              <Marker
                key={i}
                position={{
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng()
                }}
              />
            ))}
        </GoogleMap>
      </Grid>
      <Grid>{props.places && <MediaCard places={props.places} />}</Grid>
    </Grid>
  );
});

export default withStyles(styles)(Results);
