/* eslint-disable */

import { put, all } from 'redux-saga/effects';

import { userLoginFailure } from '../modules/auth/actions';

function* mySagaLogout() {}

export default function* rootSaga() {
  yield all([mySagaLogout()]);
}
