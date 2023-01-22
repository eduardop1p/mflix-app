/* eslint-disable */
import { Link, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axiosRetry from 'axios-retry';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';

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
  ImagesContainer,
  Collections,
  News,
  TrailerContainer,
  MidiaFilesCollectionContainer,
  Description,
  FavoriteContainer,
  DetailsAndSimilarContainer,
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
  const [imagesPostersLogos, setImagesPostersLogos] = useState(null);
  const [arrProducer, setArrProducer] = useState([]);
  const [arrDirector, setArrDirector] = useState([]);
  const [arrDirectorFot, setArrDirectorFot] = useState([]);
  const [arrWriter, setArrWriter] = useState([]);
  const [arrComposer, setArrComposer] = useState([]);
  const [imageButtonActived, setImageButtonActived] = useState(true);
  const [posterButtonActived, setPosterButtonActived] = useState(false);
  const [logoButtonActived, setLogoButtonActived] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showFormMsg, setshowFormMsg] = useState(false);
  const [primaryRender, setPrimaryRender] = useState(true);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  const breakpoint1000 = useMediaQuery({ maxWidth: 1000 });
  const breakpoint630 = useMediaQuery({ maxWidth: 630 });
  const breakpoint600 = useMediaQuery({ maxWidth: 600 });
  const breakpoint500 = useMediaQuery({ maxWidth: 500 });
  const breakpoint400 = useMediaQuery({ maxWidth: 400 });

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
        if (data.backdrops.length) setFiles(data);
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
    if (favoriteUser && newId && allGenres && news && id && loadingApp) {
      setTimeout(() => {
        dispatch(actions.loadingFailure());
      }, 500);
    }
    if (files && primaryRender) {
      setPrimaryRender(false);
      manageImagesPostersLogos('images');
    }
  }, [
    favoriteUser,
    newId,
    allGenres,
    news,
    files,
    primaryRender,
    id,
    loadingApp,
  ]);

  function manageImagesPostersLogos(nameEvent) {
    if (!files) return;

    setImageButtonActived(false);
    setPosterButtonActived(false);
    setLogoButtonActived(false);

    if (nameEvent === 'images') {
      setImageButtonActived(true);
      setImagesPostersLogos(files.backdrops.slice(0, 10));
      return;
    }
    if (nameEvent === 'posters') {
      setPosterButtonActived(true);
      setImagesPostersLogos(files.posters.slice(0, 10));
      return;
    }
    if (nameEvent === 'logos') {
      setLogoButtonActived(true);
      setImagesPostersLogos(files.logos.slice(0, 10));
      return;
    }
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

    // if (postPromisePending && favorite) {
    //   abortControllerPost.abort();
    //   return;
    // }
    // if (deletePromisePending && !favorite) {
    //   abortControllerDelete.abort();
    //   return;
    // }

    if (favorite) {
      setFavorite(false);

      try {
        // console.log('removendo item...');
        setLoadingFavorite(true);

        await axiosUserBaseUrl.delete(
          `/minha-lista/${user.id}?ids=${favoriteUser.id}`
        );
        // console.log('item removido!');
      } catch (err) {
        // if (axios.isCancel(err)) {
        //   console.log('requisição DELETE cancelada!');
        //   return;
        // }

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
        // console.log('adcionando item...');
        setLoadingFavorite(true);

        await axiosUserBaseUrl.post(`/minha-lista/${user.id}`, {
          id: id + midiaType,
          midiaType,
        });
        // console.log('item adcionado!');
      } catch (err) {
        // if (axios.isCancel(err)) {
        //   console.log('requisição POST cancelada!');
        //   return;
        // }

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

  SwiperCore.use(Autoplay);

  if (newSimilarId && files && !newCollectionId)
    return (
      <LayoutNoCollection
        showFormMsg={showFormMsg}
        newId={newId}
        newSimilarId={newSimilarId}
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
        news={news}
        imagesPostersLogos={imagesPostersLogos}
        imageButtonActived={imageButtonActived}
        posterButtonActived={posterButtonActived}
        logoButtonActived={logoButtonActived}
        manageImagesPostersLogos={manageImagesPostersLogos}
        breakpoint1000={breakpoint1000}
        breakpoint630={breakpoint630}
        breakpoint600={breakpoint600}
        breakpoint500={breakpoint500}
        breakpoint400={breakpoint400}
        loadingFavorite={loadingFavorite}
      />
    );

  if (!newSimilarId && !files && !newCollectionId)
    return (
      <LayoutNoSimilarNofilesNoCollection
        showFormMsg={showFormMsg}
        newId={newId}
        newSimilarId={newSimilarId}
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
        news={news}
        breakpoint600={breakpoint600}
        breakpoint500={breakpoint500}
        breakpoint400={breakpoint400}
        loadingFavorite={loadingFavorite}
      />
    );

  if (files && !newSimilarId && !newCollectionId)
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
        news={news}
        imagesPostersLogos={imagesPostersLogos}
        imageButtonActived={imageButtonActived}
        posterButtonActived={posterButtonActived}
        logoButtonActived={logoButtonActived}
        manageImagesPostersLogos={manageImagesPostersLogos}
        loadingFavorite={loadingFavorite}
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

      {newId && (
        <ContainerDatails newCollectionId newSimilarId>
          {!breakpoint400 && (
            <FavoriteComponent
              setFavoriteFunction={setFavoriteFunction}
              favorite={favorite}
            />
          )}
          <div className="d0">
            <PosterDetailsSimilarTrailer newCollectionId newSimilarId>
              <div className="poster-details-similar">
                <PosterAndDescriptionComponent
                  newId={newId}
                  isActiveDescription
                  breakpoint600={breakpoint600}
                />
                {!breakpoint600 && (
                  <DetailsAndSimilarContainer>
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

                      {!breakpoint630 && (
                        <NewSimilarComponent
                          newSimilarId={newSimilarId}
                          allGenres={allGenres}
                        />
                      )}
                    </div>
                  </DetailsAndSimilarContainer>
                )}
                {breakpoint600 && !breakpoint500 && (
                  <DescriptionComponent newId={newId} />
                )}
              </div>
              {!breakpoint1000 && (
                <TrailerContainer>
                  <TrailerMovie id={id} loadingDetails="eager" />
                </TrailerContainer>
              )}
            </PosterDetailsSimilarTrailer>
            {!breakpoint1000 && (
              <MidiaFilesCollectionComponent>
                <ImagesComponent
                  imageButtonActived={imageButtonActived}
                  posterButtonActived={posterButtonActived}
                  logoButtonActived={logoButtonActived}
                  newCollectionId={newCollectionId}
                  imagesPostersLogos={imagesPostersLogos}
                  manageImagesPostersLogos={manageImagesPostersLogos}
                />
                <CollectionComponent
                  allGenres={allGenres}
                  newCollectionId={newCollectionId}
                />
              </MidiaFilesCollectionComponent>
            )}
          </div>
          {breakpoint600 && (
            <DetailsAndSimilarContainer>
              <div className="d1">
                <DetailsComponent
                  newId={newId}
                  breakpoint400={breakpoint400}
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
            </DetailsAndSimilarContainer>
          )}
          {breakpoint500 && <DescriptionComponent newId={newId} />}

          {breakpoint630 && (
            <NewSimilarComponent
              newSimilarId={newSimilarId}
              allGenres={allGenres}
            />
          )}
          {breakpoint1000 && (
            <MidiaFilesCollectionComponent
              no15Rem
              setHeight
              height100
              width50
              width50NextDivChildren
            >
              <ImagesComponent
                imageButtonActived={imageButtonActived}
                posterButtonActived={posterButtonActived}
                logoButtonActived={logoButtonActived}
                newCollectionId={newCollectionId}
                imagesPostersLogos={imagesPostersLogos}
                manageImagesPostersLogos={manageImagesPostersLogos}
              />
              <CollectionComponent
                allGenres={allGenres}
                newCollectionId={newCollectionId}
              />
            </MidiaFilesCollectionComponent>
          )}
          {breakpoint1000 && (
            <TrailerContainer setHeight>
              <TrailerMovie id={id} loadingDetails="eager" />
            </TrailerContainer>
          )}
          <NewComponent news={news} allGenres={allGenres} marginTop />
        </ContainerDatails>
      )}
    </Main>
  );
}

/* layouts */

function LayoutNoCollection(props) {
  const {
    newId,
    newSimilarId,
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
    news,
    imagesPostersLogos,
    imageButtonActived,
    posterButtonActived,
    logoButtonActived,
    manageImagesPostersLogos,
    breakpoint1000,
    breakpoint630,
    breakpoint600,
    breakpoint500,
    breakpoint400,
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
        <ContainerDatails newSimilarId>
          {!breakpoint400 && (
            <FavoriteComponent
              setFavoriteFunction={setFavoriteFunction}
              favorite={favorite}
            />
          )}
          <div className="d0">
            <PosterDetailsSimilarTrailer newSimilarId width100>
              <div className="poster-details-similar">
                <PosterAndDescriptionComponent
                  newId={newId}
                  isActiveDescription
                />
                {!breakpoint600 && (
                  <DetailsAndSimilarContainer
                    width50AndFlexNone={breakpoint1000 ? false : true}
                  >
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

                      {!breakpoint630 && (
                        <NewSimilarComponent
                          newSimilarId={newSimilarId}
                          allGenres={allGenres}
                        />
                      )}
                    </div>
                  </DetailsAndSimilarContainer>
                )}
                {breakpoint600 && !breakpoint500 && (
                  <DescriptionComponent newId={newId} />
                )}
                {!breakpoint1000 && (
                  <MidiaFilesCollectionComponent height100 setHeight autoHeight>
                    <ImagesComponent
                      imageButtonActived={imageButtonActived}
                      posterButtonActived={posterButtonActived}
                      logoButtonActived={logoButtonActived}
                      imagesPostersLogos={imagesPostersLogos}
                      manageImagesPostersLogos={manageImagesPostersLogos}
                    />
                  </MidiaFilesCollectionComponent>
                )}
              </div>
            </PosterDetailsSimilarTrailer>
          </div>
          {breakpoint600 && (
            <DetailsAndSimilarContainer>
              <div className="d1">
                <DetailsComponent
                  newId={newId}
                  breakpoint400={breakpoint400}
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
            </DetailsAndSimilarContainer>
          )}
          {breakpoint500 && <DescriptionComponent newId={newId} />}
          {breakpoint630 && (
            <NewSimilarComponent
              newSimilarId={newSimilarId}
              allGenres={allGenres}
            />
          )}
          {breakpoint1000 ? (
            <MidiaFilesCollectionComponent
              no15Rem
              height100
              setHeight
              width100NextDivChildren
              noNewCollectionId
            >
              <TrailerContainer>
                <TrailerMovie id={id} loadingDetails="eager" />
              </TrailerContainer>
              <ImagesComponent
                imageButtonActived={imageButtonActived}
                posterButtonActived={posterButtonActived}
                logoButtonActived={logoButtonActived}
                imagesPostersLogos={imagesPostersLogos}
                manageImagesPostersLogos={manageImagesPostersLogos}
                noNewCollectionId
              />
            </MidiaFilesCollectionComponent>
          ) : (
            <TrailerContainer setHeight>
              <TrailerMovie id={id} loadingDetails="eager" />
            </TrailerContainer>
          )}

          <NewComponent news={news} allGenres={allGenres} />
        </ContainerDatails>
      )}
    </Main>
  );
}

