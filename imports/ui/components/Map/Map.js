import React from 'react';
import Grid from '@material-ui/core/Grid';
import MediaCard from '../../components/ResultsDrawer/ResultsDrawer';
import { withStyles } from '@material-ui/core/styles';
import styles, { snazzyMapsStyles } from './styles';
import { compose, withProps, withHandlers, withState } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';

const refs = {
  map: undefined
};

const Map = ({
  fetchPlaces,
  onMapMounted,
  onMarkerClustererClick,
  places,
  userMatches
}) => {
  return (
    <Grid container>
      <Grid item>
        <GoogleMap
          onTilesLoaded={fetchPlaces}
          ref={onMapMounted}
          defaultZoom={15}
          defaultCenter={{ lat: 49.2632597, lng: -123.138 }}
          defaultOptions={{ styles: snazzyMapsStyles }}
        >
          <MarkerClusterer
            onClick={onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
          >
            {places &&
              places.map((place, i) => (
                <Marker
                  animation={google.maps.Animation.DROP}
                  options={{
                    icon: {
                      url:
                        'https://www.web2market.com/store/pub/media/wysiwyg/icon-map.png',
                      scaledSize: { width: 40, height: 40 },
                      labelOrigin: new google.maps.Point(40, -10)
                    }
                  }}
                  label={{
                    color: 'coral',
                    fontWeight: '700',
                    text: place.name
                  }}
                  key={i}
                  position={{
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                  }}
                />
              ))}
          </MarkerClusterer>
        </GoogleMap>
      </Grid>
      <Grid>
        {places && <MediaCard places={places} userMatches={userMatches} />}
      </Grid>
    </Grid>
  );
};

Map.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchPlaces: PropTypes.func.isRequired,
  onMapMounted: PropTypes.func.isRequired,
  onMarkerClustererClick: PropTypes.func,
  places: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  userMatches: PropTypes.array
};

export default compose(
  withStyles(styles),
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyA27rwWEMvWiG5EFFRJP6czivVgL4AMDTQ&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: (
      <div style={{ height: `100%`, minHeight: 420, width: `80%` }} />
    ),
    mapElement: <div style={{ height: `94vh`, top: 64 }} />
  }),
  withScriptjs,
  withGoogleMap,
  withState('places', 'updatePlaces', '', 'setResults'),
  withHandlers({
    onMapMounted: () => ref => {
      refs.map = ref;
    },
    fetchPlaces: ({ updatePlaces, openNow, price, query }) => () => {
      const bounds = refs.map.getBounds();
      const service = new google.maps.places.PlacesService(
        refs.map.context[MAP]
      );
      const request = {
        bounds: bounds,
        keyword: query,
        type: ['restaurant'],
        openNow: openNow,
        minPriceLevel: 1,
        maxPriceLevel: price
      };
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          updatePlaces(results);
        }
      });
    }
  })
)(Map);
