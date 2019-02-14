const styles = theme => ({
  profileContainer: {
    width: '100%',
    height: '100%'
  },
  profileInfo: {
    background: 'blue'
  },
  root: {
    padding: '5% 8%'
  },
  paperUser: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2.5,
    paddingBottom: theme.spacing.unit * 2,
    // borderRadius: 3,
    border: '1.5px solid #d3d3d3'
  },
  paperTags: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2.5,
    paddingBottom: theme.spacing.unit * 3,
    borderRadius: 3,
    border: '1.5px solid #d3d3d3'
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
    fontWeight: 550,
    fontSize: '1.5rem'
  },

  divider: {
    margin: 12
  },
  tagTitle: {
    margin: '1rem auto',
    paddingTop: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  tagButton: {
    borderRadius: 25,
    marginRight: 10
  }
});

export default styles;
