import {
    collection,
    collectionGroup,
    getDocs,
    query,
    where,
} from "firebase/firestore";

import * as fs from "fs";
import { db } from "./setup.js";

const exportPath = "./exports";
const providerName = "Family Preservation Services";

// query all providers
const providersRef = collection(db, "providers");
const providerQuery = query(providersRef, where("providerName", "==", providerName));
const providersSnapshot = await getDocs(providerQuery);
const providers = [];
// write providers to a json file
providersSnapshot.forEach((doc) => {
    providers.push(doc.data());
});
fs.writeFileSync(
    `${exportPath}/providers.json`,
    JSON.stringify(providers, null, 2)
);

console.log("done exporting provider");

// query all services
const servicesRef = collectionGroup(db, "services");
const providerServicesQuery = query(servicesRef, where("providerName", "==", providerName));
const servicesSnapshot = await getDocs(providerServicesQuery);
const services = [];
// write services to a json file
servicesSnapshot.forEach((doc) => {
    services.push(doc.data());
});
fs.writeFileSync(
    `${exportPath}/services.json`,
    JSON.stringify(services, null, 2)
);

console.log("done exporting services");

// query all locations
const locationsRef = collectionGroup(db, "locations");
const providerLocationsQuery = query(locationsRef, where("providerName", "==", providerName));
const locationsSnapshot = await getDocs(providerLocationsQuery);
const locations = [];
// write locations to a json file
locationsSnapshot.forEach((doc) => {
    locations.push(doc.data());
});
fs.writeFileSync(
    `${exportPath}/locations.json`,
    JSON.stringify(locations, null, 2)
);

console.log("done exporting locations");