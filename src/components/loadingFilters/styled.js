import styled from 'styled-components';
import * as colors from '../../colors/index';

export const LoadingSpinner = styled.div`
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  display: flex;
  background-color: #171a23f5;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  & > .load-spinner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;

    @keyframes animationLoad {
      from {
        transform: rotateZ(0deg);
      }
      to {
        transform: rotateZ(360deg);
      }
    }

    & > .load {
      animation-name: animationLoad;
      animation-duration: 1.2s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      display: flex;
      align-items: center;
      justify-content: center;

      & > .l1,
      & > .l2 {
        & > div {
          background-color: ${colors.color6};
          width: 7px;
          height: 7px;
          border-radius: 50%;
          margin: 1px;
        }
      }
    }
  }
`;
