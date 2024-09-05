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

// read providers from exportPath/providers.json and write to db
const providersData = fs.readFileSync(`${exportPath}/providers.json`, "utf8");
const providers = JSON.parse(providersData);
for (const provider of providers) {
  const providerRef = doc(db, "providers", provider.providerName);
  await setDoc(providerRef, provider);
}

// read services from exportPath/services.json and write to db
const servicesData = fs.readFileSync(`${exportPath}/services.json`, "utf8");
const services = JSON.parse(servicesData);
for (const service of services) {
  const serviceRef = doc(
    db,
    "providers",
    service.providerName,
    "services",
    service.serviceName
  );
  await setDoc(serviceRef, service);
}

// read locations from exportPath/locations.json and write to db
const locationsData = fs.readFileSync(`${exportPath}/locations.json`, "utf8");
const locations = JSON.parse(locationsData);
for (const location of locations) {
  const locationRef = doc(
    db,
    "providers",
    location.providerName,
    "locations",
    `${location.street}-${location.city}-${location.state}-${location.zip}`
  );
  await setDoc(locationRef, location);
}

// read metadata from exportPath/metadata.json and write to db
const metaDataData = fs.readFileSync(`${exportPath}/metadata.json`, "utf8");
const metaData = JSON.parse(metaDataData);
const metaDataRef = doc(db, "meta", "data");
await setDoc(metaDataRef, metaData);

console.log("done");
