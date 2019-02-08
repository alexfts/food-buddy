import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { tags } from '../../../api/tags';
import { Button, Typography } from '@material-ui/core';
import { withTracker } from 'meteor/react-meteor-data';

const Cuisine = () => {
  return (
    <div>
      <header>
        <Typography component="h1">🍗Welcome to Food Buddies! </Typography>
        <Typography component="p">
          We want to get to know you better. Please select your preferred
          cuisine.
        </Typography>
        <form name="addTag" onSubmit={this.addTag}>
          <input type="text" />
        </form>
      </header>

      <ul>
        {tags.map(tag => (
          //   <TagInput key={tag._id} tag={tag} />

          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={deleteTag(tag._id)}
          >
            {tag.title}
          </Button>
        ))}
      </ul>
    </div>
  );
};

export default withTracker(() => {
  Meteor.subscribe('tags');
  return {
    tags: Tags.find({}).fetch()
  };
})(withStyles(styles))(Cuisine);
