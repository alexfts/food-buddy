const styles = theme => ({
  root: {
    paddingTop: '4%',
    paddingBottom: '3%',
    margin: 'auto',
    maxWidth: 870
  },
  profileContainer: {
    height: '100%',
    width: '100%'
  },
  profileInfo: {
    background: 'blue'
  },

  paperUser: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2.5,
    paddingBottom: theme.spacing.unit * 2,
    border: '1px solid #D3D3D3',
    margin: 'auto',
    marginTop: '6%'
  },
  paperTags: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2.5,
    paddingBottom: theme.spacing.unit * 3,
    border: '1px solid #D3D3D3',
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
    fontWeight: 500,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 25
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
