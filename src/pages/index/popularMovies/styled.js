import styled from 'styled-components';

import * as colors from '../../../colors/index';

export const Popular = styled.section`
  .popularMovies {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: relative;
    z-index: 3;

    & > h1 {
      color: ${colors.color1};
      font-size: 1.8rem;
    }

    & > .popularBy {
      display: flex;
      align-items: center;
      gap: 1rem;

      & > h5 {
        color: ${colors.color5};
        font-size: 0.81rem;
        font-weight: 600;
      }

      & > .filter-popularBy {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: ${colors.color1};
        font-size: 0.81rem;
        background-color: ${colors.color7};
        padding: 8px 1.2rem;
        width: 130px;
        border-radius: 1.5rem;
        position: relative;

        & > .onClickActivedFilters {
          width: 100%;
          height: 100%;
          background-color: transparent;
          z-index: 5;
          position: absolute;
          right: 0;
          border-radius: 1.5rem;
        }

        & > .ul-filters-popularBy {
          background-color: ${colors.color7};
          top: 6px;
          z-index: -1;
          right: 0;
          position: absolute;
          border-radius: 1rem;
          width: 100%;
          height: ${(props) => (props.filterPopularByActived ? '100px' : '0')};
          transition: all 0.2s ease-in-out;

          & > ul {
            border-radius: 0 0 1rem 1rem;
            margin-top: 1.8rem;
            display: flex;
            padding-left: 1.2rem;
            gap: 5px;
            flex-direction: column;
            width: 81%;
            height: ${(props) => (props.filterPopularByActived ? '62px' : '0')};
            overflow-y: ${(props) =>
              props.filterPopularByActived ? 'scroll' : 'hidden'};
            transition: height 0.2s ease-in-out;

            &::-webkit-scrollbar {
              width: 3px;
            }

            &::-webkit-scrollbar-thumb {
              background-color: ${colors.color2};
              border-radius: 1rem;
            }

            &::-webkit-scrollbar-track {
              background-color: transparent;
            }

            & > li {
              width: fit-content;
              cursor: pointer;
              transition: color 0.2s ease-in-out;

              &:hover {
                color: ${colors.color2};
              }
            }
          }
        }

        & > span {
          display: flex;
          align-items: center;

          & > svg {
            transform: rotateZ(
              ${(props) => (props.filterPopularByActived ? '180deg' : '0')}
            );
            transition: transform 0.2s ease-in-out;
          }
        }
      }

      & > .navigation-popularBy {
        display: flex;
        gap: 8px;

        & > button {
          border-radius: 50%;
          cursor: pointer;
          background-color: ${colors.color7};
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          transition: background 0.2s ease-in-out;

          &:hover,
          &:focus {
            background-color: ${colors.color2};
          }
        }
      }
    }
  }
`;

export const PopularCatalog = styled.div`
  padding: 1.5rem 0 3rem;

  .popular-movie-slider {
    display: flex;
    gap: 3rem;
    background-color: ${colors.color7};
    width: 100%;
    height: 200px;
    border-radius: 5px;
    padding: 10px;

    & > .movie-popular-img {
      width: 130px;
      position: relative;

      & > img {
        border-radius: 10px;
        width: 100%;
        height: 100%;
      }
    }

    & > .movie-popular-details {
      padding: 1.2rem 10px 1rem 0;
      display: flex;
      flex-direction: column;
      gap: 9px;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: transparent;
      }

      &::-webkit-scrollbar-track {
        background-color: transparent;
      }

      & > a > h3 {
        max-width: 10rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.93rem;
        font-weight: 600;
        color: ${colors.color1};
      }

      & > .popular-year-genre {
        font-size: 0.81rem;
        font-weight: 400;
        color: ${colors.color5};
        gap: 5px;
        display: flex;

        & > .popular-genre-genre {
          max-width: fit-content;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }

      & > .popular-imdb-rating-voteAverage {
        color: ${colors.color5};
        font-size: 0.81rem;
        font-weight: 500;

        & > .popular-rating-voteAverage {
          display: flex;
          align-items: center;

          & > .popular-voteAverage {
            margin-left: 10px;
          }
        }
      }

      & > a > .popular-watch-now {
        background-color: ${colors.color6};
        font-weight: 400;
        color: ${colors.color1};
        border-radius: 1.5rem;
        font-size: 0.75rem;
        width: fit-content;
        padding: 8px 1.2rem;
        transition: all 0.2s ease-in-out;

        &:hover {
          background-color: ${colors.color2};
        }
      }
    }
  }
`;
