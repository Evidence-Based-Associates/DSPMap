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

/***/ "./src/lib/colors.js":
/*!***************************!*\
  !*** ./src/lib/colors.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const colors = {
  NorthernColor: "#406162",
  CentralColor: "#89A16E",
  WesternColor: "#4E5067",
  SouthernColor: "#BCDAE7",
  EasternColor: "#CE844E",
  MidWesternColor: "#5E859F",
  EBABlue: "#D9E5F3",
  RegColor: "#008000",
  TravelColor: "#90EE90",
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (colors);


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

/***/ "./src/lib/simplemaps/utils.js":
/*!*************************************!*\
  !*** ./src/lib/simplemaps/utils.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addLanguageDescriptions: () => (/* binding */ addLanguageDescriptions),
/* harmony export */   colorFIPS: () => (/* binding */ colorFIPS),
/* harmony export */   setAllDefaultColor: () => (/* binding */ setAllDefaultColor),
/* harmony export */   setMapCSURegions: () => (/* binding */ setMapCSURegions),
/* harmony export */   setMapLocations: () => (/* binding */ setMapLocations),
/* harmony export */   setRegionByCSU: () => (/* binding */ setRegionByCSU),
/* harmony export */   zoomToFIPS: () => (/* binding */ zoomToFIPS),
/* harmony export */   zoomToRegion: () => (/* binding */ zoomToRegion)
/* harmony export */ });
/* harmony import */ var _api_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api/api.js */ "./src/api/api.js");
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../colors.js */ "./src/lib/colors.js");
/* harmony import */ var _csu_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../csu.js */ "./src/lib/csu.js");




const localitiesFromRegion = (region) => {
  let localities = [];
  region.CSUs.forEach((csu) => {
    localities = localities.concat(csu.localities);
  });
  return localities;
};

const regions = {
  0: {
    states: localitiesFromRegion(_csu_js__WEBPACK_IMPORTED_MODULE_2__.regionCSUs.NorthernRegion),
    name: "Northern Region",
    color: _colors_js__WEBPACK_IMPORTED_MODULE_1__["default"].NorthernColor,
  },
  1: {
    states: localitiesFromRegion(_csu_js__WEBPACK_IMPORTED_MODULE_2__.regionCSUs.CentralRegion),
    name: "Central Region",
    color: _colors_js__WEBPACK_IMPORTED_MODULE_1__["default"].CentralColor,
  },
  2: {
    states: localitiesFromRegion(_csu_js__WEBPACK_IMPORTED_MODULE_2__.regionCSUs.WesternRegion),
    name: "Western Region",
    color: _colors_js__WEBPACK_IMPORTED_MODULE_1__["default"].WesternColor,
  },
  3: {
    states: localitiesFromRegion(_csu_js__WEBPACK_IMPORTED_MODULE_2__.regionCSUs.SouthernRegion),
    name: "Southern Region",
    color: _colors_js__WEBPACK_IMPORTED_MODULE_1__["default"].SouthernColor,
  },
  4: {
    states: localitiesFromRegion(_csu_js__WEBPACK_IMPORTED_MODULE_2__.regionCSUs.EasternRegion),
    name: "Eastern Region",
    color: _colors_js__WEBPACK_IMPORTED_MODULE_1__["default"].EasternColor,
  },
  5: {
    states: localitiesFromRegion(_csu_js__WEBPACK_IMPORTED_MODULE_2__.regionCSUs.MidWestRegion),
    name: "Midwest Region",
    color: _colors_js__WEBPACK_IMPORTED_MODULE_1__["default"].MidWesternColor,
  },
};

const regionColor = (locality) => {
  if ((0,_csu_js__WEBPACK_IMPORTED_MODULE_2__.isLocalityInRegion)(_csu_js__WEBPACK_IMPORTED_MODULE_2__.regionCSUs.NorthernRegion, locality)) {
    return _colors_js__WEBPACK_IMPORTED_MODULE_1__["default"].NorthernColor;
  } else if ((0,_csu_js__WEBPACK_IMPORTED_MODULE_2__.isLocalityInRegion)(_csu_js__WEBPACK_IMPORTED_MODULE_2__.regionCSUs.CentralRegion, locality)) {
    return _colors_js__WEBPACK_IMPORTED_MODULE_1__["default"].CentralColor;
  } else if ((0,_csu_js__WEBPACK_IMPORTED_MODULE_2__.isLocalityInRegion)(_csu_js__WEBPACK_IMPORTED_MODULE_2__.regionCSUs.WesternRegion, locality)) {
    return _colors_js__WEBPACK_IMPORTED_MODULE_1__["default"].WesternColor;
  } else if ((0,_csu_js__WEBPACK_IMPORTED_MODULE_2__.isLocalityInRegion)(_csu_js__WEBPACK_IMPORTED_MODULE_2__.regionCSUs.SouthernRegion, locality)) {
    return _colors_js__WEBPACK_IMPORTED_MODULE_1__["default"].SouthernColor;
  } else if ((0,_csu_js__WEBPACK_IMPORTED_MODULE_2__.isLocalityInRegion)(_csu_js__WEBPACK_IMPORTED_MODULE_2__.regionCSUs.EasternRegion, locality)) {
    return _colors_js__WEBPACK_IMPORTED_MODULE_1__["default"].EasternColor;
  } else if ((0,_csu_js__WEBPACK_IMPORTED_MODULE_2__.isLocalityInRegion)(_csu_js__WEBPACK_IMPORTED_MODULE_2__.regionCSUs.MidWestRegion, locality)) {
    return _colors_js__WEBPACK_IMPORTED_MODULE_1__["default"].MidWesternColor;
  } else {
    return "#000000";
  }
};

const localityPagePath = () => {
  const path = window.location.pathname;
  if (window.location.pathname.includes("pages")) {
    return "../locality/index.html";
  } else {
    return "./pages/locality/index.html";
  }
};

const setMapCSURegions = () => {
  // @ts-ignore (global variable)
  simplemaps_statemap_mapdata.regions = regions;

  // @ts-ignore (global variable)
  const localities = simplemaps_statemap_mapdata.state_specific;
  for (let locality in localities) {
    localities[locality].color = regionColor(locality);
    const path = localityPagePath();
    localities[locality].url = `${path}?id=${locality}`;
  }
};

const setMapLocations = (providerID) => {
  const locations = _api_api_js__WEBPACK_IMPORTED_MODULE_0__.API.getAllLocations(providerID);

  var officeURL = "pages/provider/index.html?id=";
  locations.forEach((location, index) => {
    // @ts-ignore (global variable)
    simplemaps_statemap_mapdata.locations[index] = {
      lat: location.lat,
      lng: location.lng,
      name: location.providerName,
      color: _colors_js__WEBPACK_IMPORTED_MODULE_1__["default"].EBABlue,
      description:
        location.street +
        "<br>" +
        location.city +
        ", " +
        location.state +
        " " +
        location.zip +
        "<br>" +
        location.phone,
      url: officeURL + location.providerId,
      size: "default",
      type: "default",
      image_url: "default",
      opacity: "default",
    };
  });
};

const setRegionByCSU = (csu) => {
  // @ts-ignore (global variable)
  simplemaps_statemap_mapdata.regions = {};
  // iterate over all CSUs and set them as regions
  _csu_js__WEBPACK_IMPORTED_MODULE_2__.sortedCSUs.forEach((csu) => {
    // @ts-ignore (global variable)
    simplemaps_statemap_mapdata.regions[csu.slug] = {
      states: csu.localities,
      name: csu.name,
      url: "index.html?id=" + csu.slug,
    };
  });

  // @ts-ignore (global variable)
  simplemaps_statemap_mapdata.main_settings.initial_zoom = csu.slug;
};

const setAllDefaultColor = () => {
  // @ts-ignore (global variable)
  const localities = simplemaps_statemap_mapdata.state_specific;
  for (let locality in localities) {
    localities[locality].color = "default";
  }
  //same for regions
  // @ts-ignore (global variable)
  const regions = simplemaps_statemap_mapdata.regions;
  for (let region in regions) {
    regions[region].color = "default";
  }
};

// work around for the zoom function
// simplemaps methods not available pre-load
const zoomToFIPS = (fipsID) => {
  // @ts-ignore
  simplemaps_statemap_mapdata.regions = {};
  //add current locality to the one region
  // @ts-ignore
  simplemaps_statemap_mapdata.regions["0"] = {
    states: [fipsID],
    name: "Focus",
  };
  // @ts-ignore
  simplemaps_statemap_mapdata.main_settings.initial_zoom = 0;
};

const zoomToRegion = (regionID) => {
  // @ts-ignore
  simplemaps_statemap_mapdata.main_settings.initial_zoom = regionID;
};

const colorFIPS = (fipsList, color) => {
  if (!fipsList) {
    return;
  }
  // @ts-ignore
  const localities = simplemaps_statemap_mapdata.state_specific;
  fipsList.forEach((fips) => {
    localities[fips].color = color;
    localities[fips].hover_color = color;
  });
};

const languagesArrayExample = [
  { Spanish: ["51092", "51093", "51094", "51095", "51096"] },
  { French: ["51092", "51097", "51098", "51099", "51100", "51101"] },
];

const addLanguageDescriptions = (languagesArray) => {
  const fipsMap = new Map();
  languagesArray.forEach((langObj) => {
    Object.keys(langObj).forEach((lang) => {
      langObj[lang].forEach((fips) => {
        if (fipsMap.has(fips)) {
          fipsMap.get(fips).add(lang);
        } else {
          fipsMap.set(fips, new Set([lang]));
        }
      });
    });
  });
  fipsMap.forEach((languages, fips) => {
    // @ts-ignore
    simplemaps_statemap_mapdata.state_specific[fips].description =
      "Available in " + [...languages].join(", ");
  });
};


/***/ }),

/***/ "./src/pages/csu/api.js":
/*!******************************!*\
  !*** ./src/pages/csu/api.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSUProviders: () => (/* binding */ CSUProviders),
/* harmony export */   CSUServices: () => (/* binding */ CSUServices),
/* harmony export */   providerServiceList: () => (/* binding */ providerServiceList),
/* harmony export */   serviceProvidersList: () => (/* binding */ serviceProvidersList),
/* harmony export */   thisCSU: () => (/* binding */ thisCSU)
/* harmony export */ });
/* harmony import */ var _lib_csu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/csu.js */ "./src/lib/csu.js");
/* harmony import */ var _api_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api/api.js */ "./src/api/api.js");



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const csuID = urlParams.get("id");

const thisCSU = _lib_csu_js__WEBPACK_IMPORTED_MODULE_0__.sortedCSUs.find((csu) => csu.slug === csuID);
const CSUProviders = _api_api_js__WEBPACK_IMPORTED_MODULE_1__.API.getAllProvidersByCSU(thisCSU);
const CSUServices = _api_api_js__WEBPACK_IMPORTED_MODULE_1__.API.getAllServiceNamesByCSU(thisCSU);
const providerServiceList = (proivderId, csu) =>
  _api_api_js__WEBPACK_IMPORTED_MODULE_1__.API.getAllServicesByProviderInCSU(proivderId, csu);
const serviceProvidersList = (serviceName, csu) =>
  _api_api_js__WEBPACK_IMPORTED_MODULE_1__.API.getAllProvidersOfServiceInCSU(serviceName, csu);


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
/*!********************************!*\
  !*** ./src/pages/csu/index.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./src/pages/csu/api.js");
/* harmony import */ var _lib_simplemaps_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/simplemaps/utils.js */ "./src/lib/simplemaps/utils.js");



(0,_lib_simplemaps_utils_js__WEBPACK_IMPORTED_MODULE_1__.setRegionByCSU)(_api_js__WEBPACK_IMPORTED_MODULE_0__.thisCSU);

const csuNameSpan = document.getElementById("csuName");
csuNameSpan.innerHTML = _api_js__WEBPACK_IMPORTED_MODULE_0__.thisCSU.name;

const providerList = document.getElementById("providerList");
_api_js__WEBPACK_IMPORTED_MODULE_0__.CSUProviders.forEach((provider, key) => {
  const providerLI = document.createElement("li");
  providerLI.classList.add("ebaBlue");
  providerLI.innerHTML = `<a href='../provider/index.html?id=${key}'>${provider}</a>`;
  providerList.appendChild(providerLI);
  const providerServices = (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.providerServiceList)(key, _api_js__WEBPACK_IMPORTED_MODULE_0__.thisCSU);

  const providerServicesList = document.createElement("ul");
  providerServices.forEach((service) => {
    const serviceLI = document.createElement("li");
    serviceLI.innerText = service;
    providerServicesList.appendChild(serviceLI);
  });
  providerList.appendChild(providerServicesList);
});

