const styles = theme => ({
  root: {
    background: theme.palette.primary.main,
    flexGrow: 1,
    position: 'fixed',
    zIndex: 10,
    width: '100%'
  },
  flex: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 'auto'
  },
  fblogo: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    marginTop: -4,
    marginBottom: -2,
    paddingRight: '1.2rem',
    height: 50,
    width: 'auto'
  },
  textLogo: {
    height: 30
  },
  menu: {
    color: '#fff',
    height: '2.3rem',
    width: '2.3rem'
  },
  menuIcon: {
    paddingRight: 15,
    width: 40
  },
  menuItem: {
    width: 125
  }
});

export default styles;
