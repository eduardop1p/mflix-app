import styled from 'styled-components';

import * as colors from '../../colors/index';

export const LoginSection = styled.section`
  width: 100%;
  height: 100vh;
  background-color: ${colors.color8};
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

  & > .login {
    background-color: ${colors.color1};
    width: 500px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;

    & > h1 {
      color: ${colors.color6};
      font-weight: 600;
      font-size: 1.5rem;
    }

    & > form {
      display: flex;
      flex-direction: column;

      & > small {
        margin-bottom: 5px;
        font-size: 12.5px;
        font-weight: 500;
        color: red;
      }

      & > input {
        margin-bottom: 10px;
        padding: 8px 12px;
        border: none;
        border-radius: 5px;
        background-color: #ddd;
        font-weight: 500;
        color: ${colors.color6};
      }

      & > .submit-login {
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
      gap: 10px;

      & > a {
        font-size: 12px;
        font-weight: 500;
        text-decoration: underline;
        color: ${colors.color2};
      }
    }
  }
`;
