import { Component } from 'react';

import axiosBaseUrlSeries from '../../services/axiosBaseUrlSeries';
import apiConfig from '../../config/apiConfig';
import video from '../../assets/videos/Downtown but at Night.mp4';

/* eslint-disable*/
export default class GetTrailerSerie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trailer: [],
    };
  }

  componentDidMount() {
    const { id } = this.props;
    const getTrailer = async (id) => {
      try {
        const { data } = await axiosBaseUrlSeries.get(
          `/${id}/videos?api_key=${apiConfig.apiKey}`
        );
        this.setState({
          trailer: data.results.filter((trailer) => trailer.type === 'Trailer'),
        });
      } catch {
        console.error('Erro ao pegar trailer de filme.');
      }
    };
    getTrailer(id);
  }

  render() {
    const { trailer } = this.state;
    const { loadingDetails } = this.props;

    return trailer.length ? (
      <iframe
        width="100%"
        height="100%"
        loading={loadingDetails ? loadingDetails : 'lazy'}
        src={`https://www.youtube.com/embed/${trailer[0].key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
      ></iframe>
    ) : (
      <>
        <div className="msg-video-trailer-error">
          Ainda não existe um trailer pra esta serie.
        </div>
        <video controls src={video}></video>
      </>
    );
  }
}
