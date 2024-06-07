import { getMetaData, searchServices } from "../../firebase.js";
import { CSUStructure } from "../../lib/csu.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export const searchValues = urlParams.values();
const [serviceName, locationID, languageName] = searchValues;
export const languageText = languageName;

const metaData = await getMetaData();
export let availableServices = [];
export let availableLanguages = [];
if (metaData) {
  Object.keys(metaData.availableServices).forEach((service) => {
    availableServices.push(...metaData.availableServices[service]);
  });
  availableServices.sort();
  availableLanguages = metaData.availableLanguages.sort();
}

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
} else if (locationID == "telehealth") {
  locationText = "Telehealth";
  locationType = "Telehealth";
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
  }
  locationType = "Region";
}

const searchServicesResults = await searchServices({
  serviceName,
  locationType,
  locationID,
  languageName,
});

export let providerSearchResults = new Map();
if (searchServicesResults) {
  searchServicesResults.forEach((service) => {
    if (!providerSearchResults.has(service.providerName)) {
      providerSearchResults.set(service.providerName, service.providerName);
    }
  });
}
