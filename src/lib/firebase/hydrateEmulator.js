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
const providerRef = doc(db, "Providers", exampleProvider.providerName);
await setDoc(providerRef, exampleProvider);

// write exampleProviderServices to Services subcollection of the Provider
for (const service of exampleProviderServices) {
  const serviceRef = doc(providerRef, "Services", service.serviceName);
  await setDoc(serviceRef, service);
}

console.log("done");
