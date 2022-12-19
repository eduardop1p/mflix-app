import styled from 'styled-components';

const VerticalDivMyList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0 1rem 8px;

  @media (max-width: 800px) {
    margin: 10px 0 10px 10px;
  }
`;

export default VerticalDivMyList;
