import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useMedia } from 'use-media';

/* eslint-disable */

import * as actions from '../../storeReactRedux/modules/loadBgHeader/actions';
import Logo from '../logo';
import UserPhoto from '../userPhoto';

import {
  BackgroundImageHeader,
  HeaderElement,
  Search,
  MenuHambuguer,
  MenuActive,
} from './styled';

/* eslint-disable */
export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [headerSearchValue, setHeaderSearchValue] = useState('');

  const breackPoint950 = useMedia({ maxWidth: 950 });
  const breackPoint370 = useMedia({ maxWidth: 370 });

  const isLogedIn = useRef(useSelector((state) => state.auth.isLogedIn));
  const userName = useRef(useSelector((state) => state.auth.user.nome));
  const movieBackground = useSelector(
    (state) => state.firstBackgroundMovie.movieBackground
  );
  const dispatch = useDispatch();

  function setHeaderSearch(event) {
    if (!headerSearchValue) {
      return event.preventDefault();
    }
    return event;
  }

  return (
    <>
      {movieBackground && (
        <BackgroundImageHeader>
          <img
            src={`https://image.tmdb.org/t/p/original${movieBackground}`}
            onLoad={() =>
              dispatch(actions.loadBgHeaderSuccess({ loadBgHeader: true }))
            }
            onError={() =>
              dispatch(actions.loadBgHeaderSuccess({ loadBgHeader: true }))
            }
            alt="Bg image mflix homer"
          />
          {/* <BackgroundColorHeader></BackgroundColorHeader> */}
        </BackgroundImageHeader>
      )}

      <HeaderElement>
        <section className="section-1">
          <Link title="Home" reloadDocument to="/">
            <Logo />
            MFLIX
          </Link>
          {!breackPoint950 && (
            <nav>
              <NavLink
                title="Filmes"
                className={({ isActive }) => (isActive ? 'link-actived' : '')}
                reloadDocument
                to="/filmes"
              >
                Filmes
              </NavLink>
              <NavLink
                title="Series"
                className={({ isActive }) => (isActive ? 'link-actived' : '')}
                reloadDocument
                to="/series"
              >
                Series
              </NavLink>
              <NavLink
                title="Animaçãoes"
                className={({ isActive }) => (isActive ? 'link-actived' : '')}
                reloadDocument
                to="/animacoes"
              >
                Animações
              </NavLink>
              <NavLink
                title="Minha lista"
                className={({ isActive }) => (isActive ? 'link-actived' : '')}
                reloadDocument
                to="/minha-lista"
              >
                Minha&nbsp;lista
              </NavLink>
            </nav>
          )}
        </section>
        <section className="section-2">
          {!breackPoint370 ? (
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
          ) : (
            <Link
              style={{ display: 'flex', alignItems: 'center' }}
              to="/vertical/search"
              reloadDocument
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#fff"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </Link>
          )}
          {!breackPoint950 && (
            <div>
              {isLogedIn.current ? (
                <UserPhoto />
              ) : (
                <Link
                  title="Login"
                  reloadDocument
                  className="singn-up"
                  to="/login"
                >
                  Login
                </Link>
              )}
            </div>
          )}
          {breackPoint950 && (
            <MenuHambuguer menuActive={menuActive}>
              <div onClick={() => setMenuActive(!menuActive)}>
                <div className="h-1"></div>
                <div className="h-2"></div>
                <div className="h-1"></div>
              </div>
              {
                <MenuActive
                  onClick={(event) =>
                    event.target === event.currentTarget &&
                    setMenuActive(!menuActive)
                  }
                  menuActive={menuActive}
                >
                  <div>
                    {isLogedIn.current ? (
                      <>
                        <UserPhoto width60 />
                        <h5>{userName.current}</h5>
                      </>
                    ) : (
                      <Link
                        title="Login"
                        reloadDocument
                        className="singn-up"
                        to="/login"
                      >
                        {breackPoint950 ? 'L' : 'Login'}
                      </Link>
                    )}
                    <nav>
                      <NavLink
                        title="Filmes"
                        className={({ isActive }) =>
                          isActive ? 'link-actived' : ''
                        }
                        reloadDocument
                        to="/filmes"
                      >
                        Filmes
                      </NavLink>
                      <NavLink
                        title="Series"
                        className={({ isActive }) =>
                          isActive ? 'link-actived' : ''
                        }
                        reloadDocument
                        to="/series"
                      >
                        Series
                      </NavLink>
                      <NavLink
                        title="Animaçãoes"
                        className={({ isActive }) =>
                          isActive ? 'link-actived' : ''
                        }
                        reloadDocument
                        to="/animacoes"
                      >
                        Animações
                      </NavLink>
                      <NavLink
                        title="Minha lista"
                        className={({ isActive }) =>
                          isActive ? 'link-actived' : ''
                        }
                        reloadDocument
                        to="/minha-lista"
                      >
                        Minha&nbsp;lista
                      </NavLink>
                    </nav>
                  </div>
                </MenuActive>
              }
            </MenuHambuguer>
          )}
        </section>
      </HeaderElement>
      <Outlet />
    </>
  );
}
