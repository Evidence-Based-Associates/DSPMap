/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_OPTIONS: () => (/* binding */ API_OPTIONS),
/* harmony export */   config: () => (/* binding */ config)
/* harmony export */ });
const API_OPTIONS = {
  XML: "XML",
  FIREBASE: "FIREBASE",
};

const config = {
  API: API_OPTIONS.XML,
};


/***/ }),

/***/ "./src/api/api.js":
/*!************************!*\
  !*** ./src/api/api.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API: () => (/* binding */ API)
/* harmony export */ });
/* harmony import */ var _xml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./xml.js */ "./src/api/xml.js");
/* harmony import */ var _firebase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./firebase.js */ "./src/api/firebase.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config.js */ "./config.js");




const API =
  _config_js__WEBPACK_IMPORTED_MODULE_2__.config.API === _config_js__WEBPACK_IMPORTED_MODULE_2__.API_OPTIONS.XML ? new _xml_js__WEBPACK_IMPORTED_MODULE_0__.XML_API() : new _firebase_js__WEBPACK_IMPORTED_MODULE_1__.FIREBASE_API();


/***/ }),

/***/ "./src/api/firebase.js":
/*!*****************************!*\
  !*** ./src/api/firebase.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FIREBASE_API: () => (/* binding */ FIREBASE_API)
/* harmony export */ });
class FIREBASE_API {
  constructor() {
    this.name = "FIREBASE_API";
  }

  test() {
    console.log("FIREBASE_API");
  }

  getLastUpdated() {
    return "not yet implemented in FIREBASE_API";
  }

  getAllProviders() {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllProvidersByCSU(csu) {
    // not yet implemented in FIREBASE_API
    return new Map();
  }

  getAllProvidersByFIPS(fips) {
    // not yet implemented in FIREBASE_API
    return new Map();
  }

  getProviderServices(providerID) {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getProviderInfo(providerID) {
    // not yet implemented in FIREBASE_API
    return {};
  }

  getAllServicesByProviderInFIPS(providerId, fips) {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllServiceNamesByCSU(csu) {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllServicesByProviderInCSU(providerId, csu) {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllProvidersOfServiceInCSU(serviceName, csu) {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllProvidersOfLanguage(languageName) {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllProvidersOfService(serviceName) {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllLocations() {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllServiceNames() {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getAllLanguages() {
    // not yet implemented in FIREBASE_API
    return [];
  }

  getServiceMapFIPS(providerID, serviceName) {
    // not yet implemented in FIREBASE_API
    return { available: [], limited: [], languages: new Map() };
  }

  getAllFIPS(providerID) {
    // not yet implemented in FIREBASE_API
    return [];
  }

  searchProviders({ serviceName, locationType, locationID, languageName }) {
    // not yet implemented in FIREBASE_API
    return new Map();
  }
}


/***/ }),

/***/ "./src/api/xml.js":
/*!************************!*\
  !*** ./src/api/xml.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XML_API: () => (/* binding */ XML_API)
/* harmony export */ });
/* harmony import */ var _lib_csu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/csu.js */ "./src/lib/csu.js");


class XML_API {
  filename = "/data/dsps.xml";

  constructor() {
    this.name = "XML_API";
    this.getXML();
  }

  async getXML() {
    const Connect = new XMLHttpRequest();
    Connect.open("GET", this.filename, false);
    Connect.setRequestHeader("Content-Type", "text/xml");
    Connect.send(null);
    this.data = Connect.responseXML;
  }

  getLastUpdated() {
    if (this.data !== null && this.data !== undefined) {
      const updateDates = this.data.getElementsByTagName("LastUpdated");
      const updateArray = [];
      let updateArryText = "";
      for (let i = 0; i < updateDates.length; i++) {
        updateArray.push(updateDates.item(i).textContent);
      }
      updateArray.sort();
      for (let i = 0; i < updateDates.length; i++) {
        updateArryText += updateArray[i] + "\r";
      }
      const directoryUpdatedSplit =
        updateArray[updateDates.length - 1].split("-");
      let directoryUpdated = "";
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
      directoryUpdated += Number(directoryUpdatedSplit[2]) + ", ";
      directoryUpdated += directoryUpdatedSplit[0];
      return directoryUpdated;
    } else {
      return "No data available.";
    }
  }

  getAllProviders() {
    if (this.data !== null && this.data !== undefined) {
      const providers = this.data.getElementsByTagName("Provider");
      const providerList = [];
      for (let i = 0; i < providers.length; i++) {
        const providerName = providers
          .item(i)
          ?.getElementsByTagName("Name")
          ?.item(0)?.textContent;
        const providerId = providers.item(i)?.getAttribute("id");
        providerList.push({ name: providerName, id: providerId });
      }
      providerList.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });
      return providerList;
    } else {
      return [];
    }
  }

  getAllProvidersByCSU(csu) {
    if (this.data !== null && this.data !== undefined) {
      const providerList = new Map();
      const serviceFIPS = [...this.data.getElementsByTagName("FIPs")];

      const csuServiceFIPS = serviceFIPS.filter((fips) =>
        csu.localities.includes(fips.textContent)
      );

      csuServiceFIPS.forEach((fips) => {
        const provider = fips.parentElement.parentElement;
        const providerName = provider
          .getElementsByTagName("Name")
          .item(0).textContent;
        const providerId = provider.getAttribute("id");

        if (!providerList.has(providerId)) {
          providerList.set(providerId, providerName);
        }
      });
      return new Map(
        [...providerList.entries()].sort((a, b) => a[1].localeCompare(b[1]))
      );
    } else {
      return new Map();
    }
  }

  getAllProvidersByFIPS(fips) {
    const providerList = new Map();
    const allFIPS = [...this.data.getElementsByTagName("FIPs")];

    const targetFIPS = allFIPS.filter(
      (fipsElement) => fipsElement.textContent === fips
    );

    targetFIPS.forEach((fipsElement) => {
      const provider = fipsElement.parentElement.parentElement;
      const providerName = provider
        .getElementsByTagName("Name")
        .item(0).textContent;
      const providerId = provider.getAttribute("id");

      providerList.set(providerId, providerName);
    });
    return new Map(
      [...providerList.entries()].sort((a, b) => a[1].localeCompare(b[1]))
    );
  }

  getProviderServices(providerID) {
    const provider = this.data.getElementById(providerID);
    const serviceElements = provider.getElementsByTagName("Service");
    const serviceNames = new Set();
    for (let i = 0; i < serviceElements.length; i++) {
      const service = serviceElements.item(i);
      serviceNames.add(service.getAttribute("serviceName"));
    }
    return [...serviceNames].sort();
  }

  getProviderInfo(providerID) {
    const provider = this.data.getElementById(providerID);
    const mapZoom = provider
      .getElementsByTagName("MapZoom")
      .item(0).textContent;
    const contactName = provider
      .getElementsByTagName("ContactName")
      .item(0).textContent;
    const providerName = provider
      .getElementsByTagName("Name")
      .item(0).textContent;
    const contactEmail = provider
      .getElementsByTagName("ContactEmail")
      .item(0).textContent;
    const website = provider
      .getElementsByTagName("Website")
      .item(0).textContent;
    const lastUpdated = provider
      .getElementsByTagName("LastUpdated")
      .item(0).textContent;
    return {
      providerName,
      contactName,
      contactEmail,
      website,
      lastUpdated,
      mapZoom,
    };
  }

  getAllServiceNamesByCSU(csu) {
    if (this.data !== null && this.data !== undefined) {
      const serviceList = new Set();
      const serviceFIPS = [...this.data.getElementsByTagName("FIPs")];

      const csuServiceFIPS = serviceFIPS.filter((fips) =>
        csu.localities.includes(fips.textContent)
      );

      csuServiceFIPS.forEach((fips) => {
        const service = fips.parentElement;
        const serviceName = service.getAttribute("serviceName");

        serviceList.add(serviceName);
      });

      return [...serviceList].sort();
    } else {
      return [];
    }
  }

  getAllServicesByProviderInFIPS(providerId, fips) {
    const provider = this.data.getElementById(providerId);
    const providerServices = provider.getElementsByTagName("Service");
    const serviceList = new Map();
    for (let i = 0; i < providerServices.length; i++) {
      const service = providerServices.item(i);
      const serviceFIPS = service.getElementsByTagName("FIPs");
      for (let j = 0; j < serviceFIPS.length; j++) {
        if (serviceFIPS.item(j).textContent === fips) {
          const isLimitedService =
            serviceFIPS.item(j).getAttribute("travelReq") === "Y";
          serviceList.set(
            service.getAttribute("serviceName"),
            isLimitedService
          );
          break;
        }
      }
    }
    return new Map(
      [...serviceList.entries()].sort((a, b) => a[0].localeCompare(b[0]))
    );
  }

  getAllServicesByProviderInCSU(providerId, csu) {
    const provider = this.data.getElementById(providerId);
    const providerServices = provider.getElementsByTagName("Service");
    const serviceList = new Set();
    for (let i = 0; i < providerServices.length; i++) {
      const service = providerServices.item(i);
      const serviceFIPS = service.getElementsByTagName("FIPs");
      for (let j = 0; j < serviceFIPS.length; j++) {
        if (csu.localities.includes(serviceFIPS.item(j).textContent)) {
          serviceList.add(service.getAttribute("serviceName"));
          break;
        }
      }
    }
    return [...serviceList].sort();
  }

  getAllProvidersOfServiceInCSU(serviceName, csu) {
    const serviceFIPS = [...this.data.getElementsByTagName("FIPs")];
    const csuServiceFIPS = serviceFIPS.filter((fips) =>
      csu.localities.includes(fips.textContent)
    );

    const providerList = new Map();
    csuServiceFIPS.forEach((fips) => {
      const provider = fips.parentElement.parentElement;
      const providerName = provider
        .getElementsByTagName("Name")
        .item(0).textContent;
      const providerId = provider.getAttribute("id");
      const providerServices = provider.getElementsByTagName("Service");
      for (let i = 0; i < providerServices.length; i++) {
        if (
          providerServices.item(i).getAttribute("serviceName") === serviceName
        ) {
          providerList.set(providerId, providerName);
          break;
        }
      }
    });

    return new Map(
      [...providerList.entries()].sort((a, b) => a[1].localeCompare(b[1]))
    );
  }

  getAllProvidersOfLanguage(languageName) {
    const providers = new Map();

    const allFIPS = [...this.data.getElementsByTagName("FIPs")];
    allFIPS.forEach((location) => {
      const fipsLanguages = location.getAttribute("languages");
      if (fipsLanguages && fipsLanguages.includes(languageName)) {
        const provider = location.parentElement.parentElement;
        const providerID = provider.getAttribute("id");
        const providerName = provider
          .getElementsByTagName("Name")
          .item(0).textContent;
        providers.set(providerID, providerName);
      }
    });

    return new Map(
      [...providers.entries()].sort((a, b) => a[1].localeCompare(b[1]))
    );
  }

  getAllProvidersOfService(serviceName) {
    const providers = new Map();

    const allServices = this.data.getElementsByTagName("Service");
    for (let i = 0; i < allServices.length; i++) {
      const service = allServices.item(i);
      if (service.getAttribute("serviceName") === serviceName) {
        const provider = service.parentElement;
        const providerID = provider.getAttribute("id");
        const providerName = provider
          .getElementsByTagName("Name")
          .item(0).textContent;
        providers.set(providerID, providerName);
      }
    }

    return new Map(
      [...providers.entries()].sort((a, b) => a[1].localeCompare(b[1]))
    );
  }

  /**
   * @param {string} [providerID]
   */
  getAllLocations(providerID) {
    let locations;
    if (!providerID) {
      locations = this.data.getElementsByTagName("Office");
    } else {
      const provider = this.data.getElementById(providerID);
      locations = provider.getElementsByTagName("Office");
    }
    const locationArray = [];
    for (let i = 0; i < locations.length; i++) {
      const location = locations.item(i);
      // get location's provider name (in parent node)
      const locationObject = {
        providerName: location.parentElement
          .getElementsByTagName("Name")
          .item(0).textContent,
        providerId: location.parentElement.getAttribute("id"),
        lat: location.getElementsByTagName("Lat").item(0).textContent,
        lng: location.getElementsByTagName("Lng").item(0).textContent,
        street: location.getElementsByTagName("Street").item(0).textContent,
        city: location.getElementsByTagName("City").item(0).textContent,
        state: location.getElementsByTagName("State").item(0).textContent,
        zip: location.getElementsByTagName("Zip").item(0).textContent,
        phone: location.getElementsByTagName("Phone").item(0).textContent,
      };
      locationArray.push(locationObject);
    }
    return locationArray;
  }

  getAllServiceNames() {
    if (this.data !== null && this.data !== undefined) {
      const services = this.data.getElementsByTagName("Service");
      const serviceNames = [];
      for (let i = 0; i < services.length; i++) {
        const serviceName = services.item(i)?.getAttribute("serviceName");
        serviceNames.push(serviceName);
      }
      serviceNames.sort();
      return [...new Set(serviceNames)];
    } else {
      return [];
    }
  }

  getAllLanguages(providerID) {
    let allLocations;
    if (!providerID) {
      allLocations = this.data.getElementsByTagName("FIPs");
    } else {
      const provider = this.data.getElementById(providerID);
      allLocations = provider.getElementsByTagName("FIPs");
    }

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
          allLanguagesArray.push(
            allLocations.item(i).getAttribute("languages")
          );
        }
      }
    }
    allLanguagesArray.sort();
    return [...new Set(allLanguagesArray)];
  }

  /**
   *
   * @param {Object} params
   * @param {string} [params.providerID]
   * @param {string} params.serviceName
   * @returns
   */
  getServiceMapFIPS({ providerID, serviceName }) {
    let serviceElements;

    if (providerID) {
      const provider = this.data.getElementById(providerID);
      serviceElements = provider.getElementsByTagName("Service");
    } else {
      serviceElements = this.data.getElementsByTagName("Service");
    }

    const availableFIPS = [];
    const limitedFIPS = [];
    const languageMap = new Map();
    for (let i = 0; i < serviceElements.length; i++) {
      const service = serviceElements.item(i);
      if (service.getAttribute("serviceName") === serviceName) {
        const serviceFIPS = service.getElementsByTagName("FIPs");
        for (let j = 0; j < serviceFIPS.length; j++) {
          const fips = serviceFIPS.item(j).textContent;
          const isLimited =
            serviceFIPS.item(j).getAttribute("travelReq") === "Y";
          if (isLimited) {
            limitedFIPS.push(fips);
          } else {
            availableFIPS.push(fips);
          }
          const languageList = serviceFIPS.item(j).getAttribute("languages");
          if (languageList) {
            const languageArray = languageList.split(",");
            languageArray.forEach((language) => {
              if (languageMap.has(language)) {
                languageMap.get(language).add(fips);
              } else {
                languageMap.set(language, new Set([fips]));
              }
            });
          }
        }
      }
    }
    //convert the languageMap into an object with keys and the fipsSet
    const languageFIPS = [...languageMap].map(([language, fipsSet]) => ({
      [language]: [...fipsSet],
    }));
    return {
      available: availableFIPS,
      limited: limitedFIPS,
      languages: languageFIPS,
    };
  }

  getAllFIPS(providerID) {
    const provider = this.data.getElementById(providerID);
    const allProviderFIPS = provider.getElementsByTagName("FIPs");

    const fipsList = [];
    for (let i = 0; i < allProviderFIPS.length; i++) {
      fipsList.push(allProviderFIPS.item(i).textContent);
    }
    return [...new Set(fipsList)];
  }

  /**
   *
   * @param {Object} searchParams
   * @param {string} [searchParams.serviceName]
   * @param {string} [searchParams.locationID]
   * @param {string} [searchParams.locationType]
   * @param {string} [searchParams.languageName]
   */
  searchProviders({ serviceName, locationID, locationType, languageName }) {
    const allFIPS = this.data.getElementsByTagName("FIPs");
    const providerList = new Map();

    for (let i = 0; i < allFIPS.length; i++) {
      let isServiceMatch = false;
      let isLocationMatch = false;
      let isLanguageMatch = false;
      const fipsService = allFIPS
        .item(i)
        .parentElement.getAttribute("serviceName");
      if (
        !serviceName ||
        serviceName === "any" ||
        serviceName === fipsService
      ) {
        isServiceMatch = true;
      }

      const fips = allFIPS.item(i);
      if (
        !locationID ||
        locationID === "any" ||
        fips.textContent === locationID
      ) {
        isLocationMatch = true;
      }

      if (
        locationType === "CSU" &&
        (0,_lib_csu_js__WEBPACK_IMPORTED_MODULE_0__.isLocalityInCSUID)(locationID, fips.textContent)
      ) {
        isLocationMatch = true;
      }
      if (
        locationType === "Region" &&
        (0,_lib_csu_js__WEBPACK_IMPORTED_MODULE_0__.isLocalityInRegionID)(locationID, fips.textContent)
      ) {
        isLocationMatch = true;
      }

      if (!languageName || languageName === "English") {
        isLanguageMatch = true;
      }

      if (fips.getAttribute("languages")) {
        const languageList = fips.getAttribute("languages");
        if (languageList.includes(languageName)) {
          isLanguageMatch = true;
        }
      }

      if (isServiceMatch && isLocationMatch && isLanguageMatch) {
        const provider = fips.parentElement.parentElement;
        const providerID = provider.getAttribute("id");
        const providerName = provider
          .getElementsByTagName("Name")
          .item(0).textContent;
        providerList.set(providerID, providerName);
      }
    }

    return new Map(
      [...providerList.entries()].sort((a, b) => a[1].localeCompare(b[1]))
    );
  }

  test() {
    if (this.data !== null && this.data !== undefined) {
      // console.log(this.data);
      return this.data.getElementById("1");
    } else {
      return "No data available.";
    }
  }
}


