import styled from 'styled-components';
import * as colors from '../../colors/index';

export const LoadingSpinner = styled.div`
  display: flex;
  border-radius: ${(props) => (props.popular ? '10px' : '1rem')};
  align-items: center;
  background-color: ${(props) => {
    if (props.colorTranparent) return '#171a23fa';
    if (props.colorVertical) return colors.color7;
    return colors.color9;
  }};
  justify-content: center;
  position: ${(props) => (props.colorTranparent ? 'fixed' : 'absolute')};
  z-index: ${(props) => (props.colorTranparent ? '50' : '6')};
  top: 0;
  left: 0;
  height: 100%;
  width: calc(${(props) => (props.margin ? '100% - 8px' : '100%')});

  & > .load-spinner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #5c5c5c;
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
      animation-duration: 1.1s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      display: flex;
      align-items: center;
      justify-content: center;

      & > .l1,
      & > .l2 {
        & > div {
          background-color: ${colors.color1};
          width: 5px;
          height: 5px;
          border-radius: 100%;
        }
      }

      & > .l1 {
        & > :last-child {
          margin-top: 4px;
        }
      }

      & > .l2 {
        margin-left: 4px;

        & > :last-child {
          margin-top: 4px;
        }
      }
    }
  }
`;
