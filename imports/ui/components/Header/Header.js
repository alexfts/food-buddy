import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import styles from './styles';
import {
  AccountCircle,
  PowerSettingsNew,
  Restaurant
} from '@material-ui/icons';

class Header extends React.Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div className={classes.flex}>
              <div className={classes.fblogo}>
                <IconButton
                  href="/home"
                  color="inherit"
                  aria-label="Menu"
                  className={classes.textLogo}
                >
                  <img
                    src="/logo-thick.png"
                    alt="Food Buddy logo"
                    className={classes.logo}
                  />
                </IconButton>
                <img src="/Food_Buddy.png" height="30" alt="Food Buddy App" />
              </div>
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
                    <Restaurant className={classes.menuIcon} color="primary" />
                    Profile
                  </MenuItem>
                  <MenuItem
                    className={classes.menuItem}
                    onClick={() => Meteor.logout()}
                    component={Link}
                    to={`/welcome`}
                  >
                    <PowerSettingsNew
                      className={classes.menuIcon}
                      color="primary"
                    />
                    Logout
                  </MenuItem>
                </Menu>
              </div>
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

export default withStyles(styles)(Header);
