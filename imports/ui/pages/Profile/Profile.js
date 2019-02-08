import React, { Fragment } from 'react';
import { Grid, Avatar } from '@material-ui/core';
import { withTracker } from 'meteor/react-meteor-data';
import Gravatar from 'react-gravatar';

const tags = ['seafood', 'japanese', 'italian', 'burgers', 'vergetarian'].join(
  ', '
);

const Profile = () => {
  return (
    <Fragment>
      <div>
        <Avatar>
          <Gravatar email={'test@test.com'} />
        </Avatar>
        <div>test</div>
      </div>

      {/*TODO Map all tags and highlight ones that are already selected  */}

      <Grid container>
        <Grid item>
          {tags.map(tags => {
            return <Grid item xs={1} />;
          })}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Profile;
