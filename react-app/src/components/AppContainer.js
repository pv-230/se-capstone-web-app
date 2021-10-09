import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'

// Pages
import HomePage from '../pages/HomePage'
import MissingPage from '../pages/MissingPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import AccountSetup from '../pages/AccountSetup'
import PasswordResetPage from '../pages/PasswordResetPage'

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
        <div className="container">
            <Switch>
                <Route path="/login">
                    <LoginPage setUserId={setUserId} />
                </Route>

                <Route path="/register">
                    <RegisterPage />
                </Route>

                <Route path="/account_setup">
                    <AccountSetup />
                </Route>

                <Route path="/password_reset">
                    <PasswordResetPage />
                </Route>

                <Route exact path="/">
                    <HomePage uid={userInfo.uid} />
                </Route>

                <Route path="*">
                    <MissingPage />
                </Route>
            </Switch>
        </div>
    )
}

export default AppContainer