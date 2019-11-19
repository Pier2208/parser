import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,700');
    @import url('https://fonts.googleapis.com/css?family=Fredericka+the+Great');
    
    html {
        box-sizing: border-box;
    }
    *,
    *:after,
    *:before {
        box-sizing: inherit;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
    }
    a {
        text-decoration: none;
    }
`