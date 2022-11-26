import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
/* eslint-disable */

import * as actions from '../../../storeReactRedux/modules/firstBackground/actions';
import apiConfig from '../../../config/apiConfig';
import axiosBaseUrlGenres from '../../../services/axiosBaseUrlGenres';
import axiosBaseUrlMoviesDiscover from '../../../services/axiosBaseUrlDetailsFilters';
import axiosBaseUrlSeriesDiscover from '../../../services/axiosBaseUrlSeriesDiscover';
import axiosBaseUrlMovies from '../../../services/axiosBaseUrlMovies';
import axiosBaseUrlMultSearch from '../../../services/axiosBaseUrlMultSearch';
import axiosBaseUrlSeries from '../../../services/axiosBaseUrlSeries';
import axiosBaseUrlGenresSeries from '../../../services/axiosBaseUrlGenresSeries';
import clearLinkTitle from '../../../config/clearLinkTitle';
import RatingSystem from '../../../components/ratingSystem/index';
import Loading from '../../../components/loadingReactStates/index';
import imageErrorTop3 from '../../../assets/images/czx7z2e6uqg81.jpg';
import { color1 } from '../../../colors';
import {
  CatalogContainer,
  CatalogTitles,
  PagenationContainer,
} from '../../styled';

class AllCatalog extends Component {
  constructor(props) {
    super(props);

    this.useMedia570 = matchMedia('(max-width: 570px)');
    this.useMedia360 = matchMedia('(max-width: 360px)');

    this.state = {
      all: null,
      loadingFilters: false,
      pageCount: 0,
      searchFilterValue: '',
      searchFilterActived: false,
      currentPageGlobal: 0,
      genreActived: false,
      releaseDateActived: false,
      allGenresMoviesSeries: null,
      allGenres: null,
      genreName: 'Gênero',
      genreId: null,
      releaseDate: 'Ano',
      years: [],
      breakPoint570: this.useMedia570.matches,
      breakPoint360: this.useMedia360.matches,
    };

    this.concatGenresAndClear = this.concatGenresAndClear.bind(this);
    this.getImages = this.getImages.bind(this);
    this.getAllCatalog = this.getAllCatalog.bind(this);
    this.randomArrMovieSeries = this.randomArrMovieSeries.bind(this);
    this.handlePagenationClick = this.handlePagenationClick.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.getAllFilters = this.getAllFilters.bind(this);
    this.releaseDate = this.releaseDate.bind(this);
    this.yearOrGenreActive = this.yearOrGenreActive.bind(this);
  }

