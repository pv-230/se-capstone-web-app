import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//import '../styles/AppContainer.css'

// Components
import Login from './Login'
import Register from './Register'
import AccountSetup from './AccountSetup'
import PasswordReset from './PasswordReset'
import PageNotFound from './PageNotFound'
import Home from './Home'
import NavBar from './NavBar'

/*
 * This component houses all the components that will be used in the application and it also
 * manages app wide state.
 */
const AppContainer = () => {
    // Returns the userId found in local storage or null if not found
    const getUserInfo = () => {
        const temp = localStorage.getItem("userId");
        const savedUserId = JSON.parse(temp);
        return savedUserId || null;
    }

    // User information states
    const [userInfo, setUserInfo] = useState({
        uid: getUserInfo(),
    });


    // Updates the uid state to the userId parameter and stores userId in local storage
    const setUserId = (userId) => {
        setUserInfo({
            ...userId,
            uid: userId
        })
        const temp = JSON.stringify(userId)
        localStorage.setItem("userId", temp)
    }

    return (
        <div className="app-container">
            <Router>
                <NavBar />
                <Switch>
                    <Route path="/login">
                        <Login setUserId={setUserId} />
                    </Route>

                    <Route path="/register">
                        <Register setUserId={setUserId} />
                    </Route>

                    <Route path="/account_setup">
                        <AccountSetup />
                    </Route>

                    <Route path="/password_reset">
                        <PasswordReset />
                    </Route>

                    <Route exact path="/">
                        <Home uid={userInfo.uid} />
                    </Route>

                    <Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default AppContainer