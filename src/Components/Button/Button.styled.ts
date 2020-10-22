import styled, { css } from 'styled-components'
import { prop, ifProp, switchProp } from 'styled-tools'

import { space, layout, flexbox, buttonStyle } from 'styled-system'
import { primaryPalette /*, COLOR  */ } from 'Theme/colors'
import { BaseButtonProps } from './Button.types'

export const AppButton = styled.button<BaseButtonProps>`
  ${space};
  ${layout};
  ${flexbox};
  ${buttonStyle};

  color: ${prop('theme.colors.white', '#fff')};
  font-size: ${ifProp(
    { size: 'large' },
    prop('theme.sizes.lg', '20px'),
    prop('theme.sizes.md', '14px')
  )};
  background-color: ${prop('theme.colors.black', '#000')};

  ${switchProp('kind', {
    dark: css`
      background-color: ${prop('theme.colors.blue', 'blue')};
      border: 1px solid ${prop('theme.colors.blue', 'blue')};
    `,
    darker: css`
      background-color: ${prop('theme.colors.mediumblue', 'mediumblue')};
      border: 1px solid ${prop('theme.colors.mediumblue', 'mediumblue')};
    `,
    darkest: css`
      background-color: ${prop('theme.colors.darkblue', 'darkblue')};
      border: 1px solid ${prop('theme.colors.darkblue', 'darkblue')};
    `,
  })}

  ${ifProp(
    'disabled',
    css`
      background-color: ${prop('theme.colors.gray', '#999')};
      border-color: ${prop('theme.colors.gray', '#999')};
      pointer-events: none;
    `
  )}
`

export const theme = {
  palette: {
    primary: primaryPalette,
    secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0'],
  },
}
