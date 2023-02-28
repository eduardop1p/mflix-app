import styled from 'styled-components';

import * as colors from '../colors/index';

// Main

const Main = styled.main`
  margin: auto 3rem;

  & > section {
    margin-bottom: 2rem;
  }

  @media (max-width: 800px) {
    margin: auto 2rem;
  }
`;

// New styled

export const Slider = styled.section`
  margin-left: 1rem;
  color: ${colors.color1};

  @media (max-width: 680px) {
    margin-left: 13px;
  }

  .result {
    display: flex;
    justify-content: space-between;
    position: relative;

    @media (max-width: 570px) {
      justify-content: normal;
    }

    .slider-mobile {
      width: 100%;
      display: flex;
      justify-content: center;

      & > a {
        width: 270px;
        height: 409px;
        border-radius: 1rem;
        overflow: hidden;
        position: relative;

        @media (max-width: 410px) {
          width: 260px;
          height: 390px;
        }
        @media (max-width: 310px) {
          height: 122vw;
          min-height: 280px;
        }

        & > .mobile-new-details {
          position: absolute;
          padding: 1rem 1rem 1.2rem;
          z-index: 1;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          &::before {
            content: '';
            position: absolute;
            z-index: -1;
            width: 100%;
            height: 100%;
            left: 0;
            bottom: 0;
            box-shadow: inset 0px -70px 70px -15px ${colors.color9};
          }

          & > div {
            display: flex;
            justify-content: space-between;

            & > h4 {
              font-size: 15px;
              margin-right: 1rem;
              color: ${colors.color1};
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }

            & > :last-child {
              font-size: 13px;
              color: ${colors.color1};
              align-self: flex-end;
            }
          }
        }

        & > .poster-path {
          width: 100%;
          height: 100%;

          & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
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

        @media (max-width: 990px) {
          max-width: calc(100% - 50%);
        }
        @media (max-width: 570px) {
          max-width: calc(100% - 55%);
        }

        .title {
          width: 100%;
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
        width: 260px;
        height: 390px;
        position: relative;

        @media (min-width: 1700px) {
          width: 280px;
          height: 420px;
        }

        @media (max-width: 720px) {
          width: 240px;
          height: 370px;
        }
        @media (max-width: 570px) {
          width: 220px;
          height: 330px;
        }

        img {
          width: 100%;
          height: 100%;
          border-radius: 1rem;
          object-fit: cover;
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

    & > :not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  .gridNew {
    background-color: ${colors.color9};
    display: flex;
    flex-direction: column;
    position: relative;
    width: 200px;
    height: 113px;
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
          max-width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
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

          font-size: 0.75rem;
          font-weight: 400;

          & > :last-child {
            margin-left: 12px;
          }
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
      margin-left: 10px;
    }
  }

  .overview {
    font-size: 0.62rem;
    font-weight: 400;
    width: 100%;
    max-height: 38px;
    height: auto;
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
    margin: 5px 0;
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
    z-index: 7;
    width: 100%;

    display: flex;
    color: #ddd;
    margin-top: 1.5rem;
    margin-bottom: 1rem;

    & > :not(:last-child) {
      margin-right: 1rem;
    }

    @media (max-width: 750px) {
      & > :not(:last-child) {
        margin-right: 13px;
      }
    }
    @media (max-width: 570px) {
      flex-direction: ${({ cartoons }) => (cartoons ? 'row' : 'column')};

      & > :not(:last-child) {
        margin-right: ${({ cartoons }) => (cartoons ? '13px' : '0')};
      }
    }
    @media (max-width: 360px) {
      flex-direction: column;

      & > :not(:last-child) {
        margin-bottom: 13px;
      }
    }

    .mobile-year-genre {
      display: flex;
      position: relative;
      z-index: 1;
      margin-bottom: 13px;

      & > :not(:last-child) {
        margin-right: 13px;
      }
    }

    .genre,
    .year,
    .search-filter {
      color: ${colors.color1};
      background-color: ${colors.color7};
      padding: 8px 1.2rem;
      font-size: 0.81rem;
      border-radius: 1.5rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;

      & > button {
        background-color: transparent;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 5;
        right: 0;
      }

      & > div > ul > li {
        &[data-li-active='true'] {
          color: ${colors.color2};
        }

        width: fit-content;
        cursor: pointer;
        transition: color 0.2s ease-in-out;
        color: ${colors.color1};

        &:hover {
          color: ${colors.color2};
        }
      }

      & > span {
        display: flex;
        align-items: center;
      }
    }

    .genre {
      cursor: pointer;
      width: 30%;

      @media (max-width: 750px) {
        width: 35%;
      }
      @media (max-width: 570px) {
        width: 65%;
      }
      @media (max-width: 360px) {
        width: 100%;
        z-index: 1;
        background-color: ${({ releaseDateActived }) =>
          releaseDateActived ? '#22252e' : colors.color7};
      }

      .genres {
        border-radius: 1rem;
        right: 0;
        top: 8px;
        z-index: -1;
        cursor: default;
        background-color: inherit;
        width: 100%;
        height: ${({ genreActived }) => (genreActived ? '120px' : '0')};
        position: absolute;
        transition: height 0.2s ease-in-out;

        & > ul {
          margin: 1.8rem 1.2rem 0;
          overflow: hidden scroll;
          height: 65%;
          display: flex;

          flex-direction: column;

          & > :not(:last-child) {
            margin-bottom: 5px;
          }

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

      svg {
        flex-shrink: 0;
        transform: rotateZ(
          ${({ genreActived }) => (genreActived ? '180deg' : '0')}
        );
        transition: transform 0.2s ease-in-out;
      }
    }

    .year {
      cursor: pointer;
      width: 20%;

      @media (max-width: 750px) {
        width: 25%;
      }
      @media (max-width: 570px) {
        width: ${({ cartoons }) => (cartoons ? '40%' : '35%')};
      }
      @media (max-width: 360px) {
        width: 100%;
        z-index: 2;
      }

      .releaseDate {
        border-radius: 1rem;
        right: 0;
        top: 8px;
        z-index: -1;
        cursor: default;
        background-color: inherit;
        width: 100%;
        height: ${({ releaseDateActived }) =>
          releaseDateActived ? '120px' : '0'};
        position: absolute;
        transition: height 0.2s ease-in-out;

        & > ul {
          margin: 1.8rem 1.2rem 0;
          overflow: hidden scroll;
          height: 65%;
          display: flex;
          flex-direction: column;

          & > :not(:last-child) {
            margin-bottom: 5px;
          }

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

      svg {
        flex-shrink: 0;
        transform: rotateZ(
          ${({ releaseDateActived }) => (releaseDateActived ? '180deg' : '0')}
        );
        transition: transform 0.2s ease-in-out;
      }
    }

    .search-filter {
      width: ${({ cartoons }) => (cartoons ? '80%' : '50%')};

      @media (max-width: 750px) {
        width: ${({ cartoons }) => (cartoons ? '80%' : '40%')};
      }
      @media (max-width: 570px) {
        width: ${({ cartoons }) => (cartoons ? '60%' : '100%')};
      }
      @media (max-width: 360px) {
        width: 100%;
      }

      & > div {
        display: flex;
        align-items: center;
        width: 100%;

        & > svg {
          flex-shrink: 0;
          cursor: pointer;
          margin-right: 10px;
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
  margin-bottom: 1.5rem;

  a {
    display: inline-block;

    padding: 8px;

    @media (min-width: 2201px) {
      width: calc(100% / 9);
      height: 15.5vw;
      max-width: 343px;
      max-height: 507px;
    }
    @media (max-width: 2200px) {
      width: calc(100% / 8);
      height: 17vw;
    }
    @media (max-width: 1900px) {
      width: calc(100% / 7);
      height: 19.5vw;
    }
    @media (max-width: 1600px) {
      width: calc(100% / 6);
      height: 22.5vw;
    }
    @media (max-width: 1200px) {
      width: calc(100% / 5);
      height: 27vw;
    }
    @media (max-width: 900px) {
      width: calc(100% / 4);
      height: 32.5vw;
      padding: 5px;
    }
    @media (max-width: 700px) {
      width: calc(100% / 3);
      height: 45vw;
    }
    @media (max-width: 520px) {
      width: calc(100% / 2);
      height: 64vw;
    }
    @media (max-width: 360px) {
      width: 100%;
      height: 123vw;
    }
    @media (max-width: 280px) {
      height: 124vw;
      min-height: 285px;
    }

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
      object-fit: cover;
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
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
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
    list-style: none;

    & > :not(:last-child) {
      margin-right: 10px;
    }

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

    @media (max-width: 300px) {
      justify-content: normal;
      align-items: normal;
      flex-direction: column;
    }

    & > h1 {
      color: ${colors.color1};
      font-size: 1.8rem;
    }
  }
`;

