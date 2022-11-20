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
  CatalogTitles,
  PagenationContainer,
} from '../../styled';

/* eslint-disable */
class AllCatalog extends Component {
  constructor(props) {
    super(props);

    this.useMedia360 = matchMedia('(max-width: 360px)');

    this.state = {
      all: null,
      loadingFilters: false,
      allMoviesArr: null,
      allSeriesArr: null,
      pageCount: 0,
      searchFilterValue: '',
      searchFilterActived: false,
      currentPageGlobal: 0,
      releaseDateActived: false,
      releaseDate: 'Ano',
      years: [],
      breakPoint360: this.useMedia360.matches,
    };

    this.getAllCatalog = this.getAllCatalog.bind(this);
    this.getImages = this.getImages.bind(this);
    this.randomArrMovieSeries = this.randomArrMovieSeries.bind(this);
    this.handlePagenationClick = this.handlePagenationClick.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.getAllFilters = this.getAllFilters.bind(this);
    this.releaseDate = this.releaseDate.bind(this);
    this.yearOrGenreActive = this.yearOrGenreActive.bind(this);
  }

  componentDidMount() {
    this.useMedia360.addEventListener('change', (event) =>
      this.setState({
        breakPoint360: event.matches,
      })
    );

    this.getAllCatalog(this.state.currentPageGlobal);
    this.releaseDate();
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

  releaseDate() {
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
    if (!loadingSpinner) return;
    return loadingSpinner.remove();
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

  render() {
    const {
      all,
      loadingFilters,
      pageCount,
      searchFilterValue,
      currentPageGlobal,
      releaseDate,
      years,
      releaseDateActived,
      breakPoint360,
    } = this.state;

    return (
      <CatalogContainer releaseDateActived={releaseDateActived} cartoons>
        <h1>Catalogo</h1>
        <div className="catalog-filter">
          <div className="year">
            <span>{releaseDate}</span>
            <div className="releaseDate">
              <ul>
                {years.map((year, index) => (
                  <li
                    key={index}
                    onClick={(event) => this.yearOrGenreActive('year', event)}
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
                this.setState({
                  releaseDateActived: !releaseDateActived,
                })
              }
            ></button>
          </div>

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
                  placeholder="Pesquisar animação..."
                />
              </form>
            </div>
          </div>
        </div>

        <CatalogTitles>
          {loadingFilters && <Loading colorTranparent />}
          {all && all.results.length ? (
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
                      <div className="movie-or-serie-catalog">
                        {result.title ? 'Filme' : 'Serie'}
                      </div>
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

                      <div className="box-shadow-catalog"></div>
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
            )
          ) : (
            <div className="not-results-search-all-catalog">
              <img src={notResultsSearch} />
              <h4>Nenhum resultado.</h4>
            </div>
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

export default connect(null, actions)(AllCatalog);
