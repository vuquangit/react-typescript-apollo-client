import styled from 'styled-components'
import { space } from 'styled-system'
import { prop } from 'styled-tools'

export const FlexWrapper = styled('div')`
  ${space}

  display: flex;
  justify-content: ${prop('justifyContent', 'center')};
  align-items: ${prop('alignItems', 'center')};
  align-content: ${prop('alignContent', 'center')};
  flex-direction: ${prop('flexDirection', 'column')};
  flex-wrap: ${prop('flewWrap', 'wrap')};
  flex-grow: ${prop('flewGrow', 1)};
  order: ${prop('order', 0)};
  align-self: ${prop('alignSelf', 0)};
`
