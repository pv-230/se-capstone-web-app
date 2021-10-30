import React, { useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUserData } from '../APIs/getUserData';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'
import { useHistory } from 'react-router'

/*
 * This is the page that houses all components needed in the home page.
 */
const Home = () => {
  const history = useHistory();

  const [name, setName] = useState('')

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setName('John');
    } else {
      history.push('/login');
    }
  });

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: `calc(100vh - 65px)`,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {name === '' ? (
        null
      ) : (
        <Paper sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2
        }}>
          <Typography>
            Hello, {name}!
          </Typography>
        </Paper>
      )}
    </Box>
  )
}

export default Home