/* eslint-disable */
import { useState, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, Outlet, useParams } from 'react-router-dom';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Slider } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

import * as actions from '../../../../storeReactRedux/modules/loading/actions';
import axiosBaseUrlMovies from '../../../../services/axiosBaseUrlMovies';
import axiosDetailsFilters from '../../../../services/axiosBaseUrlDetailsFilters';
import axiosBaseUrlGenres from '../../../../services/axiosBaseUrlGenres';
import axiosBaseUrlFilterActor from '../../../../services/axiosBaseUrlFilterActor';
import apiConfig from '../../../../config/apiConfig';
import clearLinkTitle from '../../../../config/clearLinkTitleConfig';
import RatingSystem from '../../../../components/ratingSystem/index';
import imageErrorTop3 from '../../../../assets/images/czx7z2e6uqg81.jpg';
import Loading from '../../../../components/loadingReactStates/index';
import LoadingActor from '../../../../components/loadingActor/index';
import LoadingScrollInfinit from '../../../../components/loadingActor/index';
import NoResultFilters from '../../../../components/noResultFilters/index';
import setVerticalSearch from '../../../../config/searchConfig';
import removeLoadingSipnner from '../../../../config/loadingSpinnerConfig';
import {
  PagesContainer,
  Filters,
  New,
  Popular,
  SearchHelpContainer,
} from '../../styled';

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
  const [allActors, setAllActors] = useState([]);
  const [currentYears, setCurrentYears] = useState([
    2004,
    new Date().getFullYear(),
  ]);
  let controllerPopularScroll = useRef(true);
  let currentPagePopular = useRef(1);
  let currentYearsActorGenres = useRef(1);
  let currentPageActor = useRef(1);
  let finallyPagePopular = useRef(false);
  let finallyPageActor = useRef(false);
  let genresIdsCheckBox = useRef([]);
  let actorIdsCheckBox = useRef([]);

  const minDistance = 1;

  const breackPoint1400 = useMediaQuery({ minWidth: 1400 });
  const breackPoint1290 = useMediaQuery({ maxWidth: 1290 });
  const breackPoint660 = useMediaQuery({ maxWidth: 660 });
  const breackPoint629 = useMediaQuery({ maxWidth: 629 });

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
    if (
      breackPoint1400 &&
      allPopular.length &&
      controllerPopularScroll.current &&
      currentPagePopular.current === 1
    )
      setPopularFunction(true);
    if (
      breackPoint1400 &&
      allPopular.length &&
      !controllerPopularScroll.current &&
      currentYearsActorGenres.current === 1
    )
      setPopularFiltersFunction(true);
  }, [
    allGenres,
    news,
    allPopular,
    allActors,
    loadingApp,
    breackPoint1400,
    currentPagePopular,
    currentYearsActorGenres,
    controllerPopularScroll,
  ]);

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
    controllerPopularScroll.current = false;

    try {
      !infiniteScroll && setLoadingFilters(true);
      const { data } = await axiosDetailsFilters.get(
        `?sort_by=popularity.desc&with_genres=${genresIdsCheckBox.current.join(
          ','
        )}&primary_release_date.gte=${
          currentYears[0]
        }-01-01&primary_release_date.lte=${
          currentYears[1]
        }-12-31&with_people=${actorIdsCheckBox.current.join(',')}&api_key=${
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

  function handleChange(value, activeThumb) {
    if (!Array.isArray(value)) {
      return;
    }

    if (activeThumb === 0) {
      setCurrentYears([Math.min(value[0], value[1] - minDistance), value[1]]);
    } else {
      setCurrentYears([value[0], Math.max(value[1], value[0] + minDistance)]);
    }
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
      {breackPoint1290 && <SearchHelp setVerticalSearch={setVerticalSearch} />}
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
          <div>
            <Slider
              sx={{
                color: '#B243F7',
                width: '93%',
              }}
              value={currentYears}
              max={new Date().getFullYear()}
              min={1990}
              onChange={handleChange}
              onChangeCommitted={() => setPopularFiltersFunction(false)}
              valueLabelDisplay="off"
              disableSwap
              size="small"
            />
            <div className="value-range-visibles">
              <span>{currentYears[0]}</span>
              <span>{currentYears[1]}</span>
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
        {!breackPoint1290 && (
          <SearchHelp setVerticalSearch={setVerticalSearch} />
        )}
        <div className="new">
          <h1>Novos filmes</h1>
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
                slidesPerView={2}
                breakpoints={{
                  2400: { slidesPerView: 5 },
                  1900: { slidesPerView: 4 },
                  1021: { slidesPerView: 3 },
                  630: { slidesPerView: 2 },
                  501: { slidesPerView: 3 },
                  0: { slidesPerView: 1 },
                }}
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
                            reloadDocument
                            to={`${clearLinkTitle(result.title)}/${result.id}`}
                          >
                            <h3 title={result.title}>{result.title}</h3>
                          </Link>
                          <div className="popular-year-genre">
                            <div className="popular-year-year">
                              {result.release_date
                                ? result.release_date.slice(0, 4)
                                : 'Not Data'}
                            </div>
                            {!breackPoint660 || breackPoint629
                              ? String.fromCodePoint(8901)
                              : ''}
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
                              <RatingSystem
                                vote_average={result.vote_average}
                                ratingSystem2
                              />
                              <div className="popular-voteAverage">
                                {result.vote_average &&
                                  result.vote_average.toFixed(1)}
                              </div>
                            </div>
                          </div>
                          <Link
                            reloadDocument
                            to={`${clearLinkTitle(result.title)}/${result.id}`}
                            className="popular-watch-now"
                          >
                            Assistir&nbsp;agora
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
          <h1>Filmes populares</h1>
          <Popular
            id="scrollableDivPopular"
            style={{
              height: allPopular.length ? '100vh' : '150px',
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
                          reloadDocument
                          to={`${clearLinkTitle(result.title)}/${result.id}`}
                        >
                          <button>Assistir</button>
                        </Link>
                      </div>
                    </div>
                    <div className="popular-conatiner-details">
                      <Link
                        reloadDocument
                        to={`${clearLinkTitle(result.title)}/${result.id}`}
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

function SearchHelp(props) {
  const { setVerticalSearch } = props;

  return (
    <SearchHelpContainer>
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
        />
      </form>
      <div title="Dúvidas?" tabIndex={0}>
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px">
          <path d="M9.958 15.021Q10.417 15.021 10.729 14.708Q11.042 14.396 11.042 13.938Q11.042 13.479 10.729 13.167Q10.417 12.854 9.958 12.854Q9.5 12.854 9.188 13.167Q8.875 13.479 8.875 13.938Q8.875 14.396 9.188 14.708Q9.5 15.021 9.958 15.021ZM9.167 11.771H10.792Q10.792 11.062 10.948 10.677Q11.104 10.292 11.833 9.583Q12.354 9.062 12.667 8.573Q12.979 8.083 12.979 7.396Q12.979 6.229 12.135 5.604Q11.292 4.979 10.104 4.979Q8.896 4.979 8.135 5.604Q7.375 6.229 7.083 7.125L8.542 7.708Q8.646 7.354 8.979 6.906Q9.312 6.458 10.062 6.458Q10.708 6.458 11.042 6.802Q11.375 7.146 11.375 7.562Q11.375 7.958 11.115 8.333Q10.854 8.708 10.5 9Q9.562 9.812 9.365 10.229Q9.167 10.646 9.167 11.771ZM10 18.333Q8.292 18.333 6.771 17.677Q5.25 17.021 4.115 15.896Q2.979 14.771 2.323 13.25Q1.667 11.729 1.667 10Q1.667 8.271 2.323 6.75Q2.979 5.229 4.115 4.104Q5.25 2.979 6.771 2.323Q8.292 1.667 10 1.667Q11.75 1.667 13.271 2.323Q14.792 2.979 15.917 4.104Q17.042 5.229 17.688 6.75Q18.333 8.271 18.333 10Q18.333 11.729 17.688 13.25Q17.042 14.771 15.917 15.896Q14.792 17.021 13.271 17.677Q11.75 18.333 10 18.333ZM10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10ZM10 16.583Q12.771 16.583 14.677 14.656Q16.583 12.729 16.583 10Q16.583 7.271 14.677 5.344Q12.771 3.417 10 3.417Q7.292 3.417 5.354 5.344Q3.417 7.271 3.417 10Q3.417 12.729 5.354 14.656Q7.292 16.583 10 16.583Z" />
        </svg>

        <span className="duvidas-years">
          Os filtros não tem efeito no catalogo "Novos filmes".
        </span>
      </div>
    </SearchHelpContainer>
  );
}
