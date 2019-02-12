import React from 'react';
import { compose, withProps, withHandlers, withState } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  withState('places', 'updatePlaces', ''),
  withHandlers(() => {
    const refs = {
      map: undefined
    };

    return {
      onMapMounted: () => ref => {
        refs.map = ref;
      },
      fetchPlaces: ({ updatePlaces }) => {
        let places;
        const bounds = refs.map.getBounds();

        const service = new google.maps.places.PlacesService(
          refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        );
        const request = {
          bounds: bounds,
          type: ['restaurant'],
          keyword: ['thai' + 'indian']
          // openNow: true
        };
        console.log(service);
        service.nearbySearch(request, (results, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);
            updatePlaces(results);
          }
        });
      }
    };
  })
)(props => {
  return (
    <GoogleMap
      onTilesLoaded={props.fetchPlaces}
      ref={props.onMapMounted}
      onBoundsChanged={props.fetchPlaces}
      defaultZoom={10}
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
  );
});

export default class MyFancyComponent extends React.PureComponent {
  render() {
    return <MyMapComponent />;
  }
}

// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import styles from './styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';

// function MediaCard(props) {
//   const { classes } = props;

//   return (
//     <Card className={classes.card}>

//       <CardActionArea>
// {/* Link to website from api details */}
//         <a
//             href="https://google.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={classes.hrefLink}
//         >
//         {/* image from photo details */}
//         <CardMedia
//           className={classes.media}
//           component='img'
//           src={'https://picsum.photos/200'}
//           title="Restaurant Image"
//         />
//         <CardContent>
//           <Typography component="h2">
//             Pull restaurant name
//           </Typography>
//           <Typography component="p">
//             Pull restaurant rating
//           </Typography>
//           <Typography component="p">
//             Pull restaurant price_level
//           </Typography>
//           <Typography component="p">
//             Pull restaurant distance
//           </Typography>
//           <Typography component="p">
//             Pull restaurant formatted_address from details
//           </Typography>
//         </CardContent>
//         </a>
//       </CardActionArea>
//     </Card>
//   );
// }

// MediaCard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(MediaCard);
