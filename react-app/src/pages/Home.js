import React from 'react'
import { setUserData } from '../APIs/setUserData';
import { getUserData } from '../APIs/getUserData';
import { Button, Stack } from '@mui/material';

/*
 * This is the page that houses all components needed in the home page.
 */
const Home = (props) => {
  if (props.uidProp !== null) {
    return (
      <div>
        <h1 >Home Page</h1>
        <Stack spacing={2}>
          <Button variant="contained" onClick={() => setUserData()}>Set User Data</Button>
          <Button variant="contained" onClick={() => getUserData()}>Get User Data</Button>
        </Stack>
      </div>);
  } else {
    window.location.href = '/login'
    return <></>
  }
}

export default Home