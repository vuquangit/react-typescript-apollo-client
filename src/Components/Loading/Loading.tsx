import React, { FC } from 'react'

import { LoadingWrapper, LoadingContent } from './Loading.styled'
import { BaseLoadingProps } from './Loading.types'

const Loading: FC<BaseLoadingProps> = ({ size = 24 }) => {
  return (
    <LoadingWrapper>
      <LoadingContent size={size} data-testid="loading-content">
        Loading...
      </LoadingContent>
    </LoadingWrapper>
  )
}

export default Loading
