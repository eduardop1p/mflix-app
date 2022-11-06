import styled from 'styled-components';

import * as colors from '../../colors/index';
import svgCheckDone from '../../assets/images/done_FILL0_wght700_GRAD0_opsz20.svg';

export const Container = styled.div`
  padding: 10px;
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.color9};
  display: flex;
`;

export const ContainerHeaderVertical = styled.header`
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.color7};
  padding: 10px;
  border-radius: 1rem 0 0 1rem;
  min-height: 450px;

  & > :first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    & > .singn-up-vertical {
      width: 47px;
      height: 47px;
      border-radius: 50%;
      color: ${colors.color1};
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.87rem;
      background: linear-gradient(
        to right,
        ${colors.color2} 10%,
        ${colors.color3}
      );
    }

    & > nav {
      display: flex;
      gap: 1.5rem;
      flex-direction: column;
      align-items: center;
      overflow-y: scroll;

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

      .link-actived > svg > path {
        fill: ${colors.color2};
      }

      & > .not-search svg {
        height: 23px;
        width: 23px;
        fill: ${colors.color5};
        transition: all 0.2s ease-in-out;
        cursor: pointer;

        &:hover {
          fill: ${colors.color2};
        }

        & > path {
          transform: scale(0.45);
        }
      }

      & > .vertical-seach svg {
        height: 23px;
        width: 23px;
        fill: ${colors.color5};
        transition: all 0.2s ease-in-out;
        cursor: pointer;

        &:hover {
          fill: ${colors.color2};
        }
      }
    }
  }
`;

export const PagesContainer = styled.main`
  margin: 1rem 0 1rem 1rem;
  display: flex;
  gap: 1rem;
  width: 100%;

  .not-results-search-all-catalog {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @keyframes animationImgFloat {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(5px);
      }
      100% {
        transform: translateY(0);
      }
    }

    & > img {
      width: 3rem;
      position: relative;
      animation-name: animationImgFloat;
      animation-duration: 3s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }

    & > h4 {
      color: ${colors.color5};
      font-weight: 400;
      font-size: 0.75rem;
      margin-top: 5px;
    }
  }

  & > .movies-search-new-popular {
    background-color: transparent;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    width: 100%;
    height: 100%;

    h1 {
      color: ${colors.color1};
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    & > .movies-search {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;

      & > .container-search {
        display: flex;
        justify-content: space-between;
        position: relative;
        z-index: 3;
        width: calc(100% - 20rem);

        & > .vertical-search-popular {
          width: 250px;
          color: ${colors.color1};
          background-color: ${colors.color7};
          padding: 8px 1.2rem;
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
              font-size: 0.81rem;
              font-weight: 500;

              &::placeholder {
                color: ${colors.color5};
                font-size: 0.81rem;
                font-weight: 500;
              }
            }
          }
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
              height: ${(props) =>
                props.filterPopularByActived ? '100px' : '0'};
              transition: all 0.2s ease-in-out;

              & > ul {
                border-radius: 0 0 1rem 1rem;
                display: flex;
                padding-left: 1.2rem;
                gap: 5px;
                flex-direction: column;
                margin-top: 1.8rem;
                width: 81%;
                height: ${(props) =>
                  props.filterPopularByActived ? '62px' : '0'};
                overflow-y: ${(props) =>
                  props.filterPopularByActived ? 'scroll' : 'hidden'};
                transition: all 0.2s ease-in-out;

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
        }
      }
    }

    & > .movies-new {
      position: relative;
    }
  }
`;

