import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';

/* eslint-disable */
import * as actions from '../../storeReactRedux/modules/loadBgHeader/actions';
import Logo from '../logo';
import profilePath from '../../assets/images/171045158_354469046006037_4005434614416819506_n[3].jpg';
import clearLinkTitle from '../../config/clearLinkTitle';

import {
  BackgroundImageHeader,
  HeaderElement,
  Search,
  MenuHambuguer,
  ProfilePhoto,
} from './styled';

/* eslint-disable */
export default function Header() {
  const [bgHeaderState, setBgHeaderState] = useState(null);
  const [menuActive, setMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [headerSearchValue, setHeaderSearchValue] = useState('');

  const user = useRef(useSelector((state) => state.auth.user));
  const movieBackground = useSelector(
    (state) => state.firstBackgroundMovie.movieBackground
  );
  const dispatch = useDispatch();

  useEffect(() => {
    bgHeader();
  }, [movieBackground, dispatch]);

  function bgHeader() {
    if (movieBackground) {
      const imgBg = new Image();
      imgBg.src = `https:image.tmdb.org/t/p/original${movieBackground}`;
      imgBg.addEventListener('load', () => {
        setBgHeaderState(imgBg.src);
        dispatch(actions.loadBgHeaderSuccess({ loadBgHeader: true }));
      });
      imgBg.addEventListener('error', () => {
        setBgHeaderState(imgBg.src);
        dispatch(actions.loadBgHeaderSuccess({ loadBgHeader: true }));
      });
      return;
    }
    return;
  }

  function setHeaderSearch(event) {
    if (!headerSearchValue) {
      return event.preventDefault();
    }
    return event;
  }

  return (
    <>
      <BackgroundImageHeader movieBackground={bgHeaderState && bgHeaderState}>
        {/* <BackgroundColorHeader></BackgroundColorHeader> */}
      </BackgroundImageHeader>

      <HeaderElement>
        <section className="section-1">
          <Link reloadDocument to="/">
            <Logo />
            MFLIX
          </Link>
          <nav>
            <NavLink
              className={({ isActive }) => (isActive ? 'link-actived' : '')}
              reloadDocument
              to="/filmes"
            >
              Filmes
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'link-actived' : '')}
              reloadDocument
              to="/series"
            >
              Series
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'link-actived' : '')}
              reloadDocument
              to="/animacoes"
            >
              Animações
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'link-actived' : '')}
              reloadDocument
              to="/minha-lista"
            >
              Minha&nbsp;lista
            </NavLink>
          </nav>
        </section>
        <section className="section-2">
          <Search searchActive={searchActive}>
            <form onSubmit={setHeaderSearch} action="/vertical/search">
              <input
                type="text"
                name="search_query"
                placeholder="Pesquisar"
                value={headerSearchValue}
                onChange={(event) => setHeaderSearchValue(event.target.value)}
              />
            </form>
            <svg
              onClick={() => setSearchActive(!searchActive)}
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#fff"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </Search>
          {!user.current._id && (
            <Link reloadDocument className="singn-up" to="/login">
              Login
            </Link>
          )}
          {user.current._id && (
            <ProfilePhoto title="Editar perfil">
              <Link
                to={clearLinkTitle(
                  `/${user.current.nome !== 'visitor' ? user.current.nome : ''}`
                )}
                reloadDocument
              >
                <div className="profile-photo">
                  <img src={profilePath} />
                </div>
              </Link>
            </ProfilePhoto>
          )}
          {/* <MenuHambuguer
            menuActive={menuActive}
            onClick={() => setMenuActive(!menuActive)}
          >
            <div></div>
            <div></div>
            <div></div>
          </MenuHambuguer> */}
        </section>
      </HeaderElement>
      <Outlet />
    </>
  );
}
