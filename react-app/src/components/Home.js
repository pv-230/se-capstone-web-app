import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUserData } from '../APIs/getUserData';
import Box from '@mui/material/Box'
import CourseSelection from './CourseSelection';
import DegreeProgress from './DegreeProgress';

/**
 * This is the component that provides the main features of the application
 */
const Home = (props) => {
  const history = useHistory();
  const [name, setName] = useState('');

  // Updates the name state by retrieving the user's name from local storage or from the database
  // if the name does not exist in local storage.
  const updateName = async () => {
    let firstName = JSON.parse(localStorage.getItem('firstName'));
    let lastName = JSON.parse(localStorage.getItem('lastName'));

    if (!firstName || !lastName) {
      // Name is not in local storage
      const userData = await getUserData(props.uid);
      if (userData) {
        localStorage.setItem('firstName', JSON.stringify(userData.firstName));
        localStorage.setItem('lastName', JSON.stringify(userData.lastName));
        setName(userData.firstName + ' ' + userData.lastName);
      }
      else if(firstName === null || lastName === null) {
        history.push('/account_setup');
      }
    } else {
      // Updates the name state with local storage contents
      setName(firstName + ' ' + lastName);
    }
  };

  // This effect causes firebase to watch for changes to the user's authentication and redirects
  // to login if user is not authenticated. Also updates the name state with updateName().
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        props.setNavTitle('Home');
        updateName();
      } else {
        props.setUserId(null);
        history.push('/login');
      }
    });
  });

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
      {!name ? (
        null
      ) : (
        <>
          <DegreeProgress uid={props.uid} />
          <CourseSelection disable={true} hideTitle={true} />
        </>
      )}
    </Box>
  )
}

export default Home