  componentDidMount() {
    this.useMedia570.addEventListener('change', (event) =>
      this.setState({
        breakPoint570: event.matches,
      })
    );
    this.useMedia360.addEventListener('change', (event) =>
      this.setState({
        breakPoint360: event.matches,
      })
    );

    this.getAllCatalog(this.state.currentPageGlobal);

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
          console.error('Erro ao pegar gêneros');
        }
      } catch {
        console.error('Erro ao pegar gêneros');
      }
    };
    getAllGenresFilters();
    this.releaseDate();
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
      allGenres: newArrGenres,
    });
  }

  async getAllCatalog(currentPage) {
    try {
      const axiosData1 = await axiosBaseUrlMovies.get(
        `/popular?api_key=${apiConfig.apiKey}&language=${
          apiConfig.language
        }&page=${currentPage + 1}`
      );
      const data1 = axiosData1.data;
      try {
        const axiosData2 = await axiosBaseUrlSeries.get(
          `/popular?api_key=${apiConfig.apiKey}&language=${
            apiConfig.language
          }&page=${currentPage + 1}`
        );
        const data2 = axiosData2.data;
        this.randomArrMovieSeries(data1, data2);
      } catch {
        console.error('Erro ao pegar todas as series.');
      }
    } catch {
      console.error('Erro ao pegar todos os filmes.');
    }
  }

  randomArrMovieSeries(allMoviesArr, allSeriesArr) {
    const { all } = this.state;
    const { search } = this.props;

    const newArr = [...allMoviesArr.results, ...allSeriesArr.results];
    const randomArrMovieSeriesPopular = { results: [] };
    const newArrIndex = [
      0, 21, 1, 22, 2, 23, 3, 24, 4, 25, 5, 26, 6, 27, 7, 28, 8, 29, 9, 30, 10,
      31, 11, 32, 12, 33, 13, 34, 14, 35, 15, 36, 16, 37, 17, 38, 18, 39, 19,
    ];
    newArrIndex.forEach((valueIndex) => {
      randomArrMovieSeriesPopular.results.push(newArr[valueIndex]);
    });

    if (!all && !search) this.getImages(randomArrMovieSeriesPopular);
    if (search)
      this.props.firstBackgroundSuccess({
        loadAllCatalog: true,
      });

    this.setState({
      all: randomArrMovieSeriesPopular,
      pageCount:
        Number((allMoviesArr.total_pages + allSeriesArr.total_pages) / 2) >= 500
          ? 500
          : Number((allMoviesArr.total_pages + allSeriesArr.total_pages) / 2),
    });
  }

  async getImages(all) {
    this.props.firstBackgroundSuccess({
      background: all.results[0].backdrop_path,
    });
  }

  async handlePagenationClick(event) {
    const currentPage = event.selected;
    this.setState({
      currentPageGlobal: currentPage,
    });

    const { searchFilterActived, genreId, releaseDate } = this.state;

    if (searchFilterActived) {
      return this.handleSearchSubmit(null, currentPage);
    }
    if (genreId || releaseDate || !currentPage || currentPage) {
      return this.getAllFilters(null, currentPage);
    }
  }

  async handleSearchSubmit(event, currentPage) {
    if (event) event.preventDefault();
    const { searchFilterValue } = this.state;
    if (!searchFilterValue) return;
    if (!currentPage)
      this.setState({
        currentPageGlobal: 0,
      });

    try {
      this.setState({ loadingFilters: true });
      const { data } = await axiosBaseUrlMultSearch.get(
        `/multi?api_key=${apiConfig.apiKey}&language=${
          apiConfig.language
        }&page=${!currentPage ? 1 : currentPage + 1}&query=${searchFilterValue}`
      );
      this.setState({
        all: {
          results: data.results.filter(
            (midia) => midia.media_type === 'tv' || midia.media_type === 'movie'
          ),
        },
        pageCount: data.total_pages >= 500 ? 500 : data.total_pages,
        searchFilterActived: true,
        genreName: 'Gênero',
        genreId: null,
        releaseDate: 'Ano',
      });
    } catch {
      console.error('Erro ao pesquisar titulo.');
    } finally {
      setTimeout(() => this.setState({ loadingFilters: false }), 100);
    }
  }

  async getAllFilters(event, currentPage) {
    if (event) event.preventDefault();
    const { genreId, releaseDate } = this.state;
    if (!currentPage)
      this.setState({
        currentPageGlobal: 0,
      });

    try {
      this.setState({ loadingFilters: true });
      const axiosData1 = await axiosBaseUrlMoviesDiscover.get(
        `?api_key=${apiConfig.apiKey}&page=${
          !currentPage ? 1 : currentPage + 1
        }&language=${
          apiConfig.language
        }&with_genres=${genreId}&primary_release_year=${releaseDate}`
      );
      const data1 = axiosData1.data;
      try {
        const axiosData2 = await axiosBaseUrlSeriesDiscover.get(
          `?api_key=${apiConfig.apiKey}&page=${
            !currentPage ? 1 : currentPage + 1
          }&language=${
            apiConfig.language
          }&with_genres=${genreId}&first_air_date_year=${releaseDate}`
        );
        const data2 = axiosData2.data;
        this.randomArrMovieSeries(data1, data2);
        this.setState({
          searchFilterActived: false,
          searchFilterValue: '',
        });
      } catch {
        console.error('Erro ao pegar series por filtros.');
      }
    } catch {
      console.error('Erro ao pegar filmes por filtros.');
    } finally {
      setTimeout(() => this.setState({ loadingFilters: false }), 100);
    }
  }

  releaseDate() {
    this.currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 1990; i <= this.currentYear; i++) years.unshift(i);
    this.setState({
      years,
    });
  }

  yearOrGenreActive(active, event) {
    const { releaseDate, genreName } = this.state;

    if (
      event.target.innerText === releaseDate ||
      event.target.innerText === genreName
    )
      return;

    event.target.parentElement
      .querySelectorAll('li')
      .forEach((li) => li.removeAttribute('data-active'));

    event.target.setAttribute('data-active', '');

    if (active === 'year') {
      this.setState(
        {
          releaseDate: event.target.innerText,
        },
        this.getAllFilters
      );
      return;
    }
    this.setState(
      {
        genreName: event.target.innerText,
        genreId: event.target.getAttribute('data-genre-id'),
      },
      this.getAllFilters
    );
    return;
  }

  removeLoadingSipnner(event) {
    const loadingSpinner = event.target.parentElement.querySelector(
      'img + .container-load'
    );
    if (!loadingSpinner) return;
    return loadingSpinner.remove();
  }

  render() {
    const {
      all,
      pageCount,
      loadingFilters,
      searchFilterValue,
      currentPageGlobal,
      genreActived,
      allGenres,
      genreName,
      releaseDate,
      years,
      releaseDateActived,
      breakPoint570,
      breakPoint360,
    } = this.state;

    return (
      <CatalogContainer
        genreActived={genreActived}
        releaseDateActived={releaseDateActived}
      >
        <h1>Catalogo</h1>

        <div className="catalog-filter">
          {!breakPoint570 ? (
            <AllCatalogMobile
              thisParentClass={this}
              releaseDate={releaseDate}
              releaseDateActived={releaseDateActived}
              years={years}
              genreName={genreName}
              allGenres={allGenres}
              genreActived={genreActived}
            />
          ) : !breakPoint360 ? (
            <div className="mobile-year-genre">
              <AllCatalogMobile
                thisParentClass={this}
                releaseDate={releaseDate}
                releaseDateActived={releaseDateActived}
                years={years}
                genreName={genreName}
                allGenres={allGenres}
                genreActived={genreActived}
              />
            </div>
          ) : (
            <AllCatalogMobile
              thisParentClass={this}
              releaseDate={releaseDate}
              releaseDateActived={releaseDateActived}
              years={years}
              genreName={genreName}
              allGenres={allGenres}
              genreActived={genreActived}
            />
          )}

          <div className="search-filter">
            <div>
              <svg
                onClick={this.handleSearchSubmit}
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 0 24 24"
                width="20px"
                fill="#fff"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
              <form onSubmit={this.handleSearchSubmit}>
                <input
                  value={searchFilterValue}
                  onChange={(event) =>
                    this.setState({ searchFilterValue: event.target.value })
                  }
                  id="search-filters"
                  placeholder="Pesquisar titulo..."
                />
              </form>
            </div>
          </div>
        </div>

        <CatalogTitles>
          {loadingFilters && <Loading colorTranparent />}
          {all &&
            all.results.length &&
            all.results.map(
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
                    <div className="catalog-img">
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
                      <Loading colorVertical={this.props.colorVertical} />
                      <div className="box-shadow-catalog"></div>
                      <div className="movie-or-serie-catalog">
                        {result.title ? 'Filme' : 'Serie'}
                      </div>
                      <div className="catalog-details">
                        <h5>{result.title ? result.title : result.name}</h5>
                        <div className="catalog-rating-data">
                          <div>
                            <RatingSystem
                              vote_average={result.vote_average}
                              color={color1}
                            />
                          </div>
                          <div>
                            {result.release_date &&
                              result.release_date.slice(0, 4)}
                            {result.first_air_date &&
                              result.first_air_date.slice(0, 4)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
            )}
        </CatalogTitles>
        <PagenationContainer>
          <ReactPaginate
            breakLabel="..."
            pageRangeDisplayed={breakPoint360 ? 2 : 3}
            marginPagesDisplayed={1}
            forcePage={currentPageGlobal}
            onPageChange={this.handlePagenationClick}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
          />
        </PagenationContainer>
      </CatalogContainer>
    );
  }
}

class AllCatalogMobile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      thisParentClass,
      releaseDate,
      releaseDateActived,
      years,
      genreName,
      allGenres,
      genreActived,
    } = this.props;

    return (
      <>
        <div className="year">
          <span>{releaseDate}</span>
          <div className="releaseDate">
            <ul>
              {years.map((year, index) => (
                <li
                  key={index}
                  onClick={(event) =>
                    thisParentClass.yearOrGenreActive('year', event)
                  }
                >
                  {year}
                </li>
              ))}
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
            onClick={() =>
              thisParentClass.setState({
                releaseDateActived: !releaseDateActived,
              })
            }
          ></button>
        </div>
        <div className="genre">
          <span>{genreName}</span>
          <div className="genres ">
            <ul>
              {allGenres &&
                allGenres.map((genre) => (
                  <li
                    key={genre.id}
                    data-genre-id={genre.id}
                    onClick={(event) =>
                      thisParentClass.yearOrGenreActive('genre', event)
                    }
                  >
                    {genre.name}
                  </li>
                ))}
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
            onClick={() =>
              thisParentClass.setState({ genreActived: !genreActived })
            }
          ></button>
        </div>
      </>
    );
  }
}

export default connect(null, actions)(AllCatalog);
