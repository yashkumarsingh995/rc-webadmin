import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import officialColors from './Colors'

const greenMain = officialColors.green
const blueMain = officialColors.darkBlue
const lightBlue = officialColors.gray

const theme = createTheme({

  palette: {
    primary: {
      main: blueMain,
    },
    secondary: {
      main: greenMain,
    },
    blueMain,
    greenMain
  },

  typography: {
    fontSize: 12,
    fontFamily: ['sans-serif'].join(","),
    h1: {
    },
    h2: {
    },
    h3: {
    },
    h4: {
      fontFamily: 'MontserratSemiBold',
      fontSize: '32px',
    },
    subtitle1: {
      fontFamily: 'LatoBold',
      fontSize: '17px'
    },
    subtitle2: {
      fontFamily: 'Lato',
      fontSize: '13px'
    },
    button: {
      fontFamily: 'Lato',
    },
  },


  components: {

    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          fontFamily: ['Lato', 'sans-serif'].join(","),
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        input: {
          border: 'none'
        }
      }
    },

    MuiSlider: {
      styleOverrides: {
        thumb: {
          height: 10,
          width: 10,
        },
        track: {
          color: greenMain,
        },
        rail: {
          color: 'black'
        },
      },
    },

    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#f6f6f6",
          "&:hover": {
            backgroundColor: "#ececec"
          },
          "&$focused": {
            backgroundColor: "#dfb"
          }
        },
        underline: {
          "&:before": {
            borderBottomColor: greenMain,
            borderBottomWidth: "1px"
          },
          "&:hover:not(.Mui-focused):before": {
            borderBottomColor: greenMain,
            borderBottomWidth: "1px"
          },
          "&:after": {
            // focused
            borderBottomColor: greenMain,
            borderBottomWidth: "1px"
          }
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "#fcfcfc",
          },
          "&$focused": {
            backgroundColor: "white",
          },
          "&.Mui-disabled": {
            backgroundColor: "#ececec",
          },
        },
        underline: {
          "&:before": {
            borderBottomColor: "red",
          },
          "&:hover:not(.Mui-focused):before": {
            borderBottomColor: "green",
          },
          "&:after": {
            // focused
            borderBottomColor: "purple",
          }
        },
      },
    },
  },

})

const useStyles = makeStyles((theme) => ({
  rootitem: {
    overflow: 'scroll',
    height: '100%',
    margin: '0 auto',
  },
  up: {
  },
  down: {
    position: 'relative',
    marginBottom: '15px',
    width: "100%",
  },
  logo: {
    height: 76,
    display: 'flex',
    justifyContent: 'center',
  },
  logoItemSmall: {
    marginTop: 10,
    marginBottom: 10,
  },
  mainform: {
    textAlign: 'center',
    width: '100%',
  },
  insider: {
    backgroundColor: 'white',
    borderRadius: '4px',
    margin: '0 auto 15px auto',
    width: '500px',
  },
  container: {
    display: 'flex',
  },
  paper350: {
    padding: '0',
    width: 350,
    margin: '0 auto',
  },
  paperMargin: {
    padding: '20px',
    width: 300,
    margin: '5px 5px 10px 15px'
  },
  fixedwidth: {
    width: '500px',
    margin: '0 auto',
    borderRadius: '4px',
    backgroundColor: 'white',
  },
  fixedwidth80: {
    width: '80%',
    margin: '0 auto',
  },
  sliderMaps: {
    margin: '0 20px',
    width: '80%'
  },
  content: {
    margin: '0 auto',
  },
  dayContainerStyles: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'capitalize',
  },
  formLabel: {
    width: '240px',
    margin: '0 auto',
  }
}))

export { theme, useStyles, greenMain, blueMain, lightBlue }