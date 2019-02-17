const styles = theme => ({
  root: {
    display: 'flex'
  },
  card: {
    height: 260,
    width: '100%'
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

  firstline: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  dollar: {
    color: 'green'
  },
  starheart: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  star: {
    paddingLeft: 8,
    paddingTop: 10,
    color: 'yellow'
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
