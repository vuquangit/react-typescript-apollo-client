import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components'
import {
  ApolloProvider,
  ApolloClient,
  /* InMemoryCache, */
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

import GlobalStyle from 'theme/globalStyles'
import Main from './Template/main'
import * as theme from 'theme/theme'
import { cache } from './cache'

const App: FC = () => {
  // Instantiate required constructor fields
  // const cache = new InMemoryCache()
  const httpLink = createHttpLink({
    uri: 'https://graphql.anilist.co',
  })

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token')
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        // authorization: token ? `Bearer ${token}` : null,
      },
    }
  })

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    // Provide required constructor fields
    cache: cache,
    link: authLink.concat(httpLink),

    // Provide some optional constructor fields
    queryDeduplication: false,
    headers: {
      // 'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
