import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../../api/tags';

const RestrictionsWarning = ({ restrictions, tags }) => {
  return (
    <div>
      {restrictions.map(restriction => {
        const tagid = restriction.tagids[0];
        const tag = tags.find(t => t._id === tagid);
        const users = restriction.users;
        const usernames = users.map(user => user.username).join(', ');
        return (
          <div key={tagid}>
            {`${usernames} ${
              users.length > 1 ? 'have' : 'has'
            } a dietary restriction: ${tag.title}`}
          </div>
        );
      })}
    </div>
  );
};

export default withTracker(() => {
  Meteor.subscribe('tags');

  return {
    tags: Tags.find({}).fetch()
  };
})(withStyles(styles)(RestrictionsWarning));
