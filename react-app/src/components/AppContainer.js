import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import { globalDarkTheme, globalLightTheme } from '../styles/GlobalTheme';
import { CssBaseline } from '@mui/material';

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
  
  // Returns the saved theme mode from local storage
  const getUserTheme = () => {
    const savedTheme = localStorage.getItem("themeMode");

    if (savedTheme === "light") {
      return globalLightTheme;
    } else {
      // If themeMode not found in local storage, dark mode is set by default
      return globalDarkTheme;
    }
  }

  // State for the theme mode (light or dark)
  const [themeMode, setThemeMode] = useState(getUserTheme());

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
      savedTheme = "light";
    } else {
      savedTheme = "dark";
    }
    localStorage.setItem("themeMode", savedTheme);
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
            <AccountSetup />
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

<<<<<<< HEAD
    return (
        <div className="app-container">
            <CssBaseLine />
            <Router>
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
=======
        </Switch>
      </Router>
    </ThemeProvider>
  )
>>>>>>> 6b25b95ebab34e2a2d82a906cb20bc4b2fe930b8
}

export default AppContainer