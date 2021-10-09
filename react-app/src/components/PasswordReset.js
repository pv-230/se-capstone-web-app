import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { TextField, Button, Stack, Typography, Card } from "@mui/material"

/*
 * This is the component that handles the password reset functionality
 */
const PasswordReset = () => {
  const customErrorCodes = {
    noEmail: "Please enter your email"
  }

  // Form state
  const [inputText, setInputText] = useState({
    email: "",
  });

  // Error state
  const [errors, setErrors] = useState({
    emailError: false,
    resetError: false,
    message: ""
  });

  // Link sent state
  const [linkSent, setLinkSent] = useState(false);

  // Event handler for user input inside the forms
  const handleInputChange = event => {
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    });
  }

  // Event handler for the reset button
  const handleResetButton = async () => {
    // Attempts to sign in using user credentials
    if (!inputText.email) {
      checkErrorCodes(customErrorCodes.noEmail);  // Empty email field
    } else {
      await sendResetLink();
    }
  }

  const handleRedirectButton = () => {
    window.location.href = "/login";
  }

  const sendResetLink = async () => {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, inputText.email)
      .then(() => {
        // Password reset email sent!
        setLinkSent(true);
      })
      .catch((error) => {
        checkErrorCodes(error.code);
      });
  }

  // Checks the errorCode parameter and updates the error states if there is a valid error code
  const checkErrorCodes = (errorCode) => {
    if (!errorCode) {
      return;  // No error code received
    }

    let emailErrorReceived = false;
    let resetErrorReceived = false;

    // Checks to see if an email input error was received
    switch (errorCode) {
      case customErrorCodes.noEmail:
        emailErrorReceived = true;
        break;
      default:
        resetErrorReceived = true;
    }

    // Updates the error state
    setErrors({
      ...errors,
      emailError: emailErrorReceived,
      resetError: resetErrorReceived,
      message: errorCode
    });
  }

  return (
    <Card sx={{ width: 300 }}>
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

        <Button onClick={handleResetButton} variant="contained">Send reset link</Button>

        <Button variant="contained" onClick={handleRedirectButton}>
          Return to login
        </Button>

        {errors.resetError ?
          <Typography color="red">
            Error: {errors.message}
          </Typography>
          :
          null
        }

        {linkSent ?
          <Typography>
            Please check your email
          </Typography>
          :
          null
        }

      </Stack>
    </Card>
  )
}

export default PasswordReset