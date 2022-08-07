import * as types from '../types';

const initialState = {
  movieBackground: null,
  movieSerieImage: null,
  loadAllCatalog: false,
};

// eslint-disable-next-line
export default function firstBackgroundMovie(state = initialState, action) {
  switch (action.type) {
    case types.FIRST_BACKGROUND_MOVIE_SUCCESS: {
      const newState = { ...state };
      newState.movieBackground = action.payload.movieBackground;
      newState.movieSerieImage = action.payload.movieSerieImage;
      newState.loadAllCatalog = action.payload.loadAllCatalog;

      return newState;
    }
    case types.FIRST_BACKGROUND_MOVIE_FAILURE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
