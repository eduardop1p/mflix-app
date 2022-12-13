/* eslint-disable */

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../components/header/index';
import Account from '../pages/conta/index';
import Login from '../pages/login/index';
import User from '../pages/user/index';
import RecoveryPasswordEmail from '../pages/recoveryPasswordEmail';
import RecoveryPassword from '../pages/recoveryPassword';
import Index from '../pages/index/index';
import Movies from '../pages/movies/index';
import Series from '../pages/series/index';
import Cartoons from '../pages/cartoons/index';
import MyList from '../pages/myList/index';
import VerticalPages from '../pages/verticalPages/index';
import HomeV from '../pages/verticalPages/pages/home/index';
import MoviesV from '../pages/verticalPages/pages/movie/index';
import SeriesV from '../pages/verticalPages/pages/serie/index';
import MyListV from '../pages/verticalPages/pages/myList/index';
import Search from '../pages/verticalPages/pages/search/index';
import PageDetailsTitles from '../pages/pageDetailsTitles/index';
import Error404 from '../pages/error404/index';
import MyRouter from './myRouter';
import MyRouterMyList from './myRouterMyList';

import clearLinkTitle from '../config/clearLinkTitleConfig';
import axiosUserBaseUrl from '../services/axiosUserBaseUrl';

export default function Routers() {
  const { user, session, isLogedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLogedIn)
      axiosUserBaseUrl.defaults.headers.common['Authorization'] = session.id;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Index />} />
        <Route path="filmes" element={<Movies />} />
        <Route path="series" element={<Series />} />
        <Route path="animacoes" element={<Cartoons />} />
        <Route
          path="minha-lista"
          element={
            <MyRouterMyList>
              <MyList />
            </MyRouterMyList>
          }
        />
      </Route>

      <Route path="/vertical" element={<VerticalPages />}>
        <Route path="home" element={<HomeV />}>
          <Route path=":title/:id" element={<PageDetailsTitles />} />
        </Route>
        <Route path="filmes" element={<MoviesV />}>
          <Route path=":title/:id" element={<PageDetailsTitles />} />
        </Route>
        <Route path="series" element={<SeriesV />}>
          <Route path=":title/:id" element={<PageDetailsTitles />} />
        </Route>
        <Route path="search" element={<Search />} />
        <Route
          path="minha-lista"
          element={
            <MyRouterMyList>
              <MyListV />
            </MyRouterMyList>
          }
        />
      </Route>

      <Route
        path="/login"
        element={
          <MyRouter>
            <Login />
          </MyRouter>
        }
      />

      <Route path={`/${clearLinkTitle(user.nome)}`} element={<User />} />

      <Route path="/criar-conta" element={<Account />} />
      <Route
        key="RecoveryPasswordEmail"
        path="/recuperar-senha"
        element={
          <MyRouter>
            <RecoveryPasswordEmail />
          </MyRouter>
        }
      />

      <Route
        key="RecoveryPassword"
        path="/recuperar-senha/:userId"
        element={
          <MyRouter>
            <RecoveryPassword />
          </MyRouter>
        }
      />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
