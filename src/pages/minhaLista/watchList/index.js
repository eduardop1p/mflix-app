/* eslint-disable */

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as actions from '../../../storeReactRedux/modules/loading/actions';
import axiosBaseUrlMovies from '../../../services/axiosBaseUrlMovies';
import GenreWatchList from '../genreWatchList/index';
import apiConfig from '../../../config/apiConfig';
import { WatchListSection } from './styled';

export default function WatchList() {
  const dispatch = useDispatch();

  const [userList, setUserList] = useState(null);

  useEffect(() => {
    const getUserList = async () => {
      try {
        const { data } = await axiosBaseUrlMovies.get(
          `/popular?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
        );
        setUserList(data);
      } catch {
        console.error('Erro ao pegar lista de usuário.');
      } finally {
        setTimeout(() => dispatch(actions.loadingFailure()), 500);
      }
    };
    getUserList();
  }, [dispatch]);

  return (
    <WatchListSection>
      <h1>Minha Lista</h1>
      <div className="my-list-container">
        {userList &&
          userList.results.map((result) => (
            <div className="my-list" key={result.id}>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${result.backdrop_path}`}
                  alt={result.tittle}
                />
                <div className="my-list-details">
                  <h4>{result.title}</h4>
                  <div className="my-list-genre-release-date">
                    <GenreWatchList genre_ids={result.genre_ids} />
                    <div className="release-date">
                      {result.release_date && result.release_date.slice(0, 4)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </WatchListSection>
  );
}
