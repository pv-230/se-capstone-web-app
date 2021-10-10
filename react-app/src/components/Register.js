import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { TextField, Button, Stack, Typography, Card } from "@mui/material"
import { buttonStyle } from "../styles"

/*
 * This is the component that provides the register function.
 */
const Register = (props) => {
    var uid = null;

    // Form state
    const [inputText, setInputText] = useState({
        email: "",
        password: "",
        confirmPassword: "",
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
            props.setUser(uid);
            window.location.href = '/account_setup';
        }
    }

    // Firebase related function that sends user credentials to the database
    async function register(email, password) {
        const auth = getAuth();
        if (inputText.confirmPassword === inputText.password && inputText.password !== "") {
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
        <Card className="registerCard" sx={{ width: 300 }} elevation={8}>
            <Stack spacing={2} margin={3}>
                <Typography variant="h4">Registration</Typography>

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

                <TextField
                    type="password"
                    onChange={handleInputChange}
                    label="Confirm Password"
                    variant="outlined"
                    name="confirmPassword"
                    required
                    error={errors.passwordError}
                    helperText={errors.passwordError ? errors.message : ""}
                />

                {errors.otherError ?
                    <Typography color="red">
                        Error: {errors.message}
                    </Typography>
                    :
                    null
                }

                <Button onClick={handleRegisterButton} variant="contained" style={buttonStyle}>
                    Register
                </Button>
                <Button onClick={handleLoginButton} variant="contained" style={buttonStyle}>
                    Back to Login
                </Button>
            </Stack>
        </Card>

    )

}

export default Register