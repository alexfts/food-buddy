const styles = theme => ({
  profileContainer: {
    width: '100%',
    height: '100%'
  },
  profileInfo: {
    background: 'blue'
  },
  root: {
    padding: '5%'
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2.5,
    paddingBottom: theme.spacing.unit * 2
  },

  userCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
    // justifyContent: 'space-between',
  },
  // profileAvatar: {},
  gravatar: {
    marginBottom: '0.6rem',
    height: 50,
    width: 50
  },
  userStyle: {
    fontWeight: 500,
    fontSize: '1.5rem'
  },

  divider: {
    margin: 15
  },
  tagTitle: {
    marginBottom: '1rem'
  },
  tagButton: {
    borderRadius: 25,
    marginRight: 10
  }
});

export default styles;
