/* eslint-disable */
import { useParams, useLocation } from 'react-router-dom';

import MovieD from './movieD';
import SerieD from './serieD';

export default function PageDetailsTitles() {
  const { id } = useParams();
  const location = useLocation();

  const movie = location.pathname.includes('filmes');

  return movie ? (
    <MovieD id={id} midiaType="movie" />
  ) : (
    <SerieD id={id} midiaType="tv" />
  );
}
