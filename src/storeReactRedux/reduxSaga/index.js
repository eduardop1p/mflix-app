/* eslint-disable */

import { put, all, delay } from 'redux-saga/effects';

import { userLoginFailure } from '../modules/auth/actions';

function* mySagaLogout() {
  const auth = JSON.parse(localStorage.getItem('persist:auth'));
  const { user, isLogedIn } = JSON.parse(auth.auth);

  if (!isLogedIn) return;
  const expires = user.session.expires;

  if (Date.now() > expires) {
    yield delay(100);
    yield put(userLoginFailure());

    window.location.href = '/login?session_expires=true';
    return;
  }
  return;
}

export default function* rootSaga() {
  yield all([mySagaLogout()]);
}
