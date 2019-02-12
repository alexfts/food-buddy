import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {
  compose,
  withProps,
  withHandlers,
  withState,
  withStateHandlers
} from 'recompose';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const refs = {
  map: undefined
};
const { InfoBox } = require('react-google-maps/lib/components/addons/InfoBox');

const MapsComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, width: '500px' }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withState('places', 'updatePlaces', ''),
  withHandlers(() => {
    return {
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
            console.log(results);
            updatePlaces(results);
          }
        });
      }
    };
  }),
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    onTilesLoaded={props.fetchPlaces}
    ref={props.onMapMounted}
    onBoundsChanged={props.fetchPlaces}
    defaultZoom={15}
    defaultCenter={{ lat: 49.2632597, lng: -123.138 }}
  >
    {props.places &&
      props.places.map((place, i) => (
        // <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />
        <Marker
          key={i}
          position={{
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }}
          onClick={props.onToggleOpen}
        >
          {props.isOpen && (
            <InfoBox
              onCloseClick={props.onToggleOpen}
              options={{ closeBoxURL: ``, enableEventPropagation: true }}
            >
              <div
                style={{
                  backgroundColor: `yellow`,
                  opacity: 0.75,
                  padding: `12px`
                }}
              >
                <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                  Hello, Kaohsiung!
                </div>
              </div>
            </InfoBox>
          )}
        </Marker>
      ))}
  </GoogleMap>
));

export default withStyles(styles)(MapsComponent);
