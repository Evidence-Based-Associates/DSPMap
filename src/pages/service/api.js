import { API } from "../../api/api.js";
import { getAllServicesByName, getMetaData } from "../../firebase.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export const serviceID = urlParams.get("id");

const metaData = await getMetaData();
const allServiceNames = metaData?.availableServices.sort() || [];

export const serviceName = serviceID
  ? await allServiceNames[serviceID]
  : "None";

const serviceList = await getAllServicesByName(serviceName);
console.log(serviceList);
export const providers = await API.getAllProvidersOfService(serviceName);
export const serviceFIPS = await API.getServiceMapFIPS({
  serviceName,
});
