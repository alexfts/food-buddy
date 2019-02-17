const styles = theme => ({
  profileContainer: {
    width: '100%',
    height: '100%'
  },
  profileInfo: {
    background: 'blue'
  },
  root: {
    padding: '2% 8%'
  },
  paperUser: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2.5,
    paddingBottom: theme.spacing.unit * 2,
    border: '1px solid #D3D3D3',
    maxWidth: 900,
    margin: 'auto'
  },
  paperTags: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2.5,
    paddingBottom: theme.spacing.unit * 3,
    border: '1px solid #D3D3D3',
    maxWidth: 900,
    margin: 'auto'
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
    height: 90,
    width: 90
  },
  gravatar: {
    transform: 'scale(1.8)'
  },
  userStyle: {
    fontWeight: 500,
    fontSize: '1.5rem'
  },

  divider: {
    margin: 12
  },
  editTitle: {
    color: '#696969',
    fontSize: '1.2rem',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 30
  },
  tagsContainer: {
    display: 'flex',
    paddingBottom: 20
  },
  tagTitle: {
    paddingTop: '1rem',
    paddingRight: '1rem',
    textAlign: 'center',
    width: 150
  },
  tagButton: {
    borderRadius: 25,
    marginRight: 10
  }
});

export default styles;
