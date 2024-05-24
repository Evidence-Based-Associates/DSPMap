import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  doc,
  getDoc,
  collectionGroup,
  query,
  getDocs,
  orderBy,
  limit,
  collection,
} from "firebase/firestore";
import { config } from "../../config";

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

export class FIREBASE_API {
  constructor() {
    this.name = "FIREBASE_API";

    const firebaseConfig = config.ENV === "LOCAL" ? emulatorConfig : devConfig;
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);

    if (config.ENV === "LOCAL") {
      connectFirestoreEmulator(this.db, "127.0.0.1", 8080);
    }
  }

  async test() {
    console.log("FIREBASE_API");

    const docRef = doc(this.db, "meta", "healthCheck");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().value;
    } else {
      return "No such document!";
    }
  }

  async getLastUpdated() {
    let lastUpdatedYYYYMMDD = "Unable to determine.";
    const servicesGroup = collectionGroup(this.db, "services");
    const servicesQuery = query(
      servicesGroup,
      orderBy("lastUpdated", "desc"),
      limit(1)
    );
    const serviceQuerySnapshot = await getDocs(servicesQuery);

    serviceQuerySnapshot.forEach((doc) => {
      lastUpdatedYYYYMMDD = doc.data().lastUpdated;
    });
    return new Date(lastUpdatedYYYYMMDD).toLocaleDateString();
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

  async getAllLocations(providerName) {
    let locations = [];
    //query for all provider documents location field
    const providersRef = collection(this.db, "providers");
    const providersQuery = query(providersRef, orderBy("offices"));
    const providersQuerySnapshot = await getDocs(providersQuery);
    providersQuerySnapshot.forEach((doc) => {
      const provider = doc.data();
      console.log(provider.offices);
      provider.offices.forEach((office) => {
        locations.push({
          providerName: provider.providerName,
          providerId: provider.providerName,
          street: office.street,
          city: office.city,
          state: office.state,
          zip: office.zip,
          phone: office.phone,
          lat: office.lat,
          lng: office.lng,
        });
      });
    });

    return locations;
  }

  async getAllServiceNames() {
    const serviceNames = new Set();
    const docRef = doc(this.db, "meta", "data");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().availableServices;
    }
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
