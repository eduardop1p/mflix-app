import styled from 'styled-components';

/* eslint-disable */

import * as colors from '../../../colors/index';

export const AccountManageContainer = styled.div`
  background-color: ${colors.color1};
  width: calc(100% - 30rem);
  margin-top: 1rem;
  margin-bottom: 8px;
  height: auto;
  border-radius: 8px;

  & > .account-manage {
    padding: 2rem;
    display: flex;
    justify-content: space-between;

    & > :first-child {
      display: flex;
      flex-direction: column;

      & > button {
        padding: 8px;
        color: #111;
        font-weight: 600;
        font-size: 1rem;
        width: fit-content;
        border-radius: 8px;
        transition: background 0.1s linear;
        position: relative;

        &:hover {
          background-color: #eee;
        }
      }

      & > :first-child::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: #111;
        height: 3px;
        width: calc(100% - 20px);
      }

      & > :last-child {
        color: red;
      }
    }
  }
`;

export const InforPessContainer = styled.div`
  & > .photo-alter {
    width: fit-content;
    & > span {
      font-size: 0.75rem;
      color: #111;
      font-weight: 500;
      margin-bottom: 5px;
    }

    & > :last-child {
      display: flex;
      align-items: center;

      & > img {
        width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 100%;
        margin-right: 1.5rem;
      }

      & > :last-child {
        & > label {
          color: #111;
          font-size: 0.93rem;
          font-weight: 600;
          cursor: pointer;
          background-color: #eee;
          padding: 8px 10px;
          border-radius: 1rem;
        }

        & > input[type='file'] {
          display: none;
        }
      }
    }
  }

  & > .edit-name-email-password {
    margin-top: 1rem;

    & > form {
      display: flex;
      flex-direction: column;

      label {
        font-size: 0.75rem;
        color: #111;
        font-weight: 500;
        margin-bottom: 5px;
      }

      input {
        padding: 8px 1rem;
        border-radius: 1.5rem;
        border: 2px solid #ccc;
        font-size: 0.93rem;
        color: ${colors.color8};
        font-weight: 500;
      }

      & > :first-child {
        margin-bottom: 1rem;
      }

      & > div {
        display: flex;

        & > :first-child {
          margin-right: 1.5rem;
        }

        & > div {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }

  & > #save-alter-user {
    display: block;
    margin: 1rem auto 0;
    font-weight: 500;
    padding: 8px 1rem;
    border-radius: 1.5rem;
    color: ${colors.color1};
    font-size: 0.93rem;
    background: linear-gradient(
      to right,
      ${colors.color2} 10%,
      ${colors.color3}
    );
  }
`;

export const DeleteAccountContainer = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #171a23fa;

  @keyframes animationScale {
    from {
      transform: scale(0.1);
    }
    to {
      transform: scale(1);
    }
  }

  & > div {
    background-color: ${colors.color1};
    width: 400px;
    height: 200px;
    border-radius: 10px;
    animation-name: animationScale;
    animation-duration: 0.2s;
    animation-timing-function: linear;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    & > h1 {
      font-size: 1.2rem;
      text-align: center;
      margin-bottom: 1.5rem;
    }

    & > div {
      display: flex;
      justify-content: space-between;

      & > button {
        font-size: 0.93rem;
        font-weight: 500;
        padding: 8px 1rem;
        border-radius: 1.5rem;
      }

      & > :first-child {
        background-color: red;
        color: ${colors.color1};
        margin-right: 1rem;
      }

      & > :last-child {
        background-color: transparent;
        color: #111;
        border: 2px solid #ccc;
      }
    }
  }
`;
