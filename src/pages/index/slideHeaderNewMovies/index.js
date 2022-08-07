/* eslint-disable */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';

import axiosBaseUrlMovies from '../../../services/axiosBaseUrlMovies';
import axiosBaseUrlSeriesDiscover from '../../../services/axiosBaseUrlSeriesDiscover';
import apiConfig from '../../../config/apiConfig';
import GetDetailsMovieId from './getDetailsMovieId/index';
import GetDetailsSerieId from './getDetailsSerieId/index';
import RatingSystem from '../../../components/ratingSystem';
import SlidePagenateCustom from '../../../components/slidePagenateCustom/index';
import clearLinkTitle from '../../../config/clearLinkTitle';
import Loading from '../../../components/loadingReactStates/index';
import imageErrorPoster from '../../../assets/images/czx7z2e6uqg81.jpg';
import imageErrorTop3 from '../../../assets/images/1150108.png';
import { color1 } from '../../../colors';
import { Slider, GridMovies } from './styled';

export default function SlideHeaderNewMovies() {
  const [newsMovies, setNewsMovies] = useState(null);

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
    const newArrEmpety = [];
    while (newArrEmpety.length <= newArr.length - 1) {
      const rand = Math.round(Math.random() * (newArr.length - 1));
      if (newArrEmpety.indexOf(rand) === -1) newArrEmpety.push(rand);
    }

    const randomArrMovieSeriesPopular = [];
    newArrEmpety.forEach((valueIndex) => {
      randomArrMovieSeriesPopular.push(newArr[valueIndex]);
    });

    setNewsMovies(randomArrMovieSeriesPopular);
  }

  function removeLoadingSipnner(event) {
    const loadingSpinner = event.target.parentElement.querySelector(
      'img + .container-load'
    );
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
          style={{ height: '440px' }}
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          loop
        >
          <SlidePagenateCustom />
          {newsMovies &&
            newsMovies.map((result) => (
              <SwiperSlide key={result.id}>
                <div className="slider">
                  <div className="info-movie">
                    <div className="new">
                      NEW {result.title ? 'FILME' : 'SERIE'}
                    </div>
                    <Link
                      to={`/vertical/${result.title ? 'filmes' : 'series'}/${
                        result.title ? 'm' : 't'
                      }/${clearLinkTitle(
                        result.title ? result.title : result.name
                      )}/${result.id}`}
                      reloadDocument
                    >
                      <h1
                        title={result.title ? result.title : result.name}
                        className="movieTitle"
                      >
                        {result.title ? result.title : result.name}
                      </h1>
                    </Link>
                    {result.title ? (
                      <GetDetailsMovieId movieId={result.id} />
                    ) : (
                      <GetDetailsSerieId movieId={result.id} />
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
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="gridMovies">
          <h5 className="titleNewMovies">Top&nbsp;3&nbsp;novos</h5>
          <GridMovies>
            <div className="scrollGridNewMovies">
              {newsMovies &&
                newsMovies.slice(0, 3).map((result) => (
                  <Link
                    key={result.id}
                    to={`/vertical/${result.title ? 'filmes' : 'series'}/${
                      result.title ? 'm' : 't'
                    }/${clearLinkTitle(
                      result.title ? result.title : result.name
                    )}/${result.id}`}
                    reloadDocument
                  >
                    <div className="gridNewMovies" key={result.id}>
                      <img
                        src={
                          result.backdrop_path
                            ? `https:image.tmdb.org/t/p/w500${result.backdrop_path}`
                            : imageErrorTop3
                        }
                        onLoad={removeLoadingSipnner}
                        onError={removeLoadingSipnner}
                        alt={result.title ? result.title : result.name}
                      />
                      <Loading />
                      <div>
                        <div className="top-3-title-date">
                          <h5 className="top-3-title">
                            {result.title ? result.title : result.name}
                          </h5>
                          <div className="top-3-date">
                            {result.release_date
                              ? result.release_date.slice(0, 4)
                              : result.first_air_date.slice(0, 4)}
                          </div>
                        </div>
                        <div className="rating-serie-movie">
                          <div className="rating">
                            Rating
                            <div>
                              <RatingSystem
                                vote_average={result.vote_average}
                                color={color1}
                              />
                            </div>
                          </div>
                          <div>{result.title ? 'Filme' : 'Serie'}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </GridMovies>
        </div>
      </div>
    </Slider>
  );
}
