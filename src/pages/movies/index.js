import { Helmet } from 'react-helmet-async';
import { Context as ResponsiveContext } from 'react-responsive';

/* eslint-disable */

import Footer from '../../components/footer/index';
import New from './new/index';
import AllCatalog from './allCatalog/index';
import Popular from './popular/index';
import Future from './future/index';
import Main from '../styled';

export default function Movies() {
  return (
    <>
      <Helmet>
        <title>MFLIX - Filmes</title>
      </Helmet>
      <Main>
        <New />
        <AllCatalog />
        <ResponsiveContext.Provider value={{ maxWidth: 500 }}>
          <Popular />
        </ResponsiveContext.Provider>
        <Future />
      </Main>
      <Footer />
    </>
  );
}
