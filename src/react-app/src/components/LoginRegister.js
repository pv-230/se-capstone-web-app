import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { TextField, Button, Stack } from "@mui/material"

export let uid = null;

/*
 * This is the component that provides the login function.
 * TODO: Password reset, register button, styling, redirect to homepage on login
 */
const LoginRegister = props => {
    // Component state
    const [inputText, setInputText] = useState({
        username: "",
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
    const handleLoginButton = event => {
        event.preventDefault()
        signIn(inputText.username, inputText.password)
    }

    // Firebase related function that sends user credentials to the database
    const signIn = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                uid = userCredential.uid;
                console.log(uid.toString())
            })
            .catch((error) => {
                // Error signing in
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + ": " + errorMessage)
            });
    }

    return (
        <Stack className="login" spacing={2}>
            <h3>Sign in</h3>

            <TextField
                type="text"
                onChange={handleInputChange}
                label="Username"
                variant="outlined"
                name="username"
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
        </Stack>
    )
}

export default LoginRegister