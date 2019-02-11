// import React from 'react';
// import PropTypes from 'prop-types';
// import { Tags } from '../../../api/tags';
// import { TagCategories } from '../../../api/tagCategories';
// import { Meteor } from 'meteor/meteor';
// import {
//   Button,
//   Card,
//   MobileStepper,
//   Paper,
//   Typography
// } from '@material-ui/core';
// import styles from './styles';
// import { withStyles } from '@material-ui/core/styles';
// import Cuisine from '../../components/Tags_Cuisine';
// import FoodTypes from '../../components/Tags_FoodTypes';
// import DietandExtras from '../../components/Tags_DietandExtras';
// import { withTracker } from 'meteor/react-meteor-data';

// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import SwipeableViews from 'react-swipeable-views';
// // import { autoPlay } from 'react-swipeable-views-utils';

// const tutorialSteps = [
//   {
//     label:
//       'We want to get to know you better! Please select your favourite cusines:',
//     tagSection: <Cuisine />
//   },
//   {
//     label: 'Select your favourite food types:'
//     // tagSection: <FoodTypes />
//   },
//   {
//     label: 'Select any dietary preferences and extra info:'
//     // tagSection: <DietandExtras />
//   }
// ];

// class Onboard extends React.Component {
//   state = {
//     activeStep: 0
//   };

//   handleNext = () => {
//     this.setState(prevState => ({
//       activeStep: prevState.activeStep + 1
//     }));
//   };

//   handleBack = () => {
//     this.setState(prevState => ({
//       activeStep: prevState.activeStep - 1
//     }));
//   };

//   handleStepChange = activeStep => {
//     this.setState({ activeStep });
//   };

//   render() {
//     const { classes, theme } = this.props;
//     const { activeStep } = this.state;
//     const maxSteps = tutorialSteps.length;

//     return (
//       <div className={classes.container}>
//         <Paper square elevation={0} className={classes.header}>
//           <Typography>{tutorialSteps[activeStep].label}</Typography>
//         </Paper>
//         <SwipeableViews
//           axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//           index={activeStep}
//           onChangeIndex={this.handleStepChange}
//           enableMouseEvents
//         >
//           {tutorialSteps.map((step, index) => (
//             <div key={step.label}>
//               {Math.abs(activeStep - index) <= 2 ? (
//                 <div>
//                   <Typography> {step.label}</Typography>
//                   <div>{step.tagSection}</div>
//                 </div>
//               ) : null}
//             </div>
//           ))}
//         </SwipeableViews>

//         <MobileStepper
//           steps={maxSteps}
//           position="static"
//           activeStep={activeStep}
//           className={classes.mobileStepper}
//           nextButton={
//             <Button
//               size="small"
//               onClick={this.handleNext}
//               disabled={activeStep === maxSteps - 1}
//             >
//               Next
//               {theme.direction === 'rtl' ? (
//                 <KeyboardArrowLeft />
//               ) : (
//                 <KeyboardArrowRight />
//               )}
//             </Button>
//           }
//           backButton={
//             <Button
//               size="small"
//               onClick={this.handleBack}
//               disabled={activeStep === 0}
//             >
//               {theme.direction === 'rtl' ? (
//                 <KeyboardArrowRight />
//               ) : (
//                 <KeyboardArrowLeft />
//               )}
//               Back
//             </Button>
//           }
//         />
//       </div>
//     );
//   }
// }

// Onboard.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired
// };

// export default withTracker(() => {
//   Meteor.subscribe('tags');
//   Meteor.subscribe('tagCategories');
//   return {
//     tags: Tags.find({}).fetch(),
//     tagCategories: TagCategories.find({}).fetch()
//   };
// })(withStyles(styles, { withTheme: true })(Onboard));

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../../api/tags';

const styles = theme => ({
  root: {
    width: '90%'
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
});

function getSteps() {
  return [
    'We want to get to know you better! Please select your favourite cusines:',
    'Select your favourite food types:',
    'Select any dietary preferences and extra info:'
  ];
}

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return [`tags `, `tags `];
//     case 1:
//       return 'An ad group contains one or more ads which target a shared set of keywords.';
//     case 2:
//       return `Try out different ad text to see what brings in the most customers,
//               and learn how to enhance your ads using features like ad extensions.
//               If you run into any problems with your ads, find out how to tell if
//               they're running and how to resolve approval issues.`;
//     default:
//       return 'Unknown step';
//   }
// }

class Onboard extends React.Component {
  state = {
    activeStep: 0
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return [`tags `, `tags `];
      case 1:
        return 'An ad group contains one or more ads which target a shared set of keywords.';
      case 2:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
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
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{this.getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
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
