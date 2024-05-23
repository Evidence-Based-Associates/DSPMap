import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db } from "./fs_emulator_connect.js";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

const auth = getAuth();
connectAuthEmulator(auth, "http://127.0.0.1:9099");

// create new user
let email = "dwayne@gmail.com";
let password = "helloworld";

createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
  // Signed in
  const user = userCredential.user;
  console.log(user.uid);
  // ...

  // add user to users collection
  const users = collection(db, "users");
  const userDoc = {
    something: "something",
  };
  setDoc(doc(users, user.uid), userDoc)
    .then(() => {
      console.log("Document written with ID: ", user.uid);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
});
