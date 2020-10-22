import { combineReducers } from '@reduxjs/toolkit'

import profileReducer from './Profile/Profile.reducer'
import clockReducer from './Clock/Clock.reducer'
import counterReducer from './Counter'

import { IProfileState, ProfileActionTypes } from './Profile/actionTypes'
import { IClockState, ClockActionTypes } from './Clock/actionTypes'

const stores = {
  profile: profileReducer,
  clock: clockReducer,
  counter: counterReducer,
}

export let rootReducer = combineReducers({
  ...stores,
})

export default function createReducer(injectedReducers = {}) {
  rootReducer = combineReducers({
    ...stores,
    ...injectedReducers,
  })

  return rootReducer
}

export interface IStoreState {
  profile: IProfileState
  clock: IClockState
}

export type TStoreActionState = ProfileActionTypes | ClockActionTypes
export type RootState = ReturnType<typeof rootReducer>
