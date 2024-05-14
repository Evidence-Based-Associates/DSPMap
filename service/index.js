import dspsXML from "../src/getXML.js";
import { removeDuplicates } from "../src/utils.js";
import { allFips } from "../src/csu.js";
import colors from "../src/colors.js";

const { TravelColor, RegColor } = colors;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const serviceID = urlParams.get("id");

var availableServices = [];
var serviceCheck = dspsXML.getElementsByTagName("Service");
for (var i = 0; i < serviceCheck.length; i++) {
  availableServices.push(serviceCheck.item(i).getAttribute("serviceName"));
}
availableServices = removeDuplicates(availableServices);
availableServices.sort(); //for services.php the array index will be the service id.

const serviceNameText = document.getElementById("serviceNameText");
serviceNameText.innerText = availableServices[serviceID];

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

//read all services for the current page's id
var services = dspsXML.getElementsByTagName("Service");
var providerArray = [];
var fipsArray = [];

for (let i = 0; i < services.length; i++) {
  if (
    services.item(i).getAttribute("serviceName") == availableServices[serviceID]
  ) {
    var provider = services.item(i).parentNode;
    var providerID = provider.getAttribute("id");
    var providerName = provider
      .getElementsByTagName("Name")
      .item(0).textContent;
    providerArray.push(providerName + "!" + providerID);
    //toggle the map
    //get locations.
    var locations = services.item(i).getElementsByTagName("FIPs");
    for (var j = 0; j < locations.length; j++) {
      fipsArray.push(
        locations[j].textContent + "!" + locations[j].getAttribute("travelReq")
      );
    }
  }
}
//
for (var i = 0; i < fipsArray.length; i++) {
  var fipsTravel = fipsArray[i].split("!");
  if (fipsTravel[1] == "Y") {
    simplemaps_statemap_mapdata.state_specific[fipsTravel[0]].color =
      TravelColor;
  }
}
for (var i = 0; i < fipsArray.length; i++) {
  var fipsTravel = fipsArray[i].split("!");
  if (fipsTravel[1] == "N") {
    simplemaps_statemap_mapdata.state_specific[fipsTravel[0]].color = RegColor;
  }
}
//
providerArray = removeDuplicates(providerArray);
providerArray.sort();

//Show the providers offering this service
const providerUL = document.getElementById("providerUL");
for (let k = 0; k < providerArray.length; k++) {
  var providerInfo = providerArray[k].split("!"); //0=name, 1=id
  const providerLI = document.createElement("li");
  providerLI.innerHTML = `<a href="../provider/index.html?id=${providerInfo[1]}">${providerInfo[0]}</a>`;
  providerUL.appendChild(providerLI);
}
