/* eslint-disable */
import { Component } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import axiosBaseUrlMovies from '../../../services/axiosBaseUrlMovies';
import axiosBaseUrlGenres from '../../../services/axiosBaseUrlGenres';
import apiConfig from '../../../config/apiConfig';
import clearLinkTitle from '../../../config/clearLinkTitleConfig';
import RatingSystem from '../../../components/ratingSystem/index';
import Loading from '../../../components/loadingReactStates/index';
import imageErrorTop3 from '../../../assets/images/czx7z2e6uqg81.jpg';
import removeLoadingSipnner from '../../../config/loadingSpinnerConfig';
import { color1 } from '../../../colors/index';
import { PopularContainer, PopularTitles } from '../../styled';

/* eslint-disable */
export default class Popular extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allPopular: null,
      loadingFilters: false,
      allGenres: null,
    };

    this.getAllPopular = this.getAllPopular.bind(this);
  }

  componentDidMount() {
    const getAllGenresFilters = async () => {
      try {
        const { data } = await axiosBaseUrlGenres.get(
          `/list?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        this.setState({
          allGenres: data,
        });
      } catch {
        console.error('Erro ao pegar gêneros');
      }
    };
    this.getAllPopular();
    getAllGenresFilters();
  }

  async getAllPopular() {
    try {
      const { data } = await axiosBaseUrlMovies.get(
        `/popular?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
      );
      this.setState({
        allPopular: data,
      });
    } catch {
      console.error('Erro ao pegar filmes populares.');
    }
  }

  render() {
    SwiperCore.use([Autoplay]);

    const { allPopular, loadingFilters, allGenres } = this.state;

    return (
      <PopularContainer>
        <div className="popular">
          <h1>Filmes populares</h1>
          <div className="navigation-popularBy">
            <button className="button-previous-element">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
                fill={color1}
              >
                <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
                <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
              </svg>
            </button>
            <button className="button-next-element">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
                fill={color1}
              >
                <g>
                  <path d="M0,0h24v24H0V0z" fill="none" />
                </g>
                <g>
                  <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
                </g>
              </svg>
            </button>
          </div>
        </div>
        <PopularTitles>
          {loadingFilters && <Loading colorTranparent />}
          {allPopular && (
            <Swiper
              initialSlide={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                nextEl: '.button-next-element',
                prevEl: '.button-previous-element',
              }}
              modules={[Navigation]}
              style={{ height: 'auto' }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                2351: { slidesPerView: 7 },
                2001: { slidesPerView: 6 },
                1701: { slidesPerView: 5 },
                1351: { slidesPerView: 4 },
                1101: { slidesPerView: 3 },
                951: { slidesPerView: 5 },
                801: { slidesPerView: 4 },
                501: { slidesPerView: 3 },
                381: { slidesPerView: 2 },
              }}
              loop
            >
              {allPopular.results.map((result) => (
                <SwiperSlide key={result.id}>
                  <div className="popular-slider">
                    <div className="popular-img">
                      <img
                        src={
                          result.poster_path
                            ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                            : imageErrorTop3
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
                          {result.genre_ids.length < 1 && 'Not genre'}
                        </div>
                      </div>
                      <div className="popular-imdb-rating-voteAverage">
                        IMDB
                        <div className="popular-rating-voteAverage">
                          <RatingSystem
                            vote_average={result.vote_average}
                            ratingSystem2
                          />
                          <div className="popular-voteAverage">
                            {result.vote_average.toFixed(1)}
                          </div>
                        </div>
                      </div>
                      <Link
                        reloadDocument
                        to={`/vertical/filmes/${clearLinkTitle(result.title)}/${
                          result.id
                        }`}
                      >
                        <button className="popular-watch-now">
                          Assistir&nbsp;agora
                        </button>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </PopularTitles>
      </PopularContainer>
    );
  }
}
