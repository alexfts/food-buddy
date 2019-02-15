import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Fab, Dialog, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styles from './styles';
import SelectGroupForm from '../../components/SelectGroupForm';

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
    const { classes } = this.props;

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
            height="100%"
          >
            <div className={classes.paper}>
              <SelectGroupForm />
            </div>
          </Dialog>
        </Modal>

        <div>
          <iframe
            className={classes.map}
            width="100%"
            src="https://www.google.com/maps/embed/v1/search?q=restaurants%20near%20me&key=AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E"
          />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
