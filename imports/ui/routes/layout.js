import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Onboard from '../pages/Onboard';
import Login from '../pages/Login';
import FullScreenLoader from '../components/Loader';
import { withTracker } from 'meteor/react-meteor-data';
import Header from '../components/Header/Header';

const Layout = ({ currentUserId }) => {
  if (!currentUserId) return <FullScreenLoader inverted />;
  if (currentUserId) {
    return (
      <Fragment>
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/onboard" component={Onboard} />
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
  Meteor.subscribe('todos');
  return {
    // the withtracker method lets us write a mongodb query and store the info in a prop called todos.
    // the Todos.find({}) is the mongodb query equivalent for SELECT * FROM Todos.
    currentUser: Meteor.user()
    // currentUserId: Meteor.userId()
    // tags: Tags.find({}).fetch()
  };
})(Layout);
