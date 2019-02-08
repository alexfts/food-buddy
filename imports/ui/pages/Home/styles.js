const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
