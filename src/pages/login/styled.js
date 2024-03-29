import styled from 'styled-components';

import * as colors from '../../colors/index';

export const LoginMain = styled.main``;

export const LoginSection = styled.section`
  width: 100%;
  height: 100vh;
  background-color: ${colors.color8};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > h1 {
    font-size: 2rem;
    color: ${colors.color1};
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  & > .login {
    background-color: ${colors.color1};
    width: calc(100% - 4rem);
    max-width: 500px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    border-radius: 10px;

    & > :not(:last-child) {
      margin-bottom: 10px;
    }

    & > h1 {
      color: ${colors.color6};
      font-weight: 600;
      font-size: 1.5rem;
    }

    & > form {
      display: flex;
      flex-direction: column;
      position: relative;

      .input-and-show-password {
        position: relative;
        width: 100%;
      }

      input {
        margin-bottom: 10px;
        padding: 8px 12px;
        border: none;
        border-radius: 5px;
        background-color: #ddd;
        font-weight: 500;
        color: ${colors.color6};
        width: 100%;
      }

      .submit-login {
        font-weight: 500;
        padding: 8px 1.2rem;
        width: 100px;
        margin: 0 auto;
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

    & > .sing-up-recover-password {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      & > div {
        display: flex;

        & > :not(:last-child) {
          margin-right: 10px;
        }

        @media (max-width: 460px) {
          flex-direction: ${({ expires }) => (expires ? 'column' : 'row')};

          & > :not(:last-child) {
            margin-right: ${({ expires }) => (expires ? '5px' : '10px')};
          }
        }

        & > a {
          font-size: 0.75rem;
          font-weight: 500;
          text-decoration: underline;
          color: ${colors.color2};
        }
      }

      & > small {
        width: 150px;
        font-size: 11px;
        color: red;
        font-weight: 500;
        margin-left: 1rem;
      }
    }
  }
`;
