import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import { globalDarkTheme, globalLightTheme } from '../styles/GlobalTheme';
import { CssBaseline } from '@mui/material';
import CourseSelection from './CourseSelection';

// Components
import Login from './Login'
import Register from './Register'
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

  // State for the theme mode (light or dark)
  const [themeMode, setThemeMode] = useState(globalDarkTheme);

  // Toggles between light mode and dark mode
  const toggleThemeMode = () => {
    setThemeMode((prevThemeMode) => (
      prevThemeMode === globalDarkTheme ? globalLightTheme : globalDarkTheme
    ));
  }

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
    <ThemeProvider theme={themeMode}>
      <CssBaseline />
      <Router>
        <Switch>

          <Route path="/login">
            <Login setUserId={setUserId} />
          </Route>

          <Route path="/register">
            <Register setUserId={setUserId} />
          </Route>

          <Route path="/account_setup">
            <div>
              <CourseSelection showName={true}></CourseSelection>
            </div>
          </Route>

          <Route path="/edit_courses">
            <div>
              <CourseSelection showName={false}></CourseSelection>
            </div>
          </Route>

          <Route path="/password_reset">
            <PasswordReset />
          </Route>

          <Route exact path="/">
            <NavBar
              title="Home"
              currentThemeMode={themeMode}
              toggleThemeMode={toggleThemeMode}
            />
            <Home uid={userInfo.uid} />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>

        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default AppContainer