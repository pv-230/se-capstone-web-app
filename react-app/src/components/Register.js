import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

/**
 * This is the component that provides the register function.
 */
const Register = (props) => {
    var uid = null;

    // Form state
    const [inputText, setInputText] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    // error message state
    const [errors, setErrors] = useState({
        emailError: false,
        passwordError: false,
        otherError: false,
        message: ''
    });

    // Event handler for user input
    const handleInputChange = event => {
        setInputText({
            ...inputText,
            [event.target.name]: event.target.value,
        });
    }

    // Event handler for clicking on the login button
    const handleLoginButton = async () => {
        window.location.href = '/login';
    }

    // Event handler for clicking on the register button
    const handleRegisterButton = async () => {
        await register(inputText.email, inputText.password);
        if (uid) {
            props.setUserId(uid);
            window.location.href = '/account_setup';
        }
    }

    // Firebase related function that sends user credentials to the database
    async function register(email, password) {
        const auth = getAuth();
        if (inputText.confirmPassword === inputText.password && inputText.password !== '') {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    uid = userCredential.user.uid;
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
                            message: 'Email alright in use'
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
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        }}>
            <Paper elevation={8} sx={{ width: 300}}>
                <Stack spacing={2} margin={3}>
                    <Typography variant="h4">Registration</Typography>

                    {/* Email field */}
                    <TextField
                        type="text"
                        onChange={handleInputChange}
                        label="Email"
                        variant="outlined"
                        name="email"
                        color="secondary"
                        required
                        error={errors.emailError}
                        helperText={errors.emailError ? errors.message : ""}
                    />

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
                        helperText={errors.passwordError ? errors.message : ""}
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
                        helperText={errors.passwordError ? errors.message : ""}
                    />

                    {/* Message that shows when other errors are received */}
                    {errors.otherError ?
                        <Typography color="red">
                            Error: {errors.message}
                        </Typography>
                        :
                        null
                    }

                    {/* Login and register buttons */}
                    <Button onClick={handleRegisterButton} variant="contained">
                        Register
                    </Button>
                    <Button onClick={handleLoginButton} variant="contained">
                        Back to Login
                    </Button>

                </Stack>
            </Paper>
        </Box>
    )
}

export default Register
