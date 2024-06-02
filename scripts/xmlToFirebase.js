import { db } from "./setup.js";
import * as fs from "fs";
import { XMLParser, XMLValidator } from "fast-xml-parser";

const options = {
  ignoreAttributes: false,
  // parseAttributeValue: true,
  allowBooleanAttributes: true,
};
const parser = new XMLParser(options);

const filepath = "../docs/data/dsps.xml";

const xmlData = fs.readFileSync(filepath, "utf8");
const jsonData = parser.parse(xmlData);
// console.log(jsonData.DSPs.Provider[1]);

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
// '#text' string
// '@_travelReq' Y | N
/**
 *
 * @param {Provider} provider
 * @returns
 */
const convertProviderInfo = (provider) => {
  //   console.log(provider["@_id"]);
  //   console.log(provider.Office);
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
  console.log("Service Name: ", service["@_serviceName"]);
  console.log("SERVICE FIPS", service.FIPs);
  const availableFIPS = new Set();
  const limitedFIPS = new Set();
  const languageFIPS = {};
  const allFIPS = new Set();

  service.FIPs.forEach((fip) => {
    allFIPS.add(fip["#text"]);
    if (fip["@_travelReq"] === "N") {
      availableFIPS.add(fip["#text"]);
    } else if (fip["@_travelReq"] === "Y") {
      limitedFIPS.add(fip["#text"]);
    }
    if (fip["@_languages"]) {
      const langList = fip["@_languages"].split(",");
      langList.forEach((lang) => {
        const langKey = lang.trim();
        if (languageFIPS[langKey]) {
          languageFIPS[langKey].add(fip["#text"]);
        } else {
          languageFIPS[langKey] = new Set([fip["#text"]]);
        }
      });
    }
  });
  // convert languageFIPS entries to arrays
  for (const lang in languageFIPS) {
    languageFIPS[lang] = Array.from(languageFIPS[lang]);
  }
  return {
    providerName: providerName,
    serviceName: service["@_serviceName"],
    mapZoom: service["@_serviceZoom"],
    allFIPS: Array.from(allFIPS),
    availableFIPS: Array.from(availableFIPS),
    limitedFIPS: Array.from(limitedFIPS),
    languageFIPS: languageFIPS,
  };
};

const providerInfo = convertProviderInfo(jsonData.DSPs.Provider[0]);
const officeInfo = convertOfficeInfo(
  jsonData.DSPs.Provider[0].Office,
  providerInfo.providerName
);
const convertedService = convertServiceInfo(
  jsonData.DSPs.Provider[3].Service[0],
  jsonData.DSPs.Provider[3].Name
);
console.log(convertedService);
