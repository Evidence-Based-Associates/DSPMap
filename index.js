import { API } from "./api/api.js";
import { regionCSUs, sortedCSUs, allFips, CSUStructure } from "./lib/csu.js";
import { setMapCSURegions, setMapLocations } from "./lib/simplemaps/utils.js";

console.log("using API:", API.name);

setMapCSURegions();
setMapLocations();

//connect to data file
var Connect = new XMLHttpRequest();
var cacheBuster = Date.now();
Connect.open("GET", "data/dsps.xml?" + cacheBuster, false);
Connect.setRequestHeader("Content-Type", "text/xml");
Connect.send(null);
// Place the response in an XML document.
var dspsXML = Connect.responseXML;

const lastUpdatedSpan = document.getElementById("lastUpdated");
lastUpdatedSpan.innerText = API.getLastUpdated();

function removeDuplicates(num) {
  var x,
    len = num.length,
    out = [],
    obj = {};

  for (x = 0; x < len; x++) {
    obj[num[x]] = 0;
  }
  for (x in obj) {
    out.push(x);
  }
  return out;
}

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

//Cycle through regions
const regionListUL = document.getElementById("regionList");
for (let i = 0; i < CSUStructure.length; i++) {
  const regionHeading = document.createElement("h3");
  regionHeading.innerText = CSUStructure[i].name;
  regionHeading.className = "ebaBlue";
  //cycle through region's CSUs
  const csuUL = document.createElement("ul");
  for (j = 0; j < CSUStructure[i].CSUs.length; j++) {
    const csuLI = document.createElement("li");
    csuLI.innerHTML = `<a href="pages/csu/index.html?id=${CSUStructure[i].CSUs[j].slug}">${CSUStructure[i].CSUs[j].name}</a>`;
    csuUL.appendChild(csuLI);
  }
  regionListUL.appendChild(regionHeading);
  regionListUL.appendChild(csuUL);
}

//put provider info in array to alphabetize
const providers = dspsXML.getElementsByTagName("Provider");
var sortedProviders = [];
for (let i = 0; i < providers.length; i++) {
  var providerName = providers.item(i).getElementsByTagName("Name");
  var providerID = providers.item(i).getAttribute("id");
  sortedProviders.push(providerName.item(0).textContent + "!" + providerID);
}
//alphabetize
sortedProviders.sort();

//print
const providerUL = document.getElementById("providerList");
for (let i = 0; i < sortedProviders.length; i++) {
  //seperate the ID from the name
  var providerInfo = sortedProviders[i].split("!"); //providerInfo[0] is name [1] is ID
  const providerLI = document.createElement("li");
  providerLI.innerHTML = `<a href="pages/provider/index.html?id=${providerInfo[1]}">${providerInfo[0]}</a>`;
  providerUL.appendChild(providerLI);
}

const serviceUL = document.getElementById("serviceList");
for (let i = 0; i < availableServices.length; i++) {
  const serviceLI = document.createElement("li");
  serviceLI.innerHTML = `<a href="pages/service/index.html?id=${i}">${availableServices[i]}</a>`;
  serviceUL.appendChild(serviceLI);
}

const languageUL = document.getElementById("languageList");
for (let i = 0; i < allLanguagesArray.length; i++) {
  const languageLI = document.createElement("li");
  languageLI.innerHTML = `<a href="pages/language/index.html?id=${i}">${allLanguagesArray[i]}</a>`;
  languageUL.appendChild(languageLI);
}
