import React, { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { TextField, Button, Stack, Typography, Link } from "@mui/material"

/*
 * This is the component that provides the login function.
 */
const Login = (props) => {
  var uid = null;  // Stores a UID returned from Firebase

  // Form states
  const [inputText, setInputText] = useState({
    email: "",
    password: ""
  })

  // Error states
  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
    otherError: false,
    message: ""
  });

  // Event handler for user input inside the forms
  const handleInputChange = event => {
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    })
  }

  // Event handler for clicking on the login button
  const handleLoginButton = async () => {
    // Attempts to sign in using user credentials
    if (!inputText.email) {
      checkErrorCodes("Please enter an email");
    } else if (!inputText.password) {
      checkErrorCodes("Please enter a password");
    } else {
      await signIn(inputText.email, inputText.password);
    }

    // Redirects to homepage if user has been validated since uid will be null otherwise
    if (uid) {
      props.setUserId(uid);
      window.location.href = "/";
    }
  }

  // Event handler for clicking on the register button
  const handleRegisterButton = () => {
    window.location.href = "/register";
  }

  const handleForgotPassword = event => {
    window.location.href = "/password_reset"
  }

  // Firebase related function that sends user credentials to the database. If the credentials
  // are valid, then the uid gets set. Otherwise, an error message is shown.
  const signIn = async (email, password) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        uid = userCredential.user.uid;
      })
      .catch((error) => {
        // Error signing in
        checkErrorCodes(error.code);
      });
  }

  // Checks the errorCode parameter and updates the error states if there is a valid error code
  const checkErrorCodes = (errorCode) => {
    if (!errorCode) {
      return;  // No error code received
    }

    // Booleans that are set based on the types of error codes that firebase returns
    let emailErrorReceived = false;
    let passwordErrorReceived = false;
    let otherErrorReceived = false;

    // Determines which errors was received and sets the appropriate bools
    switch (errorCode) {
      case "Please enter an email":
        emailErrorReceived = true;
        break;
      case "Please enter a password":
        passwordErrorReceived = true;
        break;
      case "auth/invalid-email":
        emailErrorReceived = true;
        break;
      case "auth/user-disabled":
        emailErrorReceived = true;
        break;
      case "auth/user-not-found":
        emailErrorReceived = true;
        break;
      case "auth/wrong-password":
        passwordErrorReceived = true;
        break;
      default:
        otherErrorReceived = true;
    }

    // Updates the error state
    setErrors({
      ...errors,
      emailError: emailErrorReceived,
      passwordError: passwordErrorReceived,
      otherError: otherErrorReceived,
      message: errorCode
    });
  }

  return (
    <Stack className="login" spacing={2}>
      <Typography variant="h4">Welcome!</Typography>

      <TextField
        type="text"
        onChange={handleInputChange}
        label="Email"
        variant="outlined"
        name="email"
        required
        error={errors.emailError}
        helperText={errors.emailError ? errors.message : ""}
      />

      <TextField
        type="password"
        onChange={handleInputChange}
        label="Password"
        variant="outlined"
        name="password"
        required
        error={errors.passwordError}
        helperText={errors.passwordError ? errors.message : ""}
      />

      <Link onClick={handleForgotPassword}>
        Forgot your password?
      </Link>

      {errors.otherError ?
        <Typography className="loginError" color="red">
          Error: {errors.message}
        </Typography>
        :
        null
      }

      <Button onClick={handleLoginButton} variant="contained">Login</Button>
      <Button onClick={handleRegisterButton} variant="contained">Register</Button>
    </Stack>
  )
}

export default Login