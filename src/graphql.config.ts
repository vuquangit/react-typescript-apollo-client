import {
  ApolloClient,
  createHttpLink,
  NormalizedCacheObject,
  ApolloLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { RestLink } from 'apollo-link-rest'

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
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }
})

// Create a RestLink for the REST API
// If you are using multiple link types, restLink should go before httpLink,
// as httpLink will swallow any calls that should be routed through rest!
const restLink = new RestLink({
  endpoints: { newsapi: process.env.REACT_APP_RESTAPI_ENDPOINT || '' },
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_RESTAPI_API_KEY || ''}`,
    // 'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers':
    // 'Origin, X-Requested-With, Content-Type, Accept',
    // 'Access-Control-Allow-Credentials': 'true',
    // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
  },
})

const clientConfig: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: cache,
  // Note: httpLink is terminating so must be last, while retry & error wrap
  // the links to their right. State & context links should happen before (to
  // the left of) restLink.
  link: ApolloLink.from([authLink, restLink, httpLink]),
  connectToDevTools: process.env.NODE_ENV !== 'production',
})

export default clientConfig
