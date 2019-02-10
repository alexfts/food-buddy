const styles = theme => ({
  accountForm: {
    lineHeight: 5,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '400px'
    }
  },
  errorMessage: {
    color: 'red'
  },
  formButton: {
    backgroundColor: 'rgba(255,255,255, 0.2)',
    border: '1px solid #fff',
    borderRadius: '2px',
    color: '#fff',
    marginTop: theme.spacing.unit * 2,
    width: 150,
    '&:hover': {
      background: 'rgba(0,0,0, 0.25)'
    }
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
    textAlign: 'right',
    paddingTop: '10px',
    width: '100%'
  }
  // ::-webkit-input-placeholder: {
  //   color: 'green'
  // }
});

export default styles;
