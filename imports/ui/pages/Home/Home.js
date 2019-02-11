import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import styles from './styles';
import SelectGroupForm from '../../components/SelectGroupForm';

class Home extends Component {
  state = {
    open: false
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
      <div>
        <Button onClick={this.handleOpen}>Open Modal</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.modal}
        >
          <div className={classes.paper}>
            <SelectGroupForm />
          </div>
        </Modal>
      </div>
      <div>
        <iframe width="600" height="450"
        src="https://www.google.com/maps/embed/v1/search?q=indian%20or%20thai%20restaurants%20near%20me&key=AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E">
        </iframe>
      </div>
      </Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
