import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { useMediaQuery } from 'react-responsive';

import * as actions from '../../../storeReactRedux/modules/firstBackground/actions';
import apiConfig from '../../../config/apiConfig';
import axiosBaseUrlMoviesDiscover from '../../../services/axiosBaseUrlDetailsFilters';
import axiosBaseUrlSeriesDiscover from '../../../services/axiosBaseUrlSeriesDiscover';
import axiosBaseUrlMultSearch from '../../../services/axiosBaseUrlMultSearch';
import clearLinkTitle from '../../../config/clearLinkTitleConfig';
import RatingSystem from '../../../components/ratingSystem/index';
import Loading from '../../../components/loadingReactStates/index';
import imageErrorTop3 from '../../../assets/images/czx7z2e6uqg81.jpg';
import NoResultFilters from '../../../components/noResultFilters';
import newArrIndex from '../../../config/newArrIndexConfig';
import removeLoadingSipnner from '../../../config/loadingSpinnerConfig';
import { color1 } from '../../../colors';
import {
  CatalogContainer,
  CatalogTitles,
  PagenationContainer,
} from '../../styled';

/* eslint-disable */
export default function AllCatalog() {
  const dispatch = useDispatch();

  const [all, setAll] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [searchFilterValue, setSearchFilterValue] = useState('');
  const [searchFilterActived, setSearchFilterActived] = useState(false);
  const [currentPageGlobal, setCurrentPageGlobal] = useState(0);
  const [releaseDateActived, setReleaseDateActived] = useState(false);
  const [buttonFiltersActived, setButtonFiltersActived] = useState(false);
  const [years, setYears] = useState([]);
  const [releaseDate, setReleaseDate] = useState('Ano');

  const breakPoint360 = useMediaQuery({ maxWidth: 360 });

  useEffect(() => {
    getAllCatalog(currentPageGlobal);
    releaseDateFunc();
  }, []);

  useEffect(() => {
    if (buttonFiltersActived) {
      getAllFilters();
      setButtonFiltersActived(false);
    }
  }, [releaseDate, buttonFiltersActived]);

  async function getAllCatalog(currentPage) {
    try {
      const axiosData1 = await axiosBaseUrlMoviesDiscover.get(
        `?sort_by=popularity.desc&with_genres=16&api_key=${
          apiConfig.apiKey
        }&language=${apiConfig.language}&page=${currentPage + 1}`
      );
      const data1 = axiosData1.data;
      try {
        const axiosData2 = await axiosBaseUrlSeriesDiscover.get(
          `?sort_by=popularity.desc&with_genres=16&api_key=${
            apiConfig.apiKey
          }&language=${apiConfig.language}&page=${currentPage + 1}`
        );
        const data2 = axiosData2.data;
        randomArrMovieSeries(data1, data2);
      } catch {
        console.error('Erro ao pegar todas as series.');
      }
    } catch {
      console.error('Erro ao pegar todos os filmes.');
    }
  }

  function randomArrMovieSeries(allMoviesArr, allSeriesArr) {
    const newArr = [...allMoviesArr.results, ...allSeriesArr.results];
    const randomArrMovieSeriesPopular = { results: [] };

    newArrIndex.forEach((valueIndex) => {
      randomArrMovieSeriesPopular.results.push(newArr[valueIndex]);
    });

    if (!all.length)
      getImages(randomArrMovieSeriesPopular.results[0].backdrop_path);

    setAll(randomArrMovieSeriesPopular.results);
    setPageCount(
      Number((allMoviesArr.total_pages + allSeriesArr.total_pages) / 2) >= 500
        ? 500
        : Number((allMoviesArr.total_pages + allSeriesArr.total_pages) / 2)
    );
  }

  function getImages(background) {
    dispatch(actions.firstBackgroundSuccess({ background }));
  }

  function handlePagenationClick(event) {
    const currentPage = event.selected;
    setCurrentPageGlobal(currentPage);

    if (searchFilterActived) {
      return handleSearchSubmit(null, currentPage);
    }
    getAllFilters(currentPage);
    return;
  }

  async function handleSearchSubmit(event, currentPage) {
    if (event) event.preventDefault();
    if (!searchFilterValue) return;
    if (!currentPage) setCurrentPageGlobal(0);

    try {
      setLoadingFilters(true);
      const { data } = await axiosBaseUrlMultSearch.get(
        `/multi?api_key=${apiConfig.apiKey}&language=${
          apiConfig.language
        }&page=${!currentPage ? 1 : currentPage + 1}&query=${searchFilterValue}`
      );
      const newArrDataWithGenre16 = {
        results: data.results.filter(
          (result) => result.genre_ids && result.genre_ids.indexOf(16) !== -1
        ),
      };
      setAll(newArrDataWithGenre16.results);
      setPageCount(
        newArrDataWithGenre16.results.length === 20
          ? data.total_pages
          : newArrDataWithGenre16.results.length > 0
          ? 1
          : null
      );
      setSearchFilterActived(true);
      setReleaseDate('Ano');
    } catch {
      console.error('Erro ao pesquisar titulo.');
    } finally {
      setTimeout(() => setLoadingFilters(false), 100);
    }
  }

  async function getAllFilters(currentPage) {
    if (!currentPage) setCurrentPageGlobal(0);
    if (searchFilterActived) {
      setSearchFilterActived(false);
      setSearchFilterValue('');
    }

    try {
      setLoadingFilters(true);
      const axiosData1 = await axiosBaseUrlMoviesDiscover.get(
        `?api_key=${apiConfig.apiKey}&page=${
          !currentPage ? 1 : currentPage + 1
        }&language=${
          apiConfig.language
        }&with_genres=16&primary_release_year=${releaseDate}`
      );
      const data1 = axiosData1.data;
      try {
        const axiosData2 = await axiosBaseUrlSeriesDiscover.get(
          `?api_key=${apiConfig.apiKey}&page=${
            !currentPage ? 1 : currentPage + 1
          }&language=${
            apiConfig.language
          }&with_genres=16&first_air_date_year=${releaseDate}`
        );
        const data2 = axiosData2.data;
        randomArrMovieSeries(data1, data2);
        setSearchFilterActived(false);
        setSearchFilterValue('');
      } catch {
        console.error('Erro ao pegar series por filtros.');
      }
    } catch {
      console.error('Erro ao pegar filmes por filtros.');
    } finally {
      setTimeout(() => setLoadingFilters(false), 100);
    }
  }

  function releaseDateFunc() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 1990; i <= currentYear; i++) years.unshift(i);
    setYears(years);
  }

  function yearOrGenreActive(event) {
    if (event.target.innerText === releaseDate) return;

    setReleaseDate(event.target.innerText);
    setButtonFiltersActived(true);
    return;
  }

  return (
    <CatalogContainer releaseDateActived={releaseDateActived} cartoons>
      <h1>Catalogo</h1>
      <div className="catalog-filter">
        <div className="year">
          <span>{releaseDate}</span>
          <div className="releaseDate">
            <ul>
              {years.map((year) => (
                <li
                  key={year.toString()}
                  data-li-active={year == releaseDate ? true : false}
                  onClick={(event) => yearOrGenreActive(event)}
                >
                  {year}
                </li>
              ))}
            </ul>
          </div>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 24 24"
              width="20px"
              fill="#FFFFFF"
            >
              <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
            </svg>
          </span>
          <button
            onClick={() => setReleaseDateActived(!releaseDateActived)}
          ></button>
        </div>

        <div className="search-filter">
          <div>
            <svg
              onClick={handleSearchSubmit}
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 24 24"
              width="20px"
              fill="#fff"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <form onSubmit={handleSearchSubmit}>
              <input
                value={searchFilterValue}
                onChange={(event) => setSearchFilterValue(event.target.value)}
                id="search-filters"
                placeholder="Pesquisar animação..."
              />
            </form>
          </div>
        </div>
      </div>

      <CatalogTitles>
        {loadingFilters && <Loading colorTranparent />}
        {all.length ? (
          all.map(
            (result) =>
              result !== undefined && (
                <Link
                  key={result.id}
                  to={`/vertical/${
                    result.title ? 'filmes' : 'series'
                  }/${clearLinkTitle(
                    result.title ? result.title : result.name
                  )}/${result.id}`}
                  reloadDocument
                >
                  <div className="catalog-img">
                    <div className="movie-or-serie-catalog">
                      {result.title ? 'Filme' : 'Serie'}
                    </div>
                    <img
                      src={
                        result.poster_path
                          ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                          : imageErrorTop3
                      }
                      onLoad={removeLoadingSipnner}
                      onError={removeLoadingSipnner}
                      alt={result.title ? result.title : result.name}
                    />
                    <Loading />

                    <div className="box-shadow-catalog"></div>
                    <div className="catalog-details">
                      <h5>{result.title ? result.title : result.name}</h5>
                      <div className="catalog-rating-data">
                        <div>
                          <RatingSystem
                            vote_average={result.vote_average}
                            color={color1}
                          />
                        </div>
                        <div>
                          {result.release_date &&
                            result.release_date.slice(0, 4)}
                          {result.first_air_date &&
                            result.first_air_date.slice(0, 4)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
          )
        ) : (
          <NoResultFilters />
        )}
      </CatalogTitles>
      <PagenationContainer>
        <ReactPaginate
          breakLabel="..."
          pageRangeDisplayed={breakPoint360 ? 2 : 3}
          marginPagesDisplayed={1}
          forcePage={currentPageGlobal}
          onPageChange={handlePagenationClick}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
        />
      </PagenationContainer>
    </CatalogContainer>
  );
}
