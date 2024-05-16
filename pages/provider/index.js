import dspsXML from "../../lib/getXML.js";
import {
  providerID,
  serviceFIPS,
  serviceNames,
  providerInfo,
  allFIPS,
  providerLanguages,
} from "./api.js";
import colors from "../../lib/colors.js";
import { removeDuplicates } from "../../lib/utils.js";
import { CSUStructure, csuListFromFIPS } from "../../lib/csu.js";
import {
  setMapCSURegions,
  setAllDefaultColor,
  setMapLocations,
  zoomToRegion,
  colorFIPS,
  addLanguageDescriptions,
} from "../../lib/simplemaps/utils.js";

const { RegColor, TravelColor } = colors;

const {
  providerName,
  contactName,
  contactEmail,
  website,
  lastUpdated,
  mapZoom,
} = providerInfo;

const lastUpdatedDateParts = lastUpdated.split("-");
const lastUpdatedText = `${lastUpdatedDateParts[1]}/${lastUpdatedDateParts[2]}/${lastUpdatedDateParts[0]}`;

setMapCSURegions();
setAllDefaultColor();
setMapLocations(providerID);
zoomToRegion(mapZoom);

const providerNameSpan = document.getElementsByName("providerName");
providerNameSpan.forEach((span) => (span.innerText = providerName));

const providerInfoDiv = document.getElementById("providerInfo");
providerInfoDiv.innerHTML =
  "<p>Last Updated: " +
  lastUpdatedText +
  "</p>" +
  "<p>Website: <a href='" +
  website +
  "'>" +
  website +
  "</a></p>" +
  "<p>Contact: " +
  contactName +
  "</p>" +
  "<p>Email: <a href='mailto:" +
  contactEmail +
  "'>" +
  contactEmail +
  "</a></p>";

const serviceSelect = document.getElementsByName("serviceSelect")[0];
serviceNames.forEach((serviceName) => {
  const serviceOption = document.createElement("option");
  serviceOption.value = serviceName;
  serviceOption.text = serviceName;
  serviceSelect.appendChild(serviceOption);
});

const displayService = () => {
  const selectedServiceName =
    // @ts-ignore
    serviceSelect.options[serviceSelect.selectedIndex].text;
  const fipsLists = serviceFIPS(selectedServiceName);
  colorFIPS(fipsLists.available, RegColor);
  colorFIPS(fipsLists.limited, TravelColor);
  addLanguageDescriptions(fipsLists.languages);
  // @ts-ignore
  if (typeof simplemaps_statemap.refresh === "function") {
    // @ts-ignore
    simplemaps_statemap.refresh();
  }
};
serviceSelect.addEventListener("change", displayService);
displayService();

const csuList = csuListFromFIPS(allFIPS);
const providerCSUList = document.getElementById("providerCSUs");
csuList.forEach((csu) => {
  const csuLI = document.createElement("li");
  csuLI.innerText = csu;
  providerCSUList.appendChild(csuLI);
});

const countyList = document.getElementById("providerCounties");
const cityList = document.getElementById("providerCities");
allFIPS.forEach((fips) => {
  const localityLI = document.createElement("li");
  // @ts-ignore
  localityLI.innerText = simplemaps_statemap_mapdata.state_specific[fips].name;
  if (Number(fips) > 51500) {
    cityList.appendChild(localityLI);
  } else {
    countyList.appendChild(localityLI);
  }
});

const providerServiceList = document.getElementById("providerServices");
serviceNames.forEach((serviceName) => {
  const serviceLI = document.createElement("li");
  serviceLI.innerText = serviceName;
  providerServiceList.appendChild(serviceLI);
});

const languageList = document.getElementById("providerLanguages");
providerLanguages.forEach((language) => {
  const languageLI = document.createElement("li");
  languageLI.innerText = language;
  languageList.appendChild(languageLI);
});
