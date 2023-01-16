import styled from 'styled-components';
import { color2 } from '../../colors/index';

export const LoadingFilters = styled.div`
  background-color: #171a23fa;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes animationLoadingActor1 {
    0% {
      transform: scaleY(0.5);
    }
    50% {
      transform: scaleY(1.3);
    }
    100% {
      transform: scaleY(0.5);
    }
  }
  @keyframes animationLoadingActor2 {
    0% {
      transform: scaleY(0.5);
    }
    50% {
      transform: scaleY(1.3);
    }
    100% {
      transform: scaleY(0.5);
    }
  }

  .load-actor {
    width: 5px;
    border-radius: 1px;
    height: 15px;
    background-color: ${color2};
  }
  & > .an-1 {
    animation-name: animationLoadingActor1;
    animation-duration: 1.2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    margin-right: 4px;
  }
  & > .an-2 {
    animation-name: animationLoadingActor2;
    animation-duration: 1.2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-delay: 0.5s;
  }
`;
