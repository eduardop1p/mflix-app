/* eslint-disable */

import { Helmet } from 'react-helmet-async';

import Footer from '../../components/footer/index';
import New from './new/index';
import AllCatalog from './allCatalog';
import Popular from './popular';
import Future from './future';
import Main from '../styled';

export default function Cartoons() {
  return (
    <>
      <Helmet>
        <title>MFLIX - Animações</title>
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
