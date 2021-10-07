import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import AppContainer from "./components/AppContainer"

// CSS stylesheet
import "./styles.css"

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
