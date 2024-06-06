import {
  thisCSU,
  CSUProviders,
  CSUServices,
  providerServiceList,
  serviceProvidersList,
} from "./api.js";
import { headingList } from "../../lib/utils.js";

const csuNameSpan = document.getElementById("csuName");
if (csuNameSpan) {
  csuNameSpan.innerHTML = thisCSU?.name || "CSU";
}

const providerDiv = document.getElementById("providerList");
CSUProviders.forEach((provider) => {
  const providerServices = providerServiceList(provider);

  const providerLinkHTML = `<a href="../provider/index.html?id=${provider}">${provider}</a>`;
  const list = headingList(providerLinkHTML, providerServices);

  const col = document.createElement("div");
  col.className = "col col-mb-3 mt-3";
  col.appendChild(list);
  providerDiv?.appendChild(col);
});

const serviceList = document.getElementById("serviceList");
CSUServices.forEach((service) => {
  const serviceProviders = serviceProvidersList(service);
  const list = headingList(service, serviceProviders);

  const col = document.createElement("div");
  col.className = "col col-mb-3 mt-3";
  col.appendChild(list);

  serviceList?.appendChild(col);
});
