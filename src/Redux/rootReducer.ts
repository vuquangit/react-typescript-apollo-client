import { combineReducers } from 'redux'
import profileReducer from './Profile/Profile.reducer'
import clockReducer from './Clock/Clock.reducer'

import { IProfileState, ProfileActionTypes } from './Profile/actionTypes'
import { IClockState, ClockActionTypes } from './Clock/actionTypes'

const rootReducer = combineReducers({
  profile: profileReducer,
  clock: clockReducer,
})

export interface IStoreState {
  profile: IProfileState
  clock: IClockState
}

export type TStoreActionState = ProfileActionTypes | ClockActionTypes

export default rootReducer
