import { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../components/header/index';
import Conta from '../pages/conta/index';
import Login from '../pages/login/index';
import User from '../pages/user/index';
import RecoveryPasswordEmail from '../pages/recoveryPasswordEmail';
import RecoveryPassword from '../pages/recoveryPassword';
import Index from '../pages/index/index';
import Movies from '../pages/movies/index';
import Series from '../pages/series/index';
import Cartoons from '../pages/cartoons/index';
import MinhaLista from '../pages/minhaLista/index';
import VerticalHeader from '../components/verticalHeaderSearch/index';
import HomeAlt from '../components/verticalHeaderSearch/pages/homeAlt/index';
import FilmesAlt from '../components/verticalHeaderSearch/pages/filmesAlt/index';
import SeriesAlt from '../components/verticalHeaderSearch/pages/seriesAlt/index';
import MinhaListaAlt from '../components/verticalHeaderSearch/pages/minhaListaAlt/index';
import Search from '../components/verticalHeaderSearch/pages/search/index';
import MoviePageDetails from '../components/moviePageDetails/index';
import Error404 from '../components/error404/index';
import MyRouter from './myRouter';

import clearLinkTitle from '../config/clearLinkTitle';

export default function Routers() {
  const user = useRef(useSelector((state) => state.auth.user));

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Index />} />
        <Route path="filmes" element={<Movies />} />
        <Route path="series" element={<Series />} />
        <Route path="animacoes" element={<Cartoons />} />
        <Route path="minha-lista" element={<MinhaLista />} />
      </Route>

      <Route path="/vertical" element={<VerticalHeader />}>
        <Route path="home" element={<HomeAlt />}>
          <Route
            path=":TOrM/:movieTitle/:movieId"
            element={<MoviePageDetails />}
          />
        </Route>
        <Route path="filmes" element={<FilmesAlt />}>
          <Route
            path=":TOrM/:movieTitle/:movieId"
            element={<MoviePageDetails />}
          />
        </Route>
        <Route path="series" element={<SeriesAlt />}>
          <Route
            path=":TOrM/:movieTitle/:movieId"
            element={<MoviePageDetails />}
          />
        </Route>
        <Route path="search" element={<Search />} />
        <Route path="minha-lista" element={<MinhaListaAlt />} />
      </Route>

      <Route
        path="/login"
        element={
          <MyRouter>
            <Login />
          </MyRouter>
        }
      />
      <Route
        path={clearLinkTitle(
          `/${user.current.nome !== 'visitor' ? user.current.nome : ''}`
        )}
        element={<User />}
      />
      <Route path="/criar-conta" element={<Conta />} />
      <Route path="/recuperar-senha" element={<RecoveryPasswordEmail />} />
      <Route path="/recuperar-senha/:userId" element={<RecoveryPassword />} />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
