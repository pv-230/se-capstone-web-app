import React from 'react'
import { useHistory } from 'react-router-dom'
import { Stack, Card, Box, Typography, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { getAuth, onAuthStateChanged, updatePassword, signOut} from 'firebase/auth'
import '../styles/AccountSettings.css'
import { getUserData } from '../APIs/getUserData';
import { UserData } from '../models/UserData'
import { setUserData } from '../APIs/setUserData'


let auth = null;
let userD = null;
let selectedClasses = [];
let notSelectedClasses = [];


const AccountSettings = (props) => {
  const history = useHistory();

 

  // States
  const [inputText, setInputText] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState({
    firstNameError: false,
    lastNameError: false,
    passwordError: false,
    confirmPasswordError: false
  });

  const handleInputChange = event => {
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    });
  }

  const handleChangeName = async () => {
    userD = await getUserData(auth.currentUser.uid);
    changeName()
  }

  const handlePasswordButton = async () => {
    userD = await getUserData(auth.currentUser.uid);
    changePass()
  }

  const [name, setName] = useState("")

  const checkAuth = async () => {
    auth = getAuth();
    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        userD = await getUserData(auth.currentUser.uid);
        if (userD) {
          updateName(userD);

        } else {
          history.push('/account_setup');
        }
      } else {
        history.push('/login');
      }
    });
  }

  checkAuth();


  const updateName = (userData) => {
    setName(userData.firstName + " " + userData.lastName);
  }

  // Functions

  async function changeName() {
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
      const email = auth.currentUser.email;
      let userTemp = getUserData(auth.currentUser.uid);

      selectedClasses = (await userTemp).completedClasses;
      notSelectedClasses = (await userTemp).outstandingClasses;
      let percent = (await userTemp).percentDone;
      let userD = new UserData(
        inputText.firstName,
        inputText.lastName,
        email,
        selectedClasses,
        notSelectedClasses,
        percent
      );
      await setUserData(userD, auth.currentUser.uid);
    }
  }

  async function changePass() {
    const auth = getAuth();
    if (inputText.confirmPassword === inputText.password && inputText.password !== '') {
      await updatePassword(auth.currentUser, inputText.password)
      .then((userCredential) => { 
        const auth = getAuth();
        props.setUserId(null);
        signOut(auth);
        history.push('/login');
      })
      .catch((error) => {
        // Error registering account
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          setErrors({
            ...errors,
            emailError: true,
            passwordError: false,
            otherError: false,
            message: 'Invalid email'
          });
        }
        else if (errorCode === 'auth/email-already-in-use') {
          setErrors({
            ...errors,
            emailError: true,
            passwordError: false,
            otherError: false,
            message: 'Email already in use'
          });
        }
        else if (errorCode === 'auth/operation-not-allowed') {
          setErrors({
            ...errors,
            emailError: false,
            passwordError: false,
            otherError: true,
            message: 'Operation not allowed'
          });
        }
        else if (errorCode === 'auth/weak-password') {
          setErrors({
            ...errors,
            emailError: false,
            passwordError: true,
            otherError: false,
            message: 'Weak password'
          });
        } else {
          setErrors({
            ...errors,
            emailError: false,
            passwordError: false,
            otherError: true,
            message: errorCode
          });
        }
      });
  }
  else {
    setErrors({
      ...errors,
      emailError: false,
      passwordError: true,
      otherError: false,
      message: 'Passwords do not match'
    });
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
            <Typography variant="h4">Update your information</Typography>
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
            <Button variant="contained" onClick={handleChangeName}>
              Submit name change
            </Button>

            <Typography variant="h4">Change your password</Typography>
            
            {/* Password field */}
          <TextField
            type="password"
            onChange={handleInputChange}
            label="Password"
            variant="outlined"
            name="password"
            color="secondary"
            required
            error={errors.passwordError}
            helperText={errors.passwordError ? errors.message : ''}
          />

          {/* Confirm password field */}
          <TextField
            type="password"
            onChange={handleInputChange}
            label="Confirm Password"
            variant="outlined"
            name="confirmPassword"
            color="secondary"
            required
            error={errors.passwordError}
            helperText={errors.passwordError ? errors.message : ''}
          />
            
            <Button variant="contained" onClick={handlePasswordButton}>
              Submit password change
            </Button>
           
             <Button color="secondary" variant="text" onClick={() => history.push('/edit_courses')}>
              Would you like to change your Completed Classes?
            </Button>
          </Stack>
        </Box>
      </Card>
    </Card>
    
  )
}

export default AccountSettings