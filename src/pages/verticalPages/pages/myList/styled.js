import styled from 'styled-components';

const VerticalDivMyList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0 1rem 8px;

  @media (max-width: 800px) {
    margin: 5px 0 5px 5px;
  }

  @media (max-width: 750px) {
    width: 100%;
    margin: 0 0 2rem 0;
  }
`;

export default VerticalDivMyList;