export const PopularTitles = styled.div`
  .popular-slider {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${colors.color7};

    border-radius: 5px;
    padding: 10px;

    @media (max-width: 619px) {
    }

    & > .popular-img {
      flex-shrink: 0;
      width: 125px;
      height: 180px;
      margin-right: 1.5rem;
      position: relative;

      @media (max-width: 1290px) {
        width: 115px;
        height: 160px;
      }
      @media (max-width: 720px) {
        margin-right: 1rem;
      }
      @media (max-width: 500px) {
        width: 110px;
        height: 150px;
      }

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
        object-fit: cover;
      }
    }

    & > .popular-details {
      display: flex;
      flex-direction: column;

      & > :not(:last-child) {
        margin-bottom: 5px;
      }

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
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 0.93rem;
        font-weight: 600;
        color: ${colors.color1};
      }

      & > .popular-year-genre {
        font-size: 0.81rem;
        font-weight: 400;
        color: ${colors.color5};
        display: flex;

        & > :not(:last-child) {
          margin-right: 3px;
        }

        & > .popular-genre-genre {
          width: 100%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 1;
        }
      }

      & > .overview {
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

      & > :last-child {
        align-self: center;

        & > .popular-watch-now {
          background-color: ${colors.color6};
          font-weight: 400;
          color: ${colors.color1};
          border-radius: 1.5rem;
          font-size: 0.75rem;
          padding: 8px 1.2rem;
          transition: all 0.2s ease-in-out;

          @media (max-width: 800px) {
            padding: 8px 1rem;
          }

          &:hover {
            background-color: ${colors.color2};
          }
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
    height: 400px;

    @media (max-width: 500px) {
      flex-direction: column;
      height: 500px;
    }

    @media (max-width: 310px) {
      flex-direction: column;
      height: 630px;
    }

    .future-mobile-img-details {
      display: flex;
      flex-direction: column;

      @media (max-width: 950px) {
        width: 180px;
        flex: none;
        margin-right: 1rem;
      }
      @media (max-width: 600px) {
        width: 150px;
      }
      @media (max-width: 500px) {
        flex-direction: row;
        margin-right: 0;
        justify-content: space-between;
        height: 230px;
        overflow: hidden;
        width: 100%;
        margin-bottom: 10px;
      }
      @media (max-width: 360px) {
        height: 200px;
      }
      @media (max-width: 310px) {
        flex-direction: column;
        height: auto;
        align-items: center;
      }
    }

    .future-img {
      width: 260px;
      height: 400px;
      position: relative;
      flex-shrink: 0;

      @media (max-width: 950px) {
        width: 100%;
        height: 275px;
      }
      @media (max-width: 600px) {
        width: 100%;
        height: 230px;
      }
      @media (max-width: 500px) {
        width: 150px;
        height: 100%;
      }
      @media (max-width: 360px) {
        width: 130px;
      }
      @media (max-width: 310px) {
        width: 140px;
        height: 200px;
      }

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
        object-fit: cover;
      }
    }

    .future-details {
      width: 200px;
      margin: 1rem 1rem 0;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;

      & > :not(:last-child) {
        margin-bottom: 12px;
      }

      @media (max-width: 950px) {
        margin: 10px 0 0;
        width: 100%;

        & > :not(:last-child) {
          margin-bottom: 5px;
        }
      }

      @media (max-width: 500px) {
        margin-left: 1rem;
        flex-shrink: 1;

        & > * {
          flex: none;
        }
      }
      @media (max-width: 310px) {
        margin-top: 10px;
        margin-left: 0;
        height: auto;
      }

      & > h3 {
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 1rem;
        font-weight: 600;
        color: ${colors.color1};

        @media (max-width: 500px) {
          -webkit-line-clamp: 3;
        }
        @media (max-width: 310px) {
          display: block;
          overflow: visible;
        }
      }

      & > .future-release-date {
        font-size: 0.87rem;
        display: flex;
        color: ${colors.color5};

        & > :last-child {
          margin-left: 8px;
        }

        @media (max-width: 330px) {
          flex-direction: column;

          & > :last-child {
            margin-left: 0;
          }
        }
        @media (max-width: 310px) {
          flex-direction: row;

          & > :last-child {
            margin-left: 8px;
          }
        }

        & > span {
          color: ${colors.color1};
        }
      }

      & > .future-info {
        font-size: 0.81rem;
        color: ${colors.color5};
        overflow: hidden scroll;

        @media (max-width: 950px) {
          flex-shrink: 0;
          height: 70px;
        }
        @media (max-width: 600px) {
          height: 105px;
        }
        @media (max-width: 500px) {
          height: 170px;
        }
        @media (max-width: 360px) {
          height: 125px;
        }
        @media (max-width: 310px) {
          max-height: 65px;
          height: auto;
        }

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
      width: 100%;
      height: 100%;
      background-color: #111;
      position: relative;
      display: flex;
      justify-content: center;
    }
  }
`;

export default Main;
