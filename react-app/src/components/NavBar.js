import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

const NavBar = () => {
  return (
    <AppBar color="primary" position="static">
      <Toolbar>

        <IconButton
          edge="start"
          sx={{ mr: 1 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h4"
          edge="start"
          sx={{ flexGrow: 1 }}
        >
          Navbar Header
        </Typography>

        <Button variant="contained">
          Logout
        </Button>

      </Toolbar>
    </AppBar>
  )
}

export default NavBar
