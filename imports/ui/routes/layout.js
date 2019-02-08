import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import { withTracker } from 'meteor/react-meteor-data';

// import NavBar from '../components/NavBar/NavBar';

const Layout = props => {
  //   if (!currentUserId) return
  //   if (currentUserId) {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  );
  //   } else {
  //     return (
  //       <Switch>
  //         {/* <Route exact path="/welcome" component={Login} /> */}
  //         {/* <Redirect from="*" to="/welcome" />; */}
  //       </Switch>
  //     );
};
// };

export default withTracker(() => {
  Meteor.subscribe('todos');
  return {
    //the withtracker method lets us write a mongodb query and store the info in a prop called todos.
    //the Todos.find({}) is the mongodb query equivalent for SELECT * FROM Todos.
    currentUser: Meteor.user()
    // currentUserId: Meteor.userId()
    // tags: Tags.find({}).fetch()
  };
})(Layout);
