import styled from 'styled-components';

import * as colors from '../../colors/index';
import svgCheckDone from '../../assets/images/done_FILL0_wght700_GRAD0_opsz20.svg';

export const Container = styled.div`
  padding: 8px;
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.color9};
  display: flex;

  @media (max-width: 750px) {
    padding: 10px;
  }
`;

export const ContainerHeaderVertical = styled.header`
  width: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.color7};
  padding: 10px;
  border-radius: 1rem 0 0 1rem;

  @media (max-width: 750px) {
    position: fixed;
    z-index: 7;
    bottom: 0;
    flex-direction: row;
    border-radius: 0;
    padding: 8px 1.5rem;
    width: 100%;
    background-color: ${colors.color8};
    left: 0;

    @media (max-width: 600px) {
      padding: 8px 1rem;
    }
  }

  & > :first-child {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 750px) {
      flex-direction: row-reverse;
      justify-content: space-between;
      width: 100%;
    }

    & > :first-child {
      margin-bottom: 1.5rem;

      @media (max-width: 750px) {
        margin-bottom: 0;
        margin-left: 3rem;
        flex-shrink: 0;

        @media (max-width: 600px) {
          margin-left: 2rem;
        }
        @media (max-width: 360px) {
          margin-left: 1.5rem;
        }
      }
    }

    & > .singn-up-vertical {
      width: 43px;
      height: 43px;
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
      flex-direction: column;
      align-items: center;

      @media (max-width: 750px) {
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
      }

      & > :not(:last-child) {
        margin-bottom: 1.5rem;

        @media (max-width: 750px) {
          margin-bottom: 0;
          margin-right: 1rem;
        }
      }

      & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 23px;
        height: 23px;

        & > .link-actived > svg {
          fill: ${colors.color2};
        }

        & > a {
          width: 100%;
          height: 100%;
        }
      }

      & > .scale-icon svg {
        display: inline-block;
        width: 100%;
        height: 100%;
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

      & > .vertical-search svg {
        height: 24px;
        width: 24px;
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
  width: calc(100% - 367px);

  & > :first-child {
    margin-right: 1rem;
  }

  @media (max-width: 1290px) {
    margin: 10px 0 10px 10px;
    flex-direction: column;
    width: calc(100% - 65px);

    & > :not(:last-child) {
      margin-bottom: 2rem;
    }

    & > :first-child {
      margin-right: 0;
    }
  }

  @media (max-width: 750px) {
    width: 100%;
    margin: 0 0 4rem 0;
  }

  & > .search-new-popular {
    background-color: transparent;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    & > :not(:last-child) {
      margin-bottom: 2rem;
    }

    h1 {
      color: ${colors.color1};
      font-size: 1.5rem;
      margin-bottom: 1rem;
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
  flex-shrink: 0;

  & > :not(:last-child) {
    margin-bottom: 14px;
  }

  @media (max-width: 1290px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: auto;

    & > :not(:last-child) {
      margin-bottom: 0;
    }

    & > :nth-child(1) {
      margin-right: 14px;
    }
    & > :nth-child(2) {
      margin-left: ${({ noMargin }) => (noMargin ? '0' : '14px')};
    }
  }
  @media (max-width: 630px) {
    padding: 1rem;
  }
  @media (max-width: 500px) {
    flex-direction: column;

    & > :nth-child(1) {
      margin-bottom: 14px;
    }
    & > :nth-child(2) {
      margin-left: 0;
      margin-top: ${({ noMargin }) => (noMargin ? '0' : '14px')};
    }
  }

  & > .vertical {
    @media (max-width: 1290px) {
      width: 100%;
    }
  }

  & > .genres {
    @media (min-width: 750px) and (max-width: 1290px) {
      width: ${({ width70 }) => (width70 ? '70%' : '100%')};
    }

    & > :last-child {
      height: ${({ genresArrowActived }) =>
        genresArrowActived ? '140px' : '0'};
      overflow: hidden scroll;
      transition: height 0.2s ease-in-out;
      margin-top: 8px;

      @media (max-width: 500px) {
        height: ${({ genresArrowActived }) =>
          genresArrowActived ? '90px' : '0'};
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

  & > .years {
    width: 100%;

    @media (max-width: 1290px) {
      order: 3;
    }

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

      @media (max-width: 500px) {
        height: ${({ actorArrowActived }) =>
          actorArrowActived ? '90px' : '0'};
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

        & > :first-child {
          margin-right: 10px;
        }

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
          flex-shrink: 0;
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

  .popular-slider {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${colors.color7};
    border-radius: 5px;
    padding: 10px;

    & > .popular-img {
      width: 125px;
      height: 180px;
      flex-shrink: 0;
      position: relative;

      @media (max-width: 1290px) {
        width: 115px;
        height: 160px;
      }
      @media (max-width: 500px) {
        width: 110px;
        height: 150px;
      }

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

      & > :not(:last-child) {
        margin-bottom: 5px;
      }

      @media (max-width: 720px) {
        margin-left: 1rem;
      }

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

        & > :not(:last-child) {
          margin-right: 3px;
        }

        & > .popular-genre-genre {
          max-width: 100%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 1;
        }
      }

      & > .vertical-overview {
        font-size: 0.81rem;
        font-weight: 400;
        flex: none;
        color: ${colors.color5};
        width: 100%;
        max-height: 34px;
        height: auto;
        overflow: hidden hidden;
        word-break: break-word;

        &:hover,
        &:focus {
          overflow: hidden hidden;

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

            @media (max-width: 650px) {
              margin-left: 3px;
            }
            @media (max-width: 629px) {
              margin-left: 5px;
            }
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
        padding: 8px 0;
        width: 90%;
        transition: all 0.2s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;

        @media (min-width: 1361px) {
          padding: 8px 1.2rem;
          width: fit-content;
        }
        @media (max-width: 1330px) {
          width: 100%;
        }
        @media (max-width: 1290px) {
          padding: 8px 1.2rem;
          width: fit-content;
        }
        @media (max-width: 600px) {
          padding: 8px 0;
          width: 100%;
        }
        @media (max-width: 559px) {
          padding: 8px 1.2rem;
          width: fit-content;
        }
        @media (max-width: 300px) {
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

export const Popular = styled.div`
  overflow: hidden scroll;
  height: 100vh;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: ${colors.color6};
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  .vertical-popular-img-details {
    width: calc(100% / 4);
    display: inline-block;
    height: 25.7vw;
    padding: 8px;
    position: relative;

    @media (max-width: 2500px) and (min-width: 2000px) {
      width: calc(100% / 8);
      height: 16vw;
    }
    @media (max-width: 2250px) {
      height: 15vw;
    }
    @media (min-width: 1700px) and (max-width: 1999px) {
      width: calc(100% / 7);
      height: 18vw;
    }
    @media (max-width: 1850px) {
      height: 17vw;
    }
    @media (min-width: 1300px) and (max-width: 1699px) {
      width: calc(100% / 6);
      height: 19vw;
    }
    @media (max-width: 1450px) {
      height: 18vw;
    }
    @media (min-width: 1291px) and (max-width: 1299px) {
      width: calc(100% / 5);
      height: 22vw;
    }
    @media (min-width: 1000px) and (max-width: 1290px) {
      width: calc(100% / 6);
      height: 24vw;
    }
    @media (max-width: 1150px) {
      height: 23vw;
    }
    @media (min-width: 800px) and (max-width: 999px) {
      width: calc(100% / 5);
      height: 28vw;
    }
    @media (max-width: 900px) {
      height: 27vw;
      padding: 6px;
    }
    @media (min-width: 600px) and (max-width: 799px) {
      width: calc(100% / 4);
      height: 35vw;
    }
    @media (min-width: 400px) and (max-width: 599px) {
      width: calc(100% / 3);
      height: 45vw;
    }
    @media (max-width: 500px) {
      height: 44vw;
    }

    @media (max-width: 450px) {
      height: 42vw;
    }

    @media (max-width: 400px) {
      width: calc(100% / 2);
      height: 64vw;
    }
    @media (max-width: 350px) {
      height: 61vw;
    }

    @media (max-width: 300px) {
      height: 59vw;
      min-height: 159px;
    }

    @media (max-width: 265px) {
      width: 100%;
      height: 110vw;
      min-height: 264px;
    }

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
          margin-left: 2px;
        }
      }
    }
  }
`;
