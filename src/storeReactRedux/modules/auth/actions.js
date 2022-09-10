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

export function userLoginRequest(payload) {
  return {
    type: types.USER_LOGIN_REQUEST,
    payload,
  };
}

export function userLoginPhotoSuccess(payload) {
  return {
    type: types.USER_LOGIN_PHOTO_SUCCESS,
    payload,
  };
}
export function userLoginPhotoFailure(payload) {
  return {
    type: types.USER_LOGIN_PHOTO_FAILURE,
    payload,
  };
}
