import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './auth/reducer';
import firstBackground from './firstBackground/reducer';
import loading from './loading/reducer';
import loadBgHeader from './loadBgHeader/reducer';

/*
  Um recurso interessante do Redux é que podemos ter muitos
  redutores e combiná-los em um redutor raiz que a loja usa,
  usando combineReducers. Isso nos permite organizar
  facilmente nosso código enquanto ainda temos tudo em uma
  árvore de estado raiz.
*/

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['auth'],
  version: 1.1,
};

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth,
    firstBackground,
    loading,
    loadBgHeader,
  })
);

export default rootReducer;
