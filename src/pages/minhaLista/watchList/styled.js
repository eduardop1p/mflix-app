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
    font-size: 12.5px;
    color: ${colors.color5};
    font-weight: 400;
    height: fit-content;
    margin-left: 10px;
    text-align: left;
    min-width: 100px;

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
    margin-left: 1rem;

    & > div {
      display: flex;
      background-color: ${colors.color7};
      padding: 8px 1.2rem;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: center;
      justify-content: space-between;
      position: relative;
      width: 100%;
      border-radius: 1.5rem;

      & > :first-child {
        width: 20px;
        height: 20px;
        margin-left: 7px;

        & > svg {
          transform: rotateZ(${(props) => (props.showTitles ? '180deg' : 0)});
          transition: transform 0.2s ease-in-out;
        }
      }

      & > :nth-child(2) {
        color: ${colors.color1};
        font-size: 13px;
        font-weight: 500;
      }

      & > :nth-child(3) {
        position: absolute;
        top: 1.45rem;
        display: flex;
        justify-content: center;
        left: 0;
        z-index: -1;
        background-color: ${colors.color7};
        transition: height 0.2s ease-in-out;
        height: ${(props) => (props.showTitles ? '120px' : 0)};
        width: 100%;
        overflow: hidden;
        border-radius: 0 0 1rem 1rem;

        & > fieldset {
          display: flex;
          flex-direction: column;
          border: none;
          background-color: inherit;
          width: 100%;
          height: 90px;
          overflow-x: hidden;
          overflow-y: ${(props) => (props.showTitles ? 'visible' : 'hidden')};
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
              font-size: 13.5px;
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

      & > button {
        width: 100%;
        height: 100%;
        cursor: pointer;
        background-color: transparent;
        position: absolute;
        right: 0;
        border-radius: 1.5rem;
      }
    }
  }
`;

export const WatchListSection = styled.section`
  width: 100%;

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
      width: calc(100% / 3);
      padding: 8px;
      transition: transform 0.2s ease-in-out;

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
          font-size: 13px;
          font-weight: 400;
          padding: 14px;
          color: ${colors.color1};
        }

        & > .img-my-list-item {
          position: relative;
          width: 100%;
          height: 222px;
          font-size: 0;

          img {
            width: 100%;
            height: 100%;
          }
        }

        & > .my-list-details {
          background-color: ${colors.color7};
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;

          & > h4 {
            color: ${colors.color1};
            margin-bottom: 1.5rem;
            font-weight: 500;
            max-width: 100%;
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
              font-size: 14px;
              font-weight: 400;
            }

            & > .release-date {
              font-size: 14px;
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
  margin: ${(props) => (props.margin ? '1rem 0 1rem 1rem' : '0 auto')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${colors.color1};

  & > img {
    transform: translate3d(50px);
    width: 75px;
    margin-bottom: 8px;
  }

  & > h4 {
    font-weight: 500;
    margin-bottom: 5px;
  }

  & > h5 {
    font-weight: 400;
  }
`;
