import React from 'react'
import { useEffect } from 'react'
import CardButton from '../components/CardButton'
import { Stack, Grid, Card, Box, Typography, Button, TextField } from '@mui/material'
import { ClassInfo } from '../models/ClassInfo'
import { useState } from 'react'
import { UserData } from '../models/UserData'
import { setUserData } from '../APIs/setUserData'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

let selectedClasses = [];
let classInfo = new ClassInfo();
let notSelectedClasses = classInfo.classCodes;
let auth = null;

// Styles
const stackStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  margin: '3%'
}

var typographyStyle = {
  "fontFamily": `"Segoe UI", "sans-serif"`,
  "fontSize": 35,
  "fontWeight": 700,
}

var style = {
  display: 'block',
  width: 'auto',
  height: 'auto',
  textAlign: 'center',
  margin: '3%'
}

var buttonStyle = {
  background: 'linear-gradient(45deg, #0057d1 30%, #0095ff 90%)',
}

const AccountSetup = () => {

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
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
          // If they are logged out, redirects to login
          window.location.href = '/login';
      }
    });
    return () => {
    }
  }, [])

  async function setupAccount() {
    if(inputText.firstName.length < 1 && inputText.lastName.length < 1)
      setErrors({...errors, firstNameError: true, lastNameError: true});
    else if(inputText.firstName.length < 1)
      setErrors({...errors, firstNameError: true, lastNameError: false});
    else if(inputText.lastName.length < 1)
      setErrors({...errors, lastNameError: true, firstNameError: false});
    else
      setErrors({...errors, firstNameError: false, lastNameError: false});

    if(inputText.firstName.length < 1 || inputText.lastName.length < 1)
      window.scrollTo(0,0);
    else {
      const email = auth.currentUser.email;
      let userD = new UserData(
        inputText.firstName, 
        inputText.lastName, 
        email, 
        selectedClasses, 
        notSelectedClasses
      );
      setUserData(userD, auth.currentUser.uid);
    }
  }

  function createCards() {
    let classCards = []
    for(let i = 0; i < classInfo.classCodes.length; i++) {
        classCards.push(
        <Grid item>
          <CardButton classCode={classInfo.classCodes[i]} className={classInfo.classNames[i]} update={updateClicked}/>
        </Grid>
        );
    }
    return classCards;
  }
  
  function updateClicked(classCode) {
    let pos = selectedClasses.indexOf(classCode);
    let nsPos = notSelectedClasses.indexOf(classCode);
    if(pos === -1) {
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

  function fbSignOut() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  
  return (
    <Card style={style} elevation={8}>
      <Card style={style}  elevation={4}>
        <Stack spacing={3} style={stackStyle}>
        <Typography style={typographyStyle}>Enter your first and last name</Typography>
          <TextField
            type="text"
            onChange={handleInputChange}
            label="First Name"
            variant="outlined"
            name="firstName"
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
            required
            error={errors.lastNameError}
            helperText={errors.lastNameError ? "Please enter your last name" : ""}
          />
        </Stack>
      </Card>
      <Card style={style}  elevation={4}>
        <Box m={5}>
          <Stack spacing={3} style={stackStyle}>
            <Typography style={typographyStyle}>Select the classes that you have taken or are taking</Typography>
            <Grid container justifyContent="space-evenly" rowSpacing={2} spacing={2}>
              {createCards()}
            </Grid>
            <Button variant="contained" style={buttonStyle} onClick={setupAccount}>Submit</Button>
            <Button variant="contained" style={buttonStyle} onClick={fbSignOut}>Sign Out</Button>
          </Stack>
        </Box>
      </Card>
    </Card>
  )
}

export default AccountSetup