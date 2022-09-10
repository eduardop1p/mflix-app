import { Helmet } from 'react-helmet-async';

import WatchList from '../../../../pages/minhaLista/watchList/index';

export default function MinhaLista() {
  return (
    <>
      <Helmet>
        <title>MFLIX - Minha lista</title>
      </Helmet>
      <WatchList heightVertical fourVertical margin />
    </>
  );
}
