const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 20
  },
  title: {
    color: '#696969',
    letterSpacing: 1.1,
    fontWeight: 500,
    fontSize: '1rem',
    // paddingLeft: '1rem',
    width: 95
  },
  sliderContainer: {
    width: '75%'
  },
  slider: {
    backgroundColor: 'green',
    margin: 'auto',
    paddingLeft: 34,
    paddingRight: 38,
    zIndex: 0,
    listStyle: 'none'
  },
  ul: {
    marginTop: 5,
    paddingLeft: 0
  },
  dollars: {
    display: 'flex',
    justifyContent: 'space-between',
    listStyle: 'none',
    width: '100%'
  },
  dollar: {
    color: theme.palette.primary.dark,
    // color: '#6ba048',
    fontWeight: 450,
    letterSpacing: 1.1,
    textAlign: 'center',
    width: 70
  }
});

export default styles;
