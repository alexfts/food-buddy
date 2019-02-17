import React from 'react';
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
              const photo_reference =
                details &&
                details[i] &&
                details[i].result.photos &&
                details[i].result.photos[0].photo_reference;
              return (
                <ListItem key={place.id}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <a
                        href={
                          details &&
                          details[i] &&
                          details[i].result &&
                          details[i].result.website
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.hrefLink}
                      >
                        <CardMedia
                          className={classes.media}
                          component="img"
                          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_reference}&key=AIzaSyCH-SLwYe4Bh5wo8CIiEuAj00W6v0Bkxss`}
                          title="Restaurant Image"
                        />
                        <CardContent className={classes.content}>
                          <div className={classes.firstline}>
                            <Typography className={classes.name}>
                              {place.name}
                            </Typography>
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
                          <Typography component="p">
                            {place.vicinity}
                          </Typography>
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
                              if (details && details[i]) {
                                this.toggleFavourite(
                                  place,
                                  details[i].result,
                                  e
                                );
                              }
                            }}
                          />
                        }
                      />
                    </div>
                  </Card>
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
