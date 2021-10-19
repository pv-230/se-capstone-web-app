import React, { useState } from "react"
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, OAuthProvider } from "firebase/auth"
import { TextField, Button, Stack, Typography, Card, Tooltip } from "@mui/material"
import { buttonStyle } from "../styles"
import { IconButton } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

/*
 * This is the component that provides the login functionality
 */
const Login = (props) => {
  var uid = null;  // Stores a UID returned from Firebase

  // This object just holds some strings that are reused for display error messages
  const customErrorCodes = {
    noEmail: "Please enter an email",
    noPassword: "Please enter a password"
  }

  // Form state
  const [inputText, setInputText] = useState({
    email: "",
    password: ""
  })

  // Error state
  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
    otherError: false,
    message: ""
  });

  // Event handler for user input inside the fields
  const handleInputChange = event => {
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    });
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
      window.location.href = "/";
    }
  }

  // Event handler for clicking on the register button
  const handleRegisterButton = () => {
    window.location.href = "/register";
  }

  // Event handler for clicking on the password reset link
  const handleForgotPassword = () => {
    window.location.href = "/password_reset"
  }

  // Event handler for using Google authentication
  const handleGoogleAuth = async () => {
    const auth = getAuth();
    await signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        uid = user.uid;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        checkErrorCodes(error.code);
        console.log(errorMessage);
        // ...
      });
    
    // Redirects to homepage if user has been validated since uid will be null otherwise
    if (uid) {
      props.setUserId(uid);
      window.location.href = "/";
    }
  }

  // CURRENTLY NOT WORKING FOR SOME REASON
  const handleGitHubAuth = async () => {
    const auth = getAuth();
    await signInWithPopup(auth, new GithubAuthProvider())
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        uid = user.uid;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        checkErrorCodes(error.code);
        console.log(errorMessage);
        // ...
      });

    // Redirects to homepage if user has been validated since uid will be null otherwise
    if (uid) {
      props.setUserId(uid);
      window.location.href = "/";
    }
  }

  const handleYahooAuth = async () => {
    const auth = getAuth();
    await signInWithPopup(auth, new OAuthProvider("yahoo.com"))
    .then((result) => {
      // IdP data available in result.additionalUserInfo.profile
      // ...
      uid = result.user.uid;
    })
    .catch((error) => {
      console.log(error);
      checkErrorCodes(error.code);
      // Handle error.
    });
    // Redirects to homepage if user has been validated since uid will be null otherwise
    if (uid) {
      props.setUserId(uid);
      window.location.href = "/";
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
      case "auth/invalid-email":
        errorCode = processErrorString(errorCode);
        emailErrorReceived = true;
        break;
      case "auth/user-disabled":
        errorCode = processErrorString(errorCode);
        emailErrorReceived = true;
        break;
      case "auth/user-not-found":
        errorCode = processErrorString(errorCode);
        emailErrorReceived = true;
        break;
      case "auth/wrong-password":
        errorCode = processErrorString(errorCode);
        passwordErrorReceived = true;
        break;
      case "auth/account-exists-with-different-credential":
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

  const processErrorString = (errorString) => {
    let withoutAuth = errorString.slice(5);
    let withoutDash = withoutAuth.replace("-", " ");
    return withoutDash;
  }

  return (
    <Card className="loginCard" sx={{ width: 300 }} elevation={8}>
      <Stack spacing={2} margin={3}>
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

        <Button onClick={handleForgotPassword}>
          Forgot your password?
        </Button>

        {errors.otherError ?
          <Typography className="loginError" color="red">
            Error: {errors.message}
          </Typography>
          :
          null
        }

        <Button onClick={handleLoginButton} variant="contained" style={buttonStyle}>
          Login
        </Button>
        <Button onClick={handleRegisterButton} variant="contained" style={buttonStyle}>
          Register
        </Button>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Tooltip title="Sign in with Google">
            <IconButton onClick={handleGoogleAuth}>
              <GoogleIcon></GoogleIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Sign in with GitHub">
            <IconButton onClick={handleGitHubAuth}>
              <GitHubIcon></GitHubIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Sign in with Yahoo">
            <IconButton onClick={handleYahooAuth}>
              <EmailIcon></EmailIcon>
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Card>
  )
}

export default Login