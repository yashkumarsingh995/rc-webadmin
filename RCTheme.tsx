import { defaultTheme } from 'react-admin'
import merge from 'lodash/merge'
import createPalette from '@mui/material/styles/createPalette'

import LatoBlack from './assets/fonts/Lato/Lato-Black.ttf'
import LatoBoldItalic from './assets/fonts/Lato/Lato-BoldItalic.ttf'
import LatoLightItalic from './assets/fonts/Lato/Lato-LightItalic.ttf'
import LatoThinItalic from './assets/fonts/Lato/Lato-ThinItalic.ttf'
import LatoBlackItalic from './assets/fonts/Lato/Lato-BlackItalic.ttf'
import LatoItalic from './assets/fonts/Lato/Lato-Italic.ttf'
import LatoRegular from './assets/fonts/Lato/Lato-Regular.ttf'
import LatoBold from './assets/fonts/Lato/Lato-Bold.ttf'
import LatoLight from './assets/fonts/Lato/Lato-Light.ttf'
import LatoThin from './assets/fonts/Lato/Lato-Thin.ttf'

import MontserratBlack from './assets/fonts/Montserrat/Montserrat-Black.ttf'
import MontserratExtraLight from './assets/fonts/Montserrat/Montserrat-ExtraLight.ttf'
import MontserratMediumItalic from './assets/fonts/Montserrat/Montserrat-MediumItalic.ttf'
import MontserratBlackItalic from './assets/fonts/Montserrat/Montserrat-BlackItalic.ttf'
import MontserratExtraLightItalic from './assets/fonts/Montserrat/Montserrat-ExtraLightItalic.ttf'
import MontserratRegular from './assets/fonts/Montserrat/Montserrat-Regular.ttf'
import MontserratBold from './assets/fonts/Montserrat/Montserrat-Bold.ttf'
import MontserratItalic from './assets/fonts/Montserrat/Montserrat-Italic.ttf'
import MontserratSemiBold from './assets/fonts/Montserrat/Montserrat-SemiBold.ttf'
import MontserratBoldItalic from './assets/fonts/Montserrat/Montserrat-BoldItalic.ttf'
import MontserratLight from './assets/fonts/Montserrat/Montserrat-Light.ttf'
import MontserratSemiBoldItalic from './assets/fonts/Montserrat/Montserrat-SemiBoldItalic.ttf'
import MontserratExtraBold from './assets/fonts/Montserrat/Montserrat-ExtraBold.ttf'
import MontserratLightItalic from './assets/fonts/Montserrat/Montserrat-LightItalic.ttf'
import MontserratThin from './assets/fonts/Montserrat/Montserrat-Thin.ttf'
import MontserratExtraBoldItalic from './assets/fonts/Montserrat/Montserrat-ExtraBoldItalic.ttf'
import MontserratMedium from './assets/fonts/Montserrat/Montserrat-Medium.ttf'
import MontserratThinItalic from './assets/fonts/Montserrat/Montserrat-ThinItalic.ttf'
import { red } from '@mui/material/colors'

//  Useful link for understanding our options: https://marmelab.com/blog/2020/09/11/react-admin-tutorials-build-your-own-theme.html
export const palette = createPalette(
  merge({}, defaultTheme.palette, {
    // Primary is our Greens
    primary: {
      main: '#94D034',
      contrastText: '#171F58',
      // contrastText: '#f00',
    },
    // Secondary is our Blues
    secondary: {
      light: '#8BA7C7',
      main: '#171F58',
      dark: '#171F58', // color for button:onhover
      // contrastText: '#171F58',
      contrastText: '#fff',
    },
    action: {
      selected: '#0f0',
    },
    background: {
      // paper: '#171F58',
      default: '#171F58',
    },
    text: {
      primary: '#171F58', // e.g datagrid text
      secondary: '#171F58', // e.g. datagrid checkbox border
      disabled: '#ddd'
    }
  }),
)

export const defaultHeights = {
  buttonHeight: '48px',
}

export const typography = {
  fontFamilySecondary: "'Lato', sans-serif",
  fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
  fontSize: 15, // Should be a number in pixels
  fontStyle: 'normal',
  fontWeightLight: 400,
  fontWeightRegular: 500,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  color: palette.text.primary,
}

const typographyBase = {
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSize,
  fontStyle: typography.fontStyle,
  color: typography.color,
}

const typographyHeader = {
  ...typographyBase,
  fontWeight: typography.fontWeightBold,
  fontFamily: typography.fontFamilySecondary, // Use a dedicated font for the header
}

const typographyBody = {
  ...typographyBase,
  fontWeight: typography.fontWeightRegular,
  fontFamily: typography.fontFamily,
}

const RCTheme = merge({}, defaultTheme, {
  container: {},
  palette,
  typography,
  components: {
    // RaDatagrid: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "Lavender",
    //       "& .RaDatagrid-headerCell": {
    //         backgroundColor: "MistyRose",
    //       },
    //     }
    //   }
    // },
    MuiCssBaseline: {
      styleOverrides: `@font-face {
            font-family: 'Montserrat';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: url(${MontserratRegular}) format('ttf');
        }`,
    },
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          margin: '2px 0',
          borderLeftStyle: 'none',
          marginRight: '10px',
          color: palette.secondary.contrastText,
          fontWeight: typography.fontWeightLight,
          fontSize: typography.fontSize,
          textTransform: 'uppercase',
          '&:hover': {
            borderRadius: '0px 25px 25px 0px',
            backgroundColor: '#3e4c7f',
          },
          "& .RaMenuItemLink-active": {
            color: "#000"
          },
        },
        active: { // does't work for me, TODO: need to investigate
          borderRadius: '0px 25px 25px 0px',
          borderRightColor: palette.secondary.main,
          backgroundColor: '#3e4c7f',
          color: "#fff",
          // color: "#ff4081",
          // color: palette.secondary.contrastText,
        },
        // icon: {
        //   color: 'inherit',
        // },
        // active: {
        //   borderLeftStyle: "none",
        //   borderRightColor: palette.secondary.main,
        //   borderRightWidth: 3,
        //   borderRightStyle: "solid",
        //   backgroundColor: palette.action.selected, // Defined in the default palette
        //   color: palette.primary.main,
        //   fontWeight: typography.fontWeightBold,
        // },
      },
    },
    RaSidebar: {
      styleOverrides: {
        drawerPaper: {
          backgroundColor: palette.secondary.main,
          color: palette.primary.main,
          height: '200%',
          boxShadow: '2px 0px 1px -1px rgba(0,0,0,0.2), 1px 0px 3px 0px rgba(0,0,0,0.1)',
        },
        root: {
          color: palette.primary.main,
        },
        fixed: {
          position: 'inherit',
        },
      },
    }
  },

  overrides: {
    RaSidebar: {
      drawerPaper: {
        backgroundColor: palette.common.white,
        color: palette.primary.main,
        height: "100%",
        boxShadow:
          "2px 0px 1px -1px rgba(0,0,0,0.2), 1px 0px 3px 0px rgba(0,0,0,0.1)",
      },
    },
    
  }
})

export default RCTheme
