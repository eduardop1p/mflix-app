import styled from 'styled-components';

import * as colors from '../../colors';

export const BackgroundImageHeader = styled.div`
  width: 100%;
  max-width: 2500px;
  min-width: 230px;
  min-height: 341px;
  height: 560px;
  top: 0;
  position: absolute;
  z-index: -4;
  overflow: hidden;

  @media (max-width: 310px) {
    height: 148.5vw;
  }

  & > img {
    position: absolute;
    width: 100%;
    z-index: -3;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    box-shadow: inset 0 -100px 90px ${colors.color8};
    content: '';
    left: 0;
    top: 0;
    position: absolute;
    z-index: -2;
    width: 100%;
    height: 100%;
  }

  &::before {
    content: '';
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.9;
    background: ${colors.color8};
  }
`;

export const HeaderElement = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem;

  .section-1 {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      font-size: 2rem;
      color: ${colors.color1};
      font-weight: 500;
      display: flex;
      align-items: center;

      & > :first-child {
        margin-right: 0.5rem;
      }
    }

    nav {
      display: flex;
      margin-left: 4rem;

      a:not(:last-child) {
        margin-right: 2rem;
      }

      a {
        font-size: 0.81rem;
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
    margin-left: 1rem;

    & > :first-child {
      margin-right: 8px;
    }

    @media (max-width: 360px) {
      & > :first-child {
        margin-right: 1rem;
      }
    }
  }
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  input {
    background-color: transparent;
    color: ${colors.color1};
    transition: width 0.2s linear, visibility 0s linear 0.12s;
    padding: 10px 2.5rem 10px 13px;
    width: ${({ searchActive }) => (searchActive ? '100%' : '0')};
    visibility: ${({ searchActive }) => (searchActive ? 'visible' : 'hidden')};
    border: 1px solid #ddd;
    border-radius: 1.5rem;
    float: right;
  }

  svg {
    cursor: pointer;
    position: absolute;
    right: 10px;
    z-index: 8;
  }
`;

export const MenuHambuguer = styled.button`
  & > :first-child {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    cursor: pointer;
    width: 2rem;
    max-width: 2rem;
    min-width: 2rem;

    & > :not(:last-child) {
      margin-bottom: 4px;
    }

    & > .h-1 {
      background-color: ${colors.color1};
      width: ${({ menuActive }) => (menuActive ? '1.5rem' : '2rem')};
      height: 2px;
      transition: width 0.3s ease-in-out;
    }

    & > .h-2 {
      background-color: ${colors.color1};
      width: ${({ menuActive }) => (menuActive ? '2rem' : '1.5rem')};
      height: 2px;
      transition: width 0.3s ease-in-out;
    }
  }
`;

export const MenuActive = styled.div`
  width: 100%;
  height: 100%;
  background-color: #171a23ab;
  transition: visibility 0.2s linear;
  visibility: ${({ menuActive }) => (menuActive ? 'visible' : 'hidden')};
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  display: flex;
  justify-content: right;
  cursor: default;

  & > div {
    background-color: ${colors.color7};
    width: 17rem;
    height: auto;
    margin: 10px;
    border-radius: 1rem;
    transition: transform 0.2s linear;
    transform: translateX(${({ menuActive }) => (menuActive ? '0' : '18rem')});
    padding: 1.5rem;

    @media (max-width: 480px) {
      width: calc(100% - 50%);
      min-width: 130px;
    }

    & > :first-child {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    & > h5 {
      color: ${colors.color1};
      margin-top: 5px;
      font-weight: 500;
      font-size: 12px;
    }

    & > a {
      border-radius: 100%;
      padding: 0;
      width: 55px;
      height: 55px;
      margin: 0 auto;
    }

    & > nav {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      a {
        margin-top: 1.5rem;
        font-size: 0.81rem;
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
`;
