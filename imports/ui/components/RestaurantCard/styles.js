import green from '@material-ui/core/colors/green';

const styles = theme => ({
  successBar: {
    top: 350,
    left: 500 
  },
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
    height: '100%',
    width: '100%',
    borderRadius: 0,
    border: '1px solid #D3D3D3'
  },
  media: {
    height: 160
  },
  content: {
    fontFamily: 'Arial',
    padding: '14px 16px',
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
    letterSpace: 1.2,
    marginRight: -5
  },
  starheart: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  star: {
    paddingRight: 4,
    color: '#fbc12f'
  },
  starRating: {
    display: 'flex',
    alignItems: 'center'
  },
  shareButton: {
    zIndex: 3
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
  checked: {},

  shareCard: {
    borderRadius: 0
  },
  shareCardHeader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareTitle: {
    fontSize: '1.4rem',
    fontWeight: 600,
    paddingBottom: 12
  },
  dialogContent: {
    paddingTop: '0.8rem',
    paddingBottom: '1.5rem'
  }
});

export default styles;
