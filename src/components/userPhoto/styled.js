import styled from 'styled-components';

import * as colors from '../../colors/index';

const ProfilePhoto = styled.div`
  & > a > .profile-photo {
    width: ${({ width60 }) => (width60 ? '60px' : '45px')};
    height: ${({ width60 }) => (width60 ? '60px' : '45px')};
    cursor: pointer;
    border: 2px solid ${colors.color2};
    border-radius: 50%;
    background-color: #111;

    @media (max-width: 600px) {
      width: ${({ width45 }) => (width45 ? '45px' : '60px')};
      height: ${({ width45 }) => (width45 ? '45px' : '60px')};
    }

    & > img {
      width: 100%;
      padding: 2px;
      border-radius: 50%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export default ProfilePhoto;
