// Import the functions you need from the SDKs you need
// TODO: Import from npm when using a bundler or framework
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// okay to commit per Firebase docs
const firebaseConfigDev = {
    apiKey: "AIzaSyC6X571rXek2TC8XCE8jcd6bIgKi5sc0_A",
    authDomain: "eba-dsp-map-dev.firebaseapp.com",
    projectId: "eba-dsp-map-dev",
    storageBucket: "eba-dsp-map-dev.appspot.com",
    messagingSenderId: "200138947447",
    appId: "1:200138947447:web:c7b66df19e77ec8f237f72",
    measurementId: "G-SNEMBJE4DT"
};

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigProd = {
    apiKey: "AIzaSyC6Lg3lKbT9mSHavFTxIGpub9hiyWGjBPQ",
    authDomain: "eba-dsp-map-prod.firebaseapp.com",
    projectId: "eba-dsp-map-prod",
    storageBucket: "eba-dsp-map-prod.appspot.com",
    messagingSenderId: "1068377714544",
    appId: "1:1068377714544:web:5999d487c7ef4aca3c69b5",
    measurementId: "G-RDPWS5CTYM"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfigDev);
const db = getFirestore(app);

const docRef = doc(db, "demo", "hello");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}