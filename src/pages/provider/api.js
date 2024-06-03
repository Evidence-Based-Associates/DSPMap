import {
  getProvider,
  getProviderLocations,
  getProviderServices,
} from "../../firebase.js";
import {
  setAllDefaultColor,
  setMapCSURegions,
  setMapLocations,
  zoomToRegion,
} from "../../lib/simplemaps/utils.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export const providerID = urlParams.get("id") || undefined;

setMapCSURegions();
setAllDefaultColor();

export let providerInfo = {};
const providerDoc = await getProvider(providerID);
if (providerDoc) {
  providerDoc.lastUpdated = new Date(
    providerDoc.lastUpdated
  ).toLocaleDateString();
  providerInfo = providerDoc;
}

const providerLocations = await getProviderLocations(providerID);
if (providerLocations) {
  const locations = [];
  providerLocations.forEach((location) => {
    locations.push({
      providerName: location.providerName,
      providerId: location.providerName,
      street: location.street,
      city: location.city,
      state: location.state,
      zip: location.zip,
      lat: location.lat,
      lng: location.lng,
      phone: location.phone,
    });
  });
  setMapLocations(locations);
}

export let serviceNames = [];
export let allFIPS = [];
export let providerLanguages = [];
const providerServices = await getProviderServices(providerID);
if (providerServices) {
  serviceNames = providerServices.map((service) => service.serviceName);
  const fipsSet = new Set();
  providerServices.forEach((service) => {
    service.allFIPS.forEach((fips) => {
      fipsSet.add(fips);
    });
  });
  allFIPS = Array.from(fipsSet);

  const languageSet = new Set();
  providerServices.forEach((service) => {
    const languageFIPS = service.languageFIPS;
    Object.keys(languageFIPS).forEach((language) => {
      languageSet.add(language);
    });
  });
  providerLanguages = Array.from(languageSet);
}

export const serviceFIPS = (serviceName) => {
  if (providerServices.length === 0) {
    return {};
  }
  const targetService = providerServices.find(
    (service) => service.serviceName === serviceName
  );
  if (!targetService) {
    return {};
  }
  const allFIPS = targetService.allFIPS;
  const limitedFIPS = targetService.limitedFIPS;
  const languageFIPS = targetService.languageFIPS;
  const availableFIPS = allFIPS.filter((fips) => !limitedFIPS.includes(fips));
  const languageArray = Object.keys(languageFIPS).map((language) => {
    return { [language]: languageFIPS[language] };
  });
  return {
    available: availableFIPS,
    limited: limitedFIPS,
    languages: languageArray,
  };
};

export const hasTelehealth = (serviceName) => {
  if (providerServices.length === 0) {
    return false;
  }
  const targetService = providerServices.find(
    (service) => service.serviceName === serviceName
  );
  if (!targetService) {
    return false;
  }
  return targetService.hasTelehealth;
};

// @ts-ignore
if (typeof simplemaps_statemap.region_zoom === "function") {
  // @ts-ignore
  simplemaps_statemap.region_zoom(providerInfo.defaultMapZoom);
} else {
  zoomToRegion(providerInfo.defaultMapZoom);
}
