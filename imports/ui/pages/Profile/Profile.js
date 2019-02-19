import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Typography, Paper, Grid, withStyles } from '@material-ui/core';
import { withTracker } from 'meteor/react-meteor-data';
import Gravatar from 'react-gravatar';
import { Tags } from '../../../api/tags';
import { TagCategories } from '../../../api/tagCategories';
import { Meteor } from 'meteor/meteor';
import styles from './styles';
import TagSelections from '../../components/TagSelections';
import RestaurantCard from '../../components/RestaurantCard';

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

        <Paper square elevation={0} className={classes.paperTags}>
          <Typography variant="h6" className={classes.editTitle}>
            Edit your preferences below
          </Typography>
          {tagCategories.map(({ _id, title }) => (
            <Fragment key={_id}>
              <div className={classes.tagsContainer}>
                <Typography variant="h6" className={classes.tagTitle}>
                  {title}:
                </Typography>
                <TagSelections
                  tags={tags.filter(tag => tag.category._id === _id)}
                  categoryid={_id}
                />
              </div>
            </Fragment>
          ))}
        </Paper>

        <div className={classes.divider} />

        {currentUser.profile &&
          currentUser.profile.favourites &&
          currentUser.profile.favourites.length > 0 && (
            <Paper square elevation={0} className={classes.paperTags}>
              <Typography variant="h6" className={classes.editTitle}>
                Your favourites
              </Typography>
              <Grid container spacing={24}>
                {currentUser.profile.favourites.map(({ details, ...place }) => {
                  return (
                    <Grid item xs={12} sm={4} key={place.place_id}>
                      <RestaurantCard place={place} details={details} />
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
          )}
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    emails: PropTypes.array.isRequired,
    profile: PropTypes.object.isRequired
  }).isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  tagCategories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired
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
