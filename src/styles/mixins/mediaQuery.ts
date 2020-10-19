import { css, FlattenSimpleInterpolation } from 'styled-components'
import { breakpoints } from 'styles/variables/layout'

type TReponse = {
  [key: string]: (args: any) => FlattenSimpleInterpolation
}

export const respondTo = Object.keys(breakpoints).reduce(
  (accumulator: TReponse, label) => {
    accumulator[label] = (args) => css`
      @media (max-width: ${breakpoints[label]}) {
        ${css(args)};
      }
    `
    return accumulator
  },
  {}
)

export const respondFrom = Object.keys(breakpoints).reduce(
  (accumulator: TReponse, label) => {
    accumulator[label] = (args) => css`
      @media (min-width: ${breakpoints[label]}) {
        ${css(args)};
      }
    `
    return accumulator
  },
  {}
)
