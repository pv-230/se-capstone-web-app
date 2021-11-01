import React from 'react'
import { Stack, Card, Box, Typography, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { getAuth, onAuthStateChanged} from 'firebase/auth'
import '../styles/AccountSettings.css'
import { getNameData } from '../APIs/getNameData';
import { NameData } from '../models/NameData'
import { setUserData } from '../APIs/setUserData'

let auth = null;
let userD = null;

const AccountSettings = () => {
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

  const handleForgotPassword = () => {
    window.location.href = "/password_reset"
  }

  const handleChangeName= async () => {
    userD = await getNameData(auth.currentUser.uid);
    changeName()
  }

  const [name, setName] = useState("")

  const checkAuth = async () => {
    auth = getAuth();
    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        userD = await getNameData(auth.currentUser.uid);
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
    setName(userData.firstName+ " " +userData.lastName);
  }

  // Functions
 async function changeName(){
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
        let userD = new NameData(
            inputText.firstName,
            inputText.lastName,
          );
          await setUserData(userD, auth.currentUser.uid);
    }
  }

  return (
    <Card className="acc-settings-card" elevation={8}>
      <Card className="acc-settings-card" elevation={4}>
        <Stack className="acc-settings-stack" spacing={3}>
          <Typography variant="h2">{name}</Typography>
        </Stack>
      </Card>

      <Card className="acc-settings-card" elevation={4}>
        <Box m={5}>
          <Stack className="acc-settings-stack" spacing={3}>
            <Typography variant="h2">Update your information</Typography>
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
            <Button color="secondary" variant="contained" onClick={handleChangeName}>
             Submit name change
            </Button>
             <Button color="secondary" variant="text" onClick={handleForgotPassword}>
              Would you like to change your password?
            </Button>
            <Button color="secondary" variant="text">
              Would you like to change your Completed Classes?
            </Button>
          </Stack>
        </Box>
      </Card>
    </Card>
  )
}

export default AccountSettings