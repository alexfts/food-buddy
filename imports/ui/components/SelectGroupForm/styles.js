import { emphasize } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  form: {
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '5%',
    // width: 600,
    maxWidth: '100%'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 550,
    marginBottom: '1rem',
    textAlign: 'center'
    // width: '100%'
  },
  dialogTitle: {
    padding: 20,
    width: '100%',
    overflowY: 'inherit'
  },
  input: {
    display: 'flex',
    padding: 0
  },
  chipAvatar: {
    width: '32px',
    height: '32px'
  },
  avatar: {
    marginRight: '10px'
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
  cancelButton: {
    // color: 'white',
    marginLeft: 10,
    marginTop: 0
  },
  buttons: {
    // height: '100%',
    // width: '100%'
    // borderTop: '1px solid #888888'
  }
});

export default styles;
