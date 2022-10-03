import styled from 'styled-components';

import * as colors from '../../colors/index';

const ProfilePhoto = styled.div`
  & > a > .profile-photo {
    width: ${(props) => (props.width60 ? '60px' : '47px')};
    height: ${(props) => (props.width60 ? '60px' : '47px')};
    cursor: pointer;
    border: 2px solid ${colors.color2};
    border-radius: 50%;
    background-color: #111;

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
