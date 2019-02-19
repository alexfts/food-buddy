import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../../api/tags';
import { TagCategories } from '../../../api/tagCategories';
import {
  Avatar,
  Grid,
  Typography,
  Button,
  Chip,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';
import PriceSlider from '../PriceSlider';

class TopMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNow: true
    };
  }

  handleOpenNowChange = event => {
    this.setState({ openNow: event.target.checked });
  };

  render() {
    const { allTags, classes, matches, userids } = this.props;
    const groupMembers = userids.map(userid =>
      this.props.users.find(u => u._id === userid)
    );
    return matches ? (
      <div className={classes.container}>
        <Typography className={classes.title} variant="h5">
          Your top matches:
        </Typography>
        <Grid
          container
          justify="space-between"
          align="center"
          className={classes.topMatchesHeader}
        >
          <PriceSlider />
          <FormControlLabel
            className={classes.switch}
            label="Open now"
            control={
              <Switch
                checked={this.state.openNow}
                onChange={this.handleOpenNowChange}
                value="openNow"
              />
            }
          />
        </Grid>

        <div className={classes.placesList}>
          {matches.map(({ tagids, users }, i) => {
            const userTags = allTags.filter(tag => tagids.includes(tag._id));
            const userTagTitles = userTags.map(tag => tag.title);
            return (
              <Grid
                item
                xs={12}
                sm={6}
                key={userTagTitles.join(',')}
                className={classes.matches}
              >
                <Typography className={classes.tagTitle}>
                  {userTagTitles.join(' or ')}
                </Typography>

                <div className={classes.flexMatches}>
                  <Typography className={classes.matchesLabel}>
                    Match:
                  </Typography>
                  {users.map(user => (
                    <Chip
                      className={classes.user}
                      key={user._id}
                      label={user.username}
                      color="default"
                      variant="default"
                      avatar={
                        <Avatar>
                          <Gravatar
                            className={classes.gravatar}
                            email={user.emails[0].address}
                          />
                        </Avatar>
                      }
                    />
                  ))}
                </div>

                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    component={Link}
                    size="small"
                    to={{
                      pathname: '/results',
                      state: {
                        query: userTagTitles
                          .map(title => `(${title})`)
                          .join(' OR '),
                        price: this.state.price,
                        openNow: this.state.openNow,
                        userMatches: groupMembers
                      }
                    }}
                  >
                    Select
                  </Button>
                </div>
              </Grid>
            );
          })}
        </div>
      </div>
    ) : (
      <div>No matches found</div>
    );
  }
}

TopMatches.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTracker(() => {
  Meteor.subscribe('tags');
  Meteor.subscribe('tagCategories');
  Meteor.subscribe('users');

  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    users: Meteor.users.find({}).fetch(),
    allTags: Tags.find({}).fetch(),
    tagCategories: TagCategories.find({}).fetch()
  };
})(withStyles(styles)(TopMatches));
