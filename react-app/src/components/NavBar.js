import React from 'react'
import { AppBar, Typography, Toolbar } from '@material-ui/core'

const NavBar = () => {
  return (
    <div>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Navbar Header
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
