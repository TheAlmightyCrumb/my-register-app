import React, { useRef } from "react";
import firebase from "firebase";

export default function ResetPassword() {
  const emailRef = useRef();

  const resetPassword = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(emailRef.current.value)
      .then(() => console.log(`Email sent successfully to ${emailRef.current.value}`))
      .catch((error) => console.log("Message: " + error.message));
  };

  return (
    <div>
      <form onSubmit={resetPassword}>
        <input type="email" ref={emailRef} placeholder="Email..." />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
