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

  const providerLinkHTML = `<a href="../provider/index.html?id=${key}">${provider}</a>`;
  const list = headingList(providerLinkHTML, providerServices);
  providerList?.appendChild(list);
});

const serviceList = document.getElementById("serviceList");
CSUServices.forEach(async (service) => {
  const serviceProviders = await serviceProvidersList(service, thisCSU);
  const list = headingList(service, serviceProviders);
  serviceList?.appendChild(list);
});

const headingList = (headingContent, listItems) => {
  const container = document.createElement("div");
  const heading = document.createElement("h3");
  heading.classList.add("ebaBlue");
  heading.innerHTML = headingContent;
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
