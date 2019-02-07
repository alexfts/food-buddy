import React, { Component } from 'react';
import './styles.css';
import AccountsUIWrapper from '../../components/AccountsWrapper';
import { withTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../../api/tags';
import { Typography } from '@material-ui/core';

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <div className="login-wrapper">
          <AccountsUIWrapper />
        </div>
        <Typography>Welcome to Food Buddy</Typography>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tags');

  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    tags: Tags.find({}).fetch()
  };
})(App);
