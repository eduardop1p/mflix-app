import styled from 'styled-components';

/* eslint-disable */

import * as colors from '../../../colors/index';

export const AccountManageContainer = styled.div`
  background-color: ${colors.color1};
  width: calc(100% - 2rem);
  margin-top: 1rem;
  margin-bottom: 8px;
  height: 300px;
  border-radius: 8px;

  & > .account-manage {
    padding: 2rem;
    display: flex;

    & > :first-child {
      margin-right: 2rem;
      display: flex;
      flex-direction: column;

      & > a {
        padding: 8px;
        color: #111;
        font-weight: 600;
        font-size: 1rem;
        width: fit-content;
        border-radius: 8px;
        transition: background 0.1s linear;
        position: relative;

        &.link-account-manage-active::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          background-color: #111;
          height: 3px;
          width: calc(100% - 20px);
        }

        &:hover {
          background-color: #eee;
        }
      }

      & > :last-child {
        color: red;
      }
    }
  }
`;

export const EditPhotoContainer = styled.div``;

export const InforPessContainer = styled.div`
  & > .photo-alter {
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

  & > .edit-name-email {
    margin: 1rem 0;

    & > form {
      display: flex;

      & > :first-child {
        margin-right: 1.5rem;
      }
    }
  }
`;
