import * as types from '../types';

export function firstBackgroundMovieSuccess(payload) {
  return {
    type: types.FIRST_BACKGROUND_MOVIE_SUCCESS,
    payload,
  };
}

export function firstBackgroundMovieFailure(payload) {
  return {
    type: types.FIRST_BACKGROUND_MOVIE_FAILURE,
    payload,
  };
}
