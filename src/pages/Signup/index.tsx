import React, { FC } from 'react'
import { useReactiveVar, useQuery } from '@apollo/client'

import { DefaultLayout } from '@/layouts'
import Container from '@/components/Container'
import { visibilityFilterVar } from '@/graphql/config/apollo-local-cache'
import { GET_ALL_TODOS } from '@/graphql/queries/getAllTodos'

const Signup: FC = () => {
  // test  reactive variables Graphql
  const visibilityFilter = useReactiveVar(visibilityFilterVar)
  console.log('visibilityFilterVar: ', visibilityFilter)

  // load todos from local cache
  const { data: todosData } = useQuery(GET_ALL_TODOS)
  console.log('todosData: ', todosData)

  return (
    <DefaultLayout>
      <Container>
        <div className="signup">Signup</div>
      </Container>
    </DefaultLayout>
  )
}

export default Signup
