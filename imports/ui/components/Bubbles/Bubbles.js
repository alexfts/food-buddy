import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { TagCategories } from '../../../api/tagCategories';
import { Tags } from '../../../api/tags';
import { Chip } from '@material-ui/core';
// import { ChipSet, Chip } from '@material/react-chips';
import '@material/react-chips/dist/chips.css';
import theme from '../../theme';

class Bubbles extends React.Component {
  constructor(props) {
    super(props);
    let selectedTags = [];
    // let colorChange = [];
    if (this.props.currentUser.profile && this.props.currentUser.profile.tags) {
      selectedTags = this.props.currentUser.profile.tags;
    }
    this.state = {
      selectedTags
      // colorChange
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

  toggle = tag => {
    if (this.state.colorChange == tag._id) {
      this.setState({ colorChange: null });
    } else {
      this.setState({ colorChange: tag._id });
    }
  };

  colorChange = tag => {
    if (this.state.colorChange === tag._id) {
      return 'primary';
    }
    return 'default';
  };

  render() {
    const { classes } = this.props;
    console.log('state:', this.state);

    return (
      // <ChipSet
      //   filter
      //   selectedTags={this.state.selectedTags}
      //   handleSelect={selectedTags => this.setState({ selectedTags })}
      // >
      <div>
        {this.props.tags.map(tag => (
          <Chip
            variant="outlined"
            color={this.colorChange(tag)}
            key={tag._id}
            label={tag.title}
            className={classes.chip}
            onClick={() => {
              this.handleSelect(tag);
              this.toggle(tag);
            }}
          />
        ))}
      </div>
      // </ChipSet>
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
