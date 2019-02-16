import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
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

  toggleFavourite = (place, details) => {
    console.log('TOGGLEFAVOURITE', place, details);
    Meteor.call('users.changeFavourites', place, details);
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
                          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_reference}&key=AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E`}
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
                          <Typography component="p">
                            {place.vicinity}
                          </Typography>
                          <Typography component="p">
                          {place.rating ? `⭐️ ${place.rating}` : ''}
                          </Typography>
                        </CardContent>
                      </a>
                    </CardActionArea>
                    <IconButton
                      onClick={() => {
                        if (details && details[i].result) {
                          this.toggleFavourite(place, details[i].result);
                        }
                      }}
                      aria-label="Add to favourites"
                      className={classes.favouriteButton}
                    >
                      <Favorite />
                    </IconButton>
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
export default withStyles(styles)(MediaCard);
