import { getAllServicesInFIPS } from "../../firebase.js";
import { zoomToFIPS } from "../../lib/simplemaps/utils.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export const fipsID = urlParams.get("id");

zoomToFIPS(fipsID);

const serviceCollection = await getAllServicesInFIPS(fipsID);
export let providers = new Map();
if (serviceCollection) {
  providers = new Map(
    serviceCollection.map((service) => {
      return [service.providerName, service.providerName];
    })
  );
}

export const providerServices = (providerID) => {
  const providerServices = serviceCollection.filter(
    (service) => service.providerName === providerID
  );
  return providerServices.map((service) => service.serviceName);
};
