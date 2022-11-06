import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import * as actions from '../../../storeReactRedux/modules/firstBackground/actions';
import apiConfig from '../../../config/apiConfig';
import axiosBaseUrlMoviesDiscover from '../../../services/axiosBaseUrlDetailsFilters';
import axiosBaseUrlSeriesDiscover from '../../../services/axiosBaseUrlSeriesDiscover';
import axiosBaseUrlMultSearch from '../../../services/axiosBaseUrlMultSearch';
import clearLinkTitle from '../../../config/clearLinkTitle';
import RatingSystem from '../../../components/ratingSystem/index';
import notResultsSearch from '../../../assets/images/search.png';
import Loading from '../../../components/loadingReactStates/index';
import imageErrorTop3 from '../../../assets/images/czx7z2e6uqg81.jpg';
import { color1 } from '../../../colors';
import {
  CatalogContainer,
  CatalogContainer2,
  PagenationContainer,
} from '../../styled';

/* eslint-disable */
class AllCatalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      all: null,
      loadingFilters: false,
      allMoviesArr: null,
      allSeriesArr: null,
      pageCount: 0,
      searchFilterValue: '',
      searchFilterActived: false,
      currentPageGlobal: 0,
      relaceDateActived: false,
      nameFilterValue: '',
      releaseDate: null,
      years: [],
    };

    this.getAllCatalog = this.getAllCatalog.bind(this);
    this.getImages = this.getImages.bind(this);
    this.randomArrMovieSeries = this.randomArrMovieSeries.bind(this);
    this.handlePagenationClick = this.handlePagenationClick.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.getAllFilters = this.getAllFilters.bind(this);
    this.relaceDate = this.relaceDate.bind(this);
  }

  componentDidMount() {
    this.getAllCatalog(this.state.currentPageGlobal);
    this.relaceDate();
  }

  async getAllCatalog(currentPage) {
    try {
      const axiosData1 = await axiosBaseUrlMoviesDiscover.get(
        `?sort_by=popularity.desc&with_genres=16&api_key=${
          apiConfig.apiKey
        }&language=${apiConfig.language}&page=${currentPage + 1}`
      );
      const data1 = axiosData1.data;
      try {
        const axiosData2 = await axiosBaseUrlSeriesDiscover.get(
          `?sort_by=popularity.desc&with_genres=16&api_key=${
            apiConfig.apiKey
          }&language=${apiConfig.language}&page=${currentPage + 1}`
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
        console.error('Erro ao pegar todas as series.');
      }
    } catch {
      console.error('Erro ao pegar todos os filmes.');
    }
  }

  randomArrMovieSeries() {
    const { allMoviesArr, allSeriesArr, all } = this.state;

    const newArr = [...allMoviesArr.results, ...allSeriesArr.results];
    const randomArrMovieSeriesPopular = { results: [] };
    const newArrIndex = [
      0, 21, 1, 22, 2, 23, 3, 24, 4, 25, 5, 26, 6, 27, 7, 28, 8, 29, 9, 30, 10,
      31, 11, 32, 12, 33, 13, 34, 14, 35, 15, 36, 16, 37, 17, 38, 18, 39, 19,
      40,
    ];

    newArrIndex.forEach((valueIndex) => {
      randomArrMovieSeriesPopular.results.push(newArr[valueIndex]);
    });

    if (!all) this.getImages(randomArrMovieSeriesPopular);

    this.setState({
      all: randomArrMovieSeriesPopular,
      pageCount:
        Number((allMoviesArr.total_pages + allSeriesArr.total_pages) / 2) >= 500
          ? 500
          : Number((allMoviesArr.total_pages + allSeriesArr.total_pages) / 2),
    });
  }

  getImages(all) {
    this.props.firstBackgroundSuccess({
      background: all.results[0].backdrop_path,
    });
  }

  async handlePagenationClick(event) {
    const currentPage = event.selected;
    this.setState({
      currentPageGlobal: currentPage,
    });

    const { searchFilterActived, releaseDate } = this.state;

    if (searchFilterActived) {
      return this.handleSearchSubmit(null, currentPage);
    }
    if (releaseDate || !currentPage || currentPage) {
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
      const newArrDataWithGenre16 = {
        results: data.results.filter(
          (result) => result.genre_ids && result.genre_ids.indexOf(16) !== -1
        ),
      };
      this.setState({
        all: newArrDataWithGenre16,
        pageCount:
          newArrDataWithGenre16.results.length === 20
            ? data.total_pages
            : newArrDataWithGenre16.results.length > 0
            ? 1
            : null,
        searchFilterActived: true,
        nameFilterValue: '',
        releaseDate: null,
      });
    } catch {
      console.error('Erro ao pesquisar titulo.');
    } finally {
      setTimeout(() => this.setState({ loadingFilters: false }), 100);
    }
  }

  async getAllFilters(event, currentPage) {
    if (event) event.preventDefault();
    const { releaseDate } = this.state;
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
        }&with_genres=16&primary_release_year=${releaseDate}`
      );
      const data1 = axiosData1.data;
      try {
        const axiosData2 = await axiosBaseUrlSeriesDiscover.get(
          `?api_key=${apiConfig.apiKey}&page=${
            !currentPage ? 1 : currentPage + 1
          }&language=${
            apiConfig.language
          }&with_genres=16&first_air_date_year=${releaseDate}`
        );
        const data2 = axiosData2.data;
        this.setState(
          {
            allMoviesArr: data1,
            allSeriesArr: data2,
            searchFilterActived: false,
            searchFilterValue: '',
          },
          this.randomArrMovieSeries
        );
      } catch {
        console.error('Erro ao pegar series por filtros.');
      }
    } catch {
      console.error('Erro ao pegar filmes por filtros.');
    } finally {
      setTimeout(() => this.setState({ loadingFilters: false }), 100);
    }
  }

  relaceDate() {
    this.currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 1990; i <= this.currentYear; i++) years.unshift(i);
    this.setState({
      years,
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
      all,
      loadingFilters,
      pageCount,
      searchFilterValue,
      currentPageGlobal,
      nameFilterValue,
      releaseDate,
      years,
      relaceDateActived,
    } = this.state;

    return (
      <CatalogContainer relaceDateActived={relaceDateActived}>
        <h1>Catalogo</h1>

        <div className="catalog-filter">
          <div className="name">
            <form onSubmit={(event) => event.preventDefault()}>
              <input
                id="name-id"
                placeholder="Nome da animação"
                value={nameFilterValue}
                onChange={(event) =>
                  this.setState({
                    nameFilterValue: event.target.value,
                  })
                }
              />
            </form>
          </div>
          <div className="year">
            {!releaseDate ? 'Ano' : releaseDate}
            <div className="relaceDate">
              <ul>
                {years.map((year, index) => (
                  <li
                    key={index}
                    onClick={(event) =>
                      this.setState(
                        {
                          relaceDateActived: !relaceDateActived,
                          releaseDate: event.target.innerText,
                        },
                        this.getAllFilters
                      )
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
              className="onClickActivedFilters"
              onClick={() =>
                this.setState({
                  relaceDateActived: !relaceDateActived,
                })
              }
            ></button>
          </div>
          <button
            type="button"
            className="reset-filters"
            onClick={() => {
              this.setState(
                {
                  nameFilterValue: '',
                  searchFilterValue: '',
                  releaseDate: null,
                  currentPageGlobal: 0,
                },
                () => {
                  this.setState({ loadingFilters: true });
                  this.getAllCatalog(0);
                  setTimeout(
                    () => this.setState({ loadingFilters: false }),
                    100
                  );
                }
              );
            }}
          >
            Resetar&nbsp;filtros
          </button>
          <div className="search-whit-filter">
            <div>
              <svg
                onClick={this.handleSearchSubmit}
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
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
                  placeholder="Pesquisar animação..."
                />
              </form>
            </div>
          </div>
        </div>

        <CatalogContainer2>
          {loadingFilters && <Loading />}
          {all && all.results.length
            ? all.results.map((result) => (
                <Link
                  key={result.id}
                  to={`/vertical/${result.title ? 'filmes' : 'series'}/${
                    result.title ? 'm' : 't'
                  }/${clearLinkTitle(
                    result.title ? result.title : result.name
                  )}/${result.id}`}
                  reloadDocument
                  data-filter-name={
                    result.title
                      ? result.title
                          .toLocaleLowerCase()
                          .indexOf(
                            nameFilterValue.toLocaleLowerCase().trim()
                          ) === -1
                        ? 'actived'
                        : ''
                      : result.name
                          .toLocaleLowerCase()
                          .indexOf(
                            nameFilterValue.toLocaleLowerCase().trim()
                          ) === -1
                      ? 'actived'
                      : ''
                  }
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
                    <Loading />

                    <div className="box-shadow-catalog">
                      <div className="movie-or-serie-catalog">
                        {result.title ? 'Filme' : 'Serie'}
                      </div>
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
              ))
            : all && (
                <div className="not-results-search-all-catalog">
                  <img src={notResultsSearch} />
                  <h4>Nenhum resultado.</h4>
                </div>
              )}
        </CatalogContainer2>
        <PagenationContainer>
          <ReactPaginate
            breakLabel="..."
            pageRangeDisplayed={3}
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

export default connect(null, actions)(AllCatalog);
