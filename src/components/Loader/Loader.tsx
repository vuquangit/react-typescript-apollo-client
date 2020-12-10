import React, { FC } from 'react'

import { LoaderWrapper, LoaderContent } from './Loader.styled'
import { BaseLoaderProps } from './Loader.types'

const Loader: FC<BaseLoaderProps> = ({ size = 24 }) => {
  return (
    <LoaderWrapper>
      <LoaderContent size={size} data-testid="loader-content">
        Loader...
      </LoaderContent>
    </LoaderWrapper>
  )
}

export default Loader
