import styled from 'styled-components';

import * as colors from '../../../../colors/index';

export const MovieForId = styled.div`
  .production-companies {
    font-size: 1rem;
    font-weight: 400;
  }

  .vote-average {
    font-size: 0.75rem;
    font-weight: 500;
    margin: 8px 0;
    display: flex;

    .rating-system {
      margin-left: 14px;
    }
  }

  .overview {
    font-size: 0.62rem;
    font-weight: 400;
    max-width: 15rem;
    height: 38px;
    overflow: hidden;

    &:hover,
    &:focus {
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 3px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: ${colors.color3};
        border-radius: 1rem;
      }

      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
    }
  }

  .genres {
    color: ${colors.color2};
    font-size: 0.75rem;
    font-weight: 500;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .release-date {
    font-size: 0.75rem;
    font-weight: 400;
  }

  button {
    margin-top: 1.2rem;
  }
`;
