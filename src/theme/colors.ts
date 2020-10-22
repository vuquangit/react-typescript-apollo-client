export interface IPalette {
  light: string
  main: string
  dark: string
  contrastText: string
}

export type IColorPalette = {
  [key in ColorType]: IPalette
}

export const COLOR = {
  black: '#2E2E2E',
  black1: '#6C6C6C',
  black2: '#B4B4B4',
  blue: '#6EB2FB',
  gray: '#F7F7F7',
  gray1: '#F5F5F5',
  gray2: '#F2F2F2',
  green: '#00D3CA',
  orange: '#F1AD3D',
  primary: '#F62F5E',
  red: '#F62F5E',
  white: '#fff',
  yellow: '#EFFC90',
}

export type ColorKey = keyof typeof COLOR
export type ColorValues = typeof COLOR[ColorKey]

export type ColorType =
  | 'primary'
  | 'blue'
  | 'black'
  | 'orange'
  | 'gray'
  | 'green'
  | 'yellow'
  | 'red'

export const redPalette = {
  contrastText: '#FFF',
  dark: '#cf2557',
  light: '#fc688e',
  main: '#F62F5E',
}

export const primaryPalette = {
  contrastText: '#FFF',
  dark: '#cf2557',
  light: '#fc688e',
  main: '#F62F5E',
}

export const bluePalette = {
  contrastText: '#FFF',
  dark: '#4592f7',
  light: '#beddfe',
  main: '#6EB2FB',
}

export const blackPalette = {
  contrastText: '#FFF',
  dark: '#2e2e2e',
  light: '#b0b0b0',
  main: '#707070',
}

export const orangePalette = {
  contrastText: '#FFF',
  dark: '#ea862e',
  light: '#f8da4f',
  main: '#F1AD3D',
}
export const grayPalette = {
  contrastText: '#FFF',
  dark: '#e5e5e5',
  light: '#fbfbfb',
  main: '#F7F7F7',
}
export const greenPalette = {
  contrastText: '#FFF',
  dark: '#00ad9d',
  light: '#d4f5f3',
  main: '#00D3CA',
}
export const yellowPalette = {
  contrastText: '#FFF',
  dark: '#e4f45e',
  light: '#f7fccd',
  main: '#EFFC90',
}

export const colorPalettes: IColorPalette = {
  black: blackPalette,
  blue: bluePalette,
  gray: grayPalette,
  green: greenPalette,
  orange: orangePalette,
  primary: redPalette,
  red: redPalette,
  yellow: yellowPalette,
}
