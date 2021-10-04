import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

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

    let user = null;

    const signIn = (email, password) => {
        console.log(email + " " + password);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                user = userCredential.user;
                uid = user.uid;
                console.log(uid.toString())
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <form>
            <div className="loginInput">
                <label>Username</label>
                <input
                    type="text"
                    onChange={handleInputChange}
                    placeholder="Enter username"
                    name="username"
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    name="password"
                    required
                />
                <button onClick={ () => signIn("test@gmail.com", "password123")}>Login</button>
            </div>
        </form>

    )
}

export default LoginRegister