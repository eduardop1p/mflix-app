/* eslint-disable */
import { Component } from 'react';
import { connect } from 'react-redux';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as actions from '../../../storeReactRedux/modules/loading/actions';
import axiosBaseUrlMoviesDiscover from '../../../services/axiosBaseUrlDetailsFilters';
import axiosBaseUrlSeriesDiscover from '../../../services/axiosBaseUrlSeriesDiscover';
import apiConfig from '../../../config/apiConfig';
import GetTrailerMovie from '../../../components/getTrailerMovieForId/index';
import Loading from '../../../components/loadingReactStates/index';
import GetTrailerSerie from '../../../components/getTrailerSerieForId/index';
import imageErrorTop3 from '../../../assets/images/czx7z2e6uqg81.jpg';
import newArrIndex from '../../../config/newArrIndexConfig';
import { FutureContainer } from '../../styled';

class Future extends Component {
  constructor(props) {
    super(props);

    this.useMedia1150 = matchMedia('(max-width: 1150px)');
    this.useMedia950 = matchMedia('(max-width: 950px)');

    this.state = {
      futureAll: null,
      futureMoviesArr: null,
      futureSeriesArr: null,
      breakPoint1150: this.useMedia1150.matches,
      breakPoint950: this.useMedia950.matches,
    };

    this.randomArrMovieSeries = this.randomArrMovieSeries.bind(this);
  }

  componentDidMount() {
    this.useMedia1150.addEventListener('change', (event) => {
      this.setState({ breakPoint1150: event.matches });
    });
    this.useMedia950.addEventListener('change', (event) => {
      this.setState({ breakPoint950: event.matches });
    });

    SwiperCore.use(Autoplay);

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
        const axiosData1 = await axiosBaseUrlMoviesDiscover.get(
          `?sort_by=popularity.desc&with_genres=16&primary_release_date.gte=${date()}&primary_release_date.lte=${date(
            200
          )}&api_key=${apiConfig.apiKey}&language=${apiConfig.language}page=1`
        );
        const data1 = axiosData1.data;

        try {
          const axiosData2 = await axiosBaseUrlSeriesDiscover.get(
            `?sort_by=popularity.desc&with_genres=16&first_air_date.gte=${date()}&first_air_date.lte=${date(
              200
            )}&api_key=${apiConfig.apiKey}&language=${apiConfig.language}page=1`
          );
          const data2 = axiosData2.data;
          this.setState(
            {
              futureMoviesArr: data1,
              futureSeriesArr: data2,
            },
            this.randomArrMovieSeries
          );
        } catch (err) {
          console.error('Erro ao pegar series futuras.');
        }
      } catch (err) {
        console.error('Erro ao pegar filmes futuros.');
      }
    };
    getAllFuture();
  }

  componentDidUpdate() {
    const { loadBgHeader } = this.props;
    const { futureAll } = this.state;

    if (loadBgHeader && futureAll) {
      setTimeout(() => this.props.loadingFailure(), 500);
    }
  }
  randomArrMovieSeries() {
    const { futureMoviesArr, futureSeriesArr } = this.state;

    const newArr = [...futureMoviesArr.results, ...futureSeriesArr.results];
    const randomArrMovieSeriesPopular = { results: [] };

    newArrIndex.forEach((valueIndex) => {
      randomArrMovieSeriesPopular.results.push(newArr[valueIndex]);
    });

    this.setState({
      futureAll: randomArrMovieSeriesPopular,
    });
  }

  removeLoadingSipnner(event) {
    const loadingSpinner = event.target.parentElement.querySelector(
      'img + .container-load'
    );
    if (!loadingSpinner) return;

    return loadingSpinner.remove();
  }

  render() {
    const { futureAll, breakPoint1150, breakPoint950 } = this.state;

    return (
      <FutureContainer>
        <h1>Animações futuras</h1>
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          initialSlide={1}
          style={{ height: 'auto' }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 1901: { slidesPerView: 2 } }}
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
                          thisParentClass={this}
                          result={result}
                          breakPoint1150={breakPoint1150}
                        />
                      ) : (
                        <div className="future-mobile-img-details">
                          <FutureMobile
                            thisParentClass={this}
                            result={result}
                            breakPoint1150={breakPoint1150}
                          />
                        </div>
                      )}

                      <div className="future-trailer-video">
                        {result.title ? (
                          <GetTrailerMovie id={result.id} />
                        ) : (
                          <GetTrailerSerie id={result.id} />
                        )}
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
    const { thisParentClass, result, breakPoint1150 } = this.props;

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
            onLoad={thisParentClass.removeLoadingSipnner}
            onError={thisParentClass.removeLoadingSipnner}
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
}

const mapStateToProps = (state) => {
  return {
    loadBgHeader: state.loadBgHeader.loadBgHeader,
  };
};

export default connect(mapStateToProps, actions)(Future);