const serviceList = document.getElementById("serviceList");
_api_js__WEBPACK_IMPORTED_MODULE_0__.CSUServices.forEach((service) => {
  const serviceLI = document.createElement("li");
  serviceLI.classList.add("ebaBlue");
  serviceLI.innerText = service;
  serviceList.appendChild(serviceLI);
  const serviceProviders = (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.serviceProvidersList)(service, _api_js__WEBPACK_IMPORTED_MODULE_0__.thisCSU);

  const serviceProvidersUL = document.createElement("ul");
  serviceProviders.forEach((provider, key) => {
    const providerLI = document.createElement("li");
    providerLI.innerHTML = `<a href='../provider/index.html?id=${key}'>${provider}</a>`;
    serviceProvidersUL.appendChild(providerLI);
  });
  serviceList.appendChild(serviceProvidersUL);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMvY3N1L2J1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BtQztBQUNVO0FBQ1M7O0FBRS9DO0FBQ1AsRUFBRSw4Q0FBTSxTQUFTLG1EQUFXLFdBQVcsNENBQU8sU0FBUyxzREFBWTs7Ozs7Ozs7Ozs7Ozs7O0FDTDVEO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IscURBQXFEO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDakd3RTs7QUFFakU7QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHdCQUF3QjtBQUM5QztBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isd0JBQXdCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHNCQUFzQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG9DQUFvQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDZCQUE2QjtBQUNqRDtBQUNBO0FBQ0Esc0JBQXNCLHdCQUF3QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNkJBQTZCO0FBQ2pEO0FBQ0E7QUFDQSxzQkFBc0Isd0JBQXdCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDZCQUE2QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLHdCQUF3QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixxQkFBcUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiw2QkFBNkI7QUFDdkQ7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQSxzQkFBc0IseUJBQXlCO0FBQy9DOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHdCQUF3QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQjtBQUNBLG9CQUFvQixxREFBcUQ7QUFDekU7QUFDQTs7QUFFQSxvQkFBb0Isb0JBQW9CO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsOERBQWlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFvQjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RpQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxNQUFNLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNadEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25mdUM7QUFDTDtBQUNxQzs7QUFFdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDLCtDQUFVO0FBQzNDO0FBQ0EsV0FBVyxrREFBTTtBQUNqQixHQUFHO0FBQ0g7QUFDQSxpQ0FBaUMsK0NBQVU7QUFDM0M7QUFDQSxXQUFXLGtEQUFNO0FBQ2pCLEdBQUc7QUFDSDtBQUNBLGlDQUFpQywrQ0FBVTtBQUMzQztBQUNBLFdBQVcsa0RBQU07QUFDakIsR0FBRztBQUNIO0FBQ0EsaUNBQWlDLCtDQUFVO0FBQzNDO0FBQ0EsV0FBVyxrREFBTTtBQUNqQixHQUFHO0FBQ0g7QUFDQSxpQ0FBaUMsK0NBQVU7QUFDM0M7QUFDQSxXQUFXLGtEQUFNO0FBQ2pCLEdBQUc7QUFDSDtBQUNBLGlDQUFpQywrQ0FBVTtBQUMzQztBQUNBLFdBQVcsa0RBQU07QUFDakIsR0FBRztBQUNIOztBQUVBO0FBQ0EsTUFBTSwyREFBa0IsQ0FBQywrQ0FBVTtBQUNuQyxXQUFXLGtEQUFNO0FBQ2pCLElBQUksU0FBUywyREFBa0IsQ0FBQywrQ0FBVTtBQUMxQyxXQUFXLGtEQUFNO0FBQ2pCLElBQUksU0FBUywyREFBa0IsQ0FBQywrQ0FBVTtBQUMxQyxXQUFXLGtEQUFNO0FBQ2pCLElBQUksU0FBUywyREFBa0IsQ0FBQywrQ0FBVTtBQUMxQyxXQUFXLGtEQUFNO0FBQ2pCLElBQUksU0FBUywyREFBa0IsQ0FBQywrQ0FBVTtBQUMxQyxXQUFXLGtEQUFNO0FBQ2pCLElBQUksU0FBUywyREFBa0IsQ0FBQywrQ0FBVTtBQUMxQyxXQUFXLGtEQUFNO0FBQ2pCLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLEtBQUssTUFBTSxTQUFTO0FBQ3REO0FBQ0E7O0FBRU87QUFDUCxvQkFBb0IsNENBQUc7O0FBRXZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxrREFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEVBQUUsK0NBQVU7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLElBQUksd0RBQXdEO0FBQzVELElBQUksZ0VBQWdFO0FBQ3BFOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDek04QztBQUNQOztBQUV2QztBQUNBO0FBQ0E7O0FBRU8sZ0JBQWdCLG1EQUFVO0FBQzFCLHFCQUFxQiw0Q0FBRztBQUN4QixvQkFBb0IsNENBQUc7QUFDdkI7QUFDUCxFQUFFLDRDQUFHO0FBQ0U7QUFDUCxFQUFFLDRDQUFHOzs7Ozs7O1VDYkw7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNBa0I7QUFDNkM7O0FBRS9ELHdFQUFjLENBQUMsNENBQU87O0FBRXRCO0FBQ0Esd0JBQXdCLDRDQUFPOztBQUUvQjtBQUNBLGlEQUFZO0FBQ1o7QUFDQTtBQUNBLCtEQUErRCxJQUFJLElBQUksU0FBUztBQUNoRjtBQUNBLDJCQUEyQiw0REFBbUIsTUFBTSw0Q0FBTzs7QUFFM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQSxnREFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDZEQUFvQixVQUFVLDRDQUFPOztBQUVoRTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsSUFBSSxJQUFJLFNBQVM7QUFDbEY7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS8uL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly9lYmEtcHJvdmlkZXItZGlyZWN0b3J5Ly4vc3JjL2FwaS9hcGkuanMiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS8uL3NyYy9hcGkvZmlyZWJhc2UuanMiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS8uL3NyYy9hcGkveG1sLmpzIiwid2VicGFjazovL2ViYS1wcm92aWRlci1kaXJlY3RvcnkvLi9zcmMvbGliL2NvbG9ycy5qcyIsIndlYnBhY2s6Ly9lYmEtcHJvdmlkZXItZGlyZWN0b3J5Ly4vc3JjL2xpYi9jc3UuanMiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS8uL3NyYy9saWIvc2ltcGxlbWFwcy91dGlscy5qcyIsIndlYnBhY2s6Ly9lYmEtcHJvdmlkZXItZGlyZWN0b3J5Ly4vc3JjL3BhZ2VzL2NzdS9hcGkuanMiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lYmEtcHJvdmlkZXItZGlyZWN0b3J5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lYmEtcHJvdmlkZXItZGlyZWN0b3J5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ViYS1wcm92aWRlci1kaXJlY3RvcnkvLi9zcmMvcGFnZXMvY3N1L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBBUElfT1BUSU9OUyA9IHtcbiAgWE1MOiBcIlhNTFwiLFxuICBGSVJFQkFTRTogXCJGSVJFQkFTRVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgQVBJOiBBUElfT1BUSU9OUy5YTUwsXG59O1xuIiwiaW1wb3J0IHsgWE1MX0FQSSB9IGZyb20gXCIuL3htbC5qc1wiO1xuaW1wb3J0IHsgRklSRUJBU0VfQVBJIH0gZnJvbSBcIi4vZmlyZWJhc2UuanNcIjtcbmltcG9ydCB7IGNvbmZpZywgQVBJX09QVElPTlMgfSBmcm9tIFwiLi4vLi4vY29uZmlnLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBBUEkgPVxuICBjb25maWcuQVBJID09PSBBUElfT1BUSU9OUy5YTUwgPyBuZXcgWE1MX0FQSSgpIDogbmV3IEZJUkVCQVNFX0FQSSgpO1xuIiwiZXhwb3J0IGNsYXNzIEZJUkVCQVNFX0FQSSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubmFtZSA9IFwiRklSRUJBU0VfQVBJXCI7XG4gIH1cblxuICB0ZXN0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiRklSRUJBU0VfQVBJXCIpO1xuICB9XG5cbiAgZ2V0TGFzdFVwZGF0ZWQoKSB7XG4gICAgcmV0dXJuIFwibm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcIjtcbiAgfVxuXG4gIGdldEFsbFByb3ZpZGVycygpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEFsbFByb3ZpZGVyc0J5Q1NVKGNzdSkge1xuICAgIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gRklSRUJBU0VfQVBJXG4gICAgcmV0dXJuIG5ldyBNYXAoKTtcbiAgfVxuXG4gIGdldEFsbFByb3ZpZGVyc0J5RklQUyhmaXBzKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gbmV3IE1hcCgpO1xuICB9XG5cbiAgZ2V0UHJvdmlkZXJTZXJ2aWNlcyhwcm92aWRlcklEKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRQcm92aWRlckluZm8ocHJvdmlkZXJJRCkge1xuICAgIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gRklSRUJBU0VfQVBJXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgZ2V0QWxsU2VydmljZXNCeVByb3ZpZGVySW5GSVBTKHByb3ZpZGVySWQsIGZpcHMpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEFsbFNlcnZpY2VOYW1lc0J5Q1NVKGNzdSkge1xuICAgIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gRklSRUJBU0VfQVBJXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZ2V0QWxsU2VydmljZXNCeVByb3ZpZGVySW5DU1UocHJvdmlkZXJJZCwgY3N1KSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnNPZlNlcnZpY2VJbkNTVShzZXJ2aWNlTmFtZSwgY3N1KSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnNPZkxhbmd1YWdlKGxhbmd1YWdlTmFtZSkge1xuICAgIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gRklSRUJBU0VfQVBJXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzT2ZTZXJ2aWNlKHNlcnZpY2VOYW1lKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRBbGxMb2NhdGlvbnMoKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRBbGxTZXJ2aWNlTmFtZXMoKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRBbGxMYW5ndWFnZXMoKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRTZXJ2aWNlTWFwRklQUyhwcm92aWRlcklELCBzZXJ2aWNlTmFtZSkge1xuICAgIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gRklSRUJBU0VfQVBJXG4gICAgcmV0dXJuIHsgYXZhaWxhYmxlOiBbXSwgbGltaXRlZDogW10sIGxhbmd1YWdlczogbmV3IE1hcCgpIH07XG4gIH1cblxuICBnZXRBbGxGSVBTKHByb3ZpZGVySUQpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHNlYXJjaFByb3ZpZGVycyh7IHNlcnZpY2VOYW1lLCBsb2NhdGlvblR5cGUsIGxvY2F0aW9uSUQsIGxhbmd1YWdlTmFtZSB9KSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gbmV3IE1hcCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBpc0xvY2FsaXR5SW5DU1VJRCwgaXNMb2NhbGl0eUluUmVnaW9uSUQgfSBmcm9tIFwiLi4vbGliL2NzdS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgWE1MX0FQSSB7XG4gIGZpbGVuYW1lID0gXCIvZGF0YS9kc3BzLnhtbFwiO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubmFtZSA9IFwiWE1MX0FQSVwiO1xuICAgIHRoaXMuZ2V0WE1MKCk7XG4gIH1cblxuICBhc3luYyBnZXRYTUwoKSB7XG4gICAgY29uc3QgQ29ubmVjdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIENvbm5lY3Qub3BlbihcIkdFVFwiLCB0aGlzLmZpbGVuYW1lLCBmYWxzZSk7XG4gICAgQ29ubmVjdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC94bWxcIik7XG4gICAgQ29ubmVjdC5zZW5kKG51bGwpO1xuICAgIHRoaXMuZGF0YSA9IENvbm5lY3QucmVzcG9uc2VYTUw7XG4gIH1cblxuICBnZXRMYXN0VXBkYXRlZCgpIHtcbiAgICBpZiAodGhpcy5kYXRhICE9PSBudWxsICYmIHRoaXMuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB1cGRhdGVEYXRlcyA9IHRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkxhc3RVcGRhdGVkXCIpO1xuICAgICAgY29uc3QgdXBkYXRlQXJyYXkgPSBbXTtcbiAgICAgIGxldCB1cGRhdGVBcnJ5VGV4dCA9IFwiXCI7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZURhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHVwZGF0ZUFycmF5LnB1c2godXBkYXRlRGF0ZXMuaXRlbShpKS50ZXh0Q29udGVudCk7XG4gICAgICB9XG4gICAgICB1cGRhdGVBcnJheS5zb3J0KCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZURhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHVwZGF0ZUFycnlUZXh0ICs9IHVwZGF0ZUFycmF5W2ldICsgXCJcXHJcIjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRpcmVjdG9yeVVwZGF0ZWRTcGxpdCA9XG4gICAgICAgIHVwZGF0ZUFycmF5W3VwZGF0ZURhdGVzLmxlbmd0aCAtIDFdLnNwbGl0KFwiLVwiKTtcbiAgICAgIGxldCBkaXJlY3RvcnlVcGRhdGVkID0gXCJcIjtcbiAgICAgIGlmIChkaXJlY3RvcnlVcGRhdGVkU3BsaXRbMV0gPT0gXCIwMVwiKSB7XG4gICAgICAgIGRpcmVjdG9yeVVwZGF0ZWQgPSBcIkphbnVhcnkgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjAyXCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiRmVicnVhcnkgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjAzXCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiTWFyY2ggXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjA0XCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiQXByaWwgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjA1XCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiTWF5IFwiO1xuICAgICAgfSBlbHNlIGlmIChkaXJlY3RvcnlVcGRhdGVkU3BsaXRbMV0gPT0gXCIwNlwiKSB7XG4gICAgICAgIGRpcmVjdG9yeVVwZGF0ZWQgPSBcIkp1bmUgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjA3XCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiSnVseSBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMDhcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJBdWd1c3QgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjA5XCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiU2VwdGVtYmVyIFwiO1xuICAgICAgfSBlbHNlIGlmIChkaXJlY3RvcnlVcGRhdGVkU3BsaXRbMV0gPT0gXCIxMFwiKSB7XG4gICAgICAgIGRpcmVjdG9yeVVwZGF0ZWQgPSBcIk9jdG9iZXIgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjExXCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiTm92ZW1iZXIgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjEyXCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiRGVjZW1iZXIgXCI7XG4gICAgICB9XG4gICAgICBkaXJlY3RvcnlVcGRhdGVkICs9IE51bWJlcihkaXJlY3RvcnlVcGRhdGVkU3BsaXRbMl0pICsgXCIsIFwiO1xuICAgICAgZGlyZWN0b3J5VXBkYXRlZCArPSBkaXJlY3RvcnlVcGRhdGVkU3BsaXRbMF07XG4gICAgICByZXR1cm4gZGlyZWN0b3J5VXBkYXRlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwiTm8gZGF0YSBhdmFpbGFibGUuXCI7XG4gICAgfVxuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzKCkge1xuICAgIGlmICh0aGlzLmRhdGEgIT09IG51bGwgJiYgdGhpcy5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHByb3ZpZGVycyA9IHRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlByb3ZpZGVyXCIpO1xuICAgICAgY29uc3QgcHJvdmlkZXJMaXN0ID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3ZpZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwcm92aWRlck5hbWUgPSBwcm92aWRlcnNcbiAgICAgICAgICAuaXRlbShpKVxuICAgICAgICAgID8uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJOYW1lXCIpXG4gICAgICAgICAgPy5pdGVtKDApPy50ZXh0Q29udGVudDtcbiAgICAgICAgY29uc3QgcHJvdmlkZXJJZCA9IHByb3ZpZGVycy5pdGVtKGkpPy5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgcHJvdmlkZXJMaXN0LnB1c2goeyBuYW1lOiBwcm92aWRlck5hbWUsIGlkOiBwcm92aWRlcklkIH0pO1xuICAgICAgfVxuICAgICAgcHJvdmlkZXJMaXN0LnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKGEubmFtZSA8IGIubmFtZSkge1xuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChhLm5hbWUgPiBiLm5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcHJvdmlkZXJMaXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzQnlDU1UoY3N1KSB7XG4gICAgaWYgKHRoaXMuZGF0YSAhPT0gbnVsbCAmJiB0aGlzLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgcHJvdmlkZXJMaXN0ID0gbmV3IE1hcCgpO1xuICAgICAgY29uc3Qgc2VydmljZUZJUFMgPSBbLi4udGhpcy5kYXRhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiRklQc1wiKV07XG5cbiAgICAgIGNvbnN0IGNzdVNlcnZpY2VGSVBTID0gc2VydmljZUZJUFMuZmlsdGVyKChmaXBzKSA9PlxuICAgICAgICBjc3UubG9jYWxpdGllcy5pbmNsdWRlcyhmaXBzLnRleHRDb250ZW50KVxuICAgICAgKTtcblxuICAgICAgY3N1U2VydmljZUZJUFMuZm9yRWFjaCgoZmlwcykgPT4ge1xuICAgICAgICBjb25zdCBwcm92aWRlciA9IGZpcHMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBjb25zdCBwcm92aWRlck5hbWUgPSBwcm92aWRlclxuICAgICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIk5hbWVcIilcbiAgICAgICAgICAuaXRlbSgwKS50ZXh0Q29udGVudDtcbiAgICAgICAgY29uc3QgcHJvdmlkZXJJZCA9IHByb3ZpZGVyLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuXG4gICAgICAgIGlmICghcHJvdmlkZXJMaXN0Lmhhcyhwcm92aWRlcklkKSkge1xuICAgICAgICAgIHByb3ZpZGVyTGlzdC5zZXQocHJvdmlkZXJJZCwgcHJvdmlkZXJOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IE1hcChcbiAgICAgICAgWy4uLnByb3ZpZGVyTGlzdC5lbnRyaWVzKCldLnNvcnQoKGEsIGIpID0+IGFbMV0ubG9jYWxlQ29tcGFyZShiWzFdKSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgTWFwKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzQnlGSVBTKGZpcHMpIHtcbiAgICBjb25zdCBwcm92aWRlckxpc3QgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgYWxsRklQUyA9IFsuLi50aGlzLmRhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpXTtcblxuICAgIGNvbnN0IHRhcmdldEZJUFMgPSBhbGxGSVBTLmZpbHRlcihcbiAgICAgIChmaXBzRWxlbWVudCkgPT4gZmlwc0VsZW1lbnQudGV4dENvbnRlbnQgPT09IGZpcHNcbiAgICApO1xuXG4gICAgdGFyZ2V0RklQUy5mb3JFYWNoKChmaXBzRWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgcHJvdmlkZXIgPSBmaXBzRWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICBjb25zdCBwcm92aWRlck5hbWUgPSBwcm92aWRlclxuICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJOYW1lXCIpXG4gICAgICAgIC5pdGVtKDApLnRleHRDb250ZW50O1xuICAgICAgY29uc3QgcHJvdmlkZXJJZCA9IHByb3ZpZGVyLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuXG4gICAgICBwcm92aWRlckxpc3Quc2V0KHByb3ZpZGVySWQsIHByb3ZpZGVyTmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBNYXAoXG4gICAgICBbLi4ucHJvdmlkZXJMaXN0LmVudHJpZXMoKV0uc29ydCgoYSwgYikgPT4gYVsxXS5sb2NhbGVDb21wYXJlKGJbMV0pKVxuICAgICk7XG4gIH1cblxuICBnZXRQcm92aWRlclNlcnZpY2VzKHByb3ZpZGVySUQpIHtcbiAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuZGF0YS5nZXRFbGVtZW50QnlJZChwcm92aWRlcklEKTtcbiAgICBjb25zdCBzZXJ2aWNlRWxlbWVudHMgPSBwcm92aWRlci5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlNlcnZpY2VcIik7XG4gICAgY29uc3Qgc2VydmljZU5hbWVzID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VydmljZUVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzZXJ2aWNlID0gc2VydmljZUVsZW1lbnRzLml0ZW0oaSk7XG4gICAgICBzZXJ2aWNlTmFtZXMuYWRkKHNlcnZpY2UuZ2V0QXR0cmlidXRlKFwic2VydmljZU5hbWVcIikpO1xuICAgIH1cbiAgICByZXR1cm4gWy4uLnNlcnZpY2VOYW1lc10uc29ydCgpO1xuICB9XG5cbiAgZ2V0UHJvdmlkZXJJbmZvKHByb3ZpZGVySUQpIHtcbiAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuZGF0YS5nZXRFbGVtZW50QnlJZChwcm92aWRlcklEKTtcbiAgICBjb25zdCBtYXBab29tID0gcHJvdmlkZXJcbiAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIk1hcFpvb21cIilcbiAgICAgIC5pdGVtKDApLnRleHRDb250ZW50O1xuICAgIGNvbnN0IGNvbnRhY3ROYW1lID0gcHJvdmlkZXJcbiAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkNvbnRhY3ROYW1lXCIpXG4gICAgICAuaXRlbSgwKS50ZXh0Q29udGVudDtcbiAgICBjb25zdCBwcm92aWRlck5hbWUgPSBwcm92aWRlclxuICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiTmFtZVwiKVxuICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgY29uc3QgY29udGFjdEVtYWlsID0gcHJvdmlkZXJcbiAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkNvbnRhY3RFbWFpbFwiKVxuICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgY29uc3Qgd2Vic2l0ZSA9IHByb3ZpZGVyXG4gICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJXZWJzaXRlXCIpXG4gICAgICAuaXRlbSgwKS50ZXh0Q29udGVudDtcbiAgICBjb25zdCBsYXN0VXBkYXRlZCA9IHByb3ZpZGVyXG4gICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJMYXN0VXBkYXRlZFwiKVxuICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByb3ZpZGVyTmFtZSxcbiAgICAgIGNvbnRhY3ROYW1lLFxuICAgICAgY29udGFjdEVtYWlsLFxuICAgICAgd2Vic2l0ZSxcbiAgICAgIGxhc3RVcGRhdGVkLFxuICAgICAgbWFwWm9vbSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0QWxsU2VydmljZU5hbWVzQnlDU1UoY3N1KSB7XG4gICAgaWYgKHRoaXMuZGF0YSAhPT0gbnVsbCAmJiB0aGlzLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3Qgc2VydmljZUxpc3QgPSBuZXcgU2V0KCk7XG4gICAgICBjb25zdCBzZXJ2aWNlRklQUyA9IFsuLi50aGlzLmRhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpXTtcblxuICAgICAgY29uc3QgY3N1U2VydmljZUZJUFMgPSBzZXJ2aWNlRklQUy5maWx0ZXIoKGZpcHMpID0+XG4gICAgICAgIGNzdS5sb2NhbGl0aWVzLmluY2x1ZGVzKGZpcHMudGV4dENvbnRlbnQpXG4gICAgICApO1xuXG4gICAgICBjc3VTZXJ2aWNlRklQUy5mb3JFYWNoKChmaXBzKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlcnZpY2UgPSBmaXBzLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHNlcnZpY2VOYW1lID0gc2VydmljZS5nZXRBdHRyaWJ1dGUoXCJzZXJ2aWNlTmFtZVwiKTtcblxuICAgICAgICBzZXJ2aWNlTGlzdC5hZGQoc2VydmljZU5hbWUpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBbLi4uc2VydmljZUxpc3RdLnNvcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIGdldEFsbFNlcnZpY2VzQnlQcm92aWRlckluRklQUyhwcm92aWRlcklkLCBmaXBzKSB7XG4gICAgY29uc3QgcHJvdmlkZXIgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudEJ5SWQocHJvdmlkZXJJZCk7XG4gICAgY29uc3QgcHJvdmlkZXJTZXJ2aWNlcyA9IHByb3ZpZGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiU2VydmljZVwiKTtcbiAgICBjb25zdCBzZXJ2aWNlTGlzdCA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3ZpZGVyU2VydmljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBwcm92aWRlclNlcnZpY2VzLml0ZW0oaSk7XG4gICAgICBjb25zdCBzZXJ2aWNlRklQUyA9IHNlcnZpY2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZXJ2aWNlRklQUy5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoc2VydmljZUZJUFMuaXRlbShqKS50ZXh0Q29udGVudCA9PT0gZmlwcykge1xuICAgICAgICAgIGNvbnN0IGlzTGltaXRlZFNlcnZpY2UgPVxuICAgICAgICAgICAgc2VydmljZUZJUFMuaXRlbShqKS5nZXRBdHRyaWJ1dGUoXCJ0cmF2ZWxSZXFcIikgPT09IFwiWVwiO1xuICAgICAgICAgIHNlcnZpY2VMaXN0LnNldChcbiAgICAgICAgICAgIHNlcnZpY2UuZ2V0QXR0cmlidXRlKFwic2VydmljZU5hbWVcIiksXG4gICAgICAgICAgICBpc0xpbWl0ZWRTZXJ2aWNlXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IE1hcChcbiAgICAgIFsuLi5zZXJ2aWNlTGlzdC5lbnRyaWVzKCldLnNvcnQoKGEsIGIpID0+IGFbMF0ubG9jYWxlQ29tcGFyZShiWzBdKSlcbiAgICApO1xuICB9XG5cbiAgZ2V0QWxsU2VydmljZXNCeVByb3ZpZGVySW5DU1UocHJvdmlkZXJJZCwgY3N1KSB7XG4gICAgY29uc3QgcHJvdmlkZXIgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudEJ5SWQocHJvdmlkZXJJZCk7XG4gICAgY29uc3QgcHJvdmlkZXJTZXJ2aWNlcyA9IHByb3ZpZGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiU2VydmljZVwiKTtcbiAgICBjb25zdCBzZXJ2aWNlTGlzdCA9IG5ldyBTZXQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3ZpZGVyU2VydmljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBwcm92aWRlclNlcnZpY2VzLml0ZW0oaSk7XG4gICAgICBjb25zdCBzZXJ2aWNlRklQUyA9IHNlcnZpY2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZXJ2aWNlRklQUy5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoY3N1LmxvY2FsaXRpZXMuaW5jbHVkZXMoc2VydmljZUZJUFMuaXRlbShqKS50ZXh0Q29udGVudCkpIHtcbiAgICAgICAgICBzZXJ2aWNlTGlzdC5hZGQoc2VydmljZS5nZXRBdHRyaWJ1dGUoXCJzZXJ2aWNlTmFtZVwiKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFsuLi5zZXJ2aWNlTGlzdF0uc29ydCgpO1xuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzT2ZTZXJ2aWNlSW5DU1Uoc2VydmljZU5hbWUsIGNzdSkge1xuICAgIGNvbnN0IHNlcnZpY2VGSVBTID0gWy4uLnRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkZJUHNcIildO1xuICAgIGNvbnN0IGNzdVNlcnZpY2VGSVBTID0gc2VydmljZUZJUFMuZmlsdGVyKChmaXBzKSA9PlxuICAgICAgY3N1LmxvY2FsaXRpZXMuaW5jbHVkZXMoZmlwcy50ZXh0Q29udGVudClcbiAgICApO1xuXG4gICAgY29uc3QgcHJvdmlkZXJMaXN0ID0gbmV3IE1hcCgpO1xuICAgIGNzdVNlcnZpY2VGSVBTLmZvckVhY2goKGZpcHMpID0+IHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyID0gZmlwcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICBjb25zdCBwcm92aWRlck5hbWUgPSBwcm92aWRlclxuICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJOYW1lXCIpXG4gICAgICAgIC5pdGVtKDApLnRleHRDb250ZW50O1xuICAgICAgY29uc3QgcHJvdmlkZXJJZCA9IHByb3ZpZGVyLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgY29uc3QgcHJvdmlkZXJTZXJ2aWNlcyA9IHByb3ZpZGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiU2VydmljZVwiKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvdmlkZXJTZXJ2aWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvdmlkZXJTZXJ2aWNlcy5pdGVtKGkpLmdldEF0dHJpYnV0ZShcInNlcnZpY2VOYW1lXCIpID09PSBzZXJ2aWNlTmFtZVxuICAgICAgICApIHtcbiAgICAgICAgICBwcm92aWRlckxpc3Quc2V0KHByb3ZpZGVySWQsIHByb3ZpZGVyTmFtZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgTWFwKFxuICAgICAgWy4uLnByb3ZpZGVyTGlzdC5lbnRyaWVzKCldLnNvcnQoKGEsIGIpID0+IGFbMV0ubG9jYWxlQ29tcGFyZShiWzFdKSlcbiAgICApO1xuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzT2ZMYW5ndWFnZShsYW5ndWFnZU5hbWUpIHtcbiAgICBjb25zdCBwcm92aWRlcnMgPSBuZXcgTWFwKCk7XG5cbiAgICBjb25zdCBhbGxGSVBTID0gWy4uLnRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkZJUHNcIildO1xuICAgIGFsbEZJUFMuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgIGNvbnN0IGZpcHNMYW5ndWFnZXMgPSBsb2NhdGlvbi5nZXRBdHRyaWJ1dGUoXCJsYW5ndWFnZXNcIik7XG4gICAgICBpZiAoZmlwc0xhbmd1YWdlcyAmJiBmaXBzTGFuZ3VhZ2VzLmluY2x1ZGVzKGxhbmd1YWdlTmFtZSkpIHtcbiAgICAgICAgY29uc3QgcHJvdmlkZXIgPSBsb2NhdGlvbi5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVySUQgPSBwcm92aWRlci5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgY29uc3QgcHJvdmlkZXJOYW1lID0gcHJvdmlkZXJcbiAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJOYW1lXCIpXG4gICAgICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgICAgIHByb3ZpZGVycy5zZXQocHJvdmlkZXJJRCwgcHJvdmlkZXJOYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgTWFwKFxuICAgICAgWy4uLnByb3ZpZGVycy5lbnRyaWVzKCldLnNvcnQoKGEsIGIpID0+IGFbMV0ubG9jYWxlQ29tcGFyZShiWzFdKSlcbiAgICApO1xuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzT2ZTZXJ2aWNlKHNlcnZpY2VOYW1lKSB7XG4gICAgY29uc3QgcHJvdmlkZXJzID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3QgYWxsU2VydmljZXMgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTZXJ2aWNlXCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsU2VydmljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBhbGxTZXJ2aWNlcy5pdGVtKGkpO1xuICAgICAgaWYgKHNlcnZpY2UuZ2V0QXR0cmlidXRlKFwic2VydmljZU5hbWVcIikgPT09IHNlcnZpY2VOYW1lKSB7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyID0gc2VydmljZS5wYXJlbnRFbGVtZW50O1xuICAgICAgICBjb25zdCBwcm92aWRlcklEID0gcHJvdmlkZXIuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyTmFtZSA9IHByb3ZpZGVyXG4gICAgICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiTmFtZVwiKVxuICAgICAgICAgIC5pdGVtKDApLnRleHRDb250ZW50O1xuICAgICAgICBwcm92aWRlcnMuc2V0KHByb3ZpZGVySUQsIHByb3ZpZGVyTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBNYXAoXG4gICAgICBbLi4ucHJvdmlkZXJzLmVudHJpZXMoKV0uc29ydCgoYSwgYikgPT4gYVsxXS5sb2NhbGVDb21wYXJlKGJbMV0pKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtwcm92aWRlcklEXVxuICAgKi9cbiAgZ2V0QWxsTG9jYXRpb25zKHByb3ZpZGVySUQpIHtcbiAgICBsZXQgbG9jYXRpb25zO1xuICAgIGlmICghcHJvdmlkZXJJRCkge1xuICAgICAgbG9jYXRpb25zID0gdGhpcy5kYXRhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiT2ZmaWNlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuZGF0YS5nZXRFbGVtZW50QnlJZChwcm92aWRlcklEKTtcbiAgICAgIGxvY2F0aW9ucyA9IHByb3ZpZGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiT2ZmaWNlXCIpO1xuICAgIH1cbiAgICBjb25zdCBsb2NhdGlvbkFycmF5ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGxvY2F0aW9uID0gbG9jYXRpb25zLml0ZW0oaSk7XG4gICAgICAvLyBnZXQgbG9jYXRpb24ncyBwcm92aWRlciBuYW1lIChpbiBwYXJlbnQgbm9kZSlcbiAgICAgIGNvbnN0IGxvY2F0aW9uT2JqZWN0ID0ge1xuICAgICAgICBwcm92aWRlck5hbWU6IGxvY2F0aW9uLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJOYW1lXCIpXG4gICAgICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQsXG4gICAgICAgIHByb3ZpZGVySWQ6IGxvY2F0aW9uLnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiaWRcIiksXG4gICAgICAgIGxhdDogbG9jYXRpb24uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJMYXRcIikuaXRlbSgwKS50ZXh0Q29udGVudCxcbiAgICAgICAgbG5nOiBsb2NhdGlvbi5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkxuZ1wiKS5pdGVtKDApLnRleHRDb250ZW50LFxuICAgICAgICBzdHJlZXQ6IGxvY2F0aW9uLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiU3RyZWV0XCIpLml0ZW0oMCkudGV4dENvbnRlbnQsXG4gICAgICAgIGNpdHk6IGxvY2F0aW9uLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiQ2l0eVwiKS5pdGVtKDApLnRleHRDb250ZW50LFxuICAgICAgICBzdGF0ZTogbG9jYXRpb24uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTdGF0ZVwiKS5pdGVtKDApLnRleHRDb250ZW50LFxuICAgICAgICB6aXA6IGxvY2F0aW9uLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiWmlwXCIpLml0ZW0oMCkudGV4dENvbnRlbnQsXG4gICAgICAgIHBob25lOiBsb2NhdGlvbi5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlBob25lXCIpLml0ZW0oMCkudGV4dENvbnRlbnQsXG4gICAgICB9O1xuICAgICAgbG9jYXRpb25BcnJheS5wdXNoKGxvY2F0aW9uT2JqZWN0KTtcbiAgICB9XG4gICAgcmV0dXJuIGxvY2F0aW9uQXJyYXk7XG4gIH1cblxuICBnZXRBbGxTZXJ2aWNlTmFtZXMoKSB7XG4gICAgaWYgKHRoaXMuZGF0YSAhPT0gbnVsbCAmJiB0aGlzLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3Qgc2VydmljZXMgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTZXJ2aWNlXCIpO1xuICAgICAgY29uc3Qgc2VydmljZU5hbWVzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlcnZpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNlcnZpY2VOYW1lID0gc2VydmljZXMuaXRlbShpKT8uZ2V0QXR0cmlidXRlKFwic2VydmljZU5hbWVcIik7XG4gICAgICAgIHNlcnZpY2VOYW1lcy5wdXNoKHNlcnZpY2VOYW1lKTtcbiAgICAgIH1cbiAgICAgIHNlcnZpY2VOYW1lcy5zb3J0KCk7XG4gICAgICByZXR1cm4gWy4uLm5ldyBTZXQoc2VydmljZU5hbWVzKV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICBnZXRBbGxMYW5ndWFnZXMocHJvdmlkZXJJRCkge1xuICAgIGxldCBhbGxMb2NhdGlvbnM7XG4gICAgaWYgKCFwcm92aWRlcklEKSB7XG4gICAgICBhbGxMb2NhdGlvbnMgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuZGF0YS5nZXRFbGVtZW50QnlJZChwcm92aWRlcklEKTtcbiAgICAgIGFsbExvY2F0aW9ucyA9IHByb3ZpZGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiRklQc1wiKTtcbiAgICB9XG5cbiAgICBsZXQgYWxsTGFuZ3VhZ2VzQXJyYXkgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbExvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFsbExvY2F0aW9ucy5pdGVtKGkpLmdldEF0dHJpYnV0ZShcImxhbmd1YWdlc1wiKSkge1xuICAgICAgICB2YXIgc2VydmljZUxhbmd1YWdlU3RyID0gYWxsTG9jYXRpb25zLml0ZW0oaSkuZ2V0QXR0cmlidXRlKFwibGFuZ3VhZ2VzXCIpO1xuICAgICAgICB3aGlsZSAoc2VydmljZUxhbmd1YWdlU3RyLmluZGV4T2YoXCIgXCIpID49IDApIHtcbiAgICAgICAgICBzZXJ2aWNlTGFuZ3VhZ2VTdHIgPSBzZXJ2aWNlTGFuZ3VhZ2VTdHIucmVwbGFjZShcIiBcIiwgXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlcnZpY2VMYW5ndWFnZVN0ci5pbmNsdWRlcyhcIixcIikpIHtcbiAgICAgICAgICB2YXIgc2VydmljZUxhbmd1YWdlcyA9IHNlcnZpY2VMYW5ndWFnZVN0ci5zcGxpdChcIixcIik7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZXJ2aWNlTGFuZ3VhZ2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBhbGxMYW5ndWFnZXNBcnJheS5wdXNoKHNlcnZpY2VMYW5ndWFnZXNbal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGxMYW5ndWFnZXNBcnJheS5wdXNoKFxuICAgICAgICAgICAgYWxsTG9jYXRpb25zLml0ZW0oaSkuZ2V0QXR0cmlidXRlKFwibGFuZ3VhZ2VzXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBhbGxMYW5ndWFnZXNBcnJheS5zb3J0KCk7XG4gICAgcmV0dXJuIFsuLi5uZXcgU2V0KGFsbExhbmd1YWdlc0FycmF5KV07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW3BhcmFtcy5wcm92aWRlcklEXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLnNlcnZpY2VOYW1lXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBnZXRTZXJ2aWNlTWFwRklQUyh7IHByb3ZpZGVySUQsIHNlcnZpY2VOYW1lIH0pIHtcbiAgICBsZXQgc2VydmljZUVsZW1lbnRzO1xuXG4gICAgaWYgKHByb3ZpZGVySUQpIHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5kYXRhLmdldEVsZW1lbnRCeUlkKHByb3ZpZGVySUQpO1xuICAgICAgc2VydmljZUVsZW1lbnRzID0gcHJvdmlkZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTZXJ2aWNlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXJ2aWNlRWxlbWVudHMgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTZXJ2aWNlXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGF2YWlsYWJsZUZJUFMgPSBbXTtcbiAgICBjb25zdCBsaW1pdGVkRklQUyA9IFtdO1xuICAgIGNvbnN0IGxhbmd1YWdlTWFwID0gbmV3IE1hcCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VydmljZUVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzZXJ2aWNlID0gc2VydmljZUVsZW1lbnRzLml0ZW0oaSk7XG4gICAgICBpZiAoc2VydmljZS5nZXRBdHRyaWJ1dGUoXCJzZXJ2aWNlTmFtZVwiKSA9PT0gc2VydmljZU5hbWUpIHtcbiAgICAgICAgY29uc3Qgc2VydmljZUZJUFMgPSBzZXJ2aWNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiRklQc1wiKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZXJ2aWNlRklQUy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGNvbnN0IGZpcHMgPSBzZXJ2aWNlRklQUy5pdGVtKGopLnRleHRDb250ZW50O1xuICAgICAgICAgIGNvbnN0IGlzTGltaXRlZCA9XG4gICAgICAgICAgICBzZXJ2aWNlRklQUy5pdGVtKGopLmdldEF0dHJpYnV0ZShcInRyYXZlbFJlcVwiKSA9PT0gXCJZXCI7XG4gICAgICAgICAgaWYgKGlzTGltaXRlZCkge1xuICAgICAgICAgICAgbGltaXRlZEZJUFMucHVzaChmaXBzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXZhaWxhYmxlRklQUy5wdXNoKGZpcHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBsYW5ndWFnZUxpc3QgPSBzZXJ2aWNlRklQUy5pdGVtKGopLmdldEF0dHJpYnV0ZShcImxhbmd1YWdlc1wiKTtcbiAgICAgICAgICBpZiAobGFuZ3VhZ2VMaXN0KSB7XG4gICAgICAgICAgICBjb25zdCBsYW5ndWFnZUFycmF5ID0gbGFuZ3VhZ2VMaXN0LnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgIGxhbmd1YWdlQXJyYXkuZm9yRWFjaCgobGFuZ3VhZ2UpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGxhbmd1YWdlTWFwLmhhcyhsYW5ndWFnZSkpIHtcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU1hcC5nZXQobGFuZ3VhZ2UpLmFkZChmaXBzKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU1hcC5zZXQobGFuZ3VhZ2UsIG5ldyBTZXQoW2ZpcHNdKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvL2NvbnZlcnQgdGhlIGxhbmd1YWdlTWFwIGludG8gYW4gb2JqZWN0IHdpdGgga2V5cyBhbmQgdGhlIGZpcHNTZXRcbiAgICBjb25zdCBsYW5ndWFnZUZJUFMgPSBbLi4ubGFuZ3VhZ2VNYXBdLm1hcCgoW2xhbmd1YWdlLCBmaXBzU2V0XSkgPT4gKHtcbiAgICAgIFtsYW5ndWFnZV06IFsuLi5maXBzU2V0XSxcbiAgICB9KSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGF2YWlsYWJsZTogYXZhaWxhYmxlRklQUyxcbiAgICAgIGxpbWl0ZWQ6IGxpbWl0ZWRGSVBTLFxuICAgICAgbGFuZ3VhZ2VzOiBsYW5ndWFnZUZJUFMsXG4gICAgfTtcbiAgfVxuXG4gIGdldEFsbEZJUFMocHJvdmlkZXJJRCkge1xuICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5kYXRhLmdldEVsZW1lbnRCeUlkKHByb3ZpZGVySUQpO1xuICAgIGNvbnN0IGFsbFByb3ZpZGVyRklQUyA9IHByb3ZpZGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiRklQc1wiKTtcblxuICAgIGNvbnN0IGZpcHNMaXN0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxQcm92aWRlckZJUFMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZpcHNMaXN0LnB1c2goYWxsUHJvdmlkZXJGSVBTLml0ZW0oaSkudGV4dENvbnRlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gWy4uLm5ldyBTZXQoZmlwc0xpc3QpXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc2VhcmNoUGFyYW1zXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbc2VhcmNoUGFyYW1zLnNlcnZpY2VOYW1lXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3NlYXJjaFBhcmFtcy5sb2NhdGlvbklEXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3NlYXJjaFBhcmFtcy5sb2NhdGlvblR5cGVdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbc2VhcmNoUGFyYW1zLmxhbmd1YWdlTmFtZV1cbiAgICovXG4gIHNlYXJjaFByb3ZpZGVycyh7IHNlcnZpY2VOYW1lLCBsb2NhdGlvbklELCBsb2NhdGlvblR5cGUsIGxhbmd1YWdlTmFtZSB9KSB7XG4gICAgY29uc3QgYWxsRklQUyA9IHRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkZJUHNcIik7XG4gICAgY29uc3QgcHJvdmlkZXJMaXN0ID0gbmV3IE1hcCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxGSVBTLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgaXNTZXJ2aWNlTWF0Y2ggPSBmYWxzZTtcbiAgICAgIGxldCBpc0xvY2F0aW9uTWF0Y2ggPSBmYWxzZTtcbiAgICAgIGxldCBpc0xhbmd1YWdlTWF0Y2ggPSBmYWxzZTtcbiAgICAgIGNvbnN0IGZpcHNTZXJ2aWNlID0gYWxsRklQU1xuICAgICAgICAuaXRlbShpKVxuICAgICAgICAucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJzZXJ2aWNlTmFtZVwiKTtcbiAgICAgIGlmIChcbiAgICAgICAgIXNlcnZpY2VOYW1lIHx8XG4gICAgICAgIHNlcnZpY2VOYW1lID09PSBcImFueVwiIHx8XG4gICAgICAgIHNlcnZpY2VOYW1lID09PSBmaXBzU2VydmljZVxuICAgICAgKSB7XG4gICAgICAgIGlzU2VydmljZU1hdGNoID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmlwcyA9IGFsbEZJUFMuaXRlbShpKTtcbiAgICAgIGlmIChcbiAgICAgICAgIWxvY2F0aW9uSUQgfHxcbiAgICAgICAgbG9jYXRpb25JRCA9PT0gXCJhbnlcIiB8fFxuICAgICAgICBmaXBzLnRleHRDb250ZW50ID09PSBsb2NhdGlvbklEXG4gICAgICApIHtcbiAgICAgICAgaXNMb2NhdGlvbk1hdGNoID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBsb2NhdGlvblR5cGUgPT09IFwiQ1NVXCIgJiZcbiAgICAgICAgaXNMb2NhbGl0eUluQ1NVSUQobG9jYXRpb25JRCwgZmlwcy50ZXh0Q29udGVudClcbiAgICAgICkge1xuICAgICAgICBpc0xvY2F0aW9uTWF0Y2ggPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBsb2NhdGlvblR5cGUgPT09IFwiUmVnaW9uXCIgJiZcbiAgICAgICAgaXNMb2NhbGl0eUluUmVnaW9uSUQobG9jYXRpb25JRCwgZmlwcy50ZXh0Q29udGVudClcbiAgICAgICkge1xuICAgICAgICBpc0xvY2F0aW9uTWF0Y2ggPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWxhbmd1YWdlTmFtZSB8fCBsYW5ndWFnZU5hbWUgPT09IFwiRW5nbGlzaFwiKSB7XG4gICAgICAgIGlzTGFuZ3VhZ2VNYXRjaCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaXBzLmdldEF0dHJpYnV0ZShcImxhbmd1YWdlc1wiKSkge1xuICAgICAgICBjb25zdCBsYW5ndWFnZUxpc3QgPSBmaXBzLmdldEF0dHJpYnV0ZShcImxhbmd1YWdlc1wiKTtcbiAgICAgICAgaWYgKGxhbmd1YWdlTGlzdC5pbmNsdWRlcyhsYW5ndWFnZU5hbWUpKSB7XG4gICAgICAgICAgaXNMYW5ndWFnZU1hdGNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNTZXJ2aWNlTWF0Y2ggJiYgaXNMb2NhdGlvbk1hdGNoICYmIGlzTGFuZ3VhZ2VNYXRjaCkge1xuICAgICAgICBjb25zdCBwcm92aWRlciA9IGZpcHMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBjb25zdCBwcm92aWRlcklEID0gcHJvdmlkZXIuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyTmFtZSA9IHByb3ZpZGVyXG4gICAgICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiTmFtZVwiKVxuICAgICAgICAgIC5pdGVtKDApLnRleHRDb250ZW50O1xuICAgICAgICBwcm92aWRlckxpc3Quc2V0KHByb3ZpZGVySUQsIHByb3ZpZGVyTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBNYXAoXG4gICAgICBbLi4ucHJvdmlkZXJMaXN0LmVudHJpZXMoKV0uc29ydCgoYSwgYikgPT4gYVsxXS5sb2NhbGVDb21wYXJlKGJbMV0pKVxuICAgICk7XG4gIH1cblxuICB0ZXN0KCkge1xuICAgIGlmICh0aGlzLmRhdGEgIT09IG51bGwgJiYgdGhpcy5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZGF0YSk7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmdldEVsZW1lbnRCeUlkKFwiMVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwiTm8gZGF0YSBhdmFpbGFibGUuXCI7XG4gICAgfVxuICB9XG59XG4iLCJjb25zdCBjb2xvcnMgPSB7XG4gIE5vcnRoZXJuQ29sb3I6IFwiIzQwNjE2MlwiLFxuICBDZW50cmFsQ29sb3I6IFwiIzg5QTE2RVwiLFxuICBXZXN0ZXJuQ29sb3I6IFwiIzRFNTA2N1wiLFxuICBTb3V0aGVybkNvbG9yOiBcIiNCQ0RBRTdcIixcbiAgRWFzdGVybkNvbG9yOiBcIiNDRTg0NEVcIixcbiAgTWlkV2VzdGVybkNvbG9yOiBcIiM1RTg1OUZcIixcbiAgRUJBQmx1ZTogXCIjRDlFNUYzXCIsXG4gIFJlZ0NvbG9yOiBcIiMwMDgwMDBcIixcbiAgVHJhdmVsQ29sb3I6IFwiIzkwRUU5MFwiLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29sb3JzO1xuIiwiLy9EZWZpbmUgQ1NVc1xuLy9FYXN0ZXJuIFJlZ2lvblxuY29uc3QgQ1NVMSA9IHtcbiAgbG9jYWxpdGllczogW1wiNTE1NTBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMSAtIENoZXNhcGVha2VcIixcbiAgc2x1ZzogXCJDU1UxXCIsXG59O1xuY29uc3QgQ1NVMiA9IHtcbiAgbG9jYWxpdGllczogW1wiNTE4MTBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMiAtIFZpcmdpbmlhIEJlYWNoXCIsXG4gIHNsdWc6IFwiQ1NVMlwiLFxufTtcbmNvbnN0IENTVTJBID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTAwMVwiLCBcIjUxMTMxXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDJBIC0gQWNjb21hY2tcIixcbiAgc2x1ZzogXCJDU1UyQVwiLFxufTtcbmNvbnN0IENTVTMgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxNzQwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDMgLSBQb3J0c21vdXRoXCIsXG4gIHNsdWc6IFwiQ1NVM1wiLFxufTtcbmNvbnN0IENTVTQgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxNzEwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDQgLSBOb3Jmb2xrXCIsXG4gIHNsdWc6IFwiQ1NVNFwiLFxufTtcbmNvbnN0IENTVTUgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxODAwXCIsIFwiNTE2MjBcIiwgXCI1MTA5M1wiLCBcIjUxMTc1XCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDUgLSBTdWZmb2xrXCIsXG4gIHNsdWc6IFwiQ1NVNVwiLFxufTtcbmNvbnN0IENTVTcgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxNzAwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDcgLSBOZXdwb3J0IE5ld3NcIixcbiAgc2x1ZzogXCJDU1U3XCIsXG59O1xuY29uc3QgQ1NVOCA9IHtcbiAgbG9jYWxpdGllczogW1wiNTE2NTBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgOCAtIEhhbXB0b25cIixcbiAgc2x1ZzogXCJDU1U4XCIsXG59O1xuLy9Tb3V0aGVybiBSZWdpb25cbmNvbnN0IENTVTYgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxNjcwXCIsIFwiNTExNDlcIiwgXCI1MTE4MVwiLCBcIjUxMTgzXCIsIFwiNTE1OTVcIiwgXCI1MTAyNVwiLCBcIjUxMDgxXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDYgLSBIb3Bld2VsbFwiLFxuICBzbHVnOiBcIkNTVTZcIixcbn07XG5jb25zdCBDU1UxMCA9IHtcbiAgbG9jYWxpdGllczogW1xuICAgIFwiNTEwMTFcIixcbiAgICBcIjUxMDI5XCIsXG4gICAgXCI1MTAzN1wiLFxuICAgIFwiNTEwNDlcIixcbiAgICBcIjUxMDgzXCIsXG4gICAgXCI1MTExMVwiLFxuICAgIFwiNTExMTdcIixcbiAgICBcIjUxMTQ3XCIsXG4gIF0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMTAgLSBIYWxpZmF4XCIsXG4gIHNsdWc6IFwiQ1NVMTBcIixcbn07XG5jb25zdCBDU1UxMSA9IHtcbiAgbG9jYWxpdGllczogW1wiNTE3MzBcIiwgXCI1MTAwN1wiLCBcIjUxMDUzXCIsIFwiNTExMzVcIiwgXCI1MTE0NVwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAxMSAtIFBldGVyc2J1cmdcIixcbiAgc2x1ZzogXCJDU1UxMVwiLFxufTtcbmNvbnN0IENTVTEyID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTA0MVwiLCBcIjUxNTcwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDEyIC0gQ2hlc3RlcmZpZWxkXCIsXG4gIHNsdWc6IFwiQ1NVMTJcIixcbn07XG5jb25zdCBDU1UxMyA9IHtcbiAgbG9jYWxpdGllczogW1wiNTE3NjBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMTMgLSBSaWNobW9uZFwiLFxuICBzbHVnOiBcIkNTVTEzXCIsXG59O1xuY29uc3QgQ1NVMTQgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMDg3XCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDE0IC0gSGVucmljb1wiLFxuICBzbHVnOiBcIkNTVTE0XCIsXG59O1xuXG4vL05vcnRoZXJuIFJlZ2lvblxudmFyIENTVTE3ID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTAxM1wiLCBcIjUxNjEwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDE3IC0gQXJsaW5ndG9uXCIsXG4gIHNsdWc6IFwiQ1NVMTdcIixcbn07XG52YXIgQ1NVMTggPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxNTEwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDE4IC0gQWxleGFuZHJpYVwiLFxuICBzbHVnOiBcIkNTVTE4XCIsXG59O1xudmFyIENTVTE5ID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTA1OVwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAxOSAtIEZhaXJmYXhcIixcbiAgc2x1ZzogXCJDU1UxOVwiLFxufTtcbmNvbnN0IENTVTIwID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTEwN1wiLCBcIjUxMDYxXCIsIFwiNTExNTdcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMjAgLSBMb3Vkb3VuXCIsXG4gIHNsdWc6IFwiQ1NVMjBcIixcbn07XG52YXIgQ1NVMjYgPSB7XG4gIGxvY2FsaXRpZXM6IFtcbiAgICBcIjUxMDQzXCIsXG4gICAgXCI1MTA2OVwiLFxuICAgIFwiNTExMzlcIixcbiAgICBcIjUxMTY1XCIsXG4gICAgXCI1MTE3MVwiLFxuICAgIFwiNTExODdcIixcbiAgICBcIjUxNjYwXCIsXG4gICAgXCI1MTg0MFwiLFxuICBdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDI2IC0gV2luY2hlc3RlclwiLFxuICBzbHVnOiBcIkNTVTI2XCIsXG59O1xudmFyIENTVTMxID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTE1M1wiLCBcIjUxNjgzXCIsIFwiNTE2ODVcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMzEgLSBNYW5hc3Nhc1wiLFxuICBzbHVnOiBcIkNTVTMxXCIsXG59O1xuXG4vL1dlc3Rlcm4gUmVnaW9uXG52YXIgQ1NVMjEgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMDg5XCIsIFwiNTExNDFcIiwgXCI1MTY5MFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAyMSAtIE1hcnRpbnN2aWxsZVwiLFxuICBzbHVnOiBcIkNTVTIxXCIsXG59O1xudmFyIENTVTIyID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTA2N1wiLCBcIjUxMTQzXCIsIFwiNTE1OTBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMjIgLSBSb2NreSBNb3VudFwiLFxuICBzbHVnOiBcIkNTVTIyXCIsXG59O1xuY29uc3QgQ1NVMjMgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMTYxXCIsIFwiNTE3NzVcIiwgXCI1MTc3MFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAyMyAtIFJvYW5va2VcIixcbiAgc2x1ZzogXCJDU1UyM1wiLFxufTtcbnZhciBDU1UyNyA9IHtcbiAgbG9jYWxpdGllczogW1xuICAgIFwiNTEwMjFcIixcbiAgICBcIjUxMDM1XCIsXG4gICAgXCI1MTA2M1wiLFxuICAgIFwiNTEwNzFcIixcbiAgICBcIjUxMDc3XCIsXG4gICAgXCI1MTEyMVwiLFxuICAgIFwiNTExNTVcIixcbiAgICBcIjUxMTk3XCIsXG4gICAgXCI1MTY0MFwiLFxuICAgIFwiNTE3NTBcIixcbiAgXSxcbiAgbmFtZTogXCJEaXN0cmljdCAyNyAtIFB1bGFza2lcIixcbiAgc2x1ZzogXCJDU1UyN1wiLFxufTtcbnZhciBDU1UyOCA9IHtcbiAgbG9jYWxpdGllczogW1wiNTExNzNcIiwgXCI1MTE5MVwiLCBcIjUxNTIwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDI4IC0gQWJpbmdkb25cIixcbiAgc2x1ZzogXCJDU1UyOFwiLFxufTtcbnZhciBDU1UyOSA9IHtcbiAgbG9jYWxpdGllczogW1wiNTEwMjdcIiwgXCI1MTA1MVwiLCBcIjUxMTY3XCIsIFwiNTExODVcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMjkgLSBUYXpld2VsbFwiLFxuICBzbHVnOiBcIkNTVTI5XCIsXG59O1xudmFyIENTVTMwID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTEwNVwiLCBcIjUxMTY5XCIsIFwiNTExOTVcIiwgXCI1MTcyMFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAzMCAtIEdhdGUgQ2l0eVwiLFxuICBzbHVnOiBcIkNTVTMwXCIsXG59O1xuLy9DZW50cmFsIFJlZ2lvblxudmFyIENTVTkgPSB7XG4gIGxvY2FsaXRpZXM6IFtcbiAgICBcIjUxMDM2XCIsXG4gICAgXCI1MTA3M1wiLFxuICAgIFwiNTEwOTVcIixcbiAgICBcIjUxMDk3XCIsXG4gICAgXCI1MTEwMVwiLFxuICAgIFwiNTExMTVcIixcbiAgICBcIjUxMTE5XCIsXG4gICAgXCI1MTEyN1wiLFxuICAgIFwiNTExOTlcIixcbiAgICBcIjUxNzM1XCIsXG4gICAgXCI1MTgzMFwiLFxuICBdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDkgLSBXaWxsaWFtc2J1cmdcIixcbiAgc2x1ZzogXCJDU1U5XCIsXG59O1xudmFyIENTVTE1ID0ge1xuICBsb2NhbGl0aWVzOiBbXG4gICAgXCI1MTAzM1wiLFxuICAgIFwiNTEwNTdcIixcbiAgICBcIjUxMDg1XCIsXG4gICAgXCI1MTA5OVwiLFxuICAgIFwiNTExMDNcIixcbiAgICBcIjUxMTMzXCIsXG4gICAgXCI1MTE1OVwiLFxuICAgIFwiNTExNzdcIixcbiAgICBcIjUxMTc5XCIsXG4gICAgXCI1MTE5M1wiLFxuICAgIFwiNTE2MzBcIixcbiAgXSxcbiAgbmFtZTogXCJEaXN0cmljdCAxNSAtIEZyZWRlcmlja3NidXJnXCIsXG4gIHNsdWc6IFwiQ1NVMTVcIixcbn07XG52YXIgQ1NVMTYgPSB7XG4gIGxvY2FsaXRpZXM6IFtcbiAgICBcIjUxMDAzXCIsXG4gICAgXCI1MTA0N1wiLFxuICAgIFwiNTEwNjVcIixcbiAgICBcIjUxMDc1XCIsXG4gICAgXCI1MTA3OVwiLFxuICAgIFwiNTExMDlcIixcbiAgICBcIjUxMTEzXCIsXG4gICAgXCI1MTEzN1wiLFxuICAgIFwiNTE1NDBcIixcbiAgXSxcbiAgbmFtZTogXCJEaXN0cmljdCAxNiAtIENoYXJsb3R0ZXN2aWxsZVwiLFxuICBzbHVnOiBcIkNTVTE2XCIsXG59O1xudmFyIENTVTI0ID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTAwOVwiLCBcIjUxMDE5XCIsIFwiNTEwMzFcIiwgXCI1MTEyNVwiLCBcIjUxNjgwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDI0IC0gTHluY2hidXJnXCIsXG4gIHNsdWc6IFwiQ1NVMjRcIixcbn07XG52YXIgQ1NVMjUgPSB7XG4gIGxvY2FsaXRpZXM6IFtcbiAgICBcIjUxMDA1XCIsXG4gICAgXCI1MTAxNVwiLFxuICAgIFwiNTEwMTdcIixcbiAgICBcIjUxMDIzXCIsXG4gICAgXCI1MTA0NVwiLFxuICAgIFwiNTEwOTFcIixcbiAgICBcIjUxMTYzXCIsXG4gICAgXCI1MTUzMFwiLFxuICAgIFwiNTE1ODBcIixcbiAgICBcIjUxNjc4XCIsXG4gICAgXCI1MTc5MFwiLFxuICAgIFwiNTE4MjBcIixcbiAgXSxcbiAgbmFtZTogXCJEaXN0cmljdCAyNSAtIFN0YXVudG9uXCIsXG4gIHNsdWc6IFwiQ1NVMjVcIixcbn07XG5cbmV4cG9ydCBjb25zdCBzb3J0ZWRDU1VzID0gW1xuICBDU1UxLFxuICBDU1UyLFxuICBDU1UyQSxcbiAgQ1NVMyxcbiAgQ1NVNCxcbiAgQ1NVNSxcbiAgQ1NVNixcbiAgQ1NVNyxcbiAgQ1NVOCxcbiAgQ1NVOSxcbiAgQ1NVMTAsXG4gIENTVTExLFxuICBDU1UxMixcbiAgQ1NVMTMsXG4gIENTVTE0LFxuICBDU1UxNSxcbiAgQ1NVMTYsXG4gIENTVTE3LFxuICBDU1UxOCxcbiAgQ1NVMTksXG4gIENTVTIwLFxuICBDU1UyMSxcbiAgQ1NVMjIsXG4gIENTVTIzLFxuICBDU1UyNCxcbiAgQ1NVMjUsXG4gIENTVTI2LFxuICBDU1UyNyxcbiAgQ1NVMjgsXG4gIENTVTI5LFxuICBDU1UzMCxcbiAgQ1NVMzEsXG5dO1xuXG5leHBvcnQgY29uc3QgYWxsRmlwcyA9IFtcbiAgXCI1MTUxMFwiLFxuICBcIjUxNTIwXCIsXG4gIFwiNTE1MzBcIixcbiAgXCI1MTU0MFwiLFxuICBcIjUxNTUwXCIsXG4gIFwiNTE1NzBcIixcbiAgXCI1MTU4MFwiLFxuICBcIjUxNTkwXCIsXG4gIFwiNTE1OTVcIixcbiAgXCI1MTYwMFwiLFxuICBcIjUxNjEwXCIsXG4gIFwiNTE2MjBcIixcbiAgXCI1MTYzMFwiLFxuICBcIjUxNjQwXCIsXG4gIFwiNTE2NTBcIixcbiAgXCI1MTY2MFwiLFxuICBcIjUxNjcwXCIsXG4gIFwiNTE2NzhcIixcbiAgXCI1MTY4MFwiLFxuICBcIjUxNjgzXCIsXG4gIFwiNTE2ODVcIixcbiAgXCI1MTY5MFwiLFxuICBcIjUxNzAwXCIsXG4gIFwiNTE3MTBcIixcbiAgXCI1MTcyMFwiLFxuICBcIjUxNzMwXCIsXG4gIFwiNTE3MzVcIixcbiAgXCI1MTc0MFwiLFxuICBcIjUxNzUwXCIsXG4gIFwiNTE3NjBcIixcbiAgXCI1MTc3MFwiLFxuICBcIjUxNzc1XCIsXG4gIFwiNTE3OTBcIixcbiAgXCI1MTgwMFwiLFxuICBcIjUxODEwXCIsXG4gIFwiNTE4MjBcIixcbiAgXCI1MTgzMFwiLFxuICBcIjUxODQwXCIsXG4gIFwiNTEwMDFcIixcbiAgXCI1MTAwM1wiLFxuICBcIjUxMDA1XCIsXG4gIFwiNTEwMDdcIixcbiAgXCI1MTAwOVwiLFxuICBcIjUxMDExXCIsXG4gIFwiNTEwMTNcIixcbiAgXCI1MTAxNVwiLFxuICBcIjUxMDE3XCIsXG4gIFwiNTEwMTlcIixcbiAgXCI1MTAyMVwiLFxuICBcIjUxMDIzXCIsXG4gIFwiNTEwMjVcIixcbiAgXCI1MTAyN1wiLFxuICBcIjUxMDI5XCIsXG4gIFwiNTEwMzFcIixcbiAgXCI1MTAzM1wiLFxuICBcIjUxMDM1XCIsXG4gIFwiNTEwMzZcIixcbiAgXCI1MTAzN1wiLFxuICBcIjUxMDQxXCIsXG4gIFwiNTEwNDNcIixcbiAgXCI1MTA0NVwiLFxuICBcIjUxMDQ3XCIsXG4gIFwiNTEwNDlcIixcbiAgXCI1MTA1MVwiLFxuICBcIjUxMDUzXCIsXG4gIFwiNTEwNTdcIixcbiAgXCI1MTA1OVwiLFxuICBcIjUxMDYxXCIsXG4gIFwiNTEwNjNcIixcbiAgXCI1MTA2NVwiLFxuICBcIjUxMDY3XCIsXG4gIFwiNTEwNjlcIixcbiAgXCI1MTA3MVwiLFxuICBcIjUxMDczXCIsXG4gIFwiNTEwNzVcIixcbiAgXCI1MTA3N1wiLFxuICBcIjUxMDc5XCIsXG4gIFwiNTEwODFcIixcbiAgXCI1MTA4M1wiLFxuICBcIjUxMDg1XCIsXG4gIFwiNTEwODdcIixcbiAgXCI1MTA4OVwiLFxuICBcIjUxMDkxXCIsXG4gIFwiNTEwOTNcIixcbiAgXCI1MTA5NVwiLFxuICBcIjUxMDk3XCIsXG4gIFwiNTEwOTlcIixcbiAgXCI1MTEwMVwiLFxuICBcIjUxMTAzXCIsXG4gIFwiNTExMDVcIixcbiAgXCI1MTEwN1wiLFxuICBcIjUxMTA5XCIsXG4gIFwiNTExMTFcIixcbiAgXCI1MTExM1wiLFxuICBcIjUxMTE1XCIsXG4gIFwiNTExMTdcIixcbiAgXCI1MTExOVwiLFxuICBcIjUxMTIxXCIsXG4gIFwiNTExMjVcIixcbiAgXCI1MTEyN1wiLFxuICBcIjUxMTMxXCIsXG4gIFwiNTExMzNcIixcbiAgXCI1MTEzNVwiLFxuICBcIjUxMTM3XCIsXG4gIFwiNTExMzlcIixcbiAgXCI1MTE0MVwiLFxuICBcIjUxMTQzXCIsXG4gIFwiNTExNDVcIixcbiAgXCI1MTE0N1wiLFxuICBcIjUxMTQ5XCIsXG4gIFwiNTExNTNcIixcbiAgXCI1MTE1NVwiLFxuICBcIjUxMTU3XCIsXG4gIFwiNTExNTlcIixcbiAgXCI1MTE2MVwiLFxuICBcIjUxMTYzXCIsXG4gIFwiNTExNjVcIixcbiAgXCI1MTE2N1wiLFxuICBcIjUxMTY5XCIsXG4gIFwiNTExNzFcIixcbiAgXCI1MTE3M1wiLFxuICBcIjUxMTc1XCIsXG4gIFwiNTExNzdcIixcbiAgXCI1MTE3OVwiLFxuICBcIjUxMTgxXCIsXG4gIFwiNTExODNcIixcbiAgXCI1MTE4NVwiLFxuICBcIjUxMTg3XCIsXG4gIFwiNTExOTFcIixcbiAgXCI1MTE5M1wiLFxuICBcIjUxMTk1XCIsXG4gIFwiNTExOTdcIixcbiAgXCI1MTE5OVwiLFxuXTtcblxuLy8gUmVnaW9uc1xuY29uc3QgTm9ydGhlcm5SZWdpb24gPSB7XG4gIENTVXM6IFtDU1UxNiwgQ1NVMTcsIENTVTE4LCBDU1UxOSwgQ1NVMjAsIENTVTI2LCBDU1UzMV0sXG4gIG5hbWU6IFwiTm9ydGhlcm4gUmVnaW9uXCIsXG4gIHNsdWc6IFwibm9ydGhcIixcbn07XG5cbmNvbnN0IFNvdXRoZXJuUmVnaW9uID0ge1xuICBDU1VzOiBbQ1NVNSwgQ1NVNiwgQ1NVMTEsIENTVTEyLCBDU1UxM10sXG4gIG5hbWU6IFwiU291dGhlcm4gUmVnaW9uXCIsXG4gIHNsdWc6IFwic291dGhcIixcbn07XG5cbmNvbnN0IEVhc3Rlcm5SZWdpb24gPSB7XG4gIENTVXM6IFtDU1UxLCBDU1UyLCBDU1UyQSwgQ1NVMywgQ1NVNF0sXG4gIG5hbWU6IFwiRWFzdGVybiBSZWdpb25cIixcbiAgc2x1ZzogXCJlYXN0XCIsXG59O1xuXG5jb25zdCBXZXN0ZXJuUmVnaW9uID0ge1xuICBDU1VzOiBbQ1NVMjEsIENTVTI3LCBDU1UyOCwgQ1NVMjksIENTVTMwXSxcbiAgbmFtZTogXCJXZXN0ZXJuIFJlZ2lvblwiLFxuICBzbHVnOiBcIndlc3RcIixcbn07XG5cbmNvbnN0IENlbnRyYWxSZWdpb24gPSB7XG4gIENTVXM6IFtDU1U3LCBDU1U4LCBDU1U5LCBDU1UxNCwgQ1NVMTVdLFxuICBuYW1lOiBcIkNlbnRyYWwgUmVnaW9uXCIsXG4gIHNsdWc6IFwiY2VudHJhbFwiLFxufTtcblxuY29uc3QgTWlkV2VzdFJlZ2lvbiA9IHtcbiAgQ1NVczogW0NTVTEwLCBDU1UyMiwgQ1NVMjMsIENTVTI0LCBDU1UyNV0sXG4gIG5hbWU6IFwiTWlkd2VzdCBSZWdpb25cIixcbiAgc2x1ZzogXCJtaWR3ZXN0XCIsXG59O1xuXG5leHBvcnQgY29uc3QgQ1NVU3RydWN0dXJlID0gW1xuICBFYXN0ZXJuUmVnaW9uLFxuICBTb3V0aGVyblJlZ2lvbixcbiAgQ2VudHJhbFJlZ2lvbixcbiAgTm9ydGhlcm5SZWdpb24sXG4gIFdlc3Rlcm5SZWdpb24sXG4gIE1pZFdlc3RSZWdpb24sXG5dO1xuXG5leHBvcnQgY29uc3QgcmVnaW9uQ1NVcyA9IHtcbiAgTm9ydGhlcm5SZWdpb24sXG4gIFNvdXRoZXJuUmVnaW9uLFxuICBFYXN0ZXJuUmVnaW9uLFxuICBXZXN0ZXJuUmVnaW9uLFxuICBDZW50cmFsUmVnaW9uLFxuICBNaWRXZXN0UmVnaW9uLFxufTtcblxuZXhwb3J0IGNvbnN0IGlzTG9jYWxpdHlJblJlZ2lvbiA9IChyZWdpb24sIGxvY2FsaXR5KSA9PiB7XG4gIGxldCBmb3VuZCA9IGZhbHNlO1xuICByZWdpb24uQ1NVcy5mb3JFYWNoKChjc3UpID0+IHtcbiAgICBpZiAoY3N1LmxvY2FsaXRpZXMuaW5jbHVkZXMobG9jYWxpdHkpKSB7XG4gICAgICBmb3VuZCA9IHRydWU7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGZvdW5kO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzTG9jYWxpdHlJblJlZ2lvbklEID0gKHJlZ2lvbklELCBsb2NhbGl0eSkgPT4ge1xuICBjb25zdCByZWdpb24gPSBDU1VTdHJ1Y3R1cmUuZmluZCgocmVnaW9uKSA9PiByZWdpb24uc2x1ZyA9PT0gcmVnaW9uSUQpO1xuICByZXR1cm4gaXNMb2NhbGl0eUluUmVnaW9uKHJlZ2lvbiwgbG9jYWxpdHkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzTG9jYWxpdHlJbkNTVUlEID0gKGNzdUlELCBsb2NhbGl0eSkgPT4ge1xuICBjb25zdCBjc3UgPSBzb3J0ZWRDU1VzLmZpbmQoKGNzdSkgPT4gY3N1LnNsdWcgPT09IGNzdUlEKTtcbiAgcmV0dXJuIGNzdS5sb2NhbGl0aWVzLmluY2x1ZGVzKGxvY2FsaXR5KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjc3VMaXN0RnJvbUZJUFMgPSAoZmlwc0xpc3QpID0+IHtcbiAgY29uc3QgY3N1TmFtZXMgPSBuZXcgU2V0KCk7XG4gIHNvcnRlZENTVXMuZm9yRWFjaCgoY3N1KSA9PiB7XG4gICAgaWYgKGNzdS5sb2NhbGl0aWVzLnNvbWUoKGxvY2FsaXR5KSA9PiBmaXBzTGlzdC5pbmNsdWRlcyhsb2NhbGl0eSkpKSB7XG4gICAgICBjc3VOYW1lcy5hZGQoY3N1Lm5hbWUpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBbLi4uY3N1TmFtZXNdO1xufTtcbiIsImltcG9ydCB7IEFQSSB9IGZyb20gXCIuLi8uLi9hcGkvYXBpLmpzXCI7XG5pbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCB7IHJlZ2lvbkNTVXMsIHNvcnRlZENTVXMsIGlzTG9jYWxpdHlJblJlZ2lvbiB9IGZyb20gXCIuLi9jc3UuanNcIjtcblxuY29uc3QgbG9jYWxpdGllc0Zyb21SZWdpb24gPSAocmVnaW9uKSA9PiB7XG4gIGxldCBsb2NhbGl0aWVzID0gW107XG4gIHJlZ2lvbi5DU1VzLmZvckVhY2goKGNzdSkgPT4ge1xuICAgIGxvY2FsaXRpZXMgPSBsb2NhbGl0aWVzLmNvbmNhdChjc3UubG9jYWxpdGllcyk7XG4gIH0pO1xuICByZXR1cm4gbG9jYWxpdGllcztcbn07XG5cbmNvbnN0IHJlZ2lvbnMgPSB7XG4gIDA6IHtcbiAgICBzdGF0ZXM6IGxvY2FsaXRpZXNGcm9tUmVnaW9uKHJlZ2lvbkNTVXMuTm9ydGhlcm5SZWdpb24pLFxuICAgIG5hbWU6IFwiTm9ydGhlcm4gUmVnaW9uXCIsXG4gICAgY29sb3I6IGNvbG9ycy5Ob3J0aGVybkNvbG9yLFxuICB9LFxuICAxOiB7XG4gICAgc3RhdGVzOiBsb2NhbGl0aWVzRnJvbVJlZ2lvbihyZWdpb25DU1VzLkNlbnRyYWxSZWdpb24pLFxuICAgIG5hbWU6IFwiQ2VudHJhbCBSZWdpb25cIixcbiAgICBjb2xvcjogY29sb3JzLkNlbnRyYWxDb2xvcixcbiAgfSxcbiAgMjoge1xuICAgIHN0YXRlczogbG9jYWxpdGllc0Zyb21SZWdpb24ocmVnaW9uQ1NVcy5XZXN0ZXJuUmVnaW9uKSxcbiAgICBuYW1lOiBcIldlc3Rlcm4gUmVnaW9uXCIsXG4gICAgY29sb3I6IGNvbG9ycy5XZXN0ZXJuQ29sb3IsXG4gIH0sXG4gIDM6IHtcbiAgICBzdGF0ZXM6IGxvY2FsaXRpZXNGcm9tUmVnaW9uKHJlZ2lvbkNTVXMuU291dGhlcm5SZWdpb24pLFxuICAgIG5hbWU6IFwiU291dGhlcm4gUmVnaW9uXCIsXG4gICAgY29sb3I6IGNvbG9ycy5Tb3V0aGVybkNvbG9yLFxuICB9LFxuICA0OiB7XG4gICAgc3RhdGVzOiBsb2NhbGl0aWVzRnJvbVJlZ2lvbihyZWdpb25DU1VzLkVhc3Rlcm5SZWdpb24pLFxuICAgIG5hbWU6IFwiRWFzdGVybiBSZWdpb25cIixcbiAgICBjb2xvcjogY29sb3JzLkVhc3Rlcm5Db2xvcixcbiAgfSxcbiAgNToge1xuICAgIHN0YXRlczogbG9jYWxpdGllc0Zyb21SZWdpb24ocmVnaW9uQ1NVcy5NaWRXZXN0UmVnaW9uKSxcbiAgICBuYW1lOiBcIk1pZHdlc3QgUmVnaW9uXCIsXG4gICAgY29sb3I6IGNvbG9ycy5NaWRXZXN0ZXJuQ29sb3IsXG4gIH0sXG59O1xuXG5jb25zdCByZWdpb25Db2xvciA9IChsb2NhbGl0eSkgPT4ge1xuICBpZiAoaXNMb2NhbGl0eUluUmVnaW9uKHJlZ2lvbkNTVXMuTm9ydGhlcm5SZWdpb24sIGxvY2FsaXR5KSkge1xuICAgIHJldHVybiBjb2xvcnMuTm9ydGhlcm5Db2xvcjtcbiAgfSBlbHNlIGlmIChpc0xvY2FsaXR5SW5SZWdpb24ocmVnaW9uQ1NVcy5DZW50cmFsUmVnaW9uLCBsb2NhbGl0eSkpIHtcbiAgICByZXR1cm4gY29sb3JzLkNlbnRyYWxDb2xvcjtcbiAgfSBlbHNlIGlmIChpc0xvY2FsaXR5SW5SZWdpb24ocmVnaW9uQ1NVcy5XZXN0ZXJuUmVnaW9uLCBsb2NhbGl0eSkpIHtcbiAgICByZXR1cm4gY29sb3JzLldlc3Rlcm5Db2xvcjtcbiAgfSBlbHNlIGlmIChpc0xvY2FsaXR5SW5SZWdpb24ocmVnaW9uQ1NVcy5Tb3V0aGVyblJlZ2lvbiwgbG9jYWxpdHkpKSB7XG4gICAgcmV0dXJuIGNvbG9ycy5Tb3V0aGVybkNvbG9yO1xuICB9IGVsc2UgaWYgKGlzTG9jYWxpdHlJblJlZ2lvbihyZWdpb25DU1VzLkVhc3Rlcm5SZWdpb24sIGxvY2FsaXR5KSkge1xuICAgIHJldHVybiBjb2xvcnMuRWFzdGVybkNvbG9yO1xuICB9IGVsc2UgaWYgKGlzTG9jYWxpdHlJblJlZ2lvbihyZWdpb25DU1VzLk1pZFdlc3RSZWdpb24sIGxvY2FsaXR5KSkge1xuICAgIHJldHVybiBjb2xvcnMuTWlkV2VzdGVybkNvbG9yO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBcIiMwMDAwMDBcIjtcbiAgfVxufTtcblxuY29uc3QgbG9jYWxpdHlQYWdlUGF0aCA9ICgpID0+IHtcbiAgY29uc3QgcGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5pbmNsdWRlcyhcInBhZ2VzXCIpKSB7XG4gICAgcmV0dXJuIFwiLi4vbG9jYWxpdHkvaW5kZXguaHRtbFwiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBcIi4vcGFnZXMvbG9jYWxpdHkvaW5kZXguaHRtbFwiO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0TWFwQ1NVUmVnaW9ucyA9ICgpID0+IHtcbiAgLy8gQHRzLWlnbm9yZSAoZ2xvYmFsIHZhcmlhYmxlKVxuICBzaW1wbGVtYXBzX3N0YXRlbWFwX21hcGRhdGEucmVnaW9ucyA9IHJlZ2lvbnM7XG5cbiAgLy8gQHRzLWlnbm9yZSAoZ2xvYmFsIHZhcmlhYmxlKVxuICBjb25zdCBsb2NhbGl0aWVzID0gc2ltcGxlbWFwc19zdGF0ZW1hcF9tYXBkYXRhLnN0YXRlX3NwZWNpZmljO1xuICBmb3IgKGxldCBsb2NhbGl0eSBpbiBsb2NhbGl0aWVzKSB7XG4gICAgbG9jYWxpdGllc1tsb2NhbGl0eV0uY29sb3IgPSByZWdpb25Db2xvcihsb2NhbGl0eSk7XG4gICAgY29uc3QgcGF0aCA9IGxvY2FsaXR5UGFnZVBhdGgoKTtcbiAgICBsb2NhbGl0aWVzW2xvY2FsaXR5XS51cmwgPSBgJHtwYXRofT9pZD0ke2xvY2FsaXR5fWA7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBzZXRNYXBMb2NhdGlvbnMgPSAocHJvdmlkZXJJRCkgPT4ge1xuICBjb25zdCBsb2NhdGlvbnMgPSBBUEkuZ2V0QWxsTG9jYXRpb25zKHByb3ZpZGVySUQpO1xuXG4gIHZhciBvZmZpY2VVUkwgPSBcInBhZ2VzL3Byb3ZpZGVyL2luZGV4Lmh0bWw/aWQ9XCI7XG4gIGxvY2F0aW9ucy5mb3JFYWNoKChsb2NhdGlvbiwgaW5kZXgpID0+IHtcbiAgICAvLyBAdHMtaWdub3JlIChnbG9iYWwgdmFyaWFibGUpXG4gICAgc2ltcGxlbWFwc19zdGF0ZW1hcF9tYXBkYXRhLmxvY2F0aW9uc1tpbmRleF0gPSB7XG4gICAgICBsYXQ6IGxvY2F0aW9uLmxhdCxcbiAgICAgIGxuZzogbG9jYXRpb24ubG5nLFxuICAgICAgbmFtZTogbG9jYXRpb24ucHJvdmlkZXJOYW1lLFxuICAgICAgY29sb3I6IGNvbG9ycy5FQkFCbHVlLFxuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgIGxvY2F0aW9uLnN0cmVldCArXG4gICAgICAgIFwiPGJyPlwiICtcbiAgICAgICAgbG9jYXRpb24uY2l0eSArXG4gICAgICAgIFwiLCBcIiArXG4gICAgICAgIGxvY2F0aW9uLnN0YXRlICtcbiAgICAgICAgXCIgXCIgK1xuICAgICAgICBsb2NhdGlvbi56aXAgK1xuICAgICAgICBcIjxicj5cIiArXG4gICAgICAgIGxvY2F0aW9uLnBob25lLFxuICAgICAgdXJsOiBvZmZpY2VVUkwgKyBsb2NhdGlvbi5wcm92aWRlcklkLFxuICAgICAgc2l6ZTogXCJkZWZhdWx0XCIsXG4gICAgICB0eXBlOiBcImRlZmF1bHRcIixcbiAgICAgIGltYWdlX3VybDogXCJkZWZhdWx0XCIsXG4gICAgICBvcGFjaXR5OiBcImRlZmF1bHRcIixcbiAgICB9O1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRSZWdpb25CeUNTVSA9IChjc3UpID0+IHtcbiAgLy8gQHRzLWlnbm9yZSAoZ2xvYmFsIHZhcmlhYmxlKVxuICBzaW1wbGVtYXBzX3N0YXRlbWFwX21hcGRhdGEucmVnaW9ucyA9IHt9O1xuICAvLyBpdGVyYXRlIG92ZXIgYWxsIENTVXMgYW5kIHNldCB0aGVtIGFzIHJlZ2lvbnNcbiAgc29ydGVkQ1NVcy5mb3JFYWNoKChjc3UpID0+IHtcbiAgICAvLyBAdHMtaWdub3JlIChnbG9iYWwgdmFyaWFibGUpXG4gICAgc2ltcGxlbWFwc19zdGF0ZW1hcF9tYXBkYXRhLnJlZ2lvbnNbY3N1LnNsdWddID0ge1xuICAgICAgc3RhdGVzOiBjc3UubG9jYWxpdGllcyxcbiAgICAgIG5hbWU6IGNzdS5uYW1lLFxuICAgICAgdXJsOiBcImluZGV4Lmh0bWw/aWQ9XCIgKyBjc3Uuc2x1ZyxcbiAgICB9O1xuICB9KTtcblxuICAvLyBAdHMtaWdub3JlIChnbG9iYWwgdmFyaWFibGUpXG4gIHNpbXBsZW1hcHNfc3RhdGVtYXBfbWFwZGF0YS5tYWluX3NldHRpbmdzLmluaXRpYWxfem9vbSA9IGNzdS5zbHVnO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEFsbERlZmF1bHRDb2xvciA9ICgpID0+IHtcbiAgLy8gQHRzLWlnbm9yZSAoZ2xvYmFsIHZhcmlhYmxlKVxuICBjb25zdCBsb2NhbGl0aWVzID0gc2ltcGxlbWFwc19zdGF0ZW1hcF9tYXBkYXRhLnN0YXRlX3NwZWNpZmljO1xuICBmb3IgKGxldCBsb2NhbGl0eSBpbiBsb2NhbGl0aWVzKSB7XG4gICAgbG9jYWxpdGllc1tsb2NhbGl0eV0uY29sb3IgPSBcImRlZmF1bHRcIjtcbiAgfVxuICAvL3NhbWUgZm9yIHJlZ2lvbnNcbiAgLy8gQHRzLWlnbm9yZSAoZ2xvYmFsIHZhcmlhYmxlKVxuICBjb25zdCByZWdpb25zID0gc2ltcGxlbWFwc19zdGF0ZW1hcF9tYXBkYXRhLnJlZ2lvbnM7XG4gIGZvciAobGV0IHJlZ2lvbiBpbiByZWdpb25zKSB7XG4gICAgcmVnaW9uc1tyZWdpb25dLmNvbG9yID0gXCJkZWZhdWx0XCI7XG4gIH1cbn07XG5cbi8vIHdvcmsgYXJvdW5kIGZvciB0aGUgem9vbSBmdW5jdGlvblxuLy8gc2ltcGxlbWFwcyBtZXRob2RzIG5vdCBhdmFpbGFibGUgcHJlLWxvYWRcbmV4cG9ydCBjb25zdCB6b29tVG9GSVBTID0gKGZpcHNJRCkgPT4ge1xuICAvLyBAdHMtaWdub3JlXG4gIHNpbXBsZW1hcHNfc3RhdGVtYXBfbWFwZGF0YS5yZWdpb25zID0ge307XG4gIC8vYWRkIGN1cnJlbnQgbG9jYWxpdHkgdG8gdGhlIG9uZSByZWdpb25cbiAgLy8gQHRzLWlnbm9yZVxuICBzaW1wbGVtYXBzX3N0YXRlbWFwX21hcGRhdGEucmVnaW9uc1tcIjBcIl0gPSB7XG4gICAgc3RhdGVzOiBbZmlwc0lEXSxcbiAgICBuYW1lOiBcIkZvY3VzXCIsXG4gIH07XG4gIC8vIEB0cy1pZ25vcmVcbiAgc2ltcGxlbWFwc19zdGF0ZW1hcF9tYXBkYXRhLm1haW5fc2V0dGluZ3MuaW5pdGlhbF96b29tID0gMDtcbn07XG5cbmV4cG9ydCBjb25zdCB6b29tVG9SZWdpb24gPSAocmVnaW9uSUQpID0+IHtcbiAgLy8gQHRzLWlnbm9yZVxuICBzaW1wbGVtYXBzX3N0YXRlbWFwX21hcGRhdGEubWFpbl9zZXR0aW5ncy5pbml0aWFsX3pvb20gPSByZWdpb25JRDtcbn07XG5cbmV4cG9ydCBjb25zdCBjb2xvckZJUFMgPSAoZmlwc0xpc3QsIGNvbG9yKSA9PiB7XG4gIGlmICghZmlwc0xpc3QpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gQHRzLWlnbm9yZVxuICBjb25zdCBsb2NhbGl0aWVzID0gc2ltcGxlbWFwc19zdGF0ZW1hcF9tYXBkYXRhLnN0YXRlX3NwZWNpZmljO1xuICBmaXBzTGlzdC5mb3JFYWNoKChmaXBzKSA9PiB7XG4gICAgbG9jYWxpdGllc1tmaXBzXS5jb2xvciA9IGNvbG9yO1xuICAgIGxvY2FsaXRpZXNbZmlwc10uaG92ZXJfY29sb3IgPSBjb2xvcjtcbiAgfSk7XG59O1xuXG5jb25zdCBsYW5ndWFnZXNBcnJheUV4YW1wbGUgPSBbXG4gIHsgU3BhbmlzaDogW1wiNTEwOTJcIiwgXCI1MTA5M1wiLCBcIjUxMDk0XCIsIFwiNTEwOTVcIiwgXCI1MTA5NlwiXSB9LFxuICB7IEZyZW5jaDogW1wiNTEwOTJcIiwgXCI1MTA5N1wiLCBcIjUxMDk4XCIsIFwiNTEwOTlcIiwgXCI1MTEwMFwiLCBcIjUxMTAxXCJdIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgYWRkTGFuZ3VhZ2VEZXNjcmlwdGlvbnMgPSAobGFuZ3VhZ2VzQXJyYXkpID0+IHtcbiAgY29uc3QgZmlwc01hcCA9IG5ldyBNYXAoKTtcbiAgbGFuZ3VhZ2VzQXJyYXkuZm9yRWFjaCgobGFuZ09iaikgPT4ge1xuICAgIE9iamVjdC5rZXlzKGxhbmdPYmopLmZvckVhY2goKGxhbmcpID0+IHtcbiAgICAgIGxhbmdPYmpbbGFuZ10uZm9yRWFjaCgoZmlwcykgPT4ge1xuICAgICAgICBpZiAoZmlwc01hcC5oYXMoZmlwcykpIHtcbiAgICAgICAgICBmaXBzTWFwLmdldChmaXBzKS5hZGQobGFuZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmlwc01hcC5zZXQoZmlwcywgbmV3IFNldChbbGFuZ10pKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBmaXBzTWFwLmZvckVhY2goKGxhbmd1YWdlcywgZmlwcykgPT4ge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBzaW1wbGVtYXBzX3N0YXRlbWFwX21hcGRhdGEuc3RhdGVfc3BlY2lmaWNbZmlwc10uZGVzY3JpcHRpb24gPVxuICAgICAgXCJBdmFpbGFibGUgaW4gXCIgKyBbLi4ubGFuZ3VhZ2VzXS5qb2luKFwiLCBcIik7XG4gIH0pO1xufTtcbiIsImltcG9ydCB7IHNvcnRlZENTVXMgfSBmcm9tIFwiLi4vLi4vbGliL2NzdS5qc1wiO1xuaW1wb3J0IHsgQVBJIH0gZnJvbSBcIi4uLy4uL2FwaS9hcGkuanNcIjtcblxuY29uc3QgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeVN0cmluZyk7XG5jb25zdCBjc3VJRCA9IHVybFBhcmFtcy5nZXQoXCJpZFwiKTtcblxuZXhwb3J0IGNvbnN0IHRoaXNDU1UgPSBzb3J0ZWRDU1VzLmZpbmQoKGNzdSkgPT4gY3N1LnNsdWcgPT09IGNzdUlEKTtcbmV4cG9ydCBjb25zdCBDU1VQcm92aWRlcnMgPSBBUEkuZ2V0QWxsUHJvdmlkZXJzQnlDU1UodGhpc0NTVSk7XG5leHBvcnQgY29uc3QgQ1NVU2VydmljZXMgPSBBUEkuZ2V0QWxsU2VydmljZU5hbWVzQnlDU1UodGhpc0NTVSk7XG5leHBvcnQgY29uc3QgcHJvdmlkZXJTZXJ2aWNlTGlzdCA9IChwcm9pdmRlcklkLCBjc3UpID0+XG4gIEFQSS5nZXRBbGxTZXJ2aWNlc0J5UHJvdmlkZXJJbkNTVShwcm9pdmRlcklkLCBjc3UpO1xuZXhwb3J0IGNvbnN0IHNlcnZpY2VQcm92aWRlcnNMaXN0ID0gKHNlcnZpY2VOYW1lLCBjc3UpID0+XG4gIEFQSS5nZXRBbGxQcm92aWRlcnNPZlNlcnZpY2VJbkNTVShzZXJ2aWNlTmFtZSwgY3N1KTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcbiAgdGhpc0NTVSxcbiAgQ1NVUHJvdmlkZXJzLFxuICBDU1VTZXJ2aWNlcyxcbiAgcHJvdmlkZXJTZXJ2aWNlTGlzdCxcbiAgc2VydmljZVByb3ZpZGVyc0xpc3QsXG59IGZyb20gXCIuL2FwaS5qc1wiO1xuaW1wb3J0IHsgc2V0UmVnaW9uQnlDU1UgfSBmcm9tIFwiLi4vLi4vbGliL3NpbXBsZW1hcHMvdXRpbHMuanNcIjtcblxuc2V0UmVnaW9uQnlDU1UodGhpc0NTVSk7XG5cbmNvbnN0IGNzdU5hbWVTcGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjc3VOYW1lXCIpO1xuY3N1TmFtZVNwYW4uaW5uZXJIVE1MID0gdGhpc0NTVS5uYW1lO1xuXG5jb25zdCBwcm92aWRlckxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb3ZpZGVyTGlzdFwiKTtcbkNTVVByb3ZpZGVycy5mb3JFYWNoKChwcm92aWRlciwga2V5KSA9PiB7XG4gIGNvbnN0IHByb3ZpZGVyTEkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIHByb3ZpZGVyTEkuY2xhc3NMaXN0LmFkZChcImViYUJsdWVcIik7XG4gIHByb3ZpZGVyTEkuaW5uZXJIVE1MID0gYDxhIGhyZWY9Jy4uL3Byb3ZpZGVyL2luZGV4Lmh0bWw/aWQ9JHtrZXl9Jz4ke3Byb3ZpZGVyfTwvYT5gO1xuICBwcm92aWRlckxpc3QuYXBwZW5kQ2hpbGQocHJvdmlkZXJMSSk7XG4gIGNvbnN0IHByb3ZpZGVyU2VydmljZXMgPSBwcm92aWRlclNlcnZpY2VMaXN0KGtleSwgdGhpc0NTVSk7XG5cbiAgY29uc3QgcHJvdmlkZXJTZXJ2aWNlc0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gIHByb3ZpZGVyU2VydmljZXMuZm9yRWFjaCgoc2VydmljZSkgPT4ge1xuICAgIGNvbnN0IHNlcnZpY2VMSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICBzZXJ2aWNlTEkuaW5uZXJUZXh0ID0gc2VydmljZTtcbiAgICBwcm92aWRlclNlcnZpY2VzTGlzdC5hcHBlbmRDaGlsZChzZXJ2aWNlTEkpO1xuICB9KTtcbiAgcHJvdmlkZXJMaXN0LmFwcGVuZENoaWxkKHByb3ZpZGVyU2VydmljZXNMaXN0KTtcbn0pO1xuXG5jb25zdCBzZXJ2aWNlTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VydmljZUxpc3RcIik7XG5DU1VTZXJ2aWNlcy5mb3JFYWNoKChzZXJ2aWNlKSA9PiB7XG4gIGNvbnN0IHNlcnZpY2VMSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgc2VydmljZUxJLmNsYXNzTGlzdC5hZGQoXCJlYmFCbHVlXCIpO1xuICBzZXJ2aWNlTEkuaW5uZXJUZXh0ID0gc2VydmljZTtcbiAgc2VydmljZUxpc3QuYXBwZW5kQ2hpbGQoc2VydmljZUxJKTtcbiAgY29uc3Qgc2VydmljZVByb3ZpZGVycyA9IHNlcnZpY2VQcm92aWRlcnNMaXN0KHNlcnZpY2UsIHRoaXNDU1UpO1xuXG4gIGNvbnN0IHNlcnZpY2VQcm92aWRlcnNVTCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgc2VydmljZVByb3ZpZGVycy5mb3JFYWNoKChwcm92aWRlciwga2V5KSA9PiB7XG4gICAgY29uc3QgcHJvdmlkZXJMSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICBwcm92aWRlckxJLmlubmVySFRNTCA9IGA8YSBocmVmPScuLi9wcm92aWRlci9pbmRleC5odG1sP2lkPSR7a2V5fSc+JHtwcm92aWRlcn08L2E+YDtcbiAgICBzZXJ2aWNlUHJvdmlkZXJzVUwuYXBwZW5kQ2hpbGQocHJvdmlkZXJMSSk7XG4gIH0pO1xuICBzZXJ2aWNlTGlzdC5hcHBlbmRDaGlsZChzZXJ2aWNlUHJvdmlkZXJzVUwpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=