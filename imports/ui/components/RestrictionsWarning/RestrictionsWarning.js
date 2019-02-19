import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../../api/tags';
import { Typography } from '@material-ui/core';

const RestrictionsWarning = ({ restrictions, tags, classes }) => {
  return (
    <div>
      {restrictions.map(restriction => {
        const tagid = restriction.tagids[0];
        const tag = tags.find(t => t._id === tagid);
        const users = restriction.users;
        const usernames = users.map(user => user.username).join(', ');
        return (
          <div key={tagid} className={classes.container}>
            <Typography className={classes.restriction}>
              {`${usernames} ${
                users.length > 1 ? 'have' : 'has'
              } a dietary restriction: ${tag.title}`}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};

RestrictionsWarning.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTracker(() => {
  Meteor.subscribe('tags');

  return {
    tags: Tags.find({}).fetch()
  };
})(withStyles(styles)(RestrictionsWarning));
