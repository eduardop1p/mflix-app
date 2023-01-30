import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { useMediaQuery } from 'react-responsive';
/* eslint-disable */

import * as actions from '../../../storeReactRedux/modules/firstBackground/actions';
import apiConfig from '../../../config/apiConfig';
import axiosBaseUrlGenres from '../../../services/axiosBaseUrlGenres';
import axiosBaseUrlMoviesDiscover from '../../../services/axiosBaseUrlDetailsFilters';
import axiosBaseUrlSeriesDiscover from '../../../services/axiosBaseUrlSeriesDiscover';
import axiosBaseUrlMovies from '../../../services/axiosBaseUrlMovies';
import axiosBaseUrlMultSearch from '../../../services/axiosBaseUrlMultSearch';
import axiosBaseUrlSeries from '../../../services/axiosBaseUrlSeries';
import axiosBaseUrlGenresSeries from '../../../services/axiosBaseUrlGenresSeries';
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

export default function AllCatalog(props) {
  const { colorVertical } = props;

  const dispatch = useDispatch();

  const [all, setAll] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [searchFilterValue, setSearchFilterValue] = useState('');
  const [searchFilterActived, setSearchFilterActived] = useState(false);
  const [currentPageGlobal, setCurrentPageGlobal] = useState(0);
  const [genreActived, setGenreActived] = useState(false);
  const [releaseDateActived, setReleaseDateActived] = useState(false);
  const [allGenres, setAllGenres] = useState(null);
  const [buttonFiltersActived, setButtonFiltersActived] = useState(false);
  const [years, setYears] = useState([]);
  const [releaseDate, setReleaseDate] = useState('Ano');
  const [genreId, setGenreId] = useState(null);
  const [genreName, setGenreName] = useState('Gênero');

  const breakPoint360 = useMediaQuery({ maxWidth: 360 });
  const breakPoint570 = useMediaQuery({ maxWidth: 570 });

  useEffect(() => {
    getAllCatalog(currentPageGlobal);

    const getAllGenresFilters = async () => {
      try {
        const axiosData1 = await axiosBaseUrlGenres.get(
          `/list?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        const data1 = axiosData1.data;
        try {
          const axiosData2 = await axiosBaseUrlGenresSeries.get(
            `/list?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
          );
          const data2 = axiosData2.data;
          concatGenresAndClear(data1, data2);
        } catch {
          console.error('Erro ao pegar gêneros');
        }
      } catch {
        console.error('Erro ao pegar gêneros');
      }
    };
    getAllGenresFilters();
    releaseDateFunc();
  }, []);

  useEffect(() => {
    if (buttonFiltersActived) {
      getAllFilters();
      setButtonFiltersActived(false);
    }
  }, [genreId, genreName, releaseDate, buttonFiltersActived]);

  function concatGenresAndClear(allGenresMovies, allGenresSeries) {
    const newArrGenres = [];
    allGenresMovies.genres
      .concat(allGenresSeries.genres)
      .forEach((valueObj1) => {
        newArrGenres
          .map((valueObj2) => valueObj2.name)
          .indexOf(valueObj1.name) === -1 && newArrGenres.push(valueObj1);
      });

    setAllGenres(newArrGenres);
  }

  async function getAllCatalog(currentPage) {
    try {
      const axiosData1 = await axiosBaseUrlMovies.get(
        `/popular?api_key=${apiConfig.apiKey}&language=${
          apiConfig.language
        }&page=${currentPage + 1}`
      );
      const data1 = axiosData1.data;
      try {
        const axiosData2 = await axiosBaseUrlSeries.get(
          `/popular?api_key=${apiConfig.apiKey}&language=${
            apiConfig.language
          }&page=${currentPage + 1}`
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
      setAll(
        data.results.filter(
          (midia) => midia.media_type === 'tv' || midia.media_type === 'movie'
        )
      );
      setPageCount(data.total_pages >= 500 ? 500 : data.total_pages);
      setSearchFilterActived(true);
      setGenreName('Gênero');
      setGenreId(null);
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
        }&with_genres=${genreId}&primary_release_year=${releaseDate}`
      );
      const data1 = axiosData1.data;
      try {
        const axiosData2 = await axiosBaseUrlSeriesDiscover.get(
          `?api_key=${apiConfig.apiKey}&page=${
            !currentPage ? 1 : currentPage + 1
          }&language=${
            apiConfig.language
          }&with_genres=${genreId}&first_air_date_year=${releaseDate}`
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

  function yearOrGenreActive(active, event) {
    if (
      event.target.innerText === releaseDate ||
      event.target.innerText === genreName
    )
      return;

    if (active === 'year') {
      setReleaseDate(event.target.innerText);
    }
    if (active === 'genre') {
      setGenreId(event.target.getAttribute('data-genre-id'));
      setGenreName(event.target.innerText);
    }

    setButtonFiltersActived(true);
    return;
  }

  return (
    <CatalogContainer
      genreActived={genreActived}
      releaseDateActived={releaseDateActived}
    >
      <h1>Catalogo</h1>

      <div className="catalog-filter">
        {!breakPoint570 ? (
          <AllCatalogMobile
            yearOrGenreActive={yearOrGenreActive}
            setGenreActived={setGenreActived}
            setReleaseDateActived={setReleaseDateActived}
            releaseDate={releaseDate}
            releaseDateActived={releaseDateActived}
            years={years}
            genreName={genreName}
            allGenres={allGenres}
            genreActived={genreActived}
          />
        ) : !breakPoint360 ? (
          <div className="mobile-year-genre">
            <AllCatalogMobile
              yearOrGenreActive={yearOrGenreActive}
              setGenreActived={setGenreActived}
              setReleaseDateActived={setReleaseDateActived}
              releaseDate={releaseDate}
              releaseDateActived={releaseDateActived}
              years={years}
              genreName={genreName}
              allGenres={allGenres}
              genreActived={genreActived}
            />
          </div>
        ) : (
          <AllCatalogMobile
            yearOrGenreActive={yearOrGenreActive}
            setGenreActived={setGenreActived}
            setReleaseDateActived={setReleaseDateActived}
            releaseDate={releaseDate}
            releaseDateActived={releaseDateActived}
            years={years}
            genreName={genreName}
            allGenres={allGenres}
            genreActived={genreActived}
          />
        )}

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
                placeholder="Pesquisar titulo..."
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
                  reloadDocument
                  key={result.id}
                  to={`/vertical/${
                    result.title ? 'filmes' : 'series'
                  }/${clearLinkTitle(
                    result.title ? result.title : result.name
                  )}/${result.id}`}
                >
                  <div className="catalog-img">
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
                    <Loading colorVertical={colorVertical} />
                    <div className="box-shadow-catalog"></div>
                    <div className="movie-or-serie-catalog">
                      {result.title ? 'Filme' : 'Serie'}
                    </div>
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

function AllCatalogMobile(props) {
  const {
    yearOrGenreActive,
    setReleaseDateActived,
    setGenreActived,
    releaseDate,
    releaseDateActived,
    years,
    genreName,
    allGenres,
    genreActived,
  } = props;

  return (
    <>
      <div className="year">
        <span>{releaseDate}</span>
        <div className="releaseDate">
          <ul>
            {years.map((year) => (
              <li
                key={year.toString()}
                data-li-active={year == releaseDate ? true : false}
                onClick={(event) => yearOrGenreActive('year', event)}
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
      <div className="genre">
        <span>{genreName}</span>
        <div className="genres ">
          <ul>
            {allGenres &&
              allGenres.map((genre) => (
                <li
                  key={genre.id}
                  data-genre-id={genre.id}
                  data-li-active={genre.name == genreName ? true : false}
                  onClick={(event) => yearOrGenreActive('genre', event)}
                >
                  {genre.name}
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
        <button onClick={() => setGenreActived(!genreActived)}></button>
      </div>
    </>
  );
}
