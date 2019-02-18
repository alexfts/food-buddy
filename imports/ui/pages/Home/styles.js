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
    boxShadow: theme.shadows[5],
    outline: 'none',
    width: '600px',
    minHeight: 600
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
    color: '#fff',
    fontWeight: 500,

    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    margin: '0 38%',
    zIndex: 5,

    '&:hover': {
      background: '#fff',
      color: '#353535'
    }
  },
  plate: {
    fontWeight: 500
  },
  plateImg: {
    position: 'absolute',
    bottom: 3,
    left: 0,
    right: 10,
    margin: '0 36%',
    width: 'auto',
    height: 110,
    zIndex: 4
  }
});

export default styles;
