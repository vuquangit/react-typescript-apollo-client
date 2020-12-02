import React, { FC } from 'react'
import { DefaultLayout } from '@/layouts'

import Container from '@/components/Container'
import CatImageSearch from '@/containers/CatImageSearch'

const GraphqlPage: FC = () => {
  
  return (
    <DefaultLayout>
      <Container>
        <div>
          <h2>GRAPHQL QUERY</h2>
          <br />
        </div>

        <br />
        <br />

        <CatImageSearch />
      </Container>
    </DefaultLayout>
  )
}

export default GraphqlPage
