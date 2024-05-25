import { API } from "../../api/api.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export const serviceID = urlParams.get("id");

const allServiceNames = await API.getAllServiceNames();

export const serviceName = serviceID
  ? await allServiceNames[serviceID]
  : "None";
export const providers = await API.getAllProvidersOfService(serviceName);
export const serviceFIPS = await API.getServiceMapFIPS({
  serviceName,
});

console.log(serviceFIPS);
