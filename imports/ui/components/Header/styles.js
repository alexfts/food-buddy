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
    height: '2.3rem',
    width: '2.3rem'
  },
  menuIcon: {
    // color: '#f0792b',
    color: theme.palette.primary.main,
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
