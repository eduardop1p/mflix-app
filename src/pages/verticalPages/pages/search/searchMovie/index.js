/* eslint-disable */
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axiosRetry from 'axios-retry';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

import * as actions from '../../../../../storeReactRedux/modules/loading/actions';
import axiosBaseUrlMovies from '../../../../../services/axiosBaseUrlMovies';
import axiosUserBaseUrl from '../../../../../services/axiosUserBaseUrl';
import axiosBaseUrlGenresMovies from '../../../../../services/axiosBaseUrlGenres';
import axiosBaseUrlMultSearch from '../../../../../services/axiosBaseUrlMultSearch';
import apiConfig from '../../../../../config/apiConfig';
import imageError1 from '../../../../../assets/images/czx7z2e6uqg81.jpg';
import imageError2 from '../../../../../assets/images/1150108.png';
import Loading from '../../../../../components/loadingReactStates/index';
import RatingSystem from '../../../../../components/ratingSystem/index';
import clearLinkTitle from '../../../../../config/clearLinkTitleConfig';
import MessageForm from '../../../../../components/messageForm';
import TrailerMovie from '../../../../../components/getTrailerMovieForId/index';
import formatCurrency from '../../../../../config/formatCurrencyConfig';
import removeLoadingSipnner from '../../../../../config/loadingSpinnerConfig';
import {
  Main,
  BgImgPageDetails,
  ContainerDatails,
  PosterDetailsRecommendedTrailer,
  NewRecommended,
  Collections,
  News as NewSimilarResults,
  TrailerContainer,
  Description,
  FavoriteContainer,
  DetailsAndRecommendedContainer,
} from '../../../../pageDetailsTitles/styled';

axiosRetry(axios, {
  retryDelay: (retryCount) => retryCount * 1000,
  retries: 5,
});

