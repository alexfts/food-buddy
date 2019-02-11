import React, { Fragment, Component } from 'react';
import { Grid, Avatar, Typography, withStyles } from '@material-ui/core';
import { withTracker } from 'meteor/react-meteor-data';
import Gravatar from 'react-gravatar';
import { Tags } from '../../../api/tags';
import { Meteor } from 'meteor/meteor';
import styles from './styles';

const Profile = ({ currentUser, tags }) => {
  console.log(
    currentUser.profile.tags.filter(userTag => {
      console.log(userTag);
      console.log(tags);
      return tags.find(tag => tag._id === userTag);
    })
  );
  // if (currentUser) {
  //   const mappedTags = currentUser.profile.tags.map(userTags => {
  //     tags.find(tag => tag._id);
  //   });

  //   console.log(mappedTags);
  // }

  // const userTags = Meteor.user().profile.tags.map(userTags =>
  //   tags.find(tag => tag._id === userTag._id)
  // );

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

      <Grid container>
        {/* <Grid item>{userTags}</Grid> */}
        <Typography>All Tags</Typography>
        <Grid item>
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
