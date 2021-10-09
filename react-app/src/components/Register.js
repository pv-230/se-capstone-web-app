import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { TextField, Button, Stack,} from "@mui/material"

/*
 * This is the component that provides the register function.
 * TODO: styling, redirect to homepage on login
 */
const Register = (props) => 
{
    var uid = null;
    var created = false;
    
    // Component state
    const [inputText, setInputText] = useState
    (
        {
            email: "",
            password: "",
            confirmPassword: "",
        }
    )

    //error message state
    const [errorMessage, setErrorMessage] = useState('');

    // Event handler for user input
    const handleInputChange = event => 
    {
        setInputText
        (
            {
                ...inputText,
                [event.target.name]: event.target.value,
            }
        )
    }

    // Event handler for clicking on the login button
    const handleLoginButton = async event => 
    {
        event.preventDefault();
        window.location.href = '/login';
    }

    // Event handler for clicking on the register button
    const handleRegisterButton = async event => 
    {
        event.preventDefault();
        await register(inputText.email, inputText.password);
        props.setUserProp(uid);
        if(created)
        {  
            window.location.href = '/account_setup';   
        }
    }

     // Firebase related function that sends user credentials to the database
     async function register(email, password) 
     {
        const auth = getAuth();
        if(inputText.confirmPassword === inputText.password && inputText.password !== "")
        {
            await createUserWithEmailAndPassword(auth, email, password)
                .then
                (
                    (userCredential) => 
                    {
                        uid = userCredential.user.uid;
                        created = true;
                    }
                )
                .catch
                (
                    (error) => 
                    {
                        created = false;
                        // Error registering account
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode + ": " + errorMessage)
                        if(errorCode === 'auth/invalid-email')
                        {
                            setErrorMessage( <h2>Error: Invalid email</h2>);
                        }
                        else if(errorCode === 'auth/email-already-in-use')
                        {
                            setErrorMessage( <h2>Error: Email already in use</h2>);
                        }
                        else if(errorCode === 'auth/operation-not-allowed')
                        {
                            setErrorMessage( <h2>Error: Operation is not allowed</h2>);
                        }
                        else if(errorCode === 'auth/weak-password')
                        {
                            setErrorMessage( <h2>Error: Weak password. Please use 6 or more characters.</h2>);
                        }
                    }
                );
        }
        else
        {   
            setErrorMessage( <h2>Error: Passwords do not match.</h2>);
            console.log("Error: Passwords do not match.")
        }
    }

    return (
        
        <Stack className="register" spacing={2}>
            <h3>Create an account</h3>
            
            
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
                type="password"
                onChange={handleInputChange}
                label="Confirm Password"
                variant="outlined"
                name="confirmPassword"
                required
            />

            {
                errorMessage && 
                (
                    <p className="error"> {errorMessage} </p>
                )
            }    

            <Button onClick={handleRegisterButton} variant="contained">Register</Button>   
            <Button onClick={handleLoginButton} variant="contained">Back to Login</Button>

        </Stack>
    )

}

export default Register