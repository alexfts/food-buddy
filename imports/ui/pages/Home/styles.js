const styles = theme => ({
  container: {
    // background: 'radial-gradient(ellipse at 55%, #f8ab4f, #f0792b)',
    height: '100%',
    width: '100%'
  },
  dialog: {
    width: '100%'
  },
  paper: {
    // position: 'absolute',
    // height: '80%',
    margin: 'auto',
    // backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
    width: '600px',
    height: 600
  },
  flexbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  map: {
    height: 700,
    maxHeight: '100%'
  },

  fab: {
    position: 'absolute',
    zIndex: 1,
    bottom: 30,
    left: 0,
    right: 0,
    margin: '0 auto',
    color: '#fff',

    '&:hover': {
      background: '#fff',
      color: '#353535'
    }
  },
  plate: {
    // color: '#fff',
  },
  plateImg: {
    position: 'absolute',
    bottom: 6,
    left: 0,
    right: 2,
    margin: '0 auto',
    width: 'auto',
    height: 105

    // '&:hover': {
    //   background: '#fff',
    //   color: '#353535',
    //   transform: 'scale(2)'
    // }
  }
});

export default styles;
