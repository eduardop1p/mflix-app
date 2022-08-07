import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import * as actions from '../../../../storeReactRedux/modules/loading/actions';

export default function MinhaListaAlt() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(actions.loadingFailure());
    }, 500);
  }, []);

  return (
    <>
      <Helmet>
        <title>MFLIX - Minha lista</title>
      </Helmet>
      <h1 style={{ color: '#fff' }}>Seus favoritos aqui.</h1>
    </>
  );
}
