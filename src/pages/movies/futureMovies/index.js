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
import { FutureM } from './styled';

class FutureMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      futureAllMovies: null,
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
    const getAllFutureMovies = async () => {
      try {
        const { data } = await axiosFutureMovies.get(
          `?sort_by=popularity.desc&primary_release_date.gte=${date()}&primary_release_date.lte=${date(
            200
          )}&api_key=${apiConfig.apiKey}&language=${apiConfig.language}page=1`
        );
        this.setState({
          futureAllMovies: data,
        });
      } catch (err) {
        console.error('Erro ao pegar filmes futuros.');
      }
    };
    SwiperCore.use(Autoplay);
    getAllFutureMovies();
  }

  componentDidUpdate() {
    const { loadBgHeader, loadUserPhoto } = this.props;
    const { futureAllMovies } = this.state;

    if (loadBgHeader && loadUserPhoto && futureAllMovies) {
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
    const { futureAllMovies } = this.state;

    return (
      <FutureM>
        <h1>Filmes&nbsp;futuros</h1>
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
                      alt={result.title}
                    />
                    <Loading />
                  </div>
                  <div className="future-movies-details">
                    <h3>{result.title}</h3>
                    <div className="future-movies-release-date">
                      Lançamento:
                      <span>
                        {new Date(`${result.release_date}`).toLocaleDateString(
                          'pt-BR',
                          {
                            dateStyle: 'long',
                          }
                        )}
                      </span>
                    </div>
                    <div className="future-movies-info">
                      {!result.overview
                        ? 'Não à descrição para este titulo por enquanto.'
                        : result.overview}
                    </div>
                  </div>
                  <div className="future-movies-trailer-video">
                    <GetTrailerMovie movieId={result.id} />
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
