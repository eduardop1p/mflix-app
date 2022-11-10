/* eslint-disable */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import axiosBaseUrlMovies from '../../../services/axiosBaseUrlMovies';
import apiConfig from '../../../config/apiConfig';
import RatingSystem from '../../../components/ratingSystem';
import SlidePagenateCustom from '../../../components/slidePagenateCustom/index';
import clearLinkTitle from '../../../config/clearLinkTitle';
import Loading from '../../../components/loadingReactStates/index';
import imageErrorPoster from '../../../assets/images/czx7z2e6uqg81.jpg';
import imageErrorTop3 from '../../../assets/images/1150108.png';
import { color1 } from '../../../colors';
import { Slider, Grid, ForId } from '../../styled';
import { useMediaQuery } from 'react-responsive';

export default function New() {
  const [news, setNews] = useState(null);
  const breackPoint990 = useMediaQuery({ maxWidth: 990 });

  useEffect(() => {
    const getNews = async () => {
      try {
        const { data } = await axiosBaseUrlMovies.get(
          `/now_playing?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=1`
        );
        setNews(data);
      } catch {
        console.error('Erro ao carregar Novos Filmes.');
      }
    };
    getNews();
  }, []);

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
          // autoplay={{
          //   delay: 3000,
          //   disableOnInteraction: false,
          //   pauseOnMouseEnter: true,
          // }}
          navigation={{
            nextEl: '.next-element',
            prevEl: '.prev-element',
          }}
          modules={[Navigation]}
          style={{ height: 'auto' }}
          spaceBetween={20}
          slidesPerView={1}
          loop
        >
          <SlidePagenateCustom />
          {news &&
            news.results.map((result) => (
              <SwiperSlide key={result.id}>
                <div className="slider">
                  <div className="info">
                    <div className="new">NEW</div>
                    <Link
                      to={`/vertical/filmes/${clearLinkTitle(result.title)}/${
                        result.id
                      }`}
                      reloadDocument
                    >
                      <h1 title={result.title} className="title">
                        {result.title}
                      </h1>
                    </Link>
                    <GetDetailsMovieId id={result.id} />
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
                      alt={result.title}
                    />
                    <Loading />
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        {!breackPoint990 && (
          <div className="grid">
            <h5 className="titleNew">Top&nbsp;3&nbsp;novos&nbsp;filmes</h5>
            <Grid>
              <div className="scrollGridNew">
                {news &&
                  news.results.slice(0, 3).map((result) => (
                    <Link
                      key={result.id}
                      to={`/vertical/filmes/${clearLinkTitle(result.title)}/${
                        result.id
                      }`}
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
                          alt={result.title}
                        />
                        <Loading />
                        <div>
                          <div>
                            <h5>{result.title}</h5>
                            <div>{result.release_date.slice(0, 4)}</div>
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
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </Grid>
          </div>
        )}
      </div>
    </Slider>
  );
}

function GetDetailsMovieId(props) {
  const { id } = props;

  const [newId, serNewId] = useState(null);

  useEffect(() => {
    const getDetailsId = async (id) => {
      try {
        const { data } = await axiosBaseUrlMovies.get(
          `/${id}?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        serNewId(data);
      } catch {
        console.error('Erro ao obter Id de Filme');
      }
    };
    getDetailsId(id);
  }, []);

  if (!newId) return;

  return (
    <ForId>
      <div className="production-companies">
        {newId.production_companies.length > 0
          ? newId.production_companies
              .slice(-1)
              .map((objValue) => objValue.name)
          : 'Estúdio desconhecido.'}
      </div>
      <div className="vote-average">
        Rating
        <div className="rating-system">
          <RatingSystem vote_average={newId.vote_average} />
        </div>
      </div>
      <div className="overview">
        {newId.overview
          ? newId.overview
          : 'Não à descrição para este titulo por enquanto.'}
      </div>
      <div className="genres">
        {newId.genres
          .slice(0, 2)
          .map((value) => value.name)
          .join(', ')}
      </div>
      <div className="release-date">{newId.release_date.slice(0, 4)}</div>
      <Link
        to={`/vertical/filmes/${clearLinkTitle(newId.title)}/${newId.id}`}
        reloadDocument
      >
        <button type="button" className="watch-online">
          Assitir&nbsp;online
        </button>
      </Link>
    </ForId>
  );
}
