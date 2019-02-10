import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../../api/tags';
import { TagCategories } from '../../../api/tagCategories';
import { Grid } from '@material-ui/core';

const getUserTags = user => {
  return user.profile.tags.map(tagid => ({ tagid, user }));
};

// TODO account for categories
const match = users => {
  let allUserTags = users
    .map(getUserTags)
    .reduce((a, b) => a.concat(b), [])
    .reduce((acc, { tagid, user }) => {
      if (acc.hasOwnProperty(tagid)) {
        acc[tagid].push(user);
      } else {
        acc[tagid] = [user];
      }
      return acc;
    }, {});

  allUserTags = Object.keys(allUserTags).map(tagid => ({
    tagid, // todo intersect tags from different categories
    users: allUserTags[tagid]
  }));

  allUserTags.sort((a, b) => {
    return b.users.length - a.users.length;
  });

  return allUserTags;
};

const TopMatches = ({
  userids,
  users,
  currentUser,
  tags,
  tagCategories,
  classes
}) => {
  const selectedUsers = users.filter(user => userids.includes(user._id));
  const matches = match([...selectedUsers, currentUser], tags, tagCategories);
  return (
    <Grid container spacing={16}>
      {matches.map(({ tagid, users }) => {
        const tag = tags.find(tag => tag._id === tagid);
        const category = tagCategories.find(
          categ => categ._id === tag.categoryid
        );
        return (
          <Grid item xs={12} sm={6} key={tagid} className={classes.matches}>
            {JSON.stringify(tag)}
          </Grid>
        );
      })}
    </Grid>
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
