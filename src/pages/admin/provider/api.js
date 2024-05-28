import { API } from "../../../api/api.js";
import { appState, toggleServiceFIPS } from "./state.js";
import { colorFIPS, setMapCSURegions } from "../../../lib/simplemaps/utils.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const updateProviderName = urlParams.get("name");

// map changes before async API calls
setMapCSURegions(true);
simplemaps_statemap.hooks.click_state = (/** @type {string} */ id) => {
  toggleServiceFIPS(id);
};

export const isNew = updateProviderName === null;
export const headerText = isNew
  ? "Add New Provider"
  : `Updating ${updateProviderName}`;

export const GOOGLE_API_KEY = await API.getGoogleMapsApiKey();
export const allAvailableServiceNames = await API.getAllServiceNames();
