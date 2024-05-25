import {
  thisCSU,
  CSUProviders,
  CSUServices,
  providerServiceList,
  serviceProvidersList,
} from "./api.js";

const csuNameSpan = document.getElementById("csuName");
if (csuNameSpan) {
  csuNameSpan.innerHTML = thisCSU?.name || "CSU";
}

const providerList = document.getElementById("providerList");
CSUProviders.forEach(async (provider, key) => {
  const providerServices = await providerServiceList(key, thisCSU);
  const list = headingList(provider, providerServices);
  providerList?.appendChild(list);
});

const serviceList = document.getElementById("serviceList");
CSUServices.forEach(async (service) => {
  const serviceProviders = await serviceProvidersList(service, thisCSU);
  const list = headingList(service, serviceProviders);
  serviceList?.appendChild(list);
});

const headingList = (headingText, listItems) => {
  const container = document.createElement("div");
  const heading = document.createElement("h3");
  heading.classList.add("ebaBlue");
  heading.innerText = headingText;
  const list = document.createElement("ul");
  listItems.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
  container.appendChild(heading);
  container.appendChild(list);
  return container;
};
