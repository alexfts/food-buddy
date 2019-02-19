import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import ReactLoader from 'react-loader-spinner';

const Loader = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.container}>
      <ReactLoader
        type="Ball-Triangle"
        color="#fb8f2f"
        height={100}
        width={100}
      />
    </div>
  </div>
);

Loader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loader);
