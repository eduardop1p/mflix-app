import styled from 'styled-components';
import { color2 } from '../../colors/index';

export const LoadingActor = styled.div`
  background-color: transparent;
  width: 100%;
  display: flex;
  justify-content: center;

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
    width: 4px;
    border-radius: 1px;
    height: 12px;
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
