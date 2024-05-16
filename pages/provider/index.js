import dspsXML from "../../lib/getXML.js";
import { providerID, serviceFIPS, serviceNames } from "./api.js";
import colors from "../../lib/colors.js";
import { removeDuplicates } from "../../lib/utils.js";
import { CSUStructure } from "../../lib/csu.js";
import {
  setMapCSURegions,
  setAllDefaultColor,
} from "../../lib/simplemaps/utils.js";

const { RegColor, TravelColor, EBABlue } = colors;

setMapCSURegions();
setAllDefaultColor();

const serviceSelect = document.getElementsByName("serviceSelect")[0];
serviceNames.forEach((serviceName) => {
  const serviceOption = document.createElement("option");
  serviceOption.value = serviceName;
  serviceOption.text = serviceName;
  serviceSelect.appendChild(serviceOption);
});
serviceSelect.addEventListener("change", displayService);

function displayService() {
  //load up color code for first map
  var locations = providerServices
    .item(document.getElementsByName("serviceSelect")[0].value)
    .getElementsByTagName("FIPs");
  for (var i = 0; i < locations.length; i++) {
    if (locations.item(i).getAttribute("travelReq") == "Y") {
      simplemaps_statemap_mapdata.state_specific[
        locations[i].textContent
      ].color = TravelColor;
      simplemaps_statemap_mapdata.state_specific[
        locations[i].textContent
      ].hover_color = TravelColor;
    }
    if (locations.item(i).getAttribute("travelReq") == "N") {
      simplemaps_statemap_mapdata.state_specific[
        locations[i].textContent
      ].color = RegColor;
      simplemaps_statemap_mapdata.state_specific[
        locations[i].textContent
      ].hover_color = RegColor;
    }
    if (locations.item(i).getAttribute("languages")) {
      //simplemaps_statemap_mapdata.state_specific[locations[i].textContent].border_color = LanguageColor;
      simplemaps_statemap_mapdata.state_specific[
        locations[i].textContent
      ].description =
        "Available in " + locations.item(i).getAttribute("languages");
    }
  }
  simplemaps_statemap.refresh();
}

//get provider info.
//var provider = dspsXML.getElementById(pageID);
var providerList = dspsXML.getElementsByTagName("Provider");
for (var i = 0; i < providerList.length; i++) {
  if (providerList.item(i).getAttribute("id") == providerID) {
    var provider = providerList.item(i);
  }
}

var providerName = provider.getElementsByTagName("Name");
const providerNameSpan = document.getElementsByName("providerName");
providerNameSpan.forEach(
  (span) => (span.innerHTML = providerName.item(0).textContent)
);
var providerUpdated = provider
  .getElementsByTagName("LastUpdated")
  .item(0)
  .textContent.split("-");
var providerWebsite = provider.getElementsByTagName("Website");
var providerContact = provider.getElementsByTagName("ContactName");
var providerEmail = provider.getElementsByTagName("ContactEmail");
var mapZoom = provider.getElementsByTagName("MapZoom");
var officeCount = provider.getElementsByTagName("Office").length;

//office info tags
var officeLat = provider.getElementsByTagName("Lat");
var officeLng = provider.getElementsByTagName("Lng");
var officeStreet = provider.getElementsByTagName("Street");
var officeCity = provider.getElementsByTagName("City");
var officeState = provider.getElementsByTagName("State");
var officeZip = provider.getElementsByTagName("Zip");
var officePhone = provider.getElementsByTagName("Phone");
var officeFax = provider.getElementsByTagName("Fax");

