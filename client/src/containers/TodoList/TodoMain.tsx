import React from 'react'
import { useQuery } from '@apollo/client'
import styled, { css } from 'styled-components'

// import { VisibilityFilter } from '../models/VisibilityFilter'
import { GET_ALL_TODOS } from '@/graphql/queries/getAllTodos'
import { GET_VISIBILITY_FILTER } from '@/graphql/queries/getVisibilityFilter'
// import { GetAllTodos } from '@/graphql/__generated__/GetAllTodos'
import { useClearCompletedTodos } from '@/graphql/mutations/clearCompletedTodos'
import { useCompleteAllTodos } from '@/graphql/mutations/completeAllTodos'
import { setVisibilityFilter } from '@/graphql/mutations/setVisibilityFilter'

import Footer from './TodoFooter'
import TodoBody from './TodoBody'

const MainWrapper = styled('section')`
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
`
const InputToggleAll = styled('input')`
  width: 1px;
  height: 1px;
  border: none;
  opacity: 0;
  position: absolute;
  right: 100%;
  bottom: 100%;
  background: none;
`
const Label = styled('label')`
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -8px;
  transform: rotate(90deg);

  &:before {
    content: '❯';
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 27px 10px 27px;
  }
`

export default function Main() {
  const {
    loading: isTodosLoading,
    data: todosConnection,
    error: todosError,
  } = useQuery(/*<GetAllTodos>*/ GET_ALL_TODOS)
  const { data: visibilityFilter } = useQuery(
    /*<VisibilityFilter>*/ GET_VISIBILITY_FILTER
  )

  const { mutate: clearCompletedTodos } = useClearCompletedTodos()
  const { mutate: completeAllTodos } = useCompleteAllTodos()

  if (isTodosLoading) return <div>Loading...</div>
  if (todosError)
    return <div>An error occurred {JSON.stringify(todosError)}</div>
  if (!todosConnection) return <div>None</div>
  const todos = todosConnection.todos.edges.map((t: any) => t?.node)

  const todosCount = todosConnection.todos.edges.length
  const completedCount = todos.filter((t: any) => (t ? t.completed : false))
    .length

  return (
    <MainWrapper className="main">
      {!!todosCount && (
        <span>
          <InputToggleAll
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todosCount}
            readOnly
          />
          <Label onClick={() => completeAllTodos} />
        </span>
      )}
      <TodoBody />
      {!!todosCount && (
        <Footer
          activeVisibilityFilter={visibilityFilter}
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          onClearCompleted={clearCompletedTodos}
          setVisibilityFilter={setVisibilityFilter}
        />
      )}
    </MainWrapper>
  )
}
