import { allFips, regionCSUs, sortedCSUs } from "../../lib/csu.js";
import {
  locationText,
  serviceText,
  languageText,
  providerSearchResults,
  availableServices,
  availableLanguages,
} from "./api.js";

import { config } from "../../../config.js";

if (config.ENV === "DEV") {
  const envAlert = document.getElementById("envAlert");
  envAlert?.removeAttribute("hidden");
}

const serviceSpanText = document.getElementById("serviceTextSpan");
if (serviceSpanText) {
  serviceSpanText.innerText = serviceText;
}

const locationSpanText = document.getElementById("locationTextSpan");
if (locationSpanText) {
  locationSpanText.innerText = locationText;
}

const languageSpanText = document.getElementById("languageTextSpan");
if (languageSpanText) {
  languageSpanText.innerText = languageText;
}

//cycle through all location items

if (providerSearchResults.size == 0) {
  const noResults = document.getElementById("noResults");
  if (noResults) {
    noResults.hidden = false;
  }
}
const searchResultsSection = document.getElementById("searchResults");
if (searchResultsSection) {
  providerSearchResults.forEach((provider, key) => {
    const providerItem = document.createElement("div");
    providerItem.className = "col-3 mx-2 my-2";
    providerItem.innerHTML = `<a href="../provider/index.html?id=${key}">${provider}</a>`;
    searchResultsSection.appendChild(providerItem);
  });
}

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

for (let i = 0; i < availableLanguages.length; i++) {
  const language = availableLanguages[i];
  if (language != "" && language != "Spanish") {
    const option = document.createElement("option");
    option.value = language;
    option.text = language;
    document.getElementsByName("Language")[0].appendChild(option);
  }
}
