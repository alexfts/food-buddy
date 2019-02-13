import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../../api/tags';
import { TagCategories } from '../../../api/tagCategories';
import { Grid, Typography, Button, Chip, Avatar } from '@material-ui/core';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';

const TopMatches = ({
  userids,
  users,
  currentUser,
  currentUserId,
  tags,
  tagCategories,
  classes,
  matches
}) => {
  console.log('MATCHES', matches, users);

  return matches ? (
    <div>
      {/* <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        scroll={this.state.scroll}
        aria-labelledby="scroll-dialog-title"
      > */}
      {/* <DialogTitle id="scroll-dialog-title"> */}
      <Typography className={classes.title} variant="h6">
        Your top matches:
      </Typography>
      {/* </DialogTitle> */}

      <Grid container spacing={16}>
        {matches.map(({ tagid, users }) => {
          const tag = tags.find(tag => tag._id === tagid);
          const category = tagCategories.find(
            categ => categ._id === tag.categoryid
          );
          return (
            <Grid
              item
              className={classes.matches}
              direction="column"
              justify="space-between"
              alignItems="center"
              // xs={12}
              // sm={6}
              key={tagid}
            >
              <Typography variant="h6">{tag.title}</Typography>

              <div>
                <Typography className={classes.fbMatches}>Matches:</Typography>
                {users.map(user => (
                  <Chip
                    key={user._id}
                    avatar={
                      <Avatar>
                        <Gravatar email={user.emails[0].address} />
                      </Avatar>
                    }
                    label={user.username}
                    color="default"
                    variant="outlined"
                  />
                ))}
              </div>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                className={classes.button}
                to={{
                  pathname: '/results',
                  state: {
                    query: tag.title
                  }
                }}
              >
                Find restaurants
              </Button>
            </Grid>
          );
        })}
      </Grid>
      {/* </Dialog> */}
    </div>
  ) : (
    <div>U suck</div>
  );
};

export default withTracker(() => {
  Meteor.subscribe('tags');
  Meteor.subscribe('tagCategories');
  Meteor.subscribe('users');

  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    users: Meteor.users.find({}).fetch(),
    tags: Tags.find({}).fetch(),
    tagCategories: TagCategories.find({}).fetch()
  };
})(withStyles(styles)(TopMatches));
