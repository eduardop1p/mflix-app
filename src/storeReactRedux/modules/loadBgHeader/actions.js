import * as types from '../types';

export function loadBgHeaderSuccess(payload) {
  return {
    type: types.LOAD_BG_HEADER_SUCCESS,
    payload,
  };
}

export function loadBgHeaderFailure(payload) {
  return {
    type: types.LOAD_BG_HEADER_FAILURE,
    payload,
  };
}
