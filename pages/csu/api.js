import { sortedCSUs } from "../../lib/csu.js";
import { API } from "../../api/api.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const csuID = urlParams.get("id");

export const thisCSU = sortedCSUs.find((csu) => csu.slug === csuID);
export const CSUProviders = API.getAllProvidersByCSU(thisCSU);
export const CSUServices = API.getAllServiceNamesByCSU(thisCSU);
export const providerServiceList = (proivderId, csu) =>
  API.getAllServicesByProviderInCSU(proivderId, csu);
export const serviceProvidersList = (serviceName, csu) =>
  API.getAllProvidersOfServiceInCSU(serviceName, csu);
