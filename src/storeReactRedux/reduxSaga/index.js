/* eslint-disable */

import { put, all } from 'redux-saga/effects';

import auth from '../../config/authLocalStorageConfig';
import { userLoginFailure } from '../modules/auth/actions';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* mySagaLogout() {
  const { isLogedIn } = auth;
  if (!isLogedIn) return;

  const sessionExpires = auth.user.session.expires;
  if (Date.now() > sessionExpires) {
    yield delay(1);
    yield put(userLoginFailure());
  }
}

export default function* rootSaga() {
  yield all([mySagaLogout()]);
}
