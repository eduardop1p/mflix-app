/* eslint-disable */

import { Helmet } from 'react-helmet-async';

import Footer from '../../components/footer/index';
import WatchList from './watchList/index';
import Main from './styled';

export default function MyList() {
  return (
    <>
      <Helmet>
        <title>MFLIX - Minha lista</title>
      </Helmet>
      <Main>
        <WatchList />
      </Main>
      <Footer />
    </>
  );
}
