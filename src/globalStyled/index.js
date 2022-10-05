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

  #root{
    min-width: 520px;
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
    font-size: 13px;
    background: linear-gradient(to right, ${colors.color2} 10%, ${colors.color3});
  }

  .new{
    color: ${colors.color2};
    font-weight: 600;
    font-size: 14px;
  }

  ul {
    list-style: none;
  }

  img {
    color: ${colors.color1};
  }
`;

export default GlobalStyled;
