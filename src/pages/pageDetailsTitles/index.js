/* eslint-disable */
import { useParams, useLocation } from 'react-router-dom';

import MovieD from './movieD';
import SerieD from './serieD';

export default function PageDetailsTitles() {
  const { id, TOrM } = useParams();

  return TOrM !== 't' ? <MovieD id={id} /> : <SerieD id={id} />;
}
