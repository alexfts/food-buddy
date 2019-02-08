import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';

const SelectGroupForm = ({ classes }) => {
  return <div>Select Group Form</div>;
};

SelectGroupForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectGroupForm);
