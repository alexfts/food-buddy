const styles = theme => ({
  root: {
    background: theme.palette.primary.main,
    flexGrow: 1
  },
  flex: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    marginTop: -6,
    marginRight: 20
  },
  menu: {
    height: '2.5rem',
    width: '2.5rem'
  },
  menuIcon: {
    paddingRight: 15,
    width: 40
    // height: '1.5rem',
    // width: '1.5rem'
  },
  menuItem: {
    width: 125
  }
});

export default styles;
