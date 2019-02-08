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
  }
});

export default styles;
