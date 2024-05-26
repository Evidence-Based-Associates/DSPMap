import { API } from "../../api/api.js";
import { CSUStructure } from "../../lib/csu.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export const searchValues = urlParams.values();
const [serviceName, locationID, languageName] = searchValues;
export const languageText = languageName;

export const availableServices = await API.getAllServiceNames();
export const availableLanguages = await API.getAllLanguages();

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
      break;
    case "south":
      locationText = "Southern Region";
      break;
    case "east":
      locationText = "Eastern Region";
      break;
    case "central":
      locationText = "Central Region";
      break;
    case "west":
      locationText = "Western Region";
      break;
    case "midwest":
      locationText = "Midwestern Region";
      break;
  }
  locationType = "Region";
}

export const providerSearchResults = await API.searchProviders({
  serviceName,
  locationType,
  locationID,
  languageName,
});
