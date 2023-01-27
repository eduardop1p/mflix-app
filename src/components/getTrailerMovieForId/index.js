import { useEffect, useState } from 'react';

import axiosBaseUrlMovies from '../../services/axiosBaseUrlMovies';
import apiConfig from '../../config/apiConfig';
import video from '../../assets/videos/Downtown but at Night.mp4';
import MsgVideoTrailerErrorContainer from './styled';

/* eslint-disable*/
export default function GetTrailerMovie(props) {
  const { id } = props;

  const [trailer, setTrailer] = useState([]);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const { data } = await axiosBaseUrlMovies.get(
          `/${id}/videos?api_key=${apiConfig.apiKey}`
        );

        if (data.results.length)
          setTrailer(
            data.results.filter(
              (trailer) => trailer.type === 'Trailer' && trailer.official
            )
          );
      } catch {
        console.error('Erro ao pegar trailer de filme.');
      }
    };
    getTrailer();
  }, []);

  // loading= e loading=eager.

  return trailer.length ? (
    <div
      onClick={() => setShowIframe(true)}
      style={{ height: '100%', width: '100%', cursor: 'pointer' }}
    >
      {/* {setShowIframe && (
        )} */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        src={`https://www.youtube-nocookie.com/embed/${trailer[0].key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
      ></iframe>
    </div>
  ) : (
    <MsgVideoTrailerErrorContainer>
      <small>Ainda não existe um trailer pra este filme.</small>
      <video controls src={video}></video>
    </MsgVideoTrailerErrorContainer>
  );
}
