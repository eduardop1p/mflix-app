import styled from 'styled-components';

import * as colors from '../../colors/index';

export const RecoveryPassworSection = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${colors.color8};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & > h1 {
    font-size: 2rem;
    color: ${colors.color1};
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  & > div {
    background-color: ${colors.color1};
    width: calc(100% - 4rem);
    max-width: 500px;
    padding: 1rem 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    border-radius: 10px;

    & > h1 {
      color: ${colors.color6};
      font-weight: 600;
      margin-bottom: 0.5rem;

      font-size: 1.5rem;
    }

    & > form {
      display: flex;
      flex-direction: column;
      width: 100%;

      & > small {
        margin-bottom: 5px;
        font-size: 0.78rem;
        font-weight: 500;
        color: red;
      }

      & > .relative-input {
        position: relative;
        width: 100%;

        & > input {
          padding: 8px 6.5rem 8px 12px;
          border: none;
          border-radius: 5px 1rem 1rem 5px;
          background-color: #ddd;
          font-weight: 500;
          color: ${colors.color6};
          width: 100%;
        }

        & > button {
          position: absolute;
          right: 0;
          font-weight: 500;
          padding: 8px 1.2rem;
          width: 100px;
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

      & > .mobile-relative-input {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        & > input {
          padding: 8px 12px;
          border: none;
          border-radius: 5px;
          background-color: #ddd;
          font-weight: 500;
          color: ${colors.color6};
          width: 100%;
        }

        & > button {
          margin-top: 10px;
          font-weight: 500;
          padding: 8px 1.2rem;
          width: 100px;
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
`;
