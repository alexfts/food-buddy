import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Onboard from '../pages/Onboard';
import Login from '../pages/Login';
import Results from '../pages/Results';
import Loader from '../components/Loader';
import { withTracker } from 'meteor/react-meteor-data';
import Header from '../components/Header/Header';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

const Layout = ({ loggedOut, currentUser }) => {
  const isOnboarded = user => {
    return user.profile && user.profile.tags && user.profile.tags.length > 0;
  };

  if (loggedOut) {
    return (
      <Switch>
        <Route exact path="/welcome" component={Login} />
        <Redirect from="*" to="/welcome" />;
      </Switch>
    );
  }
  if (!currentUser) {
    return <Loader inverted />;
  }
  return (
    <Fragment>
      <Header />
      {currentUser && isOnboarded(currentUser) ? (
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/onboard" component={Onboard} />
          <Route exact path="/results" component={Results} />
          <Redirect from="*" to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/onboard" component={Onboard} />
          <Redirect from="*" to="/onboard" />
        </Switch>
      )}
    </Fragment>
  );
};

Layout.propTypes = {
  loggedOut: PropTypes.bool.isRequired,
  currentUser: PropTypes.object
};

export default withRouter(
  withTracker(() => {
    return {
      currentUser: Meteor.user(),
      loggedOut:
        !Meteor.user() &&
        !Meteor.loggingIn() &&
        Accounts.loginServicesConfigured()
    };
  })(Layout)
);
