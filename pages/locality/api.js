import { API } from "../../api/api.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export const fipsID = urlParams.get("id");

export const providers = API.getAllProvidersByFIPS(fipsID);
export const providerServices = (providerId) => {
  return API.getAllServicesByProviderInFIPS(providerId, fipsID);
};
