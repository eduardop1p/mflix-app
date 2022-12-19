import styled from 'styled-components';

import * as colors from '../../colors/index';

export const ErrorSection = styled.section`
  background-color: ${colors.color8};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Error = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 755px) {
    transform: scale(0.8);
  }
  @media (max-width: 600px) {
    transform: scale(0.6);
  }
  @media (max-width: 430px) {
    transform: scale(0.4);
  }
  @media (max-width: 280px) {
    transform: scale(0.35);
  }

  & > .error-moon {
    display: flex;
    align-items: center;

    & > h1 {
      font-size: 18rem;
      color: ${colors.color1};
      font-weight: 600;
      line-height: 1.3;
      position: relative;
      z-index: 2;
    }

    & > :first-child {
      margin-right: 0.43rem;
    }

    #moon {
      position: relative;

      & > :first-child {
        width: 13.5rem;
        height: 13.5rem;
        position: relative;
        z-index: 1;

        & > .b1 {
          width: 17rem;
          height: 17rem;
          position: absolute;
          border-radius: 50%;
          z-index: -1;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgb(91, 89, 102);
        }
        & > .b2 {
          width: 21rem;
          height: 21rem;
          position: absolute;
          border-radius: 50%;
          z-index: -2;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgb(54, 52, 66);
        }
      }

      & > :last-child {
        width: 10rem;
        position: absolute;
        right: 0;
        top: -7.5rem;
        z-index: 2;
      }
    }
  }

  & > .back-to-home {
    background: linear-gradient(
      to right,
      ${colors.color2} 10%,
      ${colors.color3}
    );
    text-align: center;
    border-radius: 0.62rem;
    width: 18rem;
    height: 3rem;
    line-height: 3rem;

    & > a {
      display: block;
      font-size: 1.5rem;
      color: ${colors.color1};
      font-weight: 500;
      width: 100%;
      height: 100%;
    }
  }
`;
