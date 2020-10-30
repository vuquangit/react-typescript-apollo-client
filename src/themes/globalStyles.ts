import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${(props: any) => props.theme.backgroundColor};
    color: ${(props: any) => props.theme.textColor};
    font-weight: 400;
    line-height: 1.5;
    font-family: Open-Sans, Helvetica, Sans-Serif;

    transition-property: background-color, color;
    transition-duration: .3s;
    transition-timing-function: ease-out;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: normal;
  }
  
  ul {
    list-style: none;
  }
  
  button,
  input,
  select,
  textarea {
    margin: 0;
  }
  
  html {
    box-sizing: border-box;
  }
  
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  
  img,
  embed,
  object,
  audio,
  video {
    height: auto;
    max-width: 100%;
  }
  
  iframe {
    border: 0;
    max-width: 100%;
  }
  
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  td,
  th {
    padding: 0;
    text-align: left;
  }

`

export default GlobalStyle
