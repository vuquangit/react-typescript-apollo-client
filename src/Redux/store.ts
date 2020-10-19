import { applyMiddleware, createStore, compose, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer, { IStoreState } from './rootReducer'
import rootSaga from './Clock/Clock.saga'

export const initializeStore = (preloadedState: IStoreState) => {
  const isDev: boolean = process.env.NODE_ENV === 'development'

  const sagaMiddleware = createSagaMiddleware()

  const middlewares = isDev
    ? [sagaMiddleware, createLogger()]
    : [sagaMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  return {
    ...createStore(
      rootReducer,
      preloadedState,
      isDev
        ? composeWithDevTools(middlewareEnhancer)
        : compose(middlewareEnhancer)
    ),
    runSaga: sagaMiddleware.run(rootSaga),
  }
}
