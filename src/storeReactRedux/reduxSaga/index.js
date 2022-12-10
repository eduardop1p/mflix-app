/* eslint-disable */

import { put, all, call } from 'redux-saga/effects';

import { userLoginFailure, userLoginSuccess } from '../modules/auth/actions';
import axiosUserBaseUrl from '../../services/axiosUserBaseUrl';
import clearDataUser, {
  clearDataUserSession,
} from '../../config/clearDataUserConfig';

function* mySagaUserIsLogedIn() {
  const auth = JSON.parse(localStorage.getItem('persist:auth'));
  if (!auth) return;

  const { user, isLogedIn, session } = JSON.parse(auth.auth);

  if (!isLogedIn || !user) return;

  axiosUserBaseUrl.defaults.headers.common['Authorization'] = session.id;
  try {
    const { data } = yield call(() =>
      axiosUserBaseUrl.get(`/users/${user.id}`)
    );
    const expires = new Date(session.expires).getTime();
    const dateNow = Date.now();
    if (dateNow > expires) {
      yield put(userLoginFailure());

      window.location.href = '/login?session_expires=true';
      return;
    }

    yield put(
      userLoginSuccess({
        user: clearDataUser(data),
        session: {
          id: session.id,
          expires: session.expires,
        },
        isLogedIn: true,
      })
    );
    return;
  } catch (e) {
    console.log(e);
    setTimeout(
      () => alert('Erro no servidor!! atualize a página ou volte mais tarde.'),
      100
    );
  }

  return;
}

export default function* rootSaga() {
  yield all([mySagaUserIsLogedIn()]);
}
