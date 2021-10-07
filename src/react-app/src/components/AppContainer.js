import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'

// Pages
import HomePage from '../pages/HomePage'
import MissingPage from '../pages/MissingPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

/*
 * This component houses all the components that will be used in the application and it also
 * manages app wide state.
 */
const AppContainer = () => {
    const getUserInfo = () => {
        const temp = localStorage.getItem("userId");
        const savedUserId = JSON.parse(temp);
        return savedUserId || null;
    }

    const [userInfo, setUserInfo] = useState({
        uid: getUserInfo(),
    });

    const setUser = (userId) => {
        setUserInfo({
            uid: userId,
        })
        const temp = JSON.stringify(userId)
        localStorage.setItem("userId", temp)
        console.log(userId);
    }

    return (
        <div className="container">
            <Switch>
                <Route path="/login">
                    <LoginPage setUserProp={setUser} />
                </Route>


                <Route path="/register">
                    <RegisterPage />
                </Route>


                <Route exact path="/">
                    <HomePage uidProp={userInfo.uid} />
                </Route>


                <Route path="*">
                    <MissingPage />
                </Route>
            </Switch>
        </div>
    )
}

export default AppContainer