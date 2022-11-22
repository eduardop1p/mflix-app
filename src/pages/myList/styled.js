import styled from 'styled-components';

const Main = styled.main`
  min-height: 100vh;
  margin: auto 3rem;

  @media (max-width: 680px) {
    margin: auto 2.5rem;
  }
  @media (max-width: 570px) {
    margin: auto 2rem;
  }
  @media (max-width: 445px) {
    margin: auto 1.5rem;
  }
`;

export default Main;
