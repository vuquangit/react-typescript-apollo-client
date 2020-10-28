/**
 *
 * Styled for Wrapper
 *
 */

import styled from 'styled-components'
import {
  space,
  display,
  border,
  background,
  position,
  flexbox,
  layout,
} from 'styled-system'
import { WrapperProps } from './Wrapper.types'

export const WrapperComponent: React.FC<WrapperProps> = styled('div')<
  WrapperProps
>`
  ${space};
  ${display};
  ${border};
  ${background};
  ${position};
  ${flexbox};
  ${layout};
`
