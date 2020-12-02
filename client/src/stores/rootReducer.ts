import { combineReducers } from 'redux'

import profileReducer from './Profile/Profile.reducer'
import clockReducer from './Clock/Clock.reducer'
import counterReducer from './Counter'
import themeReducer from './Theme'

import { ProfileActionTypes } from './Profile/actionTypes'
import { ClockActionTypes } from './Clock/actionTypes'

const stores = {
  profile: profileReducer,
  clock: clockReducer,
  counter: counterReducer,
  theme: themeReducer,
}

export let rootReducer = combineReducers({
  ...stores,
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createReducer = (injectedReducers = {}) => {
  rootReducer = combineReducers({
    ...stores,
    ...injectedReducers,
  })

  return rootReducer
}

export default createReducer

export type TStoreActionState = ProfileActionTypes | ClockActionTypes
export type RootState = ReturnType<typeof rootReducer>
