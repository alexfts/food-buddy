import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Loader from 'react-loader-spinner';

class Loading extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Loader
            type="Ball-Triangle"
            color="primary"
            height={100}
            width={100}
          />
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
