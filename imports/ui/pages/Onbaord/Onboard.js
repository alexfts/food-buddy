import React from 'react';
import PropTypes from 'prop-types';
import { tags } from '../../../api/tags';
import { Meteor } from 'meteor/meteor';
import TagInput from '../../components/TagInput/TagInput';
import { Typography } from '@material-ui/core';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';

const Onboard = () => {
  addTag = event => {
    event.preventDefault();
    let tagInput = this.tagInput.current.value;
    Meteor.call('tags.addTag', tagInput);
    tagInput = '';
  };

  deleteTag = tag => {
    Meteor.call('tags.deleteTag', tag._id);
  };

  return (
    <div>
      <header>
        <Typography component="h1">🍗Welcome to Food Buddies! </Typography>
        <Typography component="p">Help us get to know you better!</Typography>
        <form name="addTag" onSubmit={this.addTag}>
          <input type="text" />
        </form>
      </header>

      <ul>
        {tags.map(tag => (
          <TagInput key={tag._id} tag={tag} />
        ))}
      </ul>
    </div>
  );
};

export default withTracker()=>{Meteor.subscribe('tags');
return {
  tags: Tags.find({}).fetch()
}}(withStyles(styles))(Onboard);
