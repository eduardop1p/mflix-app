import { NavLink, Outlet, Link } from 'react-router-dom';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

import UserPhoto from '../../components/userPhoto/index';
import Logo from '../../components/logo/index';
import { Container, ContainerHeaderVertical } from './styled';

/* eslint-disable */
export default function VerticalPages() {
  const isLogedIn = useRef(useSelector((state) => state.auth.isLogedIn));

  return (
    <Container>
      <ContainerHeaderVertical>
        <div>
          {isLogedIn.current ? (
            <UserPhoto />
          ) : (
            <Link
              reloadDocument
              title="Login"
              className="singn-up-vertical"
              to="/login"
            >
              L
            </Link>
          )}
          <nav>
            <div className="vertical-home not-search">
              <NavLink
                reloadDocument
                to="home"
                className={({ isActive }) => (isActive ? 'link-actived' : '')}
              >
                <svg xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 42V18L24.1 6L40 18V42H28.3V27.75H19.65V42ZM11 39H16.65V24.75H31.3V39H37V19.5L24.1 9.75L11 19.5ZM24 24.35Z" />
                </svg>
              </NavLink>
            </div>
            <div className="vertical not-search">
              <NavLink
                reloadDocument
                to="filmes"
                className={({ isActive }) => (isActive ? 'link-actived' : '')}
              >
                <svg xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 8 10.7 15.6H17.2L13.5 8H17.95L21.65 15.6H28.15L24.45 8H28.9L32.6 15.6H39.1L35.4 8H41Q42.2 8 43.1 8.9Q44 9.8 44 11V37Q44 38.2 43.1 39.1Q42.2 40 41 40H7Q5.8 40 4.9 39.1Q4 38.2 4 37V11Q4 9.8 4.9 8.9Q5.8 8 7 8ZM7 18.6V37Q7 37 7 37Q7 37 7 37H41Q41 37 41 37Q41 37 41 37V18.6ZM7 18.6V37Q7 37 7 37Q7 37 7 37Q7 37 7 37Q7 37 7 37Z" />
                </svg>
              </NavLink>
            </div>
            <div className="vertical-series not-search">
              <NavLink
                reloadDocument
                to="series"
                className={({ isActive }) => (isActive ? 'link-actived' : '')}
              >
                <svg xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.15 30.5 32.5 22 19.15 13.5ZM16.5 42V38H7Q5.8 38 4.9 37.1Q4 36.2 4 35V9Q4 7.8 4.9 6.9Q5.8 6 7 6H41Q42.2 6 43.1 6.9Q44 7.8 44 9V35Q44 36.2 43.1 37.1Q42.2 38 41 38H31.5V42ZM7 35H41Q41 35 41 35Q41 35 41 35V9Q41 9 41 9Q41 9 41 9H7Q7 9 7 9Q7 9 7 9V35Q7 35 7 35Q7 35 7 35ZM7 35Q7 35 7 35Q7 35 7 35V9Q7 9 7 9Q7 9 7 9Q7 9 7 9Q7 9 7 9V35Q7 35 7 35Q7 35 7 35Z" />
                </svg>
              </NavLink>
            </div>
            <div className="vertical-seach">
              <NavLink
                reloadDocument
                to="search"
                className={({ isActive }) => (isActive ? 'link-actived' : '')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </NavLink>
            </div>
            <div className="vertical-favorite-save not-search">
              <NavLink
                reloadDocument
                to="minha-lista"
                className={({ isActive }) => (isActive ? 'link-actived' : '')}
              >
                <svg xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 41.95 21.95 40.1Q13.8 32.65 8.9 27.1Q4 21.55 4 15.85Q4 11.35 7.025 8.325Q10.05 5.3 14.5 5.3Q17.05 5.3 19.55 6.525Q22.05 7.75 24 10.55Q26.2 7.75 28.55 6.525Q30.9 5.3 33.5 5.3Q37.95 5.3 40.975 8.325Q44 11.35 44 15.85Q44 21.55 39.1 27.1Q34.2 32.65 26.05 40.1ZM24 23.15Q24 23.15 24 23.15Q24 23.15 24 23.15Q24 23.15 24 23.15Q24 23.15 24 23.15Q24 23.15 24 23.15Q24 23.15 24 23.15Q24 23.15 24 23.15Q24 23.15 24 23.15Q24 23.15 24 23.15Q24 23.15 24 23.15Q24 23.15 24 23.15Q24 23.15 24 23.15ZM24 38Q31.6 31 36.3 25.85Q41 20.7 41 15.85Q41 12.55 38.875 10.425Q36.75 8.3 33.5 8.3Q31 8.3 28.8 9.85Q26.6 11.4 25.2 14.3H22.75Q21.4 11.4 19.175 9.85Q16.95 8.3 14.5 8.3Q11.2 8.3 9.1 10.425Q7 12.55 7 15.85Q7 20.7 11.7 25.85Q16.4 31 24 38Z" />
                </svg>
              </NavLink>
            </div>
          </nav>
        </div>
        <NavLink reloadDocument title="Home" to="/">
          <Logo />
        </NavLink>
      </ContainerHeaderVertical>
      <Outlet />
    </Container>
  );
}
