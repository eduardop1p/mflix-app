/* eslint-disable */
import { useParams, useLocation } from 'react-router-dom';

import MovieD from './movieD';
import SerieD from './serieD';

export default function MoviePageDetails() {
  const { movieId, TOrM } = useParams();

  return TOrM !== 't' ? (
    <MovieD movieId={movieId} />
  ) : (
    <SerieD movieId={movieId} />
  );
}