/***/ }),

/***/ "./src/lib/csu.js":
/*!************************!*\
  !*** ./src/lib/csu.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSUStructure: () => (/* binding */ CSUStructure),
/* harmony export */   allFips: () => (/* binding */ allFips),
/* harmony export */   csuListFromFIPS: () => (/* binding */ csuListFromFIPS),
/* harmony export */   isLocalityInCSUID: () => (/* binding */ isLocalityInCSUID),
/* harmony export */   isLocalityInRegion: () => (/* binding */ isLocalityInRegion),
/* harmony export */   isLocalityInRegionID: () => (/* binding */ isLocalityInRegionID),
/* harmony export */   regionCSUs: () => (/* binding */ regionCSUs),
/* harmony export */   sortedCSUs: () => (/* binding */ sortedCSUs)
/* harmony export */ });
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

const sortedCSUs = [
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

const allFips = [
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

// Regions
const NorthernRegion = {
  CSUs: [CSU16, CSU17, CSU18, CSU19, CSU20, CSU26, CSU31],
  name: "Northern Region",
  slug: "north",
};

const SouthernRegion = {
  CSUs: [CSU5, CSU6, CSU11, CSU12, CSU13],
  name: "Southern Region",
  slug: "south",
};

const EasternRegion = {
  CSUs: [CSU1, CSU2, CSU2A, CSU3, CSU4],
  name: "Eastern Region",
  slug: "east",
};

const WesternRegion = {
  CSUs: [CSU21, CSU27, CSU28, CSU29, CSU30],
  name: "Western Region",
  slug: "west",
};

const CentralRegion = {
  CSUs: [CSU7, CSU8, CSU9, CSU14, CSU15],
  name: "Central Region",
  slug: "central",
};

const MidWestRegion = {
  CSUs: [CSU10, CSU22, CSU23, CSU24, CSU25],
  name: "Midwest Region",
  slug: "midwest",
};

const CSUStructure = [
  EasternRegion,
  SouthernRegion,
  CentralRegion,
  NorthernRegion,
  WesternRegion,
  MidWestRegion,
];

const regionCSUs = {
  NorthernRegion,
  SouthernRegion,
  EasternRegion,
  WesternRegion,
  CentralRegion,
  MidWestRegion,
};

const isLocalityInRegion = (region, locality) => {
  let found = false;
  region.CSUs.forEach((csu) => {
    if (csu.localities.includes(locality)) {
      found = true;
    }
  });
  return found;
};

const isLocalityInRegionID = (regionID, locality) => {
  const region = CSUStructure.find((region) => region.slug === regionID);
  return isLocalityInRegion(region, locality);
};

const isLocalityInCSUID = (csuID, locality) => {
  const csu = sortedCSUs.find((csu) => csu.slug === csuID);
  return csu.localities.includes(locality);
};

const csuListFromFIPS = (fipsList) => {
  const csuNames = new Set();
  sortedCSUs.forEach((csu) => {
    if (csu.localities.some((locality) => fipsList.includes(locality))) {
      csuNames.add(csu.name);
    }
  });
  return [...csuNames];
};


/***/ }),

/***/ "./src/pages/language/api.js":
/*!***********************************!*\
  !*** ./src/pages/language/api.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   languageName: () => (/* binding */ languageName),
/* harmony export */   providers: () => (/* binding */ providers)
/* harmony export */ });
/* harmony import */ var _api_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api/api.js */ "./src/api/api.js");


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const languageID = urlParams.get("id");

const languageName = languageID ? _api_api_js__WEBPACK_IMPORTED_MODULE_0__.API.getAllLanguages()[languageID] : "";
const providers = _api_api_js__WEBPACK_IMPORTED_MODULE_0__.API.getAllProvidersOfLanguage(languageName);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************************!*\
  !*** ./src/pages/language/index.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./src/pages/language/api.js");


const providerList = document.getElementById("providerList");
_api_js__WEBPACK_IMPORTED_MODULE_0__.providers.forEach((name, id) => {
  const providerLI = document.createElement("li");
  providerLI.innerHTML = `<a href='../provider/index.html?id=${id}'>${name}</a>`;
  providerList && providerList.appendChild(providerLI);
});

