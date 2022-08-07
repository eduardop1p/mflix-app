import styled from 'styled-components';

import * as colors from '../../../colors/index';

export const Catalog = styled.section`
  padding: 2rem 0;

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
    padding: 1.5rem 0 2rem;

    & > div {
      color: ${colors.color1};
      background-color: ${colors.color7};
      padding: 8px 1.2rem;
      font-size: 13px;
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

    .name-movie {
      width: 25%;
      form {
        width: 100%;

        & > input {
          width: 100%;
          border: none;
          background-color: transparent;
          color: ${colors.color1};
          font-size: 13px;
          font-weight: 500;

          &::placeholder {
            color: #ccc;
            font-size: 13px;
            font-weight: 500;
          }
        }
      }
    }

    .onClickActivedFilters {
      width: 100%;
      padding: 1.1rem;
      background-color: transparent;
      z-index: 5;
      position: absolute;
      right: 0;
      border-radius: 1.5rem;
    }

    .genre-movie {
      position: relative;
      cursor: pointer;
      width: 20%;

      .genres {
        border-radius: 1rem;
        right: 0;
        top: 8px;
        z-index: -1;
        cursor: default;
        background-color: ${colors.color7};
        width: 100%;
        height: ${(props) => (props.genreActived ? '120px' : '0')};
        overflow: ${(props) => (props.genreActived ? 'visible' : 'hidden')};
        position: absolute;
        transition: height 0.2s ease-in-out;

        & > ul {
          border-radius: 0 0 1rem 1rem;
          display: flex;
          padding-left: 1.2rem;
          margin-top: 1.8rem;
          gap: 5px;
          flex-direction: column;
          width: 90%;
          height: ${(props) => (props.genreActived ? '82px' : '0')};
          overflow-y: ${(props) => (props.genreActived ? 'scroll' : 'hidden')};
          overflow-x: ${(props) => (props.genreActived ? 'hidden' : 'hidden')};
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

      svg {
        transform: rotateZ(${(props) => (props.genreActived ? '180deg' : '0')});
        transition: transform 0.2s ease-in-out;
      }
    }

    .year-movie {
      position: relative;
      cursor: pointer;
      width: 15%;

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
          border-radius: 0 0 1rem 1rem;
          margin-top: 1.8rem;
          display: flex;
          padding-left: 1.2rem;
          gap: 5px;
          flex-direction: column;
          width: 85%;
          height: ${(props) => (props.relaceDateActived ? '82px' : '0')};
          overflow-y: ${(props) =>
            props.relaceDateActived ? 'scroll' : 'hidden'};
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

      svg {
        transform: rotateZ(
          ${(props) => (props.relaceDateActived ? '180deg' : '0')}
        );
        transition: transform 0.2s ease-in-out;
      }
    }

    .reset-filters {
      color: ${colors.color1};
      background-color: ${colors.color7};
      border-radius: 1.5rem;
      padding: 8px 1.2rem;
      font-size: 13px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 15%;
      cursor: pointer;
    }

    .search-movie-whit-filter {
      width: 25%;

      & > div {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;

        & > svg {
          flex: none;
          cursor: pointer;
        }

        form {
          width: 100%;

          & > input {
            width: 100%;
            border: none;
            background-color: transparent;
            color: ${colors.color1};
            font-size: 13px;
            font-weight: 500;

            &::placeholder {
              color: #ccc;
              font-size: 13px;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
`;

export const CatalogMovies = styled.div`
  margin-bottom: 4rem;

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
      font-size: 12px;
      margin-top: 5px;
    }
  }

  a {
    width: calc(100% / 5);
    display: inline-block;
    height: 375px;
    padding: 8px;

    &:hover {
      & > .movie-catalog-img {
        transform: scale(1.02);
      }
    }
  }

  [data-filter-name='actived'] {
    display: none;
  }

  .movie-catalog-img {
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
      font-size: 12px;
    }
  }

  .box-shadow-movie-catalog {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 4;
    left: 0;
    bottom: 0;
    box-shadow: inset 0px -70px 70px -15px ${colors.color7};
    cursor: pointer;
  }

  .movie-or-serie-catalog {
    position: absolute;
    z-index: 6;
    top: 0;
    font-size: 12px;
    font-weight: 400;
    padding: 14px;
    color: ${colors.color1};
  }

  .movie-catalog-details {
    position: absolute;
    z-index: 6;
    width: 100%;
    border-radius: 1rem;
    padding: 0 14px 14px;
    bottom: 0;
    color: ${colors.color1};

    & > h5 {
      font-size: 12px;
      font-weight: 600;
      max-width: 8rem;
      margin-bottom: 10px;
    }

    & > .movie-catalog-rating-data {
      display: flex;
      justify-content: space-between;

      div:last-child {
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
`;

export const ContainerPagenation = styled.div`
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
        font-size: 13px;
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
