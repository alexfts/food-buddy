import React from 'react';
import Map from '../../components/Map';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './styles';

const Results = ({ location }) => {
  const query = location.state ? location.state.query : 'restaurants';
  const openNow = location.state ? location.state.openNow : true;
  const price = location.state ? location.state.price : 1;
  const userMatches = location.state && location.state.userMatches;
  return (
    <Map
      query={query}
      openNow={openNow}
      price={price}
      userMatches={userMatches}
    />
  );
};

Results.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withStyles(styles)(Results);
