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

/***/ "./src/pages/search/api.js":
/*!*********************************!*\
  !*** ./src/pages/search/api.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   languageText: () => (/* binding */ languageText),
/* harmony export */   locationText: () => (/* binding */ locationText),
/* harmony export */   locationType: () => (/* binding */ locationType),
/* harmony export */   providerSearchResults: () => (/* binding */ providerSearchResults),
/* harmony export */   searchValues: () => (/* binding */ searchValues),
/* harmony export */   serviceText: () => (/* binding */ serviceText)
/* harmony export */ });
/* harmony import */ var _api_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api/api.js */ "./src/api/api.js");
/* harmony import */ var _lib_csu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/csu.js */ "./src/lib/csu.js");



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchValues = urlParams.values();
const [serviceName, locationID, languageName] = searchValues;
const languageText = languageName;

let serviceText = "";
if (serviceName == "any") {
  serviceText = "Any Service";
} else {
  serviceText = serviceName;
}

let locationText = "";
let locationType = "";
let thisCSU = {
  name: "",
  slug: "",
};
if (locationID.includes("CSU")) {
  //get the CSU
  for (let i = 0; i < _lib_csu_js__WEBPACK_IMPORTED_MODULE_1__.CSUStructure.length; i++) {
    //cycle through the CSUs in each region
    for (let j = 0; j < _lib_csu_js__WEBPACK_IMPORTED_MODULE_1__.CSUStructure[i].CSUs.length; j++) {
      if (_lib_csu_js__WEBPACK_IMPORTED_MODULE_1__.CSUStructure[i].CSUs[j].slug == locationID) {
        thisCSU = _lib_csu_js__WEBPACK_IMPORTED_MODULE_1__.CSUStructure[i].CSUs[j];
      }
    }
  }
  locationText = thisCSU.name;
  locationType = "CSU";
} else if (locationID.includes("51")) {
  // @ts-ignore
  locationText = simplemaps_statemap_mapdata.state_specific[locationID].name;
  locationType = "Locality";
} else if (locationID == "any") {
  locationText = "Any Location";
  locationType = "any";
} else {
  switch (locationID) {
    case "north":
      locationText = "Northern Region";
      break;
    case "south":
      locationText = "Southern Region";
      break;
    case "east":
      locationText = "Eastern Region";
      break;
    case "central":
      locationText = "Central Region";
      break;
    case "west":
      locationText = "Western Region";
      break;
    case "midwest":
      locationText = "Midwestern Region";
      break;
  }
  locationType = "Region";
}

const providerSearchResults = _api_api_js__WEBPACK_IMPORTED_MODULE_0__.API.searchProviders({
  serviceName,
  locationType,
  locationID,
  languageName,
});


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
/*!***********************************!*\
  !*** ./src/pages/search/index.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api/api.js */ "./src/api/api.js");
/* harmony import */ var _lib_csu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/csu.js */ "./src/lib/csu.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api.js */ "./src/pages/search/api.js");




document.getElementById("serviceTextSpan").innerText = _api_js__WEBPACK_IMPORTED_MODULE_2__.serviceText;
document.getElementById("locationTextSpan").innerText = _api_js__WEBPACK_IMPORTED_MODULE_2__.locationText;
document.getElementById("languageTextSpan").innerText = _api_js__WEBPACK_IMPORTED_MODULE_2__.languageText;

//cycle through all location items

if (_api_js__WEBPACK_IMPORTED_MODULE_2__.providerSearchResults.size == 0) {
  const noResults = document.getElementById("noResults");
  noResults.hidden = false;
}
const searchResultsUL = document.getElementById("searchResults");
_api_js__WEBPACK_IMPORTED_MODULE_2__.providerSearchResults.forEach((provider, key) => {
  const providerLI = document.createElement("li");
  providerLI.innerHTML = `<a href="../provider/index.html?id=${key}">${provider}</a>`;
  searchResultsUL.appendChild(providerLI);
});

const availableServices = _api_api_js__WEBPACK_IMPORTED_MODULE_0__.API.getAllServiceNames();
const serviceSelect = document.getElementsByName("Service")[0];
availableServices.forEach((service) => {
  const option = document.createElement("option");
  option.value = service;
  option.text = service;
  serviceSelect.appendChild(option);
});

const whereSelect = document.getElementsByName("Where")[0];
//Cycle through CSUs
for (let i = 0; i < _lib_csu_js__WEBPACK_IMPORTED_MODULE_1__.sortedCSUs.length; i++) {
  // create an option for each CSU
  const option = document.createElement("option");
  option.value = _lib_csu_js__WEBPACK_IMPORTED_MODULE_1__.sortedCSUs[i].slug;
  option.text = _lib_csu_js__WEBPACK_IMPORTED_MODULE_1__.sortedCSUs[i].name;
  whereSelect.appendChild(option);
}
const regionBreakOption = document.createElement("option");
regionBreakOption.value = "0";
regionBreakOption.text = "-----REGIONS-----";
whereSelect.appendChild(regionBreakOption);
//Cycle through Regions
for (let region in _lib_csu_js__WEBPACK_IMPORTED_MODULE_1__.regionCSUs) {
  const option = document.createElement("option");
  option.value = _lib_csu_js__WEBPACK_IMPORTED_MODULE_1__.regionCSUs[region].slug;
  option.text = _lib_csu_js__WEBPACK_IMPORTED_MODULE_1__.regionCSUs[region].name;
  whereSelect.appendChild(option);
}
const localityBreakOption = document.createElement("option");
localityBreakOption.value = "0";
localityBreakOption.text = "-----LOCALITIES-----";
whereSelect.appendChild(localityBreakOption);
for (let i = 0; i < _lib_csu_js__WEBPACK_IMPORTED_MODULE_1__.allFips.length; i++) {
  const option = document.createElement("option");
  option.value = _lib_csu_js__WEBPACK_IMPORTED_MODULE_1__.allFips[i];
  // @ts-ignore
  option.text = simplemaps_statemap_mapdata.state_specific[_lib_csu_js__WEBPACK_IMPORTED_MODULE_1__.allFips[i]].name;
  whereSelect.appendChild(option);
}

