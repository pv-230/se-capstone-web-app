import React from "react"
import ReactDOM from "react-dom"
import AppContainer from "./components/AppContainer"
import { CssBaseline } from "@mui/material";
import { globalDarkTheme, globalLightTheme } from "./styles/GlobalTheme";
import { ThemeProvider } from "@mui/material/styles";

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