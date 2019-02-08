import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { tags } from '../../../api/tags';
import { Button, Typography } from '@material-ui/core';
// import { withTracker } from 'meteor/react-meteor-data';

const Cuisine = () => {
  return (
    <div>
      <header>
        <Typography component="h1">🍗Welcome to Food Buddies! </Typography>
        <Typography component="p">
          We want to get to know you better. Please select your preferred
          cuisine.
        </Typography>
        <form name="addTag" onSubmit={this.addTag}>
          <input type="text" />
        </form>
      </header>
    </div>
  );
};

export default withStyles(styles)(Cuisine);
