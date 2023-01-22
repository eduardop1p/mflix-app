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
    padding: 1rem;
    display: flex;
    flex-direction: column;
    border-radius: 10px;

    & > h1 {
      color: ${colors.color6};
      font-weight: 600;
      font-size: 1.5rem;
      margin-bottom: 10px;
    }

    & > form {
      display: flex;
      flex-direction: column;

      .input-and-show-password {
        position: relative;
        width: 100%;
      }

      small {
        margin-bottom: 5px;
        font-size: 0.78rem;
        font-weight: 500;
        color: red;
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

      button {
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
  }
`;
