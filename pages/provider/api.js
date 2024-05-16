import { API } from "../../api/api.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export const providerID = urlParams.get("id");

export const serviceFIPS = (/** @type {string} */ serviceName) => {
  return API.getServiceMapFIPS(providerID, serviceName);
};

export const serviceNames = API.getProviderServices(providerID);
export const providerInfo = API.getProviderInfo(providerID);
