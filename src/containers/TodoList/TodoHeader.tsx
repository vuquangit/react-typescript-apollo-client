import React, { FC } from 'react'
import { useAddTodo } from '@/graphql/mutations/todos/addTodo'
import TodoTextInput from './TodoTextInput'
import styled from 'styled-components'

const Title = styled('h2')`
  width: 100%;
  font-size: 80px;
  font-weight: 200;
  text-align: center;
  color: #b83f45;
  text-transform: uppercase;
  text-rendering: optimizeLegibility;
`

const TodoHeader: FC = () => {
  const { mutate } = useAddTodo()
  const addTodo = (text: any) => mutate({ variables: { text } })

  return (
    <div>
      <Title>todos</Title>
      <TodoTextInput
        newTodo
        onSave={(text: string) => {
          if (text.length !== 0) {
            addTodo(text)
          }
        }}
        placeholder="What needs to be done?"
      />
    </div>
  )
}
export default TodoHeader
