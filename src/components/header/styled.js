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
    transition: transform 0.2s ease-in-out;
    padding: 10px 2.5rem 10px 13px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 1.5rem;
    transform-origin: right;
    transform: scaleX(${(props) => (props.searchActive ? '1' : '0')});
  }

  svg {
    cursor: pointer;
    position: absolute;
    right: 10px;
  }
`;

export const MenuHambuguer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  width: 2rem;
  max-width: 2rem;
  min-width: 2rem;
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
