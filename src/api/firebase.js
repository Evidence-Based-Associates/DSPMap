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
  where,
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
    const providers = collectionGroup(this.db, "providers");
    const providersQuery = query(
      providers,
      orderBy("lastUpdated", "desc"),
      limit(1)
    );
    const providerQuerySnapshot = await getDocs(providersQuery);

    providerQuerySnapshot.forEach((doc) => {
      lastUpdatedYYYYMMDD = doc.data().lastUpdated;
    });
    return new Date(lastUpdatedYYYYMMDD).toLocaleDateString();
  }

  async getAllProviders() {
    const providers = [];
    const providersRef = collection(this.db, "providers");
    const providersQuery = query(providersRef);
    const providersQuerySnapshot = await getDocs(providersQuery);
    if (providersQuerySnapshot.empty) {
      return [];
    }
    providersQuerySnapshot.forEach((doc) => {
      const providerInfo = doc.data();
      providers.push({
        id: providerInfo.providerName,
        name: providerInfo.providerName,
        ...doc.data(),
      });
    });
    return providers;
  }

  getAllProvidersByCSU(csu) {
    // not yet implemented in FIREBASE_API
    return new Map();
  }

  getAllProvidersByFIPS(fips) {
    // not yet implemented in FIREBASE_API
    return new Map();
  }

  async getProviderServices(providerName) {
    // get subcollection of services for provider
    const services = [];
    const servicesRef = collection(
      this.db,
      "providers",
      providerName,
      "services"
    );
    const servicesQuery = query(servicesRef);
    const servicesQuerySnapshot = await getDocs(servicesQuery);
    if (servicesQuerySnapshot.empty) {
      return [];
    }
    servicesQuerySnapshot.forEach((doc) => {
      services.push(doc.data().serviceName);
    });
    return services.sort();
  }

  async getProviderInfo(providerName) {
    // get the provider document
    const providerRef = doc(this.db, "providers", providerName);
    const providerDoc = await getDoc(providerRef);
    if (providerDoc.exists()) {
      const providerInfo = providerDoc.data();
      return {
        ...providerInfo,
        lastUpdated: new Date(providerInfo.lastUpdated).toLocaleDateString(),
      };
    }
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

  async getAllLocations(providerName = "") {
    let locations = [];
    const providersRef = collection(this.db, "providers");
    const allProvidersQuery = query(providersRef, orderBy("offices"));
    const oneProviderQuery = query(
      providersRef,
      orderBy("offices"),
      where("providerName", "==", providerName)
    );

    const providersQuery =
      providerName === "" ? allProvidersQuery : oneProviderQuery;

    const providersQuerySnapshot = await getDocs(providersQuery);
    providersQuerySnapshot.forEach((provider) => {
      const providerInfo = provider.data();
      providerInfo.offices.forEach((office) => {
        locations.push({
          providerName: providerInfo.providerName,
          providerId: providerInfo.providerName,
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
    const docRef = doc(this.db, "meta", "data");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().availableServices;
    }
    return [];
  }

  async getAllLanguages(providerName = "") {
    if (providerName === "") {
      const docRef = doc(this.db, "meta", "data");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const availableLanguages = docSnap.data().availableLanguages;
        return availableLanguages.filter((language) => language !== "Spanish");
      }
      return [];
    }
    const serviceRef = collection(
      this.db,
      "providers",
      providerName,
      "services"
    );
    const serviceQuery = query(serviceRef, orderBy("languageFIPS"));
    const serviceQuerySnapshot = await getDocs(serviceQuery);
    if (serviceQuerySnapshot.empty) {
      return [];
    }
    const languages = new Set();
    serviceQuerySnapshot.forEach((doc) => {
      const languageFIPS = doc.data().languageFIPS;
      Object.keys(languageFIPS).forEach((language) => {
        languages.add(language);
      });
    });
    return [...languages];
  }

  async getServiceMapFIPS({ providerID: providerName, serviceName }) {
    // get the document for the service subcollect via path from provider
    const serviceRef = doc(
      this.db,
      `providers/${providerName}/services/${serviceName}`
    );
    const docSnap = await getDoc(serviceRef);
    if (docSnap.exists()) {
      const allFIPS = docSnap.get("allFIPS");
      const limitedFIPS = docSnap.get("limitedFIPS");
      const languageFIPS = docSnap.get("languageFIPS");
      const availableFIPS = allFIPS.filter(
        (fips) => !limitedFIPS.includes(fips)
      );
      const languageArray = Object.keys(languageFIPS).map((language) => {
        return { [language]: languageFIPS[language] };
      });
      return {
        available: availableFIPS,
        limited: limitedFIPS,
        languages: languageArray,
      };
    }
    return { available: [], limited: [], languages: new Map() };
  }

  async getAllFIPS(providerName) {
    const providerRef = doc(this.db, "providers", providerName);
    const providerServicesRef = collection(providerRef, "services");
    const providerServicesQuery = query(providerServicesRef);
    const providerServicesQuerySnapshot = await getDocs(providerServicesQuery);
    if (providerServicesQuerySnapshot.empty) {
      return [];
    }

    const allFIPS = [];
    providerServicesQuerySnapshot.forEach((doc) => {
      allFIPS.push(doc.get("allFIPS"));
    });
    return [...new Set(allFIPS.flat())];
  }

  searchProviders({ serviceName, locationType, locationID, languageName }) {
    // not yet implemented in FIREBASE_API
    return new Map();
  }
}
