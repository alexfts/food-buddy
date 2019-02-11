import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  Avatar,
  Typography,
  Paper,
  withStyles
} from '@material-ui/core';
import { withTracker } from 'meteor/react-meteor-data';
import Gravatar from 'react-gravatar';
import { Tags } from '../../../api/tags';
import { Meteor } from 'meteor/meteor';
import styles from './styles';

const Profile = ({ classes, currentUser, tags }) => {
  // class Profile extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       selectedTags: []
  //     };
  //   }

  // console.log(
  //   currentUser.profile.tags.filter(userTag => {
  //     console.log(userTag);
  //     console.log(tags);
  //     return tags.find(tag => tag._id === userTag);
  //   })
  // );
  // if (currentUser) {
  //   const mappedTags = currentUser.profile.tags.map(userTags => {
  //     tags.find(tag => tag._id);
  //   });
  //   console.log(mappedTags);
  // }
  // const userTags = Meteor.user().profile.tags.map(userTags =>
  //   tags.find(tag => tag._id === userTag._id)
  // );

  // render() {
  //   const { classes, currentUser, tags } = this.props;

  return (
    <Fragment>
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.paperUser}>
          <div className={classes.userCard}>
            <div className={classes.profileAvatar}>
              {currentUser ? (
                <Avatar className={classes.avatarStyle}>
                  <Gravatar
                    className={classes.gravatar}
                    email={currentUser.emails[0].address}
                  />
                </Avatar>
              ) : (
                <div>user@email.com</div>
              )}
            </div>

            <div>
              {currentUser ? (
                <Typography className={classes.userStyle}>
                  {currentUser.username}
                </Typography>
              ) : (
                <div>username</div>
              )}
            </div>
          </div>
        </Paper>

        <div className={classes.divider} />

        {/* <Grid container> */}
        {/* <Grid item>{userTags}</Grid> */}
        <Paper square elevation={0} className={classes.paperTags}>
          <Typography variant="h6" className={classes.tagTitle}>
            All Tags:
          </Typography>
          {/* <Grid container> */}
          {tags.map(tag => {
            return (
              // <Grid item xs={4}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.tagButton}
                key={tag._id}
              >
                {tag.title}
              </Button>
              // </Grid>
            );
          })}
          {/* </Grid> */}
        </Paper>
      </div>
    </Fragment>
  );
};
// }

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
    tags: Tags.find({}).fetch()
  };
})(withStyles(styles)(Profile));
