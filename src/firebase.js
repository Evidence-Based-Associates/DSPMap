import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  collection,
  getDocs,
  collectionGroup,
  query,
  where,
} from "firebase/firestore/lite";

import { config } from "../config.js";

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

export const getMetaData = async () => {
  const docRef = doc(db, "meta", "data");
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const getAllProviders = async () => {
  const collectionRef = collection(db, "providers");
  const snap = await getDocs(collectionRef);
  return snap.docs.map((doc) => doc.data());
};

export const getProvider = async (providerID) => {
  const docRef = doc(db, "providers", providerID);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const getProviderServices = async (providerID) => {
  const collectionRef = collection(db, "providers", providerID, "services");
  const snap = await getDocs(collectionRef);
  return snap.docs.map((doc) => doc.data());
};

export const getAllCSUServices = async (csu) => {
  const serviceCollection = collectionGroup(db, "services");
  const serviceQuery = query(
    serviceCollection,
    where("allFIPS", "array-contains-any", csu.localities)
  );
  const snap = await getDocs(serviceQuery);
  return snap.docs.map((doc) => doc.data());
};
