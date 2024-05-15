import { API } from "./api/api.js";
import colors from "./lib/colors.js";
import { regionCSUs, sortedCSUs, allFips, CSUStructure } from "./lib/csu.js";
import { setMapCSURegions } from "./lib/simplemaps/utils.js";

console.log("using API:", API.name);

setMapCSURegions();

//connect to data file
var Connect = new XMLHttpRequest();
var cacheBuster = Date.now();
Connect.open("GET", "data/dsps.xml?" + cacheBuster, false);
Connect.setRequestHeader("Content-Type", "text/xml");
Connect.send(null);
// Place the response in an XML document.
var dspsXML = Connect.responseXML;

//get last update
var updateDates = dspsXML.getElementsByTagName("LastUpdated");
var updateArray = [];
var updateArryText = "";
for (var i = 0; i < updateDates.length; i++) {
  updateArray.push(updateDates.item(i).textContent);
}
updateArray.sort();
//debuging the wrong date. SORT makes 2018-3-13 before 2018-3-9 because it is not by number.
for (var i = 0; i < updateDates.length; i++) {
  updateArryText += updateArray[i] + "\r";
}
//alert(updateArryText);
var directoryUpdatedSplit = updateArray[i - 1].split("-");
var directoryUpdated = ""; //directoryUpdatedSplit[1]+"-";//directoryUpdatedSplit[2]+"-"+directoryUpdatedSplit[0];
if (directoryUpdatedSplit[1] == "01") {
  directoryUpdated = "January ";
} else if (directoryUpdatedSplit[1] == "02") {
  directoryUpdated = "February ";
} else if (directoryUpdatedSplit[1] == "03") {
  directoryUpdated = "March ";
} else if (directoryUpdatedSplit[1] == "04") {
  directoryUpdated = "April ";
} else if (directoryUpdatedSplit[1] == "05") {
  directoryUpdated = "May ";
} else if (directoryUpdatedSplit[1] == "06") {
  directoryUpdated = "June ";
} else if (directoryUpdatedSplit[1] == "07") {
  directoryUpdated = "July ";
} else if (directoryUpdatedSplit[1] == "08") {
  directoryUpdated = "August ";
} else if (directoryUpdatedSplit[1] == "09") {
  directoryUpdated = "September ";
} else if (directoryUpdatedSplit[1] == "10") {
  directoryUpdated = "October ";
} else if (directoryUpdatedSplit[1] == "11") {
  directoryUpdated = "November ";
} else if (directoryUpdatedSplit[1] == "12") {
  directoryUpdated = "December ";
}
//alert("Day is "+Number(directoryUpdatedSplit[2]));
directoryUpdated += Number(directoryUpdatedSplit[2]) + ", ";
directoryUpdated += directoryUpdatedSplit[0];
const lastUpdatedSpan = document.getElementById("lastUpdated");
lastUpdatedSpan.innerText = directoryUpdated;

//Get a list of all the providers
var providers = dspsXML.getElementsByTagName("Provider");

var locationCounter = 0;
var officeURL = "pages/provider/index.html?id=";
//cycle through all providers and add office locations to map
for (let i = 0; i < providers.length; i++) {
  //get info for each provider
  //revise for IE
  var offices = providers.item(i).getElementsByTagName("Office");
  var providerName = providers.item(i).getElementsByTagName("Name");
  var providerID = providers.item(i).getAttribute("id");

  //cycle through all locations of the provider
  for (let j = 0; j < offices.length; j++) {
    //get info for each office
    var officeLat = offices.item(j).getElementsByTagName("Lat");
    var officeLng = offices.item(j).getElementsByTagName("Lng");
    var officeStreet = offices.item(j).getElementsByTagName("Street");
    var officeCity = offices.item(j).getElementsByTagName("City");
    var officeState = offices.item(j).getElementsByTagName("State");
    var officeZip = offices.item(j).getElementsByTagName("Zip");
    var officePhone = offices.item(j).getElementsByTagName("Phone");

    //add the office data to a map location
    simplemaps_statemap_mapdata.locations[locationCounter] = {
      lat: officeLat.item(0).textContent,
      lng: officeLng.item(0).textContent,
      name: providerName.item(0).textContent,
      color: colors.EBABlue,
      description:
        officeStreet.item(0).textContent +
        "<br>" +
        officeCity.item(0).textContent +
        ", " +
        officeState.item(0).textContent +
        " " +
        officeZip.item(0).textContent +
        "<br>" +
        officePhone.item(0).textContent,
      url: officeURL + providerID, //+"?map=all",//link to provider map
      size: "default",
      type: "default",
      image_url: "default",
      opacity: "default",
    };
    //update counter so it doesn't overwrite a location
    locationCounter++;
  }
}

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
