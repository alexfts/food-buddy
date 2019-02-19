import { emphasize } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '100%',
    minHeight: 600
  },
  bgimg: {
    backgroundImage: 'url(/fast_food_bg.jpg)',
    backgroundPosition: 'center',
    height: 100,
    width: '100%'
  },

  title: {
    fontSize: '1.4rem',
    fontWeight: 550,
    paddingTop: 20,
    paddingLeft: 0,
    marginBottom: '1rem',
    textAlign: 'center'
  },
  dialogTitle: {
    padding: '0 20px',
    width: '100%'
  },
  dialogTitleEmpty: {
    minHeight: 600,
    padding: '0 20px',
    width: '100%'
  },
  dialogContent: {
    width: '100%'
  },
  input: {
    display: 'flex',
    padding: 0
  },
  chipAvatar: {
    width: '30px',
    height: 'auto'
  },
  avatar: {
    marginRight: '10px'
  },
  chipAvatar: {
    width: '100%',
    height: 'auto'
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  select: {
    width: '100%'
  },

  results: {
    fontSize: '1rem',
    textAlign: 'center',
    paddingTop: '3rem'
  }
});

export default styles;
