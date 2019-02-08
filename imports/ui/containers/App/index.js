import React, { Component } from 'react';
import './styles.css';
import AccountsUIWrapper from '../../components/AccountsWrapper';
import { withTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../../api/tags';
import Profile from '../../pages/Profile/';

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <div className="login-wrapper">
          <AccountsUIWrapper />
        </div>
        {/* <p>Welcome to Food Buddy</p> */}
        <div>
          <Profile />
        </div>
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
