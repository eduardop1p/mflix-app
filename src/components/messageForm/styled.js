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
    position: relative;
    width: calc(100% - 4rem);
    max-width: 400px;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;
    background-color: ${color1};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & > svg {
      & > path {
        fill: ${(props) => (props.errorMessage ? 'red' : 'green')};
      }
    }

    & > div {
      margin: 12px 0;
      font-size: 1rem;
      font-weight: 600;
      color: ${color6};
    }

    & > span {
      text-align: center;
      max-width: calc(100% - 100px);
      color: ${color8};
      font-size: 0.93rem;
      font-weight: 400;
      margin-bottom: 3.5rem;
    }

    & > button {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 12px 0;
      cursor: pointer;
      font-size: 0.93rem;
      font-weight: 400;
      background-color: ${(props) =>
        props.errorMessage ? '#ff4d4d' : '#4DFF4D'};
      color: ${color1};
    }
  }
`;

export default FormMsgContainer;
