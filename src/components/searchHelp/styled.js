import styled from 'styled-components';

import * as colors from '../../colors/index';

const SearchHelpContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? '1rem' : 0)};

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 8px 1.2rem;
    background-color: ${colors.color7};
    border-radius: 1rem;
    overflow: hidden;

    & > :first-child {
      margin-right: 10px;
    }

    @media (max-width: 800px) {
      & > :first-child {
        margin-right: 10px;
      }
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
export default SearchHelpContainer;
