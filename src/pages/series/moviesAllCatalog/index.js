import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

/* eslint-disable */

import * as actions from '../../../storeReactRedux/modules/firstBackgroundMovie/actions';
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
import LoadingFilter from '../../../components/loadingFilters/index';
import { color1 } from '../../../colors';
import { Catalog, CatalogMovies, ContainerPagenation } from './styled';

class MoviesAllCatalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allMovies: null,
      pageCount: 0,
      loadingFilters: false,
      searchFilterValue: '',
      searchFilterActived: false,
      currentPageGlobal: 0,
      genreActived: false,
      relaceDateActived: false,
      allGenresMovies: null,
      genreName: 'Genero',
      nameMovieFilterValue: '',
      genreId: null,
      releaseDate: null,
      yearsMovies: [],
    };

    this.getAllMoviesCatalog = this.getAllMoviesCatalog.bind(this);
    this.getImages = this.getImages.bind(this);
    this.handlePagenationClick = this.handlePagenationClick.bind(this);
    this.handleSearchMoviesSubmit = this.handleSearchMoviesSubmit.bind(this);
    this.getAllMoviesFilters = this.getAllMoviesFilters.bind(this);
    this.relaceDateMovies = this.relaceDateMovies.bind(this);
  }

  componentDidMount() {
    this.getAllMoviesCatalog(this.state.currentPageGlobal);

    const getAllGenresFilters = async () => {
      try {
        const { data } = await axiosBaseUrlGenresSeries.get(
          `/list?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        this.setState({
          allGenresMovies: data,
        });
      } catch {
        console.error('Erro ao pegar generos');
      }
    };
    getAllGenresFilters();
    this.relaceDateMovies();
  }

  async getAllMoviesCatalog(currentPage) {
    try {
      const { data } = await axiosBaseUrlSeries.get(
        `/popular?api_key=${apiConfig.apiKey}&language=${
          apiConfig.language
        }&page=${currentPage + 1}`
      );
      if (!this.state.allMovies) this.getImages(data);
      this.setState({
        allMovies: data,
        pageCount: 500,
      });
    } catch {
      console.error('Erro ao pegar todas as series.');
    }
  }

  async getImages(allMovies) {
    let movieSerieImage = null;
    try {
      const { data } = await axiosBaseUrlSeries.get(
        `/${allMovies.results[0].id}/images?api_key=${apiConfig.apiKey}&language=${apiConfig.language}&include_image_language=en,null`
      );
      movieSerieImage = { data, title: allMovies.results[0].name };
    } catch {
      console.error('Erro ao pegar image de serie.');
    }

    this.props.firstBackgroundMovieSuccess({
      movieBackground: allMovies.results[0].backdrop_path,
      movieSerieImage,
    });
  }

  async handlePagenationClick(event) {
    const currentPage = event.selected;
    this.setState({
      currentPageGlobal: currentPage,
    });

    const { searchFilterActived, genreId, releaseDate } = this.state;

    if (searchFilterActived) {
      return this.handleSearchMoviesSubmit(null, currentPage);
    }
    if (genreId || releaseDate || !currentPage || currentPage) {
      return this.getAllMoviesFilters(null, currentPage);
    }
  }

  async handleSearchMoviesSubmit(event, currentPage) {
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
        allMovies: data,
        pageCount: data.total_pages >= 500 ? 500 : data.total_pages,
        searchFilterActived: true,
        genreName: 'Genero',
        nameMovieFilterValue: '',
        genreId: null,
        releaseDate: null,
      });
    } catch {
      console.error('Erro ao pesquisar serie.');
    } finally {
      setTimeout(() => this.setState({ loadingFilters: false }), 100);
    }
  }

  async getAllMoviesFilters(event, currentPage) {
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
        allMovies: data,
        pageCount: data.total_pages >= 500 ? 500 : data.total_pages,
      });
    } catch {
      console.error('Erro ao pegar series por filtros.');
    } finally {
      setTimeout(() => this.setState({ loadingFilters: false }), 100);
    }
  }

  relaceDateMovies() {
    this.currentYear = new Date().getFullYear();
    const yearsMovies = [];
    for (let i = 1990; i <= this.currentYear; i++) yearsMovies.unshift(i);
    this.setState({
      yearsMovies,
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
      allMovies,
      loadingFilters,
      pageCount,
      searchFilterValue,
      currentPageGlobal,
      genreActived,
      nameMovieFilterValue,
      allGenresMovies,
      genreName,
      releaseDate,
      yearsMovies,
      relaceDateActived,
    } = this.state;

    return (
      <Catalog
        genreActived={genreActived}
        relaceDateActived={relaceDateActived}
      >
        <h1>Catalogo</h1>

        <div className="catalog-filter">
          <div className="name-movie">
            <form onSubmit={(event) => event.preventDefault()}>
              <input
                id="movie-name-id"
                placeholder="Nome serie"
                value={nameMovieFilterValue}
                onChange={(event) =>
                  this.setState({
                    nameMovieFilterValue: event.target.value,
                  })
                }
              />
            </form>
          </div>
          <div className="genre-movie">
            {genreName}
            <div className="genres">
              <ul>
                {allGenresMovies &&
                  allGenresMovies.genres.map((genre) => (
                    <li
                      key={genre.id}
                      data-genre-id={genre.id}
                      onClick={(event) =>
                        this.setState(
                          {
                            genreActived: !genreActived,
                            genreName: genre.name,
                            genreId: event.target.getAttribute('data-genre-id'),
                          },
                          this.getAllMoviesFilters
                        )
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
              className="onClickActivedFilters"
              onClick={() => this.setState({ genreActived: !genreActived })}
            ></button>
          </div>
          <div className="year-movie">
            {!releaseDate ? 'Ano' : releaseDate}
            <div className="relaceDate">
              <ul>
                {yearsMovies.map((year, index) => (
                  <li
                    key={index}
                    onClick={(event) =>
                      this.setState(
                        {
                          relaceDateActived: !relaceDateActived,
                          releaseDate: event.target.innerText,
                        },
                        this.getAllMoviesFilters
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
                  nameMovieFilterValue: '',
                  searchFilterValue: '',
                  genreName: 'Genero',
                  genreId: null,
                  releaseDate: null,
                  currentPageGlobal: 0,
                },
                () => {
                  this.setState({ loadingFilters: true });
                  this.getAllMoviesCatalog(0);
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
          <div className="search-movie-whit-filter">
            <div>
              <svg
                onClick={this.handleSearchMoviesSubmit}
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
                fill="#fff"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
              <form onSubmit={this.handleSearchMoviesSubmit}>
                <input
                  value={searchFilterValue}
                  onChange={(event) =>
                    this.setState({ searchFilterValue: event.target.value })
                  }
                  id="search-movie-filters"
                  placeholder="Pesquisar serie..."
                />
              </form>
            </div>
          </div>
        </div>
        <CatalogMovies>
          {loadingFilters && <LoadingFilter />}
          {allMovies && allMovies.results.length
            ? allMovies.results.map((result) => (
                <Link
                  key={result.id}
                  to={`/vertical/series/t/${clearLinkTitle(result.name)}/${
                    result.id
                  }`}
                  reloadDocument
                  data-filter-name={
                    result.name
                      .toLocaleLowerCase()
                      .indexOf(
                        nameMovieFilterValue.toLocaleLowerCase().trim()
                      ) === -1
                      ? 'actived'
                      : ''
                  }
                >
                  <div className="movie-catalog-img" data-loading>
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

                    <div className="box-shadow-movie-catalog"></div>
                    <div className="movie-catalog-details">
                      <h5>{result.name}</h5>
                      <div className="movie-catalog-rating-data">
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
            : allMovies && (
                <div className="not-results-search-all-catalog">
                  <img src={notResultsSearch} />
                  <h4>Nenhum resultado.</h4>
                </div>
              )}
        </CatalogMovies>
        <ContainerPagenation>
          <ReactPaginate
            breakLabel="..."
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            forcePage={currentPageGlobal}
            onPageChange={this.handlePagenationClick}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
          />
        </ContainerPagenation>
      </Catalog>
    );
  }
}

export default connect(null, actions)(MoviesAllCatalog);
