const styles = theme => ({
  root: {
    // maxWidth: 400,
    flexGrow: 1,
    margin: 'auto',
    marginTop: '4%',
    width: '90%'
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  button: {
    color: 'white',
    fontWeight: 500,
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  backButton: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  label: {
    color: 'white'
  }
});

export default styles;
