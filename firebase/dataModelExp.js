import { db } from "./fs_emulator_connect.js";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  collectionGroup,
  query,
  getDocs,
  where,
  orderBy,
} from "firebase/firestore";
import API from "../api/api.js";

const providerModel = {
  providerName: "string",
  website: "string",
  contactName: "string",
  contactEmail: "string",
  defaultMapZoom: "number",
  locations: [
    {
      providerName: "string",
      address: "string",
      city: "string",
      state: "string",
      zip: "string",
      phone: "string",
      lat: "number",
      lng: "number",
    },
  ],
  services: [
    {
      lastUpdated: "timestamp",
      lastUpdatedBy: "string",
      mapZoom: "number",
      providerName: "string",
      serviceName: "string",
      telehealth: "boolean",
      allFIPS: ["string"],
      limitedFIPS: ["string"],
      languageFIPS: {
        Spanish: ["string"],
        French: ["string"],
      },
    },
  ],
};

const providers = collection(db, "providers");

const exampleProvider = {
  id: "example",
  name: "Example Provider",
  website: "https://example.com",
  contactName: "John Doe",
  contactEmail: "john@example.com",
};

const exampleProvider2 = {
  id: "example2",
  name: "XYZ Counseling Services",
  website: "https://xyzcounseling.com",
  contactName: "Jane Doe",
  contactEmail: "jane@xyzcounseling.com",
};

const providerList = [exampleProvider, exampleProvider2];
providerList.forEach((provider) =>
  setDoc(doc(providers, provider.name), provider).then(() => {
    // console.log("Document written with ID: ", provider.name);
  })
);

providerList.forEach((provider) => {
  // get doc
  const docRef = doc(providers, provider.name);
  getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data());
    } else {
      //   console.log("No such document!");
    }
  });
});

// locations subcollection

const exampleProviderLocations = [
  {
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    phone: "123-456-7890",
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    address: "456 Elm St",
    city: "Othertown",
    state: "CA",
    zip: "12345",
    phone: "123-456-7890",
    lat: 37.7749,
    lng: -122.4194,
  },
];

const exampleProviderLocations2 = [
  {
    address: "987 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    phone: "123-456-7890",
    lat: 37.7749,
    lng: -122.4194,
  },
];

exampleProviderLocations.forEach((location) => {
  location.providerName = exampleProvider.name;
  const locationRef = collection(
    db,
    "providers",
    exampleProvider.name,
    "locations"
  );
  const docRef = doc(locationRef, `${location.address}-${location.city}`);
  setDoc(docRef, location).then(() => {
    // console.log("Document written with ID: ", docRef.id);
  });
});

exampleProviderLocations2.forEach((location) => {
  location.providerName = exampleProvider2.name;
  const locationRef = collection(
    db,
    "providers",
    exampleProvider2.name,
    "locations"
  );
  const docRef = doc(locationRef, `${location.address}-${location.city}`);
  setDoc(docRef, location).then(() => {
    // console.log("Document written with ID: ", docRef.id);
  });
});

// simulate a query for all locations
console.log("Querying for all locations");
const locationsGroup = collectionGroup(db, "locations");
const locationQuery = query(locationsGroup);
const locationQuerySnapshot = await getDocs(locationQuery);
locationQuerySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
});

// data prototype for provider services (as a subcollection)
console.log("Adding service document to provider");
const serviceRef = collection(
  db,
  "providers",
  exampleProvider.name,
  "services"
);
const serviceDocRef = doc(serviceRef, "Counseling");
const serviceDoc = {
  name: "Counseling",
  providerName: exampleProvider.name,
  allFIPS: ["06001", "06003", "06005"],
  limitedFIPS: ["06007", "06009"],
  languageFIPS: {
    Spanish: ["06001", "06003"],
    French: ["06005"],
  },
};

const serviceRef2 = collection(
  db,
  "providers",
  exampleProvider2.name,
  "services"
);
const serviceDocRef2 = doc(serviceRef2, "Counseling");
const serviceDoc2 = {
  name: "Counseling",
  providerName: exampleProvider2.name,
  allFIPS: ["06001", "06003", "06008"],
  limitedFIPS: ["06007", "06009"],
  languageFIPS: {
    Spanish: ["06001", "06003", "99999"],
    French: ["06005"],
  },
};

setDoc(serviceDocRef, serviceDoc).then(() => {
  //   console.log("Document written with ID: ", serviceDocRef.id);
});

