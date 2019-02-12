import React, { Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Grid from '@material-ui/core/Grid';
import MediaCard from '../../components/ResultsCard/ResultsCard';
import MapsComponent from '../../components/Maps/Maps';

const Results = ({ location }) => {
  const query = location.state ? location.state.query : '';
  console.log('QUERY', query);
  return (
    <Fragment>
      <Grid container>
        <Grid item>
           <MapsComponent />
        </Grid>
        <Grid>
           {/* Only show cards with open_now: true */}
           <MediaCard />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Results;
