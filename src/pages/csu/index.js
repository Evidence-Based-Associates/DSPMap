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

const headingList = (headingContent, listItems) => {
  const providerCard = document.createElement("div");
  providerCard.className = "card";
  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";

  const providerTitle = document.createElement("h5");
  providerTitle.className = "card-title";
  providerTitle.innerHTML = headingContent;
  cardHeader.appendChild(providerTitle);

  const list = document.createElement("ul");
  list.className = "list-group-flush mt-2";
  listItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerText = item;
    list.appendChild(li);
  });

  providerCard.appendChild(cardHeader);
  providerCard.appendChild(list);
  return providerCard;
};

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
