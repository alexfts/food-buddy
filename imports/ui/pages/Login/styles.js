const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  root: {
    [theme.breakpoints.down('sm')]: {
      background: 'radial-gradient(ellipse at 55%, #f8ab4f, #f0792b)'
    },
    [theme.breakpoints.up('sm')]: {
      backgroundImage: 'url("/BG.png")',
      backgroundSize: 'cover'
      //   background: 'radial-gradient(ellipse at 55%, #f8ab4f, #f0792b)'
      //   backgroundImage: none
    },
    height: '100vh',
    width: '100vw'
  },

  logo: {
    paddingBottom: '0.7rem',
    height: 'auto',
    width: 220,
    [theme.breakpoints.up('sm')]: {
      width: 100
    }
  },
  textLogo: {
    padding: '1rem 0',
    height: 85,
    [theme.breakpoints.up('sm')]: {
      height: 40
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
