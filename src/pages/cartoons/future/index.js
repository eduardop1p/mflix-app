/* eslint-disable */
import { useState, useEffect } from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';

import axiosBaseUrlMoviesDiscover from '../../../services/axiosBaseUrlDetailsFilters';
import axiosBaseUrlSeriesDiscover from '../../../services/axiosBaseUrlSeriesDiscover';
import apiConfig from '../../../config/apiConfig';
import GetTrailerMovie from '../../../components/getTrailerMovieForId/index';
import Loading from '../../../components/loadingReactStates/index';
import GetTrailerSerie from '../../../components/getTrailerSerieForId/index';
import imageErrorTop3 from '../../../assets/images/czx7z2e6uqg81.jpg';
import newArrIndex from '../../../config/newArrIndexConfig';
import setDate from '../../../config/setDateConfig';
import removeLoadingSipnner from '../../../config/loadingSpinnerConfig';
import { FutureContainer } from '../../styled';

export default function Future() {
  const [futureAll, setFutureAll] = useState(null);
  const [showFutureAllTrailer, setShowFutureAllTrailer] = useState([]);

  const breakPoint1150 = useMediaQuery({ maxWidth: 1150 });
  const breakPoint950 = useMediaQuery({ maxWidth: 950 });

  useEffect(() => {
    const getAllFuture = async () => {
      try {
        const axiosData1 = await axiosBaseUrlMoviesDiscover.get(
          `?sort_by=popularity.desc&with_genres=16&primary_release_date.gte=${setDate()}&primary_release_date.lte=${setDate(
            200,
            true
          )}&api_key=${apiConfig.apiKey}&language=${apiConfig.language}page=1`
        );
        const data1 = axiosData1.data;

        try {
          const axiosData2 = await axiosBaseUrlSeriesDiscover.get(
            `?sort_by=popularity.desc&with_genres=16&first_air_date.gte=${setDate()}&first_air_date.lte=${setDate(
              200,
              true
            )}&api_key=${apiConfig.apiKey}&language=${apiConfig.language}page=1`
          );
          const data2 = axiosData2.data;
          randomArrMovieSeries(data1, data2);
        } catch (err) {
          console.error('Erro ao pegar series futuras.');
        }
      } catch (err) {
        console.error('Erro ao pegar filmes futuros.');
      }
    };
    getAllFuture();
  }, []);

  function randomArrMovieSeries(futureMoviesArr, futureSeriesArr) {
    const newArr = [...futureMoviesArr.results, ...futureSeriesArr.results];
    const randomArrMovieSeriesPopular = { results: [] };

    newArrIndex.forEach((valueIndex) => {
      randomArrMovieSeriesPopular.results.push(newArr[valueIndex]);
    });

    setFutureAll(randomArrMovieSeriesPopular);
  }

  function onSlideChangeTransitionStartMyFunction(event) {
    if (showFutureAllTrailer[event.activeIndex]) {
      const { showIframe, setShowIframe } =
        showFutureAllTrailer[event.activeIndex];
      if (!showIframe) setShowIframe(true);
    }
  }

  return (
    <FutureContainer>
      <h1>Animações futuras</h1>
      {futureAll && (
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          initialSlide={1}
          autoHeight
          spaceBetween={20}
          slidesPerView={1}
          modules={[Autoplay]}
          breakpoints={{ 1901: { slidesPerView: 2 } }}
          onSlideChangeTransitionStart={onSlideChangeTransitionStartMyFunction}
          loop
        >
          {futureAll.results.map(
            (result, index) =>
              result !== undefined && (
                <SwiperSlide key={result.id}>
                  <div className="future">
                    {!breakPoint950 ? (
                      <FutureMobile
                        result={result}
                        breakPoint1150={breakPoint1150}
                      />
                    ) : (
                      <div className="future-mobile-img-details">
                        <FutureMobile
                          result={result}
                          breakPoint1150={breakPoint1150}
                        />
                      </div>
                    )}

                    <div className="future-trailer-video">
                      {result.title ? (
                        <GetTrailerMovie
                          id={result.id}
                          setShowFutureAllTrailer={setShowFutureAllTrailer}
                          index={index}
                          onLazyIframe
                        />
                      ) : (
                        <GetTrailerSerie
                          id={result.id}
                          setShowFutureAllTrailer={setShowFutureAllTrailer}
                          index={index}
                          onLazyIframe
                        />
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              )
          )}
        </Swiper>
      )}
    </FutureContainer>
  );
}

function FutureMobile(props) {
  const { result, breakPoint1150 } = props;

  return (
    <>
      <div className="future-img">
        <div className="movie-or-serie-future">
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
        <Loading />
      </div>
      <div className="future-details">
        <h3>{result.title ? result.title : result.name}</h3>
        <div className="future-release-date">
          <span>Estreia:</span>
          <span>
            {new Date(
              `${
                result.release_date
                  ? result.release_date
                  : result.first_air_date
              }`
            ).toLocaleDateString('pt-BR', {
              dateStyle: breakPoint1150 ? 'medium' : 'long',
            })}
          </span>
        </div>
        <div className="future-info">
          {!result.overview
            ? 'Não à descrição para este titulo por enquanto.'
            : result.overview}
        </div>
      </div>
    </>
  );
}
