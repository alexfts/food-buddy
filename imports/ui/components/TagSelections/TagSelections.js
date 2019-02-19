import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Chip } from '@material-ui/core';

class TagSelections extends Component {
  constructor(props) {
    super(props);
    const { currentUser, categoryid, tags } = this.props;
    let selectedTags = [];
    if (currentUser.profile && currentUser.profile.tags) {
      selectedTags = currentUser.profile.tags;
      if (categoryid) {
        selectedTags = selectedTags.filter(tagid => {
          const tag = tags.find(t => t._id === tagid);
          return tag && tag.category._id === categoryid;
        });
      }
    }
    this.state = {
      selectedTags
    };
  }

  updateTagsInDB = () => {
    const { categoryid } = this.props;
    if (categoryid) {
      Meteor.call(
        'users.updateUserTagsByCategory',
        this.state.selectedTags,
        categoryid
      );
    } else {
      Meteor.call('users.updateUserTags', this.state.selectedTags);
    }
  };

  handleSelect = tag => {
    this.state.selectedTags.some(t => t === tag._id)
      ? this.setState(
          {
            selectedTags: this.state.selectedTags.filter(t => {
              return t !== tag._id;
            })
          },
          this.updateTagsInDB
        )
      : this.setState(
          { selectedTags: [...this.state.selectedTags, tag._id] },
          this.updateTagsInDB
        );
  };

  sortTagsAlphabet(tags) {
    const sortedTags = [...tags];
    sortedTags.sort((tag1, tag2) => {
      if (tag1.title < tag2.title) return -1;
      else return 1;
    });
    return sortedTags;
  }

  render() {
    const { classes } = this.props;
    const tags = this.sortTagsAlphabet(this.props.tags);

    return (
      <div className={classes.bubbleWrap}>
        {tags.map(tag => (
          <Chip
            variant={
              this.state.selectedTags.includes(tag._id) ? 'default' : 'outlined'
            }
            color={
              this.state.selectedTags.includes(tag._id) ? 'primary' : 'default'
            }
            key={tag._id}
            label={tag.title}
            className={
              this.state.selectedTags.includes(tag._id)
                ? classes.chipSelected
                : classes.chip
            }
            onClick={() => this.handleSelect(tag)}
          />
        ))}
      </div>
    );
  }
}

TagSelections.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  categoryid: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tags: PropTypes.array.isRequired
};

export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(withStyles(styles, { withTheme: true })(TagSelections));
