import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../../api/tags';
import { TagCategories } from '../../../api/tagCategories';

// results: [ obj  ]
// where obj = { rank, tags: [ { category, tagId, tagTitle} ], users}
const match = (users, tags, tagCategories) => {
  console.log(users);
  console.log(tags);
  console.log(tagCategories);
};

const TopMatches = ({ userids, users, currentUser, tags, tagCategories }) => {
  const selectedUsers = users.filter(user => userids.includes(user._id));
  const matches = match([...selectedUsers, currentUser], tags, tagCategories);
  return <div>Matches</div>;
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
