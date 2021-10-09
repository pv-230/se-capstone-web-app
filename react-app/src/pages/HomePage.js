import React from 'react'
import { setUserData } from '../APIs/setUserData';
import { getUserData } from '../APIs/getUserData';
import { Button, Stack } from '@mui/material';

/*
 * This is the page that houses all components needed in the home page.
 */
const HomePage = (props) => {
  if (props.uid === null) {
    // Checks to see if the user is logged and redirects to login page if not
    window.location.href = '/login';
    return null;
  }

  return (
    <div>
      <h1>Home Page</h1>
      <Stack spacing={2}>
          <Button variant="contained" onClick={() => setUserData()}>Set User Data</Button>
          <Button variant="contained" onClick={() => getUserData()}>Get User Data</Button>
        </Stack>
    </div>
  )
}

export default HomePage