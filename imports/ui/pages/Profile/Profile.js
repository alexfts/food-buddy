import React, { Fragment } from 'react';
import { Grid, Avatar } from '@material-ui/core';
import Gravatar from 'react-gravatar';

const Profile = () => {
  return (
    <Fragment>
      <div>
        <Avatar>
          <Gravatar email={'test@test.com'} />
        </Avatar>
      </div>

      {/*TODO Map all tags and highlight ones that are already picked  */}

      <Grid container>
        <Grid item>
          <div>
            <p>tags</p>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Profile;
