import styled from 'styled-components';

import * as colors from '../../colors/index';

export const LoadingStyled = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  /* background-color: transparent; */
  background-color: ${colors.color8};
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  & > h1 {
    font-size: 2rem;
    color: ${colors.color1};
    font-weight: 500;
    gap: 0.5rem;
  }
`;

export const LogoMflix = styled.div`
  background-color: ${colors.color2};
  height: 60px;
  width: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes rotateLoading {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }

  .oco {
    background-color: ${colors.color7};
    height: 36px;
    width: 36px;
    border-radius: 50%;
    position: relative;
    animation-name: rotateLoading;
    animation-timing-function: ease-in-out; // or linear
    animation-iteration-count: infinite;
    animation-duration: 1s;

    div {
      position: absolute;
      background-color: ${colors.color7};
      height: 13px;
      width: 13px;
      border-radius: 50%;
    }

    div:nth-child(1) {
      bottom: 1px;
      transform: translateX(2px);
    }

    div:nth-child(2) {
      transform: translateX(2px);
      top: 1px;
    }

    div:nth-child(3) {
      right: 0;
      top: 10.5px;
      transform: translateX(2px);
    }
  }
`;
