import styled from 'styled-components';

const SlideHeaderPagenateCustomContainer = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 0;
  display: flex;

  @media (max-width: 570px) {
    bottom: -1.75rem;
  }
  @media (max-width: 500px) {
    bottom: 0;
    left: -1rem;
  }

  & > div {
    cursor: pointer;

    svg:hover,
    svg:focus {
      transition: fill 0.2s ease-in;
      fill: #a7a0a0;
    }
  }
`;

export default SlideHeaderPagenateCustomContainer;
