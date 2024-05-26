import {
  lastUpdated,
  availableServices,
  availableLanguages,
  providers,
} from "./api.js";
import { regionCSUs, sortedCSUs, allFips, CSUStructure } from "./lib/csu.js";

const lastUpdatedSpan = document.getElementById("lastUpdated");
lastUpdatedSpan.innerText = lastUpdated;

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

const regionListUL = document.getElementById("regionList");
for (let i = 0; i < CSUStructure.length; i++) {
  const regionHeading = document.createElement("h3");
  regionHeading.innerText = CSUStructure[i].name;
  regionHeading.className = "ebaBlue";

  const csuUL = document.createElement("ul");
  for (let j = 0; j < CSUStructure[i].CSUs.length; j++) {
    const csuLI = document.createElement("li");
    csuLI.innerHTML = `<a href="pages/csu/index.html?id=${CSUStructure[i].CSUs[j].slug}">${CSUStructure[i].CSUs[j].name}</a>`;
    csuUL.appendChild(csuLI);
  }
  regionListUL.appendChild(regionHeading);
  regionListUL.appendChild(csuUL);
}

const providerUL = document.getElementById("providerList");
providers.forEach((provider) => {
  const providerLI = document.createElement("li");
  providerLI.innerHTML = `<a href="pages/provider/index.html?id=${provider.id}">${provider.name}</a>`;
  providerUL.appendChild(providerLI);
});

const serviceUL = document.getElementById("serviceList");
availableServices.forEach((service, index) => {
  const serviceLI = document.createElement("li");
  serviceLI.innerHTML = `<a href="pages/service/index.html?id=${index}">${service}</a>`;
  serviceUL.appendChild(serviceLI);
});

const languageUL = document.getElementById("languageList");
availableLanguages.forEach((language, index) => {
  const languageLI = document.createElement("li");
  languageLI.innerHTML = `<a href="pages/language/index.html?id=${index}">${language}</a>`;
  languageUL.appendChild(languageLI);
});
