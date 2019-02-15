import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../../api/tags';
import { TagCategories } from '../../../api/tagCategories';
import {
  Grid,
  Typography,
  Button,
  Chip,
  Avatar,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';
import Slider from '@material-ui/lab/Slider';

class TopMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNow: true
    };
  }

  handlePriceChange = (event, price) => {
    let dollars = '';
    for (let i = 0; i < price; i++) {
      dollars += '$';
    }
    this.setState({ price, dollars });
  };

  handleOpenNowChange = event => {
    this.setState({ openNow: event.target.checked });
  };

  render() {
    const {
      userids,
      users,
      currentUser,
      currentUserId,
      allTags,
      tagCategories,
      classes,
      matches
    } = this.props;
    let pricePoint = this.state;

    return matches ? (
      <div>
        <Typography className={classes.title} variant="h5">
          Your top matches:
        </Typography>
        <div
          // container
          // spacing={16}
          // alignItems="center"
          className={classes.flexSlider}
        >
          <div className={classes.pricePoint}>
            {pricePoint.dollars}
            <Slider
              value={this.state.price}
              min={1}
              max={4}
              step={1}
              onChange={this.handlePriceChange}
            />
          </div>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.openNow}
                onChange={this.handleOpenNowChange}
                value="openNow"
              />
            }
            label="Open now"
          />
        </div>

        <Grid
          container
          spacing={16}
          // direction="column"
          justify="space-between"
          alignItems="center"
          spacing={16}
        >
          {matches.map(({ tagids, users }) => {
            const userTags = allTags.filter(tag => tagids.includes(tag._id));
            const userTagTitles = userTags.map(tag => tag.title);
            return (
              <Grid
                item
                xs={12}
                sm={6}
                key={userTagTitles.join(', ')}
                className={classes.matches}
              >
                <Typography className={classes.tagTitle} color="primary">
                  {userTagTitles.join(', ')}
                </Typography>
                <div className={classes.flexMatches}>
                  <Typography className={classes.matchesLabel}>
                    Match:
                  </Typography>
                  {users.map(user => (
                    <Chip
                      className={classes.user}
                      key={user._id}
                      // avatar={
                      //   <Avatar>
                      //     <Gravatar email={user.emails[0].address} />
                      //   </Avatar>
                      // }
                      label={user.username}
                      color="default"
                      variant="contained"
                    />
                  ))}
                </div>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  component={Link}
                  size="small"
                  to={{
                    pathname: '/results',
                    state: {
                      query: userTagTitles.join(', '),
                      price: this.state.price,
                      openNow: this.state.openNow
                    }
                  }}
                >
                  Select
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </div>
    ) : (
      <div>U suck</div>
    );
  }
}

TopMatches.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTracker(() => {
  Meteor.subscribe('tags');
  Meteor.subscribe('tagCategories');
  Meteor.subscribe('users');

  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    users: Meteor.users.find({}).fetch(),
    allTags: Tags.find({}).fetch(),
    tagCategories: TagCategories.find({}).fetch()
  };
})(withStyles(styles)(TopMatches));
