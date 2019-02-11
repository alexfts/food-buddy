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
    // backgroundSize: '20%, 15%',
    backgroundSize: '36%, 26%',

    height: '100vh',
    width: '100vw',

    // [theme.breakpoints.down('xs')]: {
    //   backgroundSize: '5%, 5%'
    // },
    [theme.breakpoints.up('sm')]: {
      backgroundSize: '30%, 22%'
    },
    [theme.breakpoints.up('md')]: {
      backgroundSize: '20%, 15%'
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

    paddingTop: '1rem',
    height: '100%'
  }
});

export default styles;
