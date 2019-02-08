import React from 'react';
import PropTypes from 'prop-types';
import { Tags } from '../../../api/tags';
import { TagCategories } from '../../../api/tagCategories';
import { Meteor } from 'meteor/meteor';
import {
  Button,
  Card,
  MobileStepper,
  Paper,
  Typography
} from '@material-ui/core';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Cuisine from '../../components/Tags_Cuisine';
import FoodTypes from '../../components/Tags_FoodTypes';
import DietandExtras from '../../components/Tags_DietandExtras';
import { withTracker } from 'meteor/react-meteor-data';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';

//   renderCardForStep = step => {
//     switch (step) {
//       case 1:
//         return <Cuisine />;
//       case 2:
//         return <FoodTypes />;
//       case 3:
//         return <DietandExtras />;
//       default:
//         return 'Unknown step';
//     }
//   };

//     return (
//       <div className={classes.container}>
//         <Card className={classes.card}>
//           <Typography component="h2">
//             We want to get to know you better. Please select your preferred
//             <span color="primary"> cuisine</span>.
//           </Typography>
//           {/* {renderCardForStep(activeStep)} */}
//         </Card>

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// {tagCategories.map(tagcat =>)}
const tutorialSteps = [
  {
    label:
      'We want to get to know you better! Please select your favourite cusines:',
    tagSection: <Cuisine tagCategories="Cuisine" />
  },
  {
    label: 'Select your favourite food types:'
    // tagSection: <FoodTypes />
  },
  {
    label: 'Select any dietary preferences and extra info:'
    // tagSection: <DietandExtras />
  }
];

class Onboard extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.container}>
        <Paper square elevation={0} className={classes.header}>
          <Typography>{tutorialSteps[activeStep].label}</Typography>
        </Paper>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <div>
                  <Typography> {step.label}</Typography>
                  <div>{step.tagSection}</div>
                </div>
              ) : null}
            </div>
          ))}
        </SwipeableViews>

        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={this.handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </div>
    );
  }
}

Onboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withTracker(() => {
  Meteor.subscribe('tags');
  Meteor.subscribe('tagCategories');
  return {
    tags: Tags.find({}).fetch(),
    tagCategories: TagCategories.find({}).fetch()
  };
})(withStyles(styles, { withTheme: true })(Onboard));
