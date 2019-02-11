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
    backgroundPosition: 'top left, bottom right',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundAttachment: 'fixed, fixed',
    backgroundSize: '45%',

    height: '100vh',
    width: '100vw',

    [theme.breakpoints.down('sm')]: {
      backgroundSize: '25%'
    },
    [theme.breakpoints.up('md')]: {
      backgroundSize: '25%'
    }
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
    // paddingBottom: '2.2rem',
    height: 50
    // [theme.breakpoints.up('sm')]: {
    //   height: 45
    // }
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
