const styles = theme => ({
  container: {
    width: '100%'
  },
  paper: {
    // position: 'absolute',
    // height: '80%',
    margin: 'auto',
    // backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
    width: '100%'
  },
  flexbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  plate: {
    position: 'absolute',
    zIndex: 1,
    bottom: 30,
    left: 0,
    right: 0,
    margin: '0 auto'
    // color: 'primary'
  },

  map: {
    // maxHeight: '80%'
  },
  plateImg: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 3,
    margin: '0 auto',
    height: 100
  }
});

export default styles;
