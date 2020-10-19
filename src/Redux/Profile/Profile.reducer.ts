import { Reducer } from 'redux'
import * as actionTypes from './actionTypes'

export const initProfileState: actionTypes.IProfileState = {
  isFetching: false,
  data: {},
}

const profileReducer: Reducer<actionTypes.IProfileState> = (
  state = initProfileState,
  action
) => {
  switch (action.type) {
    case actionTypes.PROFILE_UPDATE:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
      }
    case actionTypes.PROFILE_CLEAR:
      return {
        ...state,
        isFetching: false,
        data: { name: '' },
        error: '',
      }

    default:
      return state
  }
}

export default profileReducer
