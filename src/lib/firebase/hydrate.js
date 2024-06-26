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
  lastUpdated: "2024-05-24",
  website: "abccounseling.com",
  contactName: "Anne Smith",
  contactEmail: "anne@abccounseling.com",
  defaultMapZoom: 0,
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

/**
 * @type {import("./types").Provider}
 */
const exampleProvider2 = {
  providerName: "XYZ Counseling",
  lastUpdated: "2024-05-25",
  website: "xyzcounseling.com",
  contactName: "Bob Smith",
  contactEmail: "bob@xyz.com",
  defaultMapZoom: 0,
  offices: [
    {
      providerName: "XYZ Counseling",
      street: "123 Main St",
      city: "Winchester",
      state: "VA",
      zip: "99999",
      phone: "540-555-5555",
      lat: 39.1249685,
      lng: -78.1572795,
    },
    {
      providerName: "XYZ Counseling",
      street: "123 Main St",
      city: "Front Royal",
      state: "VA",
      zip: "99999",
      phone: "540-555-1234",
      lat: 38.918929,
      lng: -78.1954975,
    },
  ],
};

/**
 * @type {import("./types").Service[]}
 */
const exampleProviderServices2 = [
  {
    providerName: "XYZ Counseling",
    serviceName: "Counseling",
    lastUpdatedBy: "joelnwalkley@gmail.com",
    mapZoom: 0,
    telehealth: true,
    allFIPS: ["51139", "51187"],
    limitedFIPS: ["51187"],
    languageFIPS: {
      Spanish: ["51187"],
    },
  },
];

const allProviders = [exampleProvider, exampleProvider2];
const allServices = [...exampleProviderServices, ...exampleProviderServices2];

// write exampleProvider to Providers collection
for (const provider of allProviders) {
  const providerRef = doc(db, "providers", provider.providerName);
  await setDoc(providerRef, provider);
}

// write exampleProviderServices to Services subcollection of the Provider
for (const service of allServices) {
  const serviceRef = doc(
    db,
    "providers",
    service.providerName,
    "services",
    service.serviceName
  );
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
const availableLanguages = ["Spanish", "French"];
await updateDoc(metaDataRef, { availableLanguages });

console.log("done");
