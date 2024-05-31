import { getProvider, getProviderServices } from "../../firebase.js";
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
const locations = [];
const providerDoc = await getProvider(providerID);
if (providerDoc) {
  providerInfo = providerDoc;

  providerInfo.offices.forEach((office) => {
    locations.push({
      providerName: providerInfo.providerName,
      providerId: providerInfo.providerName,
      street: office.street,
      city: office.city,
      state: office.state,
      zip: office.zip,
      lat: office.lat,
      lng: office.lng,
      phone: office.phone,
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

// @ts-ignore
if (typeof simplemaps_statemap.region_zoom === "function") {
  // @ts-ignore
  simplemaps_statemap.region_zoom(providerInfo.defaultMapZoom);
} else {
  zoomToRegion(providerInfo.defaultMapZoom);
}
