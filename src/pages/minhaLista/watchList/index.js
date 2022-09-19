/* eslint-disable */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../../storeReactRedux/modules/loading/actions';
import axiosBaseUrlUser from '../../../services/axiosUserBaseUrl';
import axiosBaseUrlMovies from '../../../services/axiosBaseUrlMovies';
import axiosBaseUrlSeries from '../../../services/axiosBaseUrlSeries';
import clearLinkTitle from '../../../config/clearLinkTitle';
import Loading from '../../../components/loadingReactStates/index';
import MessageForm from '../../../components/messageForm';
import apiConfig from '../../../config/apiConfig';
import notSearch from '../../../assets/images/search.png';
import {
  RemoveItemsListSelected,
  WatchListSection,
  AddItensList,
} from './styled';

export default function WatchList(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { session } = useSelector((state) => state.auth.user);
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);

  const [loadingFilters, setLoadingFilters] = useState(false);
  const [showTitles, setShowTitles] = useState(false);
  const [userList, setUserList] = useState(null);
  const [myListTitles, setMyListTitles] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showFormMsg, setshowFormMsg] = useState(false);

  useEffect(() => {
    if (userList || !isLogedIn)
      setTimeout(() => dispatch(actions.loadingFailure()), 500);
    getUserList();
  }, [dispatch, userList]);

  useEffect(() => {
    const myList = Array.from(document.querySelectorAll('.my-list'));
    setMyListTitles(myList.map((item) => item.title));
    const hideFormMsg = document.body.querySelector('#hide-msg-form');
    if (showFormMsg) {
      hideFormMsg.onclick = () => setshowFormMsg(false);
      window.onkeyup = (event) => event.keyCode === 13 && setshowFormMsg(false);
    }
  });

  async function getUserList() {
    if (!isLogedIn) {
      return;
    }

    try {
      const { data } = await axiosBaseUrlUser.get(`minha-lista/${user.id}`, {
        headers: { Authorization: session.id },
      });
      setUserList(data);
    } catch (err) {
      console.error('Erro ao pegar lista de usuário.');
    }
  }

  function manageCheckBoxDeleteSelectedItems(event) {
    const { checked, id } = event.target;
    if (checked && selectedItems.indexOf(id) === -1) {
      setSelectedItems((selectedItems) => [...selectedItems, id]);
      return;
    }
    const newArrSelectedItems = selectedItems.filter((item) => item !== id);
    setSelectedItems(newArrSelectedItems);
    return;
  }

  async function onDeleteSelectedItems() {
    setErrorMessage('');
    if (!selectedItems.length) {
      setErrorMessage('Nenhum titulo selecionado.');
      setshowFormMsg(true);
      return;
    }

    try {
      setLoadingFilters(true);
      await axiosBaseUrlUser.delete(
        `/minha-lista/${user.id}?ids=${selectedItems.join(',')}`,
        { headers: { Authorization: session.id } }
      );
      getUserList();
      setSelectedItems([]);
    } catch (err) {
      setErrorMessage('Erro ao excluir titulos selecionados.');
      setshowFormMsg(true);
    } finally {
      setTimeout(() => setLoadingFilters(false), 100);
    }
  }

  async function onDeleteAllItems(event) {
    setErrorMessage('');
    const { checked } = event.target.previousElementSibling;
    if (!checked) {
      setErrorMessage('Nada foi selecionado.');
      setshowFormMsg(true);
      return;
    }

    try {
      setLoadingFilters(true);
      await axiosBaseUrlUser.delete(`/minha-lista/${user.id}`, {
        headers: { Authorization: session.id },
      });
      getUserList();
      setSelectedItems([]);
    } catch (err) {
      setErrorMessage('Erro ao excluir todos os titulos.');
      setshowFormMsg(true);
    } finally {
      setTimeout(() => setLoadingFilters(false), 100);
    }
  }

  if (!isLogedIn) return <MyListNotLogedIn />;

  return userList && userList.length ? (
    <>
      {loadingFilters && <Loading colorTranparent />}
      {showFormMsg && <MessageForm errorMessage={errorMessage} />}
      <RemoveItemsListSelected showTitles={showTitles}>
        <div className="delete-all-items-list">
          <input type="checkbox" />
          <button
            type="button"
            className="delete-items"
            onClick={onDeleteAllItems}
          >
            Excluir todos titulos de minha lista
          </button>
        </div>
        <div className="delete-selected-items-list">
          <div>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="100%"
                viewBox="0 0 24 24"
                width="100%"
                fill="#FFFFFF"
              >
                <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
              </svg>
            </span>
            <span>Selecionar</span>
            <div>
              <fieldset>
                {userList.map((result, index) => (
                  <div
                    className="delete-checkbox-one-item-list"
                    title={myListTitles[index]}
                    key={result.id}
                  >
                    <label htmlFor={result.id}>{myListTitles[index]}</label>
                    <input
                      key={result.id}
                      type="checkbox"
                      id={result.id}
                      onChange={manageCheckBoxDeleteSelectedItems}
                    />
                  </div>
                ))}
              </fieldset>
            </div>
            <button onClick={() => setShowTitles(!showTitles)}></button>
          </div>
          <button className="delete-items" onClick={onDeleteSelectedItems}>
            Excluir titulos selecionados
          </button>
        </div>
      </RemoveItemsListSelected>
      <WatchListSection>
        <div className="my-list-container">
          {userList.map((result) =>
            result.midiaType !== 't' ? (
              <UserListMovie key={result.id} id={result.id} />
            ) : (
              <UserListSerie key={result.id} id={result.id} />
            )
          )}
        </div>
      </WatchListSection>
    </>
  ) : (
    <AddItensList>
      <img src={notSearch} alt="Nenhum resultado encontrado" />
      <h4>Nada por aqui.</h4>
      <h5>Você ainda não tem nenhum titulo em sua lista.</h5>
    </AddItensList>
  );
}

