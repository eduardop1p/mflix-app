import * as types from '../types';

export function loadingSuccess(payload) {
  return {
    type: types.LOADING_SUCCESS,
    payload,
  };
}
export function loadingFailure(payload) {
  return {
    type: types.LOADING_FAILURE,
    payload,
  };
}
