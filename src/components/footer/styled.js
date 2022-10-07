import styled from 'styled-components';

import * as colors from '../../colors/index';

export const ElementFooter = styled.footer`
  & > .subscribeToNews {
    background-color: ${colors.color9};
    width: 100%;
    height: 250px;
    overflow: hidden;
    padding: 0 3rem;
    justify-content: space-between;
    display: flex;

    & > .subscribeToNews-img {
      position: relative;
      top: -3rem;
      left: 2rem;
      height: 500px;
      width: 500px;
      outline: none;

      &::before {
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: ${colors.color2};
        opacity: 0.75;
        border-radius: 50%;
        z-index: 2;
      }

      & > img {
        position: absolute;
        object-fit: cover;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        outline: none;
      }
    }

    & > .subscribeToNews-img2 {
      position: relative;
      left: -18rem;
      height: 500px;
      width: 500px;
      top: -3rem;
      z-index: 2;

      & > img {
        position: absolute;
        border-radius: 50%;
        object-fit: contain;
        background-color: #111;
        width: 100%;
        height: 100%;
      }
    }

    & > .subscribe {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 400px;
      padding: 3rem 0;

      & > h1 {
        font-weight: 600;
        color: ${colors.color1};
      }

      & > .text-subscribe {
        color: ${colors.color1};
        font-size: 0.75rem;
      }

      & > form {
        display: flex;
        flex-direction: column;
        width: 100%;

        & > small {
          margin-bottom: 5px;
          margin-left: 2px;
          font-size: 0.75rem;
          font-weight: 400;
          color: red;
        }

        & > .relative-input {
          position: relative;
          width: 100%;

          & > input {
            padding: 9px 7.5rem 9px 12px;
            border: none;
            border-radius: 1rem;
            background-color: ${colors.color7};
            font-weight: 400;
            color: ${colors.color1};
            width: 100%;

            &::placeholder {
              color: #ddd;
            }
          }

          & > button {
            position: absolute;
            right: 0;
            font-weight: 500;
            padding: 9px 1.2rem;
            border-radius: 1rem;
            color: ${colors.color1};
            font-size: 0.81rem;
            background: linear-gradient(
              to right,
              ${colors.color2} 10%,
              ${colors.color3}
            );
          }
        }
      }
    }
  }
`;

export const CreditsFooter = styled.div`
  background-color: ${colors.color8};
  width: 100%;
  padding: 2rem 0 5px;

  & > .line-footer {
    background-color: #686565;
    width: 100%;
    height: 1px;
    margin-bottom: 1rem;
  }

  .credits-container {
    padding: 0 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > .credits {
      font-size: 0.75rem;
      font-weight: 500;
      color: ${colors.color5};
    }
  }
`;
