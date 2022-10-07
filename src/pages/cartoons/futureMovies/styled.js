import styled from 'styled-components';

import * as colors from '../../../colors/index';

export const FutureM = styled.section`
  width: 100%;
  padding: 3rem 4rem 3rem;
  background-color: ${colors.color7};

  & > h1 {
    color: ${colors.color1};
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  .futureMovie {
    display: flex;
    justify-content: space-between;

    & > .future-movies-img {
      width: 280px;
      max-height: 450px;
      position: relative;

      & > img {
        border-radius: 1rem;
        width: 100%;
        height: 100%;
        color: ${colors.color1};
      }
    }

    & > .future-movies-details {
      width: 300px;
      padding: 1.2rem 0;
      display: flex;
      flex-direction: column;
      gap: 12px;

      & > h3 {
        max-width: 12rem;
        font-size: 1rem;
        font-weight: 600;
        color: ${colors.color1};
      }

      & > .future-movies-release-date {
        font-size: 0.87rem;
        display: flex;
        align-items: center;
        gap: 8px;
        color: ${colors.color5};

        & > :last-child {
          color: ${colors.color1};
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }

      & > .future-movies-info {
        font-size: 0.81rem;
        color: ${colors.color5};
        height: 320px;
        overflow-y: scroll;
        overflow-x: hidden;

        &::-webkit-scrollbar {
          width: 3px;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 1rem;
          background-color: ${colors.color2};
        }

        &::-webkit-scrollbar-track {
          background-color: transparent;
        }
      }
    }

    & > .future-movies-trailer-video {
      border-radius: 1rem;
      overflow: hidden;
      width: 600px;
      height: 420px;
      background-color: #111;

      & > .msg-video-trailer-error {
        top: 24rem;
        text-align: center;
        position: relative;
        color: ${colors.color1};
        font-size: 0.62rem;
      }

      & > video {
        width: inherit;
        height: inherit;
        object-fit: contain;
      }
    }
  }
`;
