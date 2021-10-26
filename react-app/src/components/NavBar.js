import React, { useState } from 'react'
import { useHistory } from 'react-router'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { getAuth, signOut } from 'firebase/auth'

const NavBar = (props) => {
  const history = useHistory();
  const auth = getAuth();

  // Account menu related
  const [accMenuAnchor, setAccMenuAnchor] = useState(null);
  const accMenuOpen = Boolean(accMenuAnchor);

  // Event handler for the account settings menu item
  const handleAccSettings = () => {
    // Not used until account settings component is built
  }

  // Event handler for the logout menu item
  const handleAccLogout = () => {
    setAccMenuAnchor(null);
    signOut(auth);
  }

  // Nav menu related
  const [navMenuAnchor, setNavMenuAnchor] = useState(null);
  const navMenuOpen = Boolean(navMenuAnchor);
  
  // Event handler for the home nav menu item
  const handleNavHome = () => {
    setNavMenuAnchor(null);
    history.push("/");
  }

  // Event handler for the course selection nav menu item
  const handleNavCourseSelection = () => {
    // Not used until course selection component is built
  }

  return (
    <AppBar enableColorOnDark="true" position="static">
      <Toolbar>

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
  )
}

export default NavBar
