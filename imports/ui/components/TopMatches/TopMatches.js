import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../../api/tags';
import { TagCategories } from '../../../api/tagCategories';
import { Grid, Typography, Button } from '@material-ui/core';
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
  return matches ? (
    <div>
      <Typography variant="h5">Your top matches:</Typography>

      <Grid container spacing={16}>
        {matches.map(({ tagid, users }) => {
          const tag = tags.find(tag => tag._id === tagid);
          const category = tagCategories.find(
            categ => categ._id === tag.categoryid
          );
          return (
            <Grid item xs={12} sm={6} key={tagid} className={classes.matches}>
              {tag.title}
              <Button
                variant="outlined"
                component={Link}
                to={{
                  pathname: '/results',
                  state: {
                    query: tag.title
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
