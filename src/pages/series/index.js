/* eslint-disable */

import { Helmet } from 'react-helmet-async';

import Footer from '../../components/footer/index';
import New from './new/index';
import AllCatalog from './allCatalog/index';
import Popular from './popular/index';
import Future from './future/index';
import Main from '../styled';

export default function Series() {
  return (
    <>
      <Helmet>
        <title>MFLIX - Series</title>
      </Helmet>
      <Main>
        <New />
        <AllCatalog />
        <Popular />
        <Future />
      </Main>
      <Footer />
    </>
  );
}
