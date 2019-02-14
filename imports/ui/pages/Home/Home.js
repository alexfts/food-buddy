import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Fab,
  Dialog,
  DialogActions,
  Modal,
  Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import styles from './styles';
import SelectGroupForm from '../../components/SelectGroupForm';

class Home extends Component {
  state = {
    multi: null,
    matches: null,
    open: false,
    scroll: 'paper'
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

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.container}>
          <Fab
            aria-label="Add"
            className={classes.plate}
            onClick={this.handleClickOpen('paper')}
            // onClick={this.handleOpen}
          >
            <AddIcon />
          </Fab>

          <img src="/fork-and-knife.svg" className={classes.plateImg} />

          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
            className={classes.flexbox}
            width="100%"
          >
            {/* <div className={classes.paper}> */}
            <SelectGroupForm />
            {/* </div> */}
          </Modal>
        </div>

        <div>
          <iframe
            className={classes.map}
            width="100%"
            height="650"
            src="https://www.google.com/maps/embed/v1/search?q=restaurants%20near%20me&key=AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E"
          />
        </div>
      </Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
