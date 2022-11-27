/* eslint-disable */
import { useState, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, Outlet, useParams } from 'react-router-dom';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { isInt } from 'validator/validator';
import { Helmet } from 'react-helmet-async';

import * as actions from '../../../../storeReactRedux/modules/loading/actions';
import axiosBaseUrlMovies from '../../../../services/axiosBaseUrlMovies';
import axiosDetailsFilters from '../../../../services/axiosBaseUrlDetailsFilters';
import axiosBaseUrlGenres from '../../../../services/axiosBaseUrlGenres';
import axiosBaseUrlFilterActor from '../../../../services/axiosBaseUrlFilterActor';
import apiConfig from '../../../../config/apiConfig';
import clearLinkTitle from '../../../../config/clearLinkTitle';
import RatingSystem2 from '../../../../components/ratingSystem2/index';
import imageErrorTop3 from '../../../../assets/images/czx7z2e6uqg81.jpg';
import Loading from '../../../../components/loadingReactStates/index';
import LoadingActor from '../../../../components/loadingActor/index';
import LoadingScrollInfinit from '../../../../components/loadingActor/index';
import NoResultFilters from '../../../../components/noResultFilters/index';
import * as colors from '../../../../colors';
import { PagesContainer, Filters, New, Popular } from '../../styled';

