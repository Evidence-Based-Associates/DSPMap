import {
  CSUStructure,
  allFips,
  regionCSUs,
  sortedCSUs,
} from "../../lib/csu.js";
import dspsXML from "../../lib/getXML.js";
import { removeDuplicates } from "../../lib/utils.js";
import {
  locationText,
  locationType,
  serviceText,
  languageText,
  providerSearchResults,
} from "./api.js";

//get all entires for search later.
var locations = dspsXML.getElementsByTagName("FIPs");

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

// Search Form
let availableServices = [];
var serviceCheck = dspsXML.getElementsByTagName("Service");
for (var i = 0; i < serviceCheck.length; i++) {
  availableServices.push(serviceCheck.item(i).getAttribute("serviceName"));
}
availableServices = removeDuplicates(availableServices);
availableServices.sort();

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
  option.text = simplemaps_statemap_mapdata.state_specific[allFips[i]].name;
  whereSelect.appendChild(option);
}

var allLocations = dspsXML.getElementsByTagName("FIPs");
let allLanguagesArray = [];
for (var i = 0; i < allLocations.length; i++) {
  if (allLocations.item(i).getAttribute("languages")) {
    var serviceLanguageStr = allLocations.item(i).getAttribute("languages");
    while (serviceLanguageStr.indexOf(" ") >= 0) {
      serviceLanguageStr = serviceLanguageStr.replace(" ", "");
    }
    if (serviceLanguageStr.includes(",")) {
      var serviceLanguages = serviceLanguageStr.split(",");
      for (var j = 0; j < serviceLanguages.length; j++) {
        allLanguagesArray.push(serviceLanguages[j]);
      }
    } else {
      allLanguagesArray.push(allLocations.item(i).getAttribute("languages"));
    }
  }
}
allLanguagesArray = removeDuplicates(allLanguagesArray);
allLanguagesArray.sort();
for (let i = 0; i < allLanguagesArray.length; i++) {
  if (!allLanguagesArray[i] == "") {
    const option = document.createElement("option");
    option.value = allLanguagesArray[i];
    option.text = allLanguagesArray[i];
    document.getElementsByName("Language")[0].appendChild(option);
  }
}
