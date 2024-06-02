import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const config = {
  ENV: "LOCAL",
};

const devConfig = {};
// {
//   apiKey: "AIzaSyC6X571rXek2TC8XCE8jcd6bIgKi5sc0_A",
//   authDomain: "eba-dsp-map-dev.firebaseapp.com",
//   projectId: "eba-dsp-map-dev",
//   storageBucket: "eba-dsp-map-dev.appspot.com",
//   messagingSenderId: "200138947447",
//   appId: "1:200138947447:web:c7b66df19e77ec8f237f72",
//   measurementId: "G-SNEMBJE4DT",
// };

const emulatorConfig = {
  projectId: "demo-dsp-map",
};

const isLocal = config.ENV === "LOCAL";
const firebaseConfig = isLocal ? emulatorConfig : devConfig;

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

if (isLocal) {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}
