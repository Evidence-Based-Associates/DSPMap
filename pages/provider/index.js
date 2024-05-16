import dspsXML from "../../lib/getXML.js";
import { providerID, serviceFIPS, serviceNames, providerInfo } from "./api.js";
import colors from "../../lib/colors.js";
import { removeDuplicates } from "../../lib/utils.js";
import { CSUStructure } from "../../lib/csu.js";
import {
  setMapCSURegions,
  setAllDefaultColor,
  setMapLocations,
  zoomToRegion,
  colorFIPS,
} from "../../lib/simplemaps/utils.js";

const { RegColor, TravelColor, EBABlue } = colors;
// destructure providerInfo
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
  // TODO: languages
  // simplemaps_statemap_mapdata.state_specific[
  //   locations[i].textContent
  // ].description =
  //   "Available in " + locations.item(i).getAttribute("languages");
  // @ts-ignore
  if (typeof simplemaps_statemap.refresh === "function") {
    simplemaps_statemap.refresh();
  }
};
serviceSelect.addEventListener("change", displayService);
displayService();

//get provider's CSU coverage:
var providerAllLocations = provider.getElementsByTagName("FIPs");
var serviceFIPsArray = [];

for (let i = 0; i < providerAllLocations.length; i++) {
  serviceFIPsArray.push(providerAllLocations.item(i).textContent);
}
serviceFIPsArray = removeDuplicates(serviceFIPsArray);

var providerCSUArray = [];
//look for the CSU
//Cycle through regions
//priting as you cycle through the CSU structure will have the correct numerical sort
const providerCSUList = document.getElementById("providerCSUs");
for (let i = 0; i < CSUStructure.length; i++) {
  //cycle through region's CSUs
  for (let j = 0; j < CSUStructure[i].CSUs.length; j++) {
    //cycle through the provider locations
    for (let k = 0; k < serviceFIPsArray.length; k++) {
      if (
        CSUStructure[i].CSUs[j].localities.indexOf(serviceFIPsArray[k]) >= 0 &&
        providerCSUArray.indexOf(CSUStructure[i].CSUs[j].name) == -1
      ) {
        providerCSUArray.push(CSUStructure[i].CSUs[j].name);
        const csuLI = document.createElement("li");
        csuLI.innerHTML = CSUStructure[i].CSUs[j].name;
        providerCSUList.appendChild(csuLI);
      }
    }
  }
}

var cityCountyBoundary = 0;
const countyList = document.getElementById("providerCounties");
const cityList = document.getElementById("providerCities");
for (i = 0; i < serviceFIPsArray.length; i++) {
  const localityLI = document.createElement("li");
  localityLI.innerHTML =
    simplemaps_statemap_mapdata.state_specific[serviceFIPsArray[i]].name;
  if (Number(serviceFIPsArray[i]) > 51500) {
    cityList.appendChild(localityLI);
  } else {
    countyList.appendChild(localityLI);
  }
}

var allProviderServices = provider.getElementsByTagName("Service");
var allProviderServicesArray = [];
for (i = 0; i < allProviderServices.length; i++) {
  //var serviceNote = allProviderServices.item(i).getAttribute("note");
  allProviderServicesArray.push(
    allProviderServices.item(i).getAttribute("serviceName")
  );
}
allProviderServicesArray.sort();
allProviderServicesArray = removeDuplicates(allProviderServicesArray);
const providerServiceList = document.getElementById("providerServices");
for (i = 0; i < allProviderServicesArray.length; i++) {
  var serviceInfo = [];
  serviceInfo = allProviderServicesArray[i].split("!");
  const serviceLI = document.createElement("li");
  serviceLI.innerText = serviceInfo[0];
  providerServiceList.appendChild(serviceLI);
}

//place into array in order to alphabetize
var allProviderLocations = provider.getElementsByTagName("FIPs");
var allProviderLanguagesArray = [];
for (var i = 0; i < allProviderLocations.length; i++) {
  if (allProviderLocations.item(i).getAttribute("languages")) {
    var serviceLanguageStr = allProviderLocations
      .item(i)
      .getAttribute("languages");
    serviceLanguageStr = serviceLanguageStr.replace(" ", "");
    if (serviceLanguageStr.includes(",")) {
      var serviceLanguages = serviceLanguageStr.split(",");
      for (var j = 0; j < serviceLanguages.length; j++) {
        allProviderLanguagesArray.push(serviceLanguages[j]);
      }
    } else {
      allProviderLanguagesArray.push(
        allProviderLocations.item(i).getAttribute("languages")
      );
    }
  }
  //alert("serviceLanguageStr is "+serviceLanguageStr);
  //alert("attribute is "+allProviderLocations.item(i).getAttribute("languages"));
  //alert("serviceLanguages is "+serviceLanguages.item(i));
  //for (j=0;j<serviceLanguages.legth;j++){
  //    allProviderLanguagesArray.push(serviceLanguages[j]);
  //}
}

allProviderLanguagesArray = removeDuplicates(allProviderLanguagesArray);
allProviderLanguagesArray.sort();

const languageList = document.getElementById("providerLanguages");
for (i = 0; i < allProviderLanguagesArray.length; i++) {
  //var serviceInfo = [];
  //serviceInfo = allProviderServicesArray[i].split("!");
  //document.write("<li>"+serviceInfo[0]);
  const languageLI = document.createElement("li");
  languageLI.innerText = allProviderLanguagesArray[i];
  languageList.appendChild(languageLI);
}
