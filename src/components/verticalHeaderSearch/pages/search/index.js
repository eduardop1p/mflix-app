/* eslint-disable */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import SearchMovie from './searchMovie/index';
import SearchSerie from './searchSerie/index';
import NotSearchResult from './notSearchResult';
import axiosBaseUrlMultSearch from '../../../../services/axiosBaseUrlMultSearch';
import apiConfig from '../../../../config/apiConfig';

export default function Search() {
  const location = useLocation();

  const [newSearchData, setNewSearchData] = useState(null);

  useEffect(() => {
    const getSearchData = async () => {
      try {
        const { data } = await axiosBaseUrlMultSearch.get(
          `/multi?api_key=${apiConfig.apiKey}&language=${
            apiConfig.language
          }&query=${valueSearch()}`
        );
        clearSearchMidiaType(data);
      } catch {
        console.error('Erro ao obter dados de pesquisa');
      }
    };
    valueSearch() !== null && getSearchData();
  }, []);

  function clearSearchMidiaType(data) {
    const newMidiaType = {
      results: data.results.filter(
        (midia) => midia.media_type === 'tv' || midia.media_type === 'movie'
      ),
      total_pages: data.total_pages,
    };
    setNewSearchData(newMidiaType);
  }

  function valueSearch() {
    const searchParam = location.search;
    return new URLSearchParams(searchParam).get('search_query');
  }

  return (
    <>
      {newSearchData && newSearchData.total_pages !== 0 ? (
        <>
          <Helmet>
            <title>{`MFLIX - Resultados de pesquisa para: ${valueSearch()}`}</title>
          </Helmet>
          {newSearchData.results[0].media_type !== 'tv' && (
            <SearchMovie
              search={newSearchData}
              valueSearch={valueSearch().split(' ').at(0)}
            />
          )}
          {newSearchData.results[0].media_type !== 'movie' && (
            <SearchSerie
              search={newSearchData}
              valueSearch={valueSearch().split(' ').at(0)}
            />
          )}
        </>
      ) : (
        <>
          {newSearchData &&
            !newSearchData.total_pages &&
            valueSearch() !== null && <NotSearchResult value={valueSearch()} />}

          {!valueSearch() && !newSearchData && <NotSearchResult />}
        </>
      )}
    </>
  );
}
