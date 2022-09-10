/* eslint-disable */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axiosRetry from 'axios-retry';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { isInt } from 'validator/validator';

import * as actions from '../../../../../storeReactRedux/modules/loading/actions';
import axiosBaseUrlSeries from '../../../../../services/axiosBaseUrlSeries';
import axiosBaseUrlUser from '../../../../../services/axiosUserBaseUrl';
import axiosBaseUrlGenresSeries from '../../../../../services/axiosBaseUrlGenresSeries';
import axiosBaseUrlMultSearch from '../../../../../services/axiosBaseUrlMultSearch';
import axiosBaseUrlGenresMovies from '../../../../../services/axiosBaseUrlGenres';
import apiConfig from '../../../../../config/apiConfig';
import imageError1 from '../../../../../assets/images/czx7z2e6uqg81.jpg';
import imageError2 from '../../../../../assets/images/1150108.png';
import Loading from '../../../../loadingReactStates/index';
import RatingSystem from '../../../../ratingSystem/index';
import RatingSystem2 from '../../../../ratingSystem2/index';
import clearLinkTitle from '../../../../../config/clearLinkTitle';
import SerieTrailer from '../../../../getTrailerSerieForId/index';
import {
  Main,
  BgImgPageDetails,
  ContainerDatails,
  PosterDetailsSimilarTrailer,
  ResultsS,
  ImagesPosters,
  Collections,
  Recomends,
} from '../styled';

axiosRetry(axios, {
  retryDelay: (retryCount) => retryCount * 1000,
  retries: 5,
});

