import styled from 'styled-components';

import * as colors from '../../../../../colors/index';

export const Main = styled.main`
  margin: 1rem 0 1rem 1rem;
  width: 100%;

  & > .search {
    width: 100%;

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

    & > .not-search-result {
      margin: 2rem 0 0;
      border-radius: 10px;
      width: 100%;
      height: 350px;
      min-height: 100vh;
      background-color: ${colors.color7};

      & > .search-img-details {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        & > img {
          width: 75px;
        }

        & > .not-search-details {
          margin-left: 4rem;

          & > h2 {
            color: ${colors.color1};
            font-size: 1.5rem;
          }

          & > ul {
            margin-left: 15px;
            margin-top: 10px;
            list-style: disc;

            & > li {
              color: ${colors.color1};
              font-size: 14px;
            }
          }
        }
      }
    }
  }
`;
