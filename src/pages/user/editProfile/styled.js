import styled from 'styled-components';

/* eslint-disable */

import * as colors from '../../../colors/index';

export const EditProfileDivFather = styled.div`
  background-color: #171a23fa;
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes animationScale {
    from {
      transform: scale(0.1);
    }
    to {
      transform: scale(1);
    }
  }

  & > .edit-profile {
    width: calc(100% - 500px);
    height: calc(100vh - 150px);
    border-radius: 1rem;
    background-color: ${colors.color1};
    position: relative;
    animation-name: animationScale;
    animation-duration: 0.2s;
    animation-timing-function: linear;
    position: relative;

    & > .close-edit-profile {
      position: absolute;
      top: 1rem;
      right: 1rem;

      & > svg {
        cursor: pointer;
      }
    }
  }
`;
