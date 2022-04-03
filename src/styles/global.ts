import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --green: #10b981;
        --text-title: #363F5F;
        --text-body: #969CB3;
        --shape: #FFFFFF;
        --background: #F0F2F5;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: var(--background);
        -webkit-font-smoothing: antialiased;
    }

    body, input, button, select {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }

    h1 {
        font-weight: 700;
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%; // === 16px * 0.9375
        }

        @media (max-width: 720px) {
            font-size: 87.5%; // === 16px * 0.875
        }
    }

    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;