function MyListNotLogedIn(props) {
  return (
    <AddItensList>
      <h1>Você precisa fazer login</h1>
    </AddItensList>
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

  function removeLoadingSipnner(event) {
    const loadingSpinner = event.target.parentElement.querySelector(
      'img + .container-load'
    );
    return loadingSpinner.remove();
  }

  return (
    dataList && (
      <Link
        to={`/vertical/filmes/m/${clearLinkTitle(dataList.title)}/${
          dataList.id
        }`}
        reloadDocument
        title={dataList.title}
        className="my-list"
      >
        <div>
          <div className="movie-or-serie-my-list">Filme</div>
          <div className="img-my-list-item">
            <img
              onLoad={removeLoadingSipnner}
              onError={removeLoadingSipnner}
              src={`https://image.tmdb.org/t/p/w500${dataList.backdrop_path}`}
              alt={dataList.title}
            />
            <Loading borderRadiusZero zIndexFive colorMyListVertical />
          </div>
          <div className="my-list-details">
            <h4>{dataList.title}</h4>
            <div className="my-list-genre-release-date">
              <div className="genre">
                {dataList.genres
                  .slice(0, 2)
                  .map((genre) => genre.name)
                  .join(', ')}
              </div>
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

  function removeLoadingSipnner(event) {
    const loadingSpinner = event.target.parentElement.querySelector(
      'img + .container-load'
    );
    return loadingSpinner.remove();
  }

  return (
    dataList && (
      <Link
        to={`/vertical/series/t/${clearLinkTitle(dataList.name)}/${
          dataList.id
        }`}
        reloadDocument
        title={dataList.name}
        className="my-list"
      >
        <div>
          <div className="movie-or-serie-my-list">Serie</div>
          <div className="img-my-list-item">
            <img
              onLoad={removeLoadingSipnner}
              onError={removeLoadingSipnner}
              src={`https://image.tmdb.org/t/p/w500${dataList.backdrop_path}`}
              alt={dataList.name}
            />
            <Loading borderRadiusZero zIndexFive colorMyListVertical />
          </div>
          <div className="my-list-details">
            <h4>{dataList.name}</h4>
            <div className="my-list-genre-release-date">
              <div className="genre">
                {dataList.genres
                  .slice(0, 2)
                  .map((genre) => genre.name)
                  .join(', ')}
              </div>
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
