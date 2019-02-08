import React, { Component } from 'react';
import './styles.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import Header from '../../components/Header';
import { withTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../../api/tags';
import { TagCategories } from '../../../api/tagCategories';
import Profile from '../../pages/Profile/';
import { Typography } from '@material-ui/core';
import Layout from '../../routes/layout';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <div className="login-wrapper">{/* <LoginForm /> */}</div>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
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
