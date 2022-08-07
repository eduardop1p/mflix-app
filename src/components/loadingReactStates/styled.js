import styled from 'styled-components';
import * as colors from '../../colors/index';

export const LoadingSpinner = styled.div`
  display: flex;
  border-radius: ${(props) => (props.popular ? '10px' : '1rem')};
  align-items: center;
  background-color: ${(props) =>
    props.colorVertical ? colors.color7 : colors.color9};
  justify-content: center;
  position: absolute;
  z-index: z;
  top: 0;
  height: 100%;
  width: calc(${(props) => (props.margin ? '100% - 8px' : '100%')});

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
