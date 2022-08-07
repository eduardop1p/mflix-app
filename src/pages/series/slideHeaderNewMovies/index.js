/* eslint-disable */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';

import axiosBaseUrlSeriesDiscover from '../../../services/axiosBaseUrlSeriesDiscover';
import apiConfig from '../../../config/apiConfig';
import GetDetailsMovieId from './getDetailsMovieId/index';
import RatingSystem from '../../../components/ratingSystem';
import SlidePagenateCustom from '../../../components/slidePagenateCustom/index';
import Loading from '../../../components/loadingReactStates/index';
import clearLinkTitle from '../../../config/clearLinkTitle';
import imageErrorPoster from '../../../assets/images/czx7z2e6uqg81.jpg';
import imageErrorTop3 from '../../../assets/images/1150108.png';
import { color1 } from '../../../colors';
import { Slider, GridMovies } from './styled';

export default function SlideHeaderNewMovies() {
  const [newsMovies, setNewsMovies] = useState(null);

  useEffect(() => {
    const getNewsMovies = async () => {
      try {
        const { data } = await axiosBaseUrlSeriesDiscover.get(
          `?sort_by=popularity.desc&first_air_date.gte=${setDate(
            100
          )}&first_air_date.lte=${setDate()}&api_key=${
            apiConfig.apiKey
          }&language=${apiConfig.language}&page=1`
        );
        setNewsMovies(data);
      } catch {
        console.error('Erro ao carregar novas series.');
      }
    };
    getNewsMovies();
  }, []);

  function setDate(past7Day = 0) {
    const date = new Date();
    date.setDate(date.getDate() - past7Day);

    const zeroLeft = (num) => (num < 10 ? `0${num}` : num);

    return `${date.getFullYear()}-${zeroLeft(date.getMonth() + 1)}-${zeroLeft(
      date.getDate()
    )}`;
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
            newsMovies.results.map((result) => (
              <SwiperSlide key={result.id}>
                <div className="slider">
                  <div className="info-movie">
                    <div className="new">NEW</div>
                    <Link
                      to={`/vertical/series/t/${clearLinkTitle(result.name)}/${
                        result.id
                      }`}
                      reloadDocument
                    >
                      <h1 title={result.name} className="movieTitle">
                        {result.name}
                      </h1>
                    </Link>
                    <GetDetailsMovieId movieId={result.id} />
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
                      alt={result.name}
                    />
                    <Loading />
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="gridMovies">
          <h5 className="titleNewMovies">Top&nbsp;3&nbsp;novas&nbsp;series</h5>
          <GridMovies>
            <div className="scrollGridNewMovies">
              {newsMovies &&
                newsMovies.results.slice(0, 3).map((result) => (
                  <Link
                    key={result.id}
                    to={`/vertical/series/t/${clearLinkTitle(result.name)}/${
                      result.id
                    }`}
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
                        alt={result.name}
                      />
                      <Loading />
                      <div>
                        <h5>{result.name}</h5>
                        <div>
                          {result.first_air_date
                            ? result.first_air_date.slice(0, 4)
                            : 'Not data'}
                        </div>
                        <div className="rating">
                          Rating
                          <div>
                            <RatingSystem
                              vote_average={result.vote_average}
                              color={color1}
                            />
                          </div>
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
