/* eslint-disable */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { useMediaQuery } from 'react-responsive';

import * as actions from '../../../storeReactRedux/modules/loading/actions';
import axiosUserBaseUrl from '../../../services/axiosUserBaseUrl';
import axiosBaseUrlMovies from '../../../services/axiosBaseUrlMovies';
import axiosBaseUrlSeries from '../../../services/axiosBaseUrlSeries';
import clearLinkTitle from '../../../config/clearLinkTitleConfig';
import Loading from '../../../components/loadingReactStates/index';
import MessageForm from '../../../components/messageForm';
import apiConfig from '../../../config/apiConfig';
import notSearch from '../../../assets/images/search.png';
import removeLoadingSipnner from '../../../config/loadingSpinnerConfig';
import {
  RemoveItemsListSelected,
  WatchListSection,
  AddItensList,
} from './styled';

export default function WatchList(props) {
  const { colorMyListVertical } = props;

  const breakPoint440 = useMediaQuery({ maxWidth: 440 });

  const dispatch = useDispatch();
  const { user, isLogedIn } = useSelector((state) => state.auth);

  const [loadingFilters, setLoadingFilters] = useState(false);
  const [showTitles, setShowTitles] = useState(false);
  const [userList, setUserList] = useState([]);
  const [myListTitles, setMyListTitles] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showFormMsg, setshowFormMsg] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender && (userList.length || !isLogedIn)) {
      setIsInitialRender(false);
      setTimeout(() => dispatch(actions.loadingFailure()), 500);
    }
  }, [isInitialRender, userList]);

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    if (isLogedIn) {
      const myList = Array.from(document.querySelectorAll('.my-list'));

      if (myList.length !== myListTitles.length) {
        setMyListTitles(myList.map((item) => item.title));
      }
    }
  });

  async function getUserList() {
    if (!isLogedIn) {
      return;
    }

    try {
      const { data } = await axiosUserBaseUrl.get(`minha-lista/${user.id}`);
      if (!data.length)
        return setTimeout(() => dispatch(actions.loadingFailure()), 500);
      setUserList(data);
    } catch (err) {
      if (get(err, 'response.data', false)) {
        const { data } = err.response;
        data.errors.map((err) => setErrorMessage(err));
        setshowFormMsg(true);
        console.clear();
        return;
      }
      setErrorMessage('Erro desconhecido contate o administrador do sistema.');
      setshowFormMsg(true);
      console.clear();
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
    if (!selectedItems.length) {
      setErrorMessage('Nenhum titulo selecionado.');
      setshowFormMsg(true);
      return;
    }

    try {
      setLoadingFilters(true);
      await axiosUserBaseUrl.delete(
        `/minha-lista/${user.id}?ids=${selectedItems.join(',')}`
      );
      getUserList();
      setSelectedItems([]);
      setSuccessMessage('Titulos excluidos com sucesso.');
      setshowFormMsg(true);
    } catch (err) {
      setErrorMessage('Erro ao excluir titulos.');
      setshowFormMsg(true);
    } finally {
      setTimeout(() => setLoadingFilters(false), 100);
    }
  }

  async function onDeleteAllItems(event) {
    const { checked } = event.target.previousElementSibling;
    if (!checked) {
      setErrorMessage('Nada foi selecionado.');
      setshowFormMsg(true);
      return;
    }

    try {
      setLoadingFilters(true);
      await axiosUserBaseUrl.delete(`/minha-lista/${user.id}`);
      getUserList();
      setSelectedItems([]);
      setSuccessMessage('Todos os titulos foi excluidos com sucesso.');
      setshowFormMsg(true);
    } catch (err) {
      setErrorMessage('Erro ao excluir todos os titulos.');
      setshowFormMsg(true);
    } finally {
      setTimeout(() => setLoadingFilters(false), 100);
    }
  }

  function getNumberFromStringId(value) {
    value = String(value).replace(/[^0-9]/g, '');
    return Number(value);
  }

  if (!isLogedIn) return <MyListNotLogedIn />;

  return userList.length ? (
    <>
      {loadingFilters && <Loading colorTranparent />}
      {showFormMsg && (
        <MessageForm
          onClose={setshowFormMsg}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      )}
      <RemoveItemsListSelected showTitles={showTitles}>
        <div className="delete-all-items-list">
          <input type="checkbox" />
          <button
            type="button"
            className="delete-items"
            onClick={onDeleteAllItems}
          >
            Excluir todos
          </button>
        </div>
        {!breakPoint440 ? (
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
              Excluir
            </button>
          </div>
        ) : (
          <div className="mobile-delete-selected-items-list">
            <div
              onClick={() => setShowTitles(!showTitles)}
              style={{ width: '25px', height: '25px' }}
              className="mobile-d-s-i-l-down"
            >
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
            </div>
            <button className="delete-items" onClick={onDeleteSelectedItems}>
              Excluir
            </button>
            {showTitles && (
              <div className="mobile-menu-delete-items">
                <fieldset>
                  {userList.map((result, index) => (
                    <div
                      className="delete-checkbox-one-item-list"
                      title={myListTitles[index]}
                      key={result.id}
                    >
                      <label htmlFor={result.id}>{myListTitles[index]}</label>
                      <input
                        type="checkbox"
                        id={result.id}
                        onChange={manageCheckBoxDeleteSelectedItems}
                      />
                    </div>
                  ))}
                </fieldset>
              </div>
            )}
          </div>
        )}
      </RemoveItemsListSelected>
      <WatchListSection>
        <div className="my-list-container">
          {userList.map((result, index) =>
            result.midiaType === 'movie' ? (
              <UserListMovie
                key={result.id}
                id={getNumberFromStringId(result.id)}
                colorMyListVertical={colorMyListVertical}
              />
            ) : (
              <UserListSerie
                key={result.id}
                id={getNumberFromStringId(result.id)}
                colorMyListVertical={colorMyListVertical}
              />
            )
          )}
        </div>
      </WatchListSection>
    </>
  ) : (
    <AddItensList>
      <div>
        <img src={notSearch} alt="Nenhum resultado encontrado" />
        <h4>Nada por aqui.</h4>
        <h5>Você ainda não tem nenhum titulo em sua lista.</h5>
      </div>
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
  const { id, colorMyListVertical } = props;

  const [dataList, setDataList] = useState(null);

  useEffect(() => {
    const getDetailsId = async (id) => {
      try {
        const { data } = await axiosBaseUrlMovies.get(
          `/${id}?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        setDataList(data);
      } catch {
        console.error('Erro ao obter Id de Filme');
      }
    };
    getDetailsId(id);
  }, []);

  return (
    dataList && (
      <Link
        to={`/vertical/filmes/${clearLinkTitle(dataList.title)}/${dataList.id}`}
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
            <Loading
              borderRadiusZero
              zIndexFive
              colorMyListVertical={colorMyListVertical}
            />
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
  const { id, colorMyListVertical } = props;

  const [dataList, setDataList] = useState(null);

  useEffect(() => {
    const getDetailsId = async (id) => {
      try {
        const { data } = await axiosBaseUrlSeries.get(
          `/${id}?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        setDataList(data);
      } catch {
        console.error('Erro ao obter Id de Serie');
      }
    };
    getDetailsId(id);
  }, []);

  return (
    dataList && (
      <Link
        to={`/vertical/series/${clearLinkTitle(dataList.name)}/${dataList.id}`}
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
            <Loading
              borderRadiusZero
              zIndexFive
              colorMyListVertical={colorMyListVertical}
            />
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
