import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'

// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader'

import App from './App'
import { apolloClient } from '@/graphql/config'
import { initializeStore } from '@/stores/store'
import '@/i18n'

const render = () => {
  const initState: any = {}
  const store = initializeStore(initState)

  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <App />
        </Provider>
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
