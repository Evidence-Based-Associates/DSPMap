import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const config = {
  ENV: "LOCAL",
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

const docRef = doc(db, "meta", "healthCheck");
await setDoc(docRef, { value: "data from firebase emulator" });

/**
 * @type {import("./types").Provider}
 */
const exampleProvider = {
  providerName: "ABC Counseling",
  website: "abccounseling.com",
  contactName: "Anne Smith",
  contactEmail: "anne@abccounseling.com",
  defaultMapZoom: -1,
  offices: [
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
  ],
};

/**
 * @type {import("./types").Service[]}
 */
const exampleProviderServices = [
  {
    providerName: "ABC Counseling",
    serviceName: "Counseling",
    lastUpdated: "2024-05-24",
    lastUpdatedBy: "joelnwalkley@gmail.com",
    mapZoom: -1,
    telehealth: true,
    allFIPS: ["51660", "51165", "51171"],
    limitedFIPS: ["51171"],
    languageFIPS: {
      Spanish: ["51171"],
    },
  },
  {
    providerName: "ABC Counseling",
    serviceName: "Mentoring",
    lastUpdated: "2024-05-24",
    lastUpdatedBy: "joelnwalkley@gmail.com",
    mapZoom: -1,
    telehealth: true,
    allFIPS: ["51660", "51171"],
    limitedFIPS: ["51171"],
    languageFIPS: {
      Spanish: ["51171"],
    },
  },
];

// write exampleProvider to Providers collection
const providerRef = doc(db, "providers", exampleProvider.providerName);
await setDoc(providerRef, exampleProvider);

// write exampleProviderServices to Services subcollection of the Provider
for (const service of exampleProviderServices) {
  const serviceRef = doc(providerRef, "services", service.serviceName);
  await setDoc(serviceRef, service);
}

// write some service service names
const metaDataRef = doc(db, "meta", "data");
await setDoc(metaDataRef, {});
const availableServices = [
  "Counseling",
  "Mentoring",
  "Therapy",
  "Functional Family Therapy",
];
await updateDoc(metaDataRef, { availableServices });

// write some languages
const availableLanguages = ["Spanish", "English", "French"];
await updateDoc(metaDataRef, { availableLanguages });

console.log("done");
