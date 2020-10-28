import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

import createReducer, { RootState } from './rootReducer'
import { rootSaga } from './rootSaga'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const initializeStore = (preloadedState: RootState) => {
  const isDev: boolean = process.env.NODE_ENV === 'development'

  const reduxSagaMonitorOptions = {}
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)
  const { run: runSaga } = sagaMiddleware

  const middlewares = isDev
    ? [sagaMiddleware, createLogger()]
    : [sagaMiddleware]

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ]

  const store = configureStore({
    reducer: createReducer(),
    middleware: [...getDefaultMiddleware(), ...middlewares],
    preloadedState: preloadedState,
    devTools: isDev,
    enhancers,
  })

  sagaMiddleware.run(rootSaga)

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (isDev && module.hot) {
    module.hot.accept('./rootReducer', () => {
      // const newRootReducer = require('./rootReducer').default
      // store.replaceReducer(newRootReducer)
      forceReducerReload(store)
    })
  }

  return store
}
