import green from '@material-ui/core/colors/green';

const styles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  successIcon: {
    marginRight: '10px'
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  card: {
    height: 260,
    width: '100%',
    borderRadius: 0,
    border: '1px solid #D3D3D3'
  },
  media: {
    height: 160
  },
  content: {
    fontFamily: 'Arial',
    padding: 8,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  share: {
    height: '15px'
  },
  chipAvatar: {
    width: '100%',
    height: 'auto'
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  firstline: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  dollar: {
    color: '#6ba048',
    // fontWeight: 'bold',
    letterSpace: 1.2
  },
  starheart: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 8
  },
  star: {
    paddingRight: 4,
    color: '#fbc12f'
  },
  starRating: {
    display: 'flex',
    alignItems: 'center'
  },
  drawer: {
    width: 200,
    flexShrink: 0
  },
  drawerPaper: {
    background: 'orange',
    top: 64,
    width: '20%',
    height: 656
  },
  favouriteButton: {
    color: '#e91e63',
    '&$checked': {
      color: '#e91e63'
    }
  },
  checked: {}
});

export default styles;
