import styled from 'styled-components';

import * as colors from '../colors/index';

// Main

const Main = styled.main`
  margin: auto 3rem;

  & > section {
    margin-bottom: 2rem;
  }
`;

// New styled

export const Slider = styled.section`
  margin-left: 1rem;
  color: ${colors.color1};

  .result {
    display: flex;
    justify-content: space-between;

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
      display: grid;
      grid-template: auto / auto auto;

      & * {
        flex-shrink: 0;
      }

      @media (max-width: 990px) {
        display: flex;
        justify-content: space-between;
        grid-template: none;
      }

      & > .info {
        margin-top: 2rem;
        margin-right: 1rem;
        width: fit-content;
        max-width: 300px;

        @media (max-width: 1050px) and (min-width: 991px), (max-width: 770px) {
          max-width: 275px;
        }
        @media (max-width: 680px) {
          max-width: 225px;
        }

        .title {
          max-width: 100%;
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

      & > .poster-path {
        width: 290px;
        height: 435px;
        position: relative;

        @media (max-width: 1050px) and (min-width: 991px), (max-width: 770px) {
          width: 275px;
          height: 415px;
        }
        @media (max-width: 680px) {
          width: 260px;
          height: 395px;
        }

        img {
          width: 100%;
          height: 100%;
          border-radius: 1rem;
        }
      }
    }

    .grid {
      margin-top: -10px;
      margin-left: 1rem;

      .titleNew {
        margin-bottom: 1rem;
        font-size: 0.76rem;
        margin-left: 5px;
        font-weight: 500;
      }
    }
  }
`;

export const Grid = styled.div`
  border-radius: 1rem;

  & > .scrollGridNew {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .gridNew {
    background-color: ${colors.color9};
    display: flex;
    flex-direction: column;
    position: relative;
    width: 225px;
    height: 127px;
    border-radius: 1rem;
    overflow: hidden;

    @media (max-width: 1050px) {
      width: 215px;
      height: 120px;
    }

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
      flex-direction: column;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 6;
      padding: 12px;
      justify-content: space-between;

      & > :first-child {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: fit-content;

        & > h5 {
          font-size: 0.75rem;
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
          font-size: 0.75rem;
          font-weight: 400;
          color: ${colors.color1};
        }
      }

      & > :last-child {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: fit-content;

        & > .rating {
          color: ${colors.color1};
          display: flex;
          gap: 12px;
          font-size: 0.75rem;
          font-weight: 400;
        }

        & > .date {
          font-size: 0.75rem;
          font-weight: 400;
          color: ${colors.color1};
        }
      }
    }
  }
`;

