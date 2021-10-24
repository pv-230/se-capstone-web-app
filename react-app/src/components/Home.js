import React from 'react'
import { useState } from 'react'
import { getUserData } from '../APIs/getUserData';
import { Stack, Typography, Card } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

/*
 * This is the page that houses all components needed in the home page.
 */
const Home = (props) => {
  let auth = null;
  let userD = null;

  const stackStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    margin: '3%'
  }

  var cardStyle = {
    display: 'block',
    width: '400px',
    height: '400px',
    textAlign: 'center',
    background: 'linear-gradient(45deg, #c4b83f 30%, #c9c167 90%)'
  }

  var textStyle = {
    "fontFamily": `"Segoe UI", "sans-serif"`,
    "fontSize": 50,
    "fontWeight": 700,
  }

  // States
  const [name, setName] = useState("")

  const checkAuth = async () => {
    auth = getAuth();
    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        userD = await getUserData(auth.currentUser.uid);
        if (userD) {
          updateName(userD);
        } else {
          window.location.href = '/account_setup';
        }
      } else {
        // If they are logged out, redirects to login
        window.location.href = '/login';
      }
    });
  }

  checkAuth();

  const updateName = (userData) => {
    setName(userData.firstName);
  }

  return (
    <Stack spacing={2} style={stackStyle}>
      <Typography color="text.primary" style={textStyle}>Welcome to the Home Page</Typography>
      <Stack>
        <Card style={cardStyle} elevation={8}>
          <Typography style={textStyle} marginTop='40%' color="white">
            Hello, {name}!
          </Typography>
        </Card>
      </Stack>
    </Stack>
  )
}

export default Home