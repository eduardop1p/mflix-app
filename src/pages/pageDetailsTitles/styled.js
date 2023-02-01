import styled from 'styled-components';

import * as colors from '../../colors/index';

/* eslint-disable */

export const Main = styled.main`
  width: 100%;
  position: relative;
  z-index: 1;
  overflow: hidden;

  @media (max-width: 750px) {
    width: 100%;
    margin-bottom: 3rem;
  }
`;

export const BgImgPageDetails = styled.div`
  width: 100%;
  height: 250px;
  position: absolute;
  border-radius: 0 1rem 0 0;
  overflow: hidden;
  z-index: -4;

  @media (min-width: 1700px) {
    height: 280px;
  }
  @media (max-width: 750px) {
    border-radius: 1rem 1rem 0 0;
  }
  @media (max-width: 720px) {
    height: 200px;
  }

  & > img {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -3;
    object-fit: cover;
  }

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    background-color: ${colors.color3};
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
`;

export const ContainerDatails = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 400px) {
    padding: 8px;
  }

  h5 {
    font-size: 0.78rem;
    font-weight: 600;
    color: #57566c;
    width: min-content;
  }

  & > .d0 {
    display: flex;
  }
`;

export const PosterDetailsSimilarTrailer = styled.div`
  display: flex;
  width: 100%;

  & > .poster-details-similar {
    display: flex;
    width: 100%;

    & > .poster-description {
      margin-top: 0.5rem;
      flex-shrink: 0;
      margin-right: 1rem;
      width: 260px;

      @media (max-width: 600px) {
        margin-bottom: 1rem;
      }

      @media (min-width: 1700px) {
        width: 280px;
      }
      @media (max-width: 1250px) {
        width: 240px;
        margin-top: 1rem;
      }
      @media (max-width: 720px) {
        width: 220px;
        margin-top: 0;
      }

      @media (max-width: 600px) {
        position: ${({ transform50Poster }) =>
          transform50Poster ? 'relative' : 'static'};
        left: ${({ transform50Poster }) => (transform50Poster ? '50%' : 0)};
        transform: ${({ transform50Poster }) =>
          transform50Poster ? 'translate(-50%)' : 'none'};
      }
      @media (max-width: 450px) {
        position: relative;
        left: 50%;
        transform: translate(-50%);
      }

      & > img {
        border-radius: 1rem;
        object-fit: cover;
        width: 100%;
        height: 390px;

        @media (min-width: 1700px) {
          width: 100%;
          height: 420px;
        }
        @media (max-width: 1250px) {
          width: 100%;
          height: 370px;
        }
        @media (max-width: 720px) {
          width: 100%;
          height: 330px;
        }
      }
    }
  }
