import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

/**
 * This is the component that handles the password reset functionality
 */
const PasswordReset = () => {
  const history = useHistory();

  const customErrorCodes = {
    noEmail: 'Please enter your email'
  }

  // Form state
  const [inputText, setInputText] = useState({
    email: '',
  });

  // Error state
  const [errors, setErrors] = useState({
    emailError: false,
    resetError: false,
    message: ''
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

  // Event handler for when the user presses the enter key inside of a text field
  const handleEnterKey = event => {
    if (event.key === 'Enter') {
      handleResetButton();
    }
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
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      <Paper elevation={8} sx={{ width: 300 }}>
        <Stack spacing={2} margin={3}>
          <Typography variant="h4">Password Reset</Typography>

          {/* Email field */}
          <TextField
            type="text"
            onChange={handleInputChange}
            onKeyDown={handleEnterKey}
            label="Email"
            variant="outlined"
            name="email"
            color="secondary"
            required
            error={errors.emailError}
            helperText={errors.emailError ? errors.message : ''}
          />

          {/* Send reset link button */}
          <Button variant="contained" onClick={handleResetButton}>
            Send reset link
          </Button>

          {/* Return to login button */}
          <Button variant="contained" onClick={() => history.goBack()}>
            Return
          </Button>

          {/* Message that shows when errors are received */}
          {errors.resetError ?
            <Typography color="red">
              Error: {errors.message}
            </Typography>
            :
            null
          }

          {/* Message that shows when the reset link has been sent */}
          {linkSent ?
            <Typography>
              Reset link sent!
            </Typography>
            :
            null
          }

        </Stack>
      </Paper>
    </Box>
  )
}

export default PasswordReset
