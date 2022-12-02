/* eslint-disable */
import { useParams, useLocation } from 'react-router-dom';

import MovieD from './movieD';
import SerieD from './serieD';

export default function PageDetailsTitles() {
  const { pathname } = useLocation();

  const movie = pathname.includes('filmes');

  return movie ? <MovieD midiaType="movie" /> : <SerieD midiaType="tv" />;
}
