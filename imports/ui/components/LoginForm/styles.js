const styles = theme => ({
  container: {
    paddingTop: '2rem'
  },
  accountForm: {
    lineHeight: 5,
    width: 400,
    [theme.breakpoints.down('xs')]: {
      width: 300
    }
  },
  errorMessage: {
    color: theme.palette.error.main,
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
    // margin: 0
    border: theme.palette.secondary.main
  },
  formButton: {
    // border: '1px solid #fff',
    borderRadius: '2px',
    color: '#fff',
    marginTop: theme.spacing.unit * 2,
    width: 130,
    // fontWeight: 600,
    letterSpace: 5
  }
});

export default styles;
