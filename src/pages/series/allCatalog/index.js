import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

/* eslint-disable */

import * as actions from '../../../storeReactRedux/modules/firstBackground/actions';
import apiConfig from '../../../config/apiConfig';
import axiosBaseUrlGenresSeries from '../../../services/axiosBaseUrlGenresSeries';
import axiosBaseUrlSeriesDiscover from '../../../services/axiosBaseUrlSeriesDiscover';
import axiosBaseUrlSeries from '../../../services/axiosBaseUrlSeries';
import axiosBaseUrlSearchSerie from '../../../services/axiosBaseUrlSearchSerie';
import clearLinkTitle from '../../../config/clearLinkTitle';
import RatingSystem from '../../../components/ratingSystem/index';
import imageErrorTop3 from '../../../assets/images/czx7z2e6uqg81.jpg';
import notResultsSearch from '../../../assets/images/search.png';
import Loading from '../../../components/loadingReactStates/index';
import { color1 } from '../../../colors';
import {
  CatalogContainer,
  CatalogTitles,
  PagenationContainer,
} from '../../styled';

class AllCatalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      all: null,
      pageCount: 0,
      loadingFilters: false,
      searchFilterValue: '',
      searchFilterActived: false,
      currentPageGlobal: 0,
      genreActived: false,
      releaseDateActived: false,
      allGenres: null,
      genreName: 'Gênero',
      genreId: null,
      releaseDate: 'Ano',
      years: [],
    };

    this.getAllCatalog = this.getAllCatalog.bind(this);
    this.getImages = this.getImages.bind(this);
    this.handlePagenationClick = this.handlePagenationClick.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.getAllFilters = this.getAllFilters.bind(this);
    this.releaseDate = this.releaseDate.bind(this);
    this.yearOrGenreActive = this.yearOrGenreActive.bind(this);
  }

  componentDidMount() {
    this.getAllCatalog(this.state.currentPageGlobal);

    const getAllGenresFilters = async () => {
      try {
        const { data } = await axiosBaseUrlGenresSeries.get(
          `/list?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        this.setState({
          allGenres: data,
        });
      } catch {
        console.error('Erro ao pegar gêneros');
      }
    };
    getAllGenresFilters();
    this.releaseDate();
  }

  async getAllCatalog(currentPage) {
    try {
      const { data } = await axiosBaseUrlSeries.get(
        `/popular?api_key=${apiConfig.apiKey}&language=${
          apiConfig.language
        }&page=${currentPage + 1}`
      );
      if (!this.state.all) this.getImages(data);
      this.setState({
        all: data,
        pageCount: 500,
      });
    } catch {
      console.error('Erro ao pegar todas as series.');
    }
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
      const { data } = await axiosBaseUrlSearchSerie.get(
        `?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&page=${
          !currentPage ? 1 : currentPage + 1
        }&query=${searchFilterValue}`
      );
      this.setState({
        all: data,
        pageCount: data.total_pages >= 500 ? 500 : data.total_pages,
        searchFilterActived: true,
        genreName: 'Gênero',
        genreId: null,
        releaseDate: 'Ano',
      });
    } catch {
      console.error('Erro ao pesquisar serie.');
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
      const { data } = await axiosBaseUrlSeriesDiscover.get(
        `?api_key=${apiConfig.apiKey}&page=${
          !currentPage ? 1 : currentPage + 1
        }&language=${
          apiConfig.language
        }&with_genres=${genreId}&first_air_date_year=${releaseDate}`
      );
      this.setState({
        searchFilterActived: false,
        searchFilterValue: '',
        all: data,
        pageCount: data.total_pages >= 500 ? 500 : data.total_pages,
      });
    } catch {
      console.error('Erro ao pegar series por filtros.');
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
    return loadingSpinner.remove();
  }

  yearOrGenreActive(active, event) {
    const { releaseDate, genreName } = this.state;

    if (event.target.innerText === releaseDate) return;

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
      genreActived,
      allGenres,
      genreName,
      releaseDate,
      years,
      releaseDateActived,
    } = this.state;

    return (
      <CatalogContainer
        genreActived={genreActived}
        releaseDateActived={releaseDateActived}
      >
        <h1>Catalogo</h1>

        <div className="catalog-filter">
          <div
            className="year"
            onClick={(event) =>
              !event.target.classList.contains('stop-event') &&
              this.setState({ releaseDateActived: !releaseDateActived })
            }
          >
            <span>{releaseDate}</span>
            <div className="releaseDate stop-event">
              <ul className="stop-event">
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
          </div>
          <div
            className="genre"
            onClick={(event) =>
              !event.target.classList.contains('stop-event') &&
              this.setState({ genreActived: !genreActived })
            }
          >
            <span>{genreName}</span>
            <div className="genres stop-event">
              <ul className="stop-event">
                {allGenres &&
                  allGenres.genres.map((genre) => (
                    <li
                      key={genre.id}
                      data-genre-id={genre.id}
                      onClick={(event) =>
                        this.yearOrGenreActive('genre', event)
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
          </div>

          <div className="search-filter">
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
                  placeholder="Pesquisar serie..."
                />
              </form>
            </div>
          </div>
        </div>
        <CatalogTitles>
          {loadingFilters && <Loading colorTranparent />}
          {all && all.results.length ? (
            all.results.map((result) => (
              <Link
                key={result.id}
                to={`/vertical/series/${clearLinkTitle(result.name)}/${
                  result.id
                }`}
                reloadDocument
              >
                <div className="catalog-img" data-loading>
                  <img
                    src={
                      result.poster_path
                        ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                        : imageErrorTop3
                    }
                    onLoad={this.removeLoadingSipnner}
                    onError={this.removeLoadingSipnner}
                    alt={result.name}
                  />
                  <Loading />

                  <div className="box-shadow-catalog"></div>
                  <div className="catalog-details">
                    <h5>{result.name}</h5>
                    <div className="catalog-rating-data">
                      <div>
                        <RatingSystem
                          vote_average={result.vote_average}
                          color={color1}
                        />
                      </div>
                      <div>
                        {result.first_air_date
                          ? result.first_air_date.slice(0, 4)
                          : 'Not Data'}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
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
