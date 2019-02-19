const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20
  },
  title: {
    letterSpacing: 1.1,
    fontWeight: 500,
    width: 100
  },
  sliderContainer: {
    marginRight: '1.2rem',
    width: '75%'
  },
  slider: {
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
    fontWeight: 450,
    letterSpacing: 1.1,
    textAlign: 'center',
    width: 70
  }
});

export default styles;
