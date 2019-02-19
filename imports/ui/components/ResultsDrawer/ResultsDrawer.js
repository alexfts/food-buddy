import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';
import styles from './styles';
import { Drawer, List, ListItem } from '@material-ui/core/';
import RestaurantCard from '../RestaurantCard';

class ResultsDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantDetails: null
    };
  }

  componentDidMount() {
    this.getPlaceDetails(this.props.places);
  }

  getPlaceDetails = async places => {
    const placeDetails = places.map(async place => {
      const placeid = place.place_id;
      const data = new Promise((resolve, reject) => {
        Meteor.call('googleMaps.getDetails', placeid, (err, result) => {
          if (!err) return resolve(result);
        });
      });
      return await data;
    });
    this.setState({
      restaurantDetails: await Promise.all(placeDetails)
    });
  };

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
    const { classes, places } = this.props;
    const details = this.state.restaurantDetails;
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
          <List className={classes.list}>
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

ResultsDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(withStyles(styles)(ResultsDrawer));
