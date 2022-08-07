import styled from 'styled-components';

import * as colors from '../../../colors/index';

export const Slider = styled.section`
  padding-left: 3.5rem;
  color: ${colors.color1};

  .result {
    display: flex;
    justify-content: space-between;

    .info-movie {
      margin-top: 2.5rem;
      width: calc(100% - 50%);

      .movieTitle {
        max-width: 20rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 2rem;
        font-weight: 700;
        margin: 3px 0;
        color: ${colors.color1};
      }
    }

    .next-element {
      position: absolute;
      left: 1.8rem;
      z-index: 2;
      bottom: 2rem;
      cursor: pointer;

      svg:hover,
      svg:focus {
        transition: fill 0.2s ease-in;
        fill: #a7a0a0;
      }
    }

    .prev-element {
      position: absolute;
      z-index: 2;
      bottom: 2rem;
      cursor: pointer;

      svg:hover,
      svg:focus {
        transition: fill 0.2s ease-in;
        fill: #a7a0a0;
      }
    }

    .slider {
      margin-right: 3rem;
      display: flex;

      & > .poster-path {
        width: 300px;
        height: 435px;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          border-radius: 1rem;
        }
      }
    }

    .gridMovies {
      margin-top: -10px;

      .titleNewMovies {
        margin-bottom: 1rem;
        font-size: 12px;
        margin-left: 5px;
        font-weight: 500;
      }
    }
  }
`;

export const GridMovies = styled.div`
  border-radius: 1rem;

  & > .scrollGridNewMovies {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .gridNewMovies {
    display: flex;
    flex-direction: column;
    background-color: ${colors.color9};
    position: relative;
    width: 225px;
    height: 129px;
    border-radius: 1rem;
    overflow: hidden;

    & > img {
      width: 100%;
      height: 100%;
      opacity: 0.55;
      color: ${colors.color1};
      transition: all 0.2s ease-in-out;
    }

    &:hover {
      & > img {
        transform: scale(1.1);
      }
    }

    & > :last-child {
      display: flex;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 6;
      padding: 12px;
      justify-content: space-between;

      & > h5 {
        font-size: 12px;
        font-weight: 600;
        max-width: 8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        color: ${colors.color1};
      }

      & > div {
        font-size: 12px;
        font-weight: 400;
        color: ${colors.color1};
      }

      .rating {
        display: flex;
        gap: 1rem;
        font-size: 12px;
        font-weight: 400;
        position: absolute;
        left: 12px;
        bottom: 12px;
      }
    }
  }
`;
