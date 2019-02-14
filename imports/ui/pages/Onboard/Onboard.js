import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { TagCategories } from '../../../api/tagCategories';
import { Tags } from '../../../api/tags';
import Chip from '@material-ui/core/Chip';
import Bubbles from '../../components/Bubbles';
import { Link } from 'react-router-dom';

function getSteps() {
  return [
    'We want to get to know you better! Please select your favourite cusines:',
    'Select your favourite food types:',
    'Select any dietary preferences and extra info:'
  ];
}

class Onboard extends React.Component {
  state = {
    activeStep: 0
  };

  getStepContent = step => {
    const { tagCategories } = this.props;
    switch (step) {
      case 0:
        return (
          <Bubbles
            tags={this.props.tags.filter(
              tag => tag.category.title === 'Cuisine'
            )}
            categoryid={
              tagCategories &&
              tagCategories.length > 0 &&
              tagCategories.find(category => category.title === 'Cuisine')._id
            }
          />
        );
      case 1:
        return (
          <Bubbles
            tags={this.props.tags.filter(
              tag => tag.category.title === 'Food Types'
            )}
            categoryid={
              tagCategories &&
              tagCategories.length > 0 &&
              tagCategories.find(category => category.title === 'Food Types')
                ._id
            }
          />
        );
      case 2:
        return (
          <Bubbles
            tags={this.props.tags.filter(
              tag => tag.category.title === 'Dietary Preferences'
            )}
            categoryid={
              tagCategories &&
              tagCategories.length > 0 &&
              tagCategories.find(
                category => category.title === 'Dietary Preferences'
              )._id
            }
          />
        );
      default:
        return 'Unknown step';
    }
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

  areAnyTagsSelected(selectedTags, step) {
    if (!selectedTags) return false;
    const tags = this.props.tags.filter(tag => selectedTags.includes(tag._id));

    const getTagsByCategory = category => {
      return tags.filter(tag => tag.category.title === category);
    };

    switch (step) {
      case 0:
        return getTagsByCategory('Cuisine').length > 0;
      case 1:
        return getTagsByCategory('Food Types').length > 0;
      default:
        return true; // skipping case 2 since Dietary preferences are optional
    }
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          className={classes.stepper}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel className={classes.label}>{label}</StepLabel>
              <StepContent>
                <div>{this.getStepContent(index)}</div>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>

                    <Button
                      className={classes.button}
                      variant="outlined"
                      color="primary"
                      disabled={
                        !Meteor.user().profile ||
                        !this.areAnyTagsSelected(
                          Meteor.user().profile.tags,
                          activeStep
                        )
                      }
                      onClick={this.handleNext}
                      component={
                        activeStep === steps.length - 1 ? Link : 'button'
                      }
                      to="/home"
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    );
  }
}

Onboard.propTypes = {
  classes: PropTypes.object
};

export default withTracker(() => {
  Meteor.subscribe('tags');
  Meteor.subscribe('tagCategories');

  return {
    tags: Tags.find({}).fetch(),
    tagCategories: TagCategories.find({}).fetch()
  };
})(withStyles(styles, { withTheme: true })(Onboard));
