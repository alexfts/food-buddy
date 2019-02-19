import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#fb8f2f',
      dark: '#f0792b'
    },
    secondary: {
      main: '#4055f5',
      light: '#7779f7',
      dark: '#3b3dac',
      contrastText: '#fff'
    },
    error: {
      main: '#fb5b2f'
    }
  },

  typography: {
    useNextVariants: true
  }
});
