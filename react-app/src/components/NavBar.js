import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { globalLightTheme } from '../styles/GlobalTheme';

/**
 * This is the navbar component that allows the user to navigate around the
 * the website and use features such as a light/dark mode switch.
 */
const NavBar = (props) => {
  const history = useHistory();  // Used for routing

  // Account menu related
  const [accMenuAnchor, setAccMenuAnchor] = useState(null);
  const accMenuOpen = Boolean(accMenuAnchor);

  // Event handler for the logout menu item
  const handleAccLogout = () => {
    const auth = getAuth();
    setAccMenuAnchor(null);
    props.setUserId(null);
    signOut(auth);
  }

  //Event Handler for the account settings redirect menu item
  const handleAccSettings = () => {
    setAccMenuAnchor(null);
    history.push('/account_settings');
  }

  // Nav menu related
  const [navMenuAnchor, setNavMenuAnchor] = useState(null);
  const navMenuOpen = Boolean(navMenuAnchor);

  // Event handler for the home nav menu item
  const handleNavHome = () => {
    setNavMenuAnchor(null);
    history.push('/');
  }

  // Event handler for the Course selection nav menu item
  const handleNavCourseSelection = () => {
    setNavMenuAnchor(null);
    history.push('/edit_courses');
  }

  const handleNavCourseInfo = () => {
    setNavMenuAnchor(null);
    history.push('/course_info');
  }

  return (
    <>
      {!props.navTitle ? (
        null
      ) : (
        <>
          {/* The extra Toolbar that is not nested inside the AppBar component is used to help center
          our content vertically within the space that is immediately below the AppBar. This is
          helpful because the AppBar is set to a "fixed" position and this means that the AppBar
          itself does not effect the layout of other components. */}
          <Toolbar sx={{ minHeight: 65 }}></Toolbar>
          <AppBar
            enableColorOnDark={true}
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1
            }}
          >
            <Toolbar sx={{ minHeight: 65 }}>

              {/* Nav menu */}
              <IconButton
                edge="start"
                sx={{ mr: 1 }}
                onClick={(e) => setNavMenuAnchor(e.currentTarget)}
                data-testid="navMenuButton"
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Menu
                anchorEl={navMenuAnchor}
                open={navMenuOpen}
                onClose={() => setNavMenuAnchor(null)}
              >
                <MenuItem onClick={handleNavHome}>Home</MenuItem>
                <MenuItem onClick={handleNavCourseSelection}>Course Selection</MenuItem>
                <MenuItem onClick={handleNavCourseInfo}>Course Information</MenuItem>
              </Menu>

              {/* Navbar text */}
              <Typography
                variant="h4"
                sx={{ flexGrow: 1 }}
              >
                {props.navTitle}
              </Typography>

              {/* Light/dark mode switch */}
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked
                      onClick={() => props.toggleThemeMode()}
                      color="default"
                      data-testid="themeSwitch"
                    />
                  }
                  label={props.currentThemeMode === globalLightTheme ? 'Light' : 'Dark'}
                  data-testid="themeControlLabel"
                />
              </FormGroup>

              {/* Account menu */}
              <IconButton
                edge="end"
                onClick={(e) => setAccMenuAnchor(e.currentTarget)}
                data-testid="accountMenuButton"
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
              <Menu
                anchorEl={accMenuAnchor}
                open={accMenuOpen}
                onClose={() => setAccMenuAnchor(null)}
              >
                <MenuItem onClick={handleAccSettings}>Account settings</MenuItem>
                <MenuItem onClick={handleAccLogout}>Logout</MenuItem>
              </Menu>

            </Toolbar>
          </AppBar>
        </>
      )}
    </>
  )
}

export default NavBar
