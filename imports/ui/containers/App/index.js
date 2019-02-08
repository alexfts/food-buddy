import React, { Component } from 'react';
import './styles.css';
import AccountsWrapper from "../../components/AccountsWrapper";
import Header from "../../components/Header";
import { withTracker } from "meteor/react-meteor-data";
import { Tags } from "../../../api/tags";

class App extends Component {

render() {

    return (
      <div className="app-wrapper">
        <div className="login-wrapper">
          <AccountsWrapper />
        </div>
        <Header />
        <p>Welcome to Food Buddy</p>
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
