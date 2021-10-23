import React from 'react'
import { useEffect } from 'react'
import CardButton from '../components/CardButton'
import CourseSelection from './CourseSelection'
import { Stack, Grid, Card, Box, Typography, Button, TextField } from '@mui/material'
import { ClassInfo } from '../models/ClassInfo'
import { useState } from 'react'
import { UserData } from '../models/UserData'
import { setUserData } from '../APIs/setUserData'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import '../styles/AccountSetup.css'

let selectedClasses = [];
let classInfo = new ClassInfo();
let notSelectedClasses = classInfo.classCodes;
let auth = null;

const AccountSetup = () => {
  // States
  const [inputText, setInputText] = useState({
    firstName: "",
    lastName: ""
  })

  const [errors, setErrors] = useState({
    firstNameError: false,
    lastNameError: false,
  });

  const handleInputChange = event => {
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
      } else {
        // If they are logged out, redirects to login
        window.location.href = '/login';
      }
    });
  }, [])

  // Functions
  async function setupAccount() {
    // Checks for valid names
    if (inputText.firstName.length < 1 && inputText.lastName.length < 1)
      setErrors({ ...errors, firstNameError: true, lastNameError: true });
    else if (inputText.firstName.length < 1)
      setErrors({ ...errors, firstNameError: true, lastNameError: false });
    else if (inputText.lastName.length < 1)
      setErrors({ ...errors, lastNameError: true, firstNameError: false });
    else
      setErrors({ ...errors, firstNameError: false, lastNameError: false });

    if (inputText.firstName.length < 1 || inputText.lastName.length < 1)
      window.scrollTo(0, 0);
    else {
      // Creates and send their data to the database
      const email = auth.currentUser.email;
      let userD = new UserData(
        inputText.firstName,
        inputText.lastName,
        email,
        selectedClasses,
        notSelectedClasses
      );
      await setUserData(userD, auth.currentUser.uid);
      window.location.href = '/';
    }
  }

  function createCards() {
    let classCards = []
    for (let i = 0; i < classInfo.classCodes.length; i++) {
      classCards.push(
        <Grid item>
          <CardButton classCode={classInfo.classCodes[i]} className={classInfo.classNames[i]} update={updateClicked} />
        </Grid>
      );
    }
    return classCards;
  }

  function updateClicked(classCode) {
    let pos = selectedClasses.indexOf(classCode);
    let nsPos = notSelectedClasses.indexOf(classCode);
    if (pos === -1) {
      selectedClasses.push(classCode);
      notSelectedClasses.splice(nsPos, 1);
    }
    else {
      notSelectedClasses.push(classCode);
      selectedClasses.splice(pos, 1);
    }
    console.log(selectedClasses);
    console.log(notSelectedClasses);
  }

  // Temporarily in here to test logout
  function fbSignOut() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <Card className="acc-setup-card" elevation={8}>
      <Card className="acc-setup-card" elevation={4}>
        <Stack className="acc-setup-stack" spacing={3}>
          <Typography variant="h2">Enter your first and last name</Typography>
          <TextField
            type="text"
            onChange={handleInputChange}
            label="First Name"
            variant="outlined"
            name="firstName"
            color="secondary"
            required
            error={errors.firstNameError}
            helperText={errors.firstNameError ? "Please enter your first name" : ""}
          />

          <TextField
            type="text"
            onChange={handleInputChange}
            label="Last Name"
            variant="outlined"
            name="lastName"
            color="secondary"
            required
            error={errors.lastNameError}
            helperText={errors.lastNameError ? "Please enter your last name" : ""}
          />
        </Stack>
      </Card>

      <CourseSelection></CourseSelection>
      
    </Card>
  )
}

// Old code
/*<Card className="acc-setup-card" elevation={4}>
  <Box m={5}>
    <Stack className="acc-setup-stack" spacing={3}>
      <Typography variant="h2">Select the classes that you have taken or are taking</Typography>
      <Grid container justifyContent="space-evenly" rowSpacing={2} spacing={2}>
        {createCards()}
      </Grid>
      <Button className="gradient-button" variant="contained" onClick={setupAccount}>Submit</Button>
      <Button className="gradient-button" variant="contained" onClick={fbSignOut}>Sign Out</Button>
    </Stack>
  </Box>
</Card>*/

export default AccountSetup