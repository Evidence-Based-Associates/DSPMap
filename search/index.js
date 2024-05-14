import { CSUStructure, allFips, regionCSUs, sortedCSUs } from "../src/csu.js";
import dspsXML from "../src/getXML.js";
import { removeDuplicates } from "../src/utils.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const [serviceName, locationID, languageName] = urlParams.values();

// var searchParamaters = queryString.split("&");
// var serviceIndex = searchParamaters[0].split("="); //use ServiceIndex[1]
// var locationIndex = searchParamaters[1].split("="); //use locationIndex[1]
// //var locationIndex = locationIndex[1];
// var languageIndex = searchParamaters[2].split("="); //use languageIndex[1]

//decide location name and type (CSU, Region, Locality).
var locationText = "";
var locationType = "";
let thisCSU = {
  name: "",
  slug: "",
};
let thisRegion;
if (locationID.includes("CSU")) {
  //get the CSU
  for (let i = 0; i < CSUStructure.length; i++) {
    //cycle through the CSUs in each region
    for (let j = 0; j < CSUStructure[i].CSUs.length; j++) {
      if (CSUStructure[i].CSUs[j].slug == locationID) {
        thisCSU = CSUStructure[i].CSUs[j];
      }
    }
  }
  locationText = thisCSU.name;
  locationType = "CSU";
} else if (locationID.includes("51")) {
  locationText = simplemaps_statemap_mapdata.state_specific[locationID].name;
  locationType = "Locality";
} else if (locationID == "any") {
  locationText = "Any Location";
  locationType = "any";
} else {
  switch (locationID) {
    case "north":
      locationText = "Northern Region";
      thisRegion = CSUStructure[0];
      break;
    case "south":
      locationText = "Southern Region";
      thisRegion = CSUStructure[3];
      break;
    case "east":
      locationText = "Eastern Region";
      thisRegion = CSUStructure[4];
      break;
    case "central":
      locationText = "Central Region";
      thisRegion = CSUStructure[1];
      break;
    case "west":
      locationText = "Western Region";
      thisRegion = CSUStructure[2];
      break;
    case "midwest":
      locationText = "Midwestern Region";
      thisRegion = CSUStructure[5];
      break;
  }
  locationType = "Region";
}

//get all entires for search later.
var locations = dspsXML.getElementsByTagName("FIPs");
var providerSearchResults = [];

var serviceText = "";
if (serviceName == "any") {
  serviceText = "Any Service";
} else {
  serviceText = serviceName;
}
const serviceTextSpan = document.getElementById("serviceTextSpan");
const locationTextSpan = document.getElementById("locationTextSpan");
const languageTextSpan = document.getElementById("languageTextSpan");
serviceTextSpan.textContent = serviceText;
locationTextSpan.textContent = locationText;
languageTextSpan.textContent = languageName;

//cycle through all location items
for (let i = 0; i < locations.length; i++) {
  //first test: matches the service paramater.
  var serviceTest = 0;
  var LocationTest = 0;
  var languageTest = 0;
  if (locations.item(i).parentNode.getAttribute("serviceName") == serviceName) {
    serviceTest = 1;
  }
  if (serviceName == "any") {
    serviceTest = 1;
  }
  //location tests
  if (
    locationType == "CSU" &&
    thisCSU.localities.indexOf(locations.item(i).textContent) >= 0
  ) {
    LocationTest = 1;
  }
  if (
    locationType == "Locality" &&
    locations.item(i).textContent == locationIndex[1]
  ) {
    LocationTest = 1;
  }
  if (locationType == "Region") {
    for (var j = 0; j < thisRegion.CSUs.length; j++) {
      if (
        thisRegion.CSUs[j].localities.indexOf(locations.item(i).textContent) >=
        0
      ) {
        LocationTest = 1;
      }
    }
  }
  if (locationID == "any") {
    LocationTest = 1;
  }
  var languagesArray = [];
  if (languageName == "English") {
    languageTest = 1;
  }
  //language test
  if (locations.item(i).getAttribute("languages")) {
    var serviceLanguageStr = locations.item(i).getAttribute("languages");
    while (serviceLanguageStr.indexOf(" ") >= 0) {
      serviceLanguageStr = serviceLanguageStr.replace(" ", "");
    }
    if (serviceLanguageStr.includes(",")) {
      var serviceLanguages = serviceLanguageStr.split(",");
      for (var j = 0; j < serviceLanguages.length; j++) {
        languagesArray.push(serviceLanguages[j]);
      }
    } else {
      languagesArray.push(locations.item(i).getAttribute("languages"));
    }
    for (var j = 0; j < languagesArray.length; j++) {
      if (languagesArray[j] == languageName) {
        languageTest = 1;
      }
    }
  }
  if (serviceTest && LocationTest && languageTest) {
    var provider = locations.item(i).parentNode;
    provider = provider.parentNode;
    var providerID = provider.getAttribute("id");
    var providerName = provider.getElementsByTagName("Name");
    //var travelAtty = locations.item(i).getAttribute("travelReq");
    providerSearchResults.push(
      providerName.item(0).textContent + "!" + providerID
    ); //"!"+travelAtty
  }
}
providerSearchResults = removeDuplicates(providerSearchResults);
providerSearchResults.sort();

if (providerSearchResults.length == 0) {
  const noResults = document.getElementById("noResults");
  noResults.hidden = false;
}
const searchResultsUL = document.getElementById("searchResults");
for (let i = 0; i < providerSearchResults.length; i++) {
  var displayResults = providerSearchResults[i].split("!"); //[0] name [1] id [2] travel attribute
  const providerLI = document.createElement("li");
  providerLI.innerHTML = `<a href="../provider/index.html?id=${displayResults[1]}">${displayResults[0]}</a>`;
  searchResultsUL.appendChild(providerLI);
}

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
