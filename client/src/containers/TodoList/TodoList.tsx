import React, { FC } from 'react'
// import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import { Todo } from '@/graphql/models/Todos'

interface ITodo {
  id: number
  completed: boolean
  text: string
}

type Props = {
  filteredTodos: ITodo[]
  actions: any
}

const TodoList: FC<Props> = ({ filteredTodos, actions }: any) => (
  <ul className="todo-list">
    {filteredTodos &&
      filteredTodos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} {...actions} />
      ))}
  </ul>
)

// TodoList.propTypes = {
//   filteredTodos: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     completed: PropTypes.bool.isRequired,
//     text: PropTypes.string.isRequired
//   }).isRequired).isRequired,
//   actions: PropTypes.object.isRequired
// }

export default TodoList
