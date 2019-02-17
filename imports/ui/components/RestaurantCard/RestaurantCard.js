import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';
import { IconButton, FormControlLabel, Checkbox } from '@material-ui/core';
import { Favorite, FavoriteBorder, Star, Share } from '@material-ui/icons';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import styles from './styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Drawer,
  List,
  ListItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
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
    const { place, details, user, classes, userMatches } = this.props;
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
          {userMatches && (
            <IconButton
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
                checked={this.shouldCheck(place)}
                onChange={e => {
                  this.toggleFavourite(place, details, e);
                }}
              />
            }
          />
        </div>
        <Dialog
          open={this.state.openShareDialog}
          onClose={this.handleCloseShareDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Share</DialogTitle>
          <DialogContent>
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
                      color="secondary"
                      variant="outlined"
                    />
                  );
                })}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleCloseShareDialog()}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => this.handleCloseShareDialog(true)}
              color="secondary"
            >
              Share
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
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
