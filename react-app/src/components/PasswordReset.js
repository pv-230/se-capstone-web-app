import React, { useState } from 'react'
// import { getAuth, sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth"
import { TextField, Button, Stack, Typography } from "@mui/material"

/*
 * This is the component that handles the password reset functionality
 * TODO: There is a bug with the email field value carrying over to the code field.
 *       Make a code verification page to fix this.
 * TODO: Add redirection to login page here
 */
const PasswordReset = () => {
  const customErrorCodes = {
    noEmail: "Please enter your email"
  }

  // Form state
  const [inputText, setInputText] = useState({
    email: "",
    code: ""
  });

  // Error state
  const [errors, setErrors] = useState({
    emailError: false,
    otherError: false,
    message: ""
  });

  // State to determine if the user has sent a reset email or not
  const [waitingForCode, setWaitingForCode] = useState(false);

  // Event handler for user input inside the forms
  const handleInputChange = event => {
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    })
  }

  // Event handler for the reset button
  const handleResetButton = async () => {
    // Attempts to sign in using user credentials
    if (!inputText.email) {
      checkErrorCodes(customErrorCodes.noEmail);  // Empty email field
    } else {
      console.log("sending reset link to: " + inputText.email);
      // const auth = getAuth();
      // await sendPasswordResetEmail(auth, inputText.email);
      setWaitingForCode(true);
    }
  }

  // Event handler for the confirm button
  const handleConfirmButton = () => {
    console.log("user confirmed code: " + inputText.code);

    // Add redirection to login page here
  }

  // Checks the errorCode parameter and updates the error states if there is a valid error code
  const checkErrorCodes = (errorCode) => {
    if (!errorCode) {
      return;  // No error code received
    }

    // Booleans that are set based on the types of error codes that firebase returns
    let emailErrorReceived = false;
    let otherErrorReceived = false;

    // Determines which errors was received and sets the appropriate bools
    switch (errorCode) {
      case customErrorCodes.noEmail:
        emailErrorReceived = true;
        break;
      default:
        otherErrorReceived = true;
    }

    // Updates the error state
    setErrors({
      ...errors,
      emailError: emailErrorReceived,
      otherError: otherErrorReceived,
      message: errorCode
    });
  }

  return (
    <div>
      {waitingForCode ?
        <Stack className="reset" spacing={2}>
          <Typography variant="h4">Enter code</Typography>
          <TextField
            type="text"
            onChange={handleInputChange}
            label="Verification code"
            variant="outlined"
            name="code"
            required
          />
          <Button onClick={handleConfirmButton} variant="contained">Confirm</Button>
        </Stack>
        :
        <Stack className="reset" spacing={2}>
          <Typography variant="h4">Enter email</Typography>
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
          <Button onClick={handleResetButton} variant="contained">Reset</Button>
        </Stack>
      }
    </div>
  )
}

export default PasswordReset