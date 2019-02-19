const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  root: {
    background: 'radial-gradient(ellipse at 55%, #f8ab4f, #f0792b)',
    height: '100vh',
    width: '100vw'
  },
  logo: {
    paddingBottom: '1.3rem',
    height: 'auto',
    width: 120,
    [theme.breakpoints.up('sm')]: {
      width: 100
    }
  },
  textLogo: {
    height: 50
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundImage: 'url("/pasta.png"), url("/berrybowl.png")',
    backgroundPosition: 'top left, bottom right',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundAttachment: 'fixed, fixed',
    backgroundSize: '36%, 26%',
    [theme.breakpoints.up('sm')]: {
      backgroundSize: '28%, 22%'
    },
    [theme.breakpoints.up('md')]: {
      backgroundSize: '25%, 20%'
    }
  },
  copyright: {
    color: '#fff',
    fontSize: '12px',
    textAlign: 'center',
    position: 'absolute',
    bottom: '15px'
  }
});

export default styles;
