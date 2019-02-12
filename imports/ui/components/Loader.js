import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';
const styles = theme => ({
  root: {
    background: 'white',
    height: '100%'
  },
  container: {
    margin: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  suck: {
    color: theme.palette.primary.main,
    width: '100%',
    fontSize: '3rem',
    fontWeight: 500,
    lineHeight: 1.5,
    textAlign: 'center',
    paddingLeft: 15,
    paddingTop: 50
  }
});

const FullScreenLoader = ({ classes }) => {
  return (
    <div className={classes.root}>
      <CircularProgress color="primary" size={80} thickness={2} />{' '}
      <Typography className={classes.suck}>🤯🤓 You Suck 🤬🤮</Typography>
    </div>
  );
};
export default withStyles(styles)(FullScreenLoader);
