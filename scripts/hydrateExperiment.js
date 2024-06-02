import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  doc,
  setDoc,
  updateDoc,
  collection,
} from "firebase/firestore";

const config = {
  ENV: "DEV",
};

const devConfig = {
  apiKey: "AIzaSyC6X571rXek2TC8XCE8jcd6bIgKi5sc0_A",
  authDomain: "eba-dsp-map-dev.firebaseapp.com",
  projectId: "eba-dsp-map-dev",
  storageBucket: "eba-dsp-map-dev.appspot.com",
  messagingSenderId: "200138947447",
  appId: "1:200138947447:web:c7b66df19e77ec8f237f72",
  measurementId: "G-SNEMBJE4DT",
};

const emulatorConfig = {
  projectId: "demo-dsp-map",
};

const isLocal = config.ENV === "LOCAL";
const firebaseConfig = isLocal ? emulatorConfig : devConfig;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

if (isLocal) {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}

// write offices to a top-level collection
const offices = [
  {
    providerName: "ABC Counseling",
    street: "123 Main St",
    city: "Broadway",
    state: "VA",
    zip: "22815",
    phone: "540-555-5555",
    lat: 38.6136924,
    lng: -78.7987009,
  },
  {
    providerName: "ABC Counseling",
    street: "123 Main St",
    city: "Harrisonburg",
    state: "VA",
    zip: "22801",
    phone: "540-555-1234",
    lat: 38.4508553,
    lng: -78.8685222,
  },
  {
    providerName: "XYZ Therapy Inc",
    street: "123 Main St",
    city: "Winchester",
    state: "VA",
    zip: "99999",
    phone: "540-555-5555",
    lat: 39.1249685,
    lng: -78.1572795,
  },
  {
    providerName: "XYZ Therapy Inc",
    street: "123 Main St",
    city: "Front Royal",
    state: "VA",
    zip: "99999",
    phone: "540-555-1234",
    lat: 38.918929,
    lng: -78.1954975,
  },
];

const officesCollection = collection(db, "offices");
//load test... 50x
for (let i = 0; i < 50; i++) {
  offices.forEach(async (office) => {
    await setDoc(doc(officesCollection), office);
  });
}

console.log("done");
