import React, { useState, useEffect } from "react";
// import firebase from "firebase";

export default function Profile({ email, firebase }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  const firestore = firebase.firestore();
  const storage = firebase.storage();
  const usersRef = firestore.collection("Users");

  useEffect(() => {
    usersRef.doc(email).onSnapshot((doc) =>
      setUserProfile({
        name: doc.data().name,
        image: doc.data().image_url,
      })
    );
  }, [userProfile, email, usersRef]);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onUpload = async () => {
    const userDetails = await usersRef.doc(email).get();
    console.log(userDetails.exists, userDetails.data(), "BAAAAAAA");
    if (userDetails.exists && !file) return console.log("No Fields to Update!");
    if (!userDetails.exists && !name)
      return console.log("First update requires name!");
    const storageRef = storage.ref();
    const fileRef = file && storageRef.child(file.name);
    fileRef && (await fileRef.put(file));
    if (!userDetails.exists) {
      firestore
        .collection("Users")
        .doc(email)
        .set({
          name,
          image_url: await fileRef.getDownloadURL(),
        });
    } else {
      firestore
        .collection("Users")
        .doc(email)
        .update({
          name: name ? name : userDetails.data().name,
          image_url: file
            ? await fileRef.getDownloadURL()
            : userDetails.data().image_url,
        });
    }
  };

  return (
    <div>
      {userProfile ? <h1> {userProfile.name}'s Profile</h1> : <h1>Profile</h1>}
      {userProfile && (
        <div style={{ height: "100px", width: "100px", borderRadius: "15%" }}>
          <img
            src={userProfile.image}
            alt=""
            style={{
              height: "100px",
              width: "100px",
              borderRadius: "15%",
              objectFit: "cover",
            }}
          />
        </div>
      )}
      <input onChange={onNameChange} placeholder="Change Name..." />
      <input
        type="file"
        onChange={onFileChange}
        placeholder="Choose Image..."
      />
      <button onClick={onUpload}>Upload Details</button>
      <br />
      <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
    </div>
  );
}
