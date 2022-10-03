import styled from 'styled-components';

import * as colors from '../../colors';

export const BackgroundImageHeader = styled.div`
  width: 100%;
  height: 560px;
  position: absolute;
  z-index: -4;
  overflow: hidden;

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
    margin-left: 3rem;
    gap: 1.5rem;
  }
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  input {
    background-color: transparent;
    color: ${colors.color1};
    transition: width 0.2s linear, opacity 0.2s linear;
    padding: 10px 2.5rem 10px 13px;
    opacity: ${(props) => (props.searchActive ? '1' : '0')};
    width: ${(props) => (props.searchActive ? '100%' : '0')};
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
    gap: 4px;
    cursor: pointer;
    width: 2rem;
    max-width: 2rem;
    min-width: 2rem;

    & > .h-1 {
      background-color: ${colors.color1};
      width: ${(props) => (props.menuActive ? '1.5rem' : '2rem')};
      height: 2px;
      transition: width 0.3s ease-in-out;
    }

    & > .h-2 {
      background-color: ${colors.color1};
      width: ${(props) => (props.menuActive ? '2rem' : '1.5rem')};
      height: 2px;
      transition: width 0.3s ease-in-out;
    }
  }
`;

export const MenuActive = styled.div`
  width: 100%;
  height: 100%;
  transition: visibility 0.25s linear;
  visibility: ${(props) => (props.menuActive ? 'visible' : 'hidden')};
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
    transform: translateX(${(props) => (props.menuActive ? '0' : '18rem')});
    padding: 1.5rem 2rem;

    & > :first-child {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    & > nav {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
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
`;
