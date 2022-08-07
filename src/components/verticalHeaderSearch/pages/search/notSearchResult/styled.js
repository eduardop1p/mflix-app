import styled from 'styled-components';

import * as colors from '../../../../../colors/index';

export const Main = styled.main`
  margin-left: 1rem;
  width: 100%;

  & > .search {
    width: 100%;

    h1 {
      font-size: 1.8rem;
      color: ${colors.color1};
      margin-bottom: 1rem;
    }

    & > .vertical-search-popular {
      width: 100%;
      color: ${colors.color1};
      background-color: ${colors.color7};
      padding: 10px 1.2rem;
      border-radius: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      form {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;

        & > button > svg {
          display: flex;
          align-items: center;
          cursor: pointer;
          fill: ${colors.color5};
          flex: none;
        }

        & > input {
          width: 100%;
          border: none;
          background-color: transparent;
          color: ${colors.color5};
          font-size: 13px;
          font-weight: 500;

          &::placeholder {
            color: ${colors.color5};
            font-size: 13px;
            font-weight: 500;
          }
        }
      }
    }
  }
`;
