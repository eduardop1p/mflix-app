import styled from 'styled-components';

import * as colors from '../../colors/index';
import svgCheckDone from '../../assets/images/done_FILL0_wght700_GRAD0_opsz20.svg';

export const Container = styled.div`
  padding: 8px;
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.color9};
  display: flex;

  @media (max-width: 500px) {
    padding: 7px;
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
  min-height: 450px;

  & > :first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

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
      gap: 1.5rem;
      flex-direction: column;
      align-items: center;

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

      & > .vertical-search svg {
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
  width: calc(100% - 367px);

  @media (max-width: 1290px) {
    margin: 10px 0 10px 10px;
    flex-direction: column;
    width: calc(100% - 65px);
  }

  @media (max-width: 600px) {
    width: calc(100% - 60px);
  }

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
  }
`;

export const SearchHelpContainer = styled.div`
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

    @media (max-width: 800px) {
      gap: 5px;
    }

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
    margin-left: 10px;
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
      z-index: 8;

      @media (max-width: 1290px) {
        background-color: ${colors.color8};
      }

      &::before {
        content: '';
        position: absolute;
        background-color: inherit;
        z-index: -1;
        right: 0;
        top: -10px;
        width: 20px;
        height: 20px;
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      }
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

  @media (max-width: 1290px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: auto;
  }
  @media (max-width: 630px) {
    padding: 1rem;
  }
  @media (max-width: 500px) {
    flex-direction: column;
  }

  & > .vertical {
    @media (max-width: 1290px) {
      width: 100%;
    }
  }

  & > .genres {
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
    height: 100%;
    padding: 10px;

    @media (max-width: 629px) {
      flex-direction: column;
    }
    @media (max-width: 500px) {
      flex-direction: row;
    }
    @media (max-width: 345px) {
      flex-direction: column;
    }

    & > .popular-img {
      width: 125px;
      height: 180px;
      flex-shrink: 0;
      position: relative;

      @media (max-width: 1290px) {
        width: 115px;
        height: 160px;
      }
      @media (max-width: 629px) {
        width: 100%;
        height: 35.8vw;
      }
      @media (max-width: 580px) {
        height: 34.8vw;
      }
      @media (max-width: 540px) {
        height: 33vw;
      }
      @media (max-width: 500px) {
        width: 110px;
        height: 150px;
      }
      @media (max-width: 345px) {
        width: 120px;
        height: 180px;
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
      gap: 8px;

      @media (max-width: 720px) {
        margin-left: 1rem;
        gap: 5px;
      }
      @media (max-width: 629px) {
        margin-top: 1rem;
        margin-left: 0;
      }
      @media (max-width: 500px) {
        margin-top: 0;
        margin-left: 1rem;
      }
      @media (max-width: 345px) {
        margin-top: 1rem;
        margin-left: 0;
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
        gap: 5px;

        @media (max-width: 660px) {
          flex-direction: column;
          gap: 1px;
        }

        @media (max-width: 629px) {
          flex-direction: row;
          gap: 5px;
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
        max-width: 10rem;
        height: 34px;
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

          @media (max-width: 650px) {
            flex-direction: column;
            align-items: normal;
          }
          @media (max-width: 629px) {
            flex-direction: row;
            align-items: center;
          }

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
        @media (max-width: 670px) {
          padding: 8px 0;
          width: 100%;
        }
        @media (max-width: 500px) {
          padding: 8px 1.2rem;
          width: fit-content;
        }
        @media (max-width: 360px) {
          width: 100%;
        }
        @media (max-width: 345px) {
          padding: 8px 1.2rem;
          width: fit-content;
          margin: 0 auto;
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
    @media (max-width: 700px) {
      height: 34vw;
    }
    @media (min-width: 400px) and (max-width: 599px) {
      width: calc(100% / 3);
      height: 44vw;
    }
    @media (max-width: 500px) {
      height: 43vw;
    }
    @media (max-width: 480px) {
      height: 41vw;
    }
    @media (max-width: 450px) {
      height: 39vw;
    }
    @media (max-width: 430px) {
      height: 37vw;
    }
    @media (max-width: 400px) {
      width: calc(100% / 2);
      height: 61vw;
    }
    @media (max-width: 380px) {
      height: 59vw;
    }
    @media (max-width: 350px) {
      height: 57vw;
    }
    @media (max-width: 330px) {
      height: 55vw;
    }
    @media (max-width: 300px) {
      height: 53vw;
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
