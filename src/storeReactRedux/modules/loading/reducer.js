import * as types from '../types';

const initialState = {
  loadingState: true,
};

// eslint-disable-next-line
export default function loading(state = initialState, action) {
  switch (action.type) {
    case types.LOADING_SUCCESS: {
      const newState = { ...state };
      newState.loadingState = action.payload.loadingState;

      return newState;
    }
    case types.LOADING_FAILURE: {
      const newState = { ...state };
      newState.loadingState = false;

      return newState;
    }
    default: {
      return state;
    }
  }
}
