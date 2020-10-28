import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'

import App from './App'
import clientConfig from './graphql.config'
import { initializeStore } from './redux/store'
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
