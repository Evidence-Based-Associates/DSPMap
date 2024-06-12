import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import * as fs from "fs";
import { db } from "./setup.js";

const exportPath = "./exports";

// query all providers
const providersRef = collection(db, "providers");
const providersSnapshot = await getDocs(providersRef);
const providers = [];
// write providers to a json file
providersSnapshot.forEach((doc) => {
  providers.push(doc.data());
});
fs.writeFileSync(
  `${exportPath}/providers.json`,
  JSON.stringify(providers, null, 2)
);

// query all services
const servicesRef = collectionGroup(db, "services");
const servicesSnapshot = await getDocs(servicesRef);
const services = [];
// write services to a json file
servicesSnapshot.forEach((doc) => {
  services.push(doc.data());
});
fs.writeFileSync(
  `${exportPath}/services.json`,
  JSON.stringify(services, null, 2)
);

// query all locations
const locationsRef = collectionGroup(db, "locations");
const locationsSnapshot = await getDocs(locationsRef);
const locations = [];
// write locations to a json file
locationsSnapshot.forEach((doc) => {
  locations.push(doc.data());
});
fs.writeFileSync(
  `${exportPath}/locations.json`,
  JSON.stringify(locations, null, 2)
);

// query all metadata
const metaDataDocRef = doc(db, "meta", "data");
const metaDataDocSnap = await getDoc(metaDataDocRef);
// write metadata to a json file
fs.writeFileSync(
  `${exportPath}/metaData.json`,
  JSON.stringify(metaDataDocSnap.data(), null, 2)
);
