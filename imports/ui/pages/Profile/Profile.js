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
import { TagCategories } from '../../../api/tagCategories';
import { Meteor } from 'meteor/meteor';
import styles from './styles';
import Bubbles from '../../components/Bubbles';

const Profile = ({ currentUser, tags, tagCategories, classes }) => {
  tagCategories = tagCategories.filter(category => category.title !== 'Extra');
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

        {/*  */}
        <Paper square elevation={0} className={classes.paperTags} />
        {/*  */}

        <Paper square elevation={0} className={classes.paperTags}>
          <Typography variant="h6">Change Tags:</Typography>
          {tagCategories.map(({ _id, title }) => (
            <Fragment key={_id}>
              <Typography variant="h6" className={classes.tagTitle}>
                {title}
              </Typography>
              <Bubbles
                tags={tags.filter(tag => tag.category._id === _id)}
                categoryid={_id}
              />
            </Fragment>
          ))}
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
  Meteor.subscribe('tags');
  Meteor.subscribe('tagCategories');
  return {
    currentUser: Meteor.user(),
    tags: Tags.find({}).fetch(),
    tagCategories: TagCategories.find({}).fetch()
  };
})(withStyles(styles)(Profile));
