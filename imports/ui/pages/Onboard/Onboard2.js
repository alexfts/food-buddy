import React from 'react';
import PropTypes from 'prop-types';
import { Tags } from '../../../api/tags';
import { TagCategories } from '../../../api/tagCategories';
import { Meteor } from 'meteor/meteor';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Cuisine from '../../components/Tags_Cuisine';
import FoodTypes from '../../components/Tags_FoodTypes';
import DietandExtras from '../../components/Tags_DietandExtras';
import { withTracker } from 'meteor/react-meteor-data';
import {
  Button,
  Card,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@material-ui/core';

function getSteps() {
  return ['Cuisine', 'Food Types', 'Dietary Preferences and Others'];
}

function getStepContent(stepIndex, tags) {
  switch (stepIndex) {
    case 0:
      return (
        <>
          <ul>
            <Typography component="h1">
              We want to get to know you better. Please select your preferred
              <span color="primary"> cuisine</span>.
            </Typography>
            {tags.map(tag => {
              // console.log(tag);
              if (tag.categoryid === 'cuisine') {
                <Cuisine />;
              }
            })}
          </ul>
        </>
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

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { classes, tags } = this.props;
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
                  onClick={this.handleComplete}
                >
                  {this.completedSteps() === this.totalSteps() - 1
                    ? 'Finish'
                    : 'Complete Step'}
                </Button>
              </div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep, tags)}
              </Typography>
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
