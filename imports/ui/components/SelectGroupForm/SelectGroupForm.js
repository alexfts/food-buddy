import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';
import NoSsr from '@material-ui/core/NoSsr';
import Select from 'react-select';
import { withTracker } from 'meteor/react-meteor-data';
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';

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
      label={props.children}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
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
      {props.children}
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

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

class SelectGroupForm extends Component {
  state = {
    multi: null
  };

  handleChange = value => {
    this.setState({
      multi: value
    });
  };

  render() {
    const { classes, users, currentUserId } = this.props;
    const suggestions = users
      .filter(user => user._id !== currentUserId)
      .map(user => ({ label: user.username, value: user._id }));

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
        <Typography>Choose your group</Typography>
        <NoSsr>
          <Select
            className={classes.select}
            classes={classes}
            styles={selectStyles}
            textFieldProps={{
              label: 'Your Buddies',
              InputLabelProps: {
                shrink: true
              }
            }}
            options={suggestions}
            components={components}
            value={this.state.multi}
            onChange={this.handleChange}
            placeholder="Search a buddy"
            isMulti
            fullwidth
          />
        </NoSsr>
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