export const ForId = styled.div`
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
      overflow: hidden visible;

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

// All catalog styled

export const CatalogContainer = styled.section`
  h1 {
    color: ${colors.color1};
    font-size: 1.8rem;
  }

  .catalog-filter {
    position: relative;
    z-index: 10;
    width: 100%;
    gap: 1rem;
    display: flex;
    color: #ddd;
    margin-top: 1.5rem;
    margin-bottom: 1rem;

    & > .genre,
    & > .year,
    & > .search-filter {
      color: ${colors.color1};
      background-color: ${colors.color7};
      padding: 8px 1.2rem;
      font-size: 0.81rem;
      border-radius: 1.5rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > span {
        display: flex;
        align-items: center;
      }
    }

    .genre {
      position: relative;
      cursor: pointer;
      width: 30%;

      .genres {
        border-radius: 1rem;
        right: 0;
        top: 8px;
        z-index: -1;
        cursor: default;
        background-color: ${colors.color7};
        width: 100%;
        height: ${(props) => (props.genreActived ? '120px' : '0')};
        position: absolute;
        transition: height 0.2s ease-in-out;

        & > ul {
          margin: 1.8rem 1.2rem 0;
          overflow: hidden scroll;
          height: 65%;
          display: flex;
          gap: 5px;
          flex-direction: column;

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

      svg {
        flex-shrink: 0;
        transform: rotateZ(${(props) => (props.genreActived ? '180deg' : '0')});
        transition: transform 0.2s ease-in-out;
      }
    }

    .year {
      position: relative;
      cursor: pointer;
      width: 20%;

      .relaceDate {
        border-radius: 1rem;
        right: 0;
        top: 8px;
        z-index: -1;
        cursor: default;
        background-color: ${colors.color7};
        width: 100%;
        height: ${(props) => (props.relaceDateActived ? '120px' : '0')};
        position: absolute;
        transition: height 0.2s ease-in-out;

        & > ul {
          margin: 1.8rem 1.2rem 0;
          overflow: hidden scroll;
          height: 65%;
          display: flex;
          gap: 5px;
          flex-direction: column;

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

      svg {
        flex-shrink: 0;
        transform: rotateZ(
          ${(props) => (props.relaceDateActived ? '180deg' : '0')}
        );
        transition: transform 0.2s ease-in-out;
      }
    }

    .search-filter {
      width: ${(props) => (props.cartoons ? '80%' : '50%')};

      & > div {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;

        & > svg {
          flex-shrink: 0;
          cursor: pointer;
        }

        form {
          width: 100%;

          & > input {
            width: 100%;
            border: none;
            background-color: transparent;
            color: ${colors.color1};
            font-size: 0.81rem;
            font-weight: 500;

            &::placeholder {
              color: #aaa;
              font-size: 0.81rem;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
`;

export const CatalogTitles = styled.div`
  margin-bottom: 2rem;

  & > .not-results-search-all-catalog {
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

  a {
    width: calc(100% / 5);
    display: inline-block;
    height: 375px;
    padding: 8px;

    &:hover {
      & > .catalog-img {
        transform: scale(1.02);
      }
    }
  }

  .catalog-img {
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease-in-out;

    & > img {
      width: 100%;
      height: 100%;
      color: ${colors.color1};
      font-size: 0.75rem;
    }
  }

  .movie-or-serie-catalog {
    position: absolute;
    top: 0;
    z-index: 6;
    margin: 14px;
    font-size: 12px;
    color: ${colors.color1};
  }

  .box-shadow-catalog {
    position: absolute;
    z-index: 4;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    box-shadow: inset 0px -70px 70px -15px ${colors.color7};
    cursor: pointer;
  }

  .catalog-details {
    position: absolute;
    z-index: 6;
    width: 100%;
    border-radius: 1rem;
    padding: 0 14px 14px;
    bottom: 0;
    color: ${colors.color1};

    & > h5 {
      font-size: 0.75rem;
      font-weight: 600;
      max-width: 8rem;
      margin-bottom: 10px;
    }

    & > .catalog-rating-data {
      display: flex;
      justify-content: space-between;

      div:last-child {
        font-size: 0.75rem;
        font-weight: 400;
      }
    }
  }
`;

export const PagenationContainer = styled.div`
  display: flex;
  justify-content: center;

  ul {
    display: flex;
    gap: 10px;
    list-style: none;

    & > li {
      background-color: ${colors.color7};
      border-radius: 50%;

      & > a {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 0.81rem;
        font-weight: 500;
        color: ${colors.color1};
        height: 35px;
        width: 35px;
      }
    }

    .selected {
      color: ${colors.color1};
      background-color: ${colors.color2};
    }

    .next,
    .previous {
      display: none;
    }
  }
`;

// Popular styled

export const PopularContainer = styled.section`
  .popular {
    margin-bottom: 1.5rem;
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
        cursor: pointer;
        align-items: center;
        justify-content: space-between;
        color: ${colors.color1};
        font-size: 0.81rem;
        background-color: ${colors.color7};
        padding: 8px 1.2rem;
        width: 130px;
        border-radius: 1.5rem;
        position: relative;

        & > .ul-filters-popularBy {
          background-color: ${colors.color7};
          top: 8px;
          z-index: -1;
          cursor: default;
          right: 0;
          position: absolute;
          border-radius: 1rem;
          width: 100%;
          height: ${(props) => (props.filterPopularByActived ? '100px' : '0')};
          transition: right 0.2s ease-in-out;

          & > ul {
            margin: 1.8rem 1.2rem 0;
            overflow: hidden scroll;
            height: 65%;
            display: flex;
            gap: 5px;
            flex-direction: column;

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

export const PopularTitles = styled.div`
  .popular-slider {
    display: flex;
    gap: 3rem;
    background-color: ${colors.color7};
    width: 100%;
    height: 200px;
    border-radius: 5px;
    padding: 10px;

    & > .popular-img {
      width: 130px;
      position: relative;

      .movie-or-serie-popular {
        position: absolute;
        top: 0;
        z-index: 2;
        margin: 14px;
        font-size: 12px;
        color: ${colors.color1};
      }

      & > img {
        border-radius: 10px;
        width: 100%;
        height: 100%;
      }
    }

    & > .popular-details {
      padding: 1.2rem 10px 1rem 0;
      display: flex;
      flex-direction: column;
      gap: 9px;
      overflow: hidden scroll;

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

// Future  styled

export const FutureContainer = styled.section`
  width: 100%;
  background-color: ${colors.color8};

  & > h1 {
    color: ${colors.color1};
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .future {
    display: flex;
    justify-content: space-between;

    & > .future-img {
      width: 280px;
      max-height: 450px;
      position: relative;

      .movie-or-serie-future {
        position: absolute;
        top: 0;
        z-index: 2;
        margin: 14px;
        font-size: 12px;
        color: ${colors.color1};
      }

      & > img {
        border-radius: 1rem;
        width: 100%;
        height: 100%;
        color: ${colors.color1};
      }
    }

    & > .future-details {
      width: 280px;
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

      & > .future-release-date {
        font-size: 0.87rem;
        display: flex;
        align-items: center;
        gap: 8px;
        color: ${colors.color5};

        & > span {
          color: ${colors.color1};
        }
      }

      & > .future-info {
        font-size: 0.81rem;
        color: ${colors.color5};
        height: 320px;
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

    & > .future-trailer-video {
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

export default Main;
