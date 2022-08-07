import { Component } from 'react';

import axiosBaseUrlMovies from '../../services/axiosBaseUrlMovies';
import apiConfig from '../../config/apiConfig';
import video from '../../assets/videos/Downtown but at Night.mp4';

/* eslint-disable*/
export default class GetTrailerMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieTrailer: null,
    };
  }

  componentDidMount() {
    const { movieId } = this.props;
    const getMovieTrailer = async () => {
      try {
        const { data } = await axiosBaseUrlMovies.get(
          `/${movieId}/videos?api_key=${apiConfig.apiKey}`
        );
        this.setState({
          movieTrailer: data,
        });
      } catch {
        console.error('Erro ao pegar trailer de filme.');
      }
    };
    getMovieTrailer();
  }

  render() {
    const { movieTrailer } = this.state;
    const { widthDetails, loadingDetails } = this.props;
    let trailer;
    try {
      const filterTrailer =
        movieTrailer &&
        movieTrailer.results.filter((trailer) => trailer.type === 'Trailer');
      trailer = filterTrailer[0].key;
    } catch {
      trailer = undefined;
    }

    return trailer ? (
      <iframe
        width={widthDetails ? widthDetails : '600'}
        height="100%"
        loading={loadingDetails ? loadingDetails : 'lazy'}
        src={`https://www.youtube.com/embed/${trailer}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
      ></iframe>
    ) : (
      <>
        <div className="msg-video-trailer-error">
          Ainda não existe um trailer pra este filme.
        </div>
        <video controls src={video}></video>
      </>
    );
  }
}
