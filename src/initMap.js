import colors from "./colors.js";
import { regionCSUs } from "./csu.js";

const localitiesFromRegion = (region) => {
  let localities = [];
  region.CSUs.forEach((csu) => {
    localities = localities.concat(csu.localities);
  });
  return localities;
};

const regions = {
  0: {
    states: localitiesFromRegion(regionCSUs.NorthernRegion),
    name: "Northern Region",
    color: colors.NorthernColor,
  },
  1: {
    states: localitiesFromRegion(regionCSUs.CentralRegion),
    name: "Central Region",
    color: colors.CentralColor,
  },
  2: {
    states: localitiesFromRegion(regionCSUs.WesternRegion),
    name: "Western Region",
    color: colors.WesternColor,
  },
  3: {
    states: localitiesFromRegion(regionCSUs.SouthernRegion),
    name: "Southern Region",
    color: colors.SouthernColor,
  },
  4: {
    states: localitiesFromRegion(regionCSUs.EasternRegion),
    name: "Eastern Region",
    color: colors.EasternColor,
  },
  5: {
    states: localitiesFromRegion(regionCSUs.MidWestRegion),
    name: "Midwest Region",
    color: colors.MidWesternColor,
  },
};

simplemaps_statemap_mapdata.regions = regions;

const isLocalityInRegion = (region, locality) => {
  let found = false;
  region.CSUs.forEach((csu) => {
    if (csu.localities.includes(locality)) {
      found = true;
    }
  });
  return found;
};

const regionColor = (locality) => {
  if (isLocalityInRegion(regionCSUs.NorthernRegion, locality)) {
    return colors.NorthernColor;
  } else if (isLocalityInRegion(regionCSUs.CentralRegion, locality)) {
    return colors.CentralColor;
  } else if (isLocalityInRegion(regionCSUs.WesternRegion, locality)) {
    return colors.WesternColor;
  } else if (isLocalityInRegion(regionCSUs.SouthernRegion, locality)) {
    return colors.SouthernColor;
  } else if (isLocalityInRegion(regionCSUs.EasternRegion, locality)) {
    return colors.EasternColor;
  } else if (isLocalityInRegion(regionCSUs.MidWestRegion, locality)) {
    return colors.MidWesternColor;
  } else {
    return "#000000";
  }
};

const localities = simplemaps_statemap_mapdata.state_specific;
for (let locality in localities) {
  localities[locality].url = "locality.html?" + locality;
  localities[locality].color = regionColor(locality);
}
//connect to data file
var Connect = new XMLHttpRequest();
var cacheBuster = Date.now();
Connect.open("GET", "dsps.xml?" + cacheBuster, false);
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
console.log("Directory Updated: " + directoryUpdated);
const lastUpdatedSpan = document.getElementById("lastUpdated");
lastUpdatedSpan.innerText = directoryUpdated;

//Get a list of all the providers
var providers = dspsXML.getElementsByTagName("Provider");

var locationCounter = 0;
var officeURL = "provider.html?id=";
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
