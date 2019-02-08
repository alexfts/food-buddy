import React from 'react';
import PropTypes from 'prop-types';
import { tags } from '../../../api/tags';
import { Meteor } from 'meteor/meteor';
import TagInput from '../../components/TagInput/TagInput';
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

function getSteps() {
  return ['Cuisine', 'Food Types', 'Dietary Preferences and Others'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select your favourite cuisines:';
    case 1:
      return 'Select your favourite Food Types';
    case 2:
      return 'Select any dietary preferences';
    default:
      return 'Unknown stepIndex';
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

export default withStyles(styles)(Onboard);
