import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { TagCategories } from '../../../api/tagCategories';
import { Tags } from '../../../api/tags';
import Chip from '@material-ui/core/Chip';
import styles from './styles';

class Bubbles extends React.Component {
  constructor(props) {
    super(props);
    let selectedTags = [];
    if (this.props.currentUser.profile && this.props.currentUser.profile.tags) {
      selectedTags = this.props.currentUser.profile.tags;
    }
    this.state = {
      selectedTags
    };
  }

  handleSelect = tag => {
    this.state.selectedTags.some(t => t === tag._id)
      ? this.setState(
          {
            selectedTags: this.state.selectedTags.filter(t => {
              return t !== tag._id;
            })
          },
          () => {
            Meteor.call('users.updateUserTags', this.state.selectedTags);
          }
        )
      : this.setState(
          { selectedTags: [...this.state.selectedTags, tag._id] },
          () => {
            Meteor.call('users.updateUserTags', this.state.selectedTags);
          }
        );
  };

  render() {
    const { classes } = this.props;
    console.log(this.props.tags);
    return (
      <div>
        {this.props.tags.map(tag => (
          <Chip
            clickable
            variant="outlined"
            color="primary"
            label={tag.title}
            key={tag._id}
            className={classes.chip}
            onClick={() => this.handleSelect(tag)}
          />
        ))}
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tags');
  Meteor.subscribe('tagCategories');
  return {
    currentUser: Meteor.user(),
    tagCategories: TagCategories.find({}).fetch()
  };
})(withStyles(styles, { withTheme: true })(Bubbles));
