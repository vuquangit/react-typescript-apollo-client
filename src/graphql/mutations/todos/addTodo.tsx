import { gql, useMutation } from '@apollo/client'
// import * as AddTodoTypes from './__generated__/AddTodo';

export const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      success
      todo {
        id
        text
        completed
      }
      error {
        message
      }
    }
  }
`

export function useAddTodo() {
  const [mutate, { data, error }] = useMutation(
    /*<
    AddTodoTypes.AddTodo, 
    AddTodoTypes.AddTodoVariables
  >*/ ADD_TODO,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            todos(existingTodos, { toReference }) {
              return {
                ...existingTodos,
                edges: [
                  ...existingTodos.edges,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  {
                    __typename: 'TodosEdge',
                    node: toReference(data.addTodo.todo),
                  },
                ],
              }
            },
          },
        })
      },
    }
  )
  return { mutate, data, error }
}
