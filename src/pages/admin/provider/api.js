import { API } from "../../../api/api.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const updateProviderName = urlParams.get("name");

export const isNew = updateProviderName === null;
export const headerText = isNew
  ? "Add New Provider"
  : `Updating ${updateProviderName}`;

export const GOOGLE_API_KEY = await API.getGoogleMapsApiKey();
export const allAvailableServiceNames = await API.getAllServiceNames();
