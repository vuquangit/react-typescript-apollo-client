import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'

import App from './App'
import clientConfig from './graphql.config'
import { initializeStore } from 'stores/store'
import 'i18n'

const initState: any = {}
const store = initializeStore(initState)

ReactDOM.render(
  <ApolloProvider client={clientConfig}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
