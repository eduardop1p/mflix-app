import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

/* eslint-disable */

import * as actions from '../../storeReactRedux/modules/firstBackground/actions';
import * as actionsy from '../../storeReactRedux/modules/loading/actions';

import Footer from '../../components/footer/index';
import New from './new/index';
import AllCatalog from './allCatalog/index';
import Popular from './popular/index';
import Future from './future/index';
import Main from '../styled';

export default function Movies() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.firstBackgroundSuccess({ background: true }));
    setTimeout(() => dispatch(actionsy.loadingFailure()), 500);
  }, []);

  return (
    <>
      <Helmet>
        <title>MFLIX - Filmes</title>
      </Helmet>
      <Main>
        <New />
        <AllCatalog />
        {/* <Popular />
        <Future /> */}
      </Main>
      <Footer />
    </>
  );
}
