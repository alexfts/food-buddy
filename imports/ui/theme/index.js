import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#f0792b',
      // light: '#f39355',
      dark: '#a8541e'
      // main: '#30cfd0'
    },
    secondary: {
      main: '#5558f6',
      light: '#7779f7',
      dark: '#3b3dac',
      contrastText: '#fff'
    },

    default: {
      main: '#c2c2cc'
    },

    bg: {
      main: '#212121'
    }
  },
  typography: {
    useNextVariants: true
  }
});
