/* eslint-disable */

import { useEffect } from 'react';

import axiaxiosBaseUrlGenresSeriesos from '../../../services/axiosBaseUrlGenresSeries';
import axiosBaseUrlGenresMovies from '../../../services/axiosBaseUrlGenres';

export default function GenreWatchList(props) {
  const { genre_ids } = props;

  useEffect;

  return <div className="genres">{genre_ids}</div>;
}
