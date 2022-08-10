/* eslint-disable */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../../storeReactRedux/modules/loading/actions';
import axiosBaseUrlUser from '../../../services/axiosUserBaseUrl';
import axiosBaseUrlMovies from '../../../services/axiosBaseUrlMovies';
import axiosBaseUrlSeries from '../../../services/axiosBaseUrlSeries';
import clearLinkTitle from '../../../config/clearLinkTitle';
import apiConfig from '../../../config/apiConfig';
import { WatchListSection } from './styled';

export default function WatchList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [userList, setUserList] = useState(null);

  useEffect(() => {
    const getUserList = async () => {
      try {
        const { data } = await axiosBaseUrlUser.get(`minha-lista/${user._id}`, {
          headers: { Authorization: user.session.id },
        });
        setUserList(data);
      } catch (err) {
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
          userList.map((result) =>
            result.midiaType !== 't' ? (
              <UserListMovie key={result.id} id={result.id} />
            ) : (
              <UserListSerie key={result.id} id={result.id} />
            )
          )}
      </div>
    </WatchListSection>
  );
}

function UserListMovie(props) {
  const { id } = props;

  const [dataList, setDataList] = useState(null);

  useEffect(() => {
    const getDetailsMovieId = async (id) => {
      try {
        const { data } = await axiosBaseUrlMovies.get(
          `/${id}?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        setDataList(data);
      } catch {
        console.error('Erro ao obter Id de Filme');
      }
    };
    getDetailsMovieId(id);
  }, []);

  return (
    dataList && (
      <Link
        to={`/vertical/filmes/m/${clearLinkTitle(dataList.title)}/${
          dataList.id
        }`}
        reloadDocument
        className="my-list"
      >
        <div>
          <div className="movie-or-serie-my-list">Filme</div>
          <img
            src={`https://image.tmdb.org/t/p/w500${dataList.backdrop_path}`}
            alt={dataList.title}
          />
          <div className="my-list-details">
            <h4>{dataList.title}</h4>
            <div className="my-list-genre-release-date">
              <div className="release-date">
                {dataList.release_date && dataList.release_date.slice(0, 4)}
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  );
}

function UserListSerie(props) {
  const { id } = props;

  const [dataList, setDataList] = useState(null);

  useEffect(() => {
    const getDetailsSerieId = async (id) => {
      try {
        const { data } = await axiosBaseUrlSeries.get(
          `/${id}?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        setDataList(data);
      } catch {
        console.error('Erro ao obter Id de Serie');
      }
    };
    getDetailsSerieId(id);
  }, []);

  return (
    dataList && (
      <Link
        to={`/vertical/series/t/${clearLinkTitle(dataList.name)}/${
          dataList.id
        }`}
        reloadDocument
        className="my-list"
      >
        <div>
          <div className="movie-or-serie-my-list">Serie</div>
          <img
            src={`https://image.tmdb.org/t/p/w500${dataList.backdrop_path}`}
            alt={dataList.name}
          />
          <div className="my-list-details">
            <h4>{dataList.name}</h4>
            <div className="my-list-genre-release-date">
              <div className="release-date">
                {dataList.first_air_date && dataList.first_air_date.slice(0, 4)}
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  );
}
