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
    width: '600px'
    // minHeight: 600
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
    right: 100,
    margin: 'auto',
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
    right: 102,
    margin: 'auto',
    width: 'auto',
    height: 110,
    zIndex: 4
  },
  snackbar: {
    left: 25,
    top: 70
  },
  groupMessage: {
    bottom: 100,
    left: 455,
    zIndex: 10, 
    position: 'absolute', 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 20, 
    background: theme.palette.secondary.main, 
    padding: 12,
    borderRadius: '50%'
  }
});

export default styles;