`;

export const Collections = styled.div`
  width: 100%;

  margin-top: 1rem;

  & > .similar {
    width: 100%;

    & > h4 {
      font-size: 1.06rem;
      margin-bottom: 12px;
      font-weight: 600;
      color: ${colors.color1};
    }

    & > .not-similar {
      width: 100%;
      height: 222px;

      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 1rem;
      }
    }

    .popular-slider {
      display: flex;
      background-color: ${colors.color7};
      height: auto;
      border-radius: 5px;
      padding: 10px;
      justify-content: space-between;

      & > .popular-img {
        width: 125px;
        height: 180px;
        flex: none;
        position: relative;
        margin-right: 1rem;

        @media (max-width: 1290px) {
          width: 115px;
          height: 160px;
        }
        @media (max-width: 500px) {
          width: 110px;
          height: 150px;
        }

        & > img {
          border-radius: 10px;
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }

      & > .popular-details {
        display: flex;
        flex-direction: column;
        justify-content: center;

        & > :not(:last-child) {
          margin-bottom: 5px;
        }

        & > a > h3 {
          width: 100%;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          font-size: 0.93rem;
          font-weight: 600;
          color: ${colors.color1};
        }

        & > .popular-year-genre {
          font-size: 0.81rem;
          font-weight: 400;
          color: #57566c;
          display: flex;
          align-items: center;

          & > :not(:last-child) {
            margin-right: 3px;
          }

          & > .popular-year-year {
            white-space: nowrap;
          }

          & > :last-child {
            width: 100%;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
          }
        }

        & > .vertical-overview {
          font-size: 0.81rem;
          flex: none;
          color: #57566c;
          width: 100%;
          max-height: 34px;
          height: auto;
          overflow: hidden;

          &:hover,
          &:focus {
            overflow: hidden scroll;

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

        & > .popular-imdb-rating-voteAverage {
          color: #57566c;
          font-size: 0.81rem;
          font-weight: 500;

          & > .popular-rating-voteAverage {
            display: flex;
            align-items: center;

            & > .popular-voteAverage {
              margin-left: 5px;
            }
          }
        }

        & > .popular-watch-now {
          background-color: ${colors.color6};
          font-weight: 400;
          color: ${colors.color1};
          border-radius: 1.5rem;
          font-size: 0.75rem;
          width: fit-content;
          padding: 8px 1.2rem;
          transition: all 0.2s ease-in-out;
          white-space: nowrap;
          text-align: center;
          margin: 0 auto;

          @media (max-width: 630px) {
            padding: 8px 0;
            width: 100%;
          }
          @media (max-width: 584px) {
            width: fit-content;
            padding: 8px 1.2rem;
          }
          @media (max-width: 330px) {
            padding: 8px 0;
            width: 100%;
          }

          &:hover {
            background-color: ${colors.color2};
          }
        }
      }
    }
  }
`;

export const NewSimilar = styled.div`
  width: 100%;
  margin-top: 1rem;

  & > .similar {
    & > h4 {
      font-size: 1.06rem;
      margin-bottom: 12px;
      font-weight: 600;
      color: ${colors.color1};
    }

    .popular-slider {
      display: flex;
      background-color: ${colors.color7};
      height: auto;
      border-radius: 5px;
      padding: 10px;
      justify-content: space-between;

      & > .popular-img {
        width: 125px;
        height: 180px;
        flex: none;
        position: relative;
        margin-right: 1rem;

        @media (max-width: 1290px) {
          width: 115px;
          height: 160px;
        }
        @media (max-width: 500px) {
          width: 110px;
          height: 150px;
        }

        & > img {
          object-fit: cover;
          border-radius: 10px;
          width: 100%;
          height: 100%;
        }
      }

      & > .popular-details {
        display: flex;
        flex-direction: column;
        justify-content: center;

        & > :not(:last-child) {
          margin-bottom: 5px;
        }

        & > a > h3 {
          width: 100%;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          font-size: 0.93rem;
          font-weight: 600;
          color: ${colors.color1};
          transition: color 0.2s ease-in-out;
        }

        & > .popular-year-genre {
          font-size: 0.81rem;
          font-weight: 400;
          color: #57566c;
          display: flex;
          align-items: center;

          & > .popular-year-year {
            white-space: nowrap;
          }

          & > :not(:last-child) {
            margin-right: 3px;
          }

          & > :last-child {
            width: 100%;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            word-break: break-all;
          }
        }

        & > .vertical-overview {
          font-size: 0.81rem;
          flex: none;
          font-weight: 400;
          color: #57566c;
          width: 100%;
          max-height: 34px;
          height: auto;
          overflow: hidden;

          &:hover,
          &:focus {
            overflow: hidden scroll;

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

        & > .popular-imdb-rating-voteAverage {
          color: #57566c;
          font-size: 0.81rem;
          font-weight: 500;

          & > .popular-rating-voteAverage {
            display: flex;
            align-items: center;

            & > .popular-voteAverage {
              margin-left: 5px;
            }
          }
        }

        & > .popular-watch-now {
          background-color: ${colors.color6};
          font-weight: 400;
          color: ${colors.color1};
          border-radius: 1.5rem;
          font-size: 0.75rem;
          width: fit-content;
          padding: 8px 1.2rem;
          transition: all 0.2s ease-in-out;
          white-space: nowrap;
          text-align: center;
          margin: 0 auto;

          @media (max-width: 950px) and (min-width: 901px) {
            padding: 8px 0;
            width: 100%;
          }
          @media (max-width: 900px) and (min-width: 601px) {
            padding: 8px 1.2rem;
            width: fit-content;
          }
          @media (max-width: 600px) {
            padding: 8px 0;
            width: 100%;
          }
          @media (max-width: 585px) {
            width: fit-content;
            padding: 8px 1.2rem;
          }
          @media (max-width: 330px) {
            padding: 8px 0;
            width: 100%;
          }

          &:hover {
            background-color: ${colors.color2};
          }
        }
      }
    }
  }
`;
export const News = styled.div`
  width: 100%;

  & > h4 {
    font-size: 1.06rem;
    margin-bottom: 12px;
    font-weight: 600;
    color: ${colors.color1};
  }

  .popular-slider {
    display: flex;
    background-color: ${colors.color7};
    height: auto;
    border-radius: 5px;
    padding: 10px;
    justify-content: space-between;

    & > .popular-img {
      width: 125px;
      height: 180px;
      flex: none;
      position: relative;
      margin-right: 1rem;

      @media (max-width: 1290px) {
        width: 115px;
        height: 160px;
      }
      @media (max-width: 500px) {
        width: 110px;
        height: 150px;
      }

      & > img {
        object-fit: cover;
        border-radius: 10px;
        width: 100%;
        height: 100%;
      }
    }

    & > .popular-details {
      display: flex;
      flex-direction: column;
      justify-content: center;

      & > :not(:last-child) {
        margin-bottom: 5px;
      }

      & > a > h3 {
        width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        font-size: 0.93rem;
        font-weight: 600;
        color: ${colors.color1};
        transition: color 0.2s ease-in-out;
      }

      & > .popular-year-genre {
        font-size: 0.81rem;
        font-weight: 400;
        color: #57566c;
        display: flex;
        align-items: center;

        & > :not(:last-child) {
          margin-right: 3px;
        }

        & > .popular-year-year {
          white-space: nowrap;
        }

        & > :last-child {
          width: 100%;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
      }

      & > .vertical-overview {
        font-size: 0.81rem;
        flex: none;
        font-weight: 400;
        color: #57566c;
        width: 100%;
        max-height: 34px;
        height: auto;
        overflow: hidden;

        &:hover,
        &:focus {
          overflow: hidden scroll;

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

      & > .popular-imdb-rating-voteAverage {
        color: #57566c;
        font-size: 0.81rem;
        font-weight: 500;

        & > .popular-rating-voteAverage {
          display: flex;
          align-items: center;

          & > .popular-voteAverage {
            margin-left: 5px;
          }
        }
      }

      & > .popular-watch-now {
        background-color: ${colors.color6};
        font-weight: 400;
        color: ${colors.color1};
        border-radius: 1.5rem;
        font-size: 0.75rem;
        width: fit-content;
        padding: 8px 1.2rem;
        transition: all 0.2s ease-in-out;
        white-space: nowrap;
        text-align: center;
        margin: 0 auto;

        @media (max-width: 950px) and (min-width: 901px) {
          padding: 8px 0;
          width: 100%;
        }
        @media (max-width: 900px) and (min-width: 601px) {
          padding: 8px 1.2rem;
          width: fit-content;
        }
        @media (max-width: 600px) {
          padding: 8px 0;
          width: 100%;
        }
        @media (max-width: 585px) {
          width: fit-content;
          padding: 8px 1.2rem;
        }
        @media (max-width: 330px) {
          padding: 8px 0;
          width: 100%;
        }

        &:hover {
          background-color: ${colors.color2};
        }
      }
    }
  }
`;

export const TrailerContainer = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  background-color: #111;
  position: relative;
  width: 100%;
  height: 500px;
  margin: 1rem 0;

  @media (min-width: 1700px) and (max-width: 2000px) {
    height: 600px;
  }
  @media (max-width: 1000px) {
    height: 400px;
  }
  @media (max-width: 410px) {
    height: 350px;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  @media (max-width: 600px) {
    margin-top: ${({ noMarginTop }) => (noMarginTop ? '1rem' : '12rem')};
  }
  @media (max-width: 450px) {
    margin-top: 1rem;
  }

  & > h4 {
    font-size: 1rem;
    font-weight: 500;
    color: ${colors.color1};
    margin-bottom: 0.5rem;
  }

  & > :last-child {
    color: #57566c;
    font-weight: 400;
    font-size: 0.78rem;
    width: 100%;
    max-height: 200px;
    height: auto;
    flex: none;
    overflow: hidden;
    padding-right: 8px;

    @media (max-width: 630px) {
      max-height: ${({ overview }) => (overview ? '100px' : 'fit-content')};
      height: auto;
    }
    @media (max-width: 450px) {
      max-height: ${({ overview }) => (overview ? '200px' : 'fit-content')};
      height: auto;
    }

    &:hover,
    &:focus {
      overflow: hidden scroll;

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
`;

export const FavoriteContainer = styled.div`
  width: 50px;
  height: 50px;
  align-self: flex-end;
  position: absolute;
  top: 12rem;
  right: 10px;

  @media (min-width: 1700px) {
    top: 14rem;
  }
  @media (max-width: 720px) {
    top: 9rem;
  }

  @media (max-width: 450px) {
    position: static;
    align-self: normal;
    top: 0;
    right: 0;
  }

  @keyframes likeAnimaton {
    0%,
    to {
      transform: scale(1);
    }
    15% {
      transform: scale(1.2);
    }
    30% {
      transform: scale(0.95);
    }
    45%,
    80% {
      transform: scale(1);
    }
  }

  [data-like-animaton='true'] {
    animation-name: 'likeAnimaton';
    animation-duration: 1s;
    animation-timing-function: linear;
  }

  & > svg {
    width: 100%;
    height: 100%;

    & > path {
      cursor: pointer;
    }
  }
`;

export const DetailsAndSimilarContainer = styled.div`
  margin-top: 6.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: auto;

  @media (min-width: 1700px) {
    margin-top: 8.4rem;
  }
  @media (max-width: 1000px) {
    margin-bottom: 0;
  }
  @media (max-width: 720px) {
    margin-top: 3.5rem;
  }
  @media (max-width: 600px) {
    margin-top: 0;
  }

  & > .d1 {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.2rem;

    & > :not(:last-child) {
      margin-bottom: 12px;
    }

    @media (max-width: 450px) {
      & > :not(:last-child) {
        margin-bottom: 0;
      }
    }

    & > h1 {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      font-size: 2rem;
      font-weight: 700;
      color: ${colors.color1};
      cursor: default;

      @media (max-width: 600px) {
        -webkit-line-clamp: 2;
      }
    }

    & > .y-g-f {
      width: 100%;

      @media (max-width: 450px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        & > :last-child {
          margin-left: 10px;
        }
      }

      & > .year-genre-details {
        display: flex;
        color: ${colors.color1};
        font-weight: 400;
        font-size: 0.96rem;

        & > :not(:last-child) {
          margin-right: 5px;
        }

        & > :first-child {
          white-space: nowrap;
        }

        & > :last-child {
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;

          @media (max-width: 400px) {
            max-width: 133px;
          }
        }
      }
    }

    & > .rating-imdb-details {
      display: flex;
      flex-direction: column;
      color: ${colors.color1};

      @media (max-width: 600px) {
        flex-direction: row;
      }

      &:last-child {
        & > :first-child {
          display: flex;
          align-items: center;

          @media (max-width: 600px) {
            margin-left: 8px;
          }

          & > :last-child {
            margin-left: 5px;
          }
        }
      }
    }
  }

  & > .d2 {
    display: flex;
    flex-direction: column;

    & > .about-details {
      & > h4 {
        font-size: 1.06rem;
        margin-bottom: 12px;
        font-weight: 600;
        color: ${colors.color1};
      }

      & > .about {
        display: flex;
        max-width: 800px;
        justify-content: space-between;

        @media (max-width: 720px) {
          flex-direction: column;
        }
        @media (max-width: 600px) {
          flex-direction: row;
        }
        @media (max-width: 410px) {
          flex-direction: column;
        }

        & > :first-child {
          margin-right: 1rem;
        }

        & > div {
          & > :nth-child(1),
          & > :nth-child(2) {
            margin-bottom: 1rem;
          }

          & > div {
            display: flex;

            & > :first-child {
              margin-right: 8px;
            }

            & > ul {
              display: flex;
              flex-direction: column;

              & > :not(:last-child) {
                margin-bottom: 3px;
              }

              & > li {
                color: #57566c;
                font-weight: 400;
                font-size: 0.78rem;
              }
            }
          }
        }
      }
    }
  }
`;
