import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'

// Pages
import Home from '../pages/Home'
import PageNotFound from '../pages/PageNotFound'
import Login from '../pages/Login'
import Register from '../pages/Register'

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
                    <Login setUserProp={setUser} />
                </Route>


                <Route path="/register">
                    <Register />
                </Route>


                <Route exact path="/">
                    <Home uidProp={userInfo.uid} />
                </Route>


                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>
        </div>
    )
}

export default AppContainer