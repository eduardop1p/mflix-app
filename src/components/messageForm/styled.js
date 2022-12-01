import styled from 'styled-components';

import { color1, color8, color6 } from '../../colors/index';

const FormMsgContainer = styled.div`
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #171a23fa;

  & > div {
    width: calc(100% - 4rem);
    max-width: 400px;
    height: 185px;
    border-radius: 5px;
    overflow: hidden;
    background-color: ${color1};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    & > :first-child {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      margin: 10px 0;

      & * {
        flex-shrink: 0;
      }

      & > svg {
        & > path {
          fill: ${({ errorMessage }) => (errorMessage ? 'red' : 'green')};
        }
      }

      & > div {
        margin: 10px 0;
        font-size: 1rem;
        font-weight: 600;
        color: ${color6};
      }

      & > span {
        text-align: center;
        max-width: calc(100% - 50px);
        color: ${color8};
        font-size: 0.93rem;
        font-weight: 400;
      }
    }

    & > button {
      width: 100%;
      padding: 12px 0;
      cursor: pointer;
      font-size: 0.93rem;
      font-weight: 400;
      background-color: ${({ errorMessage }) =>
        errorMessage ? '#ff4d4d' : '#4DFF4D'};
      color: ${color1};
    }
  }
`;

export default FormMsgContainer;
