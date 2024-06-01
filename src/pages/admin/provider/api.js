import { appState, toggleLanguageFIPS, toggleServiceFIPS } from "./state.js";
import { setMapCSURegions } from "../../../lib/simplemaps/utils.js";
import {
  getAllProviders,
  getProviderLocations as getProviderLocationsAPI,
  getProviderServices as getProviderServicesAPI,
  saveProvider as saveProviderAPI,
  getMetaData,
  getProvider,
  getGoogleMapsApiKey,
} from "../../../firebase.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const updateProviderName = urlParams.get("name");

export const isNew = updateProviderName === null;

// map changes before async API calls
setMapCSURegions(true);
simplemaps_statemap.hooks.click_state = (/** @type {string} */ id) => {
  if (appState.isLanguageMode) {
    toggleLanguageFIPS(id);
    return;
  }
  toggleServiceFIPS(id);
};

export let existingProviders = [];
const providerCollection = await getAllProviders();
if (providerCollection) {
  existingProviders = providerCollection.map((provider) => {
    return {
      id: provider.providerName,
      name: provider.providerName,
      ...provider,
    };
  });
}

export const getProviderInfo = async (providerName) =>
  await getProvider(providerName);
// export const getProviderLocations = () => {};
export const getProviderLocations = async (providerName) =>
  await getProviderLocationsAPI(providerName);
export const getProviderServices = async (providerName) =>
  await getProviderServicesAPI(providerName);

export const GOOGLE_API_KEY = await getGoogleMapsApiKey();

const metaData = await getMetaData();
export let allAvailableServiceNames = [];
export let allAvailableLanguages = [];
if (metaData) {
  allAvailableServiceNames = metaData.availableServices.sort();
  allAvailableLanguages = metaData.availableLanguages.sort();
}
export const saveProvider = async (providerInfo, serviceInfo, locationInfo) =>
  await saveProviderAPI(providerInfo, serviceInfo, locationInfo);
