export type BreakPoint = {
  xs: '0px'
  sm: '600px'
  md: '960px'
  lg: '1280px'
  xl: '1920px'
}

export interface IBreakPoint {
  [key: string]: string
}

const breakpoints: IBreakPoint = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px',
}

export { breakpoints }
