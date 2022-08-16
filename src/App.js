import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider, Helmet } from 'react-helmet-async';

/* eslint-disable */

import 'swiper/css/bundle';

import LogedInMiddleware from './components/logedInMiddleware/index';
import GlobalStyled from './globalStyled/index';
import Routers from './routes/routers';
import Loading from './components/loading/index';
import { store, persistor } from './storeReactRedux/index';
import faviconIcon from './assets/images/icon-favicon.png';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <Helmet>
            <link rel="icon" type="image/png" href={faviconIcon}></link>
          </Helmet>
          <BrowserRouter>
            <GlobalStyled />
            <LogedInMiddleware />
            <Loading />
            <Routers />
          </BrowserRouter>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
