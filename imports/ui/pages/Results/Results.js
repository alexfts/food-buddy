import React from 'react';
import Map from '../../components/Map';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const Results = props => {
  const query = props.location.state
    ? props.location.state.query
    : 'restaurants';
  const openNow = props.location.state ? props.location.state.openNow : true;
  const price = props.location.state ? props.location.state.price : 1;
  const userMatches = props.location.state && props.location.state.userMatches;
  return (
    <Map
      query={query}
      openNow={openNow}
      price={price}
      userMatches={userMatches}
    />
  );
};

export default withStyles(styles)(Results);
