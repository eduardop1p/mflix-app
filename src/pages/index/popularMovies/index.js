/* eslint-disable */
import { Component } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { isInt } from 'validator/validator';

import axiosBaseUrlMoviesDiscover from '../../../services/axiosBaseUrlDetailsFilters';
import axiosBaseUrlGenres from '../../../services/axiosBaseUrlGenres';
import axiosBaseUrlMovies from '../../../services/axiosBaseUrlMovies';
import axiosBaseUrlSeries from '../../../services/axiosBaseUrlSeries';
import axiosBaseUrlGenresSeries from '../../../services/axiosBaseUrlGenresSeries';
import axiosBaseUrlSeriesDiscover from '../../../services/axiosBaseUrlSeriesDiscover';
import apiConfig from '../../../config/apiConfig';
import clearLinkTitle from '../../../config/clearLinkTitle';
import Loading from '../../../components/loadingReactStates/index';
import RatingSystem2 from '../../../components/ratingSystem2/index';
import imageErrorTop3 from '../../../assets/images/czx7z2e6uqg81.jpg';
import LoadingFilter from '../../../components/loadingFilters/index';
import { color1 } from '../../../colors/index';
import { Popular, PopularCatalog } from './styled';

/* eslint-disable */
export default class PopularMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allMoviesPopular: null,
      loadingFilters: false,
      allMoviesArr: null,
      allSeriesArr: null,
      allGenresMovies: null,
      allGenresMoviesSeries: null,
      filterPopularByActived: false,
      filterNamePopular: null,
      primaryReleaseDateGte: null,
      primaryReleaseDateLte: null,
    };

    this.getAllMoviesPopular = this.getAllMoviesPopular.bind(this);
    this.getAllMoviesPopularFilters =
      this.getAllMoviesPopularFilters.bind(this);
    this.date = this.date.bind(this);
  }

  componentDidMount() {
    const getAllGenresFilters = async () => {
      try {
        const axiosData1 = await axiosBaseUrlGenres.get(
          `/list?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        const data1 = axiosData1.data;
        try {
          const axiosData2 = await axiosBaseUrlGenresSeries.get(
            `/list?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
          );
          const data2 = axiosData2.data;
          this.setState(
            {
              allGenresMoviesSeries: [data1, data2],
            },
            this.concatGenresAndClear
          );
        } catch {
          console.error('Erro ao pegar generos');
        }
      } catch {
        console.error('Erro ao pegar generos');
      }
    };
    this.getAllMoviesPopular();
    getAllGenresFilters();
  }

  async getAllMoviesPopular() {
    try {
      const axiosData1 = await axiosBaseUrlMovies.get(
        `/popular?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
      );
      const data1 = axiosData1.data;
      try {
        const axiosData2 = await axiosBaseUrlSeries.get(
          `/popular?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
        );
        const data2 = axiosData2.data;
        this.setState(
          {
            allMoviesArr: data1,
            allSeriesArr: data2,
          },
          this.randomArrMovieSeries
        );
      } catch {
        console.error('Erro ao pegar series populares.');
      }
    } catch {
      console.error('Erro ao pegar filmes populares.');
    }
  }

  async getAllMoviesPopularFilters() {
    const { primaryReleaseDateGte, primaryReleaseDateLte } = this.state;
    try {
      this.setState({ loadingFilters: true });
      const axiosData1 = await axiosBaseUrlMoviesDiscover.get(
        `?sort_by=popularity.desc&release_date.gte=${primaryReleaseDateGte}&release_date.lte=${primaryReleaseDateLte}&api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
      );
      const data1 = axiosData1.data;
      try {
        const axiosData2 = await axiosBaseUrlSeriesDiscover.get(
          `?sort_by=popularity.desc&air_date.gte=${primaryReleaseDateGte}&air_date.lte=${primaryReleaseDateLte}&api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
        );
        const data2 = axiosData2.data;
        this.setState(
          {
            allMoviesArr: data1,
            allSeriesArr: data2,
          },
          this.randomArrMovieSeries
        );
      } catch {
        console.error('Erro ao pegar series populares.');
      }
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

  concatGenresAndClear() {
    const { allGenresMoviesSeries } = this.state;

    const newArrGenres = [];
    const newArrGenresMoviesSeries = [
      ...allGenresMoviesSeries[0].genres,
      ...allGenresMoviesSeries[1].genres,
    ].forEach((valueObj1) => {
      newArrGenres
        .map((valueObj2) => valueObj2.name)
        .indexOf(valueObj1.name) === -1 && newArrGenres.push(valueObj1);
    });

    this.setState({
      allGenresMovies: newArrGenres,
    });
  }

  randomArrMovieSeries() {
    const { allMoviesArr, allSeriesArr } = this.state;

    const newArr = [...allMoviesArr.results, ...allSeriesArr.results];
    const newArrEmpety = [];
    while (newArrEmpety.length <= newArr.length - 1) {
      const rand = Math.round(Math.random() * (newArr.length - 1));
      if (newArrEmpety.indexOf(rand) === -1) newArrEmpety.push(rand);
    }

    const randomArrMovieSeriesPopular = { results: [] };
    newArrEmpety.forEach((valueIndex) => {
      randomArrMovieSeriesPopular.results.push(newArr[valueIndex]);
    });

    this.setState({
      allMoviesPopular: randomArrMovieSeriesPopular,
    });
  }

  removeLoadingSipnner(event) {
    const loadingSpinner = event.target.parentElement.querySelector(
      'img + .container-load'
    );
    return loadingSpinner.remove();
  }

  render() {
    const {
      allMoviesPopular,
      loadingFilters,
      allGenresMovies,
      filterPopularByActived,
      filterNamePopular,
    } = this.state;
    SwiperCore.use([Autoplay]);

    return (
      <Popular filterPopularByActived={filterPopularByActived}>
        <div className="popularMovies">
          <h1>Populares</h1>
          <div className="popularBy">
            <h5>Populares&nbsp;Do(a):</h5>
            <div className="filter-popularBy">
              {!filterNamePopular ? 'Filtrar' : filterNamePopular}
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
                        this.getAllMoviesPopularFilters
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
                        this.getAllMoviesPopularFilters
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
                        this.getAllMoviesPopularFilters
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
                        this.getAllMoviesPopularFilters
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
              <button
                className="onClickActivedFilters"
                onClick={() =>
                  this.setState({
                    filterPopularByActived: !filterPopularByActived,
                  })
                }
              ></button>
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
        <PopularCatalog>
          {loadingFilters && <LoadingFilter />}
          {allMoviesPopular && (
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
              style={{ height: '200px' }}
              modules={[Navigation]}
              spaceBetween={40}
              slidesPerView={3}
              loop
            >
              {allMoviesPopular.results.map((result) => (
                <SwiperSlide key={result.id}>
                  <div className="popular-movie-slider">
                    <div className="movie-popular-img">
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
                      <Loading popular />
                    </div>
                    <div className="movie-popular-details">
                      <Link
                        to={`/vertical/${result.title ? 'filmes' : 'series'}/${
                          result.title ? 'm' : 't'
                        }/${clearLinkTitle(
                          result.title ? result.title : result.name
                        )}/${result.id}`}
                        reloadDocument
                      >
                        <h3 title={result.title ? result.title : result.name}>
                          {result.title ? result.title : result.name}
                        </h3>
                      </Link>
                      <div className="popular-year-genre">
                        <div>{result.title ? 'Filme,' : 'Serie,'}</div>
                        <div className="popular-year-year">
                          {result.release_date &&
                            result.release_date.slice(0, 4)}
                          {result.first_air_date &&
                            result.first_air_date.slice(0, 4)}
                        </div>
                        &sdot;
                        <div className="popular-genre-genre">
                          {allGenresMovies &&
                            allGenresMovies.map(
                              (genre) =>
                                genre.id === result.genre_ids[0] && genre.name
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
                        to={`/vertical/${result.title ? 'filmes' : 'series'}/${
                          result.title ? 'm' : 't'
                        }/${clearLinkTitle(
                          result.title ? result.title : result.name
                        )}/${result.id}`}
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
        </PopularCatalog>
      </Popular>
    );
  }
}
