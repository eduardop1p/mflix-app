/* eslint-disable */
import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Slider } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

import * as actions from '../../../../storeReactRedux/modules/loading/actions';
import axiosBaseUrlMovies from '../../../../services/axiosBaseUrlMovies';
import axiosBaseUrlSeries from '../../../../services/axiosBaseUrlSeries';
import axiosDetailsFilters from '../../../../services/axiosBaseUrlDetailsFilters';
import axiosBaseUrlGenresMovies from '../../../../services/axiosBaseUrlGenres';
import axiosBaseUrlGenresSeries from '../../../../services/axiosBaseUrlGenresSeries';
import axiosBaseUrlSeriesDiscover from '../../../../services/axiosBaseUrlSeriesDiscover';
import apiConfig from '../../../../config/apiConfig';
import clearLinkTitle from '../../../../config/clearLinkTitleConfig';
import RatingSystem from '../../../../components/ratingSystem/index';
import imageErrorTop3 from '../../../../assets/images/czx7z2e6uqg81.jpg';
import Loading from '../../../../components/loadingReactStates/index';
import LoadingScrollInfinit from '../../../../components/loadingActor/index';
import NoResultFilters from '../../../../components/noResultFilters/index';
import newArrIndex from '../../../../config/newArrIndexConfig';
import setDate from '../../../../config/setDateConfig';
import removeLoadingSipnner from '../../../../config/loadingSpinnerConfig';
import SearchHelp from '../../../../components/searchHelp';
import { PagesContainer, Filters, New, Popular } from '../../styled';

