//GLOBAL FUNCTIONS
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

//GLOBAL VARIABLES
//look for preview file
if (sessionStorage.DSPCode) {
  var parser = new DOMParser();
  var previewDSP = parser.parseFromString(sessionStorage.DSPCode, "text/xml");
}
//connect to data file
var Connect = new XMLHttpRequest();
var cacheBuster = Date.now();
Connect.open("GET", "/data/dsps.xml?" + cacheBuster, false);
Connect.setRequestHeader("Content-Type", "text/xml");
Connect.send(null);
// Place the response in an XML document.
var dspsXML = Connect.responseXML;

// //get DTD file
// var dspsDTD = new XMLHttpRequest();
// dspsDTD.open("GET", "dsps.txt");
// dspsDTD.send(null);

// //get approved service name list
// var Connect = new XMLHttpRequest();
// Connect.open("GET", "serviceList.xml", false);
// Connect.setRequestHeader("Content-Type", "text/xml");
// Connect.send(null);
// // Place the response in an XML document.
// var servicesXML = Connect.responseXML;

// //DTD file for service names
// var servicesDTD = new XMLHttpRequest();
// servicesDTD.open("GET", "serviceList.txt");
// servicesDTD.send(null);

//Most recent update date for version control
//not working this way
/*
var updateDates = dspsXML.getElementsByTagName("LastUpdated");
var lastUpdate = updateDates.item(0).textContent.split("-");
for (var i=1;i<updateDates.length;i++){
    //alert("length is "+updateDates.length);
    var checkDate = updateDates.item(i).textContent.split("-");
    //check year
    if (Number(checkDate[0]) >= Number(lastUpdate[0])){
        //check month
        if (Number(checkDate[1]) >= Number(lastUpdate[1])){
            //check day
            if (Number(checkDate[2]) > Number(lastUpdate[2])){
                //alert("checkdate[2] is "+checkDate[2]+" lastUpdate[2] is "+lastUpdate[2]);
                lastUpdate = updateDates.item(i).textContent.split("-");
                //alert("lastUpdate[---] is "+lastUpdate[0]+"-"+lastUpdate[1]+"-"+lastUpdate[2]);
            }
        }    
    }
}*/

//COLORS
var RegColor = "#008000";
var TravelColor = "#90EE90";
var LanguageColor = "#ffa500";
var EBABlue = "#D9E5F3";
var NorthernColor = "#406162";
var CentralColor = "#89A16E";
var WesternColor = "#4E5067";
var SouthernColor = "#BCDAE7";
var EasternColor = "#CE844E";
const MidWesternColor = "#5E859F";

//All VA FIPS Codes:
var allFips = [
  "51510",
  "51520",
  "51530",
  "51540",
  "51550",
  "51570",
  "51580",
  "51590",
  "51595",
  "51600",
  "51610",
  "51620",
  "51630",
  "51640",
  "51650",
  "51660",
  "51670",
  "51678",
  "51680",
  "51683",
  "51685",
  "51690",
  "51700",
  "51710",
  "51720",
  "51730",
  "51735",
  "51740",
  "51750",
  "51760",
  "51770",
  "51775",
  "51790",
  "51800",
  "51810",
  "51820",
  "51830",
  "51840",
  "51001",
  "51003",
  "51005",
  "51007",
  "51009",
  "51011",
  "51013",
  "51015",
  "51017",
  "51019",
  "51021",
  "51023",
  "51025",
  "51027",
  "51029",
  "51031",
  "51033",
  "51035",
  "51036",
  "51037",
  "51041",
  "51043",
  "51045",
  "51047",
  "51049",
  "51051",
  "51053",
  "51057",
  "51059",
  "51061",
  "51063",
  "51065",
  "51067",
  "51069",
  "51071",
  "51073",
  "51075",
  "51077",
  "51079",
  "51081",
  "51083",
  "51085",
  "51087",
  "51089",
  "51091",
  "51093",
  "51095",
  "51097",
  "51099",
  "51101",
  "51103",
  "51105",
  "51107",
  "51109",
  "51111",
  "51113",
  "51115",
  "51117",
  "51119",
  "51121",
  "51125",
  "51127",
  "51131",
  "51133",
  "51135",
  "51137",
  "51139",
  "51141",
  "51143",
  "51145",
  "51147",
  "51149",
  "51153",
  "51155",
  "51157",
  "51159",
  "51161",
  "51163",
  "51165",
  "51167",
  "51169",
  "51171",
  "51173",
  "51175",
  "51177",
  "51179",
  "51181",
  "51183",
  "51185",
  "51187",
  "51191",
  "51193",
  "51195",
  "51197",
  "51199",
];

