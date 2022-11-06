/* eslint-disable */
import { Component } from 'react';
import { connect } from 'react-redux';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as actions from '../../../storeReactRedux/modules/loading/actions';
import axiosBaseUrlSeriesDiscover from '../../../services/axiosBaseUrlSeriesDiscover';
import apiConfig from '../../../config/apiConfig';
import GetTrailerSerie from '../../../components/getTrailerSerieForId/index';
import Loading from '../../../components/loadingReactStates/index';
import imageErrorTop3 from '../../../assets/images/czx7z2e6uqg81.jpg';
import { FutureContainer } from '../../styled';

class Future extends Component {
  constructor(props) {
    super(props);

    this.state = {
      futureAll: null,
    };
  }

  componentDidMount() {
    const date = (past7Day = 0) => {
      const date = new Date();
      date.setDate(date.getDate() + past7Day);

      const zeroLeft = (num) => (num < 10 ? `0${num}` : num);

      return `${date.getFullYear()}-${zeroLeft(date.getMonth() + 1)}-${zeroLeft(
        date.getDate()
      )}`;
    };
    const getAllFuture = async () => {
      try {
        const { data } = await axiosBaseUrlSeriesDiscover.get(
          `?sort_by=popularity.desc&first_air_date.gte=${date()}&first_air_date.lte=${date(
            200
          )}&api_key=${apiConfig.apiKey}&language=${apiConfig.language}page=1`
        );
        this.setState({
          futureAll: data,
        });
      } catch (err) {
        console.error('Erro ao pegar series futuras.');
      }
    };
    SwiperCore.use(Autoplay);
    getAllFuture();
  }

  componentDidUpdate() {
    const { loadBgHeader } = this.props;
    const { futureAll } = this.state;

    if (loadBgHeader && futureAll) {
      setTimeout(() => this.props.loadingFailure(), 500);
    }
  }

  removeLoadingSipnner(event) {
    const loadingSpinner = event.target.parentElement.querySelector(
      'img + .container-load'
    );
    return loadingSpinner.remove();
  }

  render() {
    const { futureAll } = this.state;

    return (
      <FutureContainer>
        <h1>Series futuras</h1>
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          style={{ height: '450px' }}
          spaceBetween={40}
          slidesPerView={1}
          loop
        >
          {futureAll &&
            futureAll.results.map(
              (result) =>
                result !== undefined && (
                  <SwiperSlide key={result.id}>
                    <div className="future">
                      <div className="future-img">
                        <img
                          src={
                            result.poster_path
                              ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                              : imageErrorTop3
                          }
                          onLoad={this.removeLoadingSipnner}
                          onError={this.removeLoadingSipnner}
                          alt={result.name}
                        />
                        <Loading />
                      </div>
                      <div className="future-details">
                        <h3>{result.name}</h3>
                        <div className="future-release-date">
                          Lançamento:
                          <span>
                            {new Date(
                              `${result.first_air_date}`
                            ).toLocaleDateString('pt-BR', {
                              dateStyle: 'long',
                            })}
                          </span>
                        </div>
                        <div className="future-info">
                          {!result.overview
                            ? 'Não à descrição para este titulo por enquanto.'
                            : result.overview}
                        </div>
                      </div>
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

const mapStateToProps = (state) => {
  return {
    loadBgHeader: state.loadBgHeader.loadBgHeader,
  };
};

export default connect(mapStateToProps, actions)(Future);
