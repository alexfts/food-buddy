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
import Bubbles from '../../components/Bubbles';

const Profile = ({ currentUser, tags, classes }) => {
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

        {/*TODO Map all tags and highlight ones that are already selected  */}
        <div className={classes.divider} />
        {/* <Paper square elevation={0} className={classes.paperTags}>
          <Typography variant="h6" className={classes.tagTitle}>
            Your Tags:
          </Typography>
          <ul>
            {currentUser.profile.tags.map(selectedTag => {
              return tags.map(tag => {
                if (tag._id === selectedTag) {
                  return (
                    <li>
                      <Button
                        variant="outlined"
                        color="primary"
                        className={classes.tagButton}
                        key={tag._id}
                      >
                        {tag.title}
                      </Button>
                    </li>
                  );
                }
              });
            })}
          </ul>
        </Paper> */}

        <div className={classes.divider} />

        <Paper square elevation={0} className={classes.paperTags}>
          <Typography variant="h6" className={classes.tagTitle}>
            Change Tags:
          </Typography>
          <Typography variant="h6" className={classes.tagTitle}>
            Cuisines
          </Typography>
          <Bubbles
            tags={tags.filter(tag => tag.category.title === 'Cuisine')}
          />
          <Typography variant="h6" className={classes.tagTitle}>
            Food Types
          </Typography>
          <Bubbles
            tags={tags.filter(tag => tag.category.title === 'Food Types')}
          />
          <Typography variant="h6" className={classes.tagTitle}>
            Dietary Preferences
          </Typography>
          <Bubbles
            tags={tags.filter(
              tag => tag.category.title === 'Dietary Preferences'
            )}
          />

          {/* {tags.map(tag => {
            return (
              <Button
                variant="outlined"
                color="primary"
                className={classes.tagButton}
                key={tag._id}
              >
                {tag.title}
              </Button>
            );
          })} */}
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
