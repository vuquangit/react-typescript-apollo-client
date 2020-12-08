import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'

// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader'

import App from './App'
import { apolloClient } from '@/graphql/config'
import '@/i18n'

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render()

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', render)
}
