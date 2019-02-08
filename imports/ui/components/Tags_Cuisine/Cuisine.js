import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { Tags } from '../../../api/tags';
import { TagCategories } from '../../../api/tagCategories';
import { Button, Card, Typography } from '@material-ui/core';
import { withTracker } from 'meteor/react-meteor-data';

const Cuisine = ({ tags }) => {
  console.log(tags);
  return (
    <ul>
      {tags.map(
        tag => {
          tag.title;
        }
        // <li>
        //   <Button
        //     variant="outlined"
        //     color="primary"
        //     className={classes.button}
        //     // onClick={deleteTag(tag._id)}
        //   >

        //   </Button>
        // </li>
      )}
    </ul>
  );
};

export default withTracker(() => {
  Meteor.subscribe('tagCategories');
  Meteor.subscribe('tags');
  return {
    tagCategories: TagCategories.find({}).fetch(),
    tags: Tags.find({}).fetch()
  };
})(withStyles(styles)(Cuisine));
