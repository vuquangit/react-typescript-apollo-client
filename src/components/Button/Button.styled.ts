import styled, { css } from 'styled-components'
import { prop, ifProp, switchProp } from 'styled-tools'

import {
  space,
  layout,
  flexbox,
  buttonStyle,
  border,
  typography,
  variant,
  color,
} from 'styled-system'
import { BaseButtonProps } from './Button.types'

export const AppButton = styled('button')<BaseButtonProps>`
  ${color};
  ${space};
  ${layout};
  ${flexbox};
  ${buttonStyle};
  ${border};
  ${typography};

  cursor: ${prop('cursor', 'default')};
  border: 0;

  ${switchProp('themeMode', {
    light: css`
      background-color: #000;
      color: #fff;
    `,
    dark: css`
      background-color: #fff;
      color: #000;
      border: 1px solid #fff;
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

  ${variant({
    variants: {
      normal: {
        // p: '8px',
        fontSize: '16px',
      },
      large: {
        // p: '12px',
        fontSize: '24px',
      },
    },
  })}
`
