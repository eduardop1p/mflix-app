import styled from 'styled-components';

const ShowPasswordContainer = styled.div`
  position: absolute;
  right: 8px;
  cursor: pointer;
  z-index: 5;
  bottom: 18px;
  width: 18px;
  height: 18px;

  & > svg {
    transform: scale(0.85);
  }
`;

export default ShowPasswordContainer;
