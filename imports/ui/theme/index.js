import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#fb8f2f',
      dark: '#f0792b'
      // main: '#f0792b'
      // light: '#f39355',
      // dark: '#a8541e'
      // main: '#30cfd0'
    },
    secondary: {
      main: '#4055f5',
      light: '#7779f7',
      dark: '#3b3dac',
      contrastText: '#fff'
    },
    error: {
      main: '#f5ef40'
    },
    bg: {
      main: '#212121'
    }
  },

  slider: {
    handleFillColor: '#6ba048'
  },

  typography: {
    useNextVariants: true
  }
});
