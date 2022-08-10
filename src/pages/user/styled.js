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
      margin: 10px 0;
      display: flex;
      width: 220px;
      justify-content: space-between;

      & > button {
        font-size: 14px;
        font-weight: 600;
        background-color: ${colors.color1};
        padding: 5px 1rem;
        line-height: 30px;
        border-radius: 2rem;
        cursor: pointer;
      }
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
