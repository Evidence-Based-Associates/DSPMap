import { sortedCSUs } from "../../lib/csu.js";
import { API } from "../../api/api.js";
import { setRegionByCSU } from "../../lib/simplemaps/utils.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const csuID = urlParams.get("id");

export const thisCSU = sortedCSUs.find((csu) => csu.slug === csuID);
setRegionByCSU(thisCSU);
export const CSUProviders = await API.getAllProvidersByCSU(thisCSU);
export const CSUServices = await API.getAllServiceNamesByCSU(thisCSU);
export const providerServiceList = async (proivderId, csu) =>
  await API.getAllServicesByProviderInCSU(proivderId, csu);
export const serviceProvidersList = async (serviceName, csu) =>
  await API.getAllProvidersOfServiceInCSU(serviceName, csu);
