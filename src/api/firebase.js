import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  doc,
  getDoc,
} from "firebase/firestore";

const devConfig = {
  apiKey: "AIzaSyC6X571rXek2TC8XCE8jcd6bIgKi5sc0_A",
  authDomain: "eba-dsp-map-dev.firebaseapp.com",
  projectId: "eba-dsp-map-dev",
  storageBucket: "eba-dsp-map-dev.appspot.com",
  messagingSenderId: "200138947447",
  appId: "1:200138947447:web:c7b66df19e77ec8f237f72",
  measurementId: "G-SNEMBJE4DT",
};

export class FIREBASE_API {
  constructor() {
    this.name = "FIREBASE_API";

    this.app = initializeApp(devConfig);
    this.db = getFirestore(this.app);
  }

  async test() {
    console.log("FIREBASE_API");

    const docRef = doc(this.db, "demo", "hello");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().value;
    } else {
      return "No such document!";
    }
  }

  getLastUpdated() {
    return "not yet implemented in FIREBASE_API";
  }

  getAllProviders() {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllProvidersByCSU(csu) {
    // not yet implemented in FIREBASE_API
    return new Map();
  }

  getAllProvidersByFIPS(fips) {
    // not yet implemented in FIREBASE_API
    return new Map();
  }

  getProviderServices(providerID) {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getProviderInfo(providerID) {
    // not yet implemented in FIREBASE_API
    return {};
  }

  getAllServicesByProviderInFIPS(providerId, fips) {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllServiceNamesByCSU(csu) {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllServicesByProviderInCSU(providerId, csu) {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllProvidersOfServiceInCSU(serviceName, csu) {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllProvidersOfLanguage(languageName) {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllProvidersOfService(serviceName) {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllLocations() {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllServiceNames() {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllLanguages() {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getServiceMapFIPS(providerID, serviceName) {
    // not yet implemented in FIREBASE_API
    return { available: [], limited: [], languages: new Map() };
  }

  getAllFIPS(providerID) {
    // not yet implemented in FIREBASE_API
    return [];
  }

  searchProviders({ serviceName, locationType, locationID, languageName }) {
    // not yet implemented in FIREBASE_API
    return new Map();
  }
}
