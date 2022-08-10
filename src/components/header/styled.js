import styled from 'styled-components';

import * as colors from '../../colors';

export const BackgroundImageHeader = styled.div`
  background-image: url(${(props) => props.movieBackground});
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: inset 0 -100px 90px ${colors.color8};
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 560px;
  z-index: -2;
  opacity: 0.1;
  overflow: hidden;
`;

export const HeaderElement = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;

  .section-1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6rem;

    a {
      font-size: 2rem;
      color: ${colors.color1};
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    nav {
      display: flex;
      gap: 2rem;

      a {
        font-size: 13px;
        color: ${colors.color1};
        transition: color 0.2s ease-in-out;
        font-weight: 500;

        &:hover {
          color: ${colors.color2};
        }
      }

      .link-actived {
        color: ${colors.color2};
      }
    }
  }

  .section-2 {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  position: ${(props) => (props.searchActive ? 'relative' : 'static')};

  input {
    background-color: transparent;
    color: ${colors.color1};
    padding: ${(props) => (props.searchActive ? '10px 2.5rem 10px 13px' : 0)};
    width: ${(props) => (props.searchActive ? '15rem' : 0)};
    border: ${(props) => (props.searchActive ? '1px solid #ddd' : 'none')};
    border-radius: 1.5rem;
    transition: width 0.2s ease-in-out;
  }

  svg {
    cursor: pointer;
    position: ${(props) => (props.searchActive ? 'absolute' : 'static')};
    right: 10px;
  }
`;

export const MenuHambuguer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  width: 2rem;
  cursor: pointer;

  div:nth-child(odd) {
    background-color: ${colors.color1};
    width: ${(props) => (props.menuActive ? '1.5rem' : '2rem')};
    height: 2px;
    transition: width 0.3s ease-in-out;
  }

  div:nth-child(2) {
    background-color: ${colors.color1};
    width: ${(props) => (props.menuActive ? '2rem' : '1.5rem')};
    height: 2px;
    transition: width 0.3s ease-in-out;
  }
`;

export const ProfilePhoto = styled.div`
  & > a > .profile-photo {
    width: 47px;
    height: 47px;
    cursor: pointer;
    border: 2px solid ${colors.color2};
    border-radius: 50%;
    background-color: #111;

    & > img {
      width: 100%;
      padding: 2px;
      border-radius: 50%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
