import React from "react"
import ReactDOM from "react-dom"
import AppContainer from "./components/AppContainer"
import "./styles.css"
import "./firebase-config"

ReactDOM.render(
    <React.StrictMode>
        <AppContainer />
    </React.StrictMode>,
    document.getElementById("root")
)
