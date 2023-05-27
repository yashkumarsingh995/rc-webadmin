import officialColors from './Colors'

const SettingsStyle: { [any: string]: React.CSSProperties } = {
  fixedWidthContainer: {
    // height: '100%',
    borderRadius: 4,
    backgroundColor: officialColors.white,
    alignContent: 'center'
  },

  serviceOptionsForm: {
    width: '80%',

  },

  workLocation: {
    fontFamily: 'Lato-Bold',
    textAlign: 'left',
    fontSize: 12,
    margin: 5,
    padding: 20,
    textTransform: 'uppercase',
  },

  serviceOptionscheckboxFlex: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  serviceOptionsiconDiv: {
    cursor: 'pointer',
    marginBottom: 20
  },

  linkCard: {
    width: 205,
    height: 250,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top',
    borderWidth: 2,
    borderColor: officialColors.UIblue
  },

  cardContainer: {
    width: 400,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top',
    borderWidth: 2,
    borderColor: officialColors.UIblue
  },

  cardText: {
    fontSize: 15,
  },

  price: {
    fontSize: 40,
  },

  cardHeader: {
    fontSize: 15,
  },

  header: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 20,
  } as React.CSSProperties,

  link: {
    bottom: '0',
    textDecoration: 'underline',
    position: 'absolute',
  } as React.CSSProperties,

  serviceAreaFlex: {
    margin: 0,
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },

  bioAddress: {
    width: '90%',
    alignItems: 'center',
  }
}

export default SettingsStyle
