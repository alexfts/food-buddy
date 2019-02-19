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
    // background: '#f50057',
    backgroundImage: 'linear-gradient(to top, #f50057 0%, #f8ab4f 100%)',
    border: '3px solid #353535',
    color: '#fff',
    fontWeight: 500,
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 250,
    margin: 'auto',
    height: 65,
    width: 65,
    zIndex: 5,

    '&:hover': {
      background: '#fff',
      border: 0,
      color: theme.palette.primary.dark,
      fontSize: '2rem'
      // color: '#353535'
    }
  },
  plate: {
    fontSize: '1.8rem',
    fontWeight: 500
  },
  plateImg: {
    position: 'absolute',
    bottom: 18,
    left: 0,
    right: 253,
    margin: 'auto',
    width: 'auto',
    height: 130,
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
