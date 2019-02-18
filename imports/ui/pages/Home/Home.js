import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Fab, Dialog, Modal, Snackbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styles from './styles';
import SelectGroupForm from '../../components/SelectGroupForm';
import MapComponent from '../../components/Map/Map';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../../api/tags';

const generateRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multi: null,
      matches: null,
      open: false,
      scroll: 'paper',
      hover: false,
      displaySnackbar: false
    };
  }

  componentDidMount() {
    // Delay showing the snackbar right away for better UX
    this.timer = setTimeout(() => {
      this.setState({ displaySnackbar: true });
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleCloseSnackbar = () => {
    this.setState({ displaySnackbar: false });
  };

  mouseOver = () => {
    this.setState({ hover: true });
  };
  mouseOut = () => {
    this.setState({ hover: false });
  };

  render() {
    const { classes, tags } = this.props;
    let { userTags } = this.props;
    //if there are tags, pick a random tag
    userTags = userTags
      .map(tagId => tags.find(t => t._id === tagId))
      .filter(tag => {
        if (tag && tag.category) {
          return tag.category.title !== 'Dietary Preferences';
        }
      });
    let query;
    if (userTags && !this.randomIndex) {
      this.randomIndex = generateRandomInt(0, userTags.length - 1);
    }
    if (userTags && userTags[this.randomIndex]) {
      query = userTags[this.randomIndex].title;
    }
    return (
      <div className={classes.container}>
        <Fab
          aria-label="Add"
          className={classes.fab}
          color="primary"
          onClick={this.handleClickOpen('paper')}
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut}
        >
          <AddIcon className={classes.plate} />
        </Fab>
        {this.state.hover ? (
          <img
            src="/fork-and-knife.svg"
            alt="plate set"
            className={classes.plateImg}
          />
        ) : null}

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.flexbox}
          width="100%"
        >
          <Dialog
            className={classes.dialog}
            open={this.state.open}
            onClose={this.handleClose}
            scroll={this.state.scroll}
            aria-labelledby="scroll-dialog-title"
          >
            <div className={classes.paper}>
              <SelectGroupForm />
            </div>
          </Dialog>
        </Modal>

        <div>
          {query && <MapComponent query={query} />}

          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            open={query && this.state.displaySnackbar}
            onClose={this.handleCloseSnackbar}
            autoHideDuration={5000}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={
              <span id="message-id">{`You like ${query} restaurants. Check them out!`}</span>
            }
          />
          <Snackbar
            className={classes.snackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={query && this.state.displaySnackbar}
            onClose={this.handleCloseSnackbar}
            autoHideDuration={8000}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={<span id="message-id">{`Create your group here!`}</span>}
          />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTracker(() => {
  Meteor.subscribe('tags');

  return {
    tags: Tags.find({}).fetch(),
    userTags: Meteor.user().profile.tags
  };
})(withStyles(styles)(Home));