export const FiltersMovies = styled.div`
  padding: 1.5rem;
  width: 300px;
  height: 500px;
  border-radius: 1rem;
  background-color: ${colors.color7};
  display: flex;
  flex-direction: column;
  gap: 14px;

  & > .genres {
    & > :last-child {
      height: ${(props) => (props.genresArrowActived ? '140px' : '0')};
      overflow-y: scroll;
      overflow-x: hidden;
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
    }
  }

  & > .years {
    & > :first-child {
      display: flex;
      gap: 3px;
      width: 100%;

      & > h5 {
        font-size: 0.87rem;
        color: ${colors.color1};
        font-weight: 600;
      }

      & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        & > :first-child {
          position: relative;
          max-width: 0;
          cursor: pointer;

          & > svg {
            fill: ${colors.color1};
            transform: scale(0.65);
          }

          & > .duvidas-years {
            visibility: hidden;
            position: absolute;
            background-color: ${colors.color6};
            color: ${colors.color5};
            font-size: 0.62rem;
            width: 180px;
            padding: 5px;
            border-radius: 5px;
            top: -2.6rem;
            left: -5rem;

            &::after {
              content: '';
              border-top: 11px solid ${colors.color6};
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              position: absolute;
              bottom: -6px;
              left: 50%;
              right: 50%;
              transform: translateX(-50%);
            }
          }

          &:hover,
          &:focus {
            & > .duvidas-years {
              visibility: visible;
            }
          }
        }

        & > :last-child {
          transition: background 0.2s ease-in-out;

          & > svg {
            transition: all 0.2s ease-in-out;
          }
        }

        & > .years {
          cursor: pointer;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${(props) =>
            props.yearsArrowActived ? colors.color2 : colors.color6};

          & > svg {
            transform: rotateZ(
              ${(props) => (props.yearsArrowActived ? '180deg' : '0')}
            );
          }
        }
      }
    }

    & > :last-child {
      height: ${(props) => (props.yearsArrowActived ? '33px' : '0')};
      overflow: hidden;
      transition: all 0.2s ease-in-out;

      & > .wrapper-input-range {
        width: 100%;
        padding: 10px 0 0;

        & > .container-input-range {
          position: relative;
          width: 100%;

          & > .range-slider-track {
            width: 100%;
            height: 2px;
            position: absolute;
            margin: auto;
            top: 0;
            bottom: 0;
            border-radius: 5px;
          }

          & > input[type='range'] {
            appearance: none;
            width: 100%;
            outline: none;
            position: absolute;
            margin: auto;
            top: 0;
            bottom: -8px;
            background-color: transparent;
            pointer-events: none;

            &::-webkit-slider-runnable-track {
              appearance: none;
              height: 2px;
            }

            &::-webkit-slider-thumb {
              appearance: none;
              height: 12px;
              width: 12px;
              background-color: ${colors.color2};
              cursor: pointer;
              border-radius: 50%;
              pointer-events: auto;
              margin-top: -9px;
            }
          }
        }

        & > .value-range-visibles {
          width: 100%;
          display: flex;
          justify-content: space-between;

          & > span {
            color: ${colors.color5};
            font-size: 0.84rem;
            margin-top: 10px;
          }
        }
      }
    }
  }

  & > .actor {
    & > :last-child {
      height: ${(props) => (props.actorArrowActived ? '140px' : '0')};
      overflow-y: scroll;
      overflow-x: hidden;
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
    }
  }

  & > .genres > :first-child,
  & > .actor > :first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > span {
      cursor: pointer;
      transition: background 0.2s ease-in-out;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      & > svg {
        transition: all 0.2s ease-in-out;
      }
    }

    & > h5 {
      font-size: 0.87rem;
      color: ${colors.color1};
      font-weight: 600;
    }

    & > .genre {
      background-color: ${(props) =>
        props.genresArrowActived ? colors.color2 : colors.color6};

      & > svg {
        transform: rotateZ(
          ${(props) => (props.genresArrowActived ? '180deg' : '0')}
        );
      }
    }

    & > .actor {
      background-color: ${(props) =>
        props.actorArrowActived ? colors.color2 : colors.color6};

      & > svg {
        transform: rotateZ(
          ${(props) => (props.actorArrowActived ? '180deg' : '0')}
        );
      }
    }
  }

  & > .vertical > :last-child {
    margin-top: 8px;
    width: calc(100% - 2px);

    & > fieldset {
      border: none;

      .filter-name {
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 10px;

        & > input[type='checkbox'] {
          appearance: none;
          background-color: ${colors.color6};
          color: ${colors.color6};
          border-radius: 2px;
          overflow: hidden;
          width: 15px;
          height: 15px;
          display: grid;
          cursor: pointer;
          place-content: center; // é o mesmo que align-content: center; e justify-content: center;, mas com um comando só

          &::before {
            content: '';
            width: 15px;
            height: 15px;
            transform: scale(0);
            transition: transform 0.2s ease-in-out;
          }

          &:checked::before {
            background-color: ${colors.color2};
            transform: scale(1);
            background-position: center center;
            background-repeat: no-repeat;
            background-image: url(${svgCheckDone});
          }
        }

        & > label {
          color: ${colors.color5};
          font-size: 0.84rem;
          cursor: pointer;
        }
      }

      .filter-name:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const NewMovies = styled.div`
  width: 100%;
  position: absolute;

  .popular-movie-slider {
    display: flex;
    gap: 1.5rem;
    background-color: ${colors.color7};
    height: 220px;
    border-radius: 5px;
    padding: 10px;

    & > .movie-popular-img {
      width: 190px;
      flex: 1 1 0;
      position: relative;

      & > img {
        border-radius: 10px;
        width: 100%;
        height: 100%;
      }
    }

    & > .movie-popular-details {
      padding: 0.8rem 10px 1rem 0;
      display: flex;
      max-width: 140px;
      flex-direction: column;
      gap: 9px;

      & > a > h3 {
        max-width: 8rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: none;
        font-size: 0.93rem;
        font-weight: 600;
        color: ${colors.color1};
        transition: color 0.2s ease-in-out;
      }

      & > .popular-year-genre {
        font-size: 0.81rem;
        font-weight: 400;
        color: ${colors.color5};
        display: flex;
        gap: 5px;
        align-items: center;

        & > :last-child {
          max-width: 5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      & > .vertical-overview {
        font-size: 0.81rem;
        flex: none;
        color: ${colors.color5};
        max-width: 10rem;
        height: 48px;
        overflow-y: hidden;
        overflow-x: hidden;

        &:hover,
        &:focus {
          overflow-y: scroll;

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

export const PopularMovies = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 30px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 14px 14px transparent;
    border: solid 13px transparent;
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 14px 14px ${colors.color6};
    border: solid 13px transparent;
    border-radius: 1rem;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }

  .vertical-popular-img-details {
    width: calc(100% / 4);
    display: inline-block;
    height: 350px;
    padding: 8px;

    & > :first-child {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      & > img {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
      }

      & > :last-child {
        position: absolute;
        visibility: hidden;
        border-radius: 1rem;
      }

      &:hover,
      &:focus {
        & > :last-child {
          visibility: visible;
          background-color: #1111118c;
          width: 100%;
          height: 100%;
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease-in-out;

          & > a > button {
            background-color: ${colors.color6};
            font-weight: 500;
            color: ${colors.color1};
            border-radius: 1.5rem;
            font-size: 0.78rem;
            width: fit-content;
            padding: 8px 1.2rem;
            transition: background 0.2s ease-in-out;

            &:hover {
              background-color: ${colors.color2};
            }
          }
        }
      }
    }

    & > .popular-conatiner-details {
      margin: 5px 5px 0;

      & > a > h5 {
        max-width: 11rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.87rem;
        color: ${colors.color1};
        font-weight: 600;
        padding: 0 2px;
        margin-bottom: 2px;
      }

      & > .popular-details {
        display: flex;
        gap: 2px;
        color: ${colors.color5};

        & > div {
          padding: 0 2px;
          font-size: 0.81rem;
          font-weight: 500;
        }

        & > :last-child {
          max-width: 5.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
`;
