const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 90,
    margin: 'auto',
    maxWidth: 800
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #D3D3D3',
    borderBottom: 0,
    borderRadius: 0,
    boxShadow: 'none',
    paddingBottom: 36,
    width: '100%'
  },
  bgimg: {
    borderBottom: '1px solid #D3D3D3',
    backgroundImage: 'url(/fast_food_bg.jpg)',
    backgroundPosition: 'center',
    marginBottom: 30,
    height: 100,
    width: '100%'
  },
  img: { height: 'auto', width: 100 },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    textAlgin: 'center'
  },
  subTitle: { fontSize: '1.2rem', fontWeight: 500, textAlgin: 'center' },
  stepper: {
    border: '1px solid #D3D3D3',
    borderTop: 0,
    padding: '0 40px 25px 40px'
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  backButton: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit
  },
  button: {
    fontWeight: 500,
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit
  },
  label: {}
});

export default styles;
