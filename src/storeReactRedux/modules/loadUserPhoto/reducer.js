import { LOAD_USER_PHOTO_SUCCESS, LOAD_USER_PHOTO_FAILURE } from '../types';

const initialState = {
  loadUserPhoto: false,
};

/* eslint-disable */

export default function loadUserPhoto(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_PHOTO_SUCCESS: {
      const newState = { ...initialState };
      newState.loadUserPhoto = action.payload.loadUserPhoto;

      return newState;
    }
    case LOAD_USER_PHOTO_FAILURE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
