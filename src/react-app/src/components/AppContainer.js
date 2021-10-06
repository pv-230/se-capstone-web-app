import React from 'react'
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
    return (
        <div className="container">
            <Switch>

                <Route path="/login">
                    <Login />
                </Route>


                <Route path="/register">
                    <Register />
                </Route>


                <Route exact path="/">
                    <Home />
                </Route>


                <Route path="*">
                    <PageNotFound />
                </Route>

            </Switch>
        </div>
    )
}

export default AppContainer