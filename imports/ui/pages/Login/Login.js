import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Grid, Typography } from '@material-ui/core';
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
            src="/logo-thick.png"
            alt="Drumsticks cheers"
          />
          <img
            className={classes.textLogo}
            src="/Food_Buddy.png"
            alt="Food Buddy app"
          />
        </Grid>

        <LoginForm />

        <Typography className={classes.copyright}>
          &copy; 2019 Digital Salami Inc. All Rights Reserved
        </Typography>
      </div>
    </div>
  );
};

export default withStyles(styles)(Login);
