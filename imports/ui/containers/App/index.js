import React, { Component } from 'react';
import './styles.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../../api/tags';
import { TagCategories } from '../../../api/tagCategories';
import Layout from '../../routes/layout';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <div className="login-wrapper">{/* <LoginForm /> */}</div>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </MuiThemeProvider>
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
