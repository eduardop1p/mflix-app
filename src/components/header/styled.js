import styled from 'styled-components';

import * as colors from '../../colors';

export const BackgroundImageHeader = styled.div`
  width: 100%;
  max-width: 2500px;
  height: 560px;
  top: 0;
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
  margin: 2rem 3rem;

  @media (max-width: 680px) {
    margin: 2rem 2.5rem;
  }
  @media (max-width: 570px) {
    margin: 1.5rem 2rem;
  }
  @media (max-width: 445px) {
    margin: 1.5rem;
  }

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
      gap: 0.5rem;
    }

    nav {
      display: flex;
      gap: 2rem;
      margin-left: 4rem;

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
    gap: 1rem;

    @media (max-width: 570px) {
      gap: 10px;
    }
    @media (max-width: 360px) {
      gap: 1rem;
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
    transition: width 0.2s linear,
      border 0.2s linear
        ${(props) => !props.searchActive && ',0s 0.2s padding linear'};
    padding: ${(props) => (props.searchActive ? '10px 2.5rem 10px 13px' : 0)};
    width: ${(props) => (props.searchActive ? '100%' : '0')};
    border: ${(props) =>
      props.searchActive ? '1px solid #ddd' : '0px solid #ddd'};
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
  background-color: #171a23ab;
  transition: visibility 0.2s linear;
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
    }

    & > a {
      border-radius: 100%;
      padding: 0;
      width: 60px;
      height: 60px;
      margin: 0 auto;
    }

    & > nav {
      margin-top: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2rem;

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
`;
