import {
  thisCSU,
  CSUProviders,
  CSUServices,
  providerServiceList,
  serviceProvidersList,
} from "./api.js";
import { setRegionByCSU } from "../../lib/simplemaps/utils.js";

setRegionByCSU(thisCSU);

const csuNameSpan = document.getElementById("csuName");
csuNameSpan.innerHTML = thisCSU.name;

const providerList = document.getElementById("providerList");
CSUProviders.forEach(async (provider, key) => {
  const providerLI = document.createElement("li");
  providerLI.classList.add("ebaBlue");
  providerLI.innerHTML = `<a href='../provider/index.html?id=${key}'>${provider}</a>`;
  providerList.appendChild(providerLI);
  const providerServices = await providerServiceList(key, thisCSU);

  const providerServicesList = document.createElement("ul");
  providerServices.forEach((service) => {
    const serviceLI = document.createElement("li");
    serviceLI.innerText = service;
    providerServicesList.appendChild(serviceLI);
  });
  providerList.appendChild(providerServicesList);
});

const serviceList = document.getElementById("serviceList");
CSUServices.forEach(async (service) => {
  const serviceLI = document.createElement("li");
  serviceLI.classList.add("ebaBlue");
  serviceLI.innerText = service;
  serviceLI.id = `${service}-provider-list`;

  serviceList.appendChild(serviceLI);
  const serviceProviders = await serviceProvidersList(service, thisCSU);

  console.log("service:", service);
  console.log("serviceProviders:", serviceProviders);
  const serviceProvidersUL = document.createElement("ul");
  serviceProvidersUL.id = `${service}-providers`;
  serviceProviders.forEach((provider, key) => {
    const providerLI = document.createElement("li");
    providerLI.innerHTML = `<a href='../provider/index.html?id=${key}'>${provider}</a>`;
    serviceProvidersUL.appendChild(providerLI);
  });
  serviceLI.appendChild(serviceProvidersUL);
});
