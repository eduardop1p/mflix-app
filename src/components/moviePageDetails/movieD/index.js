/* eslint-disable */
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axiosRetry from 'axios-retry';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { isInt } from 'validator/validator';

import * as actions from '../../../storeReactRedux/modules/loading/actions';
import axiosBaseUrlMovies from '../../../services/axiosBaseUrlMovies';
import axiosBaseUrlGenresMovies from '../../../services/axiosBaseUrlGenres';
import axiosBaseUrlUser from '../../../services/axiosUserBaseUrl';
import apiConfig from '../../../config/apiConfig';
import imageError1 from '../../../assets/images/czx7z2e6uqg81.jpg';
import imageError2 from '../../../assets/images/1150108.png';
import Loading from '../../../components/loadingReactStates/index';
import RatingSystem from '../../ratingSystem/index';
import RatingSystem2 from '../../ratingSystem2/index';
import clearLinkTitle from '../../../config/clearLinkTitle';
import TrailerMovie from '../../getTrailerMovieForId/index';
import {
  Main,
  BgImgPageDetails,
  ContainerDatails,
  PosterDetailsSimilarTrailer,
  NewSimilar,
  ImagesPosters,
  Collections,
  NewMovies,
} from '../styled';

axiosRetry(axios, {
  retryDelay: (retryCount) => retryCount * 1000,
  retries: 5,
});

