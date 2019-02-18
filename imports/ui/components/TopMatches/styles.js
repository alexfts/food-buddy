const styles = theme => ({
  container: {
    width: '100%'
  },
  topMatchesHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 550,
    marginRight: 10,
    marginBottom: '1rem',
    paddingTop: 20,
    textAlign: 'center'
  },
  tagTitle: {
    color: theme.palette.primary.dark,
    fontSize: '1.3rem',
    fontWeight: 550,
    letterSpacing: 1.1
  },
  matches: {
    marginTop: '20px',
    height: '100%'
  },
  matchesLabel: {
    color: '#696969',
    // fontSize: 10,
    fontWeight: 400,
    marginLeft: 5,
    marginRight: 10
  },
  flexMatches: {
    display: 'flex',
    alignItems: 'center'
  },
  user: {
    marginTop: 3,
    marginRight: 5
  },
  gravatar: {
    height: 'auto',
    width: 32
  },
  button: {
    color: 'white',
    fontWeight: 400,
    margin: '0.5rem 0'
    // textTransform: 'capitalize'
  },
  switch: {
    letterSpacing: 1.1
  }
});

export default styles;
