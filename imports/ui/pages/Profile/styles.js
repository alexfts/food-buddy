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
  paperUser: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2.5,
    paddingBottom: theme.spacing.unit * 2,
    borderRadius: 3
  },
  paperTags: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2.5,
    paddingBottom: theme.spacing.unit * 3,
    borderRadius: 3
  },

  userCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
    // justifyContent: 'space-between',
  },
  // profileAvatar: {},
  avatarStyle: {
    marginBottom: '0.8rem',
    height: 80,
    width: 80
  },
  gravatar: {
    transform: 'scale(1.7)'
  },
  userStyle: {
    fontWeight: 500,
    fontSize: '1.5rem'
  },

  divider: {
    margin: 12
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
