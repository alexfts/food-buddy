import React, { Fragment } from 'react';
import MapComponent from '../../components/Map/Map';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const Results = props => {
  const query = props.location.state
    ? props.location.state.query
    : 'restaurants';
  const openNow = props.location.state ? props.location.state.openNow : true;
  const price = props.location.state ? props.location.state.price : 1;
  return <MapComponent query={query} openNow={openNow} price={price} />;
};

export default withStyles(styles)(Results);
