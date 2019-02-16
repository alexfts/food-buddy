const styles = theme => ({
  root: {
    display: 'flex'
  },
  card: {
    height: 300,
    width: '100%'
  },
  media: {
    height: 160
  },
  content: {
   fontFamily: 'Arial' 
  },
  firstline: {
    display: 'flex', 
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 16
  },
  dollar: {
    color: 'green'
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
