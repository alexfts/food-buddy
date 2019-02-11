import React, { Fragment, Component } from 'react';
import { Grid, Avatar, Typography, withStyles } from '@material-ui/core';
import { withTracker } from 'meteor/react-meteor-data';
import Gravatar from 'react-gravatar';
import { Tags } from '../../../api/tags';
import { Meteor } from 'meteor/meteor';
import styles from './styles';

const Profile = ({ currentUser, tags }) => {
  console.log(tags);

  return (
    <Fragment>
      <Grid container className="profilecContainer">
        <Grid item>
          {currentUser ? (
            <Avatar>
              <Gravatar email={currentUser.emails[0].address} />
            </Avatar>
          ) : (
            <div>something</div>
          )}
          <div>
            {currentUser ? currentUser.username : <div> something</div>}
          </div>
        </Grid>
      </Grid>

      {/*TODO Map all tags and highlight ones that are already selected  */}
      <div>
        <Typography>Your Tags</Typography>
        <ul>
          {currentUser.profile.tags.map(selectedTag => {
            return tags.map(tag => {
              if (tag._id === selectedTag) {
                return <li>{tag.title}</li>;
              }
            });
          })}
        </ul>
      </div>
      <Grid container>
        <Grid item xs={6}>
          <Typography>All Tags</Typography>
          {tags.map(tag => {
            return (
              <Grid item xs={4}>
                {tag.title}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
    tags: Tags.find({}).fetch()
  };
})(Profile);
