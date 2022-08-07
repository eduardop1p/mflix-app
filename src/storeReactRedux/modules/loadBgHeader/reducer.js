import * as types from '../types';

const initialState = {
  loadBgHeader: false,
};

/* eslint-disable */

export default function loadBgHeader(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_BG_HEADER_SUCCESS: {
      const newState = { ...state };
      newState.loadBgHeader = action.payload.loadBgHeader;

      return newState;
    }
    case types.LOAD_BG_HEADER_FAILURE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
