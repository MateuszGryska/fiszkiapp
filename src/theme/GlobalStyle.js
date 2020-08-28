import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    font-size: 62.5%; 
  }
  
  body {
    overflow-x: hidden;
    overflow-y: scroll;
    font-size: 1.6rem;
    font-family: "Montserrat", sans-serif;
    background: ${({ theme }) => theme.background};
    padding: 0;
    margin: 0;
  }

  input, textarea {
    font-family: "Montserrat", sans-serif;
  }
`;

export default GlobalStyle;
