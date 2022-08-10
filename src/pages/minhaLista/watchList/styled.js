import styled from 'styled-components';
import * as colors from '../../../colors/index';

export const WatchListSection = styled.section`
  width: 100%;

  & > h1 {
    color: ${colors.color1};
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  & > .my-list-container {
    width: 100%;

    & > .my-list {
      display: inline-block;
      width: calc(100% / 3);
      padding: 8px;
      transition: transform 0.2s ease-in-out;

      &:hover {
        transform: scale(1.02);
      }

      & > div {
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        overflow: hidden;
        position: relative;

        & > .movie-or-serie-my-list {
          position: absolute;
          z-index: 6;
          top: 0;
          font-size: 13px;
          font-weight: 400;
          padding: 14px;
          color: ${colors.color1};
        }

        & > img {
          width: 100%;
          height: 100%;
        }

        & > .my-list-details {
          background-color: ${colors.color7};
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;

          & > h4 {
            color: ${colors.color1};
            margin-bottom: 1.5rem;
          }

          & > .my-list-genre-release-date {
            color: ${colors.color1};
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
`;
