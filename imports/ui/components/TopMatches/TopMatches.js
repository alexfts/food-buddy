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
      price: 1,
      openNow: true
    };
  }

  handlePriceChange = (event, price) => {
    this.setState({ price });
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
    console.log('MATCHES', matches, users);
    return matches ? (
      <div>
        <Typography variant="h5">Your top matches:</Typography>
        <Slider
          value={this.state.price}
          min={1}
          max={4}
          step={1}
          onChange={this.handlePriceChange}
        />
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
        <Grid container spacing={16}>
          {matches.map(({ tagids, users }) => {
            const tag = allTags.find(tag => tag._id === tagids[0]);
            const category = tagCategories.find(
              categ => categ._id === tag.categoryid
            );
            return (
              <Grid
                item
                xs={12}
                sm={6}
                key={tagids[0]}
                className={classes.matches}
              >
                {tag.title}
                <div>
                  {users.map(user => (
                    <Chip
                      key={user._id}
                      avatar={
                        <Avatar>
                          <Gravatar email={user.emails[0].address} />
                        </Avatar>
                      }
                      label={user.username}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </div>
                <Button
                  component={Link}
                  to={{
                    pathname: '/results',
                    state: {
                      query: tag.title,
                      price: this.state.price,
                      openNow: this.state.openNow
                    }
                  }}
                >
                  Find restaurants!
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
