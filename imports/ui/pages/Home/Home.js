import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Fab, Dialog, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styles from './styles';
import SelectGroupForm from '../../components/SelectGroupForm';
import MapComponent from '../../components/Map/Map';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../../api/tags';

class Home extends Component {
  state = {
    multi: null,
    matches: null,
    open: false,
    scroll: 'paper',
    hover: false
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  mouseOver = () => {
    this.setState({ hover: true });
  };
  mouseOut = () => {
    this.setState({ hover: false });
  };

  render() {
    const { classes, tags } = this.props;
    //if there are tags, pick a random tag
    let query = Meteor.user().profile.tags.map(tagId =>
      tags.find(t => t._id === tagId)
    );
    if (query && query[1]) {
      query = query[1].title; // TODO randomize query
    }
    // ? meteor.user().profile.tags
    // : 'restaurants';
    console.log(this.props.tags);
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
          <MapComponent query={query} />
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
    tags: Tags.find({}).fetch()
  };
})(withStyles(styles)(Home));
