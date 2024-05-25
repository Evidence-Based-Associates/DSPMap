import { API } from "../../api/api.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export const serviceID = urlParams.get("id");

export const serviceName = serviceID
  ? API.getAllServiceNames()[serviceID]
  : "None";
export const providers = API.getAllProvidersOfService(serviceName);
export const serviceFIPS = API.getServiceMapFIPS({
  serviceName,
});
