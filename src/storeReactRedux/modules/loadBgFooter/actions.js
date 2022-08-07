import * as types from '../types';

export function loadBgFooterSuccess(payload) {
  return {
    type: types.LOAD_BG_FOOTER_SUCCESS,
    payload,
  };
}

export function loadBgFooterFailure(payload) {
  return {
    type: types.LOAD_BG_FOOTER_FAILURE,
    payload,
  };
}
