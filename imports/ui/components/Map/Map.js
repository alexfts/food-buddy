import React from 'react';
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
import { MAP } from 'react-google-maps/lib/constants';
const refs = {
  map: undefined
};

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.mediaCardRef = React.createRef();
    this.state = {};
  }

  handleMarkerClicked = markerIndex => {
    window.scrollTo(0, this.mediaCardRef.current.offsetTop + markerIndex * 100);
  };

  render() {
    const props = this.props;
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item>
          <GoogleMap
            onTilesLoaded={props.fetchPlaces}
            ref={props.onMapMounted}
            defaultZoom={15}
            defaultCenter={{ lat: 49.2632597, lng: -123.138 }}
          >
            {props.places &&
              props.places.map((place, i) => (
                <Marker
                  animation={google.maps.Animation.DROP}
                  onClick={() => this.handleMarkerClicked(i)}
                  // options={{ icon: { url: ...., scaledSize: ...., size: .... } }}
                  options={{
                    icon: {
                      url:
                        'https://image.flaticon.com/icons/svg/1149/1149845.svg',
                      scaledSize: { width: 32, height: 32 }
                    }
                  }}
                  // label={(i + 1).toString()}
                  label={place.name.split(' ')[0]}
                  key={i}
                  position={{
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                  }}
                />
              ))}
          </GoogleMap>
        </Grid>
        <Grid>
          {props.places && (
            <MediaCard
              places={props.places}
              mediaCardRef={this.mediaCardRef}
              userMatches={props.userMatches}
            />
          )}
        </Grid>
      </Grid>
    );
  }
}

const Results = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCH-SLwYe4Bh5wo8CIiEuAj00W6v0Bkxss&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: 700, width: `80%` }} />,
    mapElement: <div style={{ height: 656, top: 64 }} />
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
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          updatePlaces(results);
        }
      });
    }
  })
)(MapComponent);

export default withStyles(styles)(Results);
