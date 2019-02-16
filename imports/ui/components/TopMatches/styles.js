const styles = theme => ({
  topMatchesHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    marginRight: 10
    // textAlign: 'center'
  },
  tagTitle: {
    fontSize: '1.3rem',
    fontWeight: 550,
    letterSpacing: 1.1
  },
  matches: {
    marginTop: '20px',
    height: '100%'
  },
  matchesLabel: {
    // fontStyle: 'italic',
    color: '#696969',
    fontWeight: 400,
    marginRight: 8
  },
  flexMatches: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  user: {
    marginTop: 3,
    marginRight: 5
  },
  button: {
    color: 'white',
    fontWeight: 400,
    margin: '0.5rem 0'
    // textTransform: 'capitalize'
  },

  sliderContainer: {
    // width: 420
  },
  pricePoint: {
    // color: 'green'
  },
  slider: {
    color: 'green',
    width: 420,
    margin: 'auto',
    zIndex: 0,
    listStyle: 'none'
  },
  dollars: {
    display: 'flex',
    justifyContent: 'space-between',
    listStyle: 'none',

    paddingTop: 10,
    width: '100%'
  },
  dollar: {
    // margin: 'auto',
    width: 50
  }
});

export default styles;
