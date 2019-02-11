import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Grid } from '@material-ui/core';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

const Login = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.loginForm}>
        <Grid
          container
          className="root"
          direction="column"
          alignItems="center"
          justify="center"
        >
          <img
            className={classes.logo}
            src="/cheers_logo.png"
            alt="Logo"
            width="150"
          />
          <img src="/Food_Buddy.png" alt="Food Buddy app" height="40" />
        </Grid>

        {/* <Grid container item xs={12} sm={12} md={6}> */}

        <LoginForm />
      </div>
      {/* </Grid> */}
    </div>
  );
};

export default withStyles(styles)(Login);
