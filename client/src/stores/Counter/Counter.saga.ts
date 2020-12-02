import { all, call, delay, put, takeEvery } from 'redux-saga/effects'
import { addCount } from './index'
import { actionTypes } from './actionTypes'

export function* incrementAsync() {
  yield delay(1000)
  yield put(addCount(1))
}

export function* watchIncrementAsync() {
  yield takeEvery(actionTypes.INCREMENT_ASYNC, incrementAsync)
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([call(watchIncrementAsync)])
}
