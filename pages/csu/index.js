import { CSUStructure } from "../../lib/csu.js";
import dspsXML from "../../lib/getXML.js";
import { removeDuplicates } from "../../lib/utils.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const csuID = urlParams.get("id");
//get the CSU info from query string.
//cycle through the regions
let thisCSU;
for (let i = 0; i < CSUStructure.length; i++) {
  //cycle through the CSUs in each region
  for (let j = 0; j < CSUStructure[i].CSUs.length; j++) {
    if (CSUStructure[i].CSUs[j].slug == csuID) {
      thisCSU = CSUStructure[i].CSUs[j];
    }
  }
}
const csuNameSpan = document.getElementById("csuName");
csuNameSpan.innerHTML = thisCSU.name;
//empty the regions
simplemaps_statemap_mapdata.regions = {};
//fill with focus CSU
simplemaps_statemap_mapdata.regions[0] = {
  states: thisCSU.localities,
  name: thisCSU.name,
};

//zoom to focus CSU
simplemaps_statemap_mapdata.main_settings.initial_zoom = 0;

//add remaining CSUs to map as regions. if a user zooms out CSUs will be grouped on the map.
var regionCount = 1;
//Cycle through regions
for (let i = 0; i < CSUStructure.length; i++) {
  //document.write(CSUStructure[i].name+"</a></font></div></li>");
  //cycle through region's CSUs
  for (let j = 0; j < CSUStructure[i].CSUs.length; j++) {
    //if it's thisCSU, skip it
    if (CSUStructure[i].CSUs[j].localities != thisCSU.localities) {
      simplemaps_statemap_mapdata.regions[regionCount] = {
        states: CSUStructure[i].CSUs[j].localities,
        name: CSUStructure[i].CSUs[j].name,
        url: "index.html?id=" + CSUStructure[i].CSUs[j].slug,
      };
      regionCount++;
    }
  }
}

var allLocations = dspsXML.getElementsByTagName("FIPs");
var CSUServices = [];
var CSUProviders = [];
for (var i = 0; i < allLocations.length; i++) {
  if (thisCSU.localities.indexOf(allLocations.item(i).textContent) >= 0) {
    //this node is in the CSU.
    //get service
    var serviceName = allLocations.item(i).parentNode;
    serviceName = serviceName.getAttribute("serviceName");
    var serviceAtty = allLocations.item(i).getAttribute("travelReq");
    //alert("serviceAtty is "+serviceAtty+" serviceName is "+serviceName);
    CSUServices.push(serviceName); //+"!"+serviceAtty);
    //get provider
    var provider = allLocations.item(i).parentNode;
    provider = provider.parentNode;
    var providerID = provider.getAttribute("id");
    let providerName = provider
      .getElementsByTagName("Name")
      .item(0).textContent;
    CSUProviders.push(providerName + "!" + providerID);
  }
}
CSUServices = removeDuplicates(CSUServices);
CSUServices.sort();
CSUProviders = removeDuplicates(CSUProviders);
CSUProviders.sort();

const providerList = document.getElementById("providerList");
for (let i = 0; i < CSUProviders.length; i++) {
  var providerInfo = CSUProviders[i].split("!"); //[0] name [1] id
  const providerListItem = document.createElement("li");
  providerListItem.classList.add("ebaBlue");
  providerListItem.innerHTML = `<a href='../provider/index.html?id=${providerInfo[1]}'>${providerInfo[0]}</a>`;
  providerList.appendChild(providerListItem);
  var provider = dspsXML.getElementById(providerInfo[1]);
  var providerLocations = provider.getElementsByTagName("FIPs");
  var serviceArray = [];
  for (var j = 0; j < providerLocations.length; j++) {
    if (
      thisCSU.localities.indexOf(providerLocations.item(j).textContent) >= 0
    ) {
      var providerService = providerLocations.item(j).parentNode;
      providerService = providerService.getAttribute("serviceName");
      serviceArray.push(providerService);
    }
  }
  serviceArray = removeDuplicates(serviceArray);
  serviceArray.sort();
  const providerServicesList = document.createElement("ul");
  for (var j = 0; j < serviceArray.length; j++) {
    const serviceListItem = document.createElement("li");
    serviceListItem.innerHTML = serviceArray[j];
    providerServicesList.appendChild(serviceListItem);
  }
  providerList.appendChild(providerServicesList);
}

const serviceList = document.getElementById("serviceList");
for (var i = 0; i < CSUServices.length; i++) {
  const serviceListItem = document.createElement("li");
  serviceListItem.classList.add("ebaBlue");
  serviceListItem.innerHTML = CSUServices[i];
  serviceList.appendChild(serviceListItem);
  var providerLocations = dspsXML.getElementsByTagName("FIPs");
  var providerArray = [];
  for (var j = 0; j < providerLocations.length; j++) {
    if (
      thisCSU.localities.indexOf(providerLocations.item(j).textContent) >= 0
    ) {
      var provider = providerLocations.item(j).parentNode;
      var thisService = provider.getAttribute("serviceName");
      provider = provider.parentNode;
      var providerID = provider.getAttribute("id");
      var providerName = provider
        .getElementsByTagName("Name")
        .item(0).textContent;
      if (thisService == CSUServices[i]) {
        providerArray.push(providerName + "!" + providerID);
      }
    }
  }
  providerArray = removeDuplicates(providerArray);
  providerArray.sort();

  const providersOfferingService = document.createElement("ul");
  for (var j = 0; j < providerArray.length; j++) {
    var providerInfo = providerArray[j].split("!"); //[0] name [1] id
    const providerListItem = document.createElement("li");
    providerListItem.innerHTML = `<a href='../provider/index.html?id=${providerInfo[1]}'>${providerInfo[0]}</a>`;
    providersOfferingService.appendChild(providerListItem);
  }
  serviceList.appendChild(providersOfferingService);
}
