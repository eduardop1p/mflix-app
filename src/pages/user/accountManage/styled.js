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
      font-size: 12px;
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
          font-size: 15px;
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
        font-size: 12px;
        color: #111;
        font-weight: 500;
        margin-bottom: 5px;
      }

      input {
        padding: 8px 1rem;
        border-radius: 1.5rem;
        border: 2px solid #ccc;
        font-size: 15px;
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
    font-size: 15px;
    background: linear-gradient(
      to right,
      ${colors.color2} 10%,
      ${colors.color3}
    );
  }
`;
