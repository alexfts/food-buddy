import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import googleMapsWebsite from '../../../api/googleMaps';

function MediaCard(props) {
  const { classes, places } = props;

  return places.map(place => {
    const placeid = place.place_id;
    Meteor.call('googleMapsWebsite.geocode', placeid);

    // // let url = `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E&placeid=${place.place_id}`
    // // fetch(url)
    // //   .then(function(response) {
    // //   return response.json();
    // //   })
    // //   .then(function(myJson) {
    // //   console.log(JSON.stringify(myJson.result.website));
    // //   });
    return (
      <Card className={classes.card}>
        <CardActionArea>
          {/* Link to website from api details */}
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.hrefLink}
          >
            {/* image from photo details */}
            <CardMedia
              className={classes.media}
              component="img"
              src={'https://picsum.photos/200'}
              title="Restaurant Image"
            />
            <CardContent>
              <Typography component="h2">{place.name}</Typography>
              <Typography component="p">Rating: {place.rating}</Typography>
              <Typography component="p">
                Price Level: {place.price_level}
              </Typography>
              <Typography component="p">{place.vicinity}</Typography>
            </CardContent>
          </a>
        </CardActionArea>
      </Card>
    );
  });
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
