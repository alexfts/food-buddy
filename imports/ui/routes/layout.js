import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Onboard from '../pages/Onboard';
import Login from '../pages/Login';
import FullScreenLoader from '../components/Loader';
import { withTracker } from 'meteor/react-meteor-data';
import { TagCategories } from '../../api/tagCategories';
import { Tags } from '../../api/tags';
import { Accounts } from 'meteor/accounts-base';

// import NavBar from '../components/NavBar/NavBar';

const Layout = ({ loggedOut }) => {
  //   if (loading) {
  //     // console.log(users.length);
  //     return <FullScreenLoader inverted />;
  //   }

  if (!loggedOut) {
    if (!Meteor.userId()) {
      return <FullScreenLoader inverted />;
    }
    return (
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/onboard" component={Onboard} />
        <Redirect from="*" to="/home" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route exact path="/welcome" component={Login} />
        <Redirect from="*" to="/welcome" />;
      </Switch>
    );
  }
};

export default withTracker(() => {
  return {
    //the withtracker method lets us write a mongodb query and store the info in a prop called todos.
    //the Todos.find({}) is the mongodb query equivalent for SELECT * FROM Todos.
    loggedOut:
      !Meteor.user() &&
      !Meteor.loggingIn() &&
      Accounts.loginServicesConfigured()
  };
})(Layout);
