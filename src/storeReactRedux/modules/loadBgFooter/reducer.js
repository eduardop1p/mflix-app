import * as types from '../types';

const initialState = {
  loadBgImg1: false,
  loadBgImg2: false,
};

/* eslint-disable */

export default function loadBgFooter(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_BG_FOOTER_SUCCESS: {
      const newState = { ...state };
      newState.loadBgImg1 = action.payload.loadBgImg1;
      newState.loadBgImg2 = action.payload.loadBgImg2;

      return newState;
    }
    case types.LOAD_BG_FOOTER_FAILURE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
