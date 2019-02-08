import React, { Fragment } from 'react';
import { Grid, Avatar } from '@material-ui/core';
import { withTracker } from 'meteor/react-meteor-data';
import Gravatar from 'react-gravatar';
import { TagCategories } from '../../../api/tagCategories';
import { Tags } from '../../../api/tags';
import TagInput from '../../components/TagInput';
import './styles';
import { Meteor } from 'meteor/meteor';

// const tags = ['seafood', 'japanese', 'italian', 'burgers', 'vergetarian'];
// console.log(currentUser);

// console.log(this.props.currentUser);
const Profile = ({ currentUser, currentUserId, tags }) => {
  console.log(currentUser, currentUserId);
  console.log(tags);

  return (
    <Fragment>
      <div>
        {currentUser ? (
          <Avatar>
            <Gravatar email={currentUser.emails[0].address} />
          </Avatar>
        ) : (
          <div>something</div>
        )}
        {currentUser ? currentUser.username : <div> something</div>}
      </div>

      {/*TODO Map all tags and highlight ones that are already selected  */}

      <Grid container>
        <Grid item>
<<<<<<< HEAD
          {/* {tags.map(tags => {
            return <Grid item xs={1} />;
          })} */}
=======
          {tags.map(tag => {
            return (
              <Grid item xs={1}>
                {tag.title}
              </Grid>
            );
          })}
>>>>>>> 4261af1538c7913e3730ca46a5ecef9f57eaf7e6
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
    tags: Tags.find({}).fetch()

    // currentUserId: Meteor.userId()
  };
})(Profile);
