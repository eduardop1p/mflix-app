import styled from 'styled-components';

import { color2, color7 } from '../../colors/index';

const SlidePopularPagenateCustomContainer = styled.div`
  display: flex;
  margin-left: 2rem;

  & > :first-child {
    margin-right: 8px;
  }

  @media (max-width: 330px) {
    margin-left: 1rem;
  }
  @media (max-width: 300px) {
    align-self: flex-end;
  }

  & > button {
    border-radius: 50%;
    cursor: pointer;
    background-color: ${color7};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    transition: background 0.2s ease-in-out;

    &:hover,
    &:focus {
      background-color: ${color2};
    }
  }
`;

export default SlidePopularPagenateCustomContainer;
