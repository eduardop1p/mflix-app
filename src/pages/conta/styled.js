import styled from 'styled-components';

import * as colors from '../../colors/index';

export const ContaSection = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;

  & > h1 {
    font-size: 2rem;
    color: ${colors.color1};
    font-weight: 500;
  }

  & > .conta {
    background-color: ${colors.color1};
    width: 500px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;
    margin: 0 auto;

    & > h1 {
      color: ${colors.color6};
      font-weight: 600;
      font-size: 1.5rem;
    }

    & > form {
      display: flex;
      flex-direction: column;

      & > .container-input {
        display: flex;

        & > .container-1 {
          margin-right: 1rem;
        }

        & > .input {
          width: 100%;

          & > input {
            width: 100%;
            margin-bottom: 10px;
            padding: 8px 12px;
            border: none;
            border-radius: 5px;
            background-color: #ddd;
            font-weight: 500;
            color: ${colors.color6};
          }
        }
      }

      & > .submit-conta {
        font-weight: 500;
        padding: 8px 1.2rem;
        width: 100px;
        margin: 0 auto;
        border-radius: 1rem;
        color: ${colors.color1};
        font-size: 13px;
        background: linear-gradient(
          to right,
          ${colors.color2} 10%,
          ${colors.color3}
        );
      }
    }

    & > .sing-up-recover-password {
      display: flex;
      align-items: center;
      gap: 10px;

      & > a {
        font-size: 12px;
        font-weight: 500;
        text-decoration: underline;
        color: ${colors.color2};
      }

      & > small {
        font-size: 10px;
        font-weight: 500;
        color: red;
      }
    }
  }
`;
