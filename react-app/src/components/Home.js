import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUserData } from '../APIs/getUserData';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'

/*
 * This is the page that houses all components needed in the home page.
*/
const Home = (props) => {
  const history = useHistory();

  const [name, setName] = useState('')

  // This effect causes firebase to watch for changes to the user's authentication and redirect
  // to login if user is not authenticated
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // TODO: Check local storage for existing name before calling getUserData
        let userData = await getUserData(props.uid);
        setName(userData.firstName + ' ' + userData.lastName);
      } else {
        props.setUserId(null);
        history.push('/login');
      }
    });
  })

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: `calc(100vh - 65px)`,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      {name === '' ? (
        null
      ) : (
        <>
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 250,
              width: 'calc(100vw - 100px)',
              mt: 5,
            }}>
            <Typography>
              Hello, {name}!
            </Typography>
          </Paper>
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 250,
              width: 'calc(100vw - 100px)',
              mt: 5,
            }}>
            <Typography>
              Content example 1
            </Typography>
          </Paper>
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 250,
              width: 'calc(100vw - 100px)',
              mt: 5,
            }}>
            <Typography>
              Content example 2
            </Typography>
          </Paper>
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 500,
              width: 'calc(100vw - 100px)',
              my: 5,
            }}>
            <Typography>
              Content example 3 (longer)
            </Typography>
          </Paper>
        </>
      )}
    </Box>
  )
}

export default Home