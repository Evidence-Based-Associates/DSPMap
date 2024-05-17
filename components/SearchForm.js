import { API } from "../api/api.js";
import { regionCSUs, sortedCSUs } from "../lib/csu.js";

const availableServices = API.getAllServiceNames();
const serviceSelect = document.createElement("select");
serviceSelect.name = "Service";
availableServices.forEach((service) => {
  const option = document.createElement("option");
  option.value = service;
  option.text = service;
  serviceSelect.appendChild(option);
});

const serviceLabel = document.createElement("label");
serviceLabel.innerText = "Service: ";
serviceLabel.htmlFor = "Service";

const whereSelect = document.createElement("select");
whereSelect.name = "Where";
sortedCSUs.forEach((csu) => {
  const option = document.createElement("option");
  option.value = csu.slug;
  option.text = csu.name;
  whereSelect.appendChild(option);
});
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
// @ts-ignore
const localities = simplemaps_statemap_mapdata.state_specific;
for (let fips in localities) {
  const option = document.createElement("option");
  option.value = fips;
  option.text = localities[fips].name;
  whereSelect.appendChild(option);
}
const whereLabel = document.createElement("label");
whereLabel.innerText = "Where: ";
whereLabel.htmlFor = "Where";

const availableLanguages = API.getAllLanguages();
const languageSelect = document.createElement("select");
languageSelect.name = "Language";
const englishOption = document.createElement("option");
englishOption.value = "English";
englishOption.text = "English";
languageSelect.appendChild(englishOption);

const spanishOption = document.createElement("option");
spanishOption.value = "Spanish";
spanishOption.text = "Spanish";
languageSelect.appendChild(spanishOption);
availableLanguages.forEach((language) => {
  if (language === "" || language === "Spanish") {
    return;
  }
  const option = document.createElement("option");
  option.value = language;
  option.text = language;
  languageSelect.appendChild(option);
});
const languageLabel = document.createElement("label");
languageLabel.innerText = "Language: ";
languageLabel.htmlFor = "Language";

const searchButton = document.createElement("button");
searchButton.type = "submit";
searchButton.innerText = "Search";

// create a search form
const searchForm = document.createElement("form");
searchForm.method = "GET";
const searchHeader = document.createElement("h2");
searchHeader.innerText = "Search";
searchHeader.className = "ebaBlue";
searchForm.appendChild(searchHeader);
searchForm.appendChild(serviceLabel);
searchForm.appendChild(serviceSelect);
searchForm.appendChild(whereLabel);
searchForm.appendChild(whereSelect);
searchForm.appendChild(languageLabel);
searchForm.appendChild(languageSelect);
searchForm.appendChild(searchButton);

const insertSearchForm = () => {
  const formContainer = document.getElementById("searchForm");
  if (!formContainer) {
    return;
  }
  formContainer.innerHTML = searchForm.outerHTML;
};

export default insertSearchForm;
