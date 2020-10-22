import React, { FC } from 'react'

import { DefaultLayout } from 'Layout'
import { Page404Wrapper } from './Page404.styled'

const Page404: FC = () => {
  return (
    <DefaultLayout>
      <Page404Wrapper>
        <h2>PAGE NOT FOUND</h2>
      </Page404Wrapper>
    </DefaultLayout>
  )
}

export default Page404
