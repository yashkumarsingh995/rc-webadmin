import { red } from "@mui/material/colors"
import officialColors from './Colors'

const generalStyles: { [any: string]: React.CSSProperties } = {
  button: {
    width: 350,
    height: 50,
    margin: 10,
    backgroundColor: officialColors.innerBlue,
    color: 'white',
    fontSize: 15,
    zIndex: 10
  },
  pageTitle: {
    padding: 20,
    fontSize: 30,
  },
  search: {
    bottom: -110,
    minWidth: 300,
    position: 'absolute',
    right: 0,
    zIndex: 1
  },
  userIdNotification: {
    fontSize: 20,
    padding: 20,
    color: '#f44336',
    textTransform: "none"
  },
}

const formStyle = {
  container: {
    width: 1100,
  },
  header: {
    textTransform: 'uppercase',
    fontSize: 30,
    margin: 25,
  } as React.CSSProperties,
  field: {
    width: 300,
  },
  largeField: {
    width: 650,
  },
  button: {
    width: '350px',
    height: '50px',
    margin: '10px',
    backgroundColor: '#171F58',
    color: 'white',
    fontSize: '15px',
  },
}

export { generalStyles, formStyle }