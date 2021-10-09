import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import AppContainer from "./components/AppContainer"

// styles
import "./styles.css"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Database config file
import "./firebase-config"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <AppContainer />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
