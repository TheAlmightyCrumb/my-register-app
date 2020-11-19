import "./App.css";
import firebase from "firebase";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

const auth = firebase.auth();

function App() {
  const [showForget, setShowForget] = useState(false);
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? (
        <>
          <Profile email={user.email} firebase={app} />
        </>
      ) : (
        <>
          {" "}
          <h1>Sign In:</h1>
          <SignIn />
          {!showForget && (
            <p onClick={() => setShowForget(true)}>
              Can't remember your password?
            </p>
          )}
          {showForget && (
            <>
              <h2>Reset Password:</h2>
              <ResetPassword />
              <div onClick={() => setShowForget(false)}>Hide</div>
            </>
          )}
          <h2>Sign Up:</h2>
          <SignUp />
        </>
      )}
    </div>
  );
}

export default App;
