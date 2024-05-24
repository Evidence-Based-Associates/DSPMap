import { API } from "./api/api.js";
import { setMapCSURegions, setMapLocations } from "./lib/simplemaps/utils.js";

// Initial map setup must come before async calls
setMapCSURegions();

export const lastUpdated = await API.getLastUpdated();
export const availableServices = API.getAllServiceNames();
export const availableLanguages = API.getAllLanguages();
export const providers = API.getAllProviders();

const locations = await API.getAllLocations();
console.log("LOCATIONS", locations);
setMapLocations(locations);

export const apiTest = await API.test();
console.log("API_TEST", apiTest);
