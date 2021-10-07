import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { TextField, Button, Stack } from "@mui/material"
import { setUserData } from '../db'

/*
 * This is the component that provides the login function.
 * TODO: Password reset, register button, styling, redirect to homepage on login
 */
const Login = (props) => {
    var uid = null;

    // Component state
    const [inputText, setInputText] = useState({
        email: "",
        password: "",
    })

    // Event handler for user input
    const handleInputChange = event => {
        setInputText({
            ...inputText,
            [event.target.name]: event.target.value,
        })
    }

    // Event handler for clicking on the login button
    const handleLoginButton = async event => {
        event.preventDefault();
        await signIn(inputText.email, inputText.password);
        props.setUserProp(uid);
        await setUserData(uid);
        window.location.href = '/';
    }

    // Event handler for clicking on the register button
    const handleRegisterButton = event => {
        event.preventDefault();
        window.location.href = '/register';
    }

    // Firebase related function that sends user credentials to the database
    async function signIn(email, password) {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                uid = userCredential.user.uid;
            })
            .catch((error) => {
                // Error signing in
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + ": " + errorMessage)
                return null;
            });
    }

    return (
        <Stack className="login" spacing={2}>
            <h3>Sign in</h3>

            <TextField
                type="text"
                onChange={handleInputChange}
                label="Email"
                variant="outlined"
                name="email"
                required
            />

            <TextField
                type="password"
                onChange={handleInputChange}
                label="Password"
                variant="outlined"
                name="password"
                required
            />

            <Button onClick={handleLoginButton} variant="contained">Login</Button>
            <Button onClick={handleRegisterButton} variant="contained">Register</Button>
        </Stack>
    )
}

export default Login