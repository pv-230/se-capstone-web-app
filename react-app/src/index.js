import React from "react"
import ReactDOM from "react-dom"
import AppContainer from "./components/AppContainer"

// Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Database config file
import "./firebase-config"

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

import { globalDarkTheme } from "./styles/GlobalTheme";


ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={globalDarkTheme}>
            <CssBaseline/>
            <AppContainer />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
)
