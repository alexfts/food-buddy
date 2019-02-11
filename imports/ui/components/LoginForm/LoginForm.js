// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import styles from './styles';
// import { Meteor } from 'meteor/meteor';
// import { withStyles } from '@material-ui/core/styles';

// class LoginForm extends Component {
//   login() {
//     Meteor.loginWithPassword('test@test.com', 'password', args => {
//       console.log(args);
//     });
//   }

//   logout() {
//     Meteor.logout();
//   }
//   render() {
//     return (
//       <div>
//         <button onClick={this.login}>login</button>
//         <button onClick={this.logout}>logout</button>
//       </div>
//     ); // Render a placeholder
//   }
// }

// export default withStyles(styles)(LoginForm);

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import validate from './helpers/validation';
import styles from './styles';
import PropTypes from 'prop-types';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true
    };
  }

  // onSubmit = async values => {
  //   const variables = {
  //     user: values
  //   };
  //   try {
  //     this.state.formToggle
  //       ? await Meteor.loginWithPassword({})
  //       : await this.props.signupMutation({ variables });
  //   } catch (e) {
  //     return {
  //       [FORM_ERROR]: this.state.formToggle
  //         ? 'Incorrect email and/or password'
  //         : 'An account with this email already exists.'
  //     };
  //   }
  // };

  onSubmit = async values => {
    console.log('hi');
    try {
      console.log('>>>>>>>', values);
      if (this.state.formToggle) {
        console.log('>>>>>>onsubmit');
        Meteor.loginWithPassword(values.email, values.password, args => {
          console.log(args);
        });
      } else {
        console.log('>>>>>>onsingup');
        Accounts.createUser(
          {
            username: values.username,
            email: values.email,
            password: values.password
          },
          args => {
            console.log(args);
          }
        );
      }
    } catch (e) {
      console.log('sdafsdf');

      // return e;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Form
        onSubmit={this.onSubmit}
        validate={values => validate(values, this.state.formToggle)}
        render={({
          handleSubmit,
          form,
          submitting,
          pristine,
          hasValidationErrors,
          hasSubmitErrors,
          submitError
        }) => (
          <form onSubmit={handleSubmit} className={classes.accountForm}>
            {!this.state.formToggle && (
              <FormControl fullWidth className={classes.formControl}>
                <Field
                  name="email"
                  render={({ input, meta }) => (
                    <Fragment>
                      <TextField
                        {...input}
                        label="Email"
                        id="email"
                        autoComplete="off"
                      />
                      {meta.touched && meta.invalid && (
                        <Typography className={classes.errorMessage}>
                          {meta.error}
                        </Typography>
                      )}
                    </Fragment>
                  )}
                />
              </FormControl>
            )}
            <FormControl fullWidth className={classes.formControl}>
              <Field
                name="username"
                render={({ input, meta }) => (
                  <Fragment>
                    <TextField
                      {...input}
                      id="username"
                      label="Username"
                      type="text"
                      autoComplete="off"
                    />
                    {meta.touched && meta.invalid && (
                      <Typography className={classes.errorMessage}>
                        {meta.error}
                      </Typography>
                    )}
                  </Fragment>
                )}
              />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <Field
                name="password"
                render={({ input, meta }) => (
                  <Fragment>
                    <TextField
                      {...input}
                      id="password"
                      label="Password"
                      type="password"
                      autoComplete="off"
                    />
                    {meta.touched && meta.invalid && (
                      <Typography className={classes.errorMessage}>
                        {meta.error}
                      </Typography>
                    )}
                  </Fragment>
                )}
              />
              <Typography>
                <button
                  className={classes.formToggle}
                  type="button"
                  onClick={() => {
                    form.reset();
                    this.setState({
                      formToggle: !this.state.formToggle
                    });
                  }}
                >
                  {this.state.formToggle
                    ? 'Create an account'
                    : 'Login to existing account'}
                </button>
              </Typography>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Button
                  type="submit"
                  className={classes.formButton}
                  variant="contained"
                  size="large"
                  color="secondary"
                  disabled={submitting || pristine || hasValidationErrors}
                >
                  {this.state.formToggle ? 'Login' : 'Create Account'}
                </Button>
              </Grid>
            </FormControl>
            {hasSubmitErrors && (
              <Typography className={classes.errorMessage}>
                {submitError}
              </Typography>
            )}
          </form>
        )}
      />
    );
  }
}

export default withStyles(styles)(LoginForm);
