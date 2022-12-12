/* eslint-disable */
import { Link, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axiosRetry from 'axios-retry';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

import * as actions from '../../../storeReactRedux/modules/loading/actions';
import axiosBaseUrlMovies from '../../../services/axiosBaseUrlMovies';
import axiosBaseUrlGenresMovies from '../../../services/axiosBaseUrlGenres';
import axiosUserBaseUrl from '../../../services/axiosUserBaseUrl';
import apiConfig from '../../../config/apiConfig';
import imageError1 from '../../../assets/images/czx7z2e6uqg81.jpg';
import imageError2 from '../../../assets/images/1150108.png';
import Loading from '../../../components/loadingReactStates/index';
import RatingSystem from '../../../components/ratingSystem/index';
import clearLinkTitle from '../../../config/clearLinkTitleConfig';
import MessageForm from '../../../components/messageForm';
import TrailerMovie from '../../../components/getTrailerMovieForId/index';
import formatCurrency from '../../../config/formatCurrencyConfig';
import removeLoadingSipnner from '../../../config/loadingSpinnerConfig';
import {
  Main,
  BgImgPageDetails,
  ContainerDatails,
  PosterDetailsSimilarTrailer,
  NewSimilar,
  ImagesPosters,
  Collections,
  News,
} from '../styled';

axiosRetry(axios, {
  retryDelay: (retryCount) => retryCount * 1000,
  retries: 5,
});

export default function MovieD(props) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { midiaType } = props;

  const dispatch = useDispatch();
  const loadingApp = useSelector((state) => state.loading.loadingState);
  const { user, isLogedIn } = useSelector((state) => state.auth);

  const [favoriteUser, setFavoriteUser] = useState(null);
  const [newId, setNewId] = useState(null);
  const [allGenres, setAllGenres] = useState(null);
  const [newSimilarId, setNewSimilarId] = useState(null);
  const [newCollectionId, setNewCollectionId] = useState(null);
  const [news, setNews] = useState(null);
  const [files, setFiles] = useState(null);
  const [imagesPosters, setImagesPosters] = useState(null);
  const [arrProducer, setArrProducer] = useState([]);
  const [arrDirector, setArrDirector] = useState([]);
  const [arrDirectorFot, setArrDirectorFot] = useState([]);
  const [arrWriter, setArrWriter] = useState([]);
  const [arrComposer, setArrComposer] = useState([]);
  const [imageButtonActived, setImageButtonActived] = useState(true);
  const [posterButtonActived, setPosterButtonActived] = useState(null);
  const [logoButtonActived, setLogoButtonActived] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showFormMsg, setshowFormMsg] = useState(false);
  let controllerRef = useRef(new AbortController());

  useEffect(() => {
    const getDetailsId = async (id) => {
      try {
        const { data } = await axiosBaseUrlMovies.get(
          `/${id}?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        setNewId(data);
        if (data.belongs_to_collection)
          getCollection(data.belongs_to_collection.id);
      } catch {
        window.location.href = `${pathname}/404`;
        console.error('Erro ao obter Id de Filme');
      }
    };
    const getCreditsId = async (id) => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        getCreditsFilters(data);
      } catch {
        console.error('Erro ao pegar creditos de filme');
      }
    };
    const getSimilarId = async (id) => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
        );
        if (data.total_pages) setNewSimilarId(data);
      } catch {
        console.error('Erro ao pegar filmes recomendados');
      }
    };
    const getAllGenres = async () => {
      try {
        const { data } = await axiosBaseUrlGenresMovies.get(
          `/list?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        setAllGenres(data);
      } catch {
        console.error('Erro ao pegar gêneros de filme');
      }
    };
    const getImagesPosters = async (id) => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiConfig.apiKey}`
        );
        setFiles(data);
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
    async function getNews() {
      try {
        const { data } = await axiosBaseUrlMovies.get(
          `/now_playing?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
        );
        setNews(data);
      } catch {
        console.log('Erro ao carregar Novos Filmes.');
      }
    }
    getDetailsId(id);
    getCreditsId(id);
    getSimilarId(id);
    getImagesPosters(id);
    getAllGenres();
    getNews();
    getFavoriteUser();
  }, []);

  useEffect(() => {
    if (favoriteUser && newId && allGenres && files && news && id && loadingApp)
      setTimeout(() => {
        dispatch(actions.loadingFailure());
      }, 500);
  }, [favoriteUser, newId, allGenres, files, news, id, loadingApp]);

  useEffect(() => {
    if (files) {
      if (imageButtonActived) {
        setImagesPosters(files.backdrops.slice(0, 10));
        return;
      }
      if (posterButtonActived) {
        setImagesPosters(files.posters.slice(0, 10));
        return;
      }
      if (logoButtonActived) {
        setImagesPosters(files.logos.slice(0, 10));
        return;
      }
    }
  }, [files, imageButtonActived, posterButtonActived, logoButtonActived]);

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
      const { data } = await axiosUserBaseUrl.get(
        `minha-lista/${user.id}/${id + midiaType}/${midiaType}`
      );
      if (get(data, 'id', false)) {
        setFavorite(true);
        setFavoriteUser(data);
        return;
      }
      setFavoriteUser({});
    } catch (err) {
      if (get(err, 'response.data', false)) {
        const { data } = err.response;
        data.errors.map((err) => setErrorMessage(err));
        setshowFormMsg(true);
        return;
      }
      setErrorMessage('Erro no servidor.');
      setshowFormMsg(true);
    }
  }

  async function setFavoriteFunction() {
    if (!isLogedIn) return (window.location.href = '/login?redirect=back');

    controllerRef.current.abort();
    controllerRef.current = new AbortController();

    if (favorite) {
      setFavorite(false);

      try {
        await axiosUserBaseUrl.delete(
          `/minha-lista/${user.id}?ids=${favoriteUser.id}`,
          {
            signal: controllerRef.current.signal,
          }
        );
      } catch (err) {
        if (get(err, 'message', false) === 'canceled') return;
        if (get(err, 'response.data', false)) {
          const { data } = err.response;
          data.errors.map((err) => setErrorMessage(err));
          setshowFormMsg(true);
          return;
        }
        setErrorMessage('Erro no servidor.');
        setshowFormMsg(true);
      }
      return;
    } else {
      setFavorite(true);

      try {
        await axiosUserBaseUrl.post(
          `/minha-lista/${user.id}`,
          {
            id: id + midiaType,
            midiaType,
          },
          {
            signal: controllerRef.current.signal,
          }
        );
      } catch (err) {
        if (get(err, 'message', false) === 'canceled') return;
        if (get(err, 'response.data', false)) {
          const { data } = err.response;
          data.errors.map((err) => setErrorMessage(err));
          setshowFormMsg(true);
          return;
        }
        setErrorMessage('Erro no servidor.');
        setshowFormMsg(true);
      }
      return;
    }
  }

  SwiperCore.use(Autoplay);

  return (
    <Main>
      <Helmet>
        <title>{newId && `MFLIX - ${newId.title}`}</title>
      </Helmet>
      <BgImgPageDetails>
        {newId && (
          <img
            src={`https://image.tmdb.org/t/p/original${newId.backdrop_path}`}
            alt={newId.title}
          />
        )}
      </BgImgPageDetails>
      {showFormMsg && (
        <MessageForm errorMessage={errorMessage} onClose={setshowFormMsg} />
      )}
      {newId && (
        <ContainerDatails>
          <div className="d0">
            <PosterDetailsSimilarTrailer>
              <div className="poster-details-similar">
                <div className="poster-description">
                  <img
                    src={
                      newId.poster_path
                        ? `https://image.tmdb.org/t/p/w500${newId.poster_path}`
                        : imageError1
                    }
                    onLoad={removeLoadingSipnner}
                    onError={removeLoadingSipnner}
                    alt={newId.title}
                  />
                  <Loading colorVertical />
                  {newSimilarId && (
                    <div className="description">
                      <h4>Descrição</h4>
                      <div>
                        {newId.overview
                          ? newId.overview
                          : 'Não à descrição para este titulo por enquanto.'}
                      </div>
                    </div>
                  )}
                </div>
                <div className="details-similar">
                  <div className="d1">
                    <h1 title={newId.title}>{newId.title}</h1>
                    <div className="year-genre-details">
                      <span>
                        {newId.release_date && newId.release_date.slice(0, 4)}
                        {!newId.release_date && 'Not data'}
                      </span>
                      &sdot;
                      <span>
                        {newId.genres
                          .slice(0, 2)
                          .map((genre) => genre.name)
                          .join(', ')}
                        {newId.genres.length < 1 && 'Not genre'}
                      </span>
                    </div>
                    <div className="rating-imdb-details">
                      IMDB
                      <div>
                        <RatingSystem
                          vote_average={newId.vote_average}
                          color="#fff"
                        />
                        <div>
                          {newId.vote_average && newId.vote_average.toFixed(1)}
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
                              {arrDirector.length ? (
                                arrDirector
                                  .slice(0, 3)
                                  .map((value, index) => (
                                    <li key={index}>{value.name}</li>
                                  ))
                              ) : (
                                <li>Indisponível</li>
                              )}
                            </ul>
                          </div>
                          <div>
                            <h5>Produção:</h5>
                            <ul>
                              {arrProducer.length ? (
                                arrProducer
                                  .slice(0, 3)
                                  .map((value, index) => (
                                    <li key={index}>{value.name}</li>
                                  ))
                              ) : (
                                <li>Indisponível</li>
                              )}
                            </ul>
                          </div>
                          <div>
                            <h5>Diretor&nbsp;de&nbsp;fotografia:</h5>
                            <ul>
                              {arrDirectorFot.length ? (
                                arrDirectorFot
                                  .slice(0, 3)
                                  .map((value, index) => (
                                    <li key={index}>{value.name}</li>
                                  ))
                              ) : (
                                <li>Indisponível</li>
                              )}
                            </ul>
                          </div>
                        </div>
                        <div>
                          <div>
                            <h5>Roteirista:</h5>
                            <ul>
                              {arrWriter.length ? (
                                arrWriter
                                  .slice(0, 3)
                                  .map((value, index) => (
                                    <li key={index}>{value.name}</li>
                                  ))
                              ) : (
                                <li>Indisponível</li>
                              )}
                            </ul>
                          </div>
                          <div>
                            <h5>{'Compositor(a):'}</h5>
                            <ul>
                              {arrComposer.length ? (
                                arrComposer
                                  .slice(0, 3)
                                  .map((value, index) => (
                                    <li key={index}>{value.name}</li>
                                  ))
                              ) : (
                                <li>Indisponível</li>
                              )}
                            </ul>
                          </div>
                          <div>
                            <h5>Bilheteria:</h5>
                            <ul>
                              <li>{formatCurrency(newId.revenue)}</li>
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
                            initialSlide={1}
                            modules={[Navigation]}
                            spaceBetween={20}
                            slidesPerView={2}
                            autoHeight
                            loop
                          >
                            {newSimilarId.results.map((result, index) => (
                              <SwiperSlide key={index}>
                                {
                                  <div className="popular-slider">
                                    <div className="popular-img">
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
                                    <div className="popular-details">
                                      <Link
                                        to={`/vertical/filmes/${clearLinkTitle(
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
                                          {allGenres &&
                                            allGenres.genres.map((genre) =>
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
                                        to={`/vertical/filmes/${clearLinkTitle(
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
                    {newId.overview
                      ? newId.overview
                      : 'Não à descrição para este titulo por enquanto.'}
                  </div>
                </div>
              )}
              <div className="trailer-details-page">
                <TrailerMovie id={id} loadingDetails="eager" />
              </div>
            </PosterDetailsSimilarTrailer>
            <div className="midia-files-collection">
              <div className="favorite">
                <svg
                  data-like-animaton={favorite ? true : false}
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                  {imagesPosters && imagesPosters.length ? (
                    imagesPosters.map((pqp) => (
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
                                to={`/vertical/filmes/${clearLinkTitle(
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
                              to={`/vertical/filmes/${clearLinkTitle(
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
                                {allGenres &&
                                  allGenres.genres.map((genre) =>
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
          <div className="new">
            <h4>Novos&nbsp;filmes</h4>
            <News>
              <Swiper
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                initialSlide={1}
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={4}
                autoHeight
                loop
              >
                {news &&
                  news.results.map((result) => (
                    <SwiperSlide key={result.id}>
                      {
                        <div className="popular-slider">
                          <div className="popular-img">
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
                          <div className="popular-details">
                            <Link
                              to={`/vertical/filmes/${clearLinkTitle(
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
                                {allGenres &&
                                  allGenres.genres.map((genre) =>
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
                              to={`/vertical/filmes/${clearLinkTitle(
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
            </News>
          </div>
        </ContainerDatails>
      )}
    </Main>
  );
}
