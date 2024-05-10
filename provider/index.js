import dspsXML from "../src/getXML.js";
import { allFips } from "../src/csu.js";
import colors from "../src/colors.js";

const { RegColor, TravelColor, EBABlue } = colors;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const providerID = urlParams.get("id");
//functions
function displayService() {
  //Clear the map
  for (let i = 0; i < allFips.length; i++) {
    simplemaps_statemap_mapdata.state_specific[allFips[i]].url =
      "javascript:toggleTravel(" + allFips[i] + ")";
    simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "default";
    simplemaps_statemap_mapdata.state_specific[allFips[i]].border_color =
      "default";
    simplemaps_statemap_mapdata.state_specific[allFips[i]].description =
      "default";
  }
  //load up color code for first map
  //alert(document.getElementById(serviceSelect).value);
  var locations = providerServices
    .item(document.getElementsByName("serviceSelect")[0].value)
    .getElementsByTagName("FIPs");
  //alert("locations is "+providerServices.item(0).textContent);
  //alert("location attribute "+ locations.item(0).getAttribute('travelReq'));
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

// alter mainmap data here

//remove locality colors
for (i = 0; i < allFips.length; i++) {
  var ColorChange = allFips[i];
  simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "default";
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
const providerNameSpan = document.getElementById("providerName");
providerNameSpan.innerHTML = providerName.item(0).textContent;
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

var providerServices = provider.getElementsByTagName("Service");
const serviceSelect = document.getElementsByName("serviceSelect")[0];
for (let i = 0; i < providerServices.length; i++) {
  const serviceOption = document.createElement("option");
  serviceOption.value = i;
  serviceOption.text = providerServices.item(i).getAttribute("serviceName");
  serviceSelect.appendChild(serviceOption);
}
serviceSelect.addEventListener("change", displayService);

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
