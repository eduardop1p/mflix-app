import styled from 'styled-components';

import * as colors from '../../colors/index';

export const Main = styled.main`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  & > .profile-details {
    & > h1 {
      text-align: center;
      color: ${colors.color1};
      font-weight: 500;
      font-size: 1.8rem;
    }

    & > .edit-logout {
      margin: 15px 0;
      display: flex;
      width: 220px;
      justify-content: space-between;

      & > button,
      & > a {
        font-size: 14px;
        font-weight: 600;
        background-color: ${colors.color1};
        padding: 5px 1rem;
        line-height: 30px;
        border-radius: 2rem;
        cursor: pointer;
      }

      & > .edit {
        color: #111;
      }

      & > .logout {
        color: red;
      }
    }
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
    animation-duration: 0.4s;
    animation-timing-function: linear;

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
    }

    & > div > label {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      cursor: pointer;
      font-size: 14px;
      color: dodgerblue;
      font-weight: 600;
    }

    & > div > span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 14px;
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

export const ProfilePhoto = styled.div`
  width: 150px;
  height: 150px;
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
