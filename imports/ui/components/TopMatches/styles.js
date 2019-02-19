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
    letterSpacing: 1.1,
    width: '100%'
  },
  placesList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingLeft: 18
  },
  matches: {
    marginTop: '20px',
    height: '100%',
    maxWidth: '100%'
  },
  matchesLabel: {
    color: '#696969',
    fontWeight: 400,
    marginLeft: 5,
    marginRight: 10
  },
  group: {
    display: 'flex',
    flexWrap: 'nowrap'
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
    fontWeight: 500,
    marginRight: 20,
    padding: '6px 15px'
  },
  switch: {
    letterSpacing: 1.1,
    fongWeight: 500
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15
  },
  tagsWrapper: {
    width: 370
  }
});

export default styles;
