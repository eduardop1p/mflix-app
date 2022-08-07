import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

/* eslint-disable */
import * as actions from '../../../../../storeReactRedux/modules/loading/actions';
import MoviesAllCatalog from '../../../../../pages/index/moviesAllCatalog/index';
import { Main } from './styled';

export default function NotSearchResult(porps) {
  const { value } = porps;

  const dispatch = useDispatch();
  const loadAllCatalog = useSelector(
    (state) => state.firstBackgroundMovie.loadAllCatalog
  );

  const [verticalSearchValue, setVerticalSearchValue] = useState('');

  useEffect(() => {
    loadAllCatalog &&
      setTimeout(() => {
        dispatch(actions.loadingFailure());
      }, 500);
  }, [loadAllCatalog]);

  function setVerticalSearch(event) {
    if (!verticalSearchValue) {
      return event.preventDefault();
    }
    return event;
  }

  return (
    <Main>
      {value ? (
        <div className="search">
          <Helmet>
            <title>MFLIX - Nenhum resultado encontrado para: {value}</title>
          </Helmet>
          <h1>Nenhum resultado encontrado para: {value}</h1>
          <div className="vertical-search-popular">
            <form onSubmit={setVerticalSearch} action="/vertical/search">
              <button type="submit">
                <svg
                  xmlns="http:www.w3.org/2000/svg"
                  height="18px"
                  width="18px"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Nova pesquisa..."
                name="search_query"
                value={verticalSearchValue}
                onChange={(event) => setVerticalSearchValue(event.target.value)}
              />
            </form>
          </div>
        </div>
      ) : (
        <div className="search">
          <Helmet>
            <title>MFLIX - Pesquisar titulo</title>
          </Helmet>
          <div className="vertical-search-popular">
            <form onSubmit={setVerticalSearch} action="/vertical/search">
              <button type="submit">
                <svg
                  xmlns="http:www.w3.org/2000/svg"
                  height="18px"
                  width="18px"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Pesquisar titulo..."
                name="search_query"
                value={verticalSearchValue}
                onChange={(event) => setVerticalSearchValue(event.target.value)}
              />
            </form>
          </div>
        </div>
      )}
      <MoviesAllCatalog />
    </Main>
  );
}
