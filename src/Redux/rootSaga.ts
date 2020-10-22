import { all, fork } from 'redux-saga/effects'
import ClockSaga from './Clock/Clock.saga'
import CounterSaga from './Counter/Counter.saga'

export function* rootSaga() {
  yield all([fork(ClockSaga), fork(CounterSaga)])
}
