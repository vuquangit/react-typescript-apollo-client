import { all, fork } from "redux-saga/effects";
import ClockSaga from './Clock/Clock.saga'

export function* rootSaga() {
	yield all([fork(ClockSaga)]);
}