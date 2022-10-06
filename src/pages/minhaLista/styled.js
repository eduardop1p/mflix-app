import styled from 'styled-components';

import * as colors from '../../colors/index';

const Main = styled.main`
  & > .amo-vadias {
    padding: 0 4rem;

    @media (max-width: 800px) {
      padding: 0 3rem;
    }
    @media (max-width: 520px) {
      padding: 0 2rem;
    }
  }
  width: 100%;
  min-height: 100vh;
`;

export const CreditsFooter = styled.footer`
  background-color: ${colors.color8};
  width: 100%;
  padding: 2rem 0 5px;

  & > .line-footer {
    background-color: #686565;
    width: 100%;
    height: 1px;
    margin-bottom: 1rem;
  }

  .credits-container {
    padding: 0 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > .credits {
      font-size: 12px;
      font-weight: 500;
      color: ${colors.color5};
    }

    & > .redes-sociais {
      margin-left: 1rem;
    }
  }
`;

export default Main;
