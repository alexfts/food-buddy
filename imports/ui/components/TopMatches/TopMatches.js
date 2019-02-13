import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../../api/tags';
import { TagCategories } from '../../../api/tagCategories';
import { Grid, Typography, Button, Chip, Avatar } from '@material-ui/core';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';

const TopMatches = ({
  userids,
  users,
  currentUser,
  currentUserId,
  tags,
  tagCategories,
  classes,
  matches
}) => {
  console.log('MATCHES', matches, users);

  return matches ? (
    <div>
      <Typography className={classes.title} variant="h5">
        Your top matches:
      </Typography>

      <Grid
        container
        // direction="column"
        justify="space-between"
        alignItems="center"
        spacing={16}
      >
        {matches.map(({ tagid, users }) => {
          const tag = tags.find(tag => tag._id === tagid);
          const category = tagCategories.find(
            categ => categ._id === tag.categoryid
          );
          return (
            <Grid item className={classes.matches} xs={8} sm={6} key={tagid}>
              <Typography className={classes.tagTitle} color="primary">
                {tag.title}
              </Typography>

              <div className={classes.flexMatches}>
                <Typography className={classes.matchesLabel}>Match:</Typography>
                {users.map(user => (
                  <Chip
                    className={classes.user}
                    key={user._id}
                    avatar={
                      <Avatar>
                        <Gravatar email={user.emails[0].address} />
                      </Avatar>
                    }
                    label={user.username}
                    color="default"
                    variant="contained"
                  />
                ))}
              </div>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                className={classes.button}
                to={{
                  pathname: '/results',
                  state: {
                    query: tag.title
                  }
                }}
              >
                enter
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </div>
  ) : (
    <div>U suck</div>
  );
};

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
    tags: Tags.find({}).fetch(),
    tagCategories: TagCategories.find({}).fetch()
  };
})(withStyles(styles)(TopMatches));
