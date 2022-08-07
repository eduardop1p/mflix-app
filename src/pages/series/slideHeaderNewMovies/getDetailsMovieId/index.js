import { Component } from 'react';
import { Link } from 'react-router-dom';

import clearLinkTitle from '../../../../config/clearLinkTitle';
import RatingSystem from '../../../../components/ratingSystem/index';
import apiConfig from '../../../../config/apiConfig';
import axiosBaseUrlSeries from '../../../../services/axiosBaseUrlSeries';
import { MovieForId } from './styled';

/* eslint-disable */
export default class GetDetailsMovieId extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMoviesId: null,
    };
  }

  componentDidMount() {
    const { movieId } = this.props;

    const getDetailsMovieId = async (movieId) => {
      try {
        const { data } = await axiosBaseUrlSeries.get(
          `/${movieId}?api_key=${apiConfig.apiKey}&language=${apiConfig.language}`
        );
        this.setState({
          newMoviesId: data,
        });
      } catch {
        console.error('Erro ao obter Id de Serie');
      }
    };
    getDetailsMovieId(movieId);
  }

  render() {
    const { newMoviesId } = this.state;

    return (
      newMoviesId && (
        <MovieForId>
          <div className="production-companies">
            {newMoviesId.production_companies.length > 0
              ? newMoviesId.production_companies
                  .slice(-1)
                  .map((objValue) => objValue.name)
              : 'Estúdio desconhecido.'}
          </div>
          <div className="vote-average">
            Rating
            <div className="rating-system">
              <RatingSystem vote_average={newMoviesId.vote_average} />
            </div>
          </div>
          <div className="overview">
            {newMoviesId.overview
              ? newMoviesId.overview
              : 'Não à descrição para este titulo por enquanto.'}
          </div>
          <div className="genres">
            {newMoviesId.genres
              .slice(0, 2)
              .map((value) => value.name)
              .join(', ')}
          </div>
          <div className="release-date">
            {newMoviesId.first_air_date
              ? newMoviesId.first_air_date.slice(0, 4)
              : 'Not data'}
          </div>
          <Link
            to={`/vertical/series/t/${clearLinkTitle(newMoviesId.name)}/${
              newMoviesId.id
            }`}
            reloadDocument
          >
            <button type="button" className="watch-online">
              Assitir&nbsp;online
            </button>
          </Link>
        </MovieForId>
      )
    );
  }
}
