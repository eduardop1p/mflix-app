import * as types from '../types';

const initialState = {
  user: {
    id: '',
    nome: 'visitor',
    email: '',
    session: { id: '', expires: '' },
  },
  profileUrl: '',
  isLogedIn: false,
};

/* eslint-disable */

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.user = action.payload.user;
      newState.profileUrl = action.payload.profileUrl;
      newState.isLogedIn = action.payload.isLogedIn;

      return newState;
    }

    case types.USER_LOGIN_PHOTO_SUCCESS: {
      const newState = { ...state };
      newState.profileUrl = action.payload.profileUrl;

      return newState;
    }

    case types.USER_LOGIN_PHOTO_FAILURE: {
      const newState = { ...state };
      newState.profileUrl = '';

      return newState;
    }

    case types.USER_LOGIN_REQUEST: {
      const newState = { ...state };
      newState.user = action.payload.user;
      newState.profileUrl = action.payload.profileUrl;
      newState.isLogedIn = action.payload.isLogedIn;

      return newState;
    }

    case types.USER_LOGIN_FAILURE: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
