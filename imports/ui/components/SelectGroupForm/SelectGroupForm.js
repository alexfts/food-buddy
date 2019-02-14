import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';
import Gravatar from 'react-gravatar';
import Select from 'react-select';
import { withTracker } from 'meteor/react-meteor-data';
import {
  NoSsr,
  Chip,
  MenuItem,
  TextField,
  Typography,
  Avatar,
  Paper,
  Button,
  Divider
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import classNames from 'classnames';
import TopMatches from '../TopMatches';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/** Components to customize the style and behaviour of Select
 *  See https://react-select.com/components#replacing-components
 *  For full reference
 **/

const selectComponents = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      avatar={
        <Avatar>
          <Gravatar
            email={props.data.email}
            className={props.selectProps.classes.chipAvatar}
          />
        </Avatar>
      }
      label={props.children}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
      color="primary"
      variant="outlined"
    />
  );
}

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      <Avatar className={props.selectProps.classes.avatar}>
        <Gravatar email={props.data.email} />
      </Avatar>
      <Typography
        className={props.selectProps.classes.singleValue}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    </MenuItem>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

class SelectGroupForm extends Component {
  state = {
    multi: null,
    matches: null,
    open: true,
    scroll: 'paper'
  };

  handleChange = value => {
    this.setState(
      {
        multi: value
      },
      () => {
        const userids = this.state.multi.map(({ value }) => value);
        Meteor.call(
          'users.findMatches',
          [...userids, this.props.currentUserId],
          (err, matches) => this.setState({ matches })
        );
      }
    );
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, users, currentUserId } = this.props;
    const suggestions = users
      .filter(user => user._id !== currentUserId)
      .filter(user => user.profile && user.profile.tags) // only onboarded users
      .map(user => ({
        label: user.username, // react-select searches through 'label' values
        value: user._id,
        email: user.emails[0].address
      }));

    const selectStyles = {
      input: base => ({
        ...base,
        '& input': {
          font: 'inherit'
        }
      })
    };

    return (
      <div className={classes.form}>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title" className={classes.dialogTitle}>
            <Typography variant="h6" className={classes.title}>
              Select your food buddy
            </Typography>
            <NoSsr>
              <Select
                color="secondary"
                className={classes.select}
                classes={classes}
                styles={selectStyles}
                textFieldProps={{
                  label: `You have picked ${
                    this.state.multi ? this.state.multi.length : 0
                  } ${
                    this.state.multi && this.state.multi.length === 1
                      ? 'buddy'
                      : 'buddies'
                  }`,
                  InputLabelProps: {
                    shrink: true
                  }
                }}
                options={suggestions}
                components={selectComponents}
                value={this.state.multi}
                onChange={this.handleChange}
                placeholder="Search a buddy"
                isMulti
                fullwidth
              />
            </NoSsr>
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              {this.state.multi &&
                this.state.multi.length > 0 &&
                this.state.matches && (
                  <TopMatches
                    userids={this.state.multi.map(({ value }) => value)}
                    matches={this.state.matches}
                  />
                )}
            </DialogContentText>
          </DialogContent>

          <DialogActions className={classes.buttons}>
            {this.state.multi &&
            this.state.multi.length > 0 &&
            this.state.matches ? (
              <>
                <Button
                  onClick={this.handleClose}
                  color="secondary"
                  variant="contained"
                  className={classes.cancelButton}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  className={classes.cancelButton}
                >
                  Submit
                </Button>
              </>
            ) : (
              <Button
                onClick={this.handleClose}
                color="secondary"
                variant="outlined"
                className={classes.cancelButton}
              >
                Cancel
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SelectGroupForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTracker(() => {
  Meteor.subscribe('users');

  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    users: Meteor.users.find({}).fetch()
  };
})(withStyles(styles)(SelectGroupForm));
