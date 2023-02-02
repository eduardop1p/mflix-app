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
import SearchHelp from '../../../../components/searchHelp';
import Main from './styled';

export default function Search() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [newSearchData, setNewSearchData] = useState([]);
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

  function clearSearchMidiaType(data) {
    const newMidiaType = {
      results: data.results.filter(
        (midia) => midia.media_type === 'tv' || midia.media_type === 'movie'
      ),
    };
    setNewSearchData(newMidiaType);
  }

  return searchValue ? (
    newSearchData.results.length ? (
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
    <Main>
      <div>
        <Helmet>
          <title>MFLIX - Pesquisar titulo</title>
        </Helmet>
        <SearchHelp namePlaceholder="Pesquisar titulo..." marginBottom />
        <IndexAllCatalog colorVertical />
      </div>
    </Main>
  );
}
