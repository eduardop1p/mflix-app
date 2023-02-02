import styled from 'styled-components';

import * as colors from '../../../../colors';

const Main = styled.main`
  margin: 1rem 0 1rem 1rem;
  width: 100%;

  @media (max-width: 800px) {
    margin: 10px 0 10px 10px;
  }

  @media (max-width: 750px) {
    width: 100%;
    margin: 0 0 4rem 0;
  }

  & > div {
    width: 100%;

    & > .not-search-result {
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
        padding: 0 4rem;

        @media (max-width: 750px) {
          flex-direction: column;
        }
        @media (max-width: 580px) {
          padding: 0 3rem;
        }

        & > img {
          width: 75px;
        }

        & > .not-search-details {
          margin-left: 3rem;

          @media (max-width: 950px) {
            margin-left: 2rem;
          }
          @media (max-width: 750px) {
            margin-left: 0;
            margin-top: 1rem;
          }

          & > h2 {
            color: ${colors.color1};
            font-size: 1.5rem;

            @media (max-width: 750px) {
              text-align: center;
            }
          }

          & > ul {
            margin-left: 15px;
            margin-top: 8px;
            list-style: disc;

            @media (max-width: 750px) {
              margin-top: 5px;
            }

            & > li {
              color: ${colors.color1};
              font-size: 0.87rem;
            }
          }
        }
      }
    }
  }
`;

export default Main;
