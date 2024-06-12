import { getAllServicesByName, getMetaData } from "../../firebase.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export const serviceName = urlParams.get("name");

const metaData = await getMetaData();
const allServices = metaData?.availableServices || {};

// export const serviceName = serviceID
//   ? allServices[serviceID]
//   : "None";

const serviceList = await getAllServicesByName(serviceName);
export let providers = new Map();
if (serviceList) {
  providers = new Map(
    serviceList.map((service) => {
      return [service.providerName, service.providerName];
    })
  );
}

export const getFIPS = () => {
  if (!serviceList) {
    return;
  }

  const availableFIPS = new Set();
  const limitedFIPS = new Set();
  const languageFIPS = {};
  for (const service of serviceList) {
    service.availableFIPS.forEach((fips) => availableFIPS.add(fips));
    service.limitedFIPS.forEach((fips) => limitedFIPS.add(fips));
    for (const [language, fips] of Object.entries(service.languageFIPS)) {
      if (!languageFIPS[language]) {
        languageFIPS[language] = new Set();
      }
      fips.forEach((fips) => languageFIPS[language].add(fips));
    }
  }

  return {
    available: Array.from(availableFIPS),
    limited: Array.from(limitedFIPS),
    language: languageFIPS,
  };
};

export const serviceFIPS = getFIPS();
