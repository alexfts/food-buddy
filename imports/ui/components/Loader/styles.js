const styles = theme => ({
  root: {
    flexGrow: 1,

    margin: 0
  },
  container: {
    margin: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  loading: {
    color: 'white',
    width: '100%',
    // fontSize: '3rem',
    fontWeight: 500,
    lineHeight: 1.5,
    textAlign: 'center',
    paddingLeft: 15,
    paddingTop: 50
  },
  linear: {
    color: 'white',
    position: 'absolute',
    bottom: 50
  }
});

export default styles;
