import { createGlobalStyle } from 'styled-components';

import * as colors from '../colors';

const GlobalStyled = createGlobalStyle`
  *{
    outline: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif;

    @media (max-width: 490px) {
      font-size: 94%;
    }
  }

  body{
    background-color: ${colors.color8};
    max-width: 2500px;
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
    padding: 13px 3rem;
    border-radius: 1.5rem;
    color: ${colors.color1};
    font-size: 0.81rem;
    background: linear-gradient(to right, ${colors.color2} 10%, ${colors.color3});
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
    color: ${colors.color1};
  }
`;

export default GlobalStyled;
