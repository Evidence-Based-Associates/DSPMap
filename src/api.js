import { getAllLocations, getAllProviders, getMetaData } from "./firebase.js";
import { setMapCSURegions, setMapLocations } from "./lib/simplemaps/utils.js";

// Initial map setup must come before async calls
setMapCSURegions();

const metaData = await getMetaData();

export let lastUpdated = "UNKNOWN";
export let availableServices = [];
export let availableLanguages = [];
if (metaData) {
  lastUpdated = new Date(metaData.lastUpdated).toLocaleDateString();
  availableServices = metaData.availableServices.sort();
  availableLanguages = metaData.availableLanguages.sort();
}

const providerCollection = await getAllProviders();
export let providers = [];
if (providerCollection) {
  providers = providerCollection.map((provider) => {
    return {
      id: provider.providerName,
      name: provider.providerName,
    };
  });
}

const locationCollection = await getAllLocations();
if (locationCollection) {
  const locations = locationCollection.map((location) => {
    return {
      providerName: location.providerName,
      providerId: location.providerName,
      street: location.street,
      city: location.city,
      state: location.state,
      zip: location.zip,
      lat: location.lat,
      lng: location.lng,
      phone: location.phone,
    };
  });
  setMapLocations(locations);
}
