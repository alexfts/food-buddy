const styles = theme => ({
  accountForm: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '400px'
    }
  },
  errorMessage: {
    color: 'red'
  },
  formButton: {
    border: '1px solid #fff',
    color: '#fff',
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    marginBottom: theme.spacing.unit * 2,
    width: '100%'
  },
  formToggle: {
    border: 'none',
    background: 'none',
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer'
    },
    alignSelf: 'flex-end',
    paddingTop: '10px'
  }
});

export default styles;
