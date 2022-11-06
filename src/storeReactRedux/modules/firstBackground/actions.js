import * as types from '../types';

export function firstBackgroundSuccess(payload) {
  return {
    type: types.FIRST_BACKGROUND_SUCCESS,
    payload,
  };
}

export function firstBackgroundFailure(payload) {
  return {
    type: types.FIRST_BACKGROUND_FAILURE,
    payload,
  };
}
