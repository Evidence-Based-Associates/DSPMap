import { API } from "../../api/api.js";
import { CSUStructure } from "../../lib/csu.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export const searchValues = urlParams.values();
const [serviceName, locationID, languageName] = searchValues;
export const languageText = languageName;

export let serviceText = "";
if (serviceName == "any") {
  serviceText = "Any Service";
} else {
  serviceText = serviceName;
}

export let locationText = "";
export let locationType = "";
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
  // @ts-ignore
  locationText = simplemaps_statemap_mapdata.state_specific[locationID].name;
  locationType = "Locality";
} else if (locationID == "any") {
  locationText = "Any Location";
  locationType = "any";
} else {
  switch (locationID) {
    case "north":
      locationText = "Northern Region";
      thisRegion = CSUStructure[3];
      break;
    case "south":
      locationText = "Southern Region";
      thisRegion = CSUStructure[1];
      break;
    case "east":
      locationText = "Eastern Region";
      thisRegion = CSUStructure[0];
      break;
    case "central":
      locationText = "Central Region";
      thisRegion = CSUStructure[2];
      break;
    case "west":
      locationText = "Western Region";
      thisRegion = CSUStructure[4];
      break;
    case "midwest":
      locationText = "Midwestern Region";
      thisRegion = CSUStructure[5];
      break;
  }
  locationType = "Region";
}

export const providerSearchResults = API.searchProviders({
  serviceName,
  locationType,
  locationID,
  languageName,
});
// const locations = API.getAllFIPS();
// for (let i = 0; i < locations.length; i++) {
//   //first test: matches the service paramater.
//   var serviceTest = 0;
//   var LocationTest = 0;
//   var languageTest = 0;
//   if (locations.item(i).parentNode.getAttribute("serviceName") == serviceName) {
//     serviceTest = 1;
//   }
//   if (serviceName == "any") {
//     serviceTest = 1;
//   }
//   //location tests
//   if (
//     locationType == "CSU" &&
//     thisCSU.localities.indexOf(locations.item(i).textContent) >= 0
//   ) {
//     LocationTest = 1;
//   }
//   if (
//     locationType == "Locality" &&
//     locations.item(i).textContent == locationID
//   ) {
//     LocationTest = 1;
//   }
//   if (locationType == "Region") {
//     for (var j = 0; j < thisRegion.CSUs.length; j++) {
//       if (
//         thisRegion.CSUs[j].localities.indexOf(locations.item(i).textContent) >=
//         0
//       ) {
//         LocationTest = 1;
//       }
//     }
//   }
//   if (locationID == "any") {
//     LocationTest = 1;
//   }
//   var languagesArray = [];
//   if (languageName == "English") {
//     languageTest = 1;
//   }
//   //language test
//   if (locations.item(i).getAttribute("languages")) {
//     var serviceLanguageStr = locations.item(i).getAttribute("languages");
//     while (serviceLanguageStr.indexOf(" ") >= 0) {
//       serviceLanguageStr = serviceLanguageStr.replace(" ", "");
//     }
//     if (serviceLanguageStr.includes(",")) {
//       var serviceLanguages = serviceLanguageStr.split(",");
//       for (var j = 0; j < serviceLanguages.length; j++) {
//         languagesArray.push(serviceLanguages[j]);
//       }
//     } else {
//       languagesArray.push(locations.item(i).getAttribute("languages"));
//     }
//     for (var j = 0; j < languagesArray.length; j++) {
//       if (languagesArray[j] == languageName) {
//         languageTest = 1;
//       }
//     }
//   }
//   if (serviceTest && LocationTest && languageTest) {
//     var provider = locations.item(i).parentNode;
//     provider = provider.parentNode;
//     var providerID = provider.getAttribute("id");
//     var providerName = provider.getElementsByTagName("Name");
//     //var travelAtty = locations.item(i).getAttribute("travelReq");
//     providerSearchResults.push(
//       providerName.item(0).textContent + "!" + providerID
//     ); //"!"+travelAtty
//   }
// }
// providerSearchResults = removeDuplicates(providerSearchResults);
// providerSearchResults.sort();
