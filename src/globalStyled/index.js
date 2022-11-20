import { createGlobalStyle } from 'styled-components';

import * as colors from '../colors';

const GlobalStyled = createGlobalStyle`
  *{
    outline: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif;

  }

  body{
    background-color: ${colors.color8};
    max-width: 2500px;
    min-width: 230px;
    margin: 0 auto;

    &::-webkit-scrollbar{
      width: 5px;
    }

    &::-webkit-scrollbar-thumb{
      border-radius: 1rem;
      background-color: ${colors.color5};
    }

    &::-webkit-scrollbar-track{
      background-color: transparent;
    }

  }

  a {
    text-decoration: none;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  .singn-up, .watch-online {
    font-weight: 500;
    padding: 13px 2.5rem;
    border-radius: 1.5rem;
    color: ${colors.color1};
    font-size: 0.81rem;
    background: linear-gradient(to right, ${colors.color2} 10%, ${colors.color3});

    @media (max-width: 990px) {
      padding: 13px 2rem;
    }
  }

  .new{
    color: ${colors.color2};
    font-weight: 600;
    font-size: 0.87rem;
  }

  ul {
    list-style: none;
  }

  img {
    font-size: 13px;
    color: ${colors.color1};
  }
`;

export default GlobalStyled;
