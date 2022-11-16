/* eslint-disable */
import { Component } from 'react';
import { connect } from 'react-redux';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as actions from '../../../storeReactRedux/modules/loading/actions';
import axiosFutureMovies from '../../../services/axiosBaseUrlDetailsFilters';
import apiConfig from '../../../config/apiConfig';
import GetTrailerMovie from '../../../components/getTrailerMovieForId/index';
import Loading from '../../../components/loadingReactStates/index';
import imageErrorTop3 from '../../../assets/images/czx7z2e6uqg81.jpg';
import { FutureContainer } from '../../styled';

class Future extends Component {
  constructor(props) {
    super(props);

    this.useMedia1900 = matchMedia('(min-width: 1900px)');
    this.useMedia1150 = matchMedia('(max-width: 1150px)');
    this.useMedia950 = matchMedia('(max-width: 950px)');

    this.state = {
      futureAll: null,
      breakPoint1900: this.useMedia1900.matches,
      breakPoint1150: this.useMedia1150.matches,
      breakPoint950: this.useMedia950.matches,
    };
  }

  componentDidMount() {
    this.useMedia1900.addEventListener('change', (event) => {
      this.setState({ breakPoint1900: event.matches });
    });
    this.useMedia1150.addEventListener('change', (event) => {
      this.setState({ breakPoint1150: event.matches });
    });
    this.useMedia950.addEventListener('change', (event) => {
      this.setState({ breakPoint950: event.matches });
    });

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
        const { data } = await axiosFutureMovies.get(
          `?sort_by=popularity.desc&primary_release_date.gte=${date()}&primary_release_date.lte=${date(
            200
          )}&api_key=${apiConfig.apiKey}&language=${apiConfig.language}page=1`
        );
        this.setState({
          futureAll: data,
        });
      } catch (err) {
        console.error('Erro ao pegar filmes futuros.');
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
    if (!loadingSpinner) return;
    return loadingSpinner.remove();
  }

  render() {
    const { futureAll, breakPoint1900, breakPoint1150, breakPoint950 } =
      this.state;

    return (
      <FutureContainer>
        <h1>Filmes futuros</h1>
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          style={{ height: 'auto' }}
          spaceBetween={20}
          slidesPerView={breakPoint1900 ? 2 : 1}
          loop
        >
          {futureAll &&
            futureAll.results.map(
              (result) =>
                result !== undefined && (
                  <SwiperSlide key={result.id}>
                    <div className="future">
                      {!breakPoint950 ? (
                        <>
                          <div className="future-img">
                            <img
                              src={
                                result.poster_path
                                  ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                                  : imageErrorTop3
                              }
                              onLoad={this.removeLoadingSipnner}
                              onError={this.removeLoadingSipnner}
                              alt={result.title}
                            />
                            <Loading />
                          </div>
                          <div className="future-details">
                            <h3>{result.title}</h3>
                            <div className="future-release-date">
                              Estreia:
                              <span>
                                {new Date(
                                  `${result.release_date}`
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
                      ) : (
                        <div className="future-mobile-img-details">
                          <div className="future-img">
                            <img
                              src={
                                result.poster_path
                                  ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                                  : imageErrorTop3
                              }
                              onLoad={this.removeLoadingSipnner}
                              onError={this.removeLoadingSipnner}
                              alt={result.title}
                            />
                            <Loading />
                          </div>
                          <div className="future-details">
                            <h3>{result.title}</h3>
                            <div className="future-release-date">
                              Estreia:
                              <span>
                                {new Date(
                                  `${result.release_date}`
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
                        </div>
                      )}

                      <div className="future-trailer-video">
                        <GetTrailerMovie id={result.id} />
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
