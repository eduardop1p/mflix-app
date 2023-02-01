/* eslint-disable */
import { Link, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axiosRetry from 'axios-retry';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { get } from 'lodash';
import { Helmet } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';

import * as actions from '../../../storeReactRedux/modules/loading/actions';
import axiosBaseUrlSeries from '../../../services/axiosBaseUrlSeries';
import axiosBaseUrlGenresSeries from '../../../services/axiosBaseUrlGenresSeries';
import axiosUserBaseUrl from '../../../services/axiosUserBaseUrl';
import axiosBaseUrlSeriesDiscover from '../../../services/axiosBaseUrlSeriesDiscover';
import apiConfig from '../../../config/apiConfig';
import imageError1 from '../../../assets/images/czx7z2e6uqg81.jpg';
import imageError2 from '../../../assets/images/1150108.png';
import Loading from '../../../components/loadingReactStates/index';
import RatingSystem from '../../../components/ratingSystem/index';
import clearLinkTitle from '../../../config/clearLinkTitleConfig';
import MessageForm from '../../../components/messageForm';
import SerieTrailer from '../../../components/getTrailerSerieForId/index';
import setDate from '../../../config/setDateConfig';
import removeLoadingSipnner from '../../../config/loadingSpinnerConfig';
import {
  Main,
  BgImgPageDetails,
  ContainerDatails,
  PosterDetailsSimilarTrailer,
  NewSimilar,
  Collections,
  News,
  TrailerContainer,
  Description,
  FavoriteContainer,
  DetailsAndSimilarContainer,
} from '../styled';

axiosRetry(axios, {
  retryDelay: (retryCount) => retryCount * 1000,
  retries: 5,
});

export default function serieD(props) {
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
  const [news, setNews] = useState(null);
  const [arrProducer, setArrProducer] = useState([]);
  const [arrDirectorFot, setArrDirectorFot] = useState([]);
  const [arrComposer, setArrComposer] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showFormMsg, setshowFormMsg] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  const breakpoint600 = useMediaQuery({ maxWidth: 600 });
  const breakpoint450 = useMediaQuery({ maxWidth: 450 });

  useEffect(() => {
    const getDetailsId = async (id) => {
      try {
        const { data } = await axiosBaseUrlSeries.get(
          `/${id}?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        setNewId(data);
      } catch {
        window.location.href = `${pathname}/404`;
        console.error('Erro ao obter Id de Serie');
      }
    };
    const getCreditsId = async (id) => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
        );
        getCreditsFilters(data);
      } catch {
        console.error('Erro ao pegar creditos de serie');
      }
    };
    const getSimilarId = async (id) => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
        );
        if (data.total_pages) setNewSimilarId(data);
      } catch {
        console.error('Erro ao pegar serie similar');
      }
    };
    const getAllGenres = async () => {
      try {
        const { data } = await axiosBaseUrlGenresSeries.get(
          `/list?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        setAllGenres(data);
      } catch {
        console.error('Erro ao pegar gêneros de serie');
      }
    };
    getDetailsId(id);
    getCreditsId(id);
    getSimilarId(id);
    getNews();
    getAllGenres();
    getFavoriteUser();
  }, []);

  useEffect(() => {
    if (favoriteUser && newId && allGenres && news && id && loadingApp) {
      setTimeout(() => {
        dispatch(actions.loadingFailure());
      }, 500);
    }
  }, [favoriteUser, newId, allGenres, news, id, loadingApp]);

  async function getNews() {
    try {
      const { data } = await axiosBaseUrlSeriesDiscover.get(
        `?sort_by=popularity.desc&first_air_date.gte=${setDate(
          100
        )}&first_air_date.lte=${setDate()}&api_key=${
          apiConfig.apiKey
        }&language=${apiConfig.language}&page=1`
      );
      setNews(data);
    } catch {
      console.log('Erro ao carregar Novas Series.');
    }
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
      const { data } = await axiosUserBaseUrl.get(
        `minha-lista/${user.id}/${id + midiaType}/${midiaType}`
      );
      if (get(data, 'id', false)) {
        setFavorite(true);
        setFavoriteUser(data);
        return;
      }
      setFavorite(false);
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

    if (favorite) {
      setFavorite(false);

      try {
        setLoadingFavorite(true);

        await axiosUserBaseUrl.delete(
          `/minha-lista/${user.id}?ids=${favoriteUser.id}`
        );
      } catch (err) {
        setFavorite(true);
        if (get(err, 'response.data', false)) {
          const { data } = err.response;
          data.errors.map((err) => setErrorMessage(err));
          setshowFormMsg(true);
          return;
        }
        setErrorMessage('Erro no servidor.');
        setshowFormMsg(true);
      } finally {
        setLoadingFavorite(false);
      }
    } else {
      setFavorite(true);

      try {
        setLoadingFavorite(true);

        await axiosUserBaseUrl.post(`/minha-lista/${user.id}`, {
          id: id + midiaType,
          midiaType,
        });
      } catch (err) {
        setFavorite(false);
        if (get(err, 'response.data', false)) {
          const { data } = err.response;
          data.errors.map((err) => setErrorMessage(err));
          setshowFormMsg(true);
          return;
        }
        setErrorMessage('Erro no servidor.');
        setshowFormMsg(true);
      } finally {
        setLoadingFavorite(false);
      }
    }
  }

  return (
    <Main>
      <HeaderComponent
        newId={newId}
        showFormMsg={showFormMsg}
        errorMessage={errorMessage}
        setshowFormMsg={setshowFormMsg}
      />
      {loadingFavorite && <Loading colorTranparent />}

      {newId && (
        <ContainerDatails>
          {!breakpoint450 && (
            <FavoriteComponent
              setFavoriteFunction={setFavoriteFunction}
              favorite={favorite}
            />
          )}
          <div className="d0">
            <PosterDetailsSimilarTrailer transform50Poster>
              <div className="poster-details-similar">
                <PosterAndDescriptionComponent newId={newId} />
                {!breakpoint600 && (
                  <DetailsAndSimilarContainer>
                    <div className="d1">
                      <DetailsComponent newId={newId} />
                    </div>
                    <div className="d2">
                      <AboutDetailsComponent
                        newId={newId}
                        arrProducer={arrProducer}
                        arrDirectorFot={arrDirectorFot}
                        arrComposer={arrComposer}
                      />
                    </div>
                  </DetailsAndSimilarContainer>
                )}
              </div>
            </PosterDetailsSimilarTrailer>
          </div>
          {breakpoint600 && (
            <DetailsAndSimilarContainer>
              <div className="d1">
                <DetailsComponent
                  newId={newId}
                  breakpoint450={breakpoint450}
                  setFavoriteFunction={setFavoriteFunction}
                  favorite={favorite}
                />
              </div>
              <div className="d2">
                <AboutDetailsComponent
                  newId={newId}
                  arrProducer={arrProducer}
                  arrDirectorFot={arrDirectorFot}
                  arrComposer={arrComposer}
                />
              </div>
            </DetailsAndSimilarContainer>
          )}
          <DescriptionComponent newId={newId} noMarginTop />

          {newSimilarId && (
            <NewSimilarComponent
              newSimilarId={newSimilarId}
              allGenres={allGenres}
            />
          )}

          <TrailerContainer>
            <SerieTrailer id={id} />
          </TrailerContainer>
          <NewComponent news={news} allGenres={allGenres} />
        </ContainerDatails>
      )}
    </Main>
  );
}

/* components */

function HeaderComponent(props) {
  const { newId, showFormMsg, errorMessage, setshowFormMsg } = props;

  if (!newId) return;

  return (
    <>
      <Helmet>
        <title>{`MFLIX - ${newId.name}`}</title>
      </Helmet>
      <BgImgPageDetails>
        <img
          src={
            newId.backdrop_path
              ? `https://image.tmdb.org/t/p/original${newId.backdrop_path}`
              : imageError2
          }
          alt={newId.name}
        />
      </BgImgPageDetails>
      {showFormMsg && (
        <MessageForm errorMessage={errorMessage} onClose={setshowFormMsg} />
      )}
    </>
  );
}

function FavoriteComponent(props) {
  const { setFavoriteFunction, favorite } = props;

  return (
    <FavoriteContainer>
      <svg
        data-like-animaton={favorite ? true : false}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          onClick={setFavoriteFunction}
          fill={favorite ? '#ed4956' : '#fff'}
          d="M24 41.95 21.95 40.1Q13.8 32.65 8.9 27.1Q4 21.55 4 15.85Q4 11.35 7.025 8.325Q10.05 5.3 14.5 5.3Q17.05 5.3 19.55 6.525Q22.05 7.75 24 10.55Q26.2 7.75 28.55 6.525Q30.9 5.3 33.5 5.3Q37.95 5.3 40.975 8.325Q44 11.35 44 15.85Q44 21.55 39.1 27.1Q34.2 32.65 26.05 40.1Z"
        />
      </svg>
    </FavoriteContainer>
  );
}

function PosterAndDescriptionComponent({ newId }) {
  return (
    <div className="poster-description">
      <img
        src={
          newId.poster_path
            ? `https://image.tmdb.org/t/p/w500${newId.poster_path}`
            : imageError1
        }
        onLoad={removeLoadingSipnner}
        onError={removeLoadingSipnner}
        alt={newId.name}
      />
      <Loading colorVertical />
    </div>
  );
}

function DescriptionComponent(props) {
  const { newId, noMarginTop } = props;

  return (
    <Description
      overview={newId.overview ? true : false}
      noMarginTop={noMarginTop}
    >
      <h4>Descrição</h4>
      <div>
        {newId.overview
          ? newId.overview
          : 'Não à descrição para este titulo por enquanto.'}
      </div>
    </Description>
  );
}

function DetailsComponent({
  newId,
  setFavoriteFunction,
  favorite,
  breakpoint450,
}) {
  return (
    <>
      <h1 title={newId.name}>{newId.name}</h1>
      <div className="y-g-f">
        <div className="year-genre-details">
          <span>
            {newId.first_air_date
              ? newId.first_air_date.slice(0, 4)
              : 'Not data'}
          </span>
          <span>&sdot;</span>
          <span>
            {newId.genres
              .slice(0, 2)
              .map((genre) => genre.name)
              .join(', ')}
            {newId.genres.length < 1 && 'Not genre'}
          </span>
        </div>
        {breakpoint450 && (
          <FavoriteComponent
            setFavoriteFunction={setFavoriteFunction}
            favorite={favorite}
          />
        )}
      </div>

      <div className="rating-imdb-details">
        IMDB
        <div>
          <RatingSystem vote_average={newId.vote_average} color="#fff" />
          <div>{newId.vote_average && newId.vote_average.toFixed(1)}</div>
        </div>
      </div>
    </>
  );
}

function AboutDetailsComponent(props) {
  const { newId, arrProducer, arrDirectorFot, arrComposer } = props;

  return (
    <div className="about-details">
      <h4>Sobre a serie</h4>
      <div className="about">
        <div>
          <div>
            <h5>Temporada:</h5>
            <ul>
              <li>
                {newId.number_of_seasons > 1
                  ? `${newId.number_of_seasons} temporadas`
                  : `${newId.number_of_seasons} temporada`}
              </li>
            </ul>
          </div>

          <div>
            <h5>Episódio:</h5>
            <ul>
              <li>
                {newId.number_of_episodes > 1
                  ? `${newId.number_of_episodes} episódios`
                  : `${newId.number_of_episodes} episódio`}
              </li>
            </ul>
          </div>
          <div>
            <h5>Diretor de fotografia:</h5>
            <ul>
              {arrDirectorFot.length ? (
                arrDirectorFot
                  .slice(0, 3)
                  .map((value) => <li key={value.id}>{value.name}</li>)
              ) : (
                <li>Indisponível</li>
              )}
            </ul>
          </div>
        </div>
        <div>
          <div>
            <h5>Produção:</h5>
            <ul>
              {arrProducer.length ? (
                arrProducer
                  .slice(0, 3)
                  .map((value) => <li key={value.id}>{value.name}</li>)
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
                  .map((value) => <li key={value.id}>{value.name}</li>)
              ) : (
                <li>Indisponível</li>
              )}
            </ul>
          </div>
          <div>
            <h5>Original:</h5>
            <ul>
              <li>
                {newId.networks.length
                  ? newId.networks[0].name
                  : 'Indisponível'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewSimilarComponent({ newSimilarId, allGenres }) {
  return (
    newSimilarId && (
      <NewSimilar>
        <div className="similar">
          <h4>Series recomendadas</h4>
          <NewSimilar>
            <Swiper
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              initialSlide={1}
              spaceBetween={20}
              slidesPerView={2}
              modules={[Autoplay]}
              autoHeight
              breakpoints={{
                2250: { slidesPerView: 6 },
                1800: { slidesPerView: 5 },
                1320: { slidesPerView: 4 },
                901: { slidesPerView: 3 },
                585: { slidesPerView: 2 },
                0: { slidesPerView: 1 },
              }}
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
                          alt={result.name}
                        />
                        <Loading popular />
                      </div>
                      <div className="popular-details">
                        <Link
                          reloadDocument
                          to={`/vertical/series/${clearLinkTitle(
                            result.name
                          )}/${result.id}`}
                        >
                          <h3 title={result.name}>{result.name}</h3>
                        </Link>
                        <div className="popular-year-genre">
                          <div className="popular-year-year">
                            {result.first_air_date
                              ? result.first_air_date.slice(0, 4)
                              : 'Not data'}
                          </div>
                          <span>&sdot;</span>
                          <div className="popular-genre-genre">
                            {allGenres &&
                              allGenres.genres.map((genre) =>
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
                          to={`/vertical/series/${clearLinkTitle(
                            result.name
                          )}/${result.id}`}
                          className="popular-watch-now"
                        >
                          Assistir agora
                        </Link>
                      </div>
                    </div>
                  }
                </SwiperSlide>
              ))}
            </Swiper>
          </NewSimilar>
        </div>
      </NewSimilar>
    )
  );
}

function NewComponent({ news, allGenres }) {
  return (
    <News>
      <h4>Novas series</h4>
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        initialSlide={1}
        spaceBetween={20}
        slidesPerView={3}
        modules={[Autoplay]}
        breakpoints={{
          2250: { slidesPerView: 6 },
          1800: { slidesPerView: 5 },
          1320: { slidesPerView: 4 },
          901: { slidesPerView: 3 },
          585: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
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
                      alt={result.name}
                    />
                    <Loading popular />
                  </div>
                  <div className="popular-details">
                    <Link
                      reloadDocument
                      to={`/vertical/series/${clearLinkTitle(result.name)}/${
                        result.id
                      }`}
                    >
                      <h3 title={result.name}>{result.name}</h3>
                    </Link>
                    <div className="popular-year-genre">
                      <div className="popular-year-year">
                        {result.first_air_date
                          ? result.first_air_date.slice(0, 4)
                          : 'Not Data'}
                      </div>
                      <span>&sdot;</span>
                      <div className="popular-genre-genre">
                        {allGenres &&
                          allGenres.genres.map((genre) =>
                            genre.id === result.genre_ids[0] ? genre.name : ''
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
                      to={`/vertical/series/${clearLinkTitle(result.name)}/${
                        result.id
                      }`}
                      className="popular-watch-now"
                    >
                      Assistir agora
                    </Link>
                  </div>
                </div>
              }
            </SwiperSlide>
          ))}
      </Swiper>
    </News>
  );
}
