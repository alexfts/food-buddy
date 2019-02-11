const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '70%',
    height: '70%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none'
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: 30,
    left: 0,
    right: 0,
    margin: '0 auto',
    color: 'primary'
  }
});

export default styles;
