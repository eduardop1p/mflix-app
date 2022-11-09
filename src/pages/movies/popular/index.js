/* eslint-disable */
import { Component } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { isInt } from 'validator/validator';

import axiosDetailsFilters from '../../../services/axiosBaseUrlDetailsFilters';
import axiosBaseUrlGenres from '../../../services/axiosBaseUrlGenres';
import apiConfig from '../../../config/apiConfig';
import clearLinkTitle from '../../../config/clearLinkTitle';
import RatingSystem2 from '../../../components/ratingSystem2/index';
import Loading from '../../../components/loadingReactStates/index';
import imageErrorTop3 from '../../../assets/images/czx7z2e6uqg81.jpg';
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
      filterPopularByActived: false,
      filterNamePopular: null,
      primaryReleaseDateGte: null,
      primaryReleaseDateLte: null,
    };

    this.getAllPopular = this.getAllPopular.bind(this);
    this.getAllPopularFilters = this.getAllPopularFilters.bind(this);
    this.date = this.date.bind(this);
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
      const { data } = await axiosDetailsFilters.get(
        `?sort_by=popularity.desc&api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
      );
      this.setState({
        allPopular: data,
      });
    } catch {
      console.error('Erro ao pegar filmes populares.');
    }
  }

  async getAllPopularFilters() {
    const { primaryReleaseDateGte, primaryReleaseDateLte } = this.state;
    try {
      this.setState({ loadingFilters: true });
      const { data } = await axiosDetailsFilters.get(
        `?sort_by=popularity.desc&release_date.gte=${primaryReleaseDateGte}&release_date.lte=${primaryReleaseDateLte}&api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
      );
      this.setState({
        allPopular: data,
      });
    } catch {
      console.error('Erro ao pegar filmes populares.');
    } finally {
      setTimeout(() => this.setState({ loadingFilters: false }), 100);
    }
  }

  date(past7Day = 0) {
    const date = new Date();
    date.setDate(date.getDate() - past7Day);

    const zeroLeft = (num) => (num < 10 ? `0${num}` : num);

    return `${date.getFullYear()}-${zeroLeft(date.getMonth() + 1)}-${zeroLeft(
      date.getDate()
    )}`;
  }

  removeLoadingSipnner(event) {
    const loadingSpinner = event.target.parentElement.querySelector(
      'img + .container-load'
    );
    return loadingSpinner.remove();
  }

  render() {
    const {
      allPopular,
      loadingFilters,
      allGenres,
      filterPopularByActived,
      filterNamePopular,
    } = this.state;
    SwiperCore.use([Autoplay]);

    return (
      <PopularContainer filterPopularByActived={filterPopularByActived}>
        <div className="popular">
          <h1>Filmes&nbsp;populares</h1>
          <div className="popularBy">
            <h5>Populares&nbsp;Do(a):</h5>
            <div
              className="filter-popularBy"
              onClick={(event) =>
                event.target.offsetHeight <= 36 &&
                this.setState({
                  filterPopularByActived: !filterPopularByActived,
                })
              }
            >
              <span>{!filterNamePopular ? 'Filtrar' : filterNamePopular}</span>
              <div className="ul-filters-popularBy">
                <ul>
                  <li
                    onClick={(event) =>
                      this.setState(
                        {
                          primaryReleaseDateGte: this.date(1),
                          primaryReleaseDateLte: this.date(),
                          filterNamePopular: event.target.innerText,
                          filterPopularByActived: !filterPopularByActived,
                        },
                        this.getAllPopularFilters
                      )
                    }
                  >
                    Dia
                  </li>
                  <li
                    onClick={(event) =>
                      this.setState(
                        {
                          primaryReleaseDateGte: this.date(7),
                          primaryReleaseDateLte: this.date(),
                          filterNamePopular: event.target.innerText,
                          filterPopularByActived: !filterPopularByActived,
                        },
                        this.getAllPopularFilters
                      )
                    }
                  >
                    Semana
                  </li>
                  <li
                    onClick={(event) =>
                      this.setState(
                        {
                          primaryReleaseDateGte: this.date(31),
                          primaryReleaseDateLte: this.date(),
                          filterNamePopular: event.target.innerText,
                          filterPopularByActived: !filterPopularByActived,
                        },
                        this.getAllPopularFilters
                      )
                    }
                  >
                    Mês
                  </li>
                  <li
                    onClick={(event) =>
                      this.setState(
                        {
                          primaryReleaseDateGte: this.date(365),
                          primaryReleaseDateLte: this.date(),
                          filterNamePopular: event.target.innerText,
                          filterPopularByActived: !filterPopularByActived,
                        },
                        this.getAllPopularFilters
                      )
                    }
                  >
                    Ano
                  </li>
                </ul>
              </div>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 0 24 24"
                  width="20px"
                  fill="#FFFFFF"
                >
                  <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
                </svg>
              </span>
            </div>
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
        </div>
        <PopularTitles>
          {loadingFilters && <Loading colorTranparent />}
          {allPopular && (
            <Swiper
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
              slidesPerView={3}
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
                        onLoad={this.removeLoadingSipnner}
                        onError={this.removeLoadingSipnner}
                        alt={result.title}
                      />
                      <Loading popular />
                    </div>
                    <div className="popular-details">
                      <Link
                        to={`/vertical/filmes/${clearLinkTitle(result.title)}/${
                          result.id
                        }`}
                        reloadDocument
                      >
                        <h3 title={result.title}>{result.title}</h3>
                      </Link>
                      <div className="popular-year-genre">
                        <div className="popular-year-year">
                          {result.release_date
                            ? result.release_date.slice(0, 4)
                            : 'Not Data'}
                        </div>
                        &sdot;
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
                          <RatingSystem2
                            vote_average={result.vote_average}
                            color={color1}
                          />
                          <div className="popular-voteAverage">
                            {isInt(String(result.vote_average))
                              ? `${result.vote_average}.0`
                              : result.vote_average}
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/vertical/filmes/${clearLinkTitle(result.title)}/${
                          result.id
                        }`}
                        reloadDocument
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
