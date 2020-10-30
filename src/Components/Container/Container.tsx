import React, { FC } from 'react'

import { ContainerWrapper, ContainerContent } from './Container.styled'
import { IContainerProps } from './Container.types'

const Container: FC<IContainerProps> = ({ children }) => {
  return (
    <ContainerWrapper>
      <ContainerContent>{children}</ContainerContent>
    </ContainerWrapper>
  )
}

export default Container
