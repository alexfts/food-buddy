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
      loginToggle: true
    };
  }

  onSubmit = values => {
    if (this.state.loginToggle) {
      Meteor.loginWithPassword(values.email, values.password, err => {
        if (err) {
          return {
            [FORM_ERROR]: 'Incorrect email and/or password'
          };
        }
      });
    } else {
      Accounts.createUser(
        {
          username: values.username,
          email: values.email,
          password: values.password
        },
        err => {
          if (err) {
            return {
              [FORM_ERROR]: 'The user already exists'
            };
          }
        }
      );
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Form
          autoComplete="off"
          onSubmit={(v, e) => this.onSubmit(v, e)}
          validate={values => {
            return validate(values, this.state.loginToggle);
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
                {!this.state.loginToggle && (
                  <FormControl fullWidth className={classes.formControl}>
                    <Field
                      name="username"
                      render={({ input, meta }) => (
                        <Fragment>
                          <TextField
                            {...input}
                            id="standard-username-input"
                            label="Username"
                            type="username"
                            autoComplete="off"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
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
                          id="standard-email-input"
                          label="Email"
                          className={classes.textField}
                          type="email"
                          name="email"
                          autoComplete="off"
                          margin="normal"
                          variant="outlined"
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
                          id="standard-password-input"
                          label="Password"
                          className={classes.textField}
                          type="password"
                          autoComplete="off"
                          margin="normal"
                          variant="outlined"
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
                          loginToggle: !this.state.loginToggle
                        });
                      }}
                    >
                      {this.state.loginToggle
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
                      {this.state.loginToggle ? 'Login' : 'Create'}
                    </Button>
                  </Grid>
                </FormControl>
                {hasSubmitErrors && (
                  <Typography className={classes.errorMessage}>
                    {submitError}
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
