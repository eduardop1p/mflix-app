/* eslint-disable */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import axiosBaseUrlMovies from '../../../services/axiosBaseUrlMovies';
import axiosBaseUrlGenres from '../../../services/axiosBaseUrlGenres';
import apiConfig from '../../../config/apiConfig';
import clearLinkTitle from '../../../config/clearLinkTitleConfig';
import RatingSystem from '../../../components/ratingSystem/index';
import Loading from '../../../components/loadingReactStates/index';
import imageErrorTop3 from '../../../assets/images/czx7z2e6uqg81.jpg';
import removeLoadingSipnner from '../../../config/loadingSpinnerConfig';
import SlidePopularPagenateCustom from '../../../components/slidePopularPagenateCustom/index';
import { PopularContainer, PopularTitles } from '../../styled';

/* eslint-disable */
export default function Popular() {
  const [allPopular, setAllPopular] = useState(null);
  const [allGenres, setAllGenres] = useState(null);

  useEffect(() => {
    const getAllGenresFilters = async () => {
      try {
        const { data } = await axiosBaseUrlGenres.get(
          `/list?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        setAllGenres(data);
      } catch {
        console.error('Erro ao pegar gêneros');
      }
    };
    getAllPopular();
    getAllGenresFilters();
  }, []);

  async function getAllPopular() {
    try {
      const { data } = await axiosBaseUrlMovies.get(
        `/popular?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
      );
      setAllPopular(data);
    } catch {
      console.error('Erro ao pegar filmes populares.');
    }
  }

  return (
    <PopularContainer>
      <div className="popular">
        <h1>Filmes populares</h1>

        <SlidePopularPagenateCustom />
      </div>
      <PopularTitles>
        {allPopular && (
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            initialSlide={1}
            navigation={{
              nextEl: '.button-next-element',
              prevEl: '.button-previous-element',
            }}
            modules={[Navigation, Autoplay]}
            autoHeight
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              2350: { slidesPerView: 7 },
              2000: { slidesPerView: 6 },
              1700: { slidesPerView: 5 },
              1350: { slidesPerView: 4 },
              940: { slidesPerView: 3 },
              620: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
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
                    <div className="overview">
                      {result.overview
                        ? result.overview
                        : 'Não à descrição para este titulo por enquanto.'}
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
