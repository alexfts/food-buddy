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
      formToggle: true,
      submitError: null
    };
  }

  onSubmit = values => {
    if (this.state.formToggle) {
      try {
        const res = Meteor.loginWithPassword(values.email, values.password);
        if (!res) throw new Error('Incorrect email and/or password');
      } catch (err) {
        return {
          [FORM_ERROR]: 'Incorrect email and/or password'
        };
      }
      // err => {
      //   if (err) {
      //     console.log('LOGIN ERROR');
      //     return {
      //       [FORM_ERROR]: 'Incorrect email and/or password'
      //     };
      //   }
      // });
    } else {
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
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Form
          onSubmit={(v, e) => this.onSubmit(v, e)}
          validate={values => {
            return validate(values, this.state.formToggle);
          }}
          render={({
            handleSubmit,
            form,
            submitting,
            pristine,
            hasValidationErrors,
            hasSubmitErrors,
            submitError
          }) => {
            return (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
                className={classes.accountForm}
              >
                {!this.state.formToggle && (
                  <FormControl fullWidth className={classes.formControl}>
                    <Field
                      name="username"
                      render={({ input, meta }) => (
                        <Fragment>
                          <TextField
                            {...input}
                            id="outlined-username-input"
                            label="Username"
                            type="username"
                            autoComplete="off"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            color="secondary"
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
                    name="email"
                    render={({ input, meta }) => (
                      <Fragment>
                        <TextField
                          {...input}
                          id="outlined-email-input"
                          label="Email"
                          className={classes.textField}
                          type="email"
                          name="email"
                          autoComplete="email"
                          margin="normal"
                          variant="outlined"
                          color="secondary"
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
                          id="outlined-password-input"
                          label="Password"
                          className={classes.textField}
                          type="password"
                          autoComplete="current-password"
                          margin="normal"
                          variant="outlined"
                          color="secondary"
                        />
                        {meta.touched && meta.invalid && (
                          <Typography className={classes.errorMessage}>
                            {meta.error}
                          </Typography>
                        )}
                      </Fragment>
                    )}
                  />
                  <Typography className={classes.moveToggle}>
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
                    justify="center"
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
                      {this.state.formToggle ? 'Login' : 'Create'}
                    </Button>
                  </Grid>
                </FormControl>
                {hasSubmitErrors && (
                  <Typography className={classes.errorMessage}>
                    {submitError}
                  </Typography>
                )}
                {this.state.submitError && (
                  <Typography className={classes.errorMessage}>
                    {this.state.submitError}
                  </Typography>
                )}
              </form>
            );
          }}
        />
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);
