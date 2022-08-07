import styled from 'styled-components';

import * as colors from '../../colors/index';

export const LogoMflix = styled.div`
  background-color: ${colors.color2};
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  .oco {
    background-color: ${colors.color7};
    height: 28px;
    width: 28px;
    border-radius: 50%;
    position: relative;

    div {
      position: absolute;
      background-color: ${colors.color7};
      height: 10px;
      width: 10px;
      border-radius: 50%;
    }

    div:nth-child(1) {
      bottom: -1px;
      transform: translateX(2px);
    }

    div:nth-child(2) {
      transform: translateX(2px);
      top: -1px;
    }

    div:nth-child(3) {
      right: 0;
      top: 9px;
      transform: translateX(2px);
    }
  }
`;
