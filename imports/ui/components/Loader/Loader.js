import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress, Typography } from '@material-ui/core';

function Loader(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography className={classes.loading}>Loading...</Typography>
        <LinearProgress className={classes.linear} />
      </div>
    </div>
  );
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loader);
