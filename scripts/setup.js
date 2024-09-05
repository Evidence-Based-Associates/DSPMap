import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// read from process
// options include DEV, PROD, LOCAL
// example: ENV=PROD node import.js
const ENV = process.env.ENV || "DEV";

const devConfig = {
  apiKey: "AIzaSyC6X571rXek2TC8XCE8jcd6bIgKi5sc0_A",
  authDomain: "eba-dsp-map-dev.firebaseapp.com",
  projectId: "eba-dsp-map-dev",
  storageBucket: "eba-dsp-map-dev.appspot.com",
  messagingSenderId: "200138947447",
  appId: "1:200138947447:web:c7b66df19e77ec8f237f72",
  measurementId: "G-SNEMBJE4DT",
};

const prodConfig = {
  apiKey: "AIzaSyC6Lg3lKbT9mSHavFTxIGpub9hiyWGjBPQ",
  authDomain: "eba-dsp-map-prod.firebaseapp.com",
  projectId: "eba-dsp-map-prod",
  storageBucket: "eba-dsp-map-prod.appspot.com",
  messagingSenderId: "1068377714544",
  appId: "1:1068377714544:web:5999d487c7ef4aca3c69b5",
  measurementId: "G-RDPWS5CTYM",
};

const emulatorConfig = {
  projectId: "demo-dsp-map",
};

const isLocal = ENV === "LOCAL";
const envFirebaseConfig = {
  LOCAL: emulatorConfig,
  DEV: devConfig,
  PROD: prodConfig,
};

const firebaseConfig = envFirebaseConfig[ENV];

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

if (isLocal) {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}
