import { API } from "../../api/api.js";
import {
  setAllDefaultColor,
  setMapCSURegions,
  setMapLocations,
} from "../../lib/simplemaps/utils.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export const providerID = urlParams.get("id") || undefined;

setMapCSURegions();
setAllDefaultColor();

export const serviceFIPS = async (/** @type {string} */ serviceName) => {
  const serviceArea = await API.getServiceMapFIPS({ providerID, serviceName });
  return serviceArea;
};

export const serviceNames = await API.getProviderServices(providerID);
export const providerInfo = await API.getProviderInfo(providerID);
// @ts-ignore
simplemaps_statemap.region_zoom(providerInfo.defaultMapZoom);
export const allFIPS = await API.getAllFIPS(providerID);
export const providerLanguages = await API.getAllLanguages(providerID);

const locations = await API.getAllLocations();
setMapLocations(locations);
