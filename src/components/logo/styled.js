import styled from 'styled-components';

import * as colors from '../../colors/index';

export const LogoMflix = styled.div`
  background-color: ${colors.color2};
  height: 45px;
  width: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    height: 43px;
    width: 43px;
  }

  .oco {
    background-color: ${colors.color7};
    height: 25px;
    width: 25px;
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