export default function searchSerie(props) {
  const { search, valueSearch, TOrM } = props;
  const movieId = search.results[0].id;

  const dispatch = useDispatch();
  const loadingApp = useSelector((state) => state.loading.loadingState);
  const user = useSelector((state) => state.auth.user);
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);

  const [favoriteUser, setFavoriteUser] = useState(null);
  const [newMoviesId, setNewMoviesId] = useState(null);
  const [newSearchData, setNewSearchData] = useState(null);
  const [allGenresMovies, setAllGenresMovies] = useState(null);
  const [newSimilarId, setNewSimilarId] = useState(null);
  const [filesMovie, setFilesMovie] = useState(null);
  const [newCollectionId, setNewCollectionId] = useState(null);
  const [imagesPostersMovie, setImagesPostersMovie] = useState(null);
  const [arrProducer, setArrProducer] = useState([]);
  const [arrDirectorFot, setArrDirectorFot] = useState([]);
  const [arrComposer, setArrComposer] = useState([]);
  const [imageButtonActived, setImageButtonActived] = useState(true);
  const [posterButtonActived, setPosterButtonActived] = useState(null);
  const [logoButtonActived, setLogoButtonActived] = useState(null);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const getDetailsSerieId = async (movieId) => {
      try {
        const { data } = await axiosBaseUrlSeries.get(
          `/${movieId}?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        setNewMoviesId(data);
        if (data.belongs_to_collection)
          getCollection(data.belongs_to_collection.id);
      } catch {
        console.error('Erro ao obter Id de Serie');
      }
    };
    const getSearchData = async () => {
      try {
        const { data } = await axiosBaseUrlMultSearch.get(
          `/multi?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&query=${valueSearch}`
        );
        clearSearchMidiaType(data);
      } catch {
        console.error('Erro ao obter dados de pesquisa');
      }
    };
    const getCreditsSerieId = async (movieId) => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${movieId}/credits?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
        );
        getCreditsFilters(data);
      } catch (err) {
        console.log(err);
        console.error('Erro ao pegar creditos de serie');
      }
    };
    const getSimilarSerieId = async (movieId) => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${movieId}/recommendations?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
        );
        if (data.total_pages) setNewSimilarId(data);
      } catch {
        console.error('Erro ao pegar serie similar');
      }
    };
    const getImagesPostersMovie = async (movieId) => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${movieId}/images?api_key=${apiConfig.apiKey}`
        );
        setFilesMovie(data);
      } catch {
        console.error('Erro ao pegar images de filme');
      }
    };
    const getCollection = async (collectionId) => {
      try {
        const { data } =
          await axios.get(`https://api.themoviedb.org/3/collection/${collectionId}?api_key=${apiConfig.apiKey}&language=${apiConfig.language}
        `);
        setNewCollectionId(data);
      } catch {
        console.error('Erro ao pegar coleção');
      }
    };
    const getAllGenres = async () => {
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
          concatGenresAndClear([data1, data2]);
        } catch {
          console.error('Erro ao pegar generos de serie');
        }
      } catch {
        console.error('Erro ao pegar generos de filme');
      }
    };
    getDetailsSerieId(movieId);
    getCreditsSerieId(movieId);
    getSimilarSerieId(movieId);
    getImagesPostersMovie(movieId);
    getSearchData();
    getAllGenres();
    getFavoriteUser();
  }, []);

  useEffect(() => {
    if (
      favoriteUser &&
      newMoviesId &&
      newSearchData &&
      allGenresMovies &&
      filesMovie &&
      movieId &&
      loadingApp
    )
      setTimeout(() => {
        dispatch(actions.loadingFailure());
      }, 500);
  }, [
    favoriteUser,
    newMoviesId,
    allGenresMovies,
    newSearchData,
    filesMovie,
    movieId,
    loadingApp,
  ]);

  useEffect(() => {
    if (filesMovie) {
      if (imageButtonActived) {
        setImagesPostersMovie(filesMovie.backdrops.slice(0, 10));
        return;
      }
      if (posterButtonActived) {
        setImagesPostersMovie(filesMovie.posters.slice(0, 10));
        return;
      }
      if (logoButtonActived) {
        setImagesPostersMovie(filesMovie.logos.slice(0, 10));
        return;
      }
    }
  });

  function clearSearchMidiaType(data) {
    const newMidiaType = {
      results: data.results.filter(
        (midia) => midia.media_type === 'tv' || midia.media_type === 'movie'
      ),
      total_pages: data.total_pages,
    };
    setNewSearchData(newMidiaType);
  }

  function concatGenresAndClear(allGenresMoviesSeries) {
    const newArrGenres = [];
    const newArrGenresMoviesSeries = [
      ...allGenresMoviesSeries[0].genres,
      ...allGenresMoviesSeries[1].genres,
    ].forEach((valueObj1) => {
      newArrGenres
        .map((valueObj2) => valueObj2.name)
        .indexOf(valueObj1.name) === -1 && newArrGenres.push(valueObj1);
    });

    setAllGenresMovies(newArrGenres);
  }

  function getCreditsFilters(data) {
    setArrProducer(
      data.crew.filter(
        (crew) => crew.job === 'Producer' || crew.job === 'Executive Producer'
      )
    );
    setArrDirectorFot(
      data.crew.filter((crew) => crew.job === 'Director of Photography')
    );
    setArrComposer(
      data.crew.filter(
        (crew) => crew.job === 'Original Music Composer' || crew.job === 'Music'
      )
    );
  }

  async function getFavoriteUser() {
    if (!isLogedIn) {
      setFavoriteUser({});
      return;
    }

    try {
      const { data } = await axiosBaseUrlUser.get(
        `minha-lista/${user.id}/${movieId}/${TOrM}`
      );
      if (get(data, 'id', false)) {
        setFavorite(true);
        setFavoriteUser(data);
        return;
      }

      setFavoriteUser({});
    } catch (err) {
      console.error('Erro ao pegar favorito de usuario.');
    }
  }

  async function setFavoriteFunction(event) {
    if (!isLogedIn) return (window.location.href = '/login');

    if (favorite) {
      setFavorite(false);

      try {
        await axiosBaseUrlUser.delete(
          `/minha-lista/${user.id}?ids=${favoriteUser.id}`
        );
      } catch (err) {
        console.error(err.response);
      }
      return;
    } else {
      setFavorite(true);
      event.target.setAttribute('data-scale', '');
      setTimeout(() => event.target.removeAttribute('data-scale'), 100);

      try {
        await axiosBaseUrlUser.post(`/minha-lista/${user.id}`, {
          id: movieId,
          midiaType: TOrM,
        });
      } catch (err) {
        console.error(err.response);
      }
      return;
    }
  }

  function removeLoadingSipnner(event) {
    const loadingSpinner = event.target.parentElement.querySelector(
      'img + .container-load'
    );
    return loadingSpinner.remove();
  }

  SwiperCore.use(Autoplay);

  return (
    <Main>
      <BgImgPageDetails
        className="bg-img-page-details"
        backdrop_path={
          newMoviesId && newMoviesId.backdrop_path
            ? `https:image.tmdb.org/t/p/original${newMoviesId.backdrop_path}`
            : imageError2
        }
      >
        <div className="bg-color-page-details"></div>
      </BgImgPageDetails>
      {newMoviesId && (
        <ContainerDatails>
          <div className="d0">
            <PosterDetailsSimilarTrailer>
              <div className="poster-details-similar">
                <div className="poster-description">
                  <img
                    src={
                      newMoviesId.poster_path
                        ? `https://image.tmdb.org/t/p/w500${newMoviesId.poster_path}`
                        : imageError1
                    }
                    onLoad={removeLoadingSipnner}
                    onError={removeLoadingSipnner}
                    alt={newMoviesId.name}
                  />
                  <Loading colorVertical />
                  {newSearchData && newSearchData.results.length && (
                    <div className="description">
                      <h4>Descrição</h4>
                      <div>
                        {newMoviesId.overview
                          ? newMoviesId.overview
                          : 'Não à descrição para este titulo por enquanto.'}
                      </div>
                    </div>
                  )}
                </div>
                <div className="details-similar">
                  <div className="d1">
                    <h1 title={newMoviesId.name}>{newMoviesId.name}</h1>
                    <div className="year-genre-details">
                      <span>
                        {newMoviesId.release_date &&
                          newMoviesId.release_date.slice(0, 4)}
                        {newMoviesId.first_air_date &&
                          newMoviesId.first_air_date.slice(0, 4)}
                      </span>
                      &sdot;
                      <span>
                        {newMoviesId.genres
                          .slice(0, 2)
                          .map((genre) => genre.name)
                          .join(', ')}
                        {newMoviesId.genres.length < 1 && 'Not genre'}
                      </span>
                    </div>
                    <div className="rating-imdb-details">
                      IMDB
                      <div>
                        <RatingSystem
                          vote_average={newMoviesId.vote_average}
                          color="#fff"
                        />
                        <div>
                          {isInt(String(newMoviesId.vote_average))
                            ? `${newMoviesId.vote_average}.0`
                            : newMoviesId.vote_average}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d2">
                    <div className="about-details">
                      <h4>Sobre&nbsp;a&nbsp;serie</h4>
                      <div className="about">
                        <div>
                          <div>
                            <h5>Temporada:</h5>
                            <ul>
                              <li>
                                {newMoviesId.number_of_seasons > 1
                                  ? `${newMoviesId.number_of_seasons} temporadas`
                                  : `${newMoviesId.number_of_seasons} temporada`}
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h5>Produção:</h5>
                            <ul>
                              {arrProducer &&
                                arrProducer
                                  .slice(0, 3)
                                  .map((value) => (
                                    <li key={value.id}>{value.name}</li>
                                  ))}
                              {arrProducer.length < 1 && <li>Indisponível</li>}
                            </ul>
                          </div>
                          <div>
                            <h5>Diretor&nbsp;de&nbsp;fotografia:</h5>
                            <ul>
                              {arrDirectorFot &&
                                arrDirectorFot
                                  .slice(0, 3)
                                  .map((value) => (
                                    <li key={value.id}>{value.name}</li>
                                  ))}
                              {arrDirectorFot.length < 1 && (
                                <li>Indisponível</li>
                              )}
                            </ul>
                          </div>
                        </div>
                        <div>
                          <div>
                            <h5>Episódio:</h5>
                            <ul>
                              <li>
                                {newMoviesId.number_of_episodes > 1
                                  ? `${newMoviesId.number_of_episodes} episódios`
                                  : `${newMoviesId.number_of_episodes} episódio`}
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h5>{'Compositor(a):'}</h5>
                            <ul>
                              {arrComposer &&
                                arrComposer
                                  .slice(0, 3)
                                  .map((value) => (
                                    <li key={value.id}>{value.name}</li>
                                  ))}
                              {arrComposer.length < 1 && <li>Indisponível</li>}
                            </ul>
                          </div>
                          <div>
                            <h5>Original:</h5>
                            <ul>
                              <li>
                                {newMoviesId.networks.length
                                  ? newMoviesId.networks[0].name
                                  : 'Indisponível'}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {newSearchData && newSearchData.results.length && (
                      <div className="similar">
                        <h4>Resultados&nbsp;semelhantes</h4>
                        <ResultsS>
                          <Swiper
                            autoplay={{
                              delay: 3000,
                              disableOnInteraction: false,
                              pauseOnMouseEnter: true,
                            }}
                            modules={[Navigation]}
                            spaceBetween={20}
                            slidesPerView={2}
                            autoHeight
                            loop
                          >
                            {newSearchData.results.map((result, index) => (
                              <SwiperSlide key={index}>
                                {
                                  <div className="popular-movie-slider">
                                    <div className="movie-popular-img">
                                      <img
                                        src={
                                          result.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                                            : imageError1
                                        }
                                        onLoad={removeLoadingSipnner}
                                        onError={removeLoadingSipnner}
                                        alt={
                                          result.title
                                            ? result.title
                                            : result.name
                                        }
                                      />
                                      <Loading popular />
                                    </div>
                                    <div className="movie-popular-details">
                                      <Link
                                        to={`/vertical/filmes/${
                                          result.title ? 'm' : 't'
                                        }/${clearLinkTitle(
                                          result.title
                                            ? result.title
                                            : result.name
                                        )}/${result.id}`}
                                        reloadDocument
                                      >
                                        <h3
                                          title={
                                            result.title
                                              ? result.title
                                              : result.name
                                          }
                                        >
                                          {result.title
                                            ? result.title
                                            : result.name}
                                        </h3>
                                      </Link>
                                      <div className="popular-year-genre">
                                        <div className="popular-year-year">
                                          {result.release_date &&
                                            result.release_date.slice(0, 4)}
                                          {!result.release_date && 'Not data'}
                                        </div>
                                        &sdot;
                                        <div className="popular-genre-genre">
                                          {allGenresMovies &&
                                            allGenresMovies.map((genre) =>
                                              genre.id === result.genre_ids[0]
                                                ? genre.name
                                                : ''
                                            )}
                                          {result.genre_ids.length < 1 &&
                                            'Not genre'}
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
                                            color="#fff"
                                          />
                                          <div className="popular-voteAverage">
                                            {isInt(String(result.vote_average))
                                              ? `${result.vote_average}.0`.slice(
                                                  0,
                                                  3
                                                )
                                              : String(
                                                  result.vote_average
                                                ).slice(0, 3)}
                                          </div>
                                        </div>
                                      </div>
                                      <Link
                                        to={`/vertical/filmes/${
                                          result.title ? 'm' : 't'
                                        }/${clearLinkTitle(
                                          result.title
                                            ? result.title
                                            : result.name
                                        )}/${result.id}`}
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
                        </ResultsS>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {!newSearchData && (
                <div className="description">
                  <h4>Descrição</h4>
                  <div>
                    {newMoviesId.overview
                      ? newMoviesId.overview
                      : 'Não à descrição para este titulo por enquanto.'}
                  </div>
                </div>
              )}
              <div className="trailer-details-page">
                <SerieTrailer
                  movieId={movieId}
                  widthDetails="100%"
                  loadingDetails="eager"
                />
              </div>
            </PosterDetailsSimilarTrailer>
            <div className="midia-files-collection">
              <div
                className="favorite"
                title={
                  favorite ? 'Remover de minha lista' : 'Adcionar a minha lista'
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg">
                  <path
                    onClick={setFavoriteFunction}
                    data-favorite={favorite ? 'true' : 'false'}
                    d="M24 41.95 21.95 40.1Q13.8 32.65 8.9 27.1Q4 21.55 4 15.85Q4 11.35 7.025 8.325Q10.05 5.3 14.5 5.3Q17.05 5.3 19.55 6.525Q22.05 7.75 24 10.55Q26.2 7.75 28.55 6.525Q30.9 5.3 33.5 5.3Q37.95 5.3 40.975 8.325Q44 11.35 44 15.85Q44 21.55 39.1 27.1Q34.2 32.65 26.05 40.1Z"
                  />
                </svg>
              </div>
              <ImagesPosters
                imageButtonActived={imageButtonActived}
                posterButtonActived={posterButtonActived}
                logoButtonActived={logoButtonActived}
              >
                <div className="buttoms-image-posters-logos">
                  <button
                    onClick={() => {
                      if (posterButtonActived)
                        setPosterButtonActived(!posterButtonActived);
                      if (logoButtonActived)
                        setLogoButtonActived(!logoButtonActived);
                      return setImageButtonActived(!imageButtonActived);
                    }}
                    className="images"
                  >
                    Fotos
                  </button>
                  <button
                    onClick={() => {
                      if (imageButtonActived)
                        setImageButtonActived(!imageButtonActived);
                      if (logoButtonActived)
                        setLogoButtonActived(!logoButtonActived);
                      return setPosterButtonActived(!posterButtonActived);
                    }}
                    className="posters"
                  >
                    Posters
                  </button>
                  <button
                    onClick={() => {
                      if (posterButtonActived)
                        setPosterButtonActived(!posterButtonActived);
                      if (imageButtonActived)
                        setImageButtonActived(!imageButtonActived);
                      return setLogoButtonActived(!logoButtonActived);
                    }}
                    className="logos"
                  >
                    Logos
                  </button>
                </div>
                <div
                  className="pqp-eduardo-lavoura"
                  style={{
                    height: newCollectionId
                      ? '400px'
                      : newSearchData && newSearchData.results.length
                      ? '900px'
                      : '750px',
                  }}
                >
                  {imagesPostersMovie && imagesPostersMovie.length ? (
                    imagesPostersMovie.map((pqp) => (
                      <div
                        key={pqp.file_path}
                        style={{
                          height: posterButtonActived ? '420px' : '160px',
                        }}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w1280${pqp.file_path}`}
                          onLoad={removeLoadingSipnner}
                          onError={removeLoadingSipnner}
                        />
                        <Loading popular colorVertical margin />
                      </div>
                    ))
                  ) : (
                    <div className="no-fotos-posters-logos">
                      <img src={imageError2} />
                    </div>
                  )}
                </div>
              </ImagesPosters>
              {newCollectionId && (
                <div className="collection-class">
                  <h4>{newCollectionId.name}</h4>
                  <Collections>
                    {newCollectionId &&
                      newCollectionId.parts.map((result) => (
                        <div
                          key={result.id}
                          className="vertical-popular-img-details"
                        >
                          <div>
                            <img
                              src={
                                result.poster_path
                                  ? `https:image.tmdb.org/t/p/w500${result.poster_path}`
                                  : imageError2
                              }
                              onLoad={removeLoadingSipnner}
                              onError={removeLoadingSipnner}
                              alt={result.title ? result.title : result.name}
                            />
                            <Loading colorVertical />

                            <div>
                              <Link
                                to={`/vertical/filmes/${
                                  result.title ? 'm' : 't'
                                }/${clearLinkTitle(
                                  result.title ? result.title : result.name
                                )}/${result.id}`}
                                reloadDocument
                              >
                                <button>Assistir</button>
                              </Link>
                            </div>
                          </div>
                          <div className="popular-conatiner-details">
                            <Link
                              to={`/vertical/filmes/${
                                result.title ? 'm' : 't'
                              }/${clearLinkTitle(
                                result.title ? result.title : result.name
                              )}/${result.id}`}
                              reloadDocument
                            >
                              <h5
                                title={
                                  result.title ? result.title : result.name
                                }
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
                                {!result.first_air_date &&
                                  !result.release_date &&
                                  'Not data'}
                                ,
                              </div>
                              <div>
                                {allGenresMovies &&
                                  allGenresMovies.map((genre) =>
                                    genre.id === result.genre_ids[0]
                                      ? genre.name
                                      : ''
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </Collections>
                </div>
              )}
            </div>
          </div>
          {newSimilarId && (
            <div className="movies-new">
              <h4>Titulos&nbsp;recomendadas</h4>
              <Recomends>
                <Swiper
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  modules={[Navigation]}
                  spaceBetween={20}
                  slidesPerView={4}
                  autoHeight
                  loop={newSimilarId.results.length < 5 ? false : true}
                >
                  {newSimilarId.results.map((result) => (
                    <SwiperSlide key={result.id}>
                      {
                        <div className="popular-movie-slider">
                          <div className="movie-popular-img">
                            <img
                              src={
                                result.poster_path
                                  ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                                  : imageError1
                              }
                              onLoad={removeLoadingSipnner}
                              onError={removeLoadingSipnner}
                              alt={result.title ? result.title : result.name}
                            />
                            <Loading popular />
                          </div>
                          <div className="movie-popular-details">
                            <Link
                              to={`/vertical/filmes/${
                                result.title ? 'm' : 't'
                              }/${clearLinkTitle(
                                result.title ? result.title : result.name
                              )}/${result.id}`}
                              reloadDocument
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
                                {!result.first_air_date &&
                                  !result.release_date &&
                                  'Not data'}
                              </div>
                              &sdot;
                              <div className="popular-genre-genre">
                                {allGenresMovies &&
                                  allGenresMovies.map((genre) =>
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
                                  color="#fff"
                                />
                                <div className="popular-voteAverage">
                                  {isInt(String(result.vote_average))
                                    ? `${result.vote_average}.0`.slice(0, 3)
                                    : String(result.vote_average).slice(0, 3)}
                                </div>
                              </div>
                            </div>
                            <Link
                              to={`/vertical/filmes/${
                                result.title ? 'm' : 't'
                              }/${clearLinkTitle(
                                result.title ? result.title : result.name
                              )}/${result.id}`}
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
              </Recomends>
            </div>
          )}
        </ContainerDatails>
      )}
    </Main>
  );
}
