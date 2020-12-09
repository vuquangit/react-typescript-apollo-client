import React, { FC } from 'react'

import { DefaultLayout } from '@/layouts'
import Container from '@/components/Container'
import { Page404Wrapper } from './Page404.styled'

const Page404: FC = () => {
  return (
    <DefaultLayout>
      <Container>
        <Page404Wrapper>
          <h2>PAGE NOT FOUND</h2>
        </Page404Wrapper>
      </Container>
    </DefaultLayout>
  )
}

export default Page404
