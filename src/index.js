import {
  lastUpdated,
  availableServices,
  availableLanguages,
  providers,
  servicesWithCategories,
} from "./api.js";
import { regionCSUs, sortedCSUs, allFips, CSUStructure } from "./lib/csu.js";
import { headingList, serviceCategoryCard } from "./lib/utils.js";

const lastUpdatedSpan = document.getElementById("lastUpdated");
if (lastUpdatedSpan) {
  lastUpdatedSpan.innerText = lastUpdated;
}

const serviceSelect = document.getElementsByName("Service")[0];
availableServices.forEach((service) => {
  const option = document.createElement("option");
  option.value = service;
  option.text = service;
  serviceSelect.appendChild(option);
});

const whereSelect = document.getElementsByName("Where")[0];

for (let i = 0; i < sortedCSUs.length; i++) {
  const option = document.createElement("option");
  option.value = sortedCSUs[i].slug;
  option.text = sortedCSUs[i].name;
  whereSelect.appendChild(option);
}
const regionBreakOption = document.createElement("option");
regionBreakOption.value = "0";
regionBreakOption.text = "-----REGIONS-----";
whereSelect.appendChild(regionBreakOption);

for (let region in regionCSUs) {
  const option = document.createElement("option");
  option.value = regionCSUs[region].slug;
  option.text = regionCSUs[region].name;
  whereSelect.appendChild(option);
}
const localityBreakOption = document.createElement("option");
localityBreakOption.value = "0";
localityBreakOption.text = "-----LOCALITIES-----";
whereSelect.appendChild(localityBreakOption);
for (let i = 0; i < allFips.length; i++) {
  const option = document.createElement("option");
  option.value = allFips[i];
  // @ts-ignore (global variable)
  option.text = simplemaps_statemap_mapdata.state_specific[allFips[i]].name;
  whereSelect.appendChild(option);
}

for (let i = 0; i < availableLanguages.length; i++) {
  const language = availableLanguages[i];
  if (language != "" && language != "Spanish") {
    const option = document.createElement("option");
    option.value = language;
    option.text = language;
    document.getElementsByName("Language")[0].appendChild(option);
  }
}

const regionCardsDiv = document.getElementById("regionCards");
for (let i = 0; i < CSUStructure.length; i++) {
  const regionCol = document.createElement("div");
  regionCol.className = "col col-mb-3 mt-3";

  const regionCard = document.createElement("div");
  regionCard.className = "card";

  const regionCardBody = document.createElement("div");
  regionCardBody.className = "card-body";

  const regionCardTitle = document.createElement("h5");
  regionCardTitle.className = "card-title";
  regionCardTitle.innerText = CSUStructure[i].name;

  const csuUL = document.createElement("ul");
  csuUL.className = "list-group-flush";
  for (let j = 0; j < CSUStructure[i].CSUs.length; j++) {
    const csuLI = document.createElement("li");
    csuLI.className = "list-group-item";
    csuLI.innerHTML = `<a href="pages/csu/index.html?id=${CSUStructure[i].CSUs[j].slug}">${CSUStructure[i].CSUs[j].name}</a>`;
    csuUL.appendChild(csuLI);
  }

  regionCardBody.appendChild(regionCardTitle);
  regionCardBody.appendChild(csuUL);
  regionCard.appendChild(regionCardBody);
  regionCol.appendChild(regionCard);
  if (regionCardsDiv) {
    regionCardsDiv.appendChild(regionCol);
  }
}

const providersDiv = document.getElementById("providerList");
providers.forEach((provider) => {
  const providerItem = document.createElement("div");
  providerItem.className = "col col-mb-3 mt-3";
  providerItem.innerHTML = `<a href="pages/provider/index.html?id=${provider.id}">${provider.name}</a>`;
  if (providersDiv) {
    providersDiv.appendChild(providerItem);
  }
});

const servicesDiv = document.getElementById("serviceList");

Object.keys(servicesWithCategories).forEach((category) => {
  const serviceList = servicesWithCategories[category];

  // const link = `<a href="pages/service/index.html?name=${service}">${service}</a>`;
  const list = serviceCategoryCard(category, serviceList);

  const col = document.createElement("div");
  col.className = "col col-mb-3 mt-3";
  col.appendChild(list);
  servicesDiv?.appendChild(col);
});
// availableServices.forEach((service, index) => {
//   const serviceItem = document.createElement("div");
//   serviceItem.className = "col col-mb-3 mt-3";
//   serviceItem.innerHTML = `<a href="pages/service/index.html?name=${service}">${service}</a>`;
//   if (servicesDiv) {
//     servicesDiv.appendChild(serviceItem);
//   }
// });

const languageDiv = document.getElementById("languageList");
availableLanguages.forEach((language, index) => {
  const languageItem = document.createElement("div");
  languageItem.className = "col col-mb-3 mt-3";
  languageItem.innerHTML = `<a href="pages/language/index.html?id=${index}">${language}</a>`;
  if (languageDiv) {
    languageDiv.appendChild(languageItem);
  }
});
