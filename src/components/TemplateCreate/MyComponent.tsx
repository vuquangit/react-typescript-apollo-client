import React, { FC } from 'react'

import { ComponentWrapper } from './MyComponent.styled'
import { BaseComponentProps } from './MyComponent.types'

const Component: FC<BaseComponentProps> = () => {
  return (
    <ComponentWrapper data-testid="component-wrapper">
      Content Component
    </ComponentWrapper>
  )
}

export default Component
