import React, { useRef } from "react";
import firebase from "firebase";

export default function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignIn = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((user) => console.log(user, "has logged in successfully!"))
      .catch((error) => console.log("Message: " + error.message));
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  return (
    <div>
    <button onClick={signInWithGoogle}>Sign-In Via Google</button>
    <br /><br />
      <form onSubmit={handleSignIn}>
        <input type="email" ref={emailRef} placeholder="Email..." />
        <br />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Password..."
        />
        <br />
        <button type="submit">Submit</button>
        <button
          onClick={() => {
            emailRef.current.value = "";
            passwordRef.current.value = "";
          }}
        >
          Clear
        </button>
      </form>
    </div>
  );
}
