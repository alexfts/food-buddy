// import React, { Component } from "react";
// import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Button from '@material-ui/core/Button';
// import ProfileIcon from '@material-ui/icons/Fingerprint';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import styles from './styles';
// import logo from '../../images/cheers_logo.png';
// import { Link } from 'react-router-dom';

// class Header extends Component {

//     state = {
//         auth: true,
//         anchorEl: null,
//       };
    
//       handleMenu = event => {
//         this.setState({ anchorEl: event.currentTarget });
//       };
    
//       handleClose = () => {
//         this.setState({ anchorEl: null });
//       };
    
//       render() {
//         const { classes } = this.props;
//         const { anchorEl } = this.state;
//         const open = Boolean(anchorEl);

//   return (
//   <div className={classes.root}>
//     <AppBar position="static">
//       <Toolbar>
//       <Button color="inherit" href="/items"><img src={logo} width="40" alt="Logo" /></Button>
//         <div className={classes.grow} />
//           <div>
//             <IconButton
//               aria-owns={open ? 'menu-appbar' : undefined}
//               aria-haspopup="true"
//               onClick={this.handleMenu}
//               color="inherit"
//             >
//               <ProfileIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorEl}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={open}
//               onClose={this.handleClose}
//             >
//               <MenuItem onClick={this.handleClose}
//               component={Link}
//               to={`/profile/${this.props.user.id}`}
//               >
//               Your Profile</MenuItem>
//               <MenuItem onClick={e => {
                
//               }}
//               >
//               Sign Out</MenuItem> 
//             </Menu>
//           </div>
//       </Toolbar>
//     </AppBar>
//   </div>);
//   }
// }

 
// export default compose(withStyles(styles), withRouter)(Header);
  
// // export default Header;