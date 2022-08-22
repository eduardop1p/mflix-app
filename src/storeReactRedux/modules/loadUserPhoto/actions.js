import { LOAD_USER_PHOTO_SUCCESS, LOAD_USER_PHOTO_FAILURE } from '../types';

export function loadUserPhotoSuccess(payload) {
  return {
    type: LOAD_USER_PHOTO_SUCCESS,
    payload,
  };
}
export function loadUserPhotoFailure(payload) {
  return {
    type: LOAD_USER_PHOTO_FAILURE,
    payload,
  };
}
