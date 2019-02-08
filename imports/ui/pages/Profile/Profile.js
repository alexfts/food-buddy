import React, { Fragment } from 'react';
import { Grid, Avatar } from '@material-ui/core';
import { withTracker } from 'meteor/react-meteor-data';
import Gravatar from 'react-gravatar';
import TagInput from '../../components/TagInput';

import './styles';
import { Meteor } from 'meteor/meteor';

const tags = ['seafood', 'japanese', 'italian', 'burgers', 'vergetarian'];

const Profile = () => {
  return (
    <Fragment>
      <div>
        <Avatar>
          <Gravatar email={Meteor.user.email} />
        </Avatar>
        <div>test</div>
      </div>

      {/*TODO Map all tags and highlight ones that are already selected  */}

      <Grid container>
        <Grid item>
          {tags.map(tag => {
            return (
              <Grid item xs={1}>
                {/* <TagInput key={tag.id} tag={tag} /> */}
                {tag}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Profile;
