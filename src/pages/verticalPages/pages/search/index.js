/* eslint-disable */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import * as actions from '../../../../storeReactRedux/modules/loading/actions';
import SearchMovie from './searchMovie/index';
import SearchSerie from './searchSerie/index';
import NotSearchResult from './notSearchResult';
import IndexAllCatalog from '../../../../pages/index/allCatalog/index';
import axiosBaseUrlMultSearch from '../../../../services/axiosBaseUrlMultSearch';
import apiConfig from '../../../../config/apiConfig';
import { MainIndexSearch } from './styled';

export default function Search() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [newSearchData, setNewSearchData] = useState(null);
  const [searchValue, setsearchValue] = useState('');

  useEffect(() => {
    const getSearchData = async () => {
      const searchParam = location.search;
      const searchQueryValue = new URLSearchParams(searchParam).get(
        'search_query'
      );
      if (!searchQueryValue) {
        setTimeout(() => {
          dispatch(actions.loadingFailure());
        }, 500);
        return;
      }

      try {
        const { data } = await axiosBaseUrlMultSearch.get(
          `/multi?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&query=${searchQueryValue}`
        );
        setsearchValue(searchQueryValue);
        clearSearchMidiaType(data);
      } catch {
        console.error('Erro ao obter dados de pesquisa');
      }
    };
    getSearchData();
  }, []);

  function setVerticalSearch(event) {
    event.preventDefault();

    const searchQuery = event.target.querySelector('#search_query');
    if (!searchQuery.value) return;

    return event.target.submit();
  }

  function clearSearchMidiaType(data) {
    const newMidiaType = {
      results: data.results.filter(
        (midia) => midia.media_type === 'tv' || midia.media_type === 'movie'
      ),
      total_pages: data.total_pages,
    };
    setNewSearchData(newMidiaType);
  }

  return searchValue ? (
    newSearchData && newSearchData.total_pages ? (
      <>
        <Helmet>
          <title>{`MFLIX - Resultados de pesquisa para: ${searchValue}`}</title>
        </Helmet>
        {newSearchData.results[0].media_type === 'movie' ? (
          <SearchMovie
            search={newSearchData}
            midiaType="movie"
            searchValue={searchValue.split(' ').at(0)}
          />
        ) : (
          <SearchSerie
            search={newSearchData}
            midiaType="tv"
            searchValue={searchValue.split(' ').at(0)}
          />
        )}
      </>
    ) : (
      <NotSearchResult value={searchValue} />
    )
  ) : (
    <MainIndexSearch>
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
              id="search_query"
              type="text"
              placeholder="Pesquisar titulo..."
              name="search_query"
            />
          </form>
        </div>
        <IndexAllCatalog search colorVertical />
      </div>
    </MainIndexSearch>
  );
}
