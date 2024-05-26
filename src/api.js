import { API } from "./api/api.js";
import { setMapCSURegions, setMapLocations } from "./lib/simplemaps/utils.js";

// Initial map setup must come before async calls
setMapCSURegions();

export const lastUpdated = await API.getLastUpdated();
export const availableServices = await API.getAllServiceNames();
export const availableLanguages = await API.getAllLanguages();
export const providers = await API.getAllProviders();

const locations = await API.getAllLocations();
setMapLocations(locations);
