import styled from 'styled-components';
import * as colors from '../../colors/index';

export const LoadingSpinner = styled.div`
  background-color: transparent;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5px;

  & > .load-spinner {
    width: 35px;
    height: 35px;
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
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin: 1px;
        }
      }
    }
  }
`;
