import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#f0792b'
      // main: '#30cfd0'
    },
    secondary: {
      main: '#5558f6'
    },
    bg: {
      main: '#212121'
    }
  },
  typography: {
    useNextVariants: true
  }
});
