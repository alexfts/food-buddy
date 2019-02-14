const styles = theme => ({
  root: {
    // border: 'solid 2px primary',
    flexGrow: 1,
    margin: 'auto',
    marginTop: '4%',

    height: '100%',
    width: '90%',
    maxWidth: 650
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  button: {
    // color: 'white',
    fontWeight: 500,
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit

    // '&:hover': {
    //   background: theme.palette.primary.main
    // }
  },
  backButton: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit
  },
  label: {
    // color: 'white'
  },
  stepper: {
    border: '1px solid #D3D3D3',
    padding: '50px 40px'
  }
});

export default styles;