const availableLanguages = _api_api_js__WEBPACK_IMPORTED_MODULE_0__.API.getAllLanguages();
for (let i = 0; i < availableLanguages.length; i++) {
  if (availableLanguages[i] != "") {
    const option = document.createElement("option");
    option.value = availableLanguages[i];
    option.text = availableLanguages[i];
    document.getElementsByName("Language")[0].appendChild(option);
  }
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMvc2VhcmNoL2J1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BtQztBQUNVO0FBQ1M7O0FBRS9DO0FBQ1AsRUFBRSw4Q0FBTSxTQUFTLG1EQUFXLFdBQVcsNENBQU8sU0FBUyxzREFBWTs7Ozs7Ozs7Ozs7Ozs7O0FDTDVEO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IscURBQXFEO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDakd3RTs7QUFFakU7QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHdCQUF3QjtBQUM5QztBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isd0JBQXdCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHNCQUFzQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG9DQUFvQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDZCQUE2QjtBQUNqRDtBQUNBO0FBQ0Esc0JBQXNCLHdCQUF3QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNkJBQTZCO0FBQ2pEO0FBQ0E7QUFDQSxzQkFBc0Isd0JBQXdCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDZCQUE2QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLHdCQUF3QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixxQkFBcUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiw2QkFBNkI7QUFDdkQ7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQSxzQkFBc0IseUJBQXlCO0FBQy9DOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHdCQUF3QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQjtBQUNBLG9CQUFvQixxREFBcUQ7QUFDekU7QUFDQTs7QUFFQSxvQkFBb0Isb0JBQW9CO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsOERBQWlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFvQjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0aUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuZnVDO0FBQ1M7O0FBRWhEO0FBQ0E7QUFDTztBQUNQO0FBQ087O0FBRUE7QUFDUDtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRU87QUFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixJQUFJLHFEQUFZLFNBQVM7QUFDM0M7QUFDQSxvQkFBb0IsSUFBSSxxREFBWSxpQkFBaUI7QUFDckQsVUFBVSxxREFBWTtBQUN0QixrQkFBa0IscURBQVk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTyw4QkFBOEIsNENBQUc7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7O1VDdEVEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ051QztBQUM0QjtBQU1qRDs7QUFFbEIsdURBQXVELGdEQUFXO0FBQ2xFLHdEQUF3RCxpREFBWTtBQUNwRSx3REFBd0QsaURBQVk7O0FBRXBFOztBQUVBLElBQUksMERBQXFCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQXFCO0FBQ3JCO0FBQ0EsK0RBQStELElBQUksSUFBSSxTQUFTO0FBQ2hGO0FBQ0EsQ0FBQzs7QUFFRCwwQkFBMEIsNENBQUc7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsZ0JBQWdCLElBQUksbURBQVUsU0FBUztBQUN2QztBQUNBO0FBQ0EsaUJBQWlCLG1EQUFVO0FBQzNCLGdCQUFnQixtREFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtREFBVTtBQUM3QjtBQUNBLGlCQUFpQixtREFBVTtBQUMzQixnQkFBZ0IsbURBQVU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLElBQUksZ0RBQU8sU0FBUztBQUNwQztBQUNBLGlCQUFpQixnREFBTztBQUN4QjtBQUNBLDJEQUEyRCxnREFBTztBQUNsRTtBQUNBOztBQUVBLDJCQUEyQiw0Q0FBRztBQUM5QixnQkFBZ0IsK0JBQStCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS8uL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly9lYmEtcHJvdmlkZXItZGlyZWN0b3J5Ly4vc3JjL2FwaS9hcGkuanMiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS8uL3NyYy9hcGkvZmlyZWJhc2UuanMiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS8uL3NyYy9hcGkveG1sLmpzIiwid2VicGFjazovL2ViYS1wcm92aWRlci1kaXJlY3RvcnkvLi9zcmMvbGliL2NzdS5qcyIsIndlYnBhY2s6Ly9lYmEtcHJvdmlkZXItZGlyZWN0b3J5Ly4vc3JjL3BhZ2VzL3NlYXJjaC9hcGkuanMiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lYmEtcHJvdmlkZXItZGlyZWN0b3J5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lYmEtcHJvdmlkZXItZGlyZWN0b3J5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ViYS1wcm92aWRlci1kaXJlY3RvcnkvLi9zcmMvcGFnZXMvc2VhcmNoL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBBUElfT1BUSU9OUyA9IHtcbiAgWE1MOiBcIlhNTFwiLFxuICBGSVJFQkFTRTogXCJGSVJFQkFTRVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgQVBJOiBBUElfT1BUSU9OUy5YTUwsXG59O1xuIiwiaW1wb3J0IHsgWE1MX0FQSSB9IGZyb20gXCIuL3htbC5qc1wiO1xuaW1wb3J0IHsgRklSRUJBU0VfQVBJIH0gZnJvbSBcIi4vZmlyZWJhc2UuanNcIjtcbmltcG9ydCB7IGNvbmZpZywgQVBJX09QVElPTlMgfSBmcm9tIFwiLi4vLi4vY29uZmlnLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBBUEkgPVxuICBjb25maWcuQVBJID09PSBBUElfT1BUSU9OUy5YTUwgPyBuZXcgWE1MX0FQSSgpIDogbmV3IEZJUkVCQVNFX0FQSSgpO1xuIiwiZXhwb3J0IGNsYXNzIEZJUkVCQVNFX0FQSSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubmFtZSA9IFwiRklSRUJBU0VfQVBJXCI7XG4gIH1cblxuICB0ZXN0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiRklSRUJBU0VfQVBJXCIpO1xuICB9XG5cbiAgZ2V0TGFzdFVwZGF0ZWQoKSB7XG4gICAgcmV0dXJuIFwibm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcIjtcbiAgfVxuXG4gIGdldEFsbFByb3ZpZGVycygpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEFsbFByb3ZpZGVyc0J5Q1NVKGNzdSkge1xuICAgIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gRklSRUJBU0VfQVBJXG4gICAgcmV0dXJuIG5ldyBNYXAoKTtcbiAgfVxuXG4gIGdldEFsbFByb3ZpZGVyc0J5RklQUyhmaXBzKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gbmV3IE1hcCgpO1xuICB9XG5cbiAgZ2V0UHJvdmlkZXJTZXJ2aWNlcyhwcm92aWRlcklEKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRQcm92aWRlckluZm8ocHJvdmlkZXJJRCkge1xuICAgIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gRklSRUJBU0VfQVBJXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgZ2V0QWxsU2VydmljZXNCeVByb3ZpZGVySW5GSVBTKHByb3ZpZGVySWQsIGZpcHMpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEFsbFNlcnZpY2VOYW1lc0J5Q1NVKGNzdSkge1xuICAgIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gRklSRUJBU0VfQVBJXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZ2V0QWxsU2VydmljZXNCeVByb3ZpZGVySW5DU1UocHJvdmlkZXJJZCwgY3N1KSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnNPZlNlcnZpY2VJbkNTVShzZXJ2aWNlTmFtZSwgY3N1KSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnNPZkxhbmd1YWdlKGxhbmd1YWdlTmFtZSkge1xuICAgIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gRklSRUJBU0VfQVBJXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzT2ZTZXJ2aWNlKHNlcnZpY2VOYW1lKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRBbGxMb2NhdGlvbnMoKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRBbGxTZXJ2aWNlTmFtZXMoKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRBbGxMYW5ndWFnZXMoKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRTZXJ2aWNlTWFwRklQUyhwcm92aWRlcklELCBzZXJ2aWNlTmFtZSkge1xuICAgIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gRklSRUJBU0VfQVBJXG4gICAgcmV0dXJuIHsgYXZhaWxhYmxlOiBbXSwgbGltaXRlZDogW10sIGxhbmd1YWdlczogbmV3IE1hcCgpIH07XG4gIH1cblxuICBnZXRBbGxGSVBTKHByb3ZpZGVySUQpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHNlYXJjaFByb3ZpZGVycyh7IHNlcnZpY2VOYW1lLCBsb2NhdGlvblR5cGUsIGxvY2F0aW9uSUQsIGxhbmd1YWdlTmFtZSB9KSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gbmV3IE1hcCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBpc0xvY2FsaXR5SW5DU1VJRCwgaXNMb2NhbGl0eUluUmVnaW9uSUQgfSBmcm9tIFwiLi4vbGliL2NzdS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgWE1MX0FQSSB7XG4gIGZpbGVuYW1lID0gXCIvZGF0YS9kc3BzLnhtbFwiO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubmFtZSA9IFwiWE1MX0FQSVwiO1xuICAgIHRoaXMuZ2V0WE1MKCk7XG4gIH1cblxuICBhc3luYyBnZXRYTUwoKSB7XG4gICAgY29uc3QgQ29ubmVjdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIENvbm5lY3Qub3BlbihcIkdFVFwiLCB0aGlzLmZpbGVuYW1lLCBmYWxzZSk7XG4gICAgQ29ubmVjdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC94bWxcIik7XG4gICAgQ29ubmVjdC5zZW5kKG51bGwpO1xuICAgIHRoaXMuZGF0YSA9IENvbm5lY3QucmVzcG9uc2VYTUw7XG4gIH1cblxuICBnZXRMYXN0VXBkYXRlZCgpIHtcbiAgICBpZiAodGhpcy5kYXRhICE9PSBudWxsICYmIHRoaXMuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB1cGRhdGVEYXRlcyA9IHRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkxhc3RVcGRhdGVkXCIpO1xuICAgICAgY29uc3QgdXBkYXRlQXJyYXkgPSBbXTtcbiAgICAgIGxldCB1cGRhdGVBcnJ5VGV4dCA9IFwiXCI7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZURhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHVwZGF0ZUFycmF5LnB1c2godXBkYXRlRGF0ZXMuaXRlbShpKS50ZXh0Q29udGVudCk7XG4gICAgICB9XG4gICAgICB1cGRhdGVBcnJheS5zb3J0KCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZURhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHVwZGF0ZUFycnlUZXh0ICs9IHVwZGF0ZUFycmF5W2ldICsgXCJcXHJcIjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRpcmVjdG9yeVVwZGF0ZWRTcGxpdCA9XG4gICAgICAgIHVwZGF0ZUFycmF5W3VwZGF0ZURhdGVzLmxlbmd0aCAtIDFdLnNwbGl0KFwiLVwiKTtcbiAgICAgIGxldCBkaXJlY3RvcnlVcGRhdGVkID0gXCJcIjtcbiAgICAgIGlmIChkaXJlY3RvcnlVcGRhdGVkU3BsaXRbMV0gPT0gXCIwMVwiKSB7XG4gICAgICAgIGRpcmVjdG9yeVVwZGF0ZWQgPSBcIkphbnVhcnkgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjAyXCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiRmVicnVhcnkgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjAzXCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiTWFyY2ggXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjA0XCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiQXByaWwgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjA1XCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiTWF5IFwiO1xuICAgICAgfSBlbHNlIGlmIChkaXJlY3RvcnlVcGRhdGVkU3BsaXRbMV0gPT0gXCIwNlwiKSB7XG4gICAgICAgIGRpcmVjdG9yeVVwZGF0ZWQgPSBcIkp1bmUgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjA3XCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiSnVseSBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMDhcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJBdWd1c3QgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjA5XCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiU2VwdGVtYmVyIFwiO1xuICAgICAgfSBlbHNlIGlmIChkaXJlY3RvcnlVcGRhdGVkU3BsaXRbMV0gPT0gXCIxMFwiKSB7XG4gICAgICAgIGRpcmVjdG9yeVVwZGF0ZWQgPSBcIk9jdG9iZXIgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjExXCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiTm92ZW1iZXIgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjEyXCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiRGVjZW1iZXIgXCI7XG4gICAgICB9XG4gICAgICBkaXJlY3RvcnlVcGRhdGVkICs9IE51bWJlcihkaXJlY3RvcnlVcGRhdGVkU3BsaXRbMl0pICsgXCIsIFwiO1xuICAgICAgZGlyZWN0b3J5VXBkYXRlZCArPSBkaXJlY3RvcnlVcGRhdGVkU3BsaXRbMF07XG4gICAgICByZXR1cm4gZGlyZWN0b3J5VXBkYXRlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwiTm8gZGF0YSBhdmFpbGFibGUuXCI7XG4gICAgfVxuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzKCkge1xuICAgIGlmICh0aGlzLmRhdGEgIT09IG51bGwgJiYgdGhpcy5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHByb3ZpZGVycyA9IHRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlByb3ZpZGVyXCIpO1xuICAgICAgY29uc3QgcHJvdmlkZXJMaXN0ID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3ZpZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwcm92aWRlck5hbWUgPSBwcm92aWRlcnNcbiAgICAgICAgICAuaXRlbShpKVxuICAgICAgICAgID8uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJOYW1lXCIpXG4gICAgICAgICAgPy5pdGVtKDApPy50ZXh0Q29udGVudDtcbiAgICAgICAgY29uc3QgcHJvdmlkZXJJZCA9IHByb3ZpZGVycy5pdGVtKGkpPy5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgcHJvdmlkZXJMaXN0LnB1c2goeyBuYW1lOiBwcm92aWRlck5hbWUsIGlkOiBwcm92aWRlcklkIH0pO1xuICAgICAgfVxuICAgICAgcHJvdmlkZXJMaXN0LnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKGEubmFtZSA8IGIubmFtZSkge1xuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChhLm5hbWUgPiBiLm5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcHJvdmlkZXJMaXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzQnlDU1UoY3N1KSB7XG4gICAgaWYgKHRoaXMuZGF0YSAhPT0gbnVsbCAmJiB0aGlzLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgcHJvdmlkZXJMaXN0ID0gbmV3IE1hcCgpO1xuICAgICAgY29uc3Qgc2VydmljZUZJUFMgPSBbLi4udGhpcy5kYXRhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiRklQc1wiKV07XG5cbiAgICAgIGNvbnN0IGNzdVNlcnZpY2VGSVBTID0gc2VydmljZUZJUFMuZmlsdGVyKChmaXBzKSA9PlxuICAgICAgICBjc3UubG9jYWxpdGllcy5pbmNsdWRlcyhmaXBzLnRleHRDb250ZW50KVxuICAgICAgKTtcblxuICAgICAgY3N1U2VydmljZUZJUFMuZm9yRWFjaCgoZmlwcykgPT4ge1xuICAgICAgICBjb25zdCBwcm92aWRlciA9IGZpcHMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBjb25zdCBwcm92aWRlck5hbWUgPSBwcm92aWRlclxuICAgICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIk5hbWVcIilcbiAgICAgICAgICAuaXRlbSgwKS50ZXh0Q29udGVudDtcbiAgICAgICAgY29uc3QgcHJvdmlkZXJJZCA9IHByb3ZpZGVyLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuXG4gICAgICAgIGlmICghcHJvdmlkZXJMaXN0Lmhhcyhwcm92aWRlcklkKSkge1xuICAgICAgICAgIHByb3ZpZGVyTGlzdC5zZXQocHJvdmlkZXJJZCwgcHJvdmlkZXJOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IE1hcChcbiAgICAgICAgWy4uLnByb3ZpZGVyTGlzdC5lbnRyaWVzKCldLnNvcnQoKGEsIGIpID0+IGFbMV0ubG9jYWxlQ29tcGFyZShiWzFdKSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgTWFwKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzQnlGSVBTKGZpcHMpIHtcbiAgICBjb25zdCBwcm92aWRlckxpc3QgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgYWxsRklQUyA9IFsuLi50aGlzLmRhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpXTtcblxuICAgIGNvbnN0IHRhcmdldEZJUFMgPSBhbGxGSVBTLmZpbHRlcihcbiAgICAgIChmaXBzRWxlbWVudCkgPT4gZmlwc0VsZW1lbnQudGV4dENvbnRlbnQgPT09IGZpcHNcbiAgICApO1xuXG4gICAgdGFyZ2V0RklQUy5mb3JFYWNoKChmaXBzRWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgcHJvdmlkZXIgPSBmaXBzRWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICBjb25zdCBwcm92aWRlck5hbWUgPSBwcm92aWRlclxuICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJOYW1lXCIpXG4gICAgICAgIC5pdGVtKDApLnRleHRDb250ZW50O1xuICAgICAgY29uc3QgcHJvdmlkZXJJZCA9IHByb3ZpZGVyLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuXG4gICAgICBwcm92aWRlckxpc3Quc2V0KHByb3ZpZGVySWQsIHByb3ZpZGVyTmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBNYXAoXG4gICAgICBbLi4ucHJvdmlkZXJMaXN0LmVudHJpZXMoKV0uc29ydCgoYSwgYikgPT4gYVsxXS5sb2NhbGVDb21wYXJlKGJbMV0pKVxuICAgICk7XG4gIH1cblxuICBnZXRQcm92aWRlclNlcnZpY2VzKHByb3ZpZGVySUQpIHtcbiAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuZGF0YS5nZXRFbGVtZW50QnlJZChwcm92aWRlcklEKTtcbiAgICBjb25zdCBzZXJ2aWNlRWxlbWVudHMgPSBwcm92aWRlci5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlNlcnZpY2VcIik7XG4gICAgY29uc3Qgc2VydmljZU5hbWVzID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VydmljZUVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzZXJ2aWNlID0gc2VydmljZUVsZW1lbnRzLml0ZW0oaSk7XG4gICAgICBzZXJ2aWNlTmFtZXMuYWRkKHNlcnZpY2UuZ2V0QXR0cmlidXRlKFwic2VydmljZU5hbWVcIikpO1xuICAgIH1cbiAgICByZXR1cm4gWy4uLnNlcnZpY2VOYW1lc10uc29ydCgpO1xuICB9XG5cbiAgZ2V0UHJvdmlkZXJJbmZvKHByb3ZpZGVySUQpIHtcbiAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuZGF0YS5nZXRFbGVtZW50QnlJZChwcm92aWRlcklEKTtcbiAgICBjb25zdCBtYXBab29tID0gcHJvdmlkZXJcbiAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIk1hcFpvb21cIilcbiAgICAgIC5pdGVtKDApLnRleHRDb250ZW50O1xuICAgIGNvbnN0IGNvbnRhY3ROYW1lID0gcHJvdmlkZXJcbiAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkNvbnRhY3ROYW1lXCIpXG4gICAgICAuaXRlbSgwKS50ZXh0Q29udGVudDtcbiAgICBjb25zdCBwcm92aWRlck5hbWUgPSBwcm92aWRlclxuICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiTmFtZVwiKVxuICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgY29uc3QgY29udGFjdEVtYWlsID0gcHJvdmlkZXJcbiAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkNvbnRhY3RFbWFpbFwiKVxuICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgY29uc3Qgd2Vic2l0ZSA9IHByb3ZpZGVyXG4gICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJXZWJzaXRlXCIpXG4gICAgICAuaXRlbSgwKS50ZXh0Q29udGVudDtcbiAgICBjb25zdCBsYXN0VXBkYXRlZCA9IHByb3ZpZGVyXG4gICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJMYXN0VXBkYXRlZFwiKVxuICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByb3ZpZGVyTmFtZSxcbiAgICAgIGNvbnRhY3ROYW1lLFxuICAgICAgY29udGFjdEVtYWlsLFxuICAgICAgd2Vic2l0ZSxcbiAgICAgIGxhc3RVcGRhdGVkLFxuICAgICAgbWFwWm9vbSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0QWxsU2VydmljZU5hbWVzQnlDU1UoY3N1KSB7XG4gICAgaWYgKHRoaXMuZGF0YSAhPT0gbnVsbCAmJiB0aGlzLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3Qgc2VydmljZUxpc3QgPSBuZXcgU2V0KCk7XG4gICAgICBjb25zdCBzZXJ2aWNlRklQUyA9IFsuLi50aGlzLmRhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpXTtcblxuICAgICAgY29uc3QgY3N1U2VydmljZUZJUFMgPSBzZXJ2aWNlRklQUy5maWx0ZXIoKGZpcHMpID0+XG4gICAgICAgIGNzdS5sb2NhbGl0aWVzLmluY2x1ZGVzKGZpcHMudGV4dENvbnRlbnQpXG4gICAgICApO1xuXG4gICAgICBjc3VTZXJ2aWNlRklQUy5mb3JFYWNoKChmaXBzKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlcnZpY2UgPSBmaXBzLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHNlcnZpY2VOYW1lID0gc2VydmljZS5nZXRBdHRyaWJ1dGUoXCJzZXJ2aWNlTmFtZVwiKTtcblxuICAgICAgICBzZXJ2aWNlTGlzdC5hZGQoc2VydmljZU5hbWUpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBbLi4uc2VydmljZUxpc3RdLnNvcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIGdldEFsbFNlcnZpY2VzQnlQcm92aWRlckluRklQUyhwcm92aWRlcklkLCBmaXBzKSB7XG4gICAgY29uc3QgcHJvdmlkZXIgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudEJ5SWQocHJvdmlkZXJJZCk7XG4gICAgY29uc3QgcHJvdmlkZXJTZXJ2aWNlcyA9IHByb3ZpZGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiU2VydmljZVwiKTtcbiAgICBjb25zdCBzZXJ2aWNlTGlzdCA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3ZpZGVyU2VydmljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBwcm92aWRlclNlcnZpY2VzLml0ZW0oaSk7XG4gICAgICBjb25zdCBzZXJ2aWNlRklQUyA9IHNlcnZpY2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZXJ2aWNlRklQUy5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoc2VydmljZUZJUFMuaXRlbShqKS50ZXh0Q29udGVudCA9PT0gZmlwcykge1xuICAgICAgICAgIGNvbnN0IGlzTGltaXRlZFNlcnZpY2UgPVxuICAgICAgICAgICAgc2VydmljZUZJUFMuaXRlbShqKS5nZXRBdHRyaWJ1dGUoXCJ0cmF2ZWxSZXFcIikgPT09IFwiWVwiO1xuICAgICAgICAgIHNlcnZpY2VMaXN0LnNldChcbiAgICAgICAgICAgIHNlcnZpY2UuZ2V0QXR0cmlidXRlKFwic2VydmljZU5hbWVcIiksXG4gICAgICAgICAgICBpc0xpbWl0ZWRTZXJ2aWNlXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IE1hcChcbiAgICAgIFsuLi5zZXJ2aWNlTGlzdC5lbnRyaWVzKCldLnNvcnQoKGEsIGIpID0+IGFbMF0ubG9jYWxlQ29tcGFyZShiWzBdKSlcbiAgICApO1xuICB9XG5cbiAgZ2V0QWxsU2VydmljZXNCeVByb3ZpZGVySW5DU1UocHJvdmlkZXJJZCwgY3N1KSB7XG4gICAgY29uc3QgcHJvdmlkZXIgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudEJ5SWQocHJvdmlkZXJJZCk7XG4gICAgY29uc3QgcHJvdmlkZXJTZXJ2aWNlcyA9IHByb3ZpZGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiU2VydmljZVwiKTtcbiAgICBjb25zdCBzZXJ2aWNlTGlzdCA9IG5ldyBTZXQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3ZpZGVyU2VydmljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBwcm92aWRlclNlcnZpY2VzLml0ZW0oaSk7XG4gICAgICBjb25zdCBzZXJ2aWNlRklQUyA9IHNlcnZpY2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZXJ2aWNlRklQUy5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoY3N1LmxvY2FsaXRpZXMuaW5jbHVkZXMoc2VydmljZUZJUFMuaXRlbShqKS50ZXh0Q29udGVudCkpIHtcbiAgICAgICAgICBzZXJ2aWNlTGlzdC5hZGQoc2VydmljZS5nZXRBdHRyaWJ1dGUoXCJzZXJ2aWNlTmFtZVwiKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFsuLi5zZXJ2aWNlTGlzdF0uc29ydCgpO1xuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzT2ZTZXJ2aWNlSW5DU1Uoc2VydmljZU5hbWUsIGNzdSkge1xuICAgIGNvbnN0IHNlcnZpY2VGSVBTID0gWy4uLnRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkZJUHNcIildO1xuICAgIGNvbnN0IGNzdVNlcnZpY2VGSVBTID0gc2VydmljZUZJUFMuZmlsdGVyKChmaXBzKSA9PlxuICAgICAgY3N1LmxvY2FsaXRpZXMuaW5jbHVkZXMoZmlwcy50ZXh0Q29udGVudClcbiAgICApO1xuXG4gICAgY29uc3QgcHJvdmlkZXJMaXN0ID0gbmV3IE1hcCgpO1xuICAgIGNzdVNlcnZpY2VGSVBTLmZvckVhY2goKGZpcHMpID0+IHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyID0gZmlwcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICBjb25zdCBwcm92aWRlck5hbWUgPSBwcm92aWRlclxuICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJOYW1lXCIpXG4gICAgICAgIC5pdGVtKDApLnRleHRDb250ZW50O1xuICAgICAgY29uc3QgcHJvdmlkZXJJZCA9IHByb3ZpZGVyLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgY29uc3QgcHJvdmlkZXJTZXJ2aWNlcyA9IHByb3ZpZGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiU2VydmljZVwiKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvdmlkZXJTZXJ2aWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvdmlkZXJTZXJ2aWNlcy5pdGVtKGkpLmdldEF0dHJpYnV0ZShcInNlcnZpY2VOYW1lXCIpID09PSBzZXJ2aWNlTmFtZVxuICAgICAgICApIHtcbiAgICAgICAgICBwcm92aWRlckxpc3Quc2V0KHByb3ZpZGVySWQsIHByb3ZpZGVyTmFtZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgTWFwKFxuICAgICAgWy4uLnByb3ZpZGVyTGlzdC5lbnRyaWVzKCldLnNvcnQoKGEsIGIpID0+IGFbMV0ubG9jYWxlQ29tcGFyZShiWzFdKSlcbiAgICApO1xuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzT2ZMYW5ndWFnZShsYW5ndWFnZU5hbWUpIHtcbiAgICBjb25zdCBwcm92aWRlcnMgPSBuZXcgTWFwKCk7XG5cbiAgICBjb25zdCBhbGxGSVBTID0gWy4uLnRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkZJUHNcIildO1xuICAgIGFsbEZJUFMuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgIGNvbnN0IGZpcHNMYW5ndWFnZXMgPSBsb2NhdGlvbi5nZXRBdHRyaWJ1dGUoXCJsYW5ndWFnZXNcIik7XG4gICAgICBpZiAoZmlwc0xhbmd1YWdlcyAmJiBmaXBzTGFuZ3VhZ2VzLmluY2x1ZGVzKGxhbmd1YWdlTmFtZSkpIHtcbiAgICAgICAgY29uc3QgcHJvdmlkZXIgPSBsb2NhdGlvbi5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVySUQgPSBwcm92aWRlci5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgY29uc3QgcHJvdmlkZXJOYW1lID0gcHJvdmlkZXJcbiAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJOYW1lXCIpXG4gICAgICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgICAgIHByb3ZpZGVycy5zZXQocHJvdmlkZXJJRCwgcHJvdmlkZXJOYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgTWFwKFxuICAgICAgWy4uLnByb3ZpZGVycy5lbnRyaWVzKCldLnNvcnQoKGEsIGIpID0+IGFbMV0ubG9jYWxlQ29tcGFyZShiWzFdKSlcbiAgICApO1xuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzT2ZTZXJ2aWNlKHNlcnZpY2VOYW1lKSB7XG4gICAgY29uc3QgcHJvdmlkZXJzID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3QgYWxsU2VydmljZXMgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTZXJ2aWNlXCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsU2VydmljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBhbGxTZXJ2aWNlcy5pdGVtKGkpO1xuICAgICAgaWYgKHNlcnZpY2UuZ2V0QXR0cmlidXRlKFwic2VydmljZU5hbWVcIikgPT09IHNlcnZpY2VOYW1lKSB7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyID0gc2VydmljZS5wYXJlbnRFbGVtZW50O1xuICAgICAgICBjb25zdCBwcm92aWRlcklEID0gcHJvdmlkZXIuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyTmFtZSA9IHByb3ZpZGVyXG4gICAgICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiTmFtZVwiKVxuICAgICAgICAgIC5pdGVtKDApLnRleHRDb250ZW50O1xuICAgICAgICBwcm92aWRlcnMuc2V0KHByb3ZpZGVySUQsIHByb3ZpZGVyTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBNYXAoXG4gICAgICBbLi4ucHJvdmlkZXJzLmVudHJpZXMoKV0uc29ydCgoYSwgYikgPT4gYVsxXS5sb2NhbGVDb21wYXJlKGJbMV0pKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtwcm92aWRlcklEXVxuICAgKi9cbiAgZ2V0QWxsTG9jYXRpb25zKHByb3ZpZGVySUQpIHtcbiAgICBsZXQgbG9jYXRpb25zO1xuICAgIGlmICghcHJvdmlkZXJJRCkge1xuICAgICAgbG9jYXRpb25zID0gdGhpcy5kYXRhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiT2ZmaWNlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuZGF0YS5nZXRFbGVtZW50QnlJZChwcm92aWRlcklEKTtcbiAgICAgIGxvY2F0aW9ucyA9IHByb3ZpZGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiT2ZmaWNlXCIpO1xuICAgIH1cbiAgICBjb25zdCBsb2NhdGlvbkFycmF5ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGxvY2F0aW9uID0gbG9jYXRpb25zLml0ZW0oaSk7XG4gICAgICAvLyBnZXQgbG9jYXRpb24ncyBwcm92aWRlciBuYW1lIChpbiBwYXJlbnQgbm9kZSlcbiAgICAgIGNvbnN0IGxvY2F0aW9uT2JqZWN0ID0ge1xuICAgICAgICBwcm92aWRlck5hbWU6IGxvY2F0aW9uLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJOYW1lXCIpXG4gICAgICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQsXG4gICAgICAgIHByb3ZpZGVySWQ6IGxvY2F0aW9uLnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiaWRcIiksXG4gICAgICAgIGxhdDogbG9jYXRpb24uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJMYXRcIikuaXRlbSgwKS50ZXh0Q29udGVudCxcbiAgICAgICAgbG5nOiBsb2NhdGlvbi5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkxuZ1wiKS5pdGVtKDApLnRleHRDb250ZW50LFxuICAgICAgICBzdHJlZXQ6IGxvY2F0aW9uLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiU3RyZWV0XCIpLml0ZW0oMCkudGV4dENvbnRlbnQsXG4gICAgICAgIGNpdHk6IGxvY2F0aW9uLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiQ2l0eVwiKS5pdGVtKDApLnRleHRDb250ZW50LFxuICAgICAgICBzdGF0ZTogbG9jYXRpb24uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTdGF0ZVwiKS5pdGVtKDApLnRleHRDb250ZW50LFxuICAgICAgICB6aXA6IGxvY2F0aW9uLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiWmlwXCIpLml0ZW0oMCkudGV4dENvbnRlbnQsXG4gICAgICAgIHBob25lOiBsb2NhdGlvbi5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlBob25lXCIpLml0ZW0oMCkudGV4dENvbnRlbnQsXG4gICAgICB9O1xuICAgICAgbG9jYXRpb25BcnJheS5wdXNoKGxvY2F0aW9uT2JqZWN0KTtcbiAgICB9XG4gICAgcmV0dXJuIGxvY2F0aW9uQXJyYXk7XG4gIH1cblxuICBnZXRBbGxTZXJ2aWNlTmFtZXMoKSB7XG4gICAgaWYgKHRoaXMuZGF0YSAhPT0gbnVsbCAmJiB0aGlzLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3Qgc2VydmljZXMgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTZXJ2aWNlXCIpO1xuICAgICAgY29uc3Qgc2VydmljZU5hbWVzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlcnZpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNlcnZpY2VOYW1lID0gc2VydmljZXMuaXRlbShpKT8uZ2V0QXR0cmlidXRlKFwic2VydmljZU5hbWVcIik7XG4gICAgICAgIHNlcnZpY2VOYW1lcy5wdXNoKHNlcnZpY2VOYW1lKTtcbiAgICAgIH1cbiAgICAgIHNlcnZpY2VOYW1lcy5zb3J0KCk7XG4gICAgICByZXR1cm4gWy4uLm5ldyBTZXQoc2VydmljZU5hbWVzKV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICBnZXRBbGxMYW5ndWFnZXMocHJvdmlkZXJJRCkge1xuICAgIGxldCBhbGxMb2NhdGlvbnM7XG4gICAgaWYgKCFwcm92aWRlcklEKSB7XG4gICAgICBhbGxMb2NhdGlvbnMgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuZGF0YS5nZXRFbGVtZW50QnlJZChwcm92aWRlcklEKTtcbiAgICAgIGFsbExvY2F0aW9ucyA9IHByb3ZpZGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiRklQc1wiKTtcbiAgICB9XG5cbiAgICBsZXQgYWxsTGFuZ3VhZ2VzQXJyYXkgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbExvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFsbExvY2F0aW9ucy5pdGVtKGkpLmdldEF0dHJpYnV0ZShcImxhbmd1YWdlc1wiKSkge1xuICAgICAgICB2YXIgc2VydmljZUxhbmd1YWdlU3RyID0gYWxsTG9jYXRpb25zLml0ZW0oaSkuZ2V0QXR0cmlidXRlKFwibGFuZ3VhZ2VzXCIpO1xuICAgICAgICB3aGlsZSAoc2VydmljZUxhbmd1YWdlU3RyLmluZGV4T2YoXCIgXCIpID49IDApIHtcbiAgICAgICAgICBzZXJ2aWNlTGFuZ3VhZ2VTdHIgPSBzZXJ2aWNlTGFuZ3VhZ2VTdHIucmVwbGFjZShcIiBcIiwgXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlcnZpY2VMYW5ndWFnZVN0ci5pbmNsdWRlcyhcIixcIikpIHtcbiAgICAgICAgICB2YXIgc2VydmljZUxhbmd1YWdlcyA9IHNlcnZpY2VMYW5ndWFnZVN0ci5zcGxpdChcIixcIik7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZXJ2aWNlTGFuZ3VhZ2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBhbGxMYW5ndWFnZXNBcnJheS5wdXNoKHNlcnZpY2VMYW5ndWFnZXNbal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGxMYW5ndWFnZXNBcnJheS5wdXNoKFxuICAgICAgICAgICAgYWxsTG9jYXRpb25zLml0ZW0oaSkuZ2V0QXR0cmlidXRlKFwibGFuZ3VhZ2VzXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBhbGxMYW5ndWFnZXNBcnJheS5zb3J0KCk7XG4gICAgcmV0dXJuIFsuLi5uZXcgU2V0KGFsbExhbmd1YWdlc0FycmF5KV07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW3BhcmFtcy5wcm92aWRlcklEXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLnNlcnZpY2VOYW1lXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBnZXRTZXJ2aWNlTWFwRklQUyh7IHByb3ZpZGVySUQsIHNlcnZpY2VOYW1lIH0pIHtcbiAgICBsZXQgc2VydmljZUVsZW1lbnRzO1xuXG4gICAgaWYgKHByb3ZpZGVySUQpIHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5kYXRhLmdldEVsZW1lbnRCeUlkKHByb3ZpZGVySUQpO1xuICAgICAgc2VydmljZUVsZW1lbnRzID0gcHJvdmlkZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTZXJ2aWNlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXJ2aWNlRWxlbWVudHMgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTZXJ2aWNlXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGF2YWlsYWJsZUZJUFMgPSBbXTtcbiAgICBjb25zdCBsaW1pdGVkRklQUyA9IFtdO1xuICAgIGNvbnN0IGxhbmd1YWdlTWFwID0gbmV3IE1hcCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VydmljZUVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzZXJ2aWNlID0gc2VydmljZUVsZW1lbnRzLml0ZW0oaSk7XG4gICAgICBpZiAoc2VydmljZS5nZXRBdHRyaWJ1dGUoXCJzZXJ2aWNlTmFtZVwiKSA9PT0gc2VydmljZU5hbWUpIHtcbiAgICAgICAgY29uc3Qgc2VydmljZUZJUFMgPSBzZXJ2aWNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiRklQc1wiKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZXJ2aWNlRklQUy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGNvbnN0IGZpcHMgPSBzZXJ2aWNlRklQUy5pdGVtKGopLnRleHRDb250ZW50O1xuICAgICAgICAgIGNvbnN0IGlzTGltaXRlZCA9XG4gICAgICAgICAgICBzZXJ2aWNlRklQUy5pdGVtKGopLmdldEF0dHJpYnV0ZShcInRyYXZlbFJlcVwiKSA9PT0gXCJZXCI7XG4gICAgICAgICAgaWYgKGlzTGltaXRlZCkge1xuICAgICAgICAgICAgbGltaXRlZEZJUFMucHVzaChmaXBzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXZhaWxhYmxlRklQUy5wdXNoKGZpcHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBsYW5ndWFnZUxpc3QgPSBzZXJ2aWNlRklQUy5pdGVtKGopLmdldEF0dHJpYnV0ZShcImxhbmd1YWdlc1wiKTtcbiAgICAgICAgICBpZiAobGFuZ3VhZ2VMaXN0KSB7XG4gICAgICAgICAgICBjb25zdCBsYW5ndWFnZUFycmF5ID0gbGFuZ3VhZ2VMaXN0LnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgIGxhbmd1YWdlQXJyYXkuZm9yRWFjaCgobGFuZ3VhZ2UpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGxhbmd1YWdlTWFwLmhhcyhsYW5ndWFnZSkpIHtcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU1hcC5nZXQobGFuZ3VhZ2UpLmFkZChmaXBzKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU1hcC5zZXQobGFuZ3VhZ2UsIG5ldyBTZXQoW2ZpcHNdKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvL2NvbnZlcnQgdGhlIGxhbmd1YWdlTWFwIGludG8gYW4gb2JqZWN0IHdpdGgga2V5cyBhbmQgdGhlIGZpcHNTZXRcbiAgICBjb25zdCBsYW5ndWFnZUZJUFMgPSBbLi4ubGFuZ3VhZ2VNYXBdLm1hcCgoW2xhbmd1YWdlLCBmaXBzU2V0XSkgPT4gKHtcbiAgICAgIFtsYW5ndWFnZV06IFsuLi5maXBzU2V0XSxcbiAgICB9KSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGF2YWlsYWJsZTogYXZhaWxhYmxlRklQUyxcbiAgICAgIGxpbWl0ZWQ6IGxpbWl0ZWRGSVBTLFxuICAgICAgbGFuZ3VhZ2VzOiBsYW5ndWFnZUZJUFMsXG4gICAgfTtcbiAgfVxuXG4gIGdldEFsbEZJUFMocHJvdmlkZXJJRCkge1xuICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5kYXRhLmdldEVsZW1lbnRCeUlkKHByb3ZpZGVySUQpO1xuICAgIGNvbnN0IGFsbFByb3ZpZGVyRklQUyA9IHByb3ZpZGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiRklQc1wiKTtcblxuICAgIGNvbnN0IGZpcHNMaXN0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxQcm92aWRlckZJUFMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZpcHNMaXN0LnB1c2goYWxsUHJvdmlkZXJGSVBTLml0ZW0oaSkudGV4dENvbnRlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gWy4uLm5ldyBTZXQoZmlwc0xpc3QpXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc2VhcmNoUGFyYW1zXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbc2VhcmNoUGFyYW1zLnNlcnZpY2VOYW1lXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3NlYXJjaFBhcmFtcy5sb2NhdGlvbklEXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3NlYXJjaFBhcmFtcy5sb2NhdGlvblR5cGVdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbc2VhcmNoUGFyYW1zLmxhbmd1YWdlTmFtZV1cbiAgICovXG4gIHNlYXJjaFByb3ZpZGVycyh7IHNlcnZpY2VOYW1lLCBsb2NhdGlvbklELCBsb2NhdGlvblR5cGUsIGxhbmd1YWdlTmFtZSB9KSB7XG4gICAgY29uc3QgYWxsRklQUyA9IHRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkZJUHNcIik7XG4gICAgY29uc3QgcHJvdmlkZXJMaXN0ID0gbmV3IE1hcCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxGSVBTLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgaXNTZXJ2aWNlTWF0Y2ggPSBmYWxzZTtcbiAgICAgIGxldCBpc0xvY2F0aW9uTWF0Y2ggPSBmYWxzZTtcbiAgICAgIGxldCBpc0xhbmd1YWdlTWF0Y2ggPSBmYWxzZTtcbiAgICAgIGNvbnN0IGZpcHNTZXJ2aWNlID0gYWxsRklQU1xuICAgICAgICAuaXRlbShpKVxuICAgICAgICAucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJzZXJ2aWNlTmFtZVwiKTtcbiAgICAgIGlmIChcbiAgICAgICAgIXNlcnZpY2VOYW1lIHx8XG4gICAgICAgIHNlcnZpY2VOYW1lID09PSBcImFueVwiIHx8XG4gICAgICAgIHNlcnZpY2VOYW1lID09PSBmaXBzU2VydmljZVxuICAgICAgKSB7XG4gICAgICAgIGlzU2VydmljZU1hdGNoID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmlwcyA9IGFsbEZJUFMuaXRlbShpKTtcbiAgICAgIGlmIChcbiAgICAgICAgIWxvY2F0aW9uSUQgfHxcbiAgICAgICAgbG9jYXRpb25JRCA9PT0gXCJhbnlcIiB8fFxuICAgICAgICBmaXBzLnRleHRDb250ZW50ID09PSBsb2NhdGlvbklEXG4gICAgICApIHtcbiAgICAgICAgaXNMb2NhdGlvbk1hdGNoID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBsb2NhdGlvblR5cGUgPT09IFwiQ1NVXCIgJiZcbiAgICAgICAgaXNMb2NhbGl0eUluQ1NVSUQobG9jYXRpb25JRCwgZmlwcy50ZXh0Q29udGVudClcbiAgICAgICkge1xuICAgICAgICBpc0xvY2F0aW9uTWF0Y2ggPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBsb2NhdGlvblR5cGUgPT09IFwiUmVnaW9uXCIgJiZcbiAgICAgICAgaXNMb2NhbGl0eUluUmVnaW9uSUQobG9jYXRpb25JRCwgZmlwcy50ZXh0Q29udGVudClcbiAgICAgICkge1xuICAgICAgICBpc0xvY2F0aW9uTWF0Y2ggPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWxhbmd1YWdlTmFtZSB8fCBsYW5ndWFnZU5hbWUgPT09IFwiRW5nbGlzaFwiKSB7XG4gICAgICAgIGlzTGFuZ3VhZ2VNYXRjaCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaXBzLmdldEF0dHJpYnV0ZShcImxhbmd1YWdlc1wiKSkge1xuICAgICAgICBjb25zdCBsYW5ndWFnZUxpc3QgPSBmaXBzLmdldEF0dHJpYnV0ZShcImxhbmd1YWdlc1wiKTtcbiAgICAgICAgaWYgKGxhbmd1YWdlTGlzdC5pbmNsdWRlcyhsYW5ndWFnZU5hbWUpKSB7XG4gICAgICAgICAgaXNMYW5ndWFnZU1hdGNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNTZXJ2aWNlTWF0Y2ggJiYgaXNMb2NhdGlvbk1hdGNoICYmIGlzTGFuZ3VhZ2VNYXRjaCkge1xuICAgICAgICBjb25zdCBwcm92aWRlciA9IGZpcHMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBjb25zdCBwcm92aWRlcklEID0gcHJvdmlkZXIuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyTmFtZSA9IHByb3ZpZGVyXG4gICAgICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiTmFtZVwiKVxuICAgICAgICAgIC5pdGVtKDApLnRleHRDb250ZW50O1xuICAgICAgICBwcm92aWRlckxpc3Quc2V0KHByb3ZpZGVySUQsIHByb3ZpZGVyTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBNYXAoXG4gICAgICBbLi4ucHJvdmlkZXJMaXN0LmVudHJpZXMoKV0uc29ydCgoYSwgYikgPT4gYVsxXS5sb2NhbGVDb21wYXJlKGJbMV0pKVxuICAgICk7XG4gIH1cblxuICB0ZXN0KCkge1xuICAgIGlmICh0aGlzLmRhdGEgIT09IG51bGwgJiYgdGhpcy5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZGF0YSk7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmdldEVsZW1lbnRCeUlkKFwiMVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwiTm8gZGF0YSBhdmFpbGFibGUuXCI7XG4gICAgfVxuICB9XG59XG4iLCIvL0RlZmluZSBDU1VzXG4vL0Vhc3Rlcm4gUmVnaW9uXG5jb25zdCBDU1UxID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTU1MFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAxIC0gQ2hlc2FwZWFrZVwiLFxuICBzbHVnOiBcIkNTVTFcIixcbn07XG5jb25zdCBDU1UyID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTgxMFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAyIC0gVmlyZ2luaWEgQmVhY2hcIixcbiAgc2x1ZzogXCJDU1UyXCIsXG59O1xuY29uc3QgQ1NVMkEgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMDAxXCIsIFwiNTExMzFcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMkEgLSBBY2NvbWFja1wiLFxuICBzbHVnOiBcIkNTVTJBXCIsXG59O1xuY29uc3QgQ1NVMyA9IHtcbiAgbG9jYWxpdGllczogW1wiNTE3NDBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMyAtIFBvcnRzbW91dGhcIixcbiAgc2x1ZzogXCJDU1UzXCIsXG59O1xuY29uc3QgQ1NVNCA9IHtcbiAgbG9jYWxpdGllczogW1wiNTE3MTBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgNCAtIE5vcmZvbGtcIixcbiAgc2x1ZzogXCJDU1U0XCIsXG59O1xuY29uc3QgQ1NVNSA9IHtcbiAgbG9jYWxpdGllczogW1wiNTE4MDBcIiwgXCI1MTYyMFwiLCBcIjUxMDkzXCIsIFwiNTExNzVcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgNSAtIFN1ZmZvbGtcIixcbiAgc2x1ZzogXCJDU1U1XCIsXG59O1xuY29uc3QgQ1NVNyA9IHtcbiAgbG9jYWxpdGllczogW1wiNTE3MDBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgNyAtIE5ld3BvcnQgTmV3c1wiLFxuICBzbHVnOiBcIkNTVTdcIixcbn07XG5jb25zdCBDU1U4ID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTY1MFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCA4IC0gSGFtcHRvblwiLFxuICBzbHVnOiBcIkNTVThcIixcbn07XG4vL1NvdXRoZXJuIFJlZ2lvblxuY29uc3QgQ1NVNiA9IHtcbiAgbG9jYWxpdGllczogW1wiNTE2NzBcIiwgXCI1MTE0OVwiLCBcIjUxMTgxXCIsIFwiNTExODNcIiwgXCI1MTU5NVwiLCBcIjUxMDI1XCIsIFwiNTEwODFcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgNiAtIEhvcGV3ZWxsXCIsXG4gIHNsdWc6IFwiQ1NVNlwiLFxufTtcbmNvbnN0IENTVTEwID0ge1xuICBsb2NhbGl0aWVzOiBbXG4gICAgXCI1MTAxMVwiLFxuICAgIFwiNTEwMjlcIixcbiAgICBcIjUxMDM3XCIsXG4gICAgXCI1MTA0OVwiLFxuICAgIFwiNTEwODNcIixcbiAgICBcIjUxMTExXCIsXG4gICAgXCI1MTExN1wiLFxuICAgIFwiNTExNDdcIixcbiAgXSxcbiAgbmFtZTogXCJEaXN0cmljdCAxMCAtIEhhbGlmYXhcIixcbiAgc2x1ZzogXCJDU1UxMFwiLFxufTtcbmNvbnN0IENTVTExID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTczMFwiLCBcIjUxMDA3XCIsIFwiNTEwNTNcIiwgXCI1MTEzNVwiLCBcIjUxMTQ1XCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDExIC0gUGV0ZXJzYnVyZ1wiLFxuICBzbHVnOiBcIkNTVTExXCIsXG59O1xuY29uc3QgQ1NVMTIgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMDQxXCIsIFwiNTE1NzBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMTIgLSBDaGVzdGVyZmllbGRcIixcbiAgc2x1ZzogXCJDU1UxMlwiLFxufTtcbmNvbnN0IENTVTEzID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTc2MFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAxMyAtIFJpY2htb25kXCIsXG4gIHNsdWc6IFwiQ1NVMTNcIixcbn07XG5jb25zdCBDU1UxNCA9IHtcbiAgbG9jYWxpdGllczogW1wiNTEwODdcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMTQgLSBIZW5yaWNvXCIsXG4gIHNsdWc6IFwiQ1NVMTRcIixcbn07XG5cbi8vTm9ydGhlcm4gUmVnaW9uXG52YXIgQ1NVMTcgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMDEzXCIsIFwiNTE2MTBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMTcgLSBBcmxpbmd0b25cIixcbiAgc2x1ZzogXCJDU1UxN1wiLFxufTtcbnZhciBDU1UxOCA9IHtcbiAgbG9jYWxpdGllczogW1wiNTE1MTBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMTggLSBBbGV4YW5kcmlhXCIsXG4gIHNsdWc6IFwiQ1NVMThcIixcbn07XG52YXIgQ1NVMTkgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMDU5XCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDE5IC0gRmFpcmZheFwiLFxuICBzbHVnOiBcIkNTVTE5XCIsXG59O1xuY29uc3QgQ1NVMjAgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMTA3XCIsIFwiNTEwNjFcIiwgXCI1MTE1N1wiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAyMCAtIExvdWRvdW5cIixcbiAgc2x1ZzogXCJDU1UyMFwiLFxufTtcbnZhciBDU1UyNiA9IHtcbiAgbG9jYWxpdGllczogW1xuICAgIFwiNTEwNDNcIixcbiAgICBcIjUxMDY5XCIsXG4gICAgXCI1MTEzOVwiLFxuICAgIFwiNTExNjVcIixcbiAgICBcIjUxMTcxXCIsXG4gICAgXCI1MTE4N1wiLFxuICAgIFwiNTE2NjBcIixcbiAgICBcIjUxODQwXCIsXG4gIF0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMjYgLSBXaW5jaGVzdGVyXCIsXG4gIHNsdWc6IFwiQ1NVMjZcIixcbn07XG52YXIgQ1NVMzEgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMTUzXCIsIFwiNTE2ODNcIiwgXCI1MTY4NVwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAzMSAtIE1hbmFzc2FzXCIsXG4gIHNsdWc6IFwiQ1NVMzFcIixcbn07XG5cbi8vV2VzdGVybiBSZWdpb25cbnZhciBDU1UyMSA9IHtcbiAgbG9jYWxpdGllczogW1wiNTEwODlcIiwgXCI1MTE0MVwiLCBcIjUxNjkwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDIxIC0gTWFydGluc3ZpbGxlXCIsXG4gIHNsdWc6IFwiQ1NVMjFcIixcbn07XG52YXIgQ1NVMjIgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMDY3XCIsIFwiNTExNDNcIiwgXCI1MTU5MFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAyMiAtIFJvY2t5IE1vdW50XCIsXG4gIHNsdWc6IFwiQ1NVMjJcIixcbn07XG5jb25zdCBDU1UyMyA9IHtcbiAgbG9jYWxpdGllczogW1wiNTExNjFcIiwgXCI1MTc3NVwiLCBcIjUxNzcwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDIzIC0gUm9hbm9rZVwiLFxuICBzbHVnOiBcIkNTVTIzXCIsXG59O1xudmFyIENTVTI3ID0ge1xuICBsb2NhbGl0aWVzOiBbXG4gICAgXCI1MTAyMVwiLFxuICAgIFwiNTEwMzVcIixcbiAgICBcIjUxMDYzXCIsXG4gICAgXCI1MTA3MVwiLFxuICAgIFwiNTEwNzdcIixcbiAgICBcIjUxMTIxXCIsXG4gICAgXCI1MTE1NVwiLFxuICAgIFwiNTExOTdcIixcbiAgICBcIjUxNjQwXCIsXG4gICAgXCI1MTc1MFwiLFxuICBdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDI3IC0gUHVsYXNraVwiLFxuICBzbHVnOiBcIkNTVTI3XCIsXG59O1xudmFyIENTVTI4ID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTE3M1wiLCBcIjUxMTkxXCIsIFwiNTE1MjBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMjggLSBBYmluZ2RvblwiLFxuICBzbHVnOiBcIkNTVTI4XCIsXG59O1xudmFyIENTVTI5ID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTAyN1wiLCBcIjUxMDUxXCIsIFwiNTExNjdcIiwgXCI1MTE4NVwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAyOSAtIFRhemV3ZWxsXCIsXG4gIHNsdWc6IFwiQ1NVMjlcIixcbn07XG52YXIgQ1NVMzAgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMTA1XCIsIFwiNTExNjlcIiwgXCI1MTE5NVwiLCBcIjUxNzIwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDMwIC0gR2F0ZSBDaXR5XCIsXG4gIHNsdWc6IFwiQ1NVMzBcIixcbn07XG4vL0NlbnRyYWwgUmVnaW9uXG52YXIgQ1NVOSA9IHtcbiAgbG9jYWxpdGllczogW1xuICAgIFwiNTEwMzZcIixcbiAgICBcIjUxMDczXCIsXG4gICAgXCI1MTA5NVwiLFxuICAgIFwiNTEwOTdcIixcbiAgICBcIjUxMTAxXCIsXG4gICAgXCI1MTExNVwiLFxuICAgIFwiNTExMTlcIixcbiAgICBcIjUxMTI3XCIsXG4gICAgXCI1MTE5OVwiLFxuICAgIFwiNTE3MzVcIixcbiAgICBcIjUxODMwXCIsXG4gIF0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgOSAtIFdpbGxpYW1zYnVyZ1wiLFxuICBzbHVnOiBcIkNTVTlcIixcbn07XG52YXIgQ1NVMTUgPSB7XG4gIGxvY2FsaXRpZXM6IFtcbiAgICBcIjUxMDMzXCIsXG4gICAgXCI1MTA1N1wiLFxuICAgIFwiNTEwODVcIixcbiAgICBcIjUxMDk5XCIsXG4gICAgXCI1MTEwM1wiLFxuICAgIFwiNTExMzNcIixcbiAgICBcIjUxMTU5XCIsXG4gICAgXCI1MTE3N1wiLFxuICAgIFwiNTExNzlcIixcbiAgICBcIjUxMTkzXCIsXG4gICAgXCI1MTYzMFwiLFxuICBdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDE1IC0gRnJlZGVyaWNrc2J1cmdcIixcbiAgc2x1ZzogXCJDU1UxNVwiLFxufTtcbnZhciBDU1UxNiA9IHtcbiAgbG9jYWxpdGllczogW1xuICAgIFwiNTEwMDNcIixcbiAgICBcIjUxMDQ3XCIsXG4gICAgXCI1MTA2NVwiLFxuICAgIFwiNTEwNzVcIixcbiAgICBcIjUxMDc5XCIsXG4gICAgXCI1MTEwOVwiLFxuICAgIFwiNTExMTNcIixcbiAgICBcIjUxMTM3XCIsXG4gICAgXCI1MTU0MFwiLFxuICBdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDE2IC0gQ2hhcmxvdHRlc3ZpbGxlXCIsXG4gIHNsdWc6IFwiQ1NVMTZcIixcbn07XG52YXIgQ1NVMjQgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMDA5XCIsIFwiNTEwMTlcIiwgXCI1MTAzMVwiLCBcIjUxMTI1XCIsIFwiNTE2ODBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMjQgLSBMeW5jaGJ1cmdcIixcbiAgc2x1ZzogXCJDU1UyNFwiLFxufTtcbnZhciBDU1UyNSA9IHtcbiAgbG9jYWxpdGllczogW1xuICAgIFwiNTEwMDVcIixcbiAgICBcIjUxMDE1XCIsXG4gICAgXCI1MTAxN1wiLFxuICAgIFwiNTEwMjNcIixcbiAgICBcIjUxMDQ1XCIsXG4gICAgXCI1MTA5MVwiLFxuICAgIFwiNTExNjNcIixcbiAgICBcIjUxNTMwXCIsXG4gICAgXCI1MTU4MFwiLFxuICAgIFwiNTE2NzhcIixcbiAgICBcIjUxNzkwXCIsXG4gICAgXCI1MTgyMFwiLFxuICBdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDI1IC0gU3RhdW50b25cIixcbiAgc2x1ZzogXCJDU1UyNVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IHNvcnRlZENTVXMgPSBbXG4gIENTVTEsXG4gIENTVTIsXG4gIENTVTJBLFxuICBDU1UzLFxuICBDU1U0LFxuICBDU1U1LFxuICBDU1U2LFxuICBDU1U3LFxuICBDU1U4LFxuICBDU1U5LFxuICBDU1UxMCxcbiAgQ1NVMTEsXG4gIENTVTEyLFxuICBDU1UxMyxcbiAgQ1NVMTQsXG4gIENTVTE1LFxuICBDU1UxNixcbiAgQ1NVMTcsXG4gIENTVTE4LFxuICBDU1UxOSxcbiAgQ1NVMjAsXG4gIENTVTIxLFxuICBDU1UyMixcbiAgQ1NVMjMsXG4gIENTVTI0LFxuICBDU1UyNSxcbiAgQ1NVMjYsXG4gIENTVTI3LFxuICBDU1UyOCxcbiAgQ1NVMjksXG4gIENTVTMwLFxuICBDU1UzMSxcbl07XG5cbmV4cG9ydCBjb25zdCBhbGxGaXBzID0gW1xuICBcIjUxNTEwXCIsXG4gIFwiNTE1MjBcIixcbiAgXCI1MTUzMFwiLFxuICBcIjUxNTQwXCIsXG4gIFwiNTE1NTBcIixcbiAgXCI1MTU3MFwiLFxuICBcIjUxNTgwXCIsXG4gIFwiNTE1OTBcIixcbiAgXCI1MTU5NVwiLFxuICBcIjUxNjAwXCIsXG4gIFwiNTE2MTBcIixcbiAgXCI1MTYyMFwiLFxuICBcIjUxNjMwXCIsXG4gIFwiNTE2NDBcIixcbiAgXCI1MTY1MFwiLFxuICBcIjUxNjYwXCIsXG4gIFwiNTE2NzBcIixcbiAgXCI1MTY3OFwiLFxuICBcIjUxNjgwXCIsXG4gIFwiNTE2ODNcIixcbiAgXCI1MTY4NVwiLFxuICBcIjUxNjkwXCIsXG4gIFwiNTE3MDBcIixcbiAgXCI1MTcxMFwiLFxuICBcIjUxNzIwXCIsXG4gIFwiNTE3MzBcIixcbiAgXCI1MTczNVwiLFxuICBcIjUxNzQwXCIsXG4gIFwiNTE3NTBcIixcbiAgXCI1MTc2MFwiLFxuICBcIjUxNzcwXCIsXG4gIFwiNTE3NzVcIixcbiAgXCI1MTc5MFwiLFxuICBcIjUxODAwXCIsXG4gIFwiNTE4MTBcIixcbiAgXCI1MTgyMFwiLFxuICBcIjUxODMwXCIsXG4gIFwiNTE4NDBcIixcbiAgXCI1MTAwMVwiLFxuICBcIjUxMDAzXCIsXG4gIFwiNTEwMDVcIixcbiAgXCI1MTAwN1wiLFxuICBcIjUxMDA5XCIsXG4gIFwiNTEwMTFcIixcbiAgXCI1MTAxM1wiLFxuICBcIjUxMDE1XCIsXG4gIFwiNTEwMTdcIixcbiAgXCI1MTAxOVwiLFxuICBcIjUxMDIxXCIsXG4gIFwiNTEwMjNcIixcbiAgXCI1MTAyNVwiLFxuICBcIjUxMDI3XCIsXG4gIFwiNTEwMjlcIixcbiAgXCI1MTAzMVwiLFxuICBcIjUxMDMzXCIsXG4gIFwiNTEwMzVcIixcbiAgXCI1MTAzNlwiLFxuICBcIjUxMDM3XCIsXG4gIFwiNTEwNDFcIixcbiAgXCI1MTA0M1wiLFxuICBcIjUxMDQ1XCIsXG4gIFwiNTEwNDdcIixcbiAgXCI1MTA0OVwiLFxuICBcIjUxMDUxXCIsXG4gIFwiNTEwNTNcIixcbiAgXCI1MTA1N1wiLFxuICBcIjUxMDU5XCIsXG4gIFwiNTEwNjFcIixcbiAgXCI1MTA2M1wiLFxuICBcIjUxMDY1XCIsXG4gIFwiNTEwNjdcIixcbiAgXCI1MTA2OVwiLFxuICBcIjUxMDcxXCIsXG4gIFwiNTEwNzNcIixcbiAgXCI1MTA3NVwiLFxuICBcIjUxMDc3XCIsXG4gIFwiNTEwNzlcIixcbiAgXCI1MTA4MVwiLFxuICBcIjUxMDgzXCIsXG4gIFwiNTEwODVcIixcbiAgXCI1MTA4N1wiLFxuICBcIjUxMDg5XCIsXG4gIFwiNTEwOTFcIixcbiAgXCI1MTA5M1wiLFxuICBcIjUxMDk1XCIsXG4gIFwiNTEwOTdcIixcbiAgXCI1MTA5OVwiLFxuICBcIjUxMTAxXCIsXG4gIFwiNTExMDNcIixcbiAgXCI1MTEwNVwiLFxuICBcIjUxMTA3XCIsXG4gIFwiNTExMDlcIixcbiAgXCI1MTExMVwiLFxuICBcIjUxMTEzXCIsXG4gIFwiNTExMTVcIixcbiAgXCI1MTExN1wiLFxuICBcIjUxMTE5XCIsXG4gIFwiNTExMjFcIixcbiAgXCI1MTEyNVwiLFxuICBcIjUxMTI3XCIsXG4gIFwiNTExMzFcIixcbiAgXCI1MTEzM1wiLFxuICBcIjUxMTM1XCIsXG4gIFwiNTExMzdcIixcbiAgXCI1MTEzOVwiLFxuICBcIjUxMTQxXCIsXG4gIFwiNTExNDNcIixcbiAgXCI1MTE0NVwiLFxuICBcIjUxMTQ3XCIsXG4gIFwiNTExNDlcIixcbiAgXCI1MTE1M1wiLFxuICBcIjUxMTU1XCIsXG4gIFwiNTExNTdcIixcbiAgXCI1MTE1OVwiLFxuICBcIjUxMTYxXCIsXG4gIFwiNTExNjNcIixcbiAgXCI1MTE2NVwiLFxuICBcIjUxMTY3XCIsXG4gIFwiNTExNjlcIixcbiAgXCI1MTE3MVwiLFxuICBcIjUxMTczXCIsXG4gIFwiNTExNzVcIixcbiAgXCI1MTE3N1wiLFxuICBcIjUxMTc5XCIsXG4gIFwiNTExODFcIixcbiAgXCI1MTE4M1wiLFxuICBcIjUxMTg1XCIsXG4gIFwiNTExODdcIixcbiAgXCI1MTE5MVwiLFxuICBcIjUxMTkzXCIsXG4gIFwiNTExOTVcIixcbiAgXCI1MTE5N1wiLFxuICBcIjUxMTk5XCIsXG5dO1xuXG4vLyBSZWdpb25zXG5jb25zdCBOb3J0aGVyblJlZ2lvbiA9IHtcbiAgQ1NVczogW0NTVTE2LCBDU1UxNywgQ1NVMTgsIENTVTE5LCBDU1UyMCwgQ1NVMjYsIENTVTMxXSxcbiAgbmFtZTogXCJOb3J0aGVybiBSZWdpb25cIixcbiAgc2x1ZzogXCJub3J0aFwiLFxufTtcblxuY29uc3QgU291dGhlcm5SZWdpb24gPSB7XG4gIENTVXM6IFtDU1U1LCBDU1U2LCBDU1UxMSwgQ1NVMTIsIENTVTEzXSxcbiAgbmFtZTogXCJTb3V0aGVybiBSZWdpb25cIixcbiAgc2x1ZzogXCJzb3V0aFwiLFxufTtcblxuY29uc3QgRWFzdGVyblJlZ2lvbiA9IHtcbiAgQ1NVczogW0NTVTEsIENTVTIsIENTVTJBLCBDU1UzLCBDU1U0XSxcbiAgbmFtZTogXCJFYXN0ZXJuIFJlZ2lvblwiLFxuICBzbHVnOiBcImVhc3RcIixcbn07XG5cbmNvbnN0IFdlc3Rlcm5SZWdpb24gPSB7XG4gIENTVXM6IFtDU1UyMSwgQ1NVMjcsIENTVTI4LCBDU1UyOSwgQ1NVMzBdLFxuICBuYW1lOiBcIldlc3Rlcm4gUmVnaW9uXCIsXG4gIHNsdWc6IFwid2VzdFwiLFxufTtcblxuY29uc3QgQ2VudHJhbFJlZ2lvbiA9IHtcbiAgQ1NVczogW0NTVTcsIENTVTgsIENTVTksIENTVTE0LCBDU1UxNV0sXG4gIG5hbWU6IFwiQ2VudHJhbCBSZWdpb25cIixcbiAgc2x1ZzogXCJjZW50cmFsXCIsXG59O1xuXG5jb25zdCBNaWRXZXN0UmVnaW9uID0ge1xuICBDU1VzOiBbQ1NVMTAsIENTVTIyLCBDU1UyMywgQ1NVMjQsIENTVTI1XSxcbiAgbmFtZTogXCJNaWR3ZXN0IFJlZ2lvblwiLFxuICBzbHVnOiBcIm1pZHdlc3RcIixcbn07XG5cbmV4cG9ydCBjb25zdCBDU1VTdHJ1Y3R1cmUgPSBbXG4gIEVhc3Rlcm5SZWdpb24sXG4gIFNvdXRoZXJuUmVnaW9uLFxuICBDZW50cmFsUmVnaW9uLFxuICBOb3J0aGVyblJlZ2lvbixcbiAgV2VzdGVyblJlZ2lvbixcbiAgTWlkV2VzdFJlZ2lvbixcbl07XG5cbmV4cG9ydCBjb25zdCByZWdpb25DU1VzID0ge1xuICBOb3J0aGVyblJlZ2lvbixcbiAgU291dGhlcm5SZWdpb24sXG4gIEVhc3Rlcm5SZWdpb24sXG4gIFdlc3Rlcm5SZWdpb24sXG4gIENlbnRyYWxSZWdpb24sXG4gIE1pZFdlc3RSZWdpb24sXG59O1xuXG5leHBvcnQgY29uc3QgaXNMb2NhbGl0eUluUmVnaW9uID0gKHJlZ2lvbiwgbG9jYWxpdHkpID0+IHtcbiAgbGV0IGZvdW5kID0gZmFsc2U7XG4gIHJlZ2lvbi5DU1VzLmZvckVhY2goKGNzdSkgPT4ge1xuICAgIGlmIChjc3UubG9jYWxpdGllcy5pbmNsdWRlcyhsb2NhbGl0eSkpIHtcbiAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZm91bmQ7XG59O1xuXG5leHBvcnQgY29uc3QgaXNMb2NhbGl0eUluUmVnaW9uSUQgPSAocmVnaW9uSUQsIGxvY2FsaXR5KSA9PiB7XG4gIGNvbnN0IHJlZ2lvbiA9IENTVVN0cnVjdHVyZS5maW5kKChyZWdpb24pID0+IHJlZ2lvbi5zbHVnID09PSByZWdpb25JRCk7XG4gIHJldHVybiBpc0xvY2FsaXR5SW5SZWdpb24ocmVnaW9uLCBsb2NhbGl0eSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNMb2NhbGl0eUluQ1NVSUQgPSAoY3N1SUQsIGxvY2FsaXR5KSA9PiB7XG4gIGNvbnN0IGNzdSA9IHNvcnRlZENTVXMuZmluZCgoY3N1KSA9PiBjc3Uuc2x1ZyA9PT0gY3N1SUQpO1xuICByZXR1cm4gY3N1LmxvY2FsaXRpZXMuaW5jbHVkZXMobG9jYWxpdHkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNzdUxpc3RGcm9tRklQUyA9IChmaXBzTGlzdCkgPT4ge1xuICBjb25zdCBjc3VOYW1lcyA9IG5ldyBTZXQoKTtcbiAgc29ydGVkQ1NVcy5mb3JFYWNoKChjc3UpID0+IHtcbiAgICBpZiAoY3N1LmxvY2FsaXRpZXMuc29tZSgobG9jYWxpdHkpID0+IGZpcHNMaXN0LmluY2x1ZGVzKGxvY2FsaXR5KSkpIHtcbiAgICAgIGNzdU5hbWVzLmFkZChjc3UubmFtZSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIFsuLi5jc3VOYW1lc107XG59O1xuIiwiaW1wb3J0IHsgQVBJIH0gZnJvbSBcIi4uLy4uL2FwaS9hcGkuanNcIjtcbmltcG9ydCB7IENTVVN0cnVjdHVyZSB9IGZyb20gXCIuLi8uLi9saWIvY3N1LmpzXCI7XG5cbmNvbnN0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbmNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocXVlcnlTdHJpbmcpO1xuZXhwb3J0IGNvbnN0IHNlYXJjaFZhbHVlcyA9IHVybFBhcmFtcy52YWx1ZXMoKTtcbmNvbnN0IFtzZXJ2aWNlTmFtZSwgbG9jYXRpb25JRCwgbGFuZ3VhZ2VOYW1lXSA9IHNlYXJjaFZhbHVlcztcbmV4cG9ydCBjb25zdCBsYW5ndWFnZVRleHQgPSBsYW5ndWFnZU5hbWU7XG5cbmV4cG9ydCBsZXQgc2VydmljZVRleHQgPSBcIlwiO1xuaWYgKHNlcnZpY2VOYW1lID09IFwiYW55XCIpIHtcbiAgc2VydmljZVRleHQgPSBcIkFueSBTZXJ2aWNlXCI7XG59IGVsc2Uge1xuICBzZXJ2aWNlVGV4dCA9IHNlcnZpY2VOYW1lO1xufVxuXG5leHBvcnQgbGV0IGxvY2F0aW9uVGV4dCA9IFwiXCI7XG5leHBvcnQgbGV0IGxvY2F0aW9uVHlwZSA9IFwiXCI7XG5sZXQgdGhpc0NTVSA9IHtcbiAgbmFtZTogXCJcIixcbiAgc2x1ZzogXCJcIixcbn07XG5pZiAobG9jYXRpb25JRC5pbmNsdWRlcyhcIkNTVVwiKSkge1xuICAvL2dldCB0aGUgQ1NVXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgQ1NVU3RydWN0dXJlLmxlbmd0aDsgaSsrKSB7XG4gICAgLy9jeWNsZSB0aHJvdWdoIHRoZSBDU1VzIGluIGVhY2ggcmVnaW9uXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBDU1VTdHJ1Y3R1cmVbaV0uQ1NVcy5sZW5ndGg7IGorKykge1xuICAgICAgaWYgKENTVVN0cnVjdHVyZVtpXS5DU1VzW2pdLnNsdWcgPT0gbG9jYXRpb25JRCkge1xuICAgICAgICB0aGlzQ1NVID0gQ1NVU3RydWN0dXJlW2ldLkNTVXNbal07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGxvY2F0aW9uVGV4dCA9IHRoaXNDU1UubmFtZTtcbiAgbG9jYXRpb25UeXBlID0gXCJDU1VcIjtcbn0gZWxzZSBpZiAobG9jYXRpb25JRC5pbmNsdWRlcyhcIjUxXCIpKSB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgbG9jYXRpb25UZXh0ID0gc2ltcGxlbWFwc19zdGF0ZW1hcF9tYXBkYXRhLnN0YXRlX3NwZWNpZmljW2xvY2F0aW9uSURdLm5hbWU7XG4gIGxvY2F0aW9uVHlwZSA9IFwiTG9jYWxpdHlcIjtcbn0gZWxzZSBpZiAobG9jYXRpb25JRCA9PSBcImFueVwiKSB7XG4gIGxvY2F0aW9uVGV4dCA9IFwiQW55IExvY2F0aW9uXCI7XG4gIGxvY2F0aW9uVHlwZSA9IFwiYW55XCI7XG59IGVsc2Uge1xuICBzd2l0Y2ggKGxvY2F0aW9uSUQpIHtcbiAgICBjYXNlIFwibm9ydGhcIjpcbiAgICAgIGxvY2F0aW9uVGV4dCA9IFwiTm9ydGhlcm4gUmVnaW9uXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic291dGhcIjpcbiAgICAgIGxvY2F0aW9uVGV4dCA9IFwiU291dGhlcm4gUmVnaW9uXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZWFzdFwiOlxuICAgICAgbG9jYXRpb25UZXh0ID0gXCJFYXN0ZXJuIFJlZ2lvblwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImNlbnRyYWxcIjpcbiAgICAgIGxvY2F0aW9uVGV4dCA9IFwiQ2VudHJhbCBSZWdpb25cIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJ3ZXN0XCI6XG4gICAgICBsb2NhdGlvblRleHQgPSBcIldlc3Rlcm4gUmVnaW9uXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwibWlkd2VzdFwiOlxuICAgICAgbG9jYXRpb25UZXh0ID0gXCJNaWR3ZXN0ZXJuIFJlZ2lvblwiO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgbG9jYXRpb25UeXBlID0gXCJSZWdpb25cIjtcbn1cblxuZXhwb3J0IGNvbnN0IHByb3ZpZGVyU2VhcmNoUmVzdWx0cyA9IEFQSS5zZWFyY2hQcm92aWRlcnMoe1xuICBzZXJ2aWNlTmFtZSxcbiAgbG9jYXRpb25UeXBlLFxuICBsb2NhdGlvbklELFxuICBsYW5ndWFnZU5hbWUsXG59KTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQVBJIH0gZnJvbSBcIi4uLy4uL2FwaS9hcGkuanNcIjtcbmltcG9ydCB7IGFsbEZpcHMsIHJlZ2lvbkNTVXMsIHNvcnRlZENTVXMgfSBmcm9tIFwiLi4vLi4vbGliL2NzdS5qc1wiO1xuaW1wb3J0IHtcbiAgbG9jYXRpb25UZXh0LFxuICBzZXJ2aWNlVGV4dCxcbiAgbGFuZ3VhZ2VUZXh0LFxuICBwcm92aWRlclNlYXJjaFJlc3VsdHMsXG59IGZyb20gXCIuL2FwaS5qc1wiO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlcnZpY2VUZXh0U3BhblwiKS5pbm5lclRleHQgPSBzZXJ2aWNlVGV4dDtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYXRpb25UZXh0U3BhblwiKS5pbm5lclRleHQgPSBsb2NhdGlvblRleHQ7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmd1YWdlVGV4dFNwYW5cIikuaW5uZXJUZXh0ID0gbGFuZ3VhZ2VUZXh0O1xuXG4vL2N5Y2xlIHRocm91Z2ggYWxsIGxvY2F0aW9uIGl0ZW1zXG5cbmlmIChwcm92aWRlclNlYXJjaFJlc3VsdHMuc2l6ZSA9PSAwKSB7XG4gIGNvbnN0IG5vUmVzdWx0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm9SZXN1bHRzXCIpO1xuICBub1Jlc3VsdHMuaGlkZGVuID0gZmFsc2U7XG59XG5jb25zdCBzZWFyY2hSZXN1bHRzVUwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFJlc3VsdHNcIik7XG5wcm92aWRlclNlYXJjaFJlc3VsdHMuZm9yRWFjaCgocHJvdmlkZXIsIGtleSkgPT4ge1xuICBjb25zdCBwcm92aWRlckxJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBwcm92aWRlckxJLmlubmVySFRNTCA9IGA8YSBocmVmPVwiLi4vcHJvdmlkZXIvaW5kZXguaHRtbD9pZD0ke2tleX1cIj4ke3Byb3ZpZGVyfTwvYT5gO1xuICBzZWFyY2hSZXN1bHRzVUwuYXBwZW5kQ2hpbGQocHJvdmlkZXJMSSk7XG59KTtcblxuY29uc3QgYXZhaWxhYmxlU2VydmljZXMgPSBBUEkuZ2V0QWxsU2VydmljZU5hbWVzKCk7XG5jb25zdCBzZXJ2aWNlU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXCJTZXJ2aWNlXCIpWzBdO1xuYXZhaWxhYmxlU2VydmljZXMuZm9yRWFjaCgoc2VydmljZSkgPT4ge1xuICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICBvcHRpb24udmFsdWUgPSBzZXJ2aWNlO1xuICBvcHRpb24udGV4dCA9IHNlcnZpY2U7XG4gIHNlcnZpY2VTZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbn0pO1xuXG5jb25zdCB3aGVyZVNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKFwiV2hlcmVcIilbMF07XG4vL0N5Y2xlIHRocm91Z2ggQ1NVc1xuZm9yIChsZXQgaSA9IDA7IGkgPCBzb3J0ZWRDU1VzLmxlbmd0aDsgaSsrKSB7XG4gIC8vIGNyZWF0ZSBhbiBvcHRpb24gZm9yIGVhY2ggQ1NVXG4gIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gIG9wdGlvbi52YWx1ZSA9IHNvcnRlZENTVXNbaV0uc2x1ZztcbiAgb3B0aW9uLnRleHQgPSBzb3J0ZWRDU1VzW2ldLm5hbWU7XG4gIHdoZXJlU2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG59XG5jb25zdCByZWdpb25CcmVha09wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG5yZWdpb25CcmVha09wdGlvbi52YWx1ZSA9IFwiMFwiO1xucmVnaW9uQnJlYWtPcHRpb24udGV4dCA9IFwiLS0tLS1SRUdJT05TLS0tLS1cIjtcbndoZXJlU2VsZWN0LmFwcGVuZENoaWxkKHJlZ2lvbkJyZWFrT3B0aW9uKTtcbi8vQ3ljbGUgdGhyb3VnaCBSZWdpb25zXG5mb3IgKGxldCByZWdpb24gaW4gcmVnaW9uQ1NVcykge1xuICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICBvcHRpb24udmFsdWUgPSByZWdpb25DU1VzW3JlZ2lvbl0uc2x1ZztcbiAgb3B0aW9uLnRleHQgPSByZWdpb25DU1VzW3JlZ2lvbl0ubmFtZTtcbiAgd2hlcmVTZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbn1cbmNvbnN0IGxvY2FsaXR5QnJlYWtPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xubG9jYWxpdHlCcmVha09wdGlvbi52YWx1ZSA9IFwiMFwiO1xubG9jYWxpdHlCcmVha09wdGlvbi50ZXh0ID0gXCItLS0tLUxPQ0FMSVRJRVMtLS0tLVwiO1xud2hlcmVTZWxlY3QuYXBwZW5kQ2hpbGQobG9jYWxpdHlCcmVha09wdGlvbik7XG5mb3IgKGxldCBpID0gMDsgaSA8IGFsbEZpcHMubGVuZ3RoOyBpKyspIHtcbiAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgb3B0aW9uLnZhbHVlID0gYWxsRmlwc1tpXTtcbiAgLy8gQHRzLWlnbm9yZVxuICBvcHRpb24udGV4dCA9IHNpbXBsZW1hcHNfc3RhdGVtYXBfbWFwZGF0YS5zdGF0ZV9zcGVjaWZpY1thbGxGaXBzW2ldXS5uYW1lO1xuICB3aGVyZVNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xufVxuXG5jb25zdCBhdmFpbGFibGVMYW5ndWFnZXMgPSBBUEkuZ2V0QWxsTGFuZ3VhZ2VzKCk7XG5mb3IgKGxldCBpID0gMDsgaSA8IGF2YWlsYWJsZUxhbmd1YWdlcy5sZW5ndGg7IGkrKykge1xuICBpZiAoYXZhaWxhYmxlTGFuZ3VhZ2VzW2ldICE9IFwiXCIpIHtcbiAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdGlvbi52YWx1ZSA9IGF2YWlsYWJsZUxhbmd1YWdlc1tpXTtcbiAgICBvcHRpb24udGV4dCA9IGF2YWlsYWJsZUxhbmd1YWdlc1tpXTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcIkxhbmd1YWdlXCIpWzBdLmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==