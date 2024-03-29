import styled from 'styled-components';

import * as colors from '../../../colors/index';
import svgCheckDone from '../../../assets/images/done_FILL0_wght700_GRAD0_opsz20.svg';

export const RemoveItemsListSelected = styled.div`
  width: calc(100% - 1rem);
  margin: 0 auto 0.5rem;
  display: flex;
  position: relative;
  z-index: 8;
  align-items: center;
  justify-content: space-between;

  .delete-items {
    cursor: pointer;
    font-size: 0.78rem;
    color: ${colors.color5};
    font-weight: 400;
    height: fit-content;
    margin-left: 10px;
    text-align: left;

    @media (max-width: 440px) {
      margin-left: 5px;
    }

    &:hover {
      transition: color 0.2s ease-in-out;
      color: #646280b8;
    }
  }

  input[type='checkbox'] {
    appearance: none;
    background-color: ${colors.color6};
    color: ${colors.color6};
    border-radius: 2px;
    overflow: hidden;
    min-width: 15px;
    min-height: 15px;
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

  & > .delete-all-items-list {
    display: flex;
    align-items: center;
  }

  & > .delete-selected-items-list {
    display: flex;
    align-items: center;
    margin-left: 0.8rem;

    & > div {
      cursor: pointer;
      display: flex;
      background-color: ${colors.color7};
      padding: 8px 1.2rem;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: center;
      justify-content: space-between;
      position: relative;
      width: 200px;
      border-radius: 1.5rem;

      @media (max-width: 490px) {
        width: 175px;
      }

      & > button {
        background-color: transparent;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 5;
        right: 0;
      }

      & > :first-child {
        width: 20px;
        height: 20px;
        margin-left: 7px;

        & > svg {
          transform: rotateZ(
            ${({ showTitles }) => (showTitles ? '180deg' : 0)}
          );
          transition: transform 0.2s ease-in-out;
        }
      }

      & > :nth-child(2) {
        color: ${colors.color1};
        font-size: 0.81rem;
        font-weight: 500;
      }

      & > :nth-child(3) {
        cursor: default;
        position: absolute;
        top: 8px;
        display: flex;
        left: 0;
        z-index: -1;
        background-color: ${colors.color7};
        transition: height 0.2s ease-in-out;
        height: ${({ showTitles }) => (showTitles ? '120px' : 0)};
        width: 100%;
        overflow: hidden;
        border-radius: 1rem;

        & > fieldset {
          display: flex;
          flex-direction: column;
          border: none;
          background-color: inherit;
          height: 65%;
          width: 100%;
          overflow: hidden scroll;
          margin: 1.8rem 1.2rem 0;

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

          & > div {
            display: flex;
            flex-direction: row-reverse;
            width: fit-content;
            margin-bottom: 8px;

            & > label {
              cursor: pointer;
              color: ${colors.color5};
              font-size: 0.84rem;
              cursor: pointer;
              margin-left: 10px;
              max-width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
  }

  & > .mobile-delete-selected-items-list {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 10px;

    & > .mobile-d-s-i-l-down {
      & > svg {
        transition: transform 0.2s linear;
        transform: rotateZ(${({ showTitles }) => (showTitles ? '180deg' : 0)});
      }
    }

    & > .mobile-menu-delete-items {
      position: absolute;
      background-color: ${colors.color7};
      width: 150px;
      top: 23px;
      right: -10px;
      height: 100px;
      border-radius: 1rem;

      & > fieldset {
        display: flex;
        flex-direction: column;
        border: none;
        width: fit-content;
        height: 70px;
        overflow: hidden
          ${({ showTitles }) => (showTitles ? 'visible' : 'hidden')};
        margin: 1rem 1.2rem 0;

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

        & > div {
          display: flex;
          flex-direction: row-reverse;
          width: fit-content;
          margin-bottom: 8px;

          & > label {
            color: ${colors.color5};
            font-size: 0.84rem;
            cursor: pointer;
            margin-left: 10px;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
`;

export const WatchListSection = styled.section`
  width: 100%;
  margin-bottom: 2rem;

  & > h1 {
    color: ${colors.color1};
    font-size: 1.8rem;
    margin-bottom: 2rem;
    font-weight: 500;
  }

  & > .my-list-container {
    width: 100%;

    & > .my-list {
      display: inline-block;
      padding: 8px;
      transition: transform 0.2s ease-in-out;

      @media (min-width: 1901px) {
        width: calc(100% / 5);
      }
      @media (min-width: 1400px) and (max-width: 1900px) {
        width: calc(100% / 4);
      }
      @media (min-width: 951px) and (max-width: 1399px) {
        width: calc(100% / 3);
      }
      @media (max-width: 950px) {
        width: calc(100% / 2);
      }
      @media (max-width: 800px) {
        padding: 5px;
      }
      @media (max-width: 450px) {
        width: 100%;
      }

      &:hover {
        transform: scale(1.02);
      }

      & > div {
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        overflow: hidden;
        position: relative;

        & > .movie-or-serie-my-list {
          position: absolute;
          z-index: 6;
          top: 0;
          font-size: 0.81rem;
          font-weight: 400;
          padding: 14px;
          color: ${colors.color1};
        }

        & > .img-my-list-item {
          position: relative;
          width: 100%;
          font-size: 0;

          @media (min-width: 2500px) {
            height: 262px;
          }
          @media (min-width: 1901px) and (max-width: 2500px) {
            height: 10.5vw;
          }
          @media (min-width: 1400px) and (max-width: 1900px) {
            height: 12.5vw;
          }
          @media (max-width: 1399px) {
            height: 16vw;
          }
          @media (max-width: 1200px) {
            height: 15vw;
          }
          @media (max-width: 950px) {
            height: 24vw;
          }
          @media (max-width: 750px) {
            height: 25vw;
          }
          @media (max-width: 550px) {
            height: 24vw;
          }
          @media (max-width: 450px) {
            height: 46vw;
          }
          @media (max-width: 390px) {
            height: 44vw;
          }
          @media (max-width: 300px) {
            height: 47vw;
            min-height: 103px;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        & > .my-list-details {
          background-color: ${colors.color7};
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;

          @media (max-width: 600px) and (min-width: 451px), (max-width: 350px) {
            padding: 1.2rem 1rem;
          }

          & > h4 {
            color: ${colors.color1};
            margin-bottom: 1.5rem;
            font-weight: 500;
            max-width: 90%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: 1rem;
          }

          & > .my-list-genre-release-date {
            color: ${colors.color1};
            display: flex;
            justify-content: space-between;

            & > .genre {
              max-width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              font-size: 0.87rem;
              font-weight: 400;
            }

            & > .release-date {
              font-size: 0.87rem;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
`;

export const AddItensList = styled.section`
  background-color: ${colors.color7};
  border-radius: 10px;
  width: 100%;
  min-height: 100vh;
  margin: ${({ margin }) => (margin ? '1rem 0 1rem 1rem' : '0 auto 2rem auto')};
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 2.5rem;
    color: ${colors.color1};

    & > img {
      transform: translate3d(50px);
      width: 75px;
      margin-bottom: 8px;

      @media (max-width: 500px) {
        width: 70px;
      }
      @media (max-width: 350px) {
        width: 65px;
      }
    }

    & > h4 {
      font-weight: 500;
      margin-bottom: 5px;
      text-align: center;
    }

    & > h5 {
      font-weight: 400;
      text-align: center;
    }
  }
`;
