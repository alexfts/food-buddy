const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '1rem'
  },
  accountForm: {
    lineHeight: 5,
    width: 400,
    [theme.breakpoints.down('xs')]: {
      width: 300
    }
  },
  errorMessage: {
    color: theme.palette.secondary.main,
    letterSpace: 2
  },
  formControl: {
    marginBottom: theme.spacing.unit * 2,
    width: '100%'
  },
  moveToggle: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  formToggle: {
    border: 'none',
    background: 'none',
    fontSize: '0.8rem',
    textDecoration: 'underline',
    paddingTop: '0.5rem',

    '&:hover': {
      cursor: 'pointer'
    }
  },
  textField: {
    width: '100%'
  },
  formButton: {
    borderRadius: '2px',
    color: '#fff',
    marginTop: theme.spacing.unit * 2,
    width: 130,
    letterSpace: 5
  }
});

export default styles;
