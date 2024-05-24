import { API } from "../../api/api.js";
import { setMapLocations } from "../../lib/simplemaps/utils.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export const providerID = urlParams.get("id");

export const serviceFIPS = (/** @type {string} */ serviceName) => {
  return API.getServiceMapFIPS({ providerID, serviceName });
};

export const serviceNames = API.getProviderServices(providerID);
export const providerInfo = API.getProviderInfo(providerID);
export const allFIPS = API.getAllFIPS(providerID);
export const providerLanguages = API.getAllLanguages(providerID);

const locations = API.getAllLocations();
setMapLocations(locations);
