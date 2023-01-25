/* eslint-disable */
import { Component } from 'react';
import { connect } from 'react-redux';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import axiosBaseUrlSeriesDiscover from '../../../services/axiosBaseUrlSeriesDiscover';
import apiConfig from '../../../config/apiConfig';
import GetTrailerSerie from '../../../components/getTrailerSerieForId/index';
import Loading from '../../../components/loadingReactStates/index';
import imageErrorTop3 from '../../../assets/images/czx7z2e6uqg81.jpg';
import setDate from '../../../config/setDateConfig';
import removeLoadingSipnner from '../../../config/loadingSpinnerConfig';
import { FutureContainer } from '../../styled';

class Future extends Component {
  constructor(props) {
    super(props);

    this.useMedia1150 = matchMedia('(max-width: 1150px)');
    this.useMedia950 = matchMedia('(max-width: 950px)');

    this.state = {
      futureAll: null,
      breakPoint1150: this.useMedia1150.matches,
      breakPoint950: this.useMedia950.matches,
    };
  }

  componentDidMount() {
    this.useMedia1150.addEventListener('change', (event) => {
      this.setState({ breakPoint1150: event.matches });
    });
    this.useMedia950.addEventListener('change', (event) => {
      this.setState({ breakPoint950: event.matches });
    });

    const getAllFuture = async () => {
      try {
        const { data } = await axiosBaseUrlSeriesDiscover.get(
          `?sort_by=popularity.desc&first_air_date.gte=${setDate()}&first_air_date.lte=${setDate(
            200,
            true
          )}&api_key=${apiConfig.apiKey}&language=${apiConfig.language}page=1`
        );
        this.setState({
          futureAll: data,
        });
      } catch (err) {
        console.error('Erro ao pegar series futuras.');
      }
    };
    getAllFuture();
  }

  render() {
    SwiperCore.use(Autoplay);

    const { futureAll, breakPoint1150, breakPoint950 } = this.state;

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
          style={{ height: 'auto' }}
          spaceBetween={20}
          breakpoints={{
            2301: { slidesPerView: 3 },
            1701: { slidesPerView: 2 },
          }}
          loop
        >
          {futureAll &&
            futureAll.results.map(
              (result) =>
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
                        <GetTrailerSerie id={result.id} />
                      </div>
                    </div>
                  </SwiperSlide>
                )
            )}
        </Swiper>
      </FutureContainer>
    );
  }
}

class FutureMobile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { result, breakPoint1150 } = this.props;

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
              {new Date(`${result.first_air_date}`).toLocaleDateString(
                'pt-BR',
                {
                  dateStyle: breakPoint1150 ? 'medium' : 'long',
                }
              )}
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
}

export default Future;
