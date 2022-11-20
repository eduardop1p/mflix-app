/* eslint-disable */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';

import { GetDetailsMovieId } from '../../movies/new';
import { GetDetailsSerieId } from '../../series/new';
import axiosBaseUrlMovies from '../../../services/axiosBaseUrlMovies';
import axiosBaseUrlSeriesDiscover from '../../../services/axiosBaseUrlSeriesDiscover';
import apiConfig from '../../../config/apiConfig';
import RatingSystem from '../../../components/ratingSystem';
import SlidePagenateCustom from '../../../components/slidePagenateCustom/index';
import clearLinkTitle from '../../../config/clearLinkTitle';
import Loading from '../../../components/loadingReactStates/index';
import imageErrorPoster from '../../../assets/images/czx7z2e6uqg81.jpg';
import imageErrorTop3 from '../../../assets/images/1150108.png';
import { color1 } from '../../../colors';
import { Slider, Grid } from '../../styled';

export default function New() {
  const [news, setNews] = useState(null);
  const breackPoint2300 = useMediaQuery({ minWidth: 2300 });
  const breackPoint1700 = useMediaQuery({ minWidth: 1700 });
  const breackPoint990 = useMediaQuery({ maxWidth: 990 });
  const breackPoint570 = useMediaQuery({ maxWidth: 570 });

  useEffect(() => {
    const getNews = async () => {
      try {
        const axiosData1 = await axiosBaseUrlMovies.get(
          `/now_playing?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
        );
        const data1 = axiosData1.data;

        try {
          const axiosData2 = await axiosBaseUrlSeriesDiscover.get(
            `?sort_by=popularity.desc&first_air_date.gte=${setDate(
              100
            )}&first_air_date.lte=${setDate()}&api_key=${
              apiConfig.apiKey
            }&language=${apiConfig.language}&page=1`
          );
          const data2 = axiosData2.data;
          randomArrMovieSeries(data1, data2);
        } catch {
          console.error('Erro ao carregar Novas Series.');
        }
      } catch {
        console.error('Erro ao carregar Novos Filmes.');
      }
    };

    getNews();
  }, []);

  function setDate(past7Day = 0) {
    const date = new Date();
    date.setDate(date.getDate() - past7Day);

    const zeroLeft = (num) => (num < 10 ? `0${num}` : num);

    return `${date.getFullYear()}-${zeroLeft(date.getMonth() + 1)}-${zeroLeft(
      date.getDate()
    )}`;
  }

  function randomArrMovieSeries(newsMoviesArr, newsSeriesArr) {
    const newArr = [...newsMoviesArr.results, ...newsSeriesArr.results];
    const randomArrMovieSeriesPopular = [];
    const newArrIndex = [
      0, 21, 1, 22, 2, 23, 3, 24, 4, 25, 5, 26, 6, 27, 7, 28, 8, 29, 9, 30, 10,
      31, 11, 32, 12, 33, 13, 34, 14, 35, 15, 36, 16, 37, 17, 38, 18, 39, 19,
    ];

    newArrIndex.forEach((valueIndex) => {
      randomArrMovieSeriesPopular.push(newArr[valueIndex]);
    });

    setNews(randomArrMovieSeriesPopular);
  }

  function removeLoadingSipnner(event) {
    const loadingSpinner = event.target.parentElement.querySelector(
      'img + .container-load'
    );
    if (!loadingSpinner) return;
    return loadingSpinner.remove();
  }

  SwiperCore.use([Autoplay]);

  return (
    <Slider>
      <div className="result">
        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: '.next-element',
            prevEl: '.prev-element',
          }}
          modules={[Navigation]}
          initialSlide={1}
          style={{ height: 'auto' }}
          spaceBetween={20}
          slidesPerView={breackPoint1700 ? (breackPoint2300 ? 3 : 2) : 1}
          loop
        >
          <SlidePagenateCustom />
          {news &&
            news.map(
              (result) =>
                result !== undefined && (
                  <SwiperSlide key={result.id}>
                    {!breackPoint570 ? (
                      <div className="slider">
                        <div className="info">
                          <div className="new">
                            NEW {result.title ? 'FILME' : 'SERIE'}
                          </div>
                          <Link
                            to={`/vertical/${
                              result.title ? 'filmes' : 'series'
                            }/${clearLinkTitle(
                              result.title ? result.title : result.name
                            )}/${result.id}`}
                            reloadDocument
                          >
                            <h1
                              title={result.title ? result.title : result.name}
                              className="title"
                            >
                              {result.title ? result.title : result.name}
                            </h1>
                          </Link>
                          {result.title ? (
                            <GetDetailsMovieId id={result.id} />
                          ) : (
                            <GetDetailsSerieId id={result.id} />
                          )}
                        </div>

                        <div className="poster-path">
                          <img
                            src={
                              result.poster_path
                                ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                                : imageErrorPoster
                            }
                            onLoad={removeLoadingSipnner}
                            onError={removeLoadingSipnner}
                            alt={result.title ? result.title : result.name}
                          />
                          <Loading />
                        </div>
                      </div>
                    ) : (
                      <div className="slider-mobile">
                        <Link
                          to={`/vertical/${
                            result.title ? 'filmes' : 'series'
                          }/${clearLinkTitle(
                            result.title ? result.title : result.name
                          )}/${result.id}`}
                          reloadDocument
                        >
                          <div className="mobile-new-details">
                            {result.title ? (
                              <GetDetailsMovieId id={result.id} mobile index />
                            ) : (
                              <GetDetailsSerieId id={result.id} mobile index />
                            )}
                          </div>
                          <div className="poster-path">
                            <img
                              src={
                                result.poster_path
                                  ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                                  : imageErrorPoster
                              }
                              onLoad={removeLoadingSipnner}
                              onError={removeLoadingSipnner}
                              alt={result.title ? result.title : result.name}
                            />
                            <Loading />
                          </div>
                        </Link>
                      </div>
                    )}
                  </SwiperSlide>
                )
            )}
        </Swiper>
        {!breackPoint990 && (
          <div className="grid">
            <h5 className="titleNew">Top&nbsp;3&nbsp;novos&nbsp;titulos</h5>
            <Grid>
              <div className="scrollGridNew">
                {news &&
                  news.slice(0, 3).map(
                    (result) =>
                      result !== undefined && (
                        <Link
                          key={result.id}
                          to={`/vertical/${
                            result.title ? 'filmes' : 'series'
                          }/${clearLinkTitle(
                            result.title ? result.title : result.name
                          )}/${result.id}`}
                          reloadDocument
                        >
                          <div className="gridNew" key={result.id}>
                            <img
                              src={
                                result.backdrop_path
                                  ? `https://image.tmdb.org/t/p/w500${result.backdrop_path}`
                                  : imageErrorTop3
                              }
                              onLoad={removeLoadingSipnner}
                              onError={removeLoadingSipnner}
                              alt={result.title ? result.title : result.name}
                            />
                            <Loading />
                            <div>
                              <div>
                                <h5>
                                  {result.title ? result.title : result.name}
                                </h5>
                                <div>{result.title ? 'Filme' : 'Serie'}</div>
                              </div>
                              <div>
                                <div className="rating">
                                  Rating
                                  <div>
                                    <RatingSystem
                                      vote_average={result.vote_average}
                                      color={color1}
                                    />
                                  </div>
                                </div>
                                <div className="date">
                                  {result.release_date
                                    ? result.release_date.slice(0, 4)
                                    : result.first_air_date.slice(0, 4)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                  )}
              </div>
            </Grid>
          </div>
        )}
      </div>
    </Slider>
  );
}
