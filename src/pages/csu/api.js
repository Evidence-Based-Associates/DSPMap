import { sortedCSUs } from "../../lib/csu.js";
import { setRegionByCSU } from "../../lib/simplemaps/utils.js";
import { getAllCSUServices } from "../../firebase.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const csuID = urlParams.get("id");

export const thisCSU = sortedCSUs.find((csu) => csu.slug === csuID);
setRegionByCSU(thisCSU);

export let CSUProviders = [];
export let CSUServices = [];

const providerServicesMap = new Map();
const serviceProvidersMap = new Map();
const serviceCollection = await getAllCSUServices(thisCSU);

if (serviceCollection) {
  serviceCollection.forEach((service) => {
    if (!providerServicesMap.has(service.providerName)) {
      const serviceSet = new Set();
      serviceSet.add(service.serviceName);
      providerServicesMap.set(service.providerName, serviceSet);
    } else {
      const serviceSet = providerServicesMap.get(service.providerName);
      serviceSet.add(service.serviceName);
      providerServicesMap.set(service.providerName, serviceSet);
    }
    if (!serviceProvidersMap.has(service.serviceName)) {
      const providerSet = new Set();
      providerSet.add(service.providerName);
      serviceProvidersMap.set(service.serviceName, providerSet);
    } else {
      const providerSet = serviceProvidersMap.get(service.serviceName);
      providerSet.add(service.providerName);
      serviceProvidersMap.set(service.serviceName, providerSet);
    }
  });
  CSUProviders = [
    ...new Set(serviceCollection.map((service) => service.providerName)),
  ].sort();
  CSUServices = [
    ...new Set(serviceCollection.map((service) => service.serviceName)),
  ].sort();
}

export const providerServiceList = (providerId) => {
  const services = providerServicesMap.get(providerId);
  return services ? Array.from(services) : [];
};

export const serviceProvidersList = (serviceName) => {
  const providers = serviceProvidersMap.get(serviceName);
  return providers ? Array.from(providers) : [];
};
