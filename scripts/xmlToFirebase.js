import { db } from "./setup.js";
import * as fs from "fs";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
const options = {
  ignoreAttributes: false,
  allowBooleanAttributes: true,
  arrayMode: "strict",
};
const parser = new XMLParser(options);
const filepath = "../docs/data/dsps.xml";
const xmlData = fs.readFileSync(filepath, "utf8");
const jsonData = parser.parse(xmlData);
/**
 * @typedef {Object} Provider
 * @property {string} Name
 * @property {string} LastUpdated
 * @property {string} MapZoom
 * @property {string} Website
 * @property {string} ContactName
 * @property {string} ContactEmail
 * @property {string} id
 * @property {Office | Office[]} Office
 */
/**
 *
 * @typedef {Object} Office
 * @param {Object} office
 * @param {string} office.Lat
 * @param {string} office.Lng
 * @param {string} office.Street
 * @param {string} office.City
 * @param {string} office.State
 * @param {string} office.Zip
 * @param {string} office.Phone
 * @param {string} office.Fax
 */
/**
 *
 * @typedef {Object} Service
 * @param {Object} service
 * @param {string} service.Name
 * @param {string} service.Description
 */
/**
 *
 * @param {Provider} provider
 * @returns
 */
const convertProviderInfo = (provider) => {
  return {
    providerName: provider.Name,
    lastUpdated: provider.LastUpdated,
    contactName: provider.ContactName,
    contactEmail: provider.ContactEmail,
    website: provider.Website,
    defaultMapZoom: provider.MapZoom,
  };
};
/**
 *
 * @param {Office} office
 * @param {string} providerName
 */
const convertOfficeInfo = (office, providerName) => {
  return {
    providerName: providerName,
    lat: office.Lat,
    lng: office.Lng,
    street: office.Street,
    city: office.City,
    state: office.State,
    zip: office.Zip,
    phone: office.Phone,
  };
};
const convertServiceInfo = (service, providerName) => {
  if (service.length === 0) {
    return [];
  }
  const availableFIPS = new Set();
  const limitedFIPS = new Set();
  const languageFIPS = {};
  const allFIPS = new Set();
  const trackFIPS = (fip) => {
    const fipsText = fip["#text"].toString();
    allFIPS.add(fipsText);
    if (fip["@_travelReq"] === "N") {
      availableFIPS.add(fipsText);
    } else if (fip["@_travelReq"] === "Y") {
      limitedFIPS.add(fipsText);
    }
    if (fip["@_languages"]) {
      const langList = fip["@_languages"].split(",");
      langList.forEach((lang) => {
        const langKey = lang.trim();
        if (languageFIPS[langKey]) {
          languageFIPS[langKey].add(fipsText);
        } else {
          languageFIPS[langKey] = new Set([fipsText]);
        }
      });
    }
  };
  if (!service.FIPs || service.FIPs.length === undefined) {
    trackFIPS(service.FIPs);
  } else {
    service.FIPs.forEach((fip) => trackFIPS(fip));
  }
  return {
    providerName: providerName,
    serviceName: service["@_serviceName"],
    mapZoom: service["@_serviceZoom"],
    allFIPS,
    availableFIPS,
    limitedFIPS,
    languageFIPS,
  };
};
const saveProvider = async (
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
  console.log(`Saved ${providerInfo.providerName}`);
};
const allProviders = jsonData.DSPs.Provider;
allProviders.forEach((provider) => {
  const providerInfo = convertProviderInfo(provider);
  let providerOffices = [];
  if (provider.Office.length === undefined) {
    providerOffices.push(
      convertOfficeInfo(provider.Office, providerInfo.providerName)
    );
  } else {
    providerOffices = provider.Office.map((office) =>
      convertOfficeInfo(office, providerInfo.providerName)
    );
  }
  let providerServices = [];
  if (provider.Service.length === undefined) {
    providerServices.push(
      convertServiceInfo(provider.Service, providerInfo.providerName)
    );
  } else {
    providerServices = provider.Service.map((service) =>
      convertServiceInfo(service, providerInfo.providerName)
    );
  }
  saveProvider(providerInfo, providerServices, providerOffices);
  //   console.log(providerInfo);
  //   console.log(providerOffices);
  //   console.log(providerServices);
});

const availableServices = {
  "Case Management": [
    "High Fidelity Wraparound Intensive Care Coordination",
    "Mental Health Case Management",
    "Substance Use Case Management",
    "Reentry Case Management",
  ],
  "Clinical Services": [
    "Brief Strategic Family Therapy",
    "Family Centered Treatment",
    "Functional Family Therapy",
    "Intensive In-Home Services",
    "Multisystemic Therapy",
    "Parent Child Interaction Therapy",
    "Clinical Group",
    "Dialectical Behavioral Therapy",
    "Eye Movement Desensitization and Reprocessing",
    "Outpatient Therapy",
    "Specialized Individual Therapy",
    "Therapy for Exploited Youth",
    "Trauma Focused Cognitive Behavioral Therapy",
    "Substance Use Therapy",
    "Adolescent Community Reinforcement Approach",
    "Group Therapy for Substance Use",
    "Seven Challenges",
    "Substance Abuse Intensive Outpatient Program",
    "Therapy for Substance Use",
    "Youth with Sexualized Behaviors Therapy",
    "Group Therapy for Youth with Sexualized Behaviors",
    "Crisis Services",
  ],
  Evaluations: [
    "Mental Health Evaluation",
    "Psychological Evaluation",
    "Substance Use Evaluation",
    "Youth with Sexualized Behaviors Evaluation",
  ],
  "Non-Clinical Services": [
    "Behavior Intervention course",
    "Anger Management",
    "Conferencing and Mediation",
    "Employment and Workforce Services",
    "Supported Employment",
    "Vocational Training Program",
    "Gang Intervention Service",
    "GREAT Program Services",
    "Family Support Partner",
    "Mentoring",
    "Skill Building",
    "Dialectical Behavior Therapy Group",
    "Life Skills",
    "Mental Health Skill Building",
    "Moral Reconation Therapy Group",
    "Non-Clinical Skills Group",
    "Parenting Skills Intervention for Youth",
    "Thinking for a Change Group",
  ],
  "Residential Services": [
    "Residential Group Home",
    "Group Home",
    "Therapeutic Group Home",
    "Residential Independent Living",
    "Residential Transitional Living Program",
    "Residential Treatment Center",
  ],
  Other: ["Language Services", "Monitoring Services", "Transportation"],
};

Object.keys(availableServices).forEach((category) => {
  availableServices[category].sort();
});

const availableLanguages = [
  "Amharic",
  "Arabic",
  "Bengali",
  "Farsi",
  "French",
  "Kirundi",
  "Korean",
  "Kurdish",
  "Latvian",
  "Mandarin",
  "Nepali",
  "Portuguese",
  "Russian",
  "Sign Language (ASL)",
  "Spanish",
  "Urdu",
  "Vietnamese",
  "Language Line",
];
const metaDataRef = doc(db, "meta", "data");
updateDoc(metaDataRef, {
  availableServices,
  availableLanguages,
});