//Define CSUs
//Eastern Region
const CSU1 = {
  localities: ["51550"],
  name: "District 1 - Chesapeake",
  slug: "CSU1",
};
const CSU2 = {
  localities: ["51810"],
  name: "District 2 - Virginia Beach",
  slug: "CSU2",
};
const CSU2A = {
  localities: ["51001", "51131"],
  name: "District 2A - Accomack",
  slug: "CSU2A",
};
const CSU3 = {
  localities: ["51740"],
  name: "District 3 - Portsmouth",
  slug: "CSU3",
};
const CSU4 = {
  localities: ["51710"],
  name: "District 4 - Norfolk",
  slug: "CSU4",
};
const CSU5 = {
  localities: ["51800", "51620", "51093", "51175"],
  name: "District 5 - Suffolk",
  slug: "CSU5",
};
const CSU7 = {
  localities: ["51700"],
  name: "District 7 - Newport News",
  slug: "CSU7",
};
const CSU8 = {
  localities: ["51650"],
  name: "District 8 - Hampton",
  slug: "CSU8",
};
//Southern Region
const CSU6 = {
  localities: ["51670", "51149", "51181", "51183", "51595", "51025", "51081"],
  name: "District 6 - Hopewell",
  slug: "CSU6",
};
const CSU10 = {
  localities: [
    "51011",
    "51029",
    "51037",
    "51049",
    "51083",
    "51111",
    "51117",
    "51147",
  ],
  name: "District 10 - Halifax",
  slug: "CSU10",
};
const CSU11 = {
  localities: ["51730", "51007", "51053", "51135", "51145"],
  name: "District 11 - Petersburg",
  slug: "CSU11",
};
const CSU12 = {
  localities: ["51041", "51570"],
  name: "District 12 - Chesterfield",
  slug: "CSU12",
};
const CSU13 = {
  localities: ["51760"],
  name: "District 13 - Richmond",
  slug: "CSU13",
};
const CSU14 = {
  localities: ["51087"],
  name: "District 14 - Henrico",
  slug: "CSU14",
};

//Northern Region
var CSU17 = {
  localities: ["51013", "51610"],
  name: "District 17 - Arlington",
  slug: "CSU17",
};
var CSU18 = {
  localities: ["51510"],
  name: "District 18 - Alexandria",
  slug: "CSU18",
};
var CSU19 = {
  localities: ["51059"],
  name: "District 19 - Fairfax",
  slug: "CSU19",
};
const CSU20 = {
  localities: ["51107", "51061", "51157"],
  name: "District 20 - Loudoun",
  slug: "CSU20",
};
var CSU26 = {
  localities: [
    "51043",
    "51069",
    "51139",
    "51165",
    "51171",
    "51187",
    "51660",
    "51840",
  ],
  name: "District 26 - Winchester",
  slug: "CSU26",
};
var CSU31 = {
  localities: ["51153", "51683", "51685"],
  name: "District 31 - Manassas",
  slug: "CSU31",
};

