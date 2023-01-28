import { useEffect, useState } from 'react';

import axiosBaseUrlSeries from '../../services/axiosBaseUrlSeries';
import apiConfig from '../../config/apiConfig';
import video from '../../assets/videos/Downtown but at Night.mp4';
import MsgVideoTrailerErrorContainer from './styled';

/* eslint-disable*/
export default function GetTrailerSerie(props) {
  const { id, setShowFutureAllTrailer, onLazyIframe, index } = props;

  const [trailer, setTrailer] = useState([]);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const { data } = await axiosBaseUrlSeries.get(
          `/${id}/videos?api_key=${apiConfig.apiKey}`
        );
        if (data.results.length)
          setTrailer(
            data.results.filter(
              (trailer) => trailer.type === 'Trailer' && trailer.official
            )
          );
      } catch {
        console.error('Erro ao pegar trailer de serie.');
      }
    };
    if (onLazyIframe) {
      if (index !== 1) {
        setShowFutureAllTrailer((showFutureAllTrailer) => [
          ...showFutureAllTrailer,
          { showIframe, setShowIframe },
        ]);
      } else {
        setShowIframe(true);
      }
    }
    getTrailer();
  }, []);

  return trailer.length ? (
    onLazyIframe ? (
      <div style={{ height: '100%', width: '100%', cursor: 'pointer' }}>
        {showIframe && (
          <iframe
            width="100%"
            height="100%"
            loading="eager"
            src={`https://www.youtube-nocookie.com/embed/${trailer[0].key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        )}
      </div>
    ) : (
      <iframe
        width="100%"
        height="100%"
        loading="eager"
        src={`https://www.youtube-nocookie.com/embed/${trailer[0].key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
      ></iframe>
    )
  ) : (
    <MsgVideoTrailerErrorContainer>
      <small>Ainda não existe um trailer pra esta serie.</small>
      <video controls src={video}></video>
    </MsgVideoTrailerErrorContainer>
  );
}
