import * as types from '../types';

const initialState = {
  user: {
    id: '',
    name: 'visitor',
    email: '',
    session: { originalMaxAge: 0, expires: '' },
  },
  isLogedIn: false,
};

/* eslint-disable */

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.user = action.payload.user;
      newState.isLogedIn = action.payload.isLogedIn;

      return newState;
    }

    case types.USER_LOGIN_REQUEST: {
      const newState = { ...state };
      newState.user = action.payload.user;
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
