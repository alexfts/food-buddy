const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  root: {
    background: 'radial-gradient(ellipse at 55%, #f8ab4f, #f0792b)',
    backgroundImage: 'url("/pasta.png"), url("/berrybowl.png")',
    [theme.breakpoints.up('sm')]: {
      backgroundImage: 'url("/BG.png")',
      backgroundSize: 'cover'
      //   background: 'radial-gradient(ellipse at 55%, #f8ab4f, #f0792b)'
    },
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
    paddingBottom: '2.2rem',
    height: 50,
    [theme.breakpoints.up('sm')]: {
      height: 45
    }
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});

export default styles;
