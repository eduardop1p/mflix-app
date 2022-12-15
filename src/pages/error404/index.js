/* eslint-disable */

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import * as actions from '../../storeReactRedux/modules/loading/actions';
import astronaut from '../../assets/images/astronaut.svg';
import moon from '../../assets/images/moon.svg';
import { ErrorSection, Error } from './styled';

export default function Error404() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(actions.loadingFailure());
    }, 500);
  }, []);

  return (
    <ErrorSection>
      <Helmet>
        <title>{'MFLIX - ERROR 404 (Página não encontrada)'}</title>
      </Helmet>
      <Error>
        <div className="error-moon">
          <h1>4</h1>
          <div id="moon">
            <div>
              <img src={moon} />
              <div className="b1"></div>
              <div className="b2"></div>
            </div>
            <img src={astronaut} />
          </div>
          <h1>4</h1>
        </div>
        <div className="back-to-home">
          <Link reloadDocument to="/">
            Voltar para home
          </Link>
        </div>
      </Error>
    </ErrorSection>
  );
}
