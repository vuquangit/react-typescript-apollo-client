import React, { FC } from 'react'

import { FlexWrapper } from './Flex.styled'
import { BaseFlexProps } from './Flex.types'

const Flex: FC<BaseFlexProps> = ({ children }) => {
  return <FlexWrapper data-testid="Flex-wrapper">{children}</FlexWrapper>
}

export default Flex
