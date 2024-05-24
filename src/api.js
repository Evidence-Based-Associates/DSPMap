import { API } from "./api/api.js";
import { setMapCSURegions, setMapLocations } from "./lib/simplemaps/utils.js";

// Initial map setup must come before async calls
setMapCSURegions();
setMapLocations();

export const lastUpdated = API.getLastUpdated();
export const availableServices = API.getAllServiceNames();
export const availableLanguages = API.getAllLanguages();
export const providers = API.getAllProviders();

export const apiTest = await API.test();
console.log("API_TEST", apiTest);