const languageNameSpans = document.getElementsByName("langaugeText");
languageNameSpans.forEach((span) => {
  span.innerHTML = _api_js__WEBPACK_IMPORTED_MODULE_0__.languageName;
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMvbGFuZ3VhZ2UvYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUG1DO0FBQ1U7QUFDUzs7QUFFL0M7QUFDUCxFQUFFLDhDQUFNLFNBQVMsbURBQVcsV0FBVyw0Q0FBTyxTQUFTLHNEQUFZOzs7Ozs7Ozs7Ozs7Ozs7QUNMNUQ7QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixxREFBcUQ7QUFDekU7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqR3dFOztBQUVqRTtBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isd0JBQXdCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix3QkFBd0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isc0JBQXNCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsb0NBQW9DO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNkJBQTZCO0FBQ2pEO0FBQ0E7QUFDQSxzQkFBc0Isd0JBQXdCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw2QkFBNkI7QUFDakQ7QUFDQTtBQUNBLHNCQUFzQix3QkFBd0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsNkJBQTZCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0Isd0JBQXdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHFCQUFxQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDZCQUE2QjtBQUN2RDtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBLHNCQUFzQix5QkFBeUI7QUFDL0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isd0JBQXdCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0Esb0JBQW9CLHFEQUFxRDtBQUN6RTtBQUNBOztBQUVBLG9CQUFvQixvQkFBb0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSw4REFBaUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQW9CO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RpQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuZnVDOztBQUV2QztBQUNBO0FBQ0E7O0FBRU8sa0NBQWtDLDRDQUFHO0FBQ3JDLGtCQUFrQiw0Q0FBRzs7Ozs7OztVQ1A1QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm1EOztBQUVuRDtBQUNBLDhDQUFTO0FBQ1Q7QUFDQSwrREFBK0QsR0FBRyxJQUFJLEtBQUs7QUFDM0U7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxtQkFBbUIsaURBQVk7QUFDL0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ViYS1wcm92aWRlci1kaXJlY3RvcnkvLi9jb25maWcuanMiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS8uL3NyYy9hcGkvYXBpLmpzIiwid2VicGFjazovL2ViYS1wcm92aWRlci1kaXJlY3RvcnkvLi9zcmMvYXBpL2ZpcmViYXNlLmpzIiwid2VicGFjazovL2ViYS1wcm92aWRlci1kaXJlY3RvcnkvLi9zcmMvYXBpL3htbC5qcyIsIndlYnBhY2s6Ly9lYmEtcHJvdmlkZXItZGlyZWN0b3J5Ly4vc3JjL2xpYi9jc3UuanMiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS8uL3NyYy9wYWdlcy9sYW5ndWFnZS9hcGkuanMiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lYmEtcHJvdmlkZXItZGlyZWN0b3J5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lYmEtcHJvdmlkZXItZGlyZWN0b3J5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ViYS1wcm92aWRlci1kaXJlY3RvcnkvLi9zcmMvcGFnZXMvbGFuZ3VhZ2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IEFQSV9PUFRJT05TID0ge1xuICBYTUw6IFwiWE1MXCIsXG4gIEZJUkVCQVNFOiBcIkZJUkVCQVNFXCIsXG59O1xuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBBUEk6IEFQSV9PUFRJT05TLlhNTCxcbn07XG4iLCJpbXBvcnQgeyBYTUxfQVBJIH0gZnJvbSBcIi4veG1sLmpzXCI7XG5pbXBvcnQgeyBGSVJFQkFTRV9BUEkgfSBmcm9tIFwiLi9maXJlYmFzZS5qc1wiO1xuaW1wb3J0IHsgY29uZmlnLCBBUElfT1BUSU9OUyB9IGZyb20gXCIuLi8uLi9jb25maWcuanNcIjtcblxuZXhwb3J0IGNvbnN0IEFQSSA9XG4gIGNvbmZpZy5BUEkgPT09IEFQSV9PUFRJT05TLlhNTCA/IG5ldyBYTUxfQVBJKCkgOiBuZXcgRklSRUJBU0VfQVBJKCk7XG4iLCJleHBvcnQgY2xhc3MgRklSRUJBU0VfQVBJIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5uYW1lID0gXCJGSVJFQkFTRV9BUElcIjtcbiAgfVxuXG4gIHRlc3QoKSB7XG4gICAgY29uc29sZS5sb2coXCJGSVJFQkFTRV9BUElcIik7XG4gIH1cblxuICBnZXRMYXN0VXBkYXRlZCgpIHtcbiAgICByZXR1cm4gXCJub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVwiO1xuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzKCkge1xuICAgIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gRklSRUJBU0VfQVBJXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzQnlDU1UoY3N1KSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gbmV3IE1hcCgpO1xuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzQnlGSVBTKGZpcHMpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBuZXcgTWFwKCk7XG4gIH1cblxuICBnZXRQcm92aWRlclNlcnZpY2VzKHByb3ZpZGVySUQpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldFByb3ZpZGVySW5mbyhwcm92aWRlcklEKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBnZXRBbGxTZXJ2aWNlc0J5UHJvdmlkZXJJbkZJUFMocHJvdmlkZXJJZCwgZmlwcykge1xuICAgIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gRklSRUJBU0VfQVBJXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZ2V0QWxsU2VydmljZU5hbWVzQnlDU1UoY3N1KSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRBbGxTZXJ2aWNlc0J5UHJvdmlkZXJJbkNTVShwcm92aWRlcklkLCBjc3UpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEFsbFByb3ZpZGVyc09mU2VydmljZUluQ1NVKHNlcnZpY2VOYW1lLCBjc3UpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEFsbFByb3ZpZGVyc09mTGFuZ3VhZ2UobGFuZ3VhZ2VOYW1lKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnNPZlNlcnZpY2Uoc2VydmljZU5hbWUpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEFsbExvY2F0aW9ucygpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEFsbFNlcnZpY2VOYW1lcygpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEFsbExhbmd1YWdlcygpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldFNlcnZpY2VNYXBGSVBTKHByb3ZpZGVySUQsIHNlcnZpY2VOYW1lKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4geyBhdmFpbGFibGU6IFtdLCBsaW1pdGVkOiBbXSwgbGFuZ3VhZ2VzOiBuZXcgTWFwKCkgfTtcbiAgfVxuXG4gIGdldEFsbEZJUFMocHJvdmlkZXJJRCkge1xuICAgIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gRklSRUJBU0VfQVBJXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgc2VhcmNoUHJvdmlkZXJzKHsgc2VydmljZU5hbWUsIGxvY2F0aW9uVHlwZSwgbG9jYXRpb25JRCwgbGFuZ3VhZ2VOYW1lIH0pIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBuZXcgTWFwKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGlzTG9jYWxpdHlJbkNTVUlELCBpc0xvY2FsaXR5SW5SZWdpb25JRCB9IGZyb20gXCIuLi9saWIvY3N1LmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBYTUxfQVBJIHtcbiAgZmlsZW5hbWUgPSBcIi9kYXRhL2RzcHMueG1sXCI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5uYW1lID0gXCJYTUxfQVBJXCI7XG4gICAgdGhpcy5nZXRYTUwoKTtcbiAgfVxuXG4gIGFzeW5jIGdldFhNTCgpIHtcbiAgICBjb25zdCBDb25uZWN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgQ29ubmVjdC5vcGVuKFwiR0VUXCIsIHRoaXMuZmlsZW5hbWUsIGZhbHNlKTtcbiAgICBDb25uZWN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3htbFwiKTtcbiAgICBDb25uZWN0LnNlbmQobnVsbCk7XG4gICAgdGhpcy5kYXRhID0gQ29ubmVjdC5yZXNwb25zZVhNTDtcbiAgfVxuXG4gIGdldExhc3RVcGRhdGVkKCkge1xuICAgIGlmICh0aGlzLmRhdGEgIT09IG51bGwgJiYgdGhpcy5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHVwZGF0ZURhdGVzID0gdGhpcy5kYXRhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiTGFzdFVwZGF0ZWRcIik7XG4gICAgICBjb25zdCB1cGRhdGVBcnJheSA9IFtdO1xuICAgICAgbGV0IHVwZGF0ZUFycnlUZXh0ID0gXCJcIjtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdXBkYXRlRGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdXBkYXRlQXJyYXkucHVzaCh1cGRhdGVEYXRlcy5pdGVtKGkpLnRleHRDb250ZW50KTtcbiAgICAgIH1cbiAgICAgIHVwZGF0ZUFycmF5LnNvcnQoKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdXBkYXRlRGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdXBkYXRlQXJyeVRleHQgKz0gdXBkYXRlQXJyYXlbaV0gKyBcIlxcclwiO1xuICAgICAgfVxuICAgICAgY29uc3QgZGlyZWN0b3J5VXBkYXRlZFNwbGl0ID1cbiAgICAgICAgdXBkYXRlQXJyYXlbdXBkYXRlRGF0ZXMubGVuZ3RoIC0gMV0uc3BsaXQoXCItXCIpO1xuICAgICAgbGV0IGRpcmVjdG9yeVVwZGF0ZWQgPSBcIlwiO1xuICAgICAgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjAxXCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiSmFudWFyeSBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMDJcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJGZWJydWFyeSBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMDNcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJNYXJjaCBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMDRcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJBcHJpbCBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMDVcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJNYXkgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjA2XCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiSnVuZSBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMDdcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJKdWx5IFwiO1xuICAgICAgfSBlbHNlIGlmIChkaXJlY3RvcnlVcGRhdGVkU3BsaXRbMV0gPT0gXCIwOFwiKSB7XG4gICAgICAgIGRpcmVjdG9yeVVwZGF0ZWQgPSBcIkF1Z3VzdCBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMDlcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJTZXB0ZW1iZXIgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjEwXCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiT2N0b2JlciBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMTFcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJOb3ZlbWJlciBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMTJcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJEZWNlbWJlciBcIjtcbiAgICAgIH1cbiAgICAgIGRpcmVjdG9yeVVwZGF0ZWQgKz0gTnVtYmVyKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsyXSkgKyBcIiwgXCI7XG4gICAgICBkaXJlY3RvcnlVcGRhdGVkICs9IGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFswXTtcbiAgICAgIHJldHVybiBkaXJlY3RvcnlVcGRhdGVkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJObyBkYXRhIGF2YWlsYWJsZS5cIjtcbiAgICB9XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnMoKSB7XG4gICAgaWYgKHRoaXMuZGF0YSAhPT0gbnVsbCAmJiB0aGlzLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgcHJvdmlkZXJzID0gdGhpcy5kYXRhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiUHJvdmlkZXJcIik7XG4gICAgICBjb25zdCBwcm92aWRlckxpc3QgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyTmFtZSA9IHByb3ZpZGVyc1xuICAgICAgICAgIC5pdGVtKGkpXG4gICAgICAgICAgPy5nZXRFbGVtZW50c0J5VGFnTmFtZShcIk5hbWVcIilcbiAgICAgICAgICA/Lml0ZW0oMCk/LnRleHRDb250ZW50O1xuICAgICAgICBjb25zdCBwcm92aWRlcklkID0gcHJvdmlkZXJzLml0ZW0oaSk/LmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgICBwcm92aWRlckxpc3QucHVzaCh7IG5hbWU6IHByb3ZpZGVyTmFtZSwgaWQ6IHByb3ZpZGVySWQgfSk7XG4gICAgICB9XG4gICAgICBwcm92aWRlckxpc3Quc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYS5uYW1lIDwgYi5uYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9IGVsc2UgaWYgKGEubmFtZSA+IGIubmFtZSkge1xuICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBwcm92aWRlckxpc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnNCeUNTVShjc3UpIHtcbiAgICBpZiAodGhpcy5kYXRhICE9PSBudWxsICYmIHRoaXMuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBwcm92aWRlckxpc3QgPSBuZXcgTWFwKCk7XG4gICAgICBjb25zdCBzZXJ2aWNlRklQUyA9IFsuLi50aGlzLmRhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpXTtcblxuICAgICAgY29uc3QgY3N1U2VydmljZUZJUFMgPSBzZXJ2aWNlRklQUy5maWx0ZXIoKGZpcHMpID0+XG4gICAgICAgIGNzdS5sb2NhbGl0aWVzLmluY2x1ZGVzKGZpcHMudGV4dENvbnRlbnQpXG4gICAgICApO1xuXG4gICAgICBjc3VTZXJ2aWNlRklQUy5mb3JFYWNoKChmaXBzKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyID0gZmlwcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyTmFtZSA9IHByb3ZpZGVyXG4gICAgICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiTmFtZVwiKVxuICAgICAgICAgIC5pdGVtKDApLnRleHRDb250ZW50O1xuICAgICAgICBjb25zdCBwcm92aWRlcklkID0gcHJvdmlkZXIuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG5cbiAgICAgICAgaWYgKCFwcm92aWRlckxpc3QuaGFzKHByb3ZpZGVySWQpKSB7XG4gICAgICAgICAgcHJvdmlkZXJMaXN0LnNldChwcm92aWRlcklkLCBwcm92aWRlck5hbWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgTWFwKFxuICAgICAgICBbLi4ucHJvdmlkZXJMaXN0LmVudHJpZXMoKV0uc29ydCgoYSwgYikgPT4gYVsxXS5sb2NhbGVDb21wYXJlKGJbMV0pKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBNYXAoKTtcbiAgICB9XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnNCeUZJUFMoZmlwcykge1xuICAgIGNvbnN0IHByb3ZpZGVyTGlzdCA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBhbGxGSVBTID0gWy4uLnRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkZJUHNcIildO1xuXG4gICAgY29uc3QgdGFyZ2V0RklQUyA9IGFsbEZJUFMuZmlsdGVyKFxuICAgICAgKGZpcHNFbGVtZW50KSA9PiBmaXBzRWxlbWVudC50ZXh0Q29udGVudCA9PT0gZmlwc1xuICAgICk7XG5cbiAgICB0YXJnZXRGSVBTLmZvckVhY2goKGZpcHNFbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCBwcm92aWRlciA9IGZpcHNFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIGNvbnN0IHByb3ZpZGVyTmFtZSA9IHByb3ZpZGVyXG4gICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIk5hbWVcIilcbiAgICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgICBjb25zdCBwcm92aWRlcklkID0gcHJvdmlkZXIuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG5cbiAgICAgIHByb3ZpZGVyTGlzdC5zZXQocHJvdmlkZXJJZCwgcHJvdmlkZXJOYW1lKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IE1hcChcbiAgICAgIFsuLi5wcm92aWRlckxpc3QuZW50cmllcygpXS5zb3J0KChhLCBiKSA9PiBhWzFdLmxvY2FsZUNvbXBhcmUoYlsxXSkpXG4gICAgKTtcbiAgfVxuXG4gIGdldFByb3ZpZGVyU2VydmljZXMocHJvdmlkZXJJRCkge1xuICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5kYXRhLmdldEVsZW1lbnRCeUlkKHByb3ZpZGVySUQpO1xuICAgIGNvbnN0IHNlcnZpY2VFbGVtZW50cyA9IHByb3ZpZGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiU2VydmljZVwiKTtcbiAgICBjb25zdCBzZXJ2aWNlTmFtZXMgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZXJ2aWNlRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBzZXJ2aWNlRWxlbWVudHMuaXRlbShpKTtcbiAgICAgIHNlcnZpY2VOYW1lcy5hZGQoc2VydmljZS5nZXRBdHRyaWJ1dGUoXCJzZXJ2aWNlTmFtZVwiKSk7XG4gICAgfVxuICAgIHJldHVybiBbLi4uc2VydmljZU5hbWVzXS5zb3J0KCk7XG4gIH1cblxuICBnZXRQcm92aWRlckluZm8ocHJvdmlkZXJJRCkge1xuICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5kYXRhLmdldEVsZW1lbnRCeUlkKHByb3ZpZGVySUQpO1xuICAgIGNvbnN0IG1hcFpvb20gPSBwcm92aWRlclxuICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiTWFwWm9vbVwiKVxuICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgY29uc3QgY29udGFjdE5hbWUgPSBwcm92aWRlclxuICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiQ29udGFjdE5hbWVcIilcbiAgICAgIC5pdGVtKDApLnRleHRDb250ZW50O1xuICAgIGNvbnN0IHByb3ZpZGVyTmFtZSA9IHByb3ZpZGVyXG4gICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJOYW1lXCIpXG4gICAgICAuaXRlbSgwKS50ZXh0Q29udGVudDtcbiAgICBjb25zdCBjb250YWN0RW1haWwgPSBwcm92aWRlclxuICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiQ29udGFjdEVtYWlsXCIpXG4gICAgICAuaXRlbSgwKS50ZXh0Q29udGVudDtcbiAgICBjb25zdCB3ZWJzaXRlID0gcHJvdmlkZXJcbiAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIldlYnNpdGVcIilcbiAgICAgIC5pdGVtKDApLnRleHRDb250ZW50O1xuICAgIGNvbnN0IGxhc3RVcGRhdGVkID0gcHJvdmlkZXJcbiAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkxhc3RVcGRhdGVkXCIpXG4gICAgICAuaXRlbSgwKS50ZXh0Q29udGVudDtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvdmlkZXJOYW1lLFxuICAgICAgY29udGFjdE5hbWUsXG4gICAgICBjb250YWN0RW1haWwsXG4gICAgICB3ZWJzaXRlLFxuICAgICAgbGFzdFVwZGF0ZWQsXG4gICAgICBtYXBab29tLFxuICAgIH07XG4gIH1cblxuICBnZXRBbGxTZXJ2aWNlTmFtZXNCeUNTVShjc3UpIHtcbiAgICBpZiAodGhpcy5kYXRhICE9PSBudWxsICYmIHRoaXMuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBzZXJ2aWNlTGlzdCA9IG5ldyBTZXQoKTtcbiAgICAgIGNvbnN0IHNlcnZpY2VGSVBTID0gWy4uLnRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkZJUHNcIildO1xuXG4gICAgICBjb25zdCBjc3VTZXJ2aWNlRklQUyA9IHNlcnZpY2VGSVBTLmZpbHRlcigoZmlwcykgPT5cbiAgICAgICAgY3N1LmxvY2FsaXRpZXMuaW5jbHVkZXMoZmlwcy50ZXh0Q29udGVudClcbiAgICAgICk7XG5cbiAgICAgIGNzdVNlcnZpY2VGSVBTLmZvckVhY2goKGZpcHMpID0+IHtcbiAgICAgICAgY29uc3Qgc2VydmljZSA9IGZpcHMucGFyZW50RWxlbWVudDtcbiAgICAgICAgY29uc3Qgc2VydmljZU5hbWUgPSBzZXJ2aWNlLmdldEF0dHJpYnV0ZShcInNlcnZpY2VOYW1lXCIpO1xuXG4gICAgICAgIHNlcnZpY2VMaXN0LmFkZChzZXJ2aWNlTmFtZSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIFsuLi5zZXJ2aWNlTGlzdF0uc29ydCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgZ2V0QWxsU2VydmljZXNCeVByb3ZpZGVySW5GSVBTKHByb3ZpZGVySWQsIGZpcHMpIHtcbiAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuZGF0YS5nZXRFbGVtZW50QnlJZChwcm92aWRlcklkKTtcbiAgICBjb25zdCBwcm92aWRlclNlcnZpY2VzID0gcHJvdmlkZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTZXJ2aWNlXCIpO1xuICAgIGNvbnN0IHNlcnZpY2VMaXN0ID0gbmV3IE1hcCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvdmlkZXJTZXJ2aWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2VydmljZSA9IHByb3ZpZGVyU2VydmljZXMuaXRlbShpKTtcbiAgICAgIGNvbnN0IHNlcnZpY2VGSVBTID0gc2VydmljZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkZJUHNcIik7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNlcnZpY2VGSVBTLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChzZXJ2aWNlRklQUy5pdGVtKGopLnRleHRDb250ZW50ID09PSBmaXBzKSB7XG4gICAgICAgICAgY29uc3QgaXNMaW1pdGVkU2VydmljZSA9XG4gICAgICAgICAgICBzZXJ2aWNlRklQUy5pdGVtKGopLmdldEF0dHJpYnV0ZShcInRyYXZlbFJlcVwiKSA9PT0gXCJZXCI7XG4gICAgICAgICAgc2VydmljZUxpc3Quc2V0KFxuICAgICAgICAgICAgc2VydmljZS5nZXRBdHRyaWJ1dGUoXCJzZXJ2aWNlTmFtZVwiKSxcbiAgICAgICAgICAgIGlzTGltaXRlZFNlcnZpY2VcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgTWFwKFxuICAgICAgWy4uLnNlcnZpY2VMaXN0LmVudHJpZXMoKV0uc29ydCgoYSwgYikgPT4gYVswXS5sb2NhbGVDb21wYXJlKGJbMF0pKVxuICAgICk7XG4gIH1cblxuICBnZXRBbGxTZXJ2aWNlc0J5UHJvdmlkZXJJbkNTVShwcm92aWRlcklkLCBjc3UpIHtcbiAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuZGF0YS5nZXRFbGVtZW50QnlJZChwcm92aWRlcklkKTtcbiAgICBjb25zdCBwcm92aWRlclNlcnZpY2VzID0gcHJvdmlkZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTZXJ2aWNlXCIpO1xuICAgIGNvbnN0IHNlcnZpY2VMaXN0ID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvdmlkZXJTZXJ2aWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2VydmljZSA9IHByb3ZpZGVyU2VydmljZXMuaXRlbShpKTtcbiAgICAgIGNvbnN0IHNlcnZpY2VGSVBTID0gc2VydmljZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkZJUHNcIik7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNlcnZpY2VGSVBTLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChjc3UubG9jYWxpdGllcy5pbmNsdWRlcyhzZXJ2aWNlRklQUy5pdGVtKGopLnRleHRDb250ZW50KSkge1xuICAgICAgICAgIHNlcnZpY2VMaXN0LmFkZChzZXJ2aWNlLmdldEF0dHJpYnV0ZShcInNlcnZpY2VOYW1lXCIpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gWy4uLnNlcnZpY2VMaXN0XS5zb3J0KCk7XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnNPZlNlcnZpY2VJbkNTVShzZXJ2aWNlTmFtZSwgY3N1KSB7XG4gICAgY29uc3Qgc2VydmljZUZJUFMgPSBbLi4udGhpcy5kYXRhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiRklQc1wiKV07XG4gICAgY29uc3QgY3N1U2VydmljZUZJUFMgPSBzZXJ2aWNlRklQUy5maWx0ZXIoKGZpcHMpID0+XG4gICAgICBjc3UubG9jYWxpdGllcy5pbmNsdWRlcyhmaXBzLnRleHRDb250ZW50KVxuICAgICk7XG5cbiAgICBjb25zdCBwcm92aWRlckxpc3QgPSBuZXcgTWFwKCk7XG4gICAgY3N1U2VydmljZUZJUFMuZm9yRWFjaCgoZmlwcykgPT4ge1xuICAgICAgY29uc3QgcHJvdmlkZXIgPSBmaXBzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIGNvbnN0IHByb3ZpZGVyTmFtZSA9IHByb3ZpZGVyXG4gICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIk5hbWVcIilcbiAgICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgICBjb25zdCBwcm92aWRlcklkID0gcHJvdmlkZXIuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gICAgICBjb25zdCBwcm92aWRlclNlcnZpY2VzID0gcHJvdmlkZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTZXJ2aWNlXCIpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm92aWRlclNlcnZpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm92aWRlclNlcnZpY2VzLml0ZW0oaSkuZ2V0QXR0cmlidXRlKFwic2VydmljZU5hbWVcIikgPT09IHNlcnZpY2VOYW1lXG4gICAgICAgICkge1xuICAgICAgICAgIHByb3ZpZGVyTGlzdC5zZXQocHJvdmlkZXJJZCwgcHJvdmlkZXJOYW1lKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBNYXAoXG4gICAgICBbLi4ucHJvdmlkZXJMaXN0LmVudHJpZXMoKV0uc29ydCgoYSwgYikgPT4gYVsxXS5sb2NhbGVDb21wYXJlKGJbMV0pKVxuICAgICk7XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnNPZkxhbmd1YWdlKGxhbmd1YWdlTmFtZSkge1xuICAgIGNvbnN0IHByb3ZpZGVycyA9IG5ldyBNYXAoKTtcblxuICAgIGNvbnN0IGFsbEZJUFMgPSBbLi4udGhpcy5kYXRhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiRklQc1wiKV07XG4gICAgYWxsRklQUy5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgY29uc3QgZmlwc0xhbmd1YWdlcyA9IGxvY2F0aW9uLmdldEF0dHJpYnV0ZShcImxhbmd1YWdlc1wiKTtcbiAgICAgIGlmIChmaXBzTGFuZ3VhZ2VzICYmIGZpcHNMYW5ndWFnZXMuaW5jbHVkZXMobGFuZ3VhZ2VOYW1lKSkge1xuICAgICAgICBjb25zdCBwcm92aWRlciA9IGxvY2F0aW9uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgY29uc3QgcHJvdmlkZXJJRCA9IHByb3ZpZGVyLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgICBjb25zdCBwcm92aWRlck5hbWUgPSBwcm92aWRlclxuICAgICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIk5hbWVcIilcbiAgICAgICAgICAuaXRlbSgwKS50ZXh0Q29udGVudDtcbiAgICAgICAgcHJvdmlkZXJzLnNldChwcm92aWRlcklELCBwcm92aWRlck5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBNYXAoXG4gICAgICBbLi4ucHJvdmlkZXJzLmVudHJpZXMoKV0uc29ydCgoYSwgYikgPT4gYVsxXS5sb2NhbGVDb21wYXJlKGJbMV0pKVxuICAgICk7XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnNPZlNlcnZpY2Uoc2VydmljZU5hbWUpIHtcbiAgICBjb25zdCBwcm92aWRlcnMgPSBuZXcgTWFwKCk7XG5cbiAgICBjb25zdCBhbGxTZXJ2aWNlcyA9IHRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlNlcnZpY2VcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxTZXJ2aWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2VydmljZSA9IGFsbFNlcnZpY2VzLml0ZW0oaSk7XG4gICAgICBpZiAoc2VydmljZS5nZXRBdHRyaWJ1dGUoXCJzZXJ2aWNlTmFtZVwiKSA9PT0gc2VydmljZU5hbWUpIHtcbiAgICAgICAgY29uc3QgcHJvdmlkZXIgPSBzZXJ2aWNlLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVySUQgPSBwcm92aWRlci5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgY29uc3QgcHJvdmlkZXJOYW1lID0gcHJvdmlkZXJcbiAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJOYW1lXCIpXG4gICAgICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgICAgIHByb3ZpZGVycy5zZXQocHJvdmlkZXJJRCwgcHJvdmlkZXJOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE1hcChcbiAgICAgIFsuLi5wcm92aWRlcnMuZW50cmllcygpXS5zb3J0KChhLCBiKSA9PiBhWzFdLmxvY2FsZUNvbXBhcmUoYlsxXSkpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3Byb3ZpZGVySURdXG4gICAqL1xuICBnZXRBbGxMb2NhdGlvbnMocHJvdmlkZXJJRCkge1xuICAgIGxldCBsb2NhdGlvbnM7XG4gICAgaWYgKCFwcm92aWRlcklEKSB7XG4gICAgICBsb2NhdGlvbnMgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJPZmZpY2VcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5kYXRhLmdldEVsZW1lbnRCeUlkKHByb3ZpZGVySUQpO1xuICAgICAgbG9jYXRpb25zID0gcHJvdmlkZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJPZmZpY2VcIik7XG4gICAgfVxuICAgIGNvbnN0IGxvY2F0aW9uQXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbG9jYXRpb24gPSBsb2NhdGlvbnMuaXRlbShpKTtcbiAgICAgIC8vIGdldCBsb2NhdGlvbidzIHByb3ZpZGVyIG5hbWUgKGluIHBhcmVudCBub2RlKVxuICAgICAgY29uc3QgbG9jYXRpb25PYmplY3QgPSB7XG4gICAgICAgIHByb3ZpZGVyTmFtZTogbG9jYXRpb24ucGFyZW50RWxlbWVudFxuICAgICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIk5hbWVcIilcbiAgICAgICAgICAuaXRlbSgwKS50ZXh0Q29udGVudCxcbiAgICAgICAgcHJvdmlkZXJJZDogbG9jYXRpb24ucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJpZFwiKSxcbiAgICAgICAgbGF0OiBsb2NhdGlvbi5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkxhdFwiKS5pdGVtKDApLnRleHRDb250ZW50LFxuICAgICAgICBsbmc6IGxvY2F0aW9uLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiTG5nXCIpLml0ZW0oMCkudGV4dENvbnRlbnQsXG4gICAgICAgIHN0cmVldDogbG9jYXRpb24uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTdHJlZXRcIikuaXRlbSgwKS50ZXh0Q29udGVudCxcbiAgICAgICAgY2l0eTogbG9jYXRpb24uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJDaXR5XCIpLml0ZW0oMCkudGV4dENvbnRlbnQsXG4gICAgICAgIHN0YXRlOiBsb2NhdGlvbi5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlN0YXRlXCIpLml0ZW0oMCkudGV4dENvbnRlbnQsXG4gICAgICAgIHppcDogbG9jYXRpb24uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJaaXBcIikuaXRlbSgwKS50ZXh0Q29udGVudCxcbiAgICAgICAgcGhvbmU6IGxvY2F0aW9uLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiUGhvbmVcIikuaXRlbSgwKS50ZXh0Q29udGVudCxcbiAgICAgIH07XG4gICAgICBsb2NhdGlvbkFycmF5LnB1c2gobG9jYXRpb25PYmplY3QpO1xuICAgIH1cbiAgICByZXR1cm4gbG9jYXRpb25BcnJheTtcbiAgfVxuXG4gIGdldEFsbFNlcnZpY2VOYW1lcygpIHtcbiAgICBpZiAodGhpcy5kYXRhICE9PSBudWxsICYmIHRoaXMuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBzZXJ2aWNlcyA9IHRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlNlcnZpY2VcIik7XG4gICAgICBjb25zdCBzZXJ2aWNlTmFtZXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VydmljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VydmljZU5hbWUgPSBzZXJ2aWNlcy5pdGVtKGkpPy5nZXRBdHRyaWJ1dGUoXCJzZXJ2aWNlTmFtZVwiKTtcbiAgICAgICAgc2VydmljZU5hbWVzLnB1c2goc2VydmljZU5hbWUpO1xuICAgICAgfVxuICAgICAgc2VydmljZU5hbWVzLnNvcnQoKTtcbiAgICAgIHJldHVybiBbLi4ubmV3IFNldChzZXJ2aWNlTmFtZXMpXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIGdldEFsbExhbmd1YWdlcyhwcm92aWRlcklEKSB7XG4gICAgbGV0IGFsbExvY2F0aW9ucztcbiAgICBpZiAoIXByb3ZpZGVySUQpIHtcbiAgICAgIGFsbExvY2F0aW9ucyA9IHRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkZJUHNcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5kYXRhLmdldEVsZW1lbnRCeUlkKHByb3ZpZGVySUQpO1xuICAgICAgYWxsTG9jYXRpb25zID0gcHJvdmlkZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpO1xuICAgIH1cblxuICAgIGxldCBhbGxMYW5ndWFnZXNBcnJheSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsTG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYWxsTG9jYXRpb25zLml0ZW0oaSkuZ2V0QXR0cmlidXRlKFwibGFuZ3VhZ2VzXCIpKSB7XG4gICAgICAgIHZhciBzZXJ2aWNlTGFuZ3VhZ2VTdHIgPSBhbGxMb2NhdGlvbnMuaXRlbShpKS5nZXRBdHRyaWJ1dGUoXCJsYW5ndWFnZXNcIik7XG4gICAgICAgIHdoaWxlIChzZXJ2aWNlTGFuZ3VhZ2VTdHIuaW5kZXhPZihcIiBcIikgPj0gMCkge1xuICAgICAgICAgIHNlcnZpY2VMYW5ndWFnZVN0ciA9IHNlcnZpY2VMYW5ndWFnZVN0ci5yZXBsYWNlKFwiIFwiLCBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VydmljZUxhbmd1YWdlU3RyLmluY2x1ZGVzKFwiLFwiKSkge1xuICAgICAgICAgIHZhciBzZXJ2aWNlTGFuZ3VhZ2VzID0gc2VydmljZUxhbmd1YWdlU3RyLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlcnZpY2VMYW5ndWFnZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGFsbExhbmd1YWdlc0FycmF5LnB1c2goc2VydmljZUxhbmd1YWdlc1tqXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsbExhbmd1YWdlc0FycmF5LnB1c2goXG4gICAgICAgICAgICBhbGxMb2NhdGlvbnMuaXRlbShpKS5nZXRBdHRyaWJ1dGUoXCJsYW5ndWFnZXNcIilcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGFsbExhbmd1YWdlc0FycmF5LnNvcnQoKTtcbiAgICByZXR1cm4gWy4uLm5ldyBTZXQoYWxsTGFuZ3VhZ2VzQXJyYXkpXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbcGFyYW1zLnByb3ZpZGVySURdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuc2VydmljZU5hbWVcbiAgICogQHJldHVybnNcbiAgICovXG4gIGdldFNlcnZpY2VNYXBGSVBTKHsgcHJvdmlkZXJJRCwgc2VydmljZU5hbWUgfSkge1xuICAgIGxldCBzZXJ2aWNlRWxlbWVudHM7XG5cbiAgICBpZiAocHJvdmlkZXJJRCkge1xuICAgICAgY29uc3QgcHJvdmlkZXIgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudEJ5SWQocHJvdmlkZXJJRCk7XG4gICAgICBzZXJ2aWNlRWxlbWVudHMgPSBwcm92aWRlci5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlNlcnZpY2VcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlcnZpY2VFbGVtZW50cyA9IHRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlNlcnZpY2VcIik7XG4gICAgfVxuXG4gICAgY29uc3QgYXZhaWxhYmxlRklQUyA9IFtdO1xuICAgIGNvbnN0IGxpbWl0ZWRGSVBTID0gW107XG4gICAgY29uc3QgbGFuZ3VhZ2VNYXAgPSBuZXcgTWFwKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZXJ2aWNlRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBzZXJ2aWNlRWxlbWVudHMuaXRlbShpKTtcbiAgICAgIGlmIChzZXJ2aWNlLmdldEF0dHJpYnV0ZShcInNlcnZpY2VOYW1lXCIpID09PSBzZXJ2aWNlTmFtZSkge1xuICAgICAgICBjb25zdCBzZXJ2aWNlRklQUyA9IHNlcnZpY2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNlcnZpY2VGSVBTLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY29uc3QgZmlwcyA9IHNlcnZpY2VGSVBTLml0ZW0oaikudGV4dENvbnRlbnQ7XG4gICAgICAgICAgY29uc3QgaXNMaW1pdGVkID1cbiAgICAgICAgICAgIHNlcnZpY2VGSVBTLml0ZW0oaikuZ2V0QXR0cmlidXRlKFwidHJhdmVsUmVxXCIpID09PSBcIllcIjtcbiAgICAgICAgICBpZiAoaXNMaW1pdGVkKSB7XG4gICAgICAgICAgICBsaW1pdGVkRklQUy5wdXNoKGZpcHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhdmFpbGFibGVGSVBTLnB1c2goZmlwcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGxhbmd1YWdlTGlzdCA9IHNlcnZpY2VGSVBTLml0ZW0oaikuZ2V0QXR0cmlidXRlKFwibGFuZ3VhZ2VzXCIpO1xuICAgICAgICAgIGlmIChsYW5ndWFnZUxpc3QpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhbmd1YWdlQXJyYXkgPSBsYW5ndWFnZUxpc3Quc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgbGFuZ3VhZ2VBcnJheS5mb3JFYWNoKChsYW5ndWFnZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAobGFuZ3VhZ2VNYXAuaGFzKGxhbmd1YWdlKSkge1xuICAgICAgICAgICAgICAgIGxhbmd1YWdlTWFwLmdldChsYW5ndWFnZSkuYWRkKGZpcHMpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxhbmd1YWdlTWFwLnNldChsYW5ndWFnZSwgbmV3IFNldChbZmlwc10pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vY29udmVydCB0aGUgbGFuZ3VhZ2VNYXAgaW50byBhbiBvYmplY3Qgd2l0aCBrZXlzIGFuZCB0aGUgZmlwc1NldFxuICAgIGNvbnN0IGxhbmd1YWdlRklQUyA9IFsuLi5sYW5ndWFnZU1hcF0ubWFwKChbbGFuZ3VhZ2UsIGZpcHNTZXRdKSA9PiAoe1xuICAgICAgW2xhbmd1YWdlXTogWy4uLmZpcHNTZXRdLFxuICAgIH0pKTtcbiAgICByZXR1cm4ge1xuICAgICAgYXZhaWxhYmxlOiBhdmFpbGFibGVGSVBTLFxuICAgICAgbGltaXRlZDogbGltaXRlZEZJUFMsXG4gICAgICBsYW5ndWFnZXM6IGxhbmd1YWdlRklQUyxcbiAgICB9O1xuICB9XG5cbiAgZ2V0QWxsRklQUyhwcm92aWRlcklEKSB7XG4gICAgY29uc3QgcHJvdmlkZXIgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudEJ5SWQocHJvdmlkZXJJRCk7XG4gICAgY29uc3QgYWxsUHJvdmlkZXJGSVBTID0gcHJvdmlkZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpO1xuXG4gICAgY29uc3QgZmlwc0xpc3QgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFByb3ZpZGVyRklQUy5sZW5ndGg7IGkrKykge1xuICAgICAgZmlwc0xpc3QucHVzaChhbGxQcm92aWRlckZJUFMuaXRlbShpKS50ZXh0Q29udGVudCk7XG4gICAgfVxuICAgIHJldHVybiBbLi4ubmV3IFNldChmaXBzTGlzdCldO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZWFyY2hQYXJhbXNcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtzZWFyY2hQYXJhbXMuc2VydmljZU5hbWVdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbc2VhcmNoUGFyYW1zLmxvY2F0aW9uSURdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbc2VhcmNoUGFyYW1zLmxvY2F0aW9uVHlwZV1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtzZWFyY2hQYXJhbXMubGFuZ3VhZ2VOYW1lXVxuICAgKi9cbiAgc2VhcmNoUHJvdmlkZXJzKHsgc2VydmljZU5hbWUsIGxvY2F0aW9uSUQsIGxvY2F0aW9uVHlwZSwgbGFuZ3VhZ2VOYW1lIH0pIHtcbiAgICBjb25zdCBhbGxGSVBTID0gdGhpcy5kYXRhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiRklQc1wiKTtcbiAgICBjb25zdCBwcm92aWRlckxpc3QgPSBuZXcgTWFwKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbEZJUFMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBpc1NlcnZpY2VNYXRjaCA9IGZhbHNlO1xuICAgICAgbGV0IGlzTG9jYXRpb25NYXRjaCA9IGZhbHNlO1xuICAgICAgbGV0IGlzTGFuZ3VhZ2VNYXRjaCA9IGZhbHNlO1xuICAgICAgY29uc3QgZmlwc1NlcnZpY2UgPSBhbGxGSVBTXG4gICAgICAgIC5pdGVtKGkpXG4gICAgICAgIC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcInNlcnZpY2VOYW1lXCIpO1xuICAgICAgaWYgKFxuICAgICAgICAhc2VydmljZU5hbWUgfHxcbiAgICAgICAgc2VydmljZU5hbWUgPT09IFwiYW55XCIgfHxcbiAgICAgICAgc2VydmljZU5hbWUgPT09IGZpcHNTZXJ2aWNlXG4gICAgICApIHtcbiAgICAgICAgaXNTZXJ2aWNlTWF0Y2ggPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaXBzID0gYWxsRklQUy5pdGVtKGkpO1xuICAgICAgaWYgKFxuICAgICAgICAhbG9jYXRpb25JRCB8fFxuICAgICAgICBsb2NhdGlvbklEID09PSBcImFueVwiIHx8XG4gICAgICAgIGZpcHMudGV4dENvbnRlbnQgPT09IGxvY2F0aW9uSURcbiAgICAgICkge1xuICAgICAgICBpc0xvY2F0aW9uTWF0Y2ggPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGxvY2F0aW9uVHlwZSA9PT0gXCJDU1VcIiAmJlxuICAgICAgICBpc0xvY2FsaXR5SW5DU1VJRChsb2NhdGlvbklELCBmaXBzLnRleHRDb250ZW50KVxuICAgICAgKSB7XG4gICAgICAgIGlzTG9jYXRpb25NYXRjaCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIGxvY2F0aW9uVHlwZSA9PT0gXCJSZWdpb25cIiAmJlxuICAgICAgICBpc0xvY2FsaXR5SW5SZWdpb25JRChsb2NhdGlvbklELCBmaXBzLnRleHRDb250ZW50KVxuICAgICAgKSB7XG4gICAgICAgIGlzTG9jYXRpb25NYXRjaCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghbGFuZ3VhZ2VOYW1lIHx8IGxhbmd1YWdlTmFtZSA9PT0gXCJFbmdsaXNoXCIpIHtcbiAgICAgICAgaXNMYW5ndWFnZU1hdGNoID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpcHMuZ2V0QXR0cmlidXRlKFwibGFuZ3VhZ2VzXCIpKSB7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlTGlzdCA9IGZpcHMuZ2V0QXR0cmlidXRlKFwibGFuZ3VhZ2VzXCIpO1xuICAgICAgICBpZiAobGFuZ3VhZ2VMaXN0LmluY2x1ZGVzKGxhbmd1YWdlTmFtZSkpIHtcbiAgICAgICAgICBpc0xhbmd1YWdlTWF0Y2ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1NlcnZpY2VNYXRjaCAmJiBpc0xvY2F0aW9uTWF0Y2ggJiYgaXNMYW5ndWFnZU1hdGNoKSB7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyID0gZmlwcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVySUQgPSBwcm92aWRlci5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgY29uc3QgcHJvdmlkZXJOYW1lID0gcHJvdmlkZXJcbiAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJOYW1lXCIpXG4gICAgICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgICAgIHByb3ZpZGVyTGlzdC5zZXQocHJvdmlkZXJJRCwgcHJvdmlkZXJOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE1hcChcbiAgICAgIFsuLi5wcm92aWRlckxpc3QuZW50cmllcygpXS5zb3J0KChhLCBiKSA9PiBhWzFdLmxvY2FsZUNvbXBhcmUoYlsxXSkpXG4gICAgKTtcbiAgfVxuXG4gIHRlc3QoKSB7XG4gICAgaWYgKHRoaXMuZGF0YSAhPT0gbnVsbCAmJiB0aGlzLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5kYXRhKTtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0RWxlbWVudEJ5SWQoXCIxXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJObyBkYXRhIGF2YWlsYWJsZS5cIjtcbiAgICB9XG4gIH1cbn1cbiIsIi8vRGVmaW5lIENTVXNcbi8vRWFzdGVybiBSZWdpb25cbmNvbnN0IENTVTEgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxNTUwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDEgLSBDaGVzYXBlYWtlXCIsXG4gIHNsdWc6IFwiQ1NVMVwiLFxufTtcbmNvbnN0IENTVTIgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxODEwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDIgLSBWaXJnaW5pYSBCZWFjaFwiLFxuICBzbHVnOiBcIkNTVTJcIixcbn07XG5jb25zdCBDU1UyQSA9IHtcbiAgbG9jYWxpdGllczogW1wiNTEwMDFcIiwgXCI1MTEzMVwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAyQSAtIEFjY29tYWNrXCIsXG4gIHNsdWc6IFwiQ1NVMkFcIixcbn07XG5jb25zdCBDU1UzID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTc0MFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAzIC0gUG9ydHNtb3V0aFwiLFxuICBzbHVnOiBcIkNTVTNcIixcbn07XG5jb25zdCBDU1U0ID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTcxMFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCA0IC0gTm9yZm9sa1wiLFxuICBzbHVnOiBcIkNTVTRcIixcbn07XG5jb25zdCBDU1U1ID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTgwMFwiLCBcIjUxNjIwXCIsIFwiNTEwOTNcIiwgXCI1MTE3NVwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCA1IC0gU3VmZm9sa1wiLFxuICBzbHVnOiBcIkNTVTVcIixcbn07XG5jb25zdCBDU1U3ID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTcwMFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCA3IC0gTmV3cG9ydCBOZXdzXCIsXG4gIHNsdWc6IFwiQ1NVN1wiLFxufTtcbmNvbnN0IENTVTggPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxNjUwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDggLSBIYW1wdG9uXCIsXG4gIHNsdWc6IFwiQ1NVOFwiLFxufTtcbi8vU291dGhlcm4gUmVnaW9uXG5jb25zdCBDU1U2ID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTY3MFwiLCBcIjUxMTQ5XCIsIFwiNTExODFcIiwgXCI1MTE4M1wiLCBcIjUxNTk1XCIsIFwiNTEwMjVcIiwgXCI1MTA4MVwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCA2IC0gSG9wZXdlbGxcIixcbiAgc2x1ZzogXCJDU1U2XCIsXG59O1xuY29uc3QgQ1NVMTAgPSB7XG4gIGxvY2FsaXRpZXM6IFtcbiAgICBcIjUxMDExXCIsXG4gICAgXCI1MTAyOVwiLFxuICAgIFwiNTEwMzdcIixcbiAgICBcIjUxMDQ5XCIsXG4gICAgXCI1MTA4M1wiLFxuICAgIFwiNTExMTFcIixcbiAgICBcIjUxMTE3XCIsXG4gICAgXCI1MTE0N1wiLFxuICBdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDEwIC0gSGFsaWZheFwiLFxuICBzbHVnOiBcIkNTVTEwXCIsXG59O1xuY29uc3QgQ1NVMTEgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxNzMwXCIsIFwiNTEwMDdcIiwgXCI1MTA1M1wiLCBcIjUxMTM1XCIsIFwiNTExNDVcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMTEgLSBQZXRlcnNidXJnXCIsXG4gIHNsdWc6IFwiQ1NVMTFcIixcbn07XG5jb25zdCBDU1UxMiA9IHtcbiAgbG9jYWxpdGllczogW1wiNTEwNDFcIiwgXCI1MTU3MFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAxMiAtIENoZXN0ZXJmaWVsZFwiLFxuICBzbHVnOiBcIkNTVTEyXCIsXG59O1xuY29uc3QgQ1NVMTMgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxNzYwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDEzIC0gUmljaG1vbmRcIixcbiAgc2x1ZzogXCJDU1UxM1wiLFxufTtcbmNvbnN0IENTVTE0ID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTA4N1wiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAxNCAtIEhlbnJpY29cIixcbiAgc2x1ZzogXCJDU1UxNFwiLFxufTtcblxuLy9Ob3J0aGVybiBSZWdpb25cbnZhciBDU1UxNyA9IHtcbiAgbG9jYWxpdGllczogW1wiNTEwMTNcIiwgXCI1MTYxMFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAxNyAtIEFybGluZ3RvblwiLFxuICBzbHVnOiBcIkNTVTE3XCIsXG59O1xudmFyIENTVTE4ID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTUxMFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAxOCAtIEFsZXhhbmRyaWFcIixcbiAgc2x1ZzogXCJDU1UxOFwiLFxufTtcbnZhciBDU1UxOSA9IHtcbiAgbG9jYWxpdGllczogW1wiNTEwNTlcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMTkgLSBGYWlyZmF4XCIsXG4gIHNsdWc6IFwiQ1NVMTlcIixcbn07XG5jb25zdCBDU1UyMCA9IHtcbiAgbG9jYWxpdGllczogW1wiNTExMDdcIiwgXCI1MTA2MVwiLCBcIjUxMTU3XCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDIwIC0gTG91ZG91blwiLFxuICBzbHVnOiBcIkNTVTIwXCIsXG59O1xudmFyIENTVTI2ID0ge1xuICBsb2NhbGl0aWVzOiBbXG4gICAgXCI1MTA0M1wiLFxuICAgIFwiNTEwNjlcIixcbiAgICBcIjUxMTM5XCIsXG4gICAgXCI1MTE2NVwiLFxuICAgIFwiNTExNzFcIixcbiAgICBcIjUxMTg3XCIsXG4gICAgXCI1MTY2MFwiLFxuICAgIFwiNTE4NDBcIixcbiAgXSxcbiAgbmFtZTogXCJEaXN0cmljdCAyNiAtIFdpbmNoZXN0ZXJcIixcbiAgc2x1ZzogXCJDU1UyNlwiLFxufTtcbnZhciBDU1UzMSA9IHtcbiAgbG9jYWxpdGllczogW1wiNTExNTNcIiwgXCI1MTY4M1wiLCBcIjUxNjg1XCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDMxIC0gTWFuYXNzYXNcIixcbiAgc2x1ZzogXCJDU1UzMVwiLFxufTtcblxuLy9XZXN0ZXJuIFJlZ2lvblxudmFyIENTVTIxID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTA4OVwiLCBcIjUxMTQxXCIsIFwiNTE2OTBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMjEgLSBNYXJ0aW5zdmlsbGVcIixcbiAgc2x1ZzogXCJDU1UyMVwiLFxufTtcbnZhciBDU1UyMiA9IHtcbiAgbG9jYWxpdGllczogW1wiNTEwNjdcIiwgXCI1MTE0M1wiLCBcIjUxNTkwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDIyIC0gUm9ja3kgTW91bnRcIixcbiAgc2x1ZzogXCJDU1UyMlwiLFxufTtcbmNvbnN0IENTVTIzID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTE2MVwiLCBcIjUxNzc1XCIsIFwiNTE3NzBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMjMgLSBSb2Fub2tlXCIsXG4gIHNsdWc6IFwiQ1NVMjNcIixcbn07XG52YXIgQ1NVMjcgPSB7XG4gIGxvY2FsaXRpZXM6IFtcbiAgICBcIjUxMDIxXCIsXG4gICAgXCI1MTAzNVwiLFxuICAgIFwiNTEwNjNcIixcbiAgICBcIjUxMDcxXCIsXG4gICAgXCI1MTA3N1wiLFxuICAgIFwiNTExMjFcIixcbiAgICBcIjUxMTU1XCIsXG4gICAgXCI1MTE5N1wiLFxuICAgIFwiNTE2NDBcIixcbiAgICBcIjUxNzUwXCIsXG4gIF0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMjcgLSBQdWxhc2tpXCIsXG4gIHNsdWc6IFwiQ1NVMjdcIixcbn07XG52YXIgQ1NVMjggPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMTczXCIsIFwiNTExOTFcIiwgXCI1MTUyMFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAyOCAtIEFiaW5nZG9uXCIsXG4gIHNsdWc6IFwiQ1NVMjhcIixcbn07XG52YXIgQ1NVMjkgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMDI3XCIsIFwiNTEwNTFcIiwgXCI1MTE2N1wiLCBcIjUxMTg1XCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDI5IC0gVGF6ZXdlbGxcIixcbiAgc2x1ZzogXCJDU1UyOVwiLFxufTtcbnZhciBDU1UzMCA9IHtcbiAgbG9jYWxpdGllczogW1wiNTExMDVcIiwgXCI1MTE2OVwiLCBcIjUxMTk1XCIsIFwiNTE3MjBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMzAgLSBHYXRlIENpdHlcIixcbiAgc2x1ZzogXCJDU1UzMFwiLFxufTtcbi8vQ2VudHJhbCBSZWdpb25cbnZhciBDU1U5ID0ge1xuICBsb2NhbGl0aWVzOiBbXG4gICAgXCI1MTAzNlwiLFxuICAgIFwiNTEwNzNcIixcbiAgICBcIjUxMDk1XCIsXG4gICAgXCI1MTA5N1wiLFxuICAgIFwiNTExMDFcIixcbiAgICBcIjUxMTE1XCIsXG4gICAgXCI1MTExOVwiLFxuICAgIFwiNTExMjdcIixcbiAgICBcIjUxMTk5XCIsXG4gICAgXCI1MTczNVwiLFxuICAgIFwiNTE4MzBcIixcbiAgXSxcbiAgbmFtZTogXCJEaXN0cmljdCA5IC0gV2lsbGlhbXNidXJnXCIsXG4gIHNsdWc6IFwiQ1NVOVwiLFxufTtcbnZhciBDU1UxNSA9IHtcbiAgbG9jYWxpdGllczogW1xuICAgIFwiNTEwMzNcIixcbiAgICBcIjUxMDU3XCIsXG4gICAgXCI1MTA4NVwiLFxuICAgIFwiNTEwOTlcIixcbiAgICBcIjUxMTAzXCIsXG4gICAgXCI1MTEzM1wiLFxuICAgIFwiNTExNTlcIixcbiAgICBcIjUxMTc3XCIsXG4gICAgXCI1MTE3OVwiLFxuICAgIFwiNTExOTNcIixcbiAgICBcIjUxNjMwXCIsXG4gIF0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMTUgLSBGcmVkZXJpY2tzYnVyZ1wiLFxuICBzbHVnOiBcIkNTVTE1XCIsXG59O1xudmFyIENTVTE2ID0ge1xuICBsb2NhbGl0aWVzOiBbXG4gICAgXCI1MTAwM1wiLFxuICAgIFwiNTEwNDdcIixcbiAgICBcIjUxMDY1XCIsXG4gICAgXCI1MTA3NVwiLFxuICAgIFwiNTEwNzlcIixcbiAgICBcIjUxMTA5XCIsXG4gICAgXCI1MTExM1wiLFxuICAgIFwiNTExMzdcIixcbiAgICBcIjUxNTQwXCIsXG4gIF0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMTYgLSBDaGFybG90dGVzdmlsbGVcIixcbiAgc2x1ZzogXCJDU1UxNlwiLFxufTtcbnZhciBDU1UyNCA9IHtcbiAgbG9jYWxpdGllczogW1wiNTEwMDlcIiwgXCI1MTAxOVwiLCBcIjUxMDMxXCIsIFwiNTExMjVcIiwgXCI1MTY4MFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAyNCAtIEx5bmNoYnVyZ1wiLFxuICBzbHVnOiBcIkNTVTI0XCIsXG59O1xudmFyIENTVTI1ID0ge1xuICBsb2NhbGl0aWVzOiBbXG4gICAgXCI1MTAwNVwiLFxuICAgIFwiNTEwMTVcIixcbiAgICBcIjUxMDE3XCIsXG4gICAgXCI1MTAyM1wiLFxuICAgIFwiNTEwNDVcIixcbiAgICBcIjUxMDkxXCIsXG4gICAgXCI1MTE2M1wiLFxuICAgIFwiNTE1MzBcIixcbiAgICBcIjUxNTgwXCIsXG4gICAgXCI1MTY3OFwiLFxuICAgIFwiNTE3OTBcIixcbiAgICBcIjUxODIwXCIsXG4gIF0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMjUgLSBTdGF1bnRvblwiLFxuICBzbHVnOiBcIkNTVTI1XCIsXG59O1xuXG5leHBvcnQgY29uc3Qgc29ydGVkQ1NVcyA9IFtcbiAgQ1NVMSxcbiAgQ1NVMixcbiAgQ1NVMkEsXG4gIENTVTMsXG4gIENTVTQsXG4gIENTVTUsXG4gIENTVTYsXG4gIENTVTcsXG4gIENTVTgsXG4gIENTVTksXG4gIENTVTEwLFxuICBDU1UxMSxcbiAgQ1NVMTIsXG4gIENTVTEzLFxuICBDU1UxNCxcbiAgQ1NVMTUsXG4gIENTVTE2LFxuICBDU1UxNyxcbiAgQ1NVMTgsXG4gIENTVTE5LFxuICBDU1UyMCxcbiAgQ1NVMjEsXG4gIENTVTIyLFxuICBDU1UyMyxcbiAgQ1NVMjQsXG4gIENTVTI1LFxuICBDU1UyNixcbiAgQ1NVMjcsXG4gIENTVTI4LFxuICBDU1UyOSxcbiAgQ1NVMzAsXG4gIENTVTMxLFxuXTtcblxuZXhwb3J0IGNvbnN0IGFsbEZpcHMgPSBbXG4gIFwiNTE1MTBcIixcbiAgXCI1MTUyMFwiLFxuICBcIjUxNTMwXCIsXG4gIFwiNTE1NDBcIixcbiAgXCI1MTU1MFwiLFxuICBcIjUxNTcwXCIsXG4gIFwiNTE1ODBcIixcbiAgXCI1MTU5MFwiLFxuICBcIjUxNTk1XCIsXG4gIFwiNTE2MDBcIixcbiAgXCI1MTYxMFwiLFxuICBcIjUxNjIwXCIsXG4gIFwiNTE2MzBcIixcbiAgXCI1MTY0MFwiLFxuICBcIjUxNjUwXCIsXG4gIFwiNTE2NjBcIixcbiAgXCI1MTY3MFwiLFxuICBcIjUxNjc4XCIsXG4gIFwiNTE2ODBcIixcbiAgXCI1MTY4M1wiLFxuICBcIjUxNjg1XCIsXG4gIFwiNTE2OTBcIixcbiAgXCI1MTcwMFwiLFxuICBcIjUxNzEwXCIsXG4gIFwiNTE3MjBcIixcbiAgXCI1MTczMFwiLFxuICBcIjUxNzM1XCIsXG4gIFwiNTE3NDBcIixcbiAgXCI1MTc1MFwiLFxuICBcIjUxNzYwXCIsXG4gIFwiNTE3NzBcIixcbiAgXCI1MTc3NVwiLFxuICBcIjUxNzkwXCIsXG4gIFwiNTE4MDBcIixcbiAgXCI1MTgxMFwiLFxuICBcIjUxODIwXCIsXG4gIFwiNTE4MzBcIixcbiAgXCI1MTg0MFwiLFxuICBcIjUxMDAxXCIsXG4gIFwiNTEwMDNcIixcbiAgXCI1MTAwNVwiLFxuICBcIjUxMDA3XCIsXG4gIFwiNTEwMDlcIixcbiAgXCI1MTAxMVwiLFxuICBcIjUxMDEzXCIsXG4gIFwiNTEwMTVcIixcbiAgXCI1MTAxN1wiLFxuICBcIjUxMDE5XCIsXG4gIFwiNTEwMjFcIixcbiAgXCI1MTAyM1wiLFxuICBcIjUxMDI1XCIsXG4gIFwiNTEwMjdcIixcbiAgXCI1MTAyOVwiLFxuICBcIjUxMDMxXCIsXG4gIFwiNTEwMzNcIixcbiAgXCI1MTAzNVwiLFxuICBcIjUxMDM2XCIsXG4gIFwiNTEwMzdcIixcbiAgXCI1MTA0MVwiLFxuICBcIjUxMDQzXCIsXG4gIFwiNTEwNDVcIixcbiAgXCI1MTA0N1wiLFxuICBcIjUxMDQ5XCIsXG4gIFwiNTEwNTFcIixcbiAgXCI1MTA1M1wiLFxuICBcIjUxMDU3XCIsXG4gIFwiNTEwNTlcIixcbiAgXCI1MTA2MVwiLFxuICBcIjUxMDYzXCIsXG4gIFwiNTEwNjVcIixcbiAgXCI1MTA2N1wiLFxuICBcIjUxMDY5XCIsXG4gIFwiNTEwNzFcIixcbiAgXCI1MTA3M1wiLFxuICBcIjUxMDc1XCIsXG4gIFwiNTEwNzdcIixcbiAgXCI1MTA3OVwiLFxuICBcIjUxMDgxXCIsXG4gIFwiNTEwODNcIixcbiAgXCI1MTA4NVwiLFxuICBcIjUxMDg3XCIsXG4gIFwiNTEwODlcIixcbiAgXCI1MTA5MVwiLFxuICBcIjUxMDkzXCIsXG4gIFwiNTEwOTVcIixcbiAgXCI1MTA5N1wiLFxuICBcIjUxMDk5XCIsXG4gIFwiNTExMDFcIixcbiAgXCI1MTEwM1wiLFxuICBcIjUxMTA1XCIsXG4gIFwiNTExMDdcIixcbiAgXCI1MTEwOVwiLFxuICBcIjUxMTExXCIsXG4gIFwiNTExMTNcIixcbiAgXCI1MTExNVwiLFxuICBcIjUxMTE3XCIsXG4gIFwiNTExMTlcIixcbiAgXCI1MTEyMVwiLFxuICBcIjUxMTI1XCIsXG4gIFwiNTExMjdcIixcbiAgXCI1MTEzMVwiLFxuICBcIjUxMTMzXCIsXG4gIFwiNTExMzVcIixcbiAgXCI1MTEzN1wiLFxuICBcIjUxMTM5XCIsXG4gIFwiNTExNDFcIixcbiAgXCI1MTE0M1wiLFxuICBcIjUxMTQ1XCIsXG4gIFwiNTExNDdcIixcbiAgXCI1MTE0OVwiLFxuICBcIjUxMTUzXCIsXG4gIFwiNTExNTVcIixcbiAgXCI1MTE1N1wiLFxuICBcIjUxMTU5XCIsXG4gIFwiNTExNjFcIixcbiAgXCI1MTE2M1wiLFxuICBcIjUxMTY1XCIsXG4gIFwiNTExNjdcIixcbiAgXCI1MTE2OVwiLFxuICBcIjUxMTcxXCIsXG4gIFwiNTExNzNcIixcbiAgXCI1MTE3NVwiLFxuICBcIjUxMTc3XCIsXG4gIFwiNTExNzlcIixcbiAgXCI1MTE4MVwiLFxuICBcIjUxMTgzXCIsXG4gIFwiNTExODVcIixcbiAgXCI1MTE4N1wiLFxuICBcIjUxMTkxXCIsXG4gIFwiNTExOTNcIixcbiAgXCI1MTE5NVwiLFxuICBcIjUxMTk3XCIsXG4gIFwiNTExOTlcIixcbl07XG5cbi8vIFJlZ2lvbnNcbmNvbnN0IE5vcnRoZXJuUmVnaW9uID0ge1xuICBDU1VzOiBbQ1NVMTYsIENTVTE3LCBDU1UxOCwgQ1NVMTksIENTVTIwLCBDU1UyNiwgQ1NVMzFdLFxuICBuYW1lOiBcIk5vcnRoZXJuIFJlZ2lvblwiLFxuICBzbHVnOiBcIm5vcnRoXCIsXG59O1xuXG5jb25zdCBTb3V0aGVyblJlZ2lvbiA9IHtcbiAgQ1NVczogW0NTVTUsIENTVTYsIENTVTExLCBDU1UxMiwgQ1NVMTNdLFxuICBuYW1lOiBcIlNvdXRoZXJuIFJlZ2lvblwiLFxuICBzbHVnOiBcInNvdXRoXCIsXG59O1xuXG5jb25zdCBFYXN0ZXJuUmVnaW9uID0ge1xuICBDU1VzOiBbQ1NVMSwgQ1NVMiwgQ1NVMkEsIENTVTMsIENTVTRdLFxuICBuYW1lOiBcIkVhc3Rlcm4gUmVnaW9uXCIsXG4gIHNsdWc6IFwiZWFzdFwiLFxufTtcblxuY29uc3QgV2VzdGVyblJlZ2lvbiA9IHtcbiAgQ1NVczogW0NTVTIxLCBDU1UyNywgQ1NVMjgsIENTVTI5LCBDU1UzMF0sXG4gIG5hbWU6IFwiV2VzdGVybiBSZWdpb25cIixcbiAgc2x1ZzogXCJ3ZXN0XCIsXG59O1xuXG5jb25zdCBDZW50cmFsUmVnaW9uID0ge1xuICBDU1VzOiBbQ1NVNywgQ1NVOCwgQ1NVOSwgQ1NVMTQsIENTVTE1XSxcbiAgbmFtZTogXCJDZW50cmFsIFJlZ2lvblwiLFxuICBzbHVnOiBcImNlbnRyYWxcIixcbn07XG5cbmNvbnN0IE1pZFdlc3RSZWdpb24gPSB7XG4gIENTVXM6IFtDU1UxMCwgQ1NVMjIsIENTVTIzLCBDU1UyNCwgQ1NVMjVdLFxuICBuYW1lOiBcIk1pZHdlc3QgUmVnaW9uXCIsXG4gIHNsdWc6IFwibWlkd2VzdFwiLFxufTtcblxuZXhwb3J0IGNvbnN0IENTVVN0cnVjdHVyZSA9IFtcbiAgRWFzdGVyblJlZ2lvbixcbiAgU291dGhlcm5SZWdpb24sXG4gIENlbnRyYWxSZWdpb24sXG4gIE5vcnRoZXJuUmVnaW9uLFxuICBXZXN0ZXJuUmVnaW9uLFxuICBNaWRXZXN0UmVnaW9uLFxuXTtcblxuZXhwb3J0IGNvbnN0IHJlZ2lvbkNTVXMgPSB7XG4gIE5vcnRoZXJuUmVnaW9uLFxuICBTb3V0aGVyblJlZ2lvbixcbiAgRWFzdGVyblJlZ2lvbixcbiAgV2VzdGVyblJlZ2lvbixcbiAgQ2VudHJhbFJlZ2lvbixcbiAgTWlkV2VzdFJlZ2lvbixcbn07XG5cbmV4cG9ydCBjb25zdCBpc0xvY2FsaXR5SW5SZWdpb24gPSAocmVnaW9uLCBsb2NhbGl0eSkgPT4ge1xuICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgcmVnaW9uLkNTVXMuZm9yRWFjaCgoY3N1KSA9PiB7XG4gICAgaWYgKGNzdS5sb2NhbGl0aWVzLmluY2x1ZGVzKGxvY2FsaXR5KSkge1xuICAgICAgZm91bmQgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmb3VuZDtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0xvY2FsaXR5SW5SZWdpb25JRCA9IChyZWdpb25JRCwgbG9jYWxpdHkpID0+IHtcbiAgY29uc3QgcmVnaW9uID0gQ1NVU3RydWN0dXJlLmZpbmQoKHJlZ2lvbikgPT4gcmVnaW9uLnNsdWcgPT09IHJlZ2lvbklEKTtcbiAgcmV0dXJuIGlzTG9jYWxpdHlJblJlZ2lvbihyZWdpb24sIGxvY2FsaXR5KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0xvY2FsaXR5SW5DU1VJRCA9IChjc3VJRCwgbG9jYWxpdHkpID0+IHtcbiAgY29uc3QgY3N1ID0gc29ydGVkQ1NVcy5maW5kKChjc3UpID0+IGNzdS5zbHVnID09PSBjc3VJRCk7XG4gIHJldHVybiBjc3UubG9jYWxpdGllcy5pbmNsdWRlcyhsb2NhbGl0eSk7XG59O1xuXG5leHBvcnQgY29uc3QgY3N1TGlzdEZyb21GSVBTID0gKGZpcHNMaXN0KSA9PiB7XG4gIGNvbnN0IGNzdU5hbWVzID0gbmV3IFNldCgpO1xuICBzb3J0ZWRDU1VzLmZvckVhY2goKGNzdSkgPT4ge1xuICAgIGlmIChjc3UubG9jYWxpdGllcy5zb21lKChsb2NhbGl0eSkgPT4gZmlwc0xpc3QuaW5jbHVkZXMobG9jYWxpdHkpKSkge1xuICAgICAgY3N1TmFtZXMuYWRkKGNzdS5uYW1lKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gWy4uLmNzdU5hbWVzXTtcbn07XG4iLCJpbXBvcnQgeyBBUEkgfSBmcm9tIFwiLi4vLi4vYXBpL2FwaS5qc1wiO1xuXG5jb25zdCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG5jb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHF1ZXJ5U3RyaW5nKTtcbmNvbnN0IGxhbmd1YWdlSUQgPSB1cmxQYXJhbXMuZ2V0KFwiaWRcIik7XG5cbmV4cG9ydCBjb25zdCBsYW5ndWFnZU5hbWUgPSBsYW5ndWFnZUlEID8gQVBJLmdldEFsbExhbmd1YWdlcygpW2xhbmd1YWdlSURdIDogXCJcIjtcbmV4cG9ydCBjb25zdCBwcm92aWRlcnMgPSBBUEkuZ2V0QWxsUHJvdmlkZXJzT2ZMYW5ndWFnZShsYW5ndWFnZU5hbWUpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBwcm92aWRlcnMsIGxhbmd1YWdlTmFtZSB9IGZyb20gXCIuL2FwaS5qc1wiO1xuXG5jb25zdCBwcm92aWRlckxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb3ZpZGVyTGlzdFwiKTtcbnByb3ZpZGVycy5mb3JFYWNoKChuYW1lLCBpZCkgPT4ge1xuICBjb25zdCBwcm92aWRlckxJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBwcm92aWRlckxJLmlubmVySFRNTCA9IGA8YSBocmVmPScuLi9wcm92aWRlci9pbmRleC5odG1sP2lkPSR7aWR9Jz4ke25hbWV9PC9hPmA7XG4gIHByb3ZpZGVyTGlzdCAmJiBwcm92aWRlckxpc3QuYXBwZW5kQ2hpbGQocHJvdmlkZXJMSSk7XG59KTtcblxuY29uc3QgbGFuZ3VhZ2VOYW1lU3BhbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcImxhbmdhdWdlVGV4dFwiKTtcbmxhbmd1YWdlTmFtZVNwYW5zLmZvckVhY2goKHNwYW4pID0+IHtcbiAgc3Bhbi5pbm5lckhUTUwgPSBsYW5ndWFnZU5hbWU7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==