import React, { FC } from 'react'
import { visibilityFilterVar } from '@/graphql/config/apollo-local-cache'
import {
  VisibilityFilter,
  VisibilityFilters,
} from '@/graphql/models/VisibilityFilter'
import { Todos } from '@/graphql/models/Todos'
import { useQuery } from '@apollo/client'
// import { GetAllTodos } from '@/graphql/__generated__/GetAllTodos';
import { GET_ALL_TODOS } from '@/graphql/queries/getAllTodos'
import { useCompleteTodo } from '@/graphql/mutations/todos/completeTodo'
import { useDeleteTodo } from '@/graphql/mutations/todos/deleteTodo'
import { useEditTodo } from '@/graphql/mutations/todos/editTodo'
import TodoItem from './TodoItem'
import { Todo } from '@/graphql/models/Todos'

const TodoBody: FC = () => {
  const { mutate: completeTodo } = useCompleteTodo()
  const { mutate: deleteTodo } = useDeleteTodo()
  const { mutate: editTodo } = useEditTodo()

  const {
    loading: isTodosLoading,
    data: todosConnection,
    error: todosError,
  } = useQuery(/*<GetAllTodos>*/ GET_ALL_TODOS)

  if (isTodosLoading) return <div>Loading...</div>
  if (todosError)
    return <div>An error occurred {JSON.stringify(todosError)}</div>
  if (!todosConnection) return <div>None</div>

  const filterTodosByVisibility = (
    visibilityFilter: VisibilityFilter,
    todos: Todos
  ) => {
    switch (visibilityFilter.id) {
      case VisibilityFilters.SHOW_ALL.id:
        return todos
      case VisibilityFilters.SHOW_COMPLETED.id:
        return todos.filter((t) => t.completed)
      case VisibilityFilters.SHOW_ACTIVE.id:
        return todos.filter((t) => !t.completed)
      default:
        throw new Error('Unknown filter: ' + visibilityFilter)
    }
  }

  const todos: Todos = todosConnection.todos.edges.map((t: any) => t?.node)
  const filteredTodos = filterTodosByVisibility(visibilityFilterVar(), todos)

  return (
    <ul className="todo-list">
      {filteredTodos &&
        filteredTodos.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            completeTodo={(id: number) => completeTodo({ variables: { id } })}
            deleteTodo={(id: number) => deleteTodo({ variables: { id } })}
            editTodo={(id: number, text: string) =>
              editTodo({ variables: { id, text } })
            }
          />
        ))}
    </ul>
  )
}

export default TodoBody
