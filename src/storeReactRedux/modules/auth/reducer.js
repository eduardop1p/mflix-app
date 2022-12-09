import * as types from '../types';

const initialState = {
  user: {
    id: '',
    nome: '',
    email: '',
    foto: [],
  },
  session: { id: '', expires: 0 },
  isLogedIn: false,
};

/* eslint-disable */

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.user = action.payload.user;
      newState.session = action.payload.session;
      newState.isLogedIn = action.payload.isLogedIn;

      return newState;
    }

    case types.USER_NEW_DATA_SUCCESS: {
      const newState = { ...state };
      newState.user = action.payload.user;
      newState.session = action.payload.session;

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
