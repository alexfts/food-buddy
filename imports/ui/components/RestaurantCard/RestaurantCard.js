import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';
import { Favorite, FavoriteBorder, Star, Share } from '@material-ui/icons';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import styles from './styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  FormControlLabel,
  Checkbox,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Chip,
  Avatar,
  Snackbar,
  SnackbarContent
} from '@material-ui/core/';
import Gravatar from 'react-gravatar';

class RestaurantCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openShareDialog: false,
      shareSuccess: false
    };
  }

  handleOpenShareDialog = () => {
    const { userMatches, user } = this.props;

    if (userMatches && userMatches.some(u => u._id !== user._id)) {
      this.setState({ openShareDialog: true });
    }
  };

  handleCloseShareDialog = success => {
    this.setState({ openShareDialog: false });
    if (success) {
      this.setState({ shareSuccess: true });
    }
  };

  closeSnackBar = () => {
    this.setState({ shareSuccess: false });
  };

  toggleFavourite = (place, details, e) => {
    Meteor.call('users.changeFavourites', place, details, e.target.checked);
  };

  shouldCheckFavourite = place => {
    const { user } = this.props;
    if (!place || !user || !user.profile || !user.profile.favourites)
      return false;
    return (
      user.profile.favourites.find(fav => fav.place_id === place.place_id) !==
      undefined
    );
  };

  render() {
    const { place, details, user, classes, userMatches } = this.props;
    const photoReference =
      details &&
      details.photos &&
      details.photos[0] &&
      details.photos[0].photo_reference;
    return (
      <Fragment>
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
                src={
                  photoReference
                    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyA27rwWEMvWiG5EFFRJP6czivVgL4AMDTQ`
                    : 'https://via.placeholder.com/200x150?text=No+image+found'
                }
                title="Restaurant Image"
              />
              <div className={classes.content}>
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
              </div>
            </a>
          </CardActionArea>
          <CardContent className={classes.content}>
            <div className={classes.starheart}>
              <div className={classes.starRating}>
                <Star className={classes.star} />
                <Typography component="p">
                  {place.rating ? ` ${place.rating}` : ''}
                </Typography>
              </div>
              {userMatches && (
                <IconButton
                  className={classes.shareButton}
                  color="secondary"
                  aria-label="Share"
                  onClick={this.handleOpenShareDialog}
                >
                  <Share className={classes.share} />
                </IconButton>
              )}
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
                    checked={this.shouldCheckFavourite(place)}
                    onChange={e => {
                      this.toggleFavourite(place, details, e);
                    }}
                  />
                }
              />
            </div>
          </CardContent>

          <Dialog
            className={classes.dialog}
            open={this.state.openShareDialog}
            onClose={this.handleCloseShareDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              <div className={classes.shareCardHeader}>
                <Typography color="primary" className={classes.shareTitle}>
                  Share the location with your group!
                </Typography>
                <img src="/macarons.png" alt="macarons" width="100" />
              </div>
            </DialogTitle>

            <DialogContent className={classes.dialogContent}>
              <Typography className={classes.name}>Your buddies:</Typography>
              {userMatches &&
                userMatches
                  .filter(u => u._id !== user._id)
                  .map(u => {
                    return (
                      <Chip
                        key={u._id}
                        className={classes.chip}
                        avatar={
                          <Avatar>
                            <Gravatar
                              email={
                                u.emails && u.emails[0] && u.emails[0].address
                              }
                              className={classes.chipAvatar}
                            />
                          </Avatar>
                        }
                        label={u.username}
                        color="default"
                        variant="default"
                      />
                    );
                  })}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleCloseShareDialog}
                color="primary"
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                onClick={() => this.handleCloseShareDialog(true)}
                color="primary"
                variant="outlined"
              >
                Share
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
        <Snackbar
          className={classes.successBar}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={this.state.shareSuccess}
          onClose={this.closeSnackBar}
          autoHideDuration={2000}
        >
          <SnackbarContent
            className={classes.success}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <CheckCircleIcon className={classes.successIcon} />
                {'The users have been notified. Happy lunching!'}
              </span>
            }
          />
        </Snackbar>
      </Fragment>
    );
  }
}

RestaurantCard.propTypes = {
  classes: PropTypes.object.isRequired,
  place: PropTypes.shape({
    name: PropTypes.string,
    place_id: PropTypes.string,
    rating: PropTypes.number,
    vicinity: PropTypes.string,
    price_level: PropTypes.number
  }),
  details: PropTypes.shape({
    website: PropTypes.string,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        photo_reference: PropTypes.string
      })
    )
  }),
  user: PropTypes.shape({
    _id: PropTypes.string,
    profile: PropTypes.object
  }),
  userMatches: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      username: PropTypes.string,
      emails: PropTypes.array
    })
  )
};

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(withStyles(styles)(RestaurantCard));
