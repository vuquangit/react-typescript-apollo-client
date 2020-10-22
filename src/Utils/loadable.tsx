/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { lazy, Suspense } from 'react'
import { get } from 'lodash'

type ImportType = () => Promise<{
  default: React.ComponentType<any>
}>

type LoadableType = (importFunc: ImportType, options?: { fallback: any }) => any

const loadable: LoadableType = (importFunc, options) => {
  const fallback = get(options, 'fallback', null)
  const LazyComponent = lazy(importFunc)

  return (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export default loadable
