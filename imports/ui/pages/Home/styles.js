const styles = theme => ({
  container: {
    background: 'radial-gradient(ellipse at 55%, #f8ab4f, #f0792b)',
    height: '100%',
    width: '100%'
  },
  paper: {
    // position: 'absolute',
    // height: '80%',
    margin: 'auto',
    // backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
    width: '600px'
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
    height: 700,
    maxHeight: '100%'
  },

  plateImg: {
    height: 40,
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    margin: '0 auto',
    width: 'auto',

    '&:hover': {
      // display: 'block',
      bottom: 8,
      height: 100
    }
  }
});

export default styles;
