import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Onboard from '../pages/Onboard';
import Login from '../pages/Login';
import Results from '../pages/Results';
import FullScreenLoader from '../components/Loader';
import { withTracker } from 'meteor/react-meteor-data';
import Header from '../components/Header/Header';
import { TagCategories } from '../../api/tagCategories';
import { Tags } from '../../api/tags';
import { Accounts } from 'meteor/accounts-base';

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
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/onboard" component={Onboard} />
          <Route exact path="/results" component={Results} />
          <Redirect from="*" to="/home" />
        </Switch>
      </Fragment>
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
