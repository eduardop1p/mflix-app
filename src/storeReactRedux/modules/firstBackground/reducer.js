import * as types from '../types';

const initialState = {
  background: null,
  movieSerieImage: null,
  loadAllCatalog: false,
};

// eslint-disable-next-line
export default function firstBackground(state = initialState, action) {
  switch (action.type) {
    case types.FIRST_BACKGROUND_SUCCESS: {
      const newState = { ...state };
      newState.background = action.payload.background;
      newState.movieSerieImage = action.payload.movieSerieImage;
      newState.loadAllCatalog = action.payload.loadAllCatalog;

      return newState;
    }
    case types.FIRST_BACKGROUND_FAILURE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
