import React, { Component } from 'react';
import './styles.css';
import AccountsWrapper from '../../components/AccountsWrapper';
import Header from '../../components/Header';
import { withTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../../api/tags';
import Profile from '../../pages/Profile/';
import { TagCategories } from '../../../api/tagCategories';
import { Typography } from '@material-ui/core';
import Layout from '../../routes/layout';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <div className="login-wrapper">
          <AccountsWrapper />
        </div>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>

        <Typography>Welcome to Food Buddy</Typography>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tags');
  Meteor.subscribe('tagCategories');
  Meteor.subscribe('users');

  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    tags: Tags.find({}).fetch(),
    tagCategories: TagCategories.find({}).fetch(),
    users: Meteor.users.find({}).fetch()
  };
})(App);
