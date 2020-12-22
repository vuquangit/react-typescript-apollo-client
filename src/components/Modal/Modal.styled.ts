import styled, { css } from 'styled-components'
import { ifProp, prop, switchProp } from 'styled-tools'
import { space } from 'styled-system'

import { IModalWrapper, IModalContent } from './Modal.types'

export const ModalWrapper = styled('div')<IModalWrapper>`
  ${switchProp('position', {
    fixed: css`
      position: fixed;
      top: 0;
      left: 0;
    `,
    absolute: css`
      position: relative;
    `,
  })}

  width: 100%;
  height: 100%;
  background: ${ifProp(
    { backgroundBlack: true },
    'rgba(0, 0, 0, 0.6)',
    'transparent'
  )};

  display: ${ifProp({ show: true }, 'flex', 'none')};
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const ModalContent = styled('div')<IModalContent>`
  ${switchProp('position', {
    fixed: css`
      position: relative;
    `,
    absolute: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
  })}

  width: ${prop('widthContent', ' 80%')};
  height: auto;
  padding: 8px;

  ${switchProp('themeMode', {
    light: css`
      background-color: #fff;
      color: #000;
    `,
    dark: css`
      background-color: #1e1e1e;
      color: #fff;
    `,
  })}

  ${space};
`

export const ModalClose = styled('div')`
  position: absolute;
  top: 0px;
  right: 0px;
`
