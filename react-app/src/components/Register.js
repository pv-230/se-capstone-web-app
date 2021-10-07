import React, { useState } from 'react'
import { TextField, Button, Stack } from "@mui/material"

/*
 * This is the component that provides the register function.
 * TODO: styling, redirect to homepage on login
 */
const Register = (props) => 
{
    var uid = null;

    // Component state
    const [inputText, setInputText] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
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
        window.location.href = '/login';
    }

    // Event handler for clicking on the register button
    const handleRegisterButton = event => {
        event.preventDefault();
        window.location.href = '/register';
    }


    return (
        <Stack className="register" spacing={2}>
            <h3>Create an account</h3>

            <TextField
                type="text"
                onChange={handleInputChange}
                label="First Name"
                variant="outlined"
                name="firstName"
                required
            />

            <TextField
                type="password"
                onChange={handleInputChange}
                label="Last Name"
                variant="outlined"
                name="lastName"
                required
            />
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

            <TextField
                type="text"
                onChange={handleInputChange}
                label="Confirm Password"
                variant="outlined"
                name="confirmPassword"
                required
            />

          

            <Button onClick={handleLoginButton} variant="contained">Login</Button>
            <Button onClick={handleRegisterButton} variant="contained">Register</Button>
        </Stack>
    )


}

export default Register