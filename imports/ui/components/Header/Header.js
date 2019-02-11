import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom';
import styles from './styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {
  AccountCircle,
  PowerSettingsNew,
  LocalDining,
  Restaurant
} from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

class Header extends React.Component {
  state = {
    auth: true,
    anchorEl: null
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div className={classes.flex}>
              <IconButton
                className={classes.logo}
                href="/home"
                color="inherit"
                aria-label="Menu"
              >
                <img src="/cheers_logo.png" width="60" alt="Food Buddy logo" />
              </IconButton>{' '}
              <IconButton
                className={classes.logoText}
                href="/home"
                color="inherit"
                aria-label="Menu"
              >
                <img src="/Food_Buddy.png" height="30" alt="Food Buddy App" />
              </IconButton>
              {auth && (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle className={classes.menu} />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center'
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem
                      className={classes.menuItem}
                      onClick={this.handleClose}
                      component={Link}
                      to={`/profile`}
                    >
                      <Restaurant className={classes.menuIcon} />
                      Profile
                    </MenuItem>
                    <MenuItem
                      className={classes.menuItem}
                      onClick={Meteor.logout}
                      component={Link}
                      to={`/welcome`}
                    >
                      <PowerSettingsNew className={classes.menuIcon} />
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Header));
