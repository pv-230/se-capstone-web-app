import logo from './logo.svg';
import './App.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { user, signIn, SetCompletedClasses } from "./db";

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
        <button onClick={ () => signIn("test@gmail.com", "password123")}>LogIn</button>
        <button onClick={() => SetCompletedClasses("test class")}>Test</button>
      </header>
    </div>
  );
}

function login() {

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