export default function SearchMovie(props) {
  const { search, searchValue, midiaType } = props;
  const id = search.results[0].id;

  const dispatch = useDispatch();
  const loadingApp = useSelector((state) => state.loading.loadingState);
  const { user, isLogedIn } = useSelector((state) => state.auth);

  const [favoriteUser, setFavoriteUser] = useState(null);
  const [newId, setNewId] = useState(null);
  const [newSimilarId, setNewSimilarId] = useState(null);
  const [allGenres, setAllGenres] = useState(null);
  const [newRecommendedId, setNewRecommendedId] = useState(null);
  const [newCollectionId, setNewCollectionId] = useState(null);
  const [arrProducer, setArrProducer] = useState([]);
  const [arrDirector, setArrDirector] = useState([]);
  const [arrDirectorFot, setArrDirectorFot] = useState([]);
  const [arrWriter, setArrWriter] = useState([]);
  const [arrComposer, setArrComposer] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showFormMsg, setshowFormMsg] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  const breakpoint630 = useMediaQuery({ maxWidth: 630 });
  const breakpoint600 = useMediaQuery({ maxWidth: 600 });
  const breakpoint450 = useMediaQuery({ maxWidth: 450 });
  const minBreakPoint600 = useMediaQuery({ minWidth: 600 });

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
        console.error('Erro ao obter Id de Filme');
      }
    };
    const getSimilarId = async () => {
      try {
        const { data } = await axiosBaseUrlMultSearch.get(
          `/multi?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&query=${searchValue}`
        );
        clearSearchMidiaType(data);
      } catch {
        console.error('Erro ao obter dados de pesquisa');
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
    const getRecommendedId = async (id) => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
        );
        if (data.total_pages) setNewRecommendedId(data);
      } catch {
        console.error('Erro ao pegar filmes recomendados');
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
        const { data } = await axiosBaseUrlGenresMovies.get(
          `/list?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        setAllGenres(data);
      } catch {
        console.error('Erro ao pegar gêneros de filme');
      }
    };
    getDetailsId(id);
    getCreditsId(id);
    getRecommendedId(id);
    getSimilarId();
    getAllGenres();
    getFavoriteUser();
    return;
  }, []);

  useEffect(() => {
    if (favoriteUser && newId && newSimilarId && allGenres && id && loadingApp)
      setTimeout(() => {
        dispatch(actions.loadingFailure());
      }, 500);
  }, [favoriteUser, newId, allGenres, newSimilarId, id, loadingApp]);

  function clearSearchMidiaType(data) {
    const newMidiaType = {
      results: data.results.filter(
        (midia) => midia.media_type === 'tv' || midia.media_type === 'movie'
      ),
      total_pages: data.total_pages,
    };
    setNewSimilarId(newMidiaType);
  }

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

  if (!newSimilarId && !newCollectionId)
    return (
      <LayoutNoSimilarNoCollection
        showFormMsg={showFormMsg}
        newId={newId}
        setFavoriteFunction={setFavoriteFunction}
        favorite={favorite}
        errorMessage={errorMessage}
        setshowFormMsg={setshowFormMsg}
        arrDirector={arrDirector}
        arrProducer={arrProducer}
        arrDirectorFot={arrDirectorFot}
        arrWriter={arrWriter}
        arrComposer={arrComposer}
        allGenres={allGenres}
        id={id}
        newRecommendedId={newRecommendedId}
        breakpoint600={breakpoint600}
        breakpoint450={breakpoint450}
        loadingFavorite={loadingFavorite}
        minBreakPoint600={minBreakPoint600}
      />
    );

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
            <PosterDetailsRecommendedTrailer
              transform50Poster={
                breakpoint600 && !newCollectionId ? true : false
              }
            >
              <div className="poster-details-recommended">
                <PosterAndDescriptionComponent
                  newId={newId}
                  minBreakPoint600={
                    minBreakPoint600 && newCollectionId ? true : false
                  }
                />
                {!breakpoint600 && (
                  <DetailsAndRecommendedContainer>
                    <div className="d1">
                      <DetailsComponent newId={newId} />
                    </div>
                    <div className="d2">
                      <AboutDetailsComponent
                        newId={newId}
                        arrDirector={arrDirector}
                        arrProducer={arrProducer}
                        arrDirectorFot={arrDirectorFot}
                        arrWriter={arrWriter}
                        arrComposer={arrComposer}
                      />

                      {!breakpoint630 && newCollectionId && (
                        <CollectionComponent
                          newCollectionId={newCollectionId}
                          allGenres={allGenres}
                        />
                      )}
                    </div>
                  </DetailsAndRecommendedContainer>
                )}
                {breakpoint600 && newCollectionId && !breakpoint450 && (
                  <DescriptionComponent newId={newId} />
                )}
              </div>
            </PosterDetailsRecommendedTrailer>
          </div>
          {breakpoint600 && (
            <DetailsAndRecommendedContainer>
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
                  arrDirector={arrDirector}
                  arrProducer={arrProducer}
                  arrDirectorFot={arrDirectorFot}
                  arrWriter={arrWriter}
                  arrComposer={arrComposer}
                />
              </div>
            </DetailsAndRecommendedContainer>
          )}
          {(breakpoint450 || !newCollectionId) && (
            <DescriptionComponent newId={newId} noMarginTop />
          )}
          {breakpoint630 && newCollectionId && (
            <CollectionComponent
              newCollectionId={newCollectionId}
              allGenres={allGenres}
            />
          )}
          {newSimilarId && (
            <NewSimilarResultsComponent
              newSimilarId={newSimilarId}
              allGenres={allGenres}
              marginTop
            />
          )}
          <TrailerContainer>
            <TrailerMovie id={id} />
          </TrailerContainer>
          {newRecommendedId && (
            <NewRecommendedComponent
              newRecommendedId={newRecommendedId}
              allGenres={allGenres}
              noMarginTop
            />
          )}
        </ContainerDatails>
      )}
    </Main>
  );
}

/* layouts */

function LayoutNoSimilarNoCollection(props) {
  const {
    newId,
    showFormMsg,
    setshowFormMsg,
    errorMessage,
    setFavoriteFunction,
    favorite,
    arrDirector,
    arrProducer,
    arrDirectorFot,
    arrWriter,
    arrComposer,
    allGenres,
    id,
    newRecommendedId,
    breakpoint600,
    breakpoint450,
    loadingFavorite,
  } = props;

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
            <PosterDetailsRecommendedTrailer transform50Poster>
              <div className="poster-details-recommended">
                <PosterAndDescriptionComponent newId={newId} />

                {!breakpoint600 && (
                  <DetailsAndRecommendedContainer>
                    <div className="d1">
                      <DetailsComponent newId={newId} />
                    </div>
                    <div className="d2">
                      <AboutDetailsComponent
                        newId={newId}
                        arrDirector={arrDirector}
                        arrProducer={arrProducer}
                        arrDirectorFot={arrDirectorFot}
                        arrWriter={arrWriter}
                        arrComposer={arrComposer}
                      />
                    </div>
                  </DetailsAndRecommendedContainer>
                )}
              </div>
            </PosterDetailsRecommendedTrailer>
          </div>
          {breakpoint600 && (
            <DetailsAndRecommendedContainer>
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
                  arrDirector={arrDirector}
                  arrProducer={arrProducer}
                  arrDirectorFot={arrDirectorFot}
                  arrWriter={arrWriter}
                  arrComposer={arrComposer}
                />
              </div>
            </DetailsAndRecommendedContainer>
          )}
          <DescriptionComponent newId={newId} noMarginTop />
          <TrailerContainer>
            <TrailerMovie id={id} />
          </TrailerContainer>
          {newRecommendedId && (
            <NewRecommendedComponent
              newRecommendedId={newRecommendedId}
              allGenres={allGenres}
              noMarginTop
            />
          )}
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
      <BgImgPageDetails>
        <img
          src={
            newId.backdrop_path
              ? `https://image.tmdb.org/t/p/original${newId.backdrop_path}`
              : imageError2
          }
          alt={newId.title}
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

function PosterAndDescriptionComponent({ newId, minBreakPoint600 }) {
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
        alt={newId.title}
      />
      <Loading colorVertical />
      {minBreakPoint600 && <DescriptionComponent newId={newId} />}
    </div>
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
      <h1 title={newId.title}>{newId.title}</h1>
      <div className="y-g-f">
        <div className="year-genre-details">
          <span>
            {newId.release_date ? newId.release_date.slice(0, 4) : 'Not data'}
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
  const {
    newId,
    arrDirector,
    arrProducer,
    arrDirectorFot,
    arrWriter,
    arrComposer,
  } = props;

  return (
    <div className="about-details">
      <h4>Sobre o filme</h4>
      <div className="about">
        <div>
          <div>
            <h5>Diretor:</h5>
            <ul>
              {arrDirector.length ? (
                arrDirector
                  .slice(0, 3)
                  .map((value, index) => <li key={index}>{value.name}</li>)
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
                  .map((value, index) => <li key={index}>{value.name}</li>)
              ) : (
                <li>Indisponível</li>
              )}
            </ul>
          </div>
          <div>
            <h5>Diretor de fotografia:</h5>
            <ul>
              {arrDirectorFot.length ? (
                arrDirectorFot
                  .slice(0, 3)
                  .map((value, index) => <li key={index}>{value.name}</li>)
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
                  .map((value, index) => <li key={index}>{value.name}</li>)
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
                  .map((value, index) => <li key={index}>{value.name}</li>)
              ) : (
                <li>Indisponível</li>
              )}
            </ul>
          </div>
          <div>
            <h5>Bilheteria:</h5>
            <ul>
              {newId.revenue ? (
                <li>US$&nbsp;{formatCurrency(newId.revenue)}</li>
              ) : (
                <li>Indisponível</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function CollectionComponent({ allGenres, newCollectionId }) {
  return (
    newCollectionId && (
      <Collections>
        <div className="recommended">
          <h4>{newCollectionId.name}</h4>
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            initialSlide={0}
            spaceBetween={20}
            autoHeight
            slidesPerView={2}
            modules={[Autoplay]}
            breakpoints={{
              2200: { slidesPerView: 5 },
              1700: { slidesPerView: 4 },
              1300: { slidesPerView: 3 },
              925: { slidesPerView: 2 },
              631: { slidesPerView: 1 },
              580: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
            }}
            loop
          >
            {newCollectionId.parts.map((result) => (
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
                        reloadDocument
                        to={`/vertical/filmes/${clearLinkTitle(result.title)}/${
                          result.id
                        }`}
                      >
                        <h3 title={result.title}>{result.title}</h3>
                      </Link>
                      <div className="popular-year-genre">
                        <div className="popular-year-year">
                          {result.release_date
                            ? result.release_date.slice(0, 4)
                            : 'Not data'}
                        </div>
                        <span>&sdot;</span>
                        <div className="popular-genre-genre">
                          {allGenres &&
                            allGenres.genres.map((genre) =>
                              genre.id === result.genre_ids[0] ? genre.name : ''
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
                        to={`/vertical/filmes/${clearLinkTitle(result.title)}/${
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
        </div>
      </Collections>
    )
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

function NewSimilarResultsComponent(props) {
  const { newSimilarId, allGenres, marginTop } = props;

  return (
    <NewSimilarResults marginTop={marginTop}>
      <h4>Resultados de pesquisa semelhantes</h4>
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        initialSlide={0}
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
        {newSimilarId &&
          newSimilarId.results.map((result) => (
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
                      reloadDocument
                      to={`/vertical/filmes/${clearLinkTitle(result.title)}/${
                        result.id
                      }`}
                    >
                      <h3 title={result.title}>{result.title}</h3>
                    </Link>
                    <div className="popular-year-genre">
                      <div className="popular-year-year">
                        {result.release_date
                          ? result.release_date.slice(0, 4)
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
                      to={`/vertical/filmes/${clearLinkTitle(result.title)}/${
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
    </NewSimilarResults>
  );
}

function NewRecommendedComponent(props) {
  const { newRecommendedId, allGenres, noMarginTop } = props;

  return (
    newRecommendedId && (
      <NewRecommended noMarginTop={noMarginTop}>
        <div className="recommended">
          <h4>Filmes recomendados</h4>
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            initialSlide={0}
            spaceBetween={20}
            slidesPerView={2}
            autoHeight
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
            {newRecommendedId.results.map((result, index) => (
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
                        reloadDocument
                        to={`/vertical/filmes/${clearLinkTitle(result.title)}/${
                          result.id
                        }`}
                      >
                        <h3 title={result.title}>{result.title}</h3>
                      </Link>
                      <div className="popular-year-genre">
                        <div className="popular-year-year">
                          {result.release_date
                            ? result.release_date.slice(0, 4)
                            : 'Not data'}
                        </div>
                        <span>&sdot;</span>
                        <div className="popular-genre-genre">
                          {allGenres &&
                            allGenres.genres.map((genre) =>
                              genre.id === result.genre_ids[0] ? genre.name : ''
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
                        to={`/vertical/filmes/${clearLinkTitle(result.title)}/${
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
        </div>
      </NewRecommended>
    )
  );
}