//Western Region
var CSU21 = {
  localities: ["51089", "51141", "51690"],
  name: "District 21 - Martinsville",
  slug: "CSU21",
};
var CSU22 = {
  localities: ["51067", "51143", "51590"],
  name: "District 22 - Rocky Mount",
  slug: "CSU22",
};
const CSU23 = {
  localities: ["51161", "51775", "51770"],
  name: "District 23 - Roanoke",
  slug: "CSU23",
};
var CSU27 = {
  localities: [
    "51021",
    "51035",
    "51063",
    "51071",
    "51077",
    "51121",
    "51155",
    "51197",
    "51640",
    "51750",
  ],
  name: "District 27 - Pulaski",
  slug: "CSU27",
};
var CSU28 = {
  localities: ["51173", "51191", "51520"],
  name: "District 28 - Abingdon",
  slug: "CSU28",
};
var CSU29 = {
  localities: ["51027", "51051", "51167", "51185"],
  name: "District 29 - Tazewell",
  slug: "CSU29",
};
var CSU30 = {
  localities: ["51105", "51169", "51195", "51720"],
  name: "District 30 - Gate City",
  slug: "CSU30",
};
//Central Region
var CSU9 = {
  localities: [
    "51036",
    "51073",
    "51095",
    "51097",
    "51101",
    "51115",
    "51119",
    "51127",
    "51199",
    "51735",
    "51830",
  ],
  name: "District 9 - Williamsburg",
  slug: "CSU9",
};
var CSU15 = {
  localities: [
    "51033",
    "51057",
    "51085",
    "51099",
    "51103",
    "51133",
    "51159",
    "51177",
    "51179",
    "51193",
    "51630",
  ],
  name: "District 15 - Fredericksburg",
  slug: "CSU15",
};
var CSU16 = {
  localities: [
    "51003",
    "51047",
    "51065",
    "51075",
    "51079",
    "51109",
    "51113",
    "51137",
    "51540",
  ],
  name: "District 16 - Charlottesville",
  slug: "CSU16",
};
var CSU24 = {
  localities: ["51009", "51019", "51031", "51125", "51680"],
  name: "District 24 - Lynchburg",
  slug: "CSU24",
};
var CSU25 = {
  localities: [
    "51005",
    "51015",
    "51017",
    "51023",
    "51045",
    "51091",
    "51163",
    "51530",
    "51580",
    "51678",
    "51790",
    "51820",
  ],
  name: "District 25 - Staunton",
  slug: "CSU25",
};

// Regions
const NorthernRegion = {
  CSUs: [CSU16, CSU17, CSU18, CSU19, CSU20, CSU26, CSU31],
  name: "Northern Region",
};

const SouthernRegion = {
  CSUs: [CSU5, CSU6, CSU11, CSU12, CSU13],
  name: "Southern Region",
};

const EasternRegion = {
  CSUs: [CSU1, CSU2, CSU2A, CSU3, CSU4],
  name: "Eastern Region",
};

const WesternRegion = {
  CSUs: [CSU21, CSU27, CSU28, CSU29, CSU30],
  name: "Western Region",
};

const CentralRegion = {
  CSUs: [CSU7, CSU8, CSU9, CSU14, CSU15],
  name: "Central Region",
};

const MidWestRegion = {
  CSUs: [CSU10, CSU22, CSU23, CSU24, CSU25],
  name: "Midwest Region",
};

//put CSUs all together
var CSUStructure = [
  NorthernRegion,
  CentralRegion,
  WesternRegion,
  SouthernRegion,
  EasternRegion,
  MidWestRegion,
];
var sortedCSUs = [
  CSU9,
  CSU15,
  CSU16,
  CSU17,
  CSU18,
  CSU19,
  CSU20,
  CSU21,
  CSU22,
  CSU23,
  CSU24,
  CSU25,
  CSU26,
  CSU27,
  CSU28,
  CSU29,
  CSU30,
  CSU31,
];
const sortedCSUsALL = [
  CSU1,
  CSU2,
  CSU2A,
  CSU3,
  CSU4,
  CSU5,
  CSU6,
  CSU7,
  CSU8,
  CSU9,
  CSU10,
  CSU11,
  CSU12,
  CSU13,
  CSU14,
  CSU15,
  CSU16,
  CSU17,
  CSU18,
  CSU19,
  CSU20,
  CSU21,
  CSU22,
  CSU23,
  CSU24,
  CSU25,
  CSU26,
  CSU27,
  CSU28,
  CSU29,
  CSU30,
  CSU31,
];