export default function MovieD() {
  const { TOrM, movieTitle, movieId } = useParams();

  const dispatch = useDispatch();
  const loadingApp = useSelector((state) => state.loading.loadingState);
  const user = useSelector((state) => state.auth.user);
  const { session } = useSelector((state) => state.auth.user);
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);

  const [favoriteUser, setFavoriteUser] = useState(null);
  const [newMoviesId, setNewMoviesId] = useState(null);
  const [allGenresMovies, setAllGenresMovies] = useState(null);
  const [newSimilarId, setNewSimilarId] = useState(null);
  const [newCollectionId, setNewCollectionId] = useState(null);
  const [newsMovies, setNewsMovies] = useState(null);
  const [filesMovie, setFilesMovie] = useState(null);
  const [imagesPostersMovie, setImagesPostersMovie] = useState(null);
  const [arrProducer, setArrProducer] = useState([]);
  const [arrDirector, setArrDirector] = useState([]);
  const [arrDirectorFot, setArrDirectorFot] = useState([]);
  const [arrWriter, setArrWriter] = useState([]);
  const [arrComposer, setArrComposer] = useState([]);
  const [imageButtonActived, setImageButtonActived] = useState(true);
  const [posterButtonActived, setPosterButtonActived] = useState(null);
  const [logoButtonActived, setLogoButtonActived] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const controllerRef = useRef(new AbortController());

  useEffect(() => {
    const getDetailsMovieId = async (movieId) => {
      try {
        const { data } = await axiosBaseUrlMovies.get(
          `/${movieId}?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        setNewMoviesId(data);
        if (data.belongs_to_collection)
          getCollection(data.belongs_to_collection.id);
      } catch {
        window.location.href = `/vertical/filmes/${TOrM}/${movieTitle}/${movieId}/bad`;
        console.error('Erro ao obter Id de Filme');
      }
    };
    const getCreditsMovieId = async (movieId) => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        getCreditsFilters(data);
      } catch {
        console.error('Erro ao pegar creditos de filme');
      }
    };
    const getSimilarMovieId = async (movieId) => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
        );
        if (data.total_pages) setNewSimilarId(data);
      } catch {
        console.error('Erro ao pegar filmes recomendados');
      }
    };
    const getAllGenresMovies = async () => {
      try {
        const { data } = await axiosBaseUrlGenresMovies.get(
          `/list?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        setAllGenresMovies(data);
      } catch {
        console.error('Erro ao pegar generos de filme');
      }
    };
    const getImagesPostersMovie = async (movieId) => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiConfig.apiKey}`
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
    async function getNewsMovies() {
      try {
        const { data } = await axiosBaseUrlMovies.get(
          `/now_playing?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
        );
        setNewsMovies(data);
      } catch {
        console.log('Erro ao carregar Novos Filmes.');
      }
    }
    getDetailsMovieId(movieId);
    getCreditsMovieId(movieId);
    getSimilarMovieId(movieId);
    getImagesPostersMovie(movieId);
    getAllGenresMovies();
    getNewsMovies();
    getFavoriteUser();
  }, []);

  useEffect(() => {
    if (
      favoriteUser &&
      newMoviesId &&
      allGenresMovies &&
      filesMovie &&
      newsMovies &&
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
    filesMovie,
    newsMovies,
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

  function getCreditsFilters(data) {
    setArrProducer(
      data.crew.filter(
        (crew) => crew.job === 'Producer' || crew.job === 'Executive Producer'
      )
    );
    setArrDirector(data.crew.filter((crew) => crew.job === 'Director'));
    setArrDirectorFot(
      data.crew.filter((crew) => crew.job === 'Director of Photography')
    );
    setArrWriter(
      data.crew.filter(
        (crew) => crew.job === 'Writer' || crew.job === 'Screenplay'
      )
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
        `minha-lista/${user.id}/${movieId}/${TOrM}`,
        { headers: { Authorization: session.id } }
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
    if (!isLogedIn) return (window.location.href = '/login?redirect=back');

    if (favorite) {
      setFavorite(false);
      event.target.parentElement.style.animationName = '';

      controllerRef.current.abort();

      try {
        await axiosBaseUrlUser.delete(
          `/minha-lista/${user.id}?ids=${favoriteUser.id}`,
          { headers: { Authorization: session.id } }
        );
      } catch (err) {}
      return;
    } else {
      setFavorite(true);
      event.target.parentElement.style.animationName = 'likeAnimaton';

      try {
        await axiosBaseUrlUser.post(
          `/minha-lista/${user.id}`,
          {
            id: movieId,
            midiaType: TOrM,
          },
          {
            headers: { Authorization: session.id },
            signal: controllerRef.current.signal,
          }
        );
      } catch (err) {}
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
      <Helmet>
        <title>{newMoviesId && `MFLIX - ${newMoviesId.title}`}</title>
      </Helmet>
      <BgImgPageDetails>
        {newMoviesId && (
          <img
            src={`https://image.tmdb.org/t/p/original${newMoviesId.backdrop_path}`}
            alt={newMoviesId.title}
          />
        )}
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
                    alt={newMoviesId.title}
                  />
                  <Loading colorVertical />
                  {newSimilarId && (
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
                    <h1 title={newMoviesId.title}>{newMoviesId.title}</h1>
                    <div className="year-genre-details">
                      <span>
                        {newMoviesId.release_date &&
                          newMoviesId.release_date.slice(0, 4)}
                        {!newMoviesId.release_date && 'Not data'}
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
                      <h4>Sobre&nbsp;o&nbsp;filme</h4>
                      <div className="about">
                        <div>
                          <div>
                            <h5>Diretor:</h5>
                            <ul>
                              {arrDirector &&
                                arrDirector
                                  .slice(0, 3)
                                  .map((value, index) => (
                                    <li key={index}>{value.name}</li>
                                  ))}
                              {arrDirector.length < 1 && <li>Indisponível</li>}
                            </ul>
                          </div>
                          <div>
                            <h5>Produção:</h5>
                            <ul>
                              {arrProducer &&
                                arrProducer
                                  .slice(0, 3)
                                  .map((value, index) => (
                                    <li key={index}>{value.name}</li>
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
                                  .map((value, index) => (
                                    <li key={index}>{value.name}</li>
                                  ))}
                              {arrDirectorFot.length < 1 && (
                                <li>Indisponível</li>
                              )}
                            </ul>
                          </div>
                        </div>
                        <div>
                          <div>
                            <h5>Roteirista:</h5>
                            <ul>
                              {arrWriter &&
                                arrWriter
                                  .slice(0, 3)
                                  .map((value, index) => (
                                    <li key={index}>{value.name}</li>
                                  ))}
                              {arrWriter.length < 1 && <li>Indisponível</li>}
                            </ul>
                          </div>
                          <div>
                            <h5>{'Compositor(a):'}</h5>
                            <ul>
                              {arrComposer &&
                                arrComposer
                                  .slice(0, 3)
                                  .map((value, index) => (
                                    <li key={index}>{value.name}</li>
                                  ))}
                              {arrComposer.length < 1 && <li>Indisponível</li>}
                            </ul>
                          </div>
                          <div>
                            <h5>Bilheteria:</h5>
                            <ul>
                              <li>${newMoviesId.revenue}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {newSimilarId && (
                      <div className="similar">
                        <h4>Filmes&nbsp;recomendados</h4>
                        <NewSimilar>
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
                            {newSimilarId.results.map((result, index) => (
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
                                        alt={result.title}
                                      />
                                      <Loading popular />
                                    </div>
                                    <div className="movie-popular-details">
                                      <Link
                                        to={`/vertical/filmes/m/${clearLinkTitle(
                                          result.title
                                        )}/${result.id}`}
                                        reloadDocument
                                      >
                                        <h3 title={result.title}>
                                          {result.title}
                                        </h3>
                                      </Link>
                                      <div className="popular-year-genre">
                                        <div className="popular-year-year">
                                          {result.release_date &&
                                            result.release_date.slice(0, 4)}
                                        </div>
                                        &sdot;
                                        <div className="popular-genre-genre">
                                          {allGenresMovies &&
                                            allGenresMovies.genres.map(
                                              (genre) =>
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
                                        to={`/vertical/filmes/m/${clearLinkTitle(
                                          result.title
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
                        </NewSimilar>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {!newSimilarId && (
                <div
                  className="description"
                  style={{ height: newSimilarId ? '100px' : 'fit-content' }}
                >
                  <h4>Descrição</h4>
                  <div>
                    {newMoviesId.overview
                      ? newMoviesId.overview
                      : 'Não à descrição para este titulo por enquanto.'}
                  </div>
                </div>
              )}
              <div className="trailer-details-page">
                <TrailerMovie
                  movieId={movieId}
                  widthDetails="100%"
                  loadingDetails="eager"
                />
              </div>
            </PosterDetailsSimilarTrailer>
            <div className="midia-files-collection">
              <div className="favorite">
                <svg xmlns="http://www.w3.org/2000/svg">
                  <path
                    onClick={setFavoriteFunction}
                    fill={favorite ? '#ff0000' : '#fff'}
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
                      setImageButtonActived(true);
                      setPosterButtonActived(false);
                      setLogoButtonActived(false);
                    }}
                    className="images"
                  >
                    Fotos
                  </button>
                  <button
                    onClick={() => {
                      setPosterButtonActived(true);
                      setImageButtonActived(false);
                      setLogoButtonActived(false);
                    }}
                    className="posters"
                  >
                    Posters
                  </button>
                  <button
                    onClick={() => {
                      setLogoButtonActived(true);
                      setPosterButtonActived(false);
                      setImageButtonActived(false);
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
                      : newSimilarId
                      ? '900px'
                      : '750px',
                  }}
                >
                  {imagesPostersMovie && imagesPostersMovie.length ? (
                    imagesPostersMovie.map((pqp) => (
                      <div key={pqp.file_path}>
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
                                  ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                                  : imageError2
                              }
                              onLoad={removeLoadingSipnner}
                              onError={removeLoadingSipnner}
                              alt={result.title}
                            />
                            <Loading colorVertical />
                            <div>
                              <Link
                                to={`/vertical/filmes/m/${clearLinkTitle(
                                  result.title
                                )}/${result.id}`}
                                reloadDocument
                              >
                                <button>Assistir</button>
                              </Link>
                            </div>
                          </div>
                          <div className="popular-conatiner-details">
                            <Link
                              to={`/vertical/filmes/m/${clearLinkTitle(
                                result.title
                              )}/${result.id}`}
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
                                {allGenresMovies &&
                                  allGenresMovies.genres.map((genre) =>
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
          <div className="movies-new">
            <h4>Novos&nbsp;filmes</h4>
            <NewMovies>
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
                loop
              >
                {newsMovies &&
                  newsMovies.results.map((result) => (
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
                              alt={result.title}
                            />
                            <Loading popular />
                          </div>
                          <div className="movie-popular-details">
                            <Link
                              to={`/vertical/filmes/m/${clearLinkTitle(
                                result.title
                              )}/${result.id}`}
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
                                {allGenresMovies &&
                                  allGenresMovies.genres.map((genre) =>
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
                                    ? `${result.vote_average}.0`
                                    : result.vote_average}
                                </div>
                              </div>
                            </div>
                            <Link
                              to={`/vertical/filmes/m/${clearLinkTitle(
                                result.title
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
            </NewMovies>
          </div>
        </ContainerDatails>
      )}
    </Main>
  );
}
