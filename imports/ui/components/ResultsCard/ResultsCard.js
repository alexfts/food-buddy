import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';
import { IconButton, FormControlLabel, Checkbox } from '@material-ui/core';
import { Favorite, FavoriteBorder, Star, Share } from '@material-ui/icons';
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
import RestaurantCard from '../RestaurantCard';

class MediaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null
    };
  }

  componentDidMount() {
    this.getPlaceDetails(this.props.places);
  }

  getPlaceDetails = async places => {
    const placeDetails = places.map(async place => {
      const placeid = place.place_id;
      const data = new Promise((resolve, reject) => {
        Meteor.call('googleMapsWebsite.geocode', placeid, (err, result) => {
          if (!err) return resolve(result);
        });
      });
      return await data;
    });
    this.setState({
      result: await Promise.all(placeDetails)
    });
  };

<<<<<<< HEAD
  toggleFavourite = (place, details) => {
    Meteor.call('users.changeFavourites', place, details);
=======
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
>>>>>>> 5d25c7652535403dbd592ef13327bcf3d43c0a4b
  };

  render() {
    const { classes, places } = this.props;
    const details = this.state.result;
    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="right"
        >
          <List>
            {places.map((place, i) => {
              const placeDetails = details && details[i] && details[i].result;
              return (
                <ListItem key={place.id}>
                  <RestaurantCard
                    place={place}
                    details={placeDetails}
                    userMatches={this.props.userMatches}
                  />
                </ListItem>
              );
            })}
          </List>
        </Drawer>
      </div>
    );
  }
}
MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(withStyles(styles)(MediaCard));
