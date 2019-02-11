const styles = theme => ({
  root: {
    background: theme.palette.primary.main,
    flexGrow: 1
  },
  flex: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1200,
    margin: 'auto'
  },
  logo: {
    marginTop: -6
    // marginRight: 20
  },
  menu: {
    color: '#fff',
    height: '2.3rem',
    width: '2.3rem'
  },
  menuIcon: {
    // color: theme.palette.primary.main,
    paddingRight: 15,
    width: 40
  },
  menuItem: {
    width: 125
  }
});

export default styles;
