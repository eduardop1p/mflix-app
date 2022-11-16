import styled from 'styled-components';

import * as colors from '../../colors/index';

export const ElementFooter = styled.footer`
  & > div {
    background-color: ${colors.color8};
    width: 100%;
    margin-bottom: 5px;

    & > .line-footer {
      background-color: #686565;
      width: 100%;
      height: 1px;
      margin-bottom: 10px;
    }

    .credits-container {
      margin: 0 3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      @media (max-width: 680px) {
        margin: auto 2.5rem;
      }
      @media (max-width: 570px) {
        margin: auto 2rem;
      }
      @media (max-width: 445px) {
        margin: auto 1.5rem;
      }

      & > .credits {
        font-size: 0.75rem;
        font-weight: 500;
        color: ${colors.color5};
        margin-right: 2rem;
      }

      & > .redes-sociais > a {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;
