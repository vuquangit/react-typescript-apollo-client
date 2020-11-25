import styled, { css } from 'styled-components'
import { ifProp, switchProp } from 'styled-tools'

import { IModalWrapper, IModalContent } from './Modal.types'

export const ModalWrapper = styled('div')<IModalWrapper>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);

  display: ${ifProp({ show: true }, 'flex', 'none')};
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const ModalContent = styled('div')<IModalContent>`
  position: relative;
  width: 80%;
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
`

export const ModalClose = styled('div')`
  position: absolute;
  top: 0px;
  right: 0px;
`
