import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import { globalDarkTheme, globalLightTheme } from '../styles/GlobalTheme';
import { CssBaseline, Box } from '@mui/material';
import CourseSelection from './CourseSelection';

// Components
import Login from './Login'
import Register from './Register'
import PasswordReset from './PasswordReset'
import PageNotFound from './PageNotFound'
import Home from './Home'
import NavBar from './NavBar'

/**
 * This component houses all the components that will be used in the application and it also
 * manages app wide state.
 */
const AppContainer = () => {
  //
  // ====================[ Local storage functions ]====================
  //

  // Returns the userId found in local storage or null if not found
  const getUserId = () => {
    return JSON.parse(localStorage.getItem('uid'));
  }

  // Returns the saved theme mode from local storage
  const getUserTheme = () => {
    const savedTheme = JSON.parse(localStorage.getItem('themeMode'));

    if (savedTheme === 'light') {
      return globalLightTheme;
    } else {
      // If themeMode not found in local storage, dark mode is set by default
      return globalDarkTheme;
    }
  }

  //
  // ====================[ States ]====================
  //

  // User information states
  const [userInfo, setUserInfo] = useState({
    uid: getUserId(),
  });

  // State for the theme mode (light or dark)
  const [themeMode, setThemeMode] = useState(getUserTheme());

  //
  // ====================[ State mutators ]====================
  //

  // Updates the uid state to the userId parameter and stores userId in local storage. Also sets
  // firstName and lastName in local storage to null if the userId is null.
  const setUserId = (userId) => {
    setUserInfo({
      ...userInfo,
      uid: userId
    })
    localStorage.setItem('uid', JSON.stringify(userId));

    if (userId === null) {
      localStorage.setItem('firstName', JSON.stringify(null));
      localStorage.setItem('lastName', JSON.stringify(null));
    }
  }

  // Toggles between light mode and dark mode
  const toggleThemeMode = () => {
    setThemeMode((prevThemeMode) => (
      prevThemeMode === globalDarkTheme ? globalLightTheme : globalDarkTheme
    ));

    // Updates local storage themeMode with opposite of current theme. The
    // setThemeMode function does not seem to update the theme right away so
    // that is why this logic is reversed.
    let savedTheme;
    if (themeMode === globalDarkTheme) {
      savedTheme = 'light';
    } else {
      savedTheme = 'dark';
    }
    localStorage.setItem('themeMode', JSON.stringify(savedTheme));
  }

  return (
    <ThemeProvider theme={themeMode}>
      <CssBaseline />
      <Router>

        {/* Navbar */}
        {userInfo.uid &&
          <NavBar
            currentThemeMode={themeMode}
            toggleThemeMode={toggleThemeMode}
            setUserId={setUserId}
          />
        }

        <Switch>
          {/* Home page */}
          <Route exact path="/">
            {userInfo.uid ? (
              <Home uid={userInfo.uid} setUserId={setUserId} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          {/* Login page */}
          <Route path="/login">
            {userInfo.uid ? (
              <Redirect to="/" />
            ) : (
              <Login setUserId={setUserId} />
            )}
          </Route>

          {/* Register page */}
          <Route path="/register">
            {userInfo.uid ? (
              <Redirect to="/" />
            ) : (
              <Register setUserId={setUserId} />
            )}
          </Route>

          {/* Course registration page */}
          <Route path="/account_setup">
            {userInfo.uid ? (
              <Box
                sx={{
                  display: 'flex',
                  minHeight: `calc(100vh - 65px)`,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  mb: 5,
                }}
              >
                <CourseSelection showName={true} />
              </Box>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          {/* Edit selected courses page */}
          <Route path="/edit_courses">
            {userInfo.uid ? (
              <Box
                sx={{
                  display: 'flex',
                  minHeight: `calc(100vh - 65px)`,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  mb: 5,
                }}
              >
                <CourseSelection />
              </Box>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          {/* Password reset page */}
          <Route path="/password_reset">
            <PasswordReset />
          </Route>

          {/* Page not found */}
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>

      </Router>
    </ThemeProvider>
  )
}

export default AppContainer
