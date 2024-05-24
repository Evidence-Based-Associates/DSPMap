import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const emulatorConfig = {
  projectId: "demo-dsp-map",
};

const app = initializeApp(emulatorConfig);
const db = getFirestore(app);

connectFirestoreEmulator(db, "127.0.0.1", 8080);

const docRef = doc(db, "demo", "hello");
await setDoc(docRef, { value: "from firebase emulator" });