const localitiesFromRegion = (region) => {
  let localities = [];
  region.CSUs.forEach((csu) => {
    localities = localities.concat(csu.localities);
  });
  return localities;
};

//for use in defining localities
var localityUrl = "locality/index.html?id=";

//get the paramaters from url
var queryString = window.location.search;
queryString = queryString.substring(1);

//GET URL PARAMATERS
var urlString = window.location.search;
var urlParamaters = urlString.split("?");
var paramaterName = [];
var paramaterValue = [];
//split paramater name and value
for (i = 1; i < urlParamaters.length; i++) {
  var paramaterSplit = urlParamaters[i].split("=");
  paramaterName.push(paramaterSplit[0]);
  paramaterValue.push(paramaterSplit[1]);
}
//for use on dependent pages: provider.php
var mapLayer = paramaterValue[1];
var pageID = paramaterValue[0];

//Get all services currently in the data source
//for use in services directory on main page
var availableServices = [];
/*old
var serviceCheck = dspsXML.getElementsByTagName("ServiceItem");
for (i=0;i<serviceCheck.length;i++){
    //new for IE-compatible
    availableServices.push(serviceCheck.item(i).textContent);
    //old
    //availableServices.push(serviceCheck[i].innerHTML);
}
*/
var serviceCheck = dspsXML.getElementsByTagName("Service");
for (var i = 0; i < serviceCheck.length; i++) {
  availableServices.push(serviceCheck.item(i).getAttribute("serviceName"));
}
availableServices = removeDuplicates(availableServices);
availableServices.sort(); //for services.php the array index will be the service id.
//console.log(`availableServices... ${availableServices}`)

//get all languges currently in the data source
var allLocations = dspsXML.getElementsByTagName("FIPs");
var allLanguagesArray = [];
//alert ("lenght "+allProviderServices.length);
for (var i = 0; i < allLocations.length; i++) {
  //var serviceNote = allProviderServices.item(i).getAttribute("note");
  //allProviderLanguagesArray.push(allProviderServices.item(i).getAttribute("serviceName"));
  if (allLocations.item(i).getAttribute("languages")) {
    var serviceLanguageStr = allLocations.item(i).getAttribute("languages");
    while (serviceLanguageStr.indexOf(" ") >= 0) {
      serviceLanguageStr = serviceLanguageStr.replace(" ", "");
    }
    //alert("attribute is "+allProviderLocations.item(i).getAttribute("languages"));
    if (serviceLanguageStr.includes(",")) {
      var serviceLanguages = serviceLanguageStr.split(",");
      for (var j = 0; j < serviceLanguages.length; j++) {
        allLanguagesArray.push(serviceLanguages[j]);
      }
    } else {
      //var serviceLanguages = allProviderLocations.item(i).getAttribute("languages");
      allLanguagesArray.push(allLocations.item(i).getAttribute("languages"));
    }
  }
  //alert("serviceLanguageStr is "+serviceLanguageStr);
  //alert("attribute is "+allProviderLocations.item(i).getAttribute("languages"));
  //alert("serviceLanguages is "+serviceLanguages.item(i));
  //for (j=0;j<serviceLanguages.legth;j++){
  //    allProviderLanguagesArray.push(serviceLanguages[j]);
  //}
}

allLanguagesArray = removeDuplicates(allLanguagesArray);
allLanguagesArray.sort();