function LayoutNoSimilarNofilesNoCollection(props) {
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
    news,
    breakpoint600,
    breakpoint500,
    breakpoint400,
    loadingFavorite,
  } = props;

  const minBreakPoint721 = useMediaQuery({ minWidth: 721 });
  const breakpoint720 = useMediaQuery({ maxWidth: 720 });

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
        <ContainerDatails newSimilarId>
          {!breakpoint400 && (
            <FavoriteComponent
              setFavoriteFunction={setFavoriteFunction}
              favorite={favorite}
            />
          )}
          <div className="d0">
            <PosterDetailsSimilarTrailer width100>
              <div className="poster-details-similar">
                <PosterAndDescriptionComponent
                  newId={newId}
                  isActiveDescription={breakpoint720 ? true : false}
                />
                {breakpoint600 && !breakpoint500 && (
                  <DescriptionComponent newId={newId} />
                )}
                {!breakpoint600 && (
                  <DetailsAndSimilarContainer noMarginBottom>
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
                  breakpoint400={breakpoint400}
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
            </DetailsAndSimilarContainer>
          )}
          {(breakpoint500 || minBreakPoint721) && (
            <DescriptionComponent newId={newId} noMarginTop />
          )}
          <TrailerContainer setHeight marginTop>
            <TrailerMovie id={id} loadingDetails="eager" />
          </TrailerContainer>
          <NewComponent news={news} allGenres={allGenres} marginTop />
        </ContainerDatails>
      )}
    </Main>
  );
}

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
    news,
    imagesPostersLogos,
    imageButtonActived,
    posterButtonActived,
    logoButtonActived,
    manageImagesPostersLogos,
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
          <FavoriteComponent
            setFavoriteFunction={setFavoriteFunction}
            favorite={favorite}
          />
          <div className="d0">
            <PosterDetailsSimilarTrailer width100>
              <div className="poster-details-similar">
                <PosterAndDescriptionComponent newId={newId} />
                <DetailsAndSimilarContainer>
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
                </DetailsAndSimilarContainer>
              </div>
            </PosterDetailsSimilarTrailer>
          </div>
          <DescriptionComponent newId={newId} />
          <div className="trailer-and-images">
            <TrailerContainer>
              <TrailerMovie id={id} loadingDetails="eager" />
            </TrailerContainer>
            <MidiaFilesCollectionComponent no15Rem height100 width50>
              <ImagesComponent
                imageButtonActived={imageButtonActived}
                posterButtonActived={posterButtonActived}
                logoButtonActived={logoButtonActived}
                imagesPostersLogos={imagesPostersLogos}
                manageImagesPostersLogos={manageImagesPostersLogos}
              />
            </MidiaFilesCollectionComponent>
          </div>

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
        <title>{`MFLIX - ${newId.title}`}</title>
      </Helmet>
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

