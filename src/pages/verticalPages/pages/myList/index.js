import { Helmet } from 'react-helmet-async';

import WatchList from '../../../myList/watchList/index';
import VerticalDivMyList from './styled';

export default function MinhaLista() {
  return (
    <>
      <Helmet>
        <title>MFLIX - Minha lista</title>
      </Helmet>
      <VerticalDivMyList>
        <WatchList colorMyListVertical />
      </VerticalDivMyList>
    </>
  );
}