export default function Home() {
  const { id } = useParams();

  const loadingApp = useSelector((state) => state.loading.loadingState);
  const dispatch = useDispatch();

  const [news, setNews] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [allPopular, setAllPopular] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [genresArrowActived, setGenresArrowActived] = useState(true);
  const [yearsArrowActived, setYearsArrowActived] = useState(true);
  const [currentYears, setCurrentYears] = useState([
    2004,
    new Date().getFullYear(),
  ]);
  let controllerPopularScroll = useRef(true);
  let finallyPagePopular = useRef(false);
  let currentPagePopular = useRef(1);
  let currentYearsActorGenres = useRef(1);
  let genresIdsCheckBox = useRef([]);

  const minDistance = 1;

  const breackPoint1400 = useMediaQuery({ minWidth: 1400 });
  const breackPoint1290 = useMediaQuery({ maxWidth: 1290 });

  useEffect(() => {
    const setAllGenresFilters = async () => {
      try {
        const axiosData1 = await axiosBaseUrlGenresMovies.get(
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
    setNewsFunction();
    setPopularFunction(false);
    setAllGenresFilters();
  }, []); // componentDidMount() class metod

  useEffect(() => {
    if (
      allGenres.length &&
      news.length &&
      allPopular.length &&
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
    id,
    loadingApp,
    breackPoint1400,
    currentPagePopular,
    controllerPopularScroll,
    currentYearsActorGenres,
  ]);

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

  async function setNewsFunction() {
    try {
      const axiosData1 = await axiosBaseUrlMovies.get(
        `/now_playing?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
      );
      const data1 = axiosData1.data;

      try {
        const axiosData2 = await axiosBaseUrlSeriesDiscover.get(
          `?sort_by=popularity.desc&first_air_date.gte=${setDate(
            100
          )}&first_air_date.lte=${setDate()}&api_key=${
            apiConfig.apiKey
          }&language=${apiConfig.language}&page=1`
        );
        const data2 = axiosData2.data;
        randomArrMovieSerie(data1, data2, false, 'new');
      } catch {
        console.error('Erro ao carregar Novas Series.');
      }
    } catch {
      console.error('Erro ao carregar Novos Filmes.');
    }
  }

  function randomArrMovieSerie(
    newsMoviesArr,
    newsSeriesArr,
    infiniteScroll,
    name
  ) {
    const newArr = [...newsMoviesArr.results, ...newsSeriesArr.results];
    const randomArrMovieSerie = [];

    newArrIndex.forEach((valueIndex) => {
      randomArrMovieSerie.push(newArr[valueIndex]);
    });

    if (name === 'new') return setNews(randomArrMovieSerie);

    if (!randomArrMovieSerie.length) finallyPagePopular.current = true;
    if (infiniteScroll) {
      setAllPopular(allPopular.concat(randomArrMovieSerie));
      return;
    }
    setAllPopular(randomArrMovieSerie);
  }

  async function setPopularFunction(infiniteScroll) {
    controllerPopularScroll.current = true;

    try {
      const axiosData1 = await axiosBaseUrlMovies.get(
        `/popular?&api_key=${apiConfig.apiKey}&language=${
          apiConfig.language
        }&page=${infiniteScroll ? (currentPagePopular.current += 1) : 1}`
      );
      const data1 = axiosData1.data;
      try {
        const axiosData2 = await axiosBaseUrlSeries.get(
          `/popular?&api_key=${apiConfig.apiKey}&language=${
            apiConfig.language
          }&page=${infiniteScroll ? (currentPagePopular.current += 1) : 1}`
        );
        const data2 = axiosData2.data;
        randomArrMovieSerie(data1, data2, infiniteScroll);
      } catch {
        console.error('Erro ao pegar series populares.');
      }
    } catch {
      console.error('Erro ao pegar filmes populares.');
    }
  }

  function setCheckBoxFilters(event) {
    let id = Number(event.target.id);
    const { checked } = event.target;

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

  async function setPopularFiltersFunction(infiniteScroll) {
    controllerPopularScroll.current = false;

    try {
      !infiniteScroll && setLoadingFilters(true);
      const axiosData1 = await axiosDetailsFilters.get(
        `?with_genres=${genresIdsCheckBox.current.join(
          ','
        )}&primary_release_date.gte=${
          currentYears[0]
        }-01-01&primary_release_date.lte=${currentYears[1]}-12-31&api_key=${
          apiConfig.apiKey
        }&language=${apiConfig.language}&page=${
          infiniteScroll ? (currentYearsActorGenres.current += 1) : 1
        }`
      );
      const data1 = axiosData1.data;
      try {
        const axiosData2 = await axiosBaseUrlSeriesDiscover.get(
          `?with_genres=${genresIdsCheckBox.current.join(
            ','
          )}&first_air_date.gte=${currentYears[0]}-01-01&first_air_date.lte=${
            currentYears[1]
          }-12-31&api_key=${apiConfig.apiKey}&language=${
            apiConfig.language
          }&page=${infiniteScroll ? (currentYearsActorGenres.current += 1) : 1}`
        );
        const data2 = axiosData2.data;
        randomArrMovieSerie(data1, data2, infiniteScroll);
      } catch {
        console.error('Erro ao pegar series populares por gêneros.');
      }
    } catch {
      console.error('Erro ao pegar filmes populares por gêneros.');
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

  return id ? (
    <>
      <Outlet />
    </>
  ) : (
    <PagesContainer>
      <Helmet>
        <title>{'MFLIX - Home'}</title>
      </Helmet>
      {breackPoint1290 && (
        <SearchHelp namePlaceholder="Pesquisar titulo..." help />
      )}
      <Filters
        genresArrowActived={genresArrowActived}
        yearsArrowActived={yearsArrowActived}
        noMargin
        width70
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
                      onClick={(event) => setCheckBoxFilters(event)}
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
      </Filters>
      <div className="search-new-popular">
        {!breackPoint1290 && (
          <SearchHelp namePlaceholder="Pesquisar titulo..." help />
        )}
        <div className="new">
          <h1>Novos titulos</h1>
          <New>
            {news.length && (
              <Swiper
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                initialSlide={0}
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                  2400: { slidesPerView: 5 },
                  1900: { slidesPerView: 4 },
                  1021: { slidesPerView: 3 },
                  560: { slidesPerView: 2 },
                  0: { slidesPerView: 1 },
                }}
                loop={true}
              >
                {news.map(
                  (result) =>
                    result !== undefined && (
                      <SwiperSlide key={result.id}>
                        {
                          <div className="popular-slider">
                            <div className="popular-img">
                              <div className="movie-or-serie">
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
                              <Loading popular />
                            </div>
                            <div className="popular-details">
                              <Link
                                reloadDocument
                                to={`/vertical/${
                                  result.title ? 'filmes' : 'series'
                                }/${clearLinkTitle(
                                  result.title ? result.title : result.name
                                )}/${result.id}`}
                              >
                                <h3
                                  title={
                                    result.title ? result.title : result.name
                                  }
                                >
                                  {result.title ? result.title : result.name}
                                </h3>
                              </Link>
                              <div className="popular-year-genre">
                                <div className="popular-year-year">
                                  {result.release_date &&
                                    result.release_date.slice(0, 4)}
                                  {result.first_air_date &&
                                    result.first_air_date.slice(0, 4)}
                                </div>
                                <span>{String.fromCodePoint(8901)}</span>
                                <div className="popular-genre-genre">
                                  {allGenres.length &&
                                    allGenres.map((genre) =>
                                      genre.id === result.genre_ids[0]
                                        ? genre.name
                                        : ''
                                    )}
                                  {result.genre_ids.length < 1 && 'Not genre'}
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
                                to={`/vertical/${
                                  result.title ? 'filmes' : 'series'
                                }/${clearLinkTitle(
                                  result.title ? result.title : result.name
                                )}/${result.id}`}
                                className="popular-watch-now"
                              >
                                Assistir&nbsp;agora
                              </Link>
                            </div>
                          </div>
                        }
                      </SwiperSlide>
                    )
                )}
              </Swiper>
            )}
          </New>
        </div>
        <div className="popular">
          <h1>Titulos populares</h1>
          <Popular id="scrollableDivPopular">
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
                {allPopular.map(
                  (result) =>
                    result !== undefined && (
                      <div
                        key={result.id}
                        className="vertical-popular-img-details"
                      >
                        <div className="movie-or-serie">
                          {result.title ? 'Filme' : 'Serie'}
                        </div>
                        <div className="img-details">
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
                          <Loading colorVertical={true} />
                          <div>
                            <Link
                              reloadDocument
                              to={`/vertical/${
                                result.title ? 'filmes' : 'series'
                              }/${clearLinkTitle(
                                result.title ? result.title : result.name
                              )}/${result.id}`}
                            >
                              <button>Assistir</button>
                            </Link>
                          </div>
                        </div>
                        <div className="popular-conatiner-details">
                          <Link
                            reloadDocument
                            to={`/vertical/${
                              result.title ? 'filmes' : 'series'
                            }/${clearLinkTitle(
                              result.title ? result.title : result.name
                            )}/${result.id}`}
                          >
                            <h5
                              title={result.title ? result.title : result.name}
                            >
                              {result.title ? result.title : result.name}
                            </h5>
                          </Link>
                          <div className="popular-details">
                            <div>
                              {result.release_date &&
                                result.release_date.slice(0, 4)}
                              {result.first_air_date &&
                                result.first_air_date.slice(0, 4)}
                            </div>
                            &sdot;
                            <div>
                              {allGenres.length &&
                                allGenres.map((genre) =>
                                  genre.id === result.genre_ids[0]
                                    ? genre.name
                                    : ''
                                )}
                              {result.genre_ids.length < 1 && 'Not genre'}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
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
