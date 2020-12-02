export const actionTypes = {
  FAILURE: 'FAILURE',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  LOAD_DATA: 'LOAD_DATA',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
  START_CLOCK: 'START_CLOCK',
  TICK_CLOCK: 'TICK_CLOCK',
  HYDRATE: 'HYDRATE',
}

export interface IClockState {
  count: number
  error: boolean
  lastUpdate: number
  light: boolean
  placeholderData: null
}

interface FailureAction {
  type: typeof actionTypes.FAILURE
  error: any
}

interface IncrementAction {
  type: typeof actionTypes.INCREMENT
}

interface DecrementAction {
  type: typeof actionTypes.DECREMENT
}

interface ResetAction {
  type: typeof actionTypes.RESET
}

interface LoadDataAction {
  type: typeof actionTypes.LOAD_DATA
}

interface LoadDataSuccessAction {
  type: typeof actionTypes.LOAD_DATA_SUCCESS
}

interface StartClockAction {
  type: typeof actionTypes.START_CLOCK
  data: any
}

interface TickClockAction {
  type: typeof actionTypes.TICK_CLOCK
  light: boolean
  ts: number
}

export type ClockActionTypes =
  | FailureAction
  | IncrementAction
  | DecrementAction
  | ResetAction
  | LoadDataAction
  | LoadDataSuccessAction
  | StartClockAction
  | TickClockAction
