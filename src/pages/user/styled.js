import styled from 'styled-components';

import * as colors from '../../colors/index';

export const Main = styled.main`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 800px) {
    margin-top: 1.5rem;
  }

  & > .profile-details {
    & > h1 {
      text-align: center;
      color: ${colors.color1};
      font-weight: 500;
      font-size: 1.5rem;
    }

    & > :last-child {
      margin: 15px 0;
      display: flex;
      justify-content: space-between;

      & > button {
        font-size: 0.8rem;
        font-weight: 600;
        background-color: ${colors.color1};
        padding: 5px 1rem;
        line-height: 30px;
        border-radius: 2rem;
        cursor: pointer;
      }

      & > :first-child {
        color: #111;
      }

      & > :last-child {
        color: red;
        margin-left: 15px;
      }
    }
  }
`;

export const ProfilePhoto = styled.div`
  width: 125px;
  height: 125px;
  border-radius: 100%;
  overflow: hidden;
  margin-bottom: 1rem;
  cursor: pointer;

  & > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const NewUpdateDeletePhotoDiv = styled.div`
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

  & > form {
    background-color: ${colors.color1};
    width: 500px;
    height: 250px;
    border-radius: 10px;
    animation-name: animationScale;
    animation-duration: 0.2s;
    animation-timing-function: linear;

    @media (max-width: 600px) {
      width: calc(100% - 5rem);
    }

    input[type='file'] {
      display: none;
    }

    & > div {
      height: calc(100% / 4);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    & > :not(:last-child) {
      border-bottom: 1px solid #ddd;
    }

    & > div > h1 {
      font-size: 1.2rem;
      text-align: center;
      padding: 10px;
    }

    & > div > label {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      cursor: pointer;
      font-size: 0.87rem;
      color: dodgerblue;
      font-weight: 600;
    }

    & > div > span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 0.87rem;
      cursor: pointer;
      font-weight: 600;
    }

    & > div > #delete-user-foto {
      color: red;
    }

    & > div > #cancel-user-foto {
      color: gray;
    }
  }
`;

export const AccountManageContainer = styled.div`
  background-color: ${colors.color1};
  width: 880px;
  margin: 1rem 0;
  height: auto;
  border-radius: 8px;

  @media (max-width: 1000px) {
    width: calc(100% - 7rem);
  }
  @media (max-width: 500px) {
    width: calc(100% - 4rem);
  }

  & > .account-manage {
    padding: 2rem;
    display: flex;
    justify-content: space-between;

    @media (max-width: 500px) {
      padding: 1rem;
    }
    @media (max-width: 360px) {
      padding: 10px;
    }
    @media (max-width: 330px) {
      flex-direction: column;
      align-items: center;
    }

    & > :first-child {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;

      @media (max-width: 410px) {
        flex-shrink: 1;
        align-items: flex-start;
      }

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
  @media (max-width: 820px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

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

        @media (max-width: 500px) {
          margin-right: 10px;
        }
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

        @media (max-width: 820px) {
          width: 100%;
        }
      }

      & > :first-child {
        margin-bottom: 1rem;

        @media (max-width: 600px) {
          margin-bottom: 0;
        }
      }

      & > div {
        display: flex;

        @media (max-width: 600px) {
          flex-direction: column;
        }

        & > :first-child {
          margin-right: 1.5rem;

          @media (max-width: 600px) {
            margin-right: 0;
          }
        }

        & > div {
          display: flex;
          flex-direction: column;
        }
      }

      & > button {
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
    }
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

    @media (max-width: 470px) {
      width: calc(100% - 4rem);
    }

    & > h1 {
      font-size: 1.2rem;
      text-align: center;
      margin-bottom: 1.5rem;
    }

    & > div {
      display: flex;
      justify-content: space-between;

      @media (max-width: 310px) {
        flex-direction: column;
      }

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

        @media (max-width: 310px) {
          margin-right: 0;
          margin-bottom: 10px;
        }
      }

      & > :last-child {
        background-color: transparent;
        color: #111;
        border: 2px solid #ccc;
      }
    }
  }
`;
