import { createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import fetch from 'cross-fetch'

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // 'Authorization': token ? `Bearer ${token}` : null,
      // 'Content-Type': 'application/json',
      // Accept: 'application/json',

      authorization: localStorage.getItem('token') || '',
      'client-name': 'ac3-todos-backend',
      'client-version': '1.0.0',
    },
  }
})

const createdHttpLink = createHttpLink({
  uri: process.env.REACT_APP_API_ENDPOINT || '',
  fetch: fetch,
})

const httpLink = authLink.concat(createdHttpLink)

export { httpLink }
