import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { useMediaQuery } from 'react-responsive';

/* eslint-disable */

import * as actions from '../../../storeReactRedux/modules/firstBackground/actions';
import apiConfig from '../../../config/apiConfig';
import axiosBaseUrlGenres from '../../../services/axiosBaseUrlGenres';
import axiosFilters from '../../../services/axiosBaseUrlDetailsFilters';
import axiosBaseUrlMovies from '../../../services/axiosBaseUrlMovies';
import axiosBaseUrlFilters from '../../../services/axiosBaseUrlFilters';
import clearLinkTitle from '../../../config/clearLinkTitleConfig';
import RatingSystem from '../../../components/ratingSystem/index';
import imageErrorTop3 from '../../../assets/images/czx7z2e6uqg81.jpg';
import Loading from '../../../components/loadingReactStates/index';
import NoResultFilters from '../../../components/noResultFilters';
import removeLoadingSipnner from '../../../config/loadingSpinnerConfig';
import { color1 } from '../../../colors';
import {
  CatalogContainer,
  CatalogTitles,
  PagenationContainer,
} from '../../styled';

export default function AllCatalog() {
  const dispatch = useDispatch();

  dispatch(actions.firstBackgroundSuccess({ background: true }));

  return;

  const breakPoint360 = useMediaQuery({ maxWidth: 360 });
  const breakPoint570 = useMediaQuery({ maxWidth: 570 });

  const [all, setAll] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [searchFilterValue, setSearchFilterValue] = useState('');
  const [searchFilterActived, setSearchFilterActived] = useState(false);
  const [currentPageGlobal, setCurrentPageGlobal] = useState(0);
  const [genreActived, setGenreActived] = useState(false);
  const [releaseDateActived, setReleaseDateActived] = useState(false);
  const [allGenres, setAllGenres] = useState(null);
  const [years, setYears] = useState([]);
  const [releaseDate, setReleaseDate] = useState('Ano');
  const [genreId, setGenreId] = useState(null);
  const [genreName, setGenreName] = useState('Gênero');

  useEffect(() => {
    getAllCatalog(currentPageGlobal);

    const getAllGenresFilters = async () => {
      try {
        const { data } = await axiosBaseUrlGenres.get(
          `/list?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        setAllGenres(data);
      } catch {
        console.error('Erro ao pegar gêneros');
      }
    };
    getAllGenresFilters();
    releaseDateFunc();
  }, []);

  async function getAllCatalog(currentPage) {
    try {
      const { data } = await axiosBaseUrlMovies.get(
        `/popular?api_key=${apiConfig.apiKey}&language=${
          apiConfig.language
        }&page=${currentPage + 1}`
      );
      if (!all.length) getImages(data.results);
      setAll(data.results);
      setPageCount(500);
    } catch (err) {
      console.error('Erro ao pegar todos os filmes.');
    }
  }

  function getImages(all) {
    dispatch(
      actions.firstBackgroundSuccess({ background: all[0].backdrop_path })
    );
  }

  async function handlePagenationClick(event) {
    const currentPage = event.selected;
    setCurrentPageGlobal(currentPage);

    if (searchFilterActived) {
      handleSearchSubmit(null, currentPage);
      return;
    }

    getAllFilters(null, currentPage);
    return;
  }

  async function handleSearchSubmit(event, currentPage) {
    if (event) event.preventDefault();
    if (!searchFilterValue) return;
    if (!currentPage) setCurrentPageGlobal(0);

    try {
      setLoadingFilters(true);
      const { data } = await axiosBaseUrlFilters.get(
        `?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=${
          !currentPage ? 1 : currentPage + 1
        }&query=${searchFilterValue}`
      );
      setAll(data.results);
      setPageCount(data.total_pages >= 500 ? 500 : data.total_pages);
      setSearchFilterActived(true);
      setGenreName('Gênero');
      setGenreId(null);
      setReleaseDate('Ano');
    } catch {
      console.error('Erro ao pesquisar filme.');
    } finally {
      setTimeout(() => setLoadingFilters(false), 100);
    }
  }

  async function getAllFilters(event, currentPage) {
    if (event) event.preventDefault();
    if (!currentPage) setCurrentPageGlobal(0);
    if (searchFilterActived) {
      setSearchFilterActived(false);
      setSearchFilterValue('');
    }

    try {
      setLoadingFilters(true);
      const { data } = await axiosFilters.get(
        `?api_key=${apiConfig.apiKey}&page=${
          !currentPage ? 1 : currentPage + 1
        }&language=${
          apiConfig.language
        }&with_genres=${genreId}&primary_release_year=${releaseDate}`
      );
      console.log(
        `?api_key=${apiConfig.apiKey}&page=${
          !currentPage ? 1 : currentPage + 1
        }&language=${
          apiConfig.language
        }&with_genres=${genreId}&primary_release_year=${releaseDate}`
      );
      setAll(data.results);
      setPageCount(data.total_pages >= 500 ? 500 : data.total_pages);
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

    event.target.parentElement
      .querySelectorAll('li')
      .forEach((li) => li.removeAttribute('data-active'));

    event.target.setAttribute('data-active', '');

    if (active === 'year') {
      setReleaseDate(event.target.innerText);
    }
    if (active === 'genre') {
      setGenreId(event.target.getAttribute('data-genre-id'));
      setGenreName(event.target.innerText);
    }

    getAllFilters();
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
            setReleaseDateActived={setReleaseDateActived}
            setGenreActived={setGenreActived}
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
              setReleaseDateActived={setReleaseDateActived}
              setGenreActived={setGenreActived}
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
            setReleaseDateActived={setReleaseDateActived}
            setGenreActived={setGenreActived}
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
                placeholder="Pesquisar filme..."
              />
            </form>
          </div>
        </div>
      </div>

      <CatalogTitles>
        {loadingFilters && <Loading colorTranparent />}
        {all.length ? (
          all.map((result) => (
            <Link
              reloadDocument
              key={result.id}
              to={`/vertical/filmes/${clearLinkTitle(result.title)}/${
                result.id
              }`}
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
                  alt={result.title}
                />
                <Loading />

                <div className="box-shadow-catalog"></div>
                <div className="catalog-details">
                  <h5>{result.title}</h5>
                  <div className="catalog-rating-data">
                    <div>
                      <RatingSystem
                        vote_average={result.vote_average}
                        color={color1}
                      />
                    </div>
                    <div>
                      {result.release_date
                        ? result.release_date.slice(0, 4)
                        : 'Not Data'}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
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
        <div className="genres">
          <ul>
            {allGenres &&
              allGenres.genres.map((genre) => (
                <li
                  key={genre.id}
                  data-genre-id={genre.id}
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