//populate only this provider's locations
//needs to be outside of the loop
var locationCounter = 0;
//cycle through all locations
for (i = 0; i < officeCount; i++) {
  //add the office data to a map location
  simplemaps_statemap_mapdata.locations[locationCounter] = {
    lat: officeLat.item(i).textContent,
    lng: officeLng.item(i).textContent,
    name: providerName.item(0).textContent,
    color: EBABlue,
    description:
      officeStreet.item(i).textContent +
      "<br>" +
      officeCity.item(i).textContent +
      ", " +
      officeState.item(i).textContent +
      " " +
      officeZip.item(i).textContent +
      "<br>" +
      officePhone.item(i).textContent,
    url: "",
    size: "default",
    type: "default",
    image_url: "default",
    opacity: "default",
  };
  //update counter so it doesn't overwrite a location
  locationCounter++;
}

//set this provider's map zoom
simplemaps_statemap_mapdata.main_settings.initial_zoom =
  mapZoom.item(0).textContent;

var services = provider.getElementsByTagName("ServiceGroupMap");
//if this is the landing page for the provider then show all-service coverage area
//if (mapLayer == "all"){ //show entire coverage area for landing page
var serviceZoom = provider.getElementsByTagName("MapZoom");
serviceZoom = serviceZoom.item(0).textContent;
var locations = provider.getElementsByTagName("FIPs");
var mapDescription = "Provider's Complete Coverage Area";
/*} else { //this is for a specific map
    var serviceZoom = services.item(Number(mapLayer)).getAttribute("serviceZoom");
    var locations = services.item(Number(mapLayer)).getElementsByTagName("FIPs");
    var mapDescription = services.item(Number(mapLayer)).getAttribute("type");
}*/
if (serviceZoom > 51000) {
  //empty the regions, and set focus on the service locality
  //this should apply when a provider serves a map in only one locality.
  simplemaps_statemap_mapdata.regions = {};
  //fill with focus CSU
  simplemaps_statemap_mapdata.regions[0] = {
    states: [serviceZoom],
    name: "",
  };
  simplemaps_statemap_mapdata.main_settings.initial_zoom = 0;
} else if (serviceZoom < 5) {
  simplemaps_statemap_mapdata.main_settings.initial_zoom = serviceZoom;
}

const selectedServiceName =
  // @ts-ignore
  serviceSelect.options[serviceSelect.selectedIndex].text;
const fipsLists = serviceFIPS(selectedServiceName);
console.log(fipsLists);

//  load up color code for first map

var locations = providerServices.item(0).getElementsByTagName("FIPs");
//alert("locations lenght is "+providerServices.length);
for (var i = 0; i < locations.length; i++) {
  //alert("location attribute "+ locations.item(i).getAttribute('travelReq'));
  if (locations.item(i).getAttribute("travelReq") == "Y") {
    simplemaps_statemap_mapdata.state_specific[locations[i].textContent].color =
      TravelColor;
    simplemaps_statemap_mapdata.state_specific[
      locations[i].textContent
    ].hover_color = TravelColor;
  }
  if (locations.item(i).getAttribute("travelReq") == "N") {
    simplemaps_statemap_mapdata.state_specific[locations[i].textContent].color =
      RegColor;
    simplemaps_statemap_mapdata.state_specific[
      locations[i].textContent
    ].hover_color = RegColor;
  }
  if (locations.item(i).getAttribute("languages")) {
    //simplemaps_statemap_mapdata.state_specific[locations[i].textContent].border_color = LanguageColor;
    simplemaps_statemap_mapdata.state_specific[
      locations[i].textContent
    ].description =
      "Available in " + locations.item(i).getAttribute("languages");
  }
}

const providerInfo = document.getElementById("providerInfo");
providerInfo.innerHTML =
  "<p>Last Updated: " +
  providerUpdated[1] +
  "/" +
  providerUpdated[2] +
  "/" +
  providerUpdated[0] +
  "</p>" +
  "<p>Website: <a href='" +
  providerWebsite.item(0).textContent +
  "'>" +
  providerWebsite.item(0).textContent +
  "</a></p>" +
  "<p>Contact: " +
  providerContact.item(0).textContent +
  "</p>" +
  "<p>Email: <a href='mailto:" +
  providerEmail.item(0).textContent +
  "'>" +
  providerEmail.item(0).textContent +
  "</a></p>";

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
