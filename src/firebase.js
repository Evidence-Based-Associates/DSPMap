import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  connectAuthEmulator,
} from "firebase/auth";
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
  orderBy,
  deleteDoc,
} from "firebase/firestore/lite";

import { config } from "../config.js";
import { allFIPSinRegion, sortedCSUs } from "./lib/csu.js";

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
  appId: "local",
  apiKey: "local",
};

const isLocal = config.ENV === "LOCAL";

const envFirebaseConfig = {
  LOCAL: emulatorConfig,
  DEV: devConfig,
  PROD: prodConfig,
};

const firebaseConfig = envFirebaseConfig[config.ENV];

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

if (isLocal) {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
}

export const login = async () => {
  let user = {};
  await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      user = result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  return user;
};

export const logout = async () => {
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      console.log("An error happened.", error);
    });
};

export const getMetaData = async () => {
  const docRef = doc(db, "meta", "data");
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const getGoogleMapsApiKey = async () => {
  const docRef = doc(db, "meta", "GOOGLE_API_KEY");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.get("value");
  }
  return "No API Key Found.";
};

export const getAllProviders = async () => {
  const collectionRef = collection(db, "providers");
  const snap = await getDocs(collectionRef);
  return snap.docs.map((doc) => doc.data());
};

export const getAllLocations = async () => {
  const collectionRef = collectionGroup(db, "locations");
  const snap = await getDocs(collectionRef);
  return snap.docs.map((doc) => doc.data());
};

export const getProviderLocations = async (providerID) => {
  const collectionRef = collection(db, "providers", providerID, "locations");
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

export const getAllServicesInFIPS = async (fips) => {
  const serviceCollection = collectionGroup(db, "services");
  const serviceQuery = query(
    serviceCollection,
    where("allFIPS", "array-contains", fips)
  );
  const snap = await getDocs(serviceQuery);
  return snap.docs.map((doc) => doc.data());
};

export const getAllServicesByName = async (serviceName) => {
  const serviceCollection = collectionGroup(db, "services");
  const serviceQuery = query(
    serviceCollection,
    where("serviceName", "==", serviceName)
  );
  const snap = await getDocs(serviceQuery);
  return snap.docs.map((doc) => doc.data());
};

export const getAllServicesByLanguage = async (language) => {
  const serviceCollection = collectionGroup(db, "services");
  const serviceQuery = query(
    serviceCollection,
    // orderBy(`languageFIPS.${language}`) // TODO: Firebase won't filter by .language
    orderBy("languageFIPS")
  );
  const snap = await getDocs(serviceQuery);
  return snap.docs.map((doc) => doc.data());
};

export const searchServices = async ({
  serviceName = "",
  locationType = "",
  locationID = "",
  languageName = "",
}) => {
  const serviceCollection = collectionGroup(db, "services");
  const queries = [];
  if (serviceName && serviceName !== "any") {
    queries.push(where("serviceName", "==", serviceName));
  }
  if (languageName && languageName !== "English") {
    queries.push(orderBy("languageFIPS"));
  }
  switch (locationType) {
    case "CSU":
      queries.push(
        where(
          "allFIPS",
          "array-contains-any",
          sortedCSUs.find((csu) => csu.slug === locationID)?.localities
        )
      );
      break;
    case "Locality":
      queries.push(where("allFIPS", "array-contains", locationID));
      break;
    case "Region":
      const regionFIPS = allFIPSinRegion(locationID);
      //remove 51017
      regionFIPS.splice(regionFIPS.indexOf(51017), 1); // TODO: TEMPORY FIX FOR 30 ARRAY-CONTAINS QUERY LIMIT
      queries.push(where("allFIPS", "array-contains-any", regionFIPS));
      break;
    case "Telehealth":
      queries.push(where("hasTelehealth", "==", true));
      break;
    default:
      break;
  }
  const servicesQuery = query(serviceCollection, ...queries);
  const snap = await getDocs(servicesQuery);
  const results = snap.docs.map((doc) => doc.data());
  // if language then filter out
  if (languageName && languageName !== "English") {
    return results.filter((service) => service.languageFIPS[languageName]);
  }
  return results;
};

export const saveProvider = async (
  providerInfo,
  servicesInfo = [],
  locationsInfo = []
) => {
  const providerRef = doc(db, "providers", providerInfo.providerName);
  await setDoc(providerRef, providerInfo);

  const servicesCollectionRef = collection(
    db,
    "providers",
    providerInfo.providerName,
    "services"
  );
  const servicesSnap = await getDocs(servicesCollectionRef);
  servicesSnap.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
  const locationsCollectionRef = collection(
    db,
    "providers",
    providerInfo.providerName,
    "locations"
  );
  const locationsSnap = await getDocs(locationsCollectionRef);
  locationsSnap.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  if (servicesInfo.length === 0) {
    return;
  }
  // firebase cannot handle Sets, need to convert to Array
  servicesInfo.forEach((serviceInfo) => {
    serviceInfo.allFIPS = [
      ...serviceInfo.availableFIPS,
      ...serviceInfo.limitedFIPS,
    ];
    serviceInfo.availableFIPS = [...serviceInfo.availableFIPS];
    serviceInfo.limitedFIPS = [...serviceInfo.limitedFIPS];
    serviceInfo.providerName = providerInfo.providerName;
    const languageFIPS = serviceInfo.languageFIPS;
    Object.keys(languageFIPS).forEach((language) => {
      languageFIPS[language] = [...languageFIPS[language]];
    });
  });
  servicesInfo.forEach(async (serviceInfo) => {
    const serviceRef = doc(
      db,
      "providers",
      providerInfo.providerName,
      "services",
      serviceInfo.serviceName
    );
    await setDoc(serviceRef, serviceInfo);
  });
  locationsInfo.forEach(async (locationInfo) => {
    const locationRef = doc(
      db,
      "providers",
      providerInfo.providerName,
      "locations",
      `${locationInfo.street}-${locationInfo.city}-${locationInfo.state}-${locationInfo.zip}`
    );
    await setDoc(locationRef, locationInfo);
  });
  const metaDataRef = doc(db, "meta", "data");
  updateDoc(metaDataRef, {
    lastUpdated: new Date().toLocaleDateString(),
  });
};
