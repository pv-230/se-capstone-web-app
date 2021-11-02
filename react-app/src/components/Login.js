import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, OAuthProvider } from 'firebase/auth'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

/**
 * This is the component that provides the login functionality
 */
const Login = (props) => {
  const history = useHistory();
  let uid = null;  // Stores a UID returned from Firebase

  // This object just holds some strings that are reused for display error messages
  const customErrorCodes = {
    noEmail: 'Please enter an email',
    noPassword: 'Please enter a password'
  }

  // Form state
  const [inputText, setInputText] = useState({
    email: '',
    password: ''
  })

  // Error state
  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
    otherError: false,
    message: ''
  });

  // Event handler for user input inside the fields
  const handleInputChange = event => {
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    });
  }

  // Event handler for when the user presses the enter key inside of a text field
  const handleEnterKey = event => {
    if (event.key === 'Enter') {
      handleLoginButton();
    }
  }

  // Event handler for clicking on the login button
  const handleLoginButton = async () => {
    // Attempts to sign in using user credentials
    if (!inputText.email) {
      checkErrorCodes(customErrorCodes.noEmail);
    } else if (!inputText.password) {
      checkErrorCodes(customErrorCodes.noPassword);
    } else {
      await signIn(inputText.email, inputText.password);
    }

    // Redirects to homepage if user has been validated since uid will be null otherwise
    if (uid) {
      props.setUserId(uid);
      history.push('/');
    }
  }

  // Event handler for using Google authentication
  const handleGoogleAuth = async () => {
    const auth = getAuth();
    await signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        uid = user.uid;
      }).catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        checkErrorCodes(error.code);
        console.log(errorMessage);
      });

    // Redirects to homepage if user has been validated since uid will be null otherwise
    if (uid) {
      props.setUserId(uid);
      history.push('/');
    }
  }

  // Event handler for using GitHub authentication
  const handleGitHubAuth = async () => {
    const auth = getAuth();
    await signInWithPopup(auth, new GithubAuthProvider())
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        uid = user.uid;
      }).catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        checkErrorCodes(error.code);
        console.log(errorMessage);
      });

    // Redirects to homepage if user has been validated since uid will be null otherwise
    if (uid) {
      props.setUserId(uid);
      history.push('/');
    }
  }

  // Event handler for using Yahoo authentication
  const handleYahooAuth = async () => {
    const auth = getAuth();
    await signInWithPopup(auth, new OAuthProvider('yahoo.com'))
      .then((result) => {
        uid = result.user.uid;
      })
      .catch((error) => {
        // Handle error.
        console.log(error);
        checkErrorCodes(error.code);
      });

    // Redirects to homepage if user has been validated since uid will be null otherwise
    if (uid) {
      props.setUserId(uid);
      history.push('/');
    }
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
      case customErrorCodes.noEmail:
        emailErrorReceived = true;
        break;
      case customErrorCodes.noPassword:
        passwordErrorReceived = true;
        break;
      case 'auth/invalid-email':
        errorCode = processErrorString(errorCode);
        emailErrorReceived = true;
        break;
      case 'auth/user-disabled':
        errorCode = processErrorString(errorCode);
        emailErrorReceived = true;
        break;
      case 'auth/user-not-found':
        errorCode = processErrorString(errorCode);
        emailErrorReceived = true;
        break;
      case 'auth/wrong-password':
        errorCode = processErrorString(errorCode);
        passwordErrorReceived = true;
        break;
      case 'auth/account-exists-with-different-credential':
        errorCode = processErrorString(errorCode);
        otherErrorReceived = true;
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

  // Accepts a string and removes the error prefix of 'auth/' and replaces dashes with spaces
  const processErrorString = (errorString) => {
    let withoutAuth = errorString.slice(5);
    let withoutDash = withoutAuth.replace('-', ' ');
    return withoutDash;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Paper elevation={8} sx={{ width: 300 }}>
        <Stack spacing={2} margin={3}>
          <Typography variant="h4">Welcome!</Typography>

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

          {/* Password field */}
          <TextField
            type="password"
            onChange={handleInputChange}
            onKeyDown={handleEnterKey}
            label="Password"
            variant="outlined"
            name="password"
            color="secondary"
            required
            error={errors.passwordError}
            helperText={errors.passwordError ? errors.message : ''}
          />

          {/* Forgot password button */}
          <Button color="secondary" variant="text" onClick={() => history.push('/password_reset')}>
            Forgot your password?
          </Button>

          {/* Message that shows when other errors are received */}
          {errors.otherError ?
            <Typography color="red">
              Error: {errors.message}
            </Typography>
            :
            null
          }

          {/* Login and register buttons */}
          <Button variant="contained" onClick={handleLoginButton}>
            Login
          </Button>
          <Button variant="contained" onClick={() => history.push('/register')}>
            Register
          </Button>

          {/* Login providers */}
          <Stack sx={{ justifyContent: 'center' }} direction="row" spacing={2}>
            <Tooltip title="Sign in with Google">
              <IconButton onClick={handleGoogleAuth}>
                <GoogleIcon color="secondary"></GoogleIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Sign in with GitHub">
              <IconButton onClick={handleGitHubAuth}>
                <GitHubIcon color="secondary"></GitHubIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Sign in with Yahoo">
              <IconButton onClick={handleYahooAuth}>
                <EmailIcon color="secondary"></EmailIcon>
              </IconButton>
            </Tooltip>
          </Stack>

        </Stack>
      </Paper>
    </Box>
  )
}

export default Login
