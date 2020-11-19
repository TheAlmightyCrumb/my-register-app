import React, { useRef } from "react";
import firebase from "firebase";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value)
      return console.log("Passwords do not match!");
    firebase.auth().createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
        .then(user => console.log(user, "has signed up successfully!"))
        .catch(error => console.log("Message: " + error.message));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" ref={emailRef} required placeholder="Email..." />
        <br />
        <input
          type="password"
          ref={passwordRef}
          required
          placeholder="Password..."
        />
        <br />
        <input
          type="password"
          ref={confirmPasswordRef}
          required
          placeholder="Confirm Password..."
        />
        <br />
        <button type="submit">Submit</button>
        <button onClick={() => {
            emailRef.current.value = '';
            passwordRef.current.value = '';
            confirmPasswordRef.current.value = '';
        }}>Clear</button>
      </form>
    </div>
  );
}
