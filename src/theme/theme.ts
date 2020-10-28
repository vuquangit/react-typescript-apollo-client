// import { respondTo, respondFrom } from './mixins/mediaQuery'
// import { colorPalettes } from './colors'
// import { breakpoints } from './variables/layout'

// export { respondTo, respondFrom, colorPalettes, breakpoints }

export type BreakPoint = {
  xs: '0px'
  sm: '600px'
  md: '960px'
  lg: '1280px'
  xl: '1920px'
}

const breakpoints: BreakPoint = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px',
}

export { breakpoints }

export const darkTheme = {
  backgroundColor: '#1e1e1e',
  textColor: '#fff',
  primary: '#ececec',
}

export const lightTheme = {
  backgroundColor: '#fff',
  textColor: '#000',
  primary: '#55aacc',
}
