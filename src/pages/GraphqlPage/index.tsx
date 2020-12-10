import React, { FC } from 'react'
import { DefaultLayout } from '@/layouts'

import Container from '@/components/Container'
import TodoList from '@/containers/TodoList'
import CatImageSearch from '@/containers/CatImageSearch'

const GraphqlPage: FC = () => {
  return (
    <DefaultLayout>
      <Container>
        <TodoList />
        <br />
        <br />
        <CatImageSearch />
      </Container>
    </DefaultLayout>
  )
}

export default GraphqlPage
