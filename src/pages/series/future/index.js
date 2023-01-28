/* eslint-disable */
import { useState, useEffect } from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';

import axiosBaseUrlSeriesDiscover from '../../../services/axiosBaseUrlSeriesDiscover';
import apiConfig from '../../../config/apiConfig';
import GetTrailerSerie from '../../../components/getTrailerSerieForId/index';
import Loading from '../../../components/loadingReactStates/index';
import imageErrorTop3 from '../../../assets/images/czx7z2e6uqg81.jpg';
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
        const { data } = await axiosBaseUrlSeriesDiscover.get(
          `?sort_by=popularity.desc&first_air_date.gte=${setDate()}&first_air_date.lte=${setDate(
            200,
            true
          )}&api_key=${apiConfig.apiKey}&language=${apiConfig.language}page=1`
        );
        setFutureAll(data);
      } catch (err) {
        console.error('Erro ao pegar series futuras.');
      }
    };
    getAllFuture();
  }, []);

  function onSlideChangeTransitionStartMyFunction(event) {
    if (showFutureAllTrailer[event.activeIndex]) {
      const { showIframe, setShowIframe } =
        showFutureAllTrailer[event.activeIndex];
      if (!showIframe) setShowIframe(true);
    }
  }

  SwiperCore.use(Autoplay);

  return (
    <FutureContainer>
      <h1>Series futuras</h1>
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        initialSlide={1}
        autoHeight
        spaceBetween={20}
        breakpoints={{
          2301: { slidesPerView: 3 },
          1701: { slidesPerView: 2 },
        }}
        onSlideChangeTransitionStart={onSlideChangeTransitionStartMyFunction}
        loop
      >
        {futureAll &&
          futureAll.results.map(
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
                      <GetTrailerSerie
                        id={result.id}
                        setShowFutureAllTrailer={setShowFutureAllTrailer}
                        index={index}
                        onLazyIframe
                      />
                    </div>
                  </div>
                </SwiperSlide>
              )
          )}
      </Swiper>
    </FutureContainer>
  );
}

function FutureMobile(props) {
  const { result, breakPoint1150 } = props;

  return (
    <>
      <div className="future-img">
        <img
          src={
            result.poster_path
              ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
              : imageErrorTop3
          }
          onLoad={removeLoadingSipnner}
          onError={removeLoadingSipnner}
          alt={result.name}
        />
        <Loading />
      </div>
      <div className="future-details">
        <h3>{result.name}</h3>
        <div className="future-release-date">
          Estreia:
          <span>
            {new Date(`${result.first_air_date}`).toLocaleDateString('pt-BR', {
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