export default function MovieV() {
  const { id } = useParams();

  const loadingApp = useSelector((state) => state.loading.loadingState);
  const dispatch = useDispatch();

  const [news, setNews] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [allPopular, setAllPopular] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [genresArrowActived, setGenresArrowActived] = useState(true);
  const [yearsArrowActived, setYearsArrowActived] = useState(true);
  const [actorArrowActived, setActorArrowActived] = useState(true);
  const [percentRange1, setPercentRange1] = useState(null);
  const [percentRange2, setPercentRange2] = useState(null);
  const [verticalSearchValue, setVerticalSearchValue] = useState('');
  const [allActors, setAllActors] = useState([]);
  const arrayYears = useRef([]);
  let controllerPopularScroll = useRef(true);
  let currentPagePopular = useRef(1);
  let currentYearsActorGenres = useRef(1);
  let currentPageActor = useRef(1);
  let finallyPagePopular = useRef(false);
  let finallyPageActor = useRef(false);
  let genresIdsCheckBox = useRef([]);
  let actorIdsCheckBox = useRef([]);
  let valueRange1 = useRef(2000);
  let valueRange2 = useRef(new Date().getFullYear());
  let minGap = useRef(1);

  useEffect(() => {
    const setAllGenresFilters = async () => {
      try {
        const { data } = await axiosBaseUrlGenres.get(
          `/list?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        setAllGenres(data.genres);
      } catch {
        console.error('Erro ao pegar gêneros');
      }
    };
    setNewsFunction();
    setPopularFunction(false);
    setRelaceDate();
    setAllActorsFunction();
    setAllGenresFilters();
  }, []); // componentDidMount() class metod

  useEffect(() => {
    if (
      allGenres.length &&
      news.length &&
      allPopular.length &&
      allActors.length &&
      !id &&
      loadingApp
    ) {
      setTimeout(() => {
        dispatch(actions.loadingFailure());
      }, 500);
    }
  }, [allGenres, news, allPopular, allActors, id, loadingApp]);

  async function setNewsFunction() {
    try {
      const { data } = await axiosBaseUrlMovies.get(
        `/now_playing?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
      );
      setNews(data.results);
    } catch {
      console.log('Erro ao carregar Novos Filmes.');
    }
  }

  async function setPopularFunction(infiniteScroll) {
    controllerPopularScroll.current = true;

    try {
      const { data } = await axiosBaseUrlMovies.get(
        `/popular?api_key=${apiConfig.apiKey}&language=${
          apiConfig.language
        }&page=${infiniteScroll ? (currentPagePopular.current += 1) : 1}`
      );
      if (!data.results.length) finallyPagePopular.current = true;
      if (infiniteScroll) {
        setAllPopular(allPopular.concat(data.results));
        return;
      }
      setAllPopular(data.results);
      return;
    } catch {
      console.error('Erro ao pegar filmes populares.');
    }
  }

  async function setAllActorsFunction(infiniteScroll) {
    try {
      const { data } = await axiosBaseUrlFilterActor.get(
        `/popular?api_key=${apiConfig.apiKey}&language=${
          apiConfig.language
        }&page=${infiniteScroll ? (currentPageActor.current += 1) : 1}`
      );
      if (!data.results.length) finallyPageActor.current = true;
      if (infiniteScroll) {
        setAllActors(allActors.concat(data.results));
        return;
      }
      setAllActors(data.results);
    } catch {
      console.error('Erro ao pegar actores.');
    }
  }

  function setVerticalSearch(event) {
    if (!verticalSearchValue) {
      return event.preventDefault();
    }
    return event;
  }

  function setCheckBoxFilters(event, name) {
    let id = Number(event.target.id);
    const { checked } = event.target;

    if (name === 'genre') {
      if (checked) {
        genresIdsCheckBox.current.push(id);
        setPopularFiltersFunction(false);
        return;
      }
      genresIdsCheckBox.current = genresIdsCheckBox.current.filter(
        (value) => value != id
      );
      setPopularFiltersFunction(false);

      return;
    }
    if (checked) {
      actorIdsCheckBox.current.push(id);
      setPopularFiltersFunction(false);
      return;
    }
    actorIdsCheckBox.current = actorIdsCheckBox.current.filter(
      (value) => value != id
    );
    setPopularFiltersFunction(false);

    return;
  }

  async function setPopularFiltersFunction(infiniteScroll) {
    const arrayPrimaryYears = arrayYears.current.slice(
      arrayYears.current.indexOf(valueRange1.current),
      arrayYears.current.indexOf(valueRange2.current) + 1
    );

    controllerPopularScroll.current = false;

    try {
      !infiniteScroll && setLoadingFilters(true);
      const { data } = await axiosDetailsFilters.get(
        `?sort_by=popularity.desc&with_genres=${genresIdsCheckBox.current.join(
          ','
        )}&primary_release_year=${arrayPrimaryYears.join(
          ','
        )}&with_people=${actorIdsCheckBox.current.join(',')}&api_key=${
          apiConfig.apiKey
        }&language=${apiConfig.language}&page=${
          infiniteScroll ? (currentYearsActorGenres.current += 1) : 1
        }`
      );
      if (!data.results.length) finallyPagePopular.current = true;
      if (infiniteScroll) {
        setAllPopular(allPopular.concat(data.results));
        return;
      }
      setAllPopular(data.results);
    } catch {
      console.error('Erro ao pegar filmes populares por filtros.');
    } finally {
      !infiniteScroll && setTimeout(() => setLoadingFilters(false), 100);
    }
  }

  function setRelaceDate() {
    const currentYear = new Date().getFullYear();
    for (let i = 1990; i <= currentYear; i++) arrayYears.current.push(i);
  }

  function setRange1(event) {
    valueRange1.current = Number(event.target.value);
    if (valueRange2.current - valueRange1.current <= minGap.current) {
      valueRange1.current = valueRange2.current - minGap.current;
    }
    arrayYears.current.indexOf(valueRange1.current) !== -1
      ? setPercentRange1(
          (100 / arrayYears.current.length) *
            arrayYears.current.indexOf(valueRange1.current)
        )
      : setPercentRange1(null);
  }

  function setRange2(event) {
    valueRange2.current = Number(event.target.value);
    if (valueRange2.current - valueRange1.current <= minGap.current) {
      valueRange2.current = valueRange1.current + minGap.current;
    }
    arrayYears.current.indexOf(valueRange2.current) !== -1
      ? setPercentRange2(
          (100 / arrayYears.current.length) *
            arrayYears.current.indexOf(valueRange2.current)
        )
      : setPercentRange2(null);
  }

  function removeLoadingSipnner(event) {
    const loadingSpinner = event.target.parentElement.querySelector(
      'img + .container-load'
    );
    if (!loadingSpinner) return;

    return loadingSpinner.remove();
  }

  SwiperCore.use(Autoplay);

  return id ? (
    <>
      <Outlet />
    </>
  ) : (
    <PagesContainer>
      <Helmet>
        <title>{'MFLIX - Filmes'}</title>
      </Helmet>
      <Filters
        genresArrowActived={genresArrowActived}
        yearsArrowActived={yearsArrowActived}
        actorArrowActived={actorArrowActived}
      >
        <div className="vertical genres">
          <div>
            <h5>Gêneros</h5>
            <span
              className="genre"
              onClick={() => setGenresArrowActived(!genresArrowActived)}
            >
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
          </div>
          <div>
            <fieldset>
              {allGenres.length &&
                allGenres.map((genre) => (
                  <div className="filter-name" key={genre.id}>
                    <input
                      id={genre.id}
                      type="checkbox"
                      onClick={(event) => setCheckBoxFilters(event, 'genre')}
                    />
                    <label htmlFor={genre.id}>{genre.name}</label>
                  </div>
                ))}
            </fieldset>
          </div>
        </div>
        <div className="vertical years">
          <div>
            <h5>Ano</h5>
            <div>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                  <path d="M9.958 15.021Q10.417 15.021 10.729 14.708Q11.042 14.396 11.042 13.938Q11.042 13.479 10.729 13.167Q10.417 12.854 9.958 12.854Q9.5 12.854 9.188 13.167Q8.875 13.479 8.875 13.938Q8.875 14.396 9.188 14.708Q9.5 15.021 9.958 15.021ZM9.167 11.771H10.792Q10.792 11.062 10.948 10.677Q11.104 10.292 11.833 9.583Q12.354 9.062 12.667 8.573Q12.979 8.083 12.979 7.396Q12.979 6.229 12.135 5.604Q11.292 4.979 10.104 4.979Q8.896 4.979 8.135 5.604Q7.375 6.229 7.083 7.125L8.542 7.708Q8.646 7.354 8.979 6.906Q9.312 6.458 10.062 6.458Q10.708 6.458 11.042 6.802Q11.375 7.146 11.375 7.562Q11.375 7.958 11.115 8.333Q10.854 8.708 10.5 9Q9.562 9.812 9.365 10.229Q9.167 10.646 9.167 11.771ZM10 18.333Q8.292 18.333 6.771 17.677Q5.25 17.021 4.115 15.896Q2.979 14.771 2.323 13.25Q1.667 11.729 1.667 10Q1.667 8.271 2.323 6.75Q2.979 5.229 4.115 4.104Q5.25 2.979 6.771 2.323Q8.292 1.667 10 1.667Q11.75 1.667 13.271 2.323Q14.792 2.979 15.917 4.104Q17.042 5.229 17.688 6.75Q18.333 8.271 18.333 10Q18.333 11.729 17.688 13.25Q17.042 14.771 15.917 15.896Q14.792 17.021 13.271 17.677Q11.75 18.333 10 18.333ZM10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10ZM10 16.583Q12.771 16.583 14.677 14.656Q16.583 12.729 16.583 10Q16.583 7.271 14.677 5.344Q12.771 3.417 10 3.417Q7.292 3.417 5.354 5.344Q3.417 7.271 3.417 10Q3.417 12.729 5.354 14.656Q7.292 16.583 10 16.583Z" />
                </svg>

                <div className="duvidas-years">
                  O filtro "Ano" não tem efeito no catalogo "Novos filmes".
                </div>
              </span>
              <span
                className="years"
                onClick={() => setYearsArrowActived(!yearsArrowActived)}
              >
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
            </div>
          </div>
          <div>
            <div className="wrapper-input-range">
              <div className="container-input-range">
                <div
                  className="range-slider-track"
                  style={{
                    background: `linear-gradient(
                to right,
                ${colors.color5} ${
                      percentRange1 !== null
                        ? percentRange1
                        : (100 / arrayYears.current.length) * 10
                    }%,
                ${colors.color2} ${
                      percentRange1 !== null
                        ? percentRange1
                        : (100 / arrayYears.current.length) * 10
                    }%,
                ${colors.color2} ${
                      !percentRange2
                        ? (100 / arrayYears.current.length) *
                          arrayYears.current.length
                        : percentRange2
                    }%,
                    ${colors.color5} ${
                      !percentRange2
                        ? (100 / arrayYears.current.length) *
                          arrayYears.current.length
                        : percentRange2
                    }%
              )`,
                  }}
                ></div>
                <input
                  type="range"
                  value={valueRange1.current}
                  min="1990"
                  max={new Date().getFullYear()}
                  onChange={setRange1}
                  onMouseUp={() => {
                    setPopularFiltersFunction(false);
                  }}
                  id="range-1"
                />
                <input
                  type="range"
                  value={valueRange2.current}
                  min="1990"
                  max={new Date().getFullYear()}
                  onChange={setRange2}
                  onMouseUp={(event) => {
                    setPopularFiltersFunction(false);
                  }}
                  id="range-2"
                />
              </div>
              <div className="value-range-visibles">
                <span>{valueRange1.current}</span>
                <span>{valueRange2.current}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="vertical actor">
          <div>
            <h5>Ator</h5>
            <span
              className="actor"
              onClick={() => setActorArrowActived(!actorArrowActived)}
            >
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
          </div>
          <div id="scrollableDivActor">
            <fieldset>
              {allActors.length && (
                <InfiniteScroll
                  dataLength={allActors.length}
                  next={() => setAllActorsFunction(true)}
                  hasMore={true}
                  loader={!finallyPageActor.current && <LoadingActor />}
                  scrollThreshold={1}
                  scrollableTarget="scrollableDivActor"
                  style={{ overflow: 'hidden' }}
                >
                  {allActors.map((result) => (
                    <div className="filter-name" key={result.id}>
                      <input
                        id={result.id}
                        type="checkbox"
                        onClick={(event) => setCheckBoxFilters(event, 'actor')}
                      />
                      <label htmlFor={result.id}>{result.name}</label>
                    </div>
                  ))}
                </InfiniteScroll>
              )}
            </fieldset>
          </div>
        </div>
      </Filters>
      <div className="search-new-popular">
        <div className="search">
          <div className="container-search">
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
                  placeholder="Pesquisar filme..."
                  name="search_query"
                  value={verticalSearchValue}
                  onChange={(event) =>
                    setVerticalSearchValue(event.target.value)
                  }
                />
              </form>
            </div>
          </div>
        </div>
        <div className="new">
          <h1>Novos&nbsp;filmes</h1>
          <New>
            {news.length && (
              <Swiper
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                initialSlide={1}
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={3}
                autoHeight
                loop={true}
              >
                {news.map((result) => (
                  <SwiperSlide key={result.id}>
                    {
                      <div className="popular-slider">
                        <div className="popular-img">
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
                          <Loading popular />
                        </div>
                        <div className="popular-details">
                          <Link
                            to={`${clearLinkTitle(result.title)}/${result.id}`}
                            reloadDocument
                          >
                            <h3 title={result.title}>{result.title}</h3>
                          </Link>
                          <div className="popular-year-genre">
                            <div className="popular-year-year">
                              {result.release_date
                                ? result.release_date.slice(0, 4)
                                : 'Not Data'}
                            </div>
                            &sdot;
                            <div className="popular-genre-genre">
                              {allGenres.length &&
                                allGenres.map((genre) =>
                                  genre.id === result.genre_ids[0]
                                    ? genre.name
                                    : ''
                                )}
                            </div>
                          </div>
                          <div className="vertical-overview">
                            {result.overview
                              ? result.overview
                              : 'Não à descrição para este titulo por enquanto.'}
                          </div>
                          <div className="popular-imdb-rating-voteAverage">
                            IMDB
                            <div className="popular-rating-voteAverage">
                              <RatingSystem2
                                vote_average={result.vote_average}
                                color={colors.color1}
                              />
                              <div className="popular-voteAverage">
                                {isInt(String(result.vote_average))
                                  ? `${result.vote_average}.0`
                                  : result.vote_average}
                              </div>
                            </div>
                          </div>
                          <Link
                            to={`${clearLinkTitle(result.title)}/${result.id}`}
                            reloadDocument
                          >
                            <button className="popular-watch-now">
                              Assistir&nbsp;agora
                            </button>
                          </Link>
                        </div>
                      </div>
                    }
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </New>
        </div>
        <div className="popular">
          <h1>Filmes&nbsp;populares</h1>
          <Popular
            id="scrollableDivPopular"
            style={{
              height: allPopular.length ? '975px' : '150px',
            }}
          >
            {loadingFilters && <Loading colorTranparent />}
            {allPopular.length ? (
              <InfiniteScroll
                dataLength={allPopular.length}
                next={() =>
                  controllerPopularScroll.current
                    ? setPopularFunction(true)
                    : setPopularFiltersFunction(true)
                }
                hasMore={true}
                scrollThreshold={1}
                loader={!finallyPagePopular.current && <LoadingScrollInfinit />}
                scrollableTarget="scrollableDivPopular"
                style={{ overflow: 'hidden' }}
              >
                {allPopular.map((result) => (
                  <div key={result.id} className="vertical-popular-img-details">
                    <div className="img-details">
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
                      <Loading colorVertical={true} />

                      <div>
                        <Link
                          to={`${clearLinkTitle(result.title)}/${result.id}`}
                          reloadDocument
                        >
                          <button>Assistir</button>
                        </Link>
                      </div>
                    </div>
                    <div className="popular-conatiner-details">
                      <Link
                        to={`${clearLinkTitle(result.title)}/${result.id}`}
                        reloadDocument
                      >
                        <h5 title={result.title}>{result.title}</h5>
                      </Link>
                      <div className="popular-details">
                        <div>
                          {result.release_date
                            ? result.release_date.slice(0, 4)
                            : 'Not Data'}
                          ,
                        </div>
                        <div>
                          {allGenres.length &&
                            allGenres.map((genre) =>
                              genre.id === result.genre_ids[0] ? genre.name : ''
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            ) : (
              <NoResultFilters />
            )}
          </Popular>
        </div>
      </div>
    </PagesContainer>
  );
}
