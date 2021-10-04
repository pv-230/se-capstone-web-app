import logo from './logo.svg';
import './App.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { user, signIn, setUserData, getUserData, uid } from "./db";
import { Button } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button variant="contained" onClick={ () => signIn("test@gmail.com", "password123")}>LogIn</Button>
        <Button variant="contained" onClick={() => setUserData()}>Set User Data</Button>
        <Button variant="contained" onClick={() => getUserData()}>Get User Data</Button>
      </header>
    </div>
  );
}

function login() {

  if(uid.equals(null)) {
    console.log("Error, user is not logged in!");
    return;
  }
  const auth = getAuth();
  let email = "test@gmail.com"
  let password = "password123"
  console.log('test');
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(userCredential.user.uid);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(user);
      // ..
    });
}

export default App;
