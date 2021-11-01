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
import { globalDarkTheme } from '../styles/GlobalTheme';

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

  // Nav menu related
  const [navMenuAnchor, setNavMenuAnchor] = useState(null);
  const navMenuOpen = Boolean(navMenuAnchor);

  // Event handler for the home nav menu item
  const handleNavHome = () => {
    setNavMenuAnchor(null);
    history.push('/');
  }

  return (
    <>
      {/* The extra Toolbar that is not nested inside the AppBar component is used to help center
        our content vertically within the space that is immediately below the AppBar. This is
        helpful because the AppBar is set to a "fixed" position and this means that the AppBar
        itself does not effect the layout of other components. */}
      <Toolbar sx={{ minHeight: 65 }}></Toolbar>
      <AppBar enableColorOnDark={true} position="fixed">
        <Toolbar sx={{ minHeight: 65 }}>

          {/* Nav menu */}
          <IconButton
            edge="start"
            sx={{ mr: 1 }}
            onClick={(e) => setNavMenuAnchor(e.currentTarget)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Menu
            anchorEl={navMenuAnchor}
            open={navMenuOpen}
            onClose={() => setNavMenuAnchor(null)}
          >
            <MenuItem onClick={handleNavHome}>Home</MenuItem>
            <MenuItem>Course selection</MenuItem>
          </Menu>

          {/* Navbar text */}
          <Typography
            variant="h4"
            sx={{ flexGrow: 1 }}
          >
            {props.title}
          </Typography>

          {/* Light/dark mode switch */}
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  onClick={() => props.toggleThemeMode()}
                  color="default"
                />
              }
              label={props.currentThemeMode === globalDarkTheme ? 'Dark' : 'Light'} />
          </FormGroup>

          {/* Account menu */}
          <IconButton
            edge="end"
            onClick={(e) => setAccMenuAnchor(e.currentTarget)}
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <Menu
            anchorEl={accMenuAnchor}
            open={accMenuOpen}
            onClose={() => setAccMenuAnchor(null)}
          >
            <MenuItem>Account settings</MenuItem>
            <MenuItem onClick={handleAccLogout}>Logout</MenuItem>
          </Menu>

        </Toolbar>
      </AppBar>
    </>
  )
}

export default NavBar
