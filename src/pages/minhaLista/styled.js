import styled from 'styled-components';

const Main = styled.main`
  & > .amo-vadias {
    padding: 0 4rem;

    @media (max-width: 800px) {
      padding: 0 3rem;
    }
    @media (max-width: 520px) {
      padding: 0 2rem;
    }
  }
  width: 100%;
  min-height: 100vh;
`;

export default Main;
