import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';
import { IconButton, FormControlLabel, Checkbox } from '@material-ui/core';
import { Favorite, FavoriteBorder, Star } from '@material-ui/icons';
import styles from './styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Drawer,
  List,
  ListItem
} from '@material-ui/core/';

class RestaurantCard extends Component {
  toggleFavourite = (place, details, e) => {
    Meteor.call('users.changeFavourites', place, details, e.target.checked);
  };

  shouldCheck = place => {
    const { user } = this.props;
    if (!place || !user || !user.profile || !user.profile.favourites)
      return false;

    return (
      user.profile.favourites.find(fav => fav.place_id === place.place_id) !==
      undefined
    );
  };

  render() {
    const { place, details, user, classes } = this.props;
    const photoReference =
      details &&
      details.photos &&
      details.photos[0] &&
      details.photos[0].photo_reference;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <a
            href={details && details.website}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.hrefLink}
          >
            <CardMedia
              className={classes.media}
              component="img"
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyCH-SLwYe4Bh5wo8CIiEuAj00W6v0Bkxss`}
              title="Restaurant Image"
            />
            <CardContent className={classes.content}>
              <div className={classes.firstline}>
                <Typography className={classes.name}>{place.name}</Typography>
                <Typography className={classes.dollar}>
                  {place.price_level && place.price_level === 1
                    ? `$`
                    : place.price_level && place.price_level === 2
                    ? `$$`
                    : place.price_level && place.price_level === 3
                    ? `$$$`
                    : place.price_level && place.price_level === 4
                    ? `$$$$`
                    : ``}
                </Typography>
              </div>
              <Typography component="p">{place.vicinity}</Typography>
            </CardContent>
          </a>
        </CardActionArea>
        <div className={classes.starheart}>
          <Typography component="p">
            <Star className={classes.star} />{' '}
            {place.rating ? ` ${place.rating}` : ''}
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                value="favourite"
                classes={{
                  root: classes.favouriteButton,
                  checked: classes.checked
                }}
                checked={this.shouldCheck(place)}
                onChange={e => {
                  this.toggleFavourite(place, details, e);
                }}
              />
            }
          />
        </div>
      </Card>
    );
  }
}

RestaurantCard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(withStyles(styles)(RestaurantCard));
