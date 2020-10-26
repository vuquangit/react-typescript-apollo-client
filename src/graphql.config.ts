import {
  ApolloClient,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { cache } from './cache'

// Instantiate required constructor fields
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_ENDPOINT,
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // 'Authorization': token ? `Bearer ${token}` : null,
    },
  }
})

const clientConfig: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: authLink.concat(httpLink),

  // Provide some optional constructor fields
  queryDeduplication: false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  connectToDevTools: process.env.NODE_ENV !== 'production',
})

export default clientConfig
