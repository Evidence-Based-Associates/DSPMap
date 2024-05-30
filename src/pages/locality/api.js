import { API } from "../../api/api.js";
import { setMapLocations } from "../../lib/simplemaps/utils.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export const fipsID = urlParams.get("id");

export const providers = await API.getAllProvidersByFIPS(fipsID);
export const providerServices = async (providerId) => {
  return await API.getAllServicesByProviderInFIPS(providerId, fipsID);
};

const locations = await API.getAllLocations();
setMapLocations(locations);
