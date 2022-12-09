import * as types from '../types';

export function userLoginSuccess(payload) {
  return {
    type: types.USER_LOGIN_SUCCESS,
    payload,
  };
}

export function userLoginFailure(payload) {
  return {
    type: types.USER_LOGIN_FAILURE,
    payload,
  };
}

export function userNewDataSuccess(payload) {
  return {
    type: types.USER_NEW_DATA_SUCCESS,
    payload,
  };
}
