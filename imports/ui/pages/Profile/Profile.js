import React, { Fragment } from 'react';
import { Grid, Avatar, Typography } from '@material-ui/core';
import { withTracker } from 'meteor/react-meteor-data';
import Gravatar from 'react-gravatar';
import { TagCategories } from '../../../api/tagCategories';
import { Tags } from '../../../api/tags';
import TagInput from '../../components/TagInput';
import { Meteor } from 'meteor/meteor';
import './styles';

const Profile = ({ currentUser, tags }) => {
  const userTags = currentUser.profile.tags.map(userTags =>
    tags.find(tag => tag._id === userTags._id)
  );

  return (
    <Fragment>
      <Grid container>
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
        <Grid item>{userTags}</Grid>
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
