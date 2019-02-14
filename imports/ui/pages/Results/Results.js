import React, { Fragment } from 'react';
import MapComponent from '../../components/Map/Map';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const Results = props => {
  return <MapComponent />;
};

export default withStyles(styles)(Results);
