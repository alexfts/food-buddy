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
  DialogContent,
  DialogTitle,
  Paper
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import classNames from 'classnames';
import TopMatches from '../TopMatches';
import RestrictionsWarning from '../RestrictionsWarning';

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
      color="default"
      variant="default"
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
  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: null,
      matches: null,
      restrictions: null
    };
  }

  handleChange = value => {
    this.setState(
      {
        selectedUsers: value
      },
      () => {
        const userids = this.state.selectedUsers.map(({ value }) => value);
        Meteor.call(
          'users.findMatches',
          [...userids, this.props.currentUserId],
          (err, { matches, restrictions }) => {
            if (!err) this.setState({ matches, restrictions });
          }
        );
      }
    );
  };

  render() {
    const { classes, users, currentUserId } = this.props;
    const { selectedUsers, matches, restrictions } = this.state;
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
        <div className={classes.bgimg} />
        <DialogTitle id="scroll-dialog-title" className={classes.dialogTitle}>
          <Typography className={classes.title}>Create your group:</Typography>
          <NoSsr>
            <Select
              color="secondary"
              className={classes.select}
              classes={classes}
              styles={selectStyles}
              textFieldProps={{
                label: `You have picked ${
                  selectedUsers ? selectedUsers.length : 0
                } ${
                  selectedUsers && selectedUsers.length === 1
                    ? 'buddy'
                    : 'buddies'
                }`,
                InputLabelProps: {
                  shrink: true
                }
              }}
              options={suggestions}
              components={selectComponents}
              value={selectedUsers}
              onChange={this.handleChange}
              placeholder="Search a buddy"
              isMulti
              fullwidth
            />
          </NoSsr>
        </DialogTitle>

        <DialogContent className={classes.dialogContent}>
          {selectedUsers &&
            selectedUsers.length > 0 &&
            (matches && matches.length > 0 ? (
              <TopMatches
                userids={selectedUsers.map(({ value }) => value)}
                matches={matches}
              />
            ) : (
              <Typography className={classes.results}>
                Loading Results...
              </Typography>
            ))}
          {selectedUsers && selectedUsers.length > 0 && restrictions && (
            <RestrictionsWarning restrictions={restrictions} />
          )}
        </DialogContent>
      </div>
    );
  }
}

SelectGroupForm.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      emails: PropTypes.array.isRequired,
      profile: PropTypes.object
    })
  ).isRequired,
  currentUserId: PropTypes.string
};

export default withTracker(() => {
  Meteor.subscribe('users');

  return {
    currentUserId: Meteor.userId(),
    users: Meteor.users.find({}).fetch()
  };
})(withStyles(styles)(SelectGroupForm));
