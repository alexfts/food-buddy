import React, { Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Grid from '@material-ui/core/Grid';
import PlacesComponent from '../../components/ResultsCard/ResultsCard';
import MapComponent from '../../components/Maps/Maps';
import MyMapComponent from '../../components/Maps/Maps';

const Results = ({ location }) => {
  const query = location.state ? location.state.query : '';
  console.log('QUERY', query);
  return (
    <Fragment>
      <Grid container>
        <Grid item>{/* <MapComponent /> */}</Grid>
        <Grid>
          {/* Only show cards with open_now: true */}
          <PlacesComponent />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Results;
