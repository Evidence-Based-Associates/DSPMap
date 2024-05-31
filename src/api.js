import { getAllProviders, getMetaData } from "./firebase.js";
import { setMapCSURegions, setMapLocations } from "./lib/simplemaps/utils.js";

// Initial map setup must come before async calls
setMapCSURegions();

const metaData = await getMetaData();

export let lastUpdated = "UNKNOWN";
export let availableServices = [];
export let availableLanguages = [];
if (metaData) {
  lastUpdated = new Date(metaData.lastUpdated).toLocaleDateString();
  availableServices = metaData.availableServices;
  availableLanguages = metaData.availableLanguages;
  console.log(lastUpdated);
}

const providerCollection = await getAllProviders();
export let providers = [];
export let locations = [];
if (providerCollection) {
  providers = providerCollection.map((provider) => {
    return {
      id: provider.providerName,
      name: provider.providerName,
    };
  });
  providerCollection.forEach((provider) => {
    provider.offices.forEach((office) => {
      locations.push({
        providerName: provider.providerName,
        providerId: provider.providerName,
        street: office.street,
        city: office.city,
        state: office.state,
        zip: office.zip,
        lat: office.lat,
        lng: office.lng,
        phone: office.phone,
      });
    });
  });
}

setMapLocations(locations);
