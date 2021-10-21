import React from "react"
import ReactDOM from "react-dom"
import AppContainer from "./components/AppContainer"
import { CssBaseline } from "@mui/material";
import { globalDarkTheme, globalLightTheme } from "./styles/GlobalTheme";
import { ThemeProvider } from "@mui/material/styles";

// Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Database config file
import "./firebase-config"

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={globalDarkTheme}>
            <CssBaseline/>
            <AppContainer />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
)