import { API } from "../../api/api.js";
import { allFips, regionCSUs, sortedCSUs } from "../../lib/csu.js";
import {
  locationText,
  serviceText,
  languageText,
  providerSearchResults,
} from "./api.js";

document.getElementById("serviceTextSpan").innerText = serviceText;
document.getElementById("locationTextSpan").innerText = locationText;
document.getElementById("languageTextSpan").innerText = languageText;

//cycle through all location items

if (providerSearchResults.size == 0) {
  const noResults = document.getElementById("noResults");
  noResults.hidden = false;
}
const searchResultsUL = document.getElementById("searchResults");
providerSearchResults.forEach((provider, key) => {
  const providerLI = document.createElement("li");
  providerLI.innerHTML = `<a href="../provider/index.html?id=${key}">${provider}</a>`;
  searchResultsUL.appendChild(providerLI);
});

const availableServices = API.getAllServiceNames();
const serviceSelect = document.getElementsByName("Service")[0];
availableServices.forEach((service) => {
  const option = document.createElement("option");
  option.value = service;
  option.text = service;
  serviceSelect.appendChild(option);
});

const whereSelect = document.getElementsByName("Where")[0];
//Cycle through CSUs
for (let i = 0; i < sortedCSUs.length; i++) {
  // create an option for each CSU
  const option = document.createElement("option");
  option.value = sortedCSUs[i].slug;
  option.text = sortedCSUs[i].name;
  whereSelect.appendChild(option);
}
const regionBreakOption = document.createElement("option");
regionBreakOption.value = "0";
regionBreakOption.text = "-----REGIONS-----";
whereSelect.appendChild(regionBreakOption);
//Cycle through Regions
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
  // @ts-ignore
  option.text = simplemaps_statemap_mapdata.state_specific[allFips[i]].name;
  whereSelect.appendChild(option);
}

const availableLanguages = API.getAllLanguages();
for (let i = 0; i < availableLanguages.length; i++) {
  if (availableLanguages[i] != "") {
    const option = document.createElement("option");
    option.value = availableLanguages[i];
    option.text = availableLanguages[i];
    document.getElementsByName("Language")[0].appendChild(option);
  }
}
