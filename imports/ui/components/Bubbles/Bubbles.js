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
// import { Chip } from '@material-ui/core';
import { ChipSet, Chip } from '@material/react-chips';
import '@material/react-chips/dist/chips.css';

class Bubbles extends React.Component {
  state = {
    selectedTags: []
  };

  handleChange = tag => {
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

  handleSelect = () => {
    console.log('selected');
  };

  render() {
    const { classes } = this.props;
    console.log(this.state);

    return (
      <ChipSet
        filter
        selectedTags={this.state.selectedTags}
        handleSelect={selectedTags => this.setState({ selectedTags })}
      >
        {/* // <div> */}
        {this.props.tags.map(tag => (
          <Chip
            variant="outlined"
            color="primary"
            key={tag._id}
            label={tag.title}
            className={classes.chip}
            onClick={() => {
              this.handleChange(tag);
            }}
          />
        ))}
        {/* </div> */}
      </ChipSet>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tags');
  Meteor.subscribe('tagCategories');
  return {
    tags: Tags.find({}).fetch(),
    tagCategories: TagCategories.find({}).fetch()
  };
})(withStyles(styles, { withTheme: true })(Bubbles));
