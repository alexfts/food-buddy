import React from 'react';
import PropTypes from 'prop-types';
import { tags } from '../../../api/tags';
import { Meteor } from 'meteor/meteor';
import TagInput from '../../components/TagInput/TagInput';
import { Button,Step,StepLabel,Stepper,Typography } from '@material-ui/core';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';



const styles = theme => ({
 
});

function getSteps() {
  return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown stepIndex';
  }
}

class HorizontalLabelPositionBelowStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
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
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleNext}>
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

HorizontalLabelPositionBelowStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalLabelPositionBelowStepper);



const Onboard = () => {
  addTag = event => {
    event.preventDefault();
    let tagInput = this.tagInput.current.value;
    Meteor.call('tags.addTag', tagInput);
    tagInput = '';
  };

  deleteTag = tag => {
    Meteor.call('tags.deleteTag', tag._id);
  };

  return (
    <div>
      <header>
        <Typography component="h1">🍗Welcome to Food Buddies! </Typography>
        <Typography component="p">We want to get to know you better. Please select your preferred cuisine.</Typography>
        <form name="addTag" onSubmit={this.addTag}>
          <input type="text" />
        </form>
      </header>

      <ul>
        {tags.map(tag => (
          <TagInput key={tag._id} tag={tag} />
        ))}
      </ul>
    </div>
  );
};

export default withTracker()=>{Meteor.subscribe('tags');
return {
  tags: Tags.find({}).fetch()
}}(withStyles(styles))(Onboard);