function MidiaFilesCollectionComponent({
  children,
  newCollectionId,
  files,
  width100,
  setHeight,
  no15Rem,
  height100,
  width50NextDivChildren,
  width60NextDivChildren,
  width100NextDivChildren,
  autoHeight,
  noNewCollectionId,
}) {
  if (autoHeight)
    return (
      <MidiaFilesCollectionContainerAutoHeight
        childrenComponent={children}
        newCollectionId={newCollectionId}
        files={files}
        width100={width100}
        setHeight={setHeight}
        no15Rem={no15Rem}
        height100={height100}
        width50NextDivChildren={width50NextDivChildren}
        autoHeight={autoHeight}
        width60NextDivChildren={width60NextDivChildren}
      />
    );

  return (
    <MidiaFilesCollectionContainer
      newCollectionId={newCollectionId}
      files={files}
      width100={width100}
      setHeight={setHeight}
      no15Rem={no15Rem}
      height100={height100}
      width50NextDivChildren={width50NextDivChildren}
      width60NextDivChildren={width60NextDivChildren}
      width100NextDivChildren={width100NextDivChildren}
      noNewCollectionId={noNewCollectionId}
    >
      {children}
    </MidiaFilesCollectionContainer>
  );
}

function MidiaFilesCollectionContainerAutoHeight(props) {
  const {
    childrenComponent,
    newCollectionId,
    files,
    width100,
    setHeight,
    no15Rem,
    height100,
    width50NextDivChildren,
  } = props;

  const [MFCContinerHeigth, setMFCContinerHeigth] = useState('450px');

  useEffect(() => {
    autoHeight();

    window.onresize = () => autoHeight();
  });

  function autoHeight() {
    const D2 = document.querySelector('.d2');

    const getD2Height = window.getComputedStyle(D2).height;
    setMFCContinerHeigth(getD2Height);
  }

  return (
    <MidiaFilesCollectionContainer
      newCollectionId={newCollectionId}
      files={files}
      width100={width100}
      setHeight={setHeight}
      no15Rem={no15Rem}
      height100={height100}
      width50NextDivChildren={width50NextDivChildren}
      id="m-f-c-container"
      style={{ height: MFCContinerHeigth }}
    >
      {childrenComponent}
    </MidiaFilesCollectionContainer>
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

function ImagesComponent(props) {
  const {
    imageButtonActived,
    posterButtonActived,
    logoButtonActived,
    newCollectionId,
    imagesPostersLogos,
    manageImagesPostersLogos,
    noNewCollectionId,
  } = props;

  const [btnImgPostersLogosHeight, setBtnImgPostersLogosHeight] = useState(20);

  const btnImgPostersLogos = document.querySelector('.btn-img-posters-logos');

  useEffect(() => {
    if (btnImgPostersLogos) {
      setBtnImgPostersLogosHeight(btnImgPostersLogos.clientHeight);
      window.onresize = () =>
        setBtnImgPostersLogosHeight(btnImgPostersLogos.clientHeight);
    }
  }, [btnImgPostersLogos, btnImgPostersLogosHeight]);

  return (
    <ImagesContainer
      imageButtonActived={imageButtonActived}
      posterButtonActived={posterButtonActived}
      logoButtonActived={logoButtonActived}
      newCollectionId={newCollectionId}
      noNewCollectionId={noNewCollectionId}
    >
      <div className="btn-img-posters-logos">
        <button
          onClick={() => manageImagesPostersLogos('images')}
          className="images"
        >
          Fotos
        </button>
        <button
          onClick={() => manageImagesPostersLogos('posters')}
          className="posters"
        >
          Posters
        </button>
        <button
          onClick={() => manageImagesPostersLogos('logos')}
          className="logos"
        >
          Logos
        </button>
      </div>
      <div
        className="pqp-eduardo-lavoura"
        style={{ height: `calc(100% - ${btnImgPostersLogosHeight + 4}px)` }}
      >
        {imagesPostersLogos && imagesPostersLogos.length ? (
          imagesPostersLogos.map((pqp, index) => (
            <div key={pqp.file_path}>
              <img
                src={`https://image.tmdb.org/t/p/w1280${pqp.file_path}`}
                alt={'static-img-' + [index + 1]}
              />
            </div>
          ))
        ) : (
          <div className="no-fotos-posters-logos">
            <img src={imageError2} />
          </div>
        )}
      </div>
    </ImagesContainer>
  );
}

function CollectionComponent({ allGenres, newCollectionId }) {
  if (!newCollectionId) return;

  const [titleCollectionHeight, setTitleCollectionHeight] = useState(20);

  const titleCollection = document.querySelector('#title-collection');

  useEffect(() => {
    if (!titleCollection) return;
    if (titleCollectionHeight !== titleCollection.clientHeight) {
      setTitleCollectionHeight(titleCollection.clientHeight);
      window.onresize = () =>
        setTitleCollectionHeight(titleCollection.clientHeight);
    }
  }, [titleCollectionHeight, titleCollection]);

  return (
    <Collections>
      <h4 id="title-collection">{newCollectionId.name}</h4>
      <div
        className="collection"
        style={{ height: `calc(100% - ${titleCollectionHeight + 4}px)` }}
      >
        {newCollectionId &&
          newCollectionId.parts.map((result) => (
            <div key={result.id} className="vertical-popular-img-details">
              <div>
                <img
                  src={
                    result.poster_path
                      ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                      : imageError1
                  }
                  alt={result.title}
                />
                <div>
                  <Link
                    reloadDocument
                    to={`/vertical/filmes/${clearLinkTitle(result.title)}/${
                      result.id
                    }`}
                  >
                    <button>Assistir</button>
                  </Link>
                </div>
              </div>
              <div className="popular-conatiner-details">
                <Link
                  reloadDocument
                  to={`/vertical/filmes/${clearLinkTitle(result.title)}/${
                    result.id
                  }`}
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
                        genre.id === result.genre_ids[0] ? genre.name : ''
                      )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Collections>
  );
}

function NewSimilarComponent(props) {
  const { newSimilarId, allGenres, noNewCollectionId } = props;

  return (
    newSimilarId && (
      <NewSimilar noNewCollectionId={noNewCollectionId}>
        <div className="similar">
          <h4>Filmes recomendados</h4>
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
              2200: { slidesPerView: 4 },
              1700: { slidesPerView: 3 },
              1331: { slidesPerView: 2 },
              1050: { slidesPerView: 3 },
              1001: { slidesPerView: 1 },
              926: { slidesPerView: 2 },
              801: { slidesPerView: 3 },
              631: { slidesPerView: 1 },
              501: { slidesPerView: 3 },
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
                          {result.release_date &&
                            result.release_date.slice(0, 4)}
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
      </NewSimilar>
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

function NewComponent(props) {
  const { news, allGenres, marginTop } = props;

  return (
    <News marginTop={marginTop}>
      <h4>Novos filmes</h4>
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
        breakpoints={{
          2250: { slidesPerView: 6 },
          1800: { slidesPerView: 5 },
          1320: { slidesPerView: 4 },
          901: { slidesPerView: 3 },
          631: { slidesPerView: 2 },
          501: { slidesPerView: 3 },
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
    </News>
  );
}

function DetailsComponent({
  newId,
  setFavoriteFunction,
  favorite,
  breakpoint400,
}) {
  return (
    <>
      <h1 title={newId.title}>{newId.title}</h1>
      <div className="y-g-f">
        <div className="year-genre-details">
          <span>
            {newId.release_date && newId.release_date.slice(0, 4)}
            {!newId.release_date && 'Not data'}
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
        {breakpoint400 && (
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
              <li>US$&nbsp;{formatCurrency(newId.revenue)}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function PosterAndDescriptionComponent({
  newId,
  isActiveDescription,
  breakpoint600,
}) {
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
      {isActiveDescription && !breakpoint600 && (
        <DescriptionComponent newId={newId} />
      )}
    </div>
  );
}
