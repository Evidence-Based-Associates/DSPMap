import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  doc,
  getDoc,
} from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC6X571rXek2TC8XCE8jcd6bIgKi5sc0_A",
//   authDomain: "eba-dsp-map-dev.firebaseapp.com",
//   projectId: "eba-dsp-map-dev",
//   storageBucket: "eba-dsp-map-dev.appspot.com",
//   messagingSenderId: "200138947447",
//   appId: "1:200138947447:web:c7b66df19e77ec8f237f72",
//   measurementId: "G-SNEMBJE4DT",
// };

const firebaseConfig = {
  projectId: "demo-test",
};
const app = initializeApp(firebaseConfig);
// // firebaseApps previously initialized using initializeApp()
// const db = getFirestore(app);
const db = getFirestore();
connectFirestoreEmulator(db, "127.0.0.1", 8080);

// Firestore emulator does not persist
// create a new `messages` collection and add a document a field for original
// either use the following id or replace it with the id of the new document
const docRef = doc(db, "messages", "ZfyeHyr6kKFShk3P6HnH");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