setDoc(serviceDocRef2, serviceDoc2).then(() => {
  //   console.log("Document written with ID: ", serviceDocRef2.id);
});

// query for all providers of "Counseling" in FIPS nnnnn
console.log("Querying for all providers of 'Counseling'");
const servicesGroup = collectionGroup(db, "services");
const servicesQuery = query(
  servicesGroup,
  where("name", "==", "Counseling"),
  where("availableFIPS", "array-contains", "06008")
);
const servicesQuerySnapshot = await getDocs(servicesQuery);
servicesQuerySnapshot.forEach((doc) => {
  console.log(
    doc.data().providerName,
    "provides ",
    doc.data().name,
    "in nnnnnn"
  );
});

// NOTES:
// for data model may want an allFIPS field regardless of limited availability because that doesn't affect search results, only map display

// simulate query for provider dispaly:
console.log("Querying for provider info");
const providerDocRef = doc(providers, exampleProvider.name);
const providerDocSnap = await getDoc(providerDocRef);
if (providerDocSnap.exists()) {
  console.log("Provider data:", providerDocSnap.data());
}
//provider services
const servicesRef = collection(
  db,
  "providers",
  exampleProvider.name,
  "services"
);
const providerServicesQuerySnapshot = await getDocs(servicesRef);
providerServicesQuerySnapshot.forEach((doc) => {
  console.log(doc.data());
});

// query for service in fips with spanish language
console.log("Querying for service in FIPS with Spanish language");
const targetLanguage = "Spanish";
const targetFIPS = "99999";
const spanishServicesQuery = query(
  servicesGroup,
  where(`languageFIPS.${targetLanguage}`, "array-contains", targetFIPS)
);
const spanishServicesQuerySnapshot = await getDocs(spanishServicesQuery);
spanishServicesQuerySnapshot.forEach((doc) => {
  console.log(
    doc.data().providerName,
    "provides ",
    doc.data().name,
    `in ${targetLanguage} in FIPS ${targetFIPS}`
  );
});

// query for service in region
console.log("Querying for service in big list");
const bigList = [
  "51005",
  "51015",
  "51017",
  "51023",
  "51045",
  "51091",
  "51163",
  "51530",
  "51580",
  "51678",
  "51790",
  "51820",
  "06008",
];
// const targetRegion = regionCSUs.NorthernRegion;
const regionServicesQuery = query(
  servicesGroup,
  where("allFIPS", "array-contains-any", bigList)
);
// LIMITATION of 30 in array-contains-any
// So this would work for CSUs (largest is 11) but need a different approach for regions (largest is EXACTLY 30)
// This gets especially tricky with a language in region query
// May need to do this from a cloud function that filters as much as possible:
// 1. Get all services by service name that have the language
// 2. Get the region FIPS list (either in memory or as another db collection)
// 3. Find the providers with the union of the two lists
const regionServicesQuerySnapshot = await getDocs(regionServicesQuery);
if (regionServicesQuerySnapshot.empty) {
  console.log("No services found in region");
}
regionServicesQuerySnapshot.forEach((doc) => {
  console.log(
    doc.data().providerName,
    "provides ",
    doc.data().name,
    `in region`
  );
});

// query for service anywhere with a language
console.log("Querying for service anywhere with a language");
const languageServicesQuery = query(
  servicesGroup,
  where("languageFIPS.Spanish", "!=", {})
);
const languageServicesQuerySnapshot = await getDocs(languageServicesQuery);
if (languageServicesQuerySnapshot.empty) {
  console.log("No services found with language");
} else {
  languageServicesQuerySnapshot.forEach((doc) => {
    console.log(
      doc.data().providerName,
      "provides ",
      doc.data().name,
      `in Spanish (any language query)`
    );
  });
}
// by subcollection
const languageServicesRef = collectionGroup(db, "services");
const languageServicesQuery2 = query(
  languageServicesRef,
  orderBy("languageFIPS.Spanish")
);
const languageServicesQuerySnapshot2 = await getDocs(languageServicesQuery2);
if (languageServicesQuerySnapshot2.empty) {
  console.log("No services found with language");
}
languageServicesQuerySnapshot2.forEach((doc) => {
  console.log(
    doc.data().providerName,
    "provides ",
    doc.data().name,
    `in Spanish (any language query - using ORDERBY)`
  );
});

console.log("example using API to get all providers");

const providersFromAPI = API.getAllProviders();
console.log(providersFromAPI);
