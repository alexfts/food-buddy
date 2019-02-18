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
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { MAP } from 'react-google-maps/lib/constants';
const refs = {
  map: undefined
};

const Snazzysnazz = [
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6195a0'
      }
    ]
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        lightness: '0'
      },
      {
        saturation: '0'
      },
      {
        color: '#f5f5f2'
      },
      {
        gamma: '1'
      }
    ]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'all',
    stylers: [
      {
        lightness: '-3'
      },
      {
        gamma: '1.00'
      }
    ]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f8f8f8'
      }
    ]
  },
  {
    featureType: 'landscape.natural.terrain',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.attraction',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.business',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.government',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.medical',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#e6f2da'
      },
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.school',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        saturation: -100
      },
      {
        lightness: 45
      },
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f9d6b5'
      },
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text',
    stylers: [
      {
        color: '#4e4e4e'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#787878'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#e5e5e5'
      }
    ]
  },
  {
    featureType: 'transit.station.airport',
    elementType: 'labels.icon',
    stylers: [
      {
        hue: '#0a00ff'
      },
      {
        saturation: '-77'
      },
      {
        gamma: '0.57'
      },
      {
        lightness: '0'
      },
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'transit.station.bus',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on'
      },
      {
        hue: '#008eff'
      }
    ]
  },
  {
    featureType: 'transit.station.rail',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#43321e'
      }
    ]
  },
  {
    featureType: 'transit.station.rail',
    elementType: 'labels.icon',
    stylers: [
      {
        hue: '#005dff'
      },
      {
        lightness: '4'
      },
      {
        gamma: '0.75'
      },
      {
        saturation: '-68'
      },
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        color: '#eaf6f8'
      },
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#cbeefa'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: '-49'
      },
      {
        saturation: '-53'
      },
      {
        gamma: '0.79'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  }
];
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
            defaultOptions={{ styles: Snazzysnazz }}
          >
            <MarkerClusterer
              onClick={props.onMarkerClustererClick}
              averageCenter
              enableRetinaIcons
              gridSize={60}
            >
              {props.places &&
                props.places.map((place, i) => (
                  <Marker
                    animation={google.maps.Animation.DROP}
                    onClick={() => this.handleMarkerClicked(i)}
                    options={{
                      icon: {
                        url:
                          'https://www.web2market.com/store/pub/media/wysiwyg/icon-map.png',
                        scaledSize: { width: 40, height: 40 }
                      },
                      fontColor: 'white'
                    }}
                    // label={(i + 1).toString()}
                    defaultLabel={place.name.split(' ')[0]}
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
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDUBhvg4WTzreRL5VOJ8LP6Rlb0J1auaoc&v=3.exp&libraries=geometry,drawing,places',
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
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          updatePlaces(results);
        }
      });
    }
  })
)(MapComponent);

export default withStyles(styles)(Results);
