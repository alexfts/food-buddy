const styles = theme => ({
  accountForm: {
    lineHeight: 5,
    width: 400,
    [theme.breakpoints.down('xs')]: {
      width: 300
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
    fontSize: '0.8rem',
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer'
    },
    textAlign: 'right',
    paddingTop: '0.5rem',
    width: '100%'
  },
  textField: {
    margin: 0,
    padding: 0
    // background: '#fff',
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit
  },
  button: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 2,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px',
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // backgroundColor: 'rgba(255,255,255, 0.2)',
    border: '1px solid #fff',
    marginTop: theme.spacing.unit * 3,
    width: 150,
    '&:hover': {
      background: 'rgba(0,0,0, 0.25)'
    }
  },
  label: {
    textTransform: 'capitalize'
  }
});

export default styles;
