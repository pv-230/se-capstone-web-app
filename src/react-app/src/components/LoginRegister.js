import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { TextField, Button, Stack } from "@mui/material"

export let uid = null;

const LoginRegister = props => {
    const [inputText, setInputText] = useState({
        username: "",
        password: "",
    })

    const handleInputChange = event => {
        setInputText({
            ...inputText,
            [event.target.name]: event.target.value,
        })
    }

    const handleLoginButton = event => {
        event.preventDefault()
        signIn(inputText.username, inputText.password)
    }

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
        <Stack className="center" spacing={2}>
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