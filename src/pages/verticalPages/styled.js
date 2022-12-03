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

  & > .search-new-popular {
    background-color: transparent;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    height: 100%;

    h1 {
      color: ${colors.color1};
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    & > .search-help {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      form {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 8px 1.2rem;
        background-color: ${colors.color7};
        border-radius: 1rem;
        overflow: hidden;

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
          color: ${colors.color5};
          background-color: inherit;
          font-size: 0.81rem;
          font-weight: 500;

          &::placeholder {
            color: ${colors.color5};
            font-size: 0.81rem;
            font-weight: 500;
          }
        }
      }

      & > div {
        margin-left: 1rem;
        position: relative;
        width: 20px;
        height: 20px;

        svg {
          cursor: pointer;

          path {
            fill: ${colors.color6};
          }
        }

        &:focus {
          & > span {
            visibility: visible;
            transform: scale(1);
          }
        }

        & > span {
          padding: 8px;
          width: 180px;
          border-radius: 5px;
          top: 2rem;
          right: 0;
          position: absolute;
          font-size: 12px;
          color: ${colors.color5};
          background-color: ${colors.color7};
          transition: transform 0.15s linear, visibility 0.15s linear;
          visibility: hidden;
          transform: scale(0.8);

          &::before {
            content: '';
            position: absolute;
            background-color: ${colors.color7};
            z-index: -1;
            right: 0;
            top: -10px;
            width: 20px;
            height: 20px;
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          }
        }
      }
    }

    & > .new {
      position: relative;
      height: 265px;
    }
  }
`;

export const Filters = styled.div`
  padding: 1.5rem;
  width: 280px;
  height: 500px;
  border-radius: 1rem;
  background-color: ${colors.color7};
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex-shrink: 0;

  & > .genres {
    & > :last-child {
      height: ${({ genresArrowActived }) =>
        genresArrowActived ? '140px' : '0'};
      overflow-y: scroll;
      overflow-x: hidden;
      transition: height 0.2s ease-in-out;
      margin-top: 8px;

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
      justify-content: space-between;
      align-items: center;
      width: 100%;

      & > h5 {
        font-size: 0.87rem;
        color: ${colors.color1};
        font-weight: 600;
      }

      & > .years {
        cursor: pointer;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${({ yearsArrowActived }) =>
          yearsArrowActived ? colors.color2 : colors.color6};

        & > svg {
          transform: rotateZ(
            ${({ yearsArrowActived }) => (yearsArrowActived ? '180deg' : '0')}
          );
        }
      }
    }

    & > :last-child {
      height: ${({ yearsArrowActived }) => (yearsArrowActived ? '45px' : '0')};
      overflow: hidden;
      width: 105%;
      transition: all 0.2s ease-in-out;

      .MuiSlider-root {
        padding: 0;

        .MuiSlider-rail {
          background-color: ${colors.color5};
        }

        .Mui-focusVisible {
          box-shadow: 0px 0px 0px 8px #6462802b;
        }
      }

      & > .value-range-visibles {
        display: flex;
        width: 95%;
        justify-content: space-between;
        height: fit-content;

        & > span {
          color: ${colors.color5};
          font-size: 0.84rem;
          margin-top: 10px;
        }
      }
    }
  }

  & > .actor {
    & > :last-child {
      height: ${({ actorArrowActived }) => (actorArrowActived ? '140px' : '0')};
      overflow: hidden scroll;
      transition: height 0.2s ease-in-out;
      margin-top: 8px;

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
      background-color: ${({ genresArrowActived }) =>
        genresArrowActived ? colors.color2 : colors.color6};

      & > svg {
        transform: rotateZ(
          ${({ genresArrowActived }) => (genresArrowActived ? '180deg' : '0')}
        );
      }
    }

    & > .actor {
      background-color: ${({ actorArrowActived }) =>
        actorArrowActived ? colors.color2 : colors.color6};

      & > svg {
        transform: rotateZ(
          ${({ actorArrowActived }) => (actorArrowActived ? '180deg' : '0')}
        );
      }
    }
  }

  & > .vertical > :last-child {
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

export const New = styled.div`
  width: 100%;
  position: absolute;

  .popular-slider {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${colors.color7};
    border-radius: 5px;
    padding: 10px;

    & > .popular-img {
      width: 140px;
      height: 200px;
      flex-shrink: 0;
      position: relative;

      & > .movie-or-serie {
        position: absolute;
        top: 0;
        z-index: 6;
        margin: 14px;
        font-size: 12px;
        color: ${colors.color1};
      }

      & > img {
        object-fit: cover;
        border-radius: 10px;
        width: 100%;
        height: 100%;
      }
    }

    & > .popular-details {
      margin-left: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 9px;

      & > a > h3 {
        max-width: 100%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
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
        color: ${colors.color5};
        display: flex;
        gap: 5px;
        align-items: center;
      }

      & > .vertical-overview {
        font-size: 0.81rem;
        font-weight: 400;
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

export const Popular = styled.div`
  overflow: hidden scroll;

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
    position: relative;

    .movie-or-serie {
      position: absolute;
      top: 0;
      z-index: 6;
      margin: 14px;
      font-size: 12px;
      color: ${colors.color1};
    }

    & > .img-details {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      & > img {
        object-fit: cover;
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
        max-width: 100%;
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
          max-width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
`;
