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
import { FutureM } from './styled';

class FutureMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      futureAllMovies: null,
      futureMoviesArr: null,
      futureSeriesArr: null,
    };

    this.randomArrMovieSeries = this.randomArrMovieSeries.bind(this);
  }

  componentDidMount() {
    SwiperCore.use(Autoplay);

    const date = (past7Day = 0) => {
      const date = new Date();
      date.setDate(date.getDate() + past7Day);

      const zeroLeft = (num) => (num < 10 ? `0${num}` : num);

      return `${date.getFullYear()}-${zeroLeft(date.getMonth() + 1)}-${zeroLeft(
        date.getDate()
      )}`;
    };
    const getAllFutureMovies = async () => {
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
    getAllFutureMovies();
  }

  componentDidUpdate() {
    const { loadBgHeader, loadUserPhoto } = this.props;
    const { futureAllMovies } = this.state;

    if (loadBgHeader && loadUserPhoto && futureAllMovies) {
      setTimeout(() => this.props.loadingFailure(), 500);
    }
  }
  randomArrMovieSeries() {
    const { futureMoviesArr, futureSeriesArr } = this.state;

    const newArr = [...futureMoviesArr.results, ...futureSeriesArr.results];
    const randomArrMovieSeriesPopular = { results: [] };
    const newArrIndex = [
      1, 20, 9, 2, 14, 21, 28, 17, 12, 16, 6, 32, 0, 13, 4, 3, 8, 25, 10, 23,
      37, 5, 24, 35, 36, 27, 22, 30, 26, 31, 38, 34, 18, 19, 11, 29, 7, 33, 15,
      39,
    ];

    newArrIndex.forEach((valueIndex) => {
      randomArrMovieSeriesPopular.results.push(newArr[valueIndex]);
    });

    this.setState({
      futureAllMovies: randomArrMovieSeriesPopular,
    });
  }

  removeLoadingSipnner(event) {
    const loadingSpinner = event.target.parentElement.querySelector(
      'img + .container-load'
    );
    return loadingSpinner.remove();
  }

  render() {
    const { futureAllMovies } = this.state;

    return (
      <FutureM>
        <h1>Animações&nbsp;futuras</h1>
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
          {futureAllMovies &&
            futureAllMovies.results.map((result) => (
              <SwiperSlide key={result.id}>
                <div className="futureMovie">
                  <div className="future-movies-img">
                    <img
                      src={
                        result.poster_path
                          ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                          : imageErrorTop3
                      }
                      onLoad={this.removeLoadingSipnner}
                      onError={this.removeLoadingSipnner}
                      alt={result.title ? result.title : result.name}
                    />
                    <Loading />
                  </div>
                  <div className="future-movies-details">
                    <h3>{result.title ? result.title : result.name}</h3>
                    <div className="future-movies-release-date">
                      <span>{result.title ? 'Filme,' : 'Serie,'}</span>
                      <span>Lançamento:</span>
                      <span>
                        {new Date(
                          `${
                            result.release_date
                              ? result.release_date
                              : result.first_air_date
                          }`
                        ).toLocaleDateString('pt-BR', {
                          dateStyle: 'long',
                        })}
                      </span>
                    </div>
                    <div className="future-movies-info">
                      {!result.overview
                        ? 'Não à descrição para este titulo por enquanto.'
                        : result.overview}
                    </div>
                  </div>
                  <div className="future-movies-trailer-video">
                    {result.title ? (
                      <GetTrailerMovie movieId={result.id} />
                    ) : (
                      <GetTrailerSerie movieId={result.id} />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </FutureM>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loadBgHeader: state.loadBgHeader.loadBgHeader,
    loadUserPhoto: state.loadUserPhoto.loadUserPhoto,
  };
};

export default connect(mapStateToProps, actions)(FutureMovies);
