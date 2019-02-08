import React from 'react';
import PropTypes from 'prop-types';
import { tags } from '../../../api/tags';
import { Meteor } from 'meteor/meteor';
import {
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@material-ui/core';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Cuisine from '../../components/Tags_Cuisine';
import FoodTypes from '../../components/Tags_FoodTypes';
import DietandExtras from '../../components/Tags_DietandExtras';

function getSteps() {
  return ['Cuisine', 'Food Types', 'Dietary Preferences and Others'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
        <ul>
          {tags.map(tag => (
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={deleteTag(tag._id)}
            >
              <Cuisine />
            </Button>
          ))}
        </ul>
      );
    case 1:
      return (
        <ul>
          {tags.map(tag => (
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={deleteTag(tag._id)}
            >
              <FoodTypes />
            </Button>
          ))}
        </ul>
      );
    case 2:
      return (
        <ul>
          {tags.map(tag => (
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={deleteTag(tag._id)}
            >
              <DietandExtras />
            </Button>
          ))}
        </ul>
      );
    default:
      return 'Unknown section';
  }
}

class Onboard extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Onboard.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default withStyles(styles)(Onboard);

export default withTracker(() => {
  Meteor.subscribe('tags');
  return {
    tags: Tags.find({}).fetch()
  };
})(withStyles(styles))(OnBoard);
