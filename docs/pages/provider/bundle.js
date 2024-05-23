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

/***/ "./src/lib/getXML.js":
/*!***************************!*\
  !*** ./src/lib/getXML.js ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//connect to data file
const getXML = async (filename) => {
  const Connect = new XMLHttpRequest();
  Connect.open("GET", filename, false);
  Connect.setRequestHeader("Content-Type", "text/xml");
  Connect.send(null);
  return Connect.responseXML;
};

const data = await getXML("/data/dsps.xml");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

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

/***/ "./src/lib/utils.js":
/*!**************************!*\
  !*** ./src/lib/utils.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   removeDuplicates: () => (/* binding */ removeDuplicates)
/* harmony export */ });
const removeDuplicates = (num) => {
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
};


/***/ }),

/***/ "./src/pages/provider/api.js":
/*!***********************************!*\
  !*** ./src/pages/provider/api.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   allFIPS: () => (/* binding */ allFIPS),
/* harmony export */   providerID: () => (/* binding */ providerID),
/* harmony export */   providerInfo: () => (/* binding */ providerInfo),
/* harmony export */   providerLanguages: () => (/* binding */ providerLanguages),
/* harmony export */   serviceFIPS: () => (/* binding */ serviceFIPS),
/* harmony export */   serviceNames: () => (/* binding */ serviceNames)
/* harmony export */ });
/* harmony import */ var _api_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api/api.js */ "./src/api/api.js");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const providerID = urlParams.get("id");

const serviceFIPS = (/** @type {string} */ serviceName) => {
  return _api_api_js__WEBPACK_IMPORTED_MODULE_0__.API.getServiceMapFIPS({ providerID, serviceName });
};

const serviceNames = _api_api_js__WEBPACK_IMPORTED_MODULE_0__.API.getProviderServices(providerID);
const providerInfo = _api_api_js__WEBPACK_IMPORTED_MODULE_0__.API.getProviderInfo(providerID);
const allFIPS = _api_api_js__WEBPACK_IMPORTED_MODULE_0__.API.getAllFIPS(providerID);
const providerLanguages = _api_api_js__WEBPACK_IMPORTED_MODULE_0__.API.getAllLanguages(providerID);


/***/ }),

/***/ "./src/pages/provider/index.js":
/*!*************************************!*\
  !*** ./src/pages/provider/index.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_getXML_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/getXML.js */ "./src/lib/getXML.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ "./src/pages/provider/api.js");
/* harmony import */ var _lib_colors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/colors.js */ "./src/lib/colors.js");
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/utils.js */ "./src/lib/utils.js");
/* harmony import */ var _lib_csu_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/csu.js */ "./src/lib/csu.js");
/* harmony import */ var _lib_simplemaps_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/simplemaps/utils.js */ "./src/lib/simplemaps/utils.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_getXML_js__WEBPACK_IMPORTED_MODULE_0__]);
_lib_getXML_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







const { RegColor, TravelColor } = _lib_colors_js__WEBPACK_IMPORTED_MODULE_2__["default"];

const {
  providerName,
  contactName,
  contactEmail,
  website,
  lastUpdated,
  mapZoom,
} = _api_js__WEBPACK_IMPORTED_MODULE_1__.providerInfo;

const lastUpdatedDateParts = lastUpdated.split("-");
const lastUpdatedText = `${lastUpdatedDateParts[1]}/${lastUpdatedDateParts[2]}/${lastUpdatedDateParts[0]}`;

(0,_lib_simplemaps_utils_js__WEBPACK_IMPORTED_MODULE_5__.setMapCSURegions)();
(0,_lib_simplemaps_utils_js__WEBPACK_IMPORTED_MODULE_5__.setAllDefaultColor)();
(0,_lib_simplemaps_utils_js__WEBPACK_IMPORTED_MODULE_5__.setMapLocations)(_api_js__WEBPACK_IMPORTED_MODULE_1__.providerID);
(0,_lib_simplemaps_utils_js__WEBPACK_IMPORTED_MODULE_5__.zoomToRegion)(mapZoom);

const providerNameSpan = document.getElementsByName("providerName");
providerNameSpan.forEach((span) => (span.innerText = providerName));

const providerInfoDiv = document.getElementById("providerInfo");
providerInfoDiv.innerHTML =
  "<p>Last Updated: " +
  lastUpdatedText +
  "</p>" +
  "<p>Website: <a href='" +
  website +
  "'>" +
  website +
  "</a></p>" +
  "<p>Contact: " +
  contactName +
  "</p>" +
  "<p>Email: <a href='mailto:" +
  contactEmail +
  "'>" +
  contactEmail +
  "</a></p>";

const serviceSelect = document.getElementsByName("serviceSelect")[0];
_api_js__WEBPACK_IMPORTED_MODULE_1__.serviceNames.forEach((serviceName) => {
  const serviceOption = document.createElement("option");
  serviceOption.value = serviceName;
  serviceOption.text = serviceName;
  serviceSelect.appendChild(serviceOption);
});

const displayService = () => {
  const selectedServiceName =
    // @ts-ignore
    serviceSelect.options[serviceSelect.selectedIndex].text;
  const fipsLists = (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.serviceFIPS)(selectedServiceName);
  (0,_lib_simplemaps_utils_js__WEBPACK_IMPORTED_MODULE_5__.colorFIPS)(fipsLists.available, RegColor);
  (0,_lib_simplemaps_utils_js__WEBPACK_IMPORTED_MODULE_5__.colorFIPS)(fipsLists.limited, TravelColor);
  (0,_lib_simplemaps_utils_js__WEBPACK_IMPORTED_MODULE_5__.addLanguageDescriptions)(fipsLists.languages);
  // @ts-ignore
  if (typeof simplemaps_statemap.refresh === "function") {
    // @ts-ignore
    simplemaps_statemap.refresh();
  }
};
serviceSelect.addEventListener("change", displayService);
displayService();

const csuList = (0,_lib_csu_js__WEBPACK_IMPORTED_MODULE_4__.csuListFromFIPS)(_api_js__WEBPACK_IMPORTED_MODULE_1__.allFIPS);
const providerCSUList = document.getElementById("providerCSUs");
csuList.forEach((csu) => {
  const csuLI = document.createElement("li");
  csuLI.innerText = csu;
  providerCSUList.appendChild(csuLI);
});

const countyList = document.getElementById("providerCounties");
const cityList = document.getElementById("providerCities");
_api_js__WEBPACK_IMPORTED_MODULE_1__.allFIPS.forEach((fips) => {
  const localityLI = document.createElement("li");
  // @ts-ignore
  localityLI.innerText = simplemaps_statemap_mapdata.state_specific[fips].name;
  if (Number(fips) > 51500) {
    cityList.appendChild(localityLI);
  } else {
    countyList.appendChild(localityLI);
  }
});

const providerServiceList = document.getElementById("providerServices");
_api_js__WEBPACK_IMPORTED_MODULE_1__.serviceNames.forEach((serviceName) => {
  const serviceLI = document.createElement("li");
  serviceLI.innerText = serviceName;
  providerServiceList.appendChild(serviceLI);
});

const languageList = document.getElementById("providerLanguages");
_api_js__WEBPACK_IMPORTED_MODULE_1__.providerLanguages.forEach((language) => {
  const languageLI = document.createElement("li");
  languageLI.innerText = language;
  languageList.appendChild(languageLI);
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pages/provider/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMvcHJvdmlkZXIvYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUG1DO0FBQ1U7QUFDUzs7QUFFL0M7QUFDUCxFQUFFLDhDQUFNLFNBQVMsbURBQVcsV0FBVyw0Q0FBTyxTQUFTLHNEQUFZOzs7Ozs7Ozs7Ozs7Ozs7QUNMNUQ7QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixxREFBcUQ7QUFDekU7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqR3dFOztBQUVqRTtBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isd0JBQXdCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix3QkFBd0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isc0JBQXNCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsb0NBQW9DO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFD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USw4REFBaUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQW9CO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdGlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1p0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNB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QUM7O0FBRUQ7QUFDQSxzREFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7O1VDeEhEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsQ0FBQztXQUNEO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQSxzR0FBc0c7V0FDdEc7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBLEVBQUU7V0FDRjtXQUNBOzs7OztXQ2hFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ViYS1wcm92aWRlci1kaXJlY3RvcnkvLi9jb25maWcuanMiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS8uL3NyYy9hcGkvYXBpLmpzIiwid2VicGFjazovL2ViYS1wcm92aWRlci1kaXJlY3RvcnkvLi9zcmMvYXBpL2ZpcmViYXNlLmpzIiwid2VicGFjazovL2ViYS1wcm92aWRlci1kaXJlY3RvcnkvLi9zcmMvYXBpL3htbC5qcyIsIndlYnBhY2s6Ly9lYmEtcHJvdmlkZXItZGlyZWN0b3J5Ly4vc3JjL2xpYi9jb2xvcnMuanMiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS8uL3NyYy9saWIvY3N1LmpzIiwid2VicGFjazovL2ViYS1wcm92aWRlci1kaXJlY3RvcnkvLi9zcmMvbGliL2dldFhNTC5qcyIsIndlYnBhY2s6Ly9lYmEtcHJvdmlkZXItZGlyZWN0b3J5Ly4vc3JjL2xpYi9zaW1wbGVtYXBzL3V0aWxzLmpzIiwid2VicGFjazovL2ViYS1wcm92aWRlci1kaXJlY3RvcnkvLi9zcmMvbGliL3V0aWxzLmpzIiwid2VicGFjazovL2ViYS1wcm92aWRlci1kaXJlY3RvcnkvLi9zcmMvcGFnZXMvcHJvdmlkZXIvYXBpLmpzIiwid2VicGFjazovL2ViYS1wcm92aWRlci1kaXJlY3RvcnkvLi9zcmMvcGFnZXMvcHJvdmlkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lYmEtcHJvdmlkZXItZGlyZWN0b3J5L3dlYnBhY2svcnVudGltZS9hc3luYyBtb2R1bGUiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2ViYS1wcm92aWRlci1kaXJlY3Rvcnkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lYmEtcHJvdmlkZXItZGlyZWN0b3J5L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZWJhLXByb3ZpZGVyLWRpcmVjdG9yeS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IEFQSV9PUFRJT05TID0ge1xuICBYTUw6IFwiWE1MXCIsXG4gIEZJUkVCQVNFOiBcIkZJUkVCQVNFXCIsXG59O1xuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBBUEk6IEFQSV9PUFRJT05TLlhNTCxcbn07XG4iLCJpbXBvcnQgeyBYTUxfQVBJIH0gZnJvbSBcIi4veG1sLmpzXCI7XG5pbXBvcnQgeyBGSVJFQkFTRV9BUEkgfSBmcm9tIFwiLi9maXJlYmFzZS5qc1wiO1xuaW1wb3J0IHsgY29uZmlnLCBBUElfT1BUSU9OUyB9IGZyb20gXCIuLi8uLi9jb25maWcuanNcIjtcblxuZXhwb3J0IGNvbnN0IEFQSSA9XG4gIGNvbmZpZy5BUEkgPT09IEFQSV9PUFRJT05TLlhNTCA/IG5ldyBYTUxfQVBJKCkgOiBuZXcgRklSRUJBU0VfQVBJKCk7XG4iLCJleHBvcnQgY2xhc3MgRklSRUJBU0VfQVBJIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5uYW1lID0gXCJGSVJFQkFTRV9BUElcIjtcbiAgfVxuXG4gIHRlc3QoKSB7XG4gICAgY29uc29sZS5sb2coXCJGSVJFQkFTRV9BUElcIik7XG4gIH1cblxuICBnZXRMYXN0VXBkYXRlZCgpIHtcbiAgICByZXR1cm4gXCJub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVwiO1xuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzKCkge1xuICAgIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gRklSRUJBU0VfQVBJXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzQnlDU1UoY3N1KSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gbmV3IE1hcCgpO1xuICB9XG5cbiAgZ2V0QWxsUHJvdmlkZXJzQnlGSVBTKGZpcHMpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBuZXcgTWFwKCk7XG4gIH1cblxuICBnZXRQcm92aWRlclNlcnZpY2VzKHByb3ZpZGVySUQpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldFByb3ZpZGVySW5mbyhwcm92aWRlcklEKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBnZXRBbGxTZXJ2aWNlc0J5UHJvdmlkZXJJbkZJUFMocHJvdmlkZXJJZCwgZmlwcykge1xuICAgIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gRklSRUJBU0VfQVBJXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZ2V0QWxsU2VydmljZU5hbWVzQnlDU1UoY3N1KSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRBbGxTZXJ2aWNlc0J5UHJvdmlkZXJJbkNTVShwcm92aWRlcklkLCBjc3UpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEFsbFByb3ZpZGVyc09mU2VydmljZUluQ1NVKHNlcnZpY2VOYW1lLCBjc3UpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEFsbFByb3ZpZGVyc09mTGFuZ3VhZ2UobGFuZ3VhZ2VOYW1lKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnNPZlNlcnZpY2Uoc2VydmljZU5hbWUpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEFsbExvY2F0aW9ucygpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEFsbFNlcnZpY2VOYW1lcygpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEFsbExhbmd1YWdlcygpIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldFNlcnZpY2VNYXBGSVBTKHByb3ZpZGVySUQsIHNlcnZpY2VOYW1lKSB7XG4gICAgLy8gbm90IHlldCBpbXBsZW1lbnRlZCBpbiBGSVJFQkFTRV9BUElcbiAgICByZXR1cm4geyBhdmFpbGFibGU6IFtdLCBsaW1pdGVkOiBbXSwgbGFuZ3VhZ2VzOiBuZXcgTWFwKCkgfTtcbiAgfVxuXG4gIGdldEFsbEZJUFMocHJvdmlkZXJJRCkge1xuICAgIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gRklSRUJBU0VfQVBJXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgc2VhcmNoUHJvdmlkZXJzKHsgc2VydmljZU5hbWUsIGxvY2F0aW9uVHlwZSwgbG9jYXRpb25JRCwgbGFuZ3VhZ2VOYW1lIH0pIHtcbiAgICAvLyBub3QgeWV0IGltcGxlbWVudGVkIGluIEZJUkVCQVNFX0FQSVxuICAgIHJldHVybiBuZXcgTWFwKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGlzTG9jYWxpdHlJbkNTVUlELCBpc0xvY2FsaXR5SW5SZWdpb25JRCB9IGZyb20gXCIuLi9saWIvY3N1LmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBYTUxfQVBJIHtcbiAgZmlsZW5hbWUgPSBcIi9kYXRhL2RzcHMueG1sXCI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5uYW1lID0gXCJYTUxfQVBJXCI7XG4gICAgdGhpcy5nZXRYTUwoKTtcbiAgfVxuXG4gIGFzeW5jIGdldFhNTCgpIHtcbiAgICBjb25zdCBDb25uZWN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgQ29ubmVjdC5vcGVuKFwiR0VUXCIsIHRoaXMuZmlsZW5hbWUsIGZhbHNlKTtcbiAgICBDb25uZWN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3htbFwiKTtcbiAgICBDb25uZWN0LnNlbmQobnVsbCk7XG4gICAgdGhpcy5kYXRhID0gQ29ubmVjdC5yZXNwb25zZVhNTDtcbiAgfVxuXG4gIGdldExhc3RVcGRhdGVkKCkge1xuICAgIGlmICh0aGlzLmRhdGEgIT09IG51bGwgJiYgdGhpcy5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHVwZGF0ZURhdGVzID0gdGhpcy5kYXRhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiTGFzdFVwZGF0ZWRcIik7XG4gICAgICBjb25zdCB1cGRhdGVBcnJheSA9IFtdO1xuICAgICAgbGV0IHVwZGF0ZUFycnlUZXh0ID0gXCJcIjtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdXBkYXRlRGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdXBkYXRlQXJyYXkucHVzaCh1cGRhdGVEYXRlcy5pdGVtKGkpLnRleHRDb250ZW50KTtcbiAgICAgIH1cbiAgICAgIHVwZGF0ZUFycmF5LnNvcnQoKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdXBkYXRlRGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdXBkYXRlQXJyeVRleHQgKz0gdXBkYXRlQXJyYXlbaV0gKyBcIlxcclwiO1xuICAgICAgfVxuICAgICAgY29uc3QgZGlyZWN0b3J5VXBkYXRlZFNwbGl0ID1cbiAgICAgICAgdXBkYXRlQXJyYXlbdXBkYXRlRGF0ZXMubGVuZ3RoIC0gMV0uc3BsaXQoXCItXCIpO1xuICAgICAgbGV0IGRpcmVjdG9yeVVwZGF0ZWQgPSBcIlwiO1xuICAgICAgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjAxXCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiSmFudWFyeSBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMDJcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJGZWJydWFyeSBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMDNcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJNYXJjaCBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMDRcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJBcHJpbCBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMDVcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJNYXkgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjA2XCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiSnVuZSBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMDdcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJKdWx5IFwiO1xuICAgICAgfSBlbHNlIGlmIChkaXJlY3RvcnlVcGRhdGVkU3BsaXRbMV0gPT0gXCIwOFwiKSB7XG4gICAgICAgIGRpcmVjdG9yeVVwZGF0ZWQgPSBcIkF1Z3VzdCBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMDlcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJTZXB0ZW1iZXIgXCI7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsxXSA9PSBcIjEwXCIpIHtcbiAgICAgICAgZGlyZWN0b3J5VXBkYXRlZCA9IFwiT2N0b2JlciBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMTFcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJOb3ZlbWJlciBcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5VXBkYXRlZFNwbGl0WzFdID09IFwiMTJcIikge1xuICAgICAgICBkaXJlY3RvcnlVcGRhdGVkID0gXCJEZWNlbWJlciBcIjtcbiAgICAgIH1cbiAgICAgIGRpcmVjdG9yeVVwZGF0ZWQgKz0gTnVtYmVyKGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFsyXSkgKyBcIiwgXCI7XG4gICAgICBkaXJlY3RvcnlVcGRhdGVkICs9IGRpcmVjdG9yeVVwZGF0ZWRTcGxpdFswXTtcbiAgICAgIHJldHVybiBkaXJlY3RvcnlVcGRhdGVkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJObyBkYXRhIGF2YWlsYWJsZS5cIjtcbiAgICB9XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnMoKSB7XG4gICAgaWYgKHRoaXMuZGF0YSAhPT0gbnVsbCAmJiB0aGlzLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgcHJvdmlkZXJzID0gdGhpcy5kYXRhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiUHJvdmlkZXJcIik7XG4gICAgICBjb25zdCBwcm92aWRlckxpc3QgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyTmFtZSA9IHByb3ZpZGVyc1xuICAgICAgICAgIC5pdGVtKGkpXG4gICAgICAgICAgPy5nZXRFbGVtZW50c0J5VGFnTmFtZShcIk5hbWVcIilcbiAgICAgICAgICA/Lml0ZW0oMCk/LnRleHRDb250ZW50O1xuICAgICAgICBjb25zdCBwcm92aWRlcklkID0gcHJvdmlkZXJzLml0ZW0oaSk/LmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgICBwcm92aWRlckxpc3QucHVzaCh7IG5hbWU6IHByb3ZpZGVyTmFtZSwgaWQ6IHByb3ZpZGVySWQgfSk7XG4gICAgICB9XG4gICAgICBwcm92aWRlckxpc3Quc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYS5uYW1lIDwgYi5uYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9IGVsc2UgaWYgKGEubmFtZSA+IGIubmFtZSkge1xuICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBwcm92aWRlckxpc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnNCeUNTVShjc3UpIHtcbiAgICBpZiAodGhpcy5kYXRhICE9PSBudWxsICYmIHRoaXMuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBwcm92aWRlckxpc3QgPSBuZXcgTWFwKCk7XG4gICAgICBjb25zdCBzZXJ2aWNlRklQUyA9IFsuLi50aGlzLmRhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpXTtcblxuICAgICAgY29uc3QgY3N1U2VydmljZUZJUFMgPSBzZXJ2aWNlRklQUy5maWx0ZXIoKGZpcHMpID0+XG4gICAgICAgIGNzdS5sb2NhbGl0aWVzLmluY2x1ZGVzKGZpcHMudGV4dENvbnRlbnQpXG4gICAgICApO1xuXG4gICAgICBjc3VTZXJ2aWNlRklQUy5mb3JFYWNoKChmaXBzKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyID0gZmlwcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyTmFtZSA9IHByb3ZpZGVyXG4gICAgICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiTmFtZVwiKVxuICAgICAgICAgIC5pdGVtKDApLnRleHRDb250ZW50O1xuICAgICAgICBjb25zdCBwcm92aWRlcklkID0gcHJvdmlkZXIuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG5cbiAgICAgICAgaWYgKCFwcm92aWRlckxpc3QuaGFzKHByb3ZpZGVySWQpKSB7XG4gICAgICAgICAgcHJvdmlkZXJMaXN0LnNldChwcm92aWRlcklkLCBwcm92aWRlck5hbWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgTWFwKFxuICAgICAgICBbLi4ucHJvdmlkZXJMaXN0LmVudHJpZXMoKV0uc29ydCgoYSwgYikgPT4gYVsxXS5sb2NhbGVDb21wYXJlKGJbMV0pKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBNYXAoKTtcbiAgICB9XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnNCeUZJUFMoZmlwcykge1xuICAgIGNvbnN0IHByb3ZpZGVyTGlzdCA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBhbGxGSVBTID0gWy4uLnRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkZJUHNcIildO1xuXG4gICAgY29uc3QgdGFyZ2V0RklQUyA9IGFsbEZJUFMuZmlsdGVyKFxuICAgICAgKGZpcHNFbGVtZW50KSA9PiBmaXBzRWxlbWVudC50ZXh0Q29udGVudCA9PT0gZmlwc1xuICAgICk7XG5cbiAgICB0YXJnZXRGSVBTLmZvckVhY2goKGZpcHNFbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCBwcm92aWRlciA9IGZpcHNFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIGNvbnN0IHByb3ZpZGVyTmFtZSA9IHByb3ZpZGVyXG4gICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIk5hbWVcIilcbiAgICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgICBjb25zdCBwcm92aWRlcklkID0gcHJvdmlkZXIuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG5cbiAgICAgIHByb3ZpZGVyTGlzdC5zZXQocHJvdmlkZXJJZCwgcHJvdmlkZXJOYW1lKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IE1hcChcbiAgICAgIFsuLi5wcm92aWRlckxpc3QuZW50cmllcygpXS5zb3J0KChhLCBiKSA9PiBhWzFdLmxvY2FsZUNvbXBhcmUoYlsxXSkpXG4gICAgKTtcbiAgfVxuXG4gIGdldFByb3ZpZGVyU2VydmljZXMocHJvdmlkZXJJRCkge1xuICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5kYXRhLmdldEVsZW1lbnRCeUlkKHByb3ZpZGVySUQpO1xuICAgIGNvbnN0IHNlcnZpY2VFbGVtZW50cyA9IHByb3ZpZGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiU2VydmljZVwiKTtcbiAgICBjb25zdCBzZXJ2aWNlTmFtZXMgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZXJ2aWNlRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBzZXJ2aWNlRWxlbWVudHMuaXRlbShpKTtcbiAgICAgIHNlcnZpY2VOYW1lcy5hZGQoc2VydmljZS5nZXRBdHRyaWJ1dGUoXCJzZXJ2aWNlTmFtZVwiKSk7XG4gICAgfVxuICAgIHJldHVybiBbLi4uc2VydmljZU5hbWVzXS5zb3J0KCk7XG4gIH1cblxuICBnZXRQcm92aWRlckluZm8ocHJvdmlkZXJJRCkge1xuICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5kYXRhLmdldEVsZW1lbnRCeUlkKHByb3ZpZGVySUQpO1xuICAgIGNvbnN0IG1hcFpvb20gPSBwcm92aWRlclxuICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiTWFwWm9vbVwiKVxuICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgY29uc3QgY29udGFjdE5hbWUgPSBwcm92aWRlclxuICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiQ29udGFjdE5hbWVcIilcbiAgICAgIC5pdGVtKDApLnRleHRDb250ZW50O1xuICAgIGNvbnN0IHByb3ZpZGVyTmFtZSA9IHByb3ZpZGVyXG4gICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJOYW1lXCIpXG4gICAgICAuaXRlbSgwKS50ZXh0Q29udGVudDtcbiAgICBjb25zdCBjb250YWN0RW1haWwgPSBwcm92aWRlclxuICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiQ29udGFjdEVtYWlsXCIpXG4gICAgICAuaXRlbSgwKS50ZXh0Q29udGVudDtcbiAgICBjb25zdCB3ZWJzaXRlID0gcHJvdmlkZXJcbiAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIldlYnNpdGVcIilcbiAgICAgIC5pdGVtKDApLnRleHRDb250ZW50O1xuICAgIGNvbnN0IGxhc3RVcGRhdGVkID0gcHJvdmlkZXJcbiAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkxhc3RVcGRhdGVkXCIpXG4gICAgICAuaXRlbSgwKS50ZXh0Q29udGVudDtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvdmlkZXJOYW1lLFxuICAgICAgY29udGFjdE5hbWUsXG4gICAgICBjb250YWN0RW1haWwsXG4gICAgICB3ZWJzaXRlLFxuICAgICAgbGFzdFVwZGF0ZWQsXG4gICAgICBtYXBab29tLFxuICAgIH07XG4gIH1cblxuICBnZXRBbGxTZXJ2aWNlTmFtZXNCeUNTVShjc3UpIHtcbiAgICBpZiAodGhpcy5kYXRhICE9PSBudWxsICYmIHRoaXMuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBzZXJ2aWNlTGlzdCA9IG5ldyBTZXQoKTtcbiAgICAgIGNvbnN0IHNlcnZpY2VGSVBTID0gWy4uLnRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkZJUHNcIildO1xuXG4gICAgICBjb25zdCBjc3VTZXJ2aWNlRklQUyA9IHNlcnZpY2VGSVBTLmZpbHRlcigoZmlwcykgPT5cbiAgICAgICAgY3N1LmxvY2FsaXRpZXMuaW5jbHVkZXMoZmlwcy50ZXh0Q29udGVudClcbiAgICAgICk7XG5cbiAgICAgIGNzdVNlcnZpY2VGSVBTLmZvckVhY2goKGZpcHMpID0+IHtcbiAgICAgICAgY29uc3Qgc2VydmljZSA9IGZpcHMucGFyZW50RWxlbWVudDtcbiAgICAgICAgY29uc3Qgc2VydmljZU5hbWUgPSBzZXJ2aWNlLmdldEF0dHJpYnV0ZShcInNlcnZpY2VOYW1lXCIpO1xuXG4gICAgICAgIHNlcnZpY2VMaXN0LmFkZChzZXJ2aWNlTmFtZSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIFsuLi5zZXJ2aWNlTGlzdF0uc29ydCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgZ2V0QWxsU2VydmljZXNCeVByb3ZpZGVySW5GSVBTKHByb3ZpZGVySWQsIGZpcHMpIHtcbiAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuZGF0YS5nZXRFbGVtZW50QnlJZChwcm92aWRlcklkKTtcbiAgICBjb25zdCBwcm92aWRlclNlcnZpY2VzID0gcHJvdmlkZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTZXJ2aWNlXCIpO1xuICAgIGNvbnN0IHNlcnZpY2VMaXN0ID0gbmV3IE1hcCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvdmlkZXJTZXJ2aWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2VydmljZSA9IHByb3ZpZGVyU2VydmljZXMuaXRlbShpKTtcbiAgICAgIGNvbnN0IHNlcnZpY2VGSVBTID0gc2VydmljZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkZJUHNcIik7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNlcnZpY2VGSVBTLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChzZXJ2aWNlRklQUy5pdGVtKGopLnRleHRDb250ZW50ID09PSBmaXBzKSB7XG4gICAgICAgICAgY29uc3QgaXNMaW1pdGVkU2VydmljZSA9XG4gICAgICAgICAgICBzZXJ2aWNlRklQUy5pdGVtKGopLmdldEF0dHJpYnV0ZShcInRyYXZlbFJlcVwiKSA9PT0gXCJZXCI7XG4gICAgICAgICAgc2VydmljZUxpc3Quc2V0KFxuICAgICAgICAgICAgc2VydmljZS5nZXRBdHRyaWJ1dGUoXCJzZXJ2aWNlTmFtZVwiKSxcbiAgICAgICAgICAgIGlzTGltaXRlZFNlcnZpY2VcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgTWFwKFxuICAgICAgWy4uLnNlcnZpY2VMaXN0LmVudHJpZXMoKV0uc29ydCgoYSwgYikgPT4gYVswXS5sb2NhbGVDb21wYXJlKGJbMF0pKVxuICAgICk7XG4gIH1cblxuICBnZXRBbGxTZXJ2aWNlc0J5UHJvdmlkZXJJbkNTVShwcm92aWRlcklkLCBjc3UpIHtcbiAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuZGF0YS5nZXRFbGVtZW50QnlJZChwcm92aWRlcklkKTtcbiAgICBjb25zdCBwcm92aWRlclNlcnZpY2VzID0gcHJvdmlkZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTZXJ2aWNlXCIpO1xuICAgIGNvbnN0IHNlcnZpY2VMaXN0ID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvdmlkZXJTZXJ2aWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2VydmljZSA9IHByb3ZpZGVyU2VydmljZXMuaXRlbShpKTtcbiAgICAgIGNvbnN0IHNlcnZpY2VGSVBTID0gc2VydmljZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkZJUHNcIik7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNlcnZpY2VGSVBTLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChjc3UubG9jYWxpdGllcy5pbmNsdWRlcyhzZXJ2aWNlRklQUy5pdGVtKGopLnRleHRDb250ZW50KSkge1xuICAgICAgICAgIHNlcnZpY2VMaXN0LmFkZChzZXJ2aWNlLmdldEF0dHJpYnV0ZShcInNlcnZpY2VOYW1lXCIpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gWy4uLnNlcnZpY2VMaXN0XS5zb3J0KCk7XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnNPZlNlcnZpY2VJbkNTVShzZXJ2aWNlTmFtZSwgY3N1KSB7XG4gICAgY29uc3Qgc2VydmljZUZJUFMgPSBbLi4udGhpcy5kYXRhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiRklQc1wiKV07XG4gICAgY29uc3QgY3N1U2VydmljZUZJUFMgPSBzZXJ2aWNlRklQUy5maWx0ZXIoKGZpcHMpID0+XG4gICAgICBjc3UubG9jYWxpdGllcy5pbmNsdWRlcyhmaXBzLnRleHRDb250ZW50KVxuICAgICk7XG5cbiAgICBjb25zdCBwcm92aWRlckxpc3QgPSBuZXcgTWFwKCk7XG4gICAgY3N1U2VydmljZUZJUFMuZm9yRWFjaCgoZmlwcykgPT4ge1xuICAgICAgY29uc3QgcHJvdmlkZXIgPSBmaXBzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIGNvbnN0IHByb3ZpZGVyTmFtZSA9IHByb3ZpZGVyXG4gICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIk5hbWVcIilcbiAgICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgICBjb25zdCBwcm92aWRlcklkID0gcHJvdmlkZXIuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gICAgICBjb25zdCBwcm92aWRlclNlcnZpY2VzID0gcHJvdmlkZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTZXJ2aWNlXCIpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm92aWRlclNlcnZpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm92aWRlclNlcnZpY2VzLml0ZW0oaSkuZ2V0QXR0cmlidXRlKFwic2VydmljZU5hbWVcIikgPT09IHNlcnZpY2VOYW1lXG4gICAgICAgICkge1xuICAgICAgICAgIHByb3ZpZGVyTGlzdC5zZXQocHJvdmlkZXJJZCwgcHJvdmlkZXJOYW1lKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBNYXAoXG4gICAgICBbLi4ucHJvdmlkZXJMaXN0LmVudHJpZXMoKV0uc29ydCgoYSwgYikgPT4gYVsxXS5sb2NhbGVDb21wYXJlKGJbMV0pKVxuICAgICk7XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnNPZkxhbmd1YWdlKGxhbmd1YWdlTmFtZSkge1xuICAgIGNvbnN0IHByb3ZpZGVycyA9IG5ldyBNYXAoKTtcblxuICAgIGNvbnN0IGFsbEZJUFMgPSBbLi4udGhpcy5kYXRhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiRklQc1wiKV07XG4gICAgYWxsRklQUy5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgY29uc3QgZmlwc0xhbmd1YWdlcyA9IGxvY2F0aW9uLmdldEF0dHJpYnV0ZShcImxhbmd1YWdlc1wiKTtcbiAgICAgIGlmIChmaXBzTGFuZ3VhZ2VzICYmIGZpcHNMYW5ndWFnZXMuaW5jbHVkZXMobGFuZ3VhZ2VOYW1lKSkge1xuICAgICAgICBjb25zdCBwcm92aWRlciA9IGxvY2F0aW9uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgY29uc3QgcHJvdmlkZXJJRCA9IHByb3ZpZGVyLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgICBjb25zdCBwcm92aWRlck5hbWUgPSBwcm92aWRlclxuICAgICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIk5hbWVcIilcbiAgICAgICAgICAuaXRlbSgwKS50ZXh0Q29udGVudDtcbiAgICAgICAgcHJvdmlkZXJzLnNldChwcm92aWRlcklELCBwcm92aWRlck5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBNYXAoXG4gICAgICBbLi4ucHJvdmlkZXJzLmVudHJpZXMoKV0uc29ydCgoYSwgYikgPT4gYVsxXS5sb2NhbGVDb21wYXJlKGJbMV0pKVxuICAgICk7XG4gIH1cblxuICBnZXRBbGxQcm92aWRlcnNPZlNlcnZpY2Uoc2VydmljZU5hbWUpIHtcbiAgICBjb25zdCBwcm92aWRlcnMgPSBuZXcgTWFwKCk7XG5cbiAgICBjb25zdCBhbGxTZXJ2aWNlcyA9IHRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlNlcnZpY2VcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxTZXJ2aWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2VydmljZSA9IGFsbFNlcnZpY2VzLml0ZW0oaSk7XG4gICAgICBpZiAoc2VydmljZS5nZXRBdHRyaWJ1dGUoXCJzZXJ2aWNlTmFtZVwiKSA9PT0gc2VydmljZU5hbWUpIHtcbiAgICAgICAgY29uc3QgcHJvdmlkZXIgPSBzZXJ2aWNlLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVySUQgPSBwcm92aWRlci5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgY29uc3QgcHJvdmlkZXJOYW1lID0gcHJvdmlkZXJcbiAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJOYW1lXCIpXG4gICAgICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgICAgIHByb3ZpZGVycy5zZXQocHJvdmlkZXJJRCwgcHJvdmlkZXJOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE1hcChcbiAgICAgIFsuLi5wcm92aWRlcnMuZW50cmllcygpXS5zb3J0KChhLCBiKSA9PiBhWzFdLmxvY2FsZUNvbXBhcmUoYlsxXSkpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3Byb3ZpZGVySURdXG4gICAqL1xuICBnZXRBbGxMb2NhdGlvbnMocHJvdmlkZXJJRCkge1xuICAgIGxldCBsb2NhdGlvbnM7XG4gICAgaWYgKCFwcm92aWRlcklEKSB7XG4gICAgICBsb2NhdGlvbnMgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJPZmZpY2VcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5kYXRhLmdldEVsZW1lbnRCeUlkKHByb3ZpZGVySUQpO1xuICAgICAgbG9jYXRpb25zID0gcHJvdmlkZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJPZmZpY2VcIik7XG4gICAgfVxuICAgIGNvbnN0IGxvY2F0aW9uQXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbG9jYXRpb24gPSBsb2NhdGlvbnMuaXRlbShpKTtcbiAgICAgIC8vIGdldCBsb2NhdGlvbidzIHByb3ZpZGVyIG5hbWUgKGluIHBhcmVudCBub2RlKVxuICAgICAgY29uc3QgbG9jYXRpb25PYmplY3QgPSB7XG4gICAgICAgIHByb3ZpZGVyTmFtZTogbG9jYXRpb24ucGFyZW50RWxlbWVudFxuICAgICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIk5hbWVcIilcbiAgICAgICAgICAuaXRlbSgwKS50ZXh0Q29udGVudCxcbiAgICAgICAgcHJvdmlkZXJJZDogbG9jYXRpb24ucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJpZFwiKSxcbiAgICAgICAgbGF0OiBsb2NhdGlvbi5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkxhdFwiKS5pdGVtKDApLnRleHRDb250ZW50LFxuICAgICAgICBsbmc6IGxvY2F0aW9uLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiTG5nXCIpLml0ZW0oMCkudGV4dENvbnRlbnQsXG4gICAgICAgIHN0cmVldDogbG9jYXRpb24uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTdHJlZXRcIikuaXRlbSgwKS50ZXh0Q29udGVudCxcbiAgICAgICAgY2l0eTogbG9jYXRpb24uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJDaXR5XCIpLml0ZW0oMCkudGV4dENvbnRlbnQsXG4gICAgICAgIHN0YXRlOiBsb2NhdGlvbi5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlN0YXRlXCIpLml0ZW0oMCkudGV4dENvbnRlbnQsXG4gICAgICAgIHppcDogbG9jYXRpb24uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJaaXBcIikuaXRlbSgwKS50ZXh0Q29udGVudCxcbiAgICAgICAgcGhvbmU6IGxvY2F0aW9uLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiUGhvbmVcIikuaXRlbSgwKS50ZXh0Q29udGVudCxcbiAgICAgIH07XG4gICAgICBsb2NhdGlvbkFycmF5LnB1c2gobG9jYXRpb25PYmplY3QpO1xuICAgIH1cbiAgICByZXR1cm4gbG9jYXRpb25BcnJheTtcbiAgfVxuXG4gIGdldEFsbFNlcnZpY2VOYW1lcygpIHtcbiAgICBpZiAodGhpcy5kYXRhICE9PSBudWxsICYmIHRoaXMuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBzZXJ2aWNlcyA9IHRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlNlcnZpY2VcIik7XG4gICAgICBjb25zdCBzZXJ2aWNlTmFtZXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VydmljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VydmljZU5hbWUgPSBzZXJ2aWNlcy5pdGVtKGkpPy5nZXRBdHRyaWJ1dGUoXCJzZXJ2aWNlTmFtZVwiKTtcbiAgICAgICAgc2VydmljZU5hbWVzLnB1c2goc2VydmljZU5hbWUpO1xuICAgICAgfVxuICAgICAgc2VydmljZU5hbWVzLnNvcnQoKTtcbiAgICAgIHJldHVybiBbLi4ubmV3IFNldChzZXJ2aWNlTmFtZXMpXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIGdldEFsbExhbmd1YWdlcyhwcm92aWRlcklEKSB7XG4gICAgbGV0IGFsbExvY2F0aW9ucztcbiAgICBpZiAoIXByb3ZpZGVySUQpIHtcbiAgICAgIGFsbExvY2F0aW9ucyA9IHRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkZJUHNcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5kYXRhLmdldEVsZW1lbnRCeUlkKHByb3ZpZGVySUQpO1xuICAgICAgYWxsTG9jYXRpb25zID0gcHJvdmlkZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpO1xuICAgIH1cblxuICAgIGxldCBhbGxMYW5ndWFnZXNBcnJheSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsTG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYWxsTG9jYXRpb25zLml0ZW0oaSkuZ2V0QXR0cmlidXRlKFwibGFuZ3VhZ2VzXCIpKSB7XG4gICAgICAgIHZhciBzZXJ2aWNlTGFuZ3VhZ2VTdHIgPSBhbGxMb2NhdGlvbnMuaXRlbShpKS5nZXRBdHRyaWJ1dGUoXCJsYW5ndWFnZXNcIik7XG4gICAgICAgIHdoaWxlIChzZXJ2aWNlTGFuZ3VhZ2VTdHIuaW5kZXhPZihcIiBcIikgPj0gMCkge1xuICAgICAgICAgIHNlcnZpY2VMYW5ndWFnZVN0ciA9IHNlcnZpY2VMYW5ndWFnZVN0ci5yZXBsYWNlKFwiIFwiLCBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VydmljZUxhbmd1YWdlU3RyLmluY2x1ZGVzKFwiLFwiKSkge1xuICAgICAgICAgIHZhciBzZXJ2aWNlTGFuZ3VhZ2VzID0gc2VydmljZUxhbmd1YWdlU3RyLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlcnZpY2VMYW5ndWFnZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGFsbExhbmd1YWdlc0FycmF5LnB1c2goc2VydmljZUxhbmd1YWdlc1tqXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsbExhbmd1YWdlc0FycmF5LnB1c2goXG4gICAgICAgICAgICBhbGxMb2NhdGlvbnMuaXRlbShpKS5nZXRBdHRyaWJ1dGUoXCJsYW5ndWFnZXNcIilcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGFsbExhbmd1YWdlc0FycmF5LnNvcnQoKTtcbiAgICByZXR1cm4gWy4uLm5ldyBTZXQoYWxsTGFuZ3VhZ2VzQXJyYXkpXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbcGFyYW1zLnByb3ZpZGVySURdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuc2VydmljZU5hbWVcbiAgICogQHJldHVybnNcbiAgICovXG4gIGdldFNlcnZpY2VNYXBGSVBTKHsgcHJvdmlkZXJJRCwgc2VydmljZU5hbWUgfSkge1xuICAgIGxldCBzZXJ2aWNlRWxlbWVudHM7XG5cbiAgICBpZiAocHJvdmlkZXJJRCkge1xuICAgICAgY29uc3QgcHJvdmlkZXIgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudEJ5SWQocHJvdmlkZXJJRCk7XG4gICAgICBzZXJ2aWNlRWxlbWVudHMgPSBwcm92aWRlci5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlNlcnZpY2VcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlcnZpY2VFbGVtZW50cyA9IHRoaXMuZGF0YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlNlcnZpY2VcIik7XG4gICAgfVxuXG4gICAgY29uc3QgYXZhaWxhYmxlRklQUyA9IFtdO1xuICAgIGNvbnN0IGxpbWl0ZWRGSVBTID0gW107XG4gICAgY29uc3QgbGFuZ3VhZ2VNYXAgPSBuZXcgTWFwKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZXJ2aWNlRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBzZXJ2aWNlRWxlbWVudHMuaXRlbShpKTtcbiAgICAgIGlmIChzZXJ2aWNlLmdldEF0dHJpYnV0ZShcInNlcnZpY2VOYW1lXCIpID09PSBzZXJ2aWNlTmFtZSkge1xuICAgICAgICBjb25zdCBzZXJ2aWNlRklQUyA9IHNlcnZpY2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNlcnZpY2VGSVBTLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY29uc3QgZmlwcyA9IHNlcnZpY2VGSVBTLml0ZW0oaikudGV4dENvbnRlbnQ7XG4gICAgICAgICAgY29uc3QgaXNMaW1pdGVkID1cbiAgICAgICAgICAgIHNlcnZpY2VGSVBTLml0ZW0oaikuZ2V0QXR0cmlidXRlKFwidHJhdmVsUmVxXCIpID09PSBcIllcIjtcbiAgICAgICAgICBpZiAoaXNMaW1pdGVkKSB7XG4gICAgICAgICAgICBsaW1pdGVkRklQUy5wdXNoKGZpcHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhdmFpbGFibGVGSVBTLnB1c2goZmlwcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGxhbmd1YWdlTGlzdCA9IHNlcnZpY2VGSVBTLml0ZW0oaikuZ2V0QXR0cmlidXRlKFwibGFuZ3VhZ2VzXCIpO1xuICAgICAgICAgIGlmIChsYW5ndWFnZUxpc3QpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhbmd1YWdlQXJyYXkgPSBsYW5ndWFnZUxpc3Quc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgbGFuZ3VhZ2VBcnJheS5mb3JFYWNoKChsYW5ndWFnZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAobGFuZ3VhZ2VNYXAuaGFzKGxhbmd1YWdlKSkge1xuICAgICAgICAgICAgICAgIGxhbmd1YWdlTWFwLmdldChsYW5ndWFnZSkuYWRkKGZpcHMpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxhbmd1YWdlTWFwLnNldChsYW5ndWFnZSwgbmV3IFNldChbZmlwc10pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vY29udmVydCB0aGUgbGFuZ3VhZ2VNYXAgaW50byBhbiBvYmplY3Qgd2l0aCBrZXlzIGFuZCB0aGUgZmlwc1NldFxuICAgIGNvbnN0IGxhbmd1YWdlRklQUyA9IFsuLi5sYW5ndWFnZU1hcF0ubWFwKChbbGFuZ3VhZ2UsIGZpcHNTZXRdKSA9PiAoe1xuICAgICAgW2xhbmd1YWdlXTogWy4uLmZpcHNTZXRdLFxuICAgIH0pKTtcbiAgICByZXR1cm4ge1xuICAgICAgYXZhaWxhYmxlOiBhdmFpbGFibGVGSVBTLFxuICAgICAgbGltaXRlZDogbGltaXRlZEZJUFMsXG4gICAgICBsYW5ndWFnZXM6IGxhbmd1YWdlRklQUyxcbiAgICB9O1xuICB9XG5cbiAgZ2V0QWxsRklQUyhwcm92aWRlcklEKSB7XG4gICAgY29uc3QgcHJvdmlkZXIgPSB0aGlzLmRhdGEuZ2V0RWxlbWVudEJ5SWQocHJvdmlkZXJJRCk7XG4gICAgY29uc3QgYWxsUHJvdmlkZXJGSVBTID0gcHJvdmlkZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJGSVBzXCIpO1xuXG4gICAgY29uc3QgZmlwc0xpc3QgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFByb3ZpZGVyRklQUy5sZW5ndGg7IGkrKykge1xuICAgICAgZmlwc0xpc3QucHVzaChhbGxQcm92aWRlckZJUFMuaXRlbShpKS50ZXh0Q29udGVudCk7XG4gICAgfVxuICAgIHJldHVybiBbLi4ubmV3IFNldChmaXBzTGlzdCldO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZWFyY2hQYXJhbXNcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtzZWFyY2hQYXJhbXMuc2VydmljZU5hbWVdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbc2VhcmNoUGFyYW1zLmxvY2F0aW9uSURdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbc2VhcmNoUGFyYW1zLmxvY2F0aW9uVHlwZV1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtzZWFyY2hQYXJhbXMubGFuZ3VhZ2VOYW1lXVxuICAgKi9cbiAgc2VhcmNoUHJvdmlkZXJzKHsgc2VydmljZU5hbWUsIGxvY2F0aW9uSUQsIGxvY2F0aW9uVHlwZSwgbGFuZ3VhZ2VOYW1lIH0pIHtcbiAgICBjb25zdCBhbGxGSVBTID0gdGhpcy5kYXRhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiRklQc1wiKTtcbiAgICBjb25zdCBwcm92aWRlckxpc3QgPSBuZXcgTWFwKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbEZJUFMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBpc1NlcnZpY2VNYXRjaCA9IGZhbHNlO1xuICAgICAgbGV0IGlzTG9jYXRpb25NYXRjaCA9IGZhbHNlO1xuICAgICAgbGV0IGlzTGFuZ3VhZ2VNYXRjaCA9IGZhbHNlO1xuICAgICAgY29uc3QgZmlwc1NlcnZpY2UgPSBhbGxGSVBTXG4gICAgICAgIC5pdGVtKGkpXG4gICAgICAgIC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcInNlcnZpY2VOYW1lXCIpO1xuICAgICAgaWYgKFxuICAgICAgICAhc2VydmljZU5hbWUgfHxcbiAgICAgICAgc2VydmljZU5hbWUgPT09IFwiYW55XCIgfHxcbiAgICAgICAgc2VydmljZU5hbWUgPT09IGZpcHNTZXJ2aWNlXG4gICAgICApIHtcbiAgICAgICAgaXNTZXJ2aWNlTWF0Y2ggPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaXBzID0gYWxsRklQUy5pdGVtKGkpO1xuICAgICAgaWYgKFxuICAgICAgICAhbG9jYXRpb25JRCB8fFxuICAgICAgICBsb2NhdGlvbklEID09PSBcImFueVwiIHx8XG4gICAgICAgIGZpcHMudGV4dENvbnRlbnQgPT09IGxvY2F0aW9uSURcbiAgICAgICkge1xuICAgICAgICBpc0xvY2F0aW9uTWF0Y2ggPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGxvY2F0aW9uVHlwZSA9PT0gXCJDU1VcIiAmJlxuICAgICAgICBpc0xvY2FsaXR5SW5DU1VJRChsb2NhdGlvbklELCBmaXBzLnRleHRDb250ZW50KVxuICAgICAgKSB7XG4gICAgICAgIGlzTG9jYXRpb25NYXRjaCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIGxvY2F0aW9uVHlwZSA9PT0gXCJSZWdpb25cIiAmJlxuICAgICAgICBpc0xvY2FsaXR5SW5SZWdpb25JRChsb2NhdGlvbklELCBmaXBzLnRleHRDb250ZW50KVxuICAgICAgKSB7XG4gICAgICAgIGlzTG9jYXRpb25NYXRjaCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghbGFuZ3VhZ2VOYW1lIHx8IGxhbmd1YWdlTmFtZSA9PT0gXCJFbmdsaXNoXCIpIHtcbiAgICAgICAgaXNMYW5ndWFnZU1hdGNoID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpcHMuZ2V0QXR0cmlidXRlKFwibGFuZ3VhZ2VzXCIpKSB7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlTGlzdCA9IGZpcHMuZ2V0QXR0cmlidXRlKFwibGFuZ3VhZ2VzXCIpO1xuICAgICAgICBpZiAobGFuZ3VhZ2VMaXN0LmluY2x1ZGVzKGxhbmd1YWdlTmFtZSkpIHtcbiAgICAgICAgICBpc0xhbmd1YWdlTWF0Y2ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1NlcnZpY2VNYXRjaCAmJiBpc0xvY2F0aW9uTWF0Y2ggJiYgaXNMYW5ndWFnZU1hdGNoKSB7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyID0gZmlwcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVySUQgPSBwcm92aWRlci5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgY29uc3QgcHJvdmlkZXJOYW1lID0gcHJvdmlkZXJcbiAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJOYW1lXCIpXG4gICAgICAgICAgLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgICAgIHByb3ZpZGVyTGlzdC5zZXQocHJvdmlkZXJJRCwgcHJvdmlkZXJOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE1hcChcbiAgICAgIFsuLi5wcm92aWRlckxpc3QuZW50cmllcygpXS5zb3J0KChhLCBiKSA9PiBhWzFdLmxvY2FsZUNvbXBhcmUoYlsxXSkpXG4gICAgKTtcbiAgfVxuXG4gIHRlc3QoKSB7XG4gICAgaWYgKHRoaXMuZGF0YSAhPT0gbnVsbCAmJiB0aGlzLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5kYXRhKTtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0RWxlbWVudEJ5SWQoXCIxXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJObyBkYXRhIGF2YWlsYWJsZS5cIjtcbiAgICB9XG4gIH1cbn1cbiIsImNvbnN0IGNvbG9ycyA9IHtcbiAgTm9ydGhlcm5Db2xvcjogXCIjNDA2MTYyXCIsXG4gIENlbnRyYWxDb2xvcjogXCIjODlBMTZFXCIsXG4gIFdlc3Rlcm5Db2xvcjogXCIjNEU1MDY3XCIsXG4gIFNvdXRoZXJuQ29sb3I6IFwiI0JDREFFN1wiLFxuICBFYXN0ZXJuQ29sb3I6IFwiI0NFODQ0RVwiLFxuICBNaWRXZXN0ZXJuQ29sb3I6IFwiIzVFODU5RlwiLFxuICBFQkFCbHVlOiBcIiNEOUU1RjNcIixcbiAgUmVnQ29sb3I6IFwiIzAwODAwMFwiLFxuICBUcmF2ZWxDb2xvcjogXCIjOTBFRTkwXCIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb2xvcnM7XG4iLCIvL0RlZmluZSBDU1VzXG4vL0Vhc3Rlcm4gUmVnaW9uXG5jb25zdCBDU1UxID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTU1MFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAxIC0gQ2hlc2FwZWFrZVwiLFxuICBzbHVnOiBcIkNTVTFcIixcbn07XG5jb25zdCBDU1UyID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTgxMFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAyIC0gVmlyZ2luaWEgQmVhY2hcIixcbiAgc2x1ZzogXCJDU1UyXCIsXG59O1xuY29uc3QgQ1NVMkEgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMDAxXCIsIFwiNTExMzFcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMkEgLSBBY2NvbWFja1wiLFxuICBzbHVnOiBcIkNTVTJBXCIsXG59O1xuY29uc3QgQ1NVMyA9IHtcbiAgbG9jYWxpdGllczogW1wiNTE3NDBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMyAtIFBvcnRzbW91dGhcIixcbiAgc2x1ZzogXCJDU1UzXCIsXG59O1xuY29uc3QgQ1NVNCA9IHtcbiAgbG9jYWxpdGllczogW1wiNTE3MTBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgNCAtIE5vcmZvbGtcIixcbiAgc2x1ZzogXCJDU1U0XCIsXG59O1xuY29uc3QgQ1NVNSA9IHtcbiAgbG9jYWxpdGllczogW1wiNTE4MDBcIiwgXCI1MTYyMFwiLCBcIjUxMDkzXCIsIFwiNTExNzVcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgNSAtIFN1ZmZvbGtcIixcbiAgc2x1ZzogXCJDU1U1XCIsXG59O1xuY29uc3QgQ1NVNyA9IHtcbiAgbG9jYWxpdGllczogW1wiNTE3MDBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgNyAtIE5ld3BvcnQgTmV3c1wiLFxuICBzbHVnOiBcIkNTVTdcIixcbn07XG5jb25zdCBDU1U4ID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTY1MFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCA4IC0gSGFtcHRvblwiLFxuICBzbHVnOiBcIkNTVThcIixcbn07XG4vL1NvdXRoZXJuIFJlZ2lvblxuY29uc3QgQ1NVNiA9IHtcbiAgbG9jYWxpdGllczogW1wiNTE2NzBcIiwgXCI1MTE0OVwiLCBcIjUxMTgxXCIsIFwiNTExODNcIiwgXCI1MTU5NVwiLCBcIjUxMDI1XCIsIFwiNTEwODFcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgNiAtIEhvcGV3ZWxsXCIsXG4gIHNsdWc6IFwiQ1NVNlwiLFxufTtcbmNvbnN0IENTVTEwID0ge1xuICBsb2NhbGl0aWVzOiBbXG4gICAgXCI1MTAxMVwiLFxuICAgIFwiNTEwMjlcIixcbiAgICBcIjUxMDM3XCIsXG4gICAgXCI1MTA0OVwiLFxuICAgIFwiNTEwODNcIixcbiAgICBcIjUxMTExXCIsXG4gICAgXCI1MTExN1wiLFxuICAgIFwiNTExNDdcIixcbiAgXSxcbiAgbmFtZTogXCJEaXN0cmljdCAxMCAtIEhhbGlmYXhcIixcbiAgc2x1ZzogXCJDU1UxMFwiLFxufTtcbmNvbnN0IENTVTExID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTczMFwiLCBcIjUxMDA3XCIsIFwiNTEwNTNcIiwgXCI1MTEzNVwiLCBcIjUxMTQ1XCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDExIC0gUGV0ZXJzYnVyZ1wiLFxuICBzbHVnOiBcIkNTVTExXCIsXG59O1xuY29uc3QgQ1NVMTIgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMDQxXCIsIFwiNTE1NzBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMTIgLSBDaGVzdGVyZmllbGRcIixcbiAgc2x1ZzogXCJDU1UxMlwiLFxufTtcbmNvbnN0IENTVTEzID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTc2MFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAxMyAtIFJpY2htb25kXCIsXG4gIHNsdWc6IFwiQ1NVMTNcIixcbn07XG5jb25zdCBDU1UxNCA9IHtcbiAgbG9jYWxpdGllczogW1wiNTEwODdcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMTQgLSBIZW5yaWNvXCIsXG4gIHNsdWc6IFwiQ1NVMTRcIixcbn07XG5cbi8vTm9ydGhlcm4gUmVnaW9uXG52YXIgQ1NVMTcgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMDEzXCIsIFwiNTE2MTBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMTcgLSBBcmxpbmd0b25cIixcbiAgc2x1ZzogXCJDU1UxN1wiLFxufTtcbnZhciBDU1UxOCA9IHtcbiAgbG9jYWxpdGllczogW1wiNTE1MTBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMTggLSBBbGV4YW5kcmlhXCIsXG4gIHNsdWc6IFwiQ1NVMThcIixcbn07XG52YXIgQ1NVMTkgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMDU5XCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDE5IC0gRmFpcmZheFwiLFxuICBzbHVnOiBcIkNTVTE5XCIsXG59O1xuY29uc3QgQ1NVMjAgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMTA3XCIsIFwiNTEwNjFcIiwgXCI1MTE1N1wiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAyMCAtIExvdWRvdW5cIixcbiAgc2x1ZzogXCJDU1UyMFwiLFxufTtcbnZhciBDU1UyNiA9IHtcbiAgbG9jYWxpdGllczogW1xuICAgIFwiNTEwNDNcIixcbiAgICBcIjUxMDY5XCIsXG4gICAgXCI1MTEzOVwiLFxuICAgIFwiNTExNjVcIixcbiAgICBcIjUxMTcxXCIsXG4gICAgXCI1MTE4N1wiLFxuICAgIFwiNTE2NjBcIixcbiAgICBcIjUxODQwXCIsXG4gIF0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMjYgLSBXaW5jaGVzdGVyXCIsXG4gIHNsdWc6IFwiQ1NVMjZcIixcbn07XG52YXIgQ1NVMzEgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMTUzXCIsIFwiNTE2ODNcIiwgXCI1MTY4NVwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAzMSAtIE1hbmFzc2FzXCIsXG4gIHNsdWc6IFwiQ1NVMzFcIixcbn07XG5cbi8vV2VzdGVybiBSZWdpb25cbnZhciBDU1UyMSA9IHtcbiAgbG9jYWxpdGllczogW1wiNTEwODlcIiwgXCI1MTE0MVwiLCBcIjUxNjkwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDIxIC0gTWFydGluc3ZpbGxlXCIsXG4gIHNsdWc6IFwiQ1NVMjFcIixcbn07XG52YXIgQ1NVMjIgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMDY3XCIsIFwiNTExNDNcIiwgXCI1MTU5MFwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAyMiAtIFJvY2t5IE1vdW50XCIsXG4gIHNsdWc6IFwiQ1NVMjJcIixcbn07XG5jb25zdCBDU1UyMyA9IHtcbiAgbG9jYWxpdGllczogW1wiNTExNjFcIiwgXCI1MTc3NVwiLCBcIjUxNzcwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDIzIC0gUm9hbm9rZVwiLFxuICBzbHVnOiBcIkNTVTIzXCIsXG59O1xudmFyIENTVTI3ID0ge1xuICBsb2NhbGl0aWVzOiBbXG4gICAgXCI1MTAyMVwiLFxuICAgIFwiNTEwMzVcIixcbiAgICBcIjUxMDYzXCIsXG4gICAgXCI1MTA3MVwiLFxuICAgIFwiNTEwNzdcIixcbiAgICBcIjUxMTIxXCIsXG4gICAgXCI1MTE1NVwiLFxuICAgIFwiNTExOTdcIixcbiAgICBcIjUxNjQwXCIsXG4gICAgXCI1MTc1MFwiLFxuICBdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDI3IC0gUHVsYXNraVwiLFxuICBzbHVnOiBcIkNTVTI3XCIsXG59O1xudmFyIENTVTI4ID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTE3M1wiLCBcIjUxMTkxXCIsIFwiNTE1MjBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMjggLSBBYmluZ2RvblwiLFxuICBzbHVnOiBcIkNTVTI4XCIsXG59O1xudmFyIENTVTI5ID0ge1xuICBsb2NhbGl0aWVzOiBbXCI1MTAyN1wiLCBcIjUxMDUxXCIsIFwiNTExNjdcIiwgXCI1MTE4NVwiXSxcbiAgbmFtZTogXCJEaXN0cmljdCAyOSAtIFRhemV3ZWxsXCIsXG4gIHNsdWc6IFwiQ1NVMjlcIixcbn07XG52YXIgQ1NVMzAgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMTA1XCIsIFwiNTExNjlcIiwgXCI1MTE5NVwiLCBcIjUxNzIwXCJdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDMwIC0gR2F0ZSBDaXR5XCIsXG4gIHNsdWc6IFwiQ1NVMzBcIixcbn07XG4vL0NlbnRyYWwgUmVnaW9uXG52YXIgQ1NVOSA9IHtcbiAgbG9jYWxpdGllczogW1xuICAgIFwiNTEwMzZcIixcbiAgICBcIjUxMDczXCIsXG4gICAgXCI1MTA5NVwiLFxuICAgIFwiNTEwOTdcIixcbiAgICBcIjUxMTAxXCIsXG4gICAgXCI1MTExNVwiLFxuICAgIFwiNTExMTlcIixcbiAgICBcIjUxMTI3XCIsXG4gICAgXCI1MTE5OVwiLFxuICAgIFwiNTE3MzVcIixcbiAgICBcIjUxODMwXCIsXG4gIF0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgOSAtIFdpbGxpYW1zYnVyZ1wiLFxuICBzbHVnOiBcIkNTVTlcIixcbn07XG52YXIgQ1NVMTUgPSB7XG4gIGxvY2FsaXRpZXM6IFtcbiAgICBcIjUxMDMzXCIsXG4gICAgXCI1MTA1N1wiLFxuICAgIFwiNTEwODVcIixcbiAgICBcIjUxMDk5XCIsXG4gICAgXCI1MTEwM1wiLFxuICAgIFwiNTExMzNcIixcbiAgICBcIjUxMTU5XCIsXG4gICAgXCI1MTE3N1wiLFxuICAgIFwiNTExNzlcIixcbiAgICBcIjUxMTkzXCIsXG4gICAgXCI1MTYzMFwiLFxuICBdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDE1IC0gRnJlZGVyaWNrc2J1cmdcIixcbiAgc2x1ZzogXCJDU1UxNVwiLFxufTtcbnZhciBDU1UxNiA9IHtcbiAgbG9jYWxpdGllczogW1xuICAgIFwiNTEwMDNcIixcbiAgICBcIjUxMDQ3XCIsXG4gICAgXCI1MTA2NVwiLFxuICAgIFwiNTEwNzVcIixcbiAgICBcIjUxMDc5XCIsXG4gICAgXCI1MTEwOVwiLFxuICAgIFwiNTExMTNcIixcbiAgICBcIjUxMTM3XCIsXG4gICAgXCI1MTU0MFwiLFxuICBdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDE2IC0gQ2hhcmxvdHRlc3ZpbGxlXCIsXG4gIHNsdWc6IFwiQ1NVMTZcIixcbn07XG52YXIgQ1NVMjQgPSB7XG4gIGxvY2FsaXRpZXM6IFtcIjUxMDA5XCIsIFwiNTEwMTlcIiwgXCI1MTAzMVwiLCBcIjUxMTI1XCIsIFwiNTE2ODBcIl0sXG4gIG5hbWU6IFwiRGlzdHJpY3QgMjQgLSBMeW5jaGJ1cmdcIixcbiAgc2x1ZzogXCJDU1UyNFwiLFxufTtcbnZhciBDU1UyNSA9IHtcbiAgbG9jYWxpdGllczogW1xuICAgIFwiNTEwMDVcIixcbiAgICBcIjUxMDE1XCIsXG4gICAgXCI1MTAxN1wiLFxuICAgIFwiNTEwMjNcIixcbiAgICBcIjUxMDQ1XCIsXG4gICAgXCI1MTA5MVwiLFxuICAgIFwiNTExNjNcIixcbiAgICBcIjUxNTMwXCIsXG4gICAgXCI1MTU4MFwiLFxuICAgIFwiNTE2NzhcIixcbiAgICBcIjUxNzkwXCIsXG4gICAgXCI1MTgyMFwiLFxuICBdLFxuICBuYW1lOiBcIkRpc3RyaWN0IDI1IC0gU3RhdW50b25cIixcbiAgc2x1ZzogXCJDU1UyNVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IHNvcnRlZENTVXMgPSBbXG4gIENTVTEsXG4gIENTVTIsXG4gIENTVTJBLFxuICBDU1UzLFxuICBDU1U0LFxuICBDU1U1LFxuICBDU1U2LFxuICBDU1U3LFxuICBDU1U4LFxuICBDU1U5LFxuICBDU1UxMCxcbiAgQ1NVMTEsXG4gIENTVTEyLFxuICBDU1UxMyxcbiAgQ1NVMTQsXG4gIENTVTE1LFxuICBDU1UxNixcbiAgQ1NVMTcsXG4gIENTVTE4LFxuICBDU1UxOSxcbiAgQ1NVMjAsXG4gIENTVTIxLFxuICBDU1UyMixcbiAgQ1NVMjMsXG4gIENTVTI0LFxuICBDU1UyNSxcbiAgQ1NVMjYsXG4gIENTVTI3LFxuICBDU1UyOCxcbiAgQ1NVMjksXG4gIENTVTMwLFxuICBDU1UzMSxcbl07XG5cbmV4cG9ydCBjb25zdCBhbGxGaXBzID0gW1xuICBcIjUxNTEwXCIsXG4gIFwiNTE1MjBcIixcbiAgXCI1MTUzMFwiLFxuICBcIjUxNTQwXCIsXG4gIFwiNTE1NTBcIixcbiAgXCI1MTU3MFwiLFxuICBcIjUxNTgwXCIsXG4gIFwiNTE1OTBcIixcbiAgXCI1MTU5NVwiLFxuICBcIjUxNjAwXCIsXG4gIFwiNTE2MTBcIixcbiAgXCI1MTYyMFwiLFxuICBcIjUxNjMwXCIsXG4gIFwiNTE2NDBcIixcbiAgXCI1MTY1MFwiLFxuICBcIjUxNjYwXCIsXG4gIFwiNTE2NzBcIixcbiAgXCI1MTY3OFwiLFxuICBcIjUxNjgwXCIsXG4gIFwiNTE2ODNcIixcbiAgXCI1MTY4NVwiLFxuICBcIjUxNjkwXCIsXG4gIFwiNTE3MDBcIixcbiAgXCI1MTcxMFwiLFxuICBcIjUxNzIwXCIsXG4gIFwiNTE3MzBcIixcbiAgXCI1MTczNVwiLFxuICBcIjUxNzQwXCIsXG4gIFwiNTE3NTBcIixcbiAgXCI1MTc2MFwiLFxuICBcIjUxNzcwXCIsXG4gIFwiNTE3NzVcIixcbiAgXCI1MTc5MFwiLFxuICBcIjUxODAwXCIsXG4gIFwiNTE4MTBcIixcbiAgXCI1MTgyMFwiLFxuICBcIjUxODMwXCIsXG4gIFwiNTE4NDBcIixcbiAgXCI1MTAwMVwiLFxuICBcIjUxMDAzXCIsXG4gIFwiNTEwMDVcIixcbiAgXCI1MTAwN1wiLFxuICBcIjUxMDA5XCIsXG4gIFwiNTEwMTFcIixcbiAgXCI1MTAxM1wiLFxuICBcIjUxMDE1XCIsXG4gIFwiNTEwMTdcIixcbiAgXCI1MTAxOVwiLFxuICBcIjUxMDIxXCIsXG4gIFwiNTEwMjNcIixcbiAgXCI1MTAyNVwiLFxuICBcIjUxMDI3XCIsXG4gIFwiNTEwMjlcIixcbiAgXCI1MTAzMVwiLFxuICBcIjUxMDMzXCIsXG4gIFwiNTEwMzVcIixcbiAgXCI1MTAzNlwiLFxuICBcIjUxMDM3XCIsXG4gIFwiNTEwNDFcIixcbiAgXCI1MTA0M1wiLFxuICBcIjUxMDQ1XCIsXG4gIFwiNTEwNDdcIixcbiAgXCI1MTA0OVwiLFxuICBcIjUxMDUxXCIsXG4gIFwiNTEwNTNcIixcbiAgXCI1MTA1N1wiLFxuICBcIjUxMDU5XCIsXG4gIFwiNTEwNjFcIixcbiAgXCI1MTA2M1wiLFxuICBcIjUxMDY1XCIsXG4gIFwiNTEwNjdcIixcbiAgXCI1MTA2OVwiLFxuICBcIjUxMDcxXCIsXG4gIFwiNTEwNzNcIixcbiAgXCI1MTA3NVwiLFxuICBcIjUxMDc3XCIsXG4gIFwiNTEwNzlcIixcbiAgXCI1MTA4MVwiLFxuICBcIjUxMDgzXCIsXG4gIFwiNTEwODVcIixcbiAgXCI1MTA4N1wiLFxuICBcIjUxMDg5XCIsXG4gIFwiNTEwOTFcIixcbiAgXCI1MTA5M1wiLFxuICBcIjUxMDk1XCIsXG4gIFwiNTEwOTdcIixcbiAgXCI1MTA5OVwiLFxuICBcIjUxMTAxXCIsXG4gIFwiNTExMDNcIixcbiAgXCI1MTEwNVwiLFxuICBcIjUxMTA3XCIsXG4gIFwiNTExMDlcIixcbiAgXCI1MTExMVwiLFxuICBcIjUxMTEzXCIsXG4gIFwiNTExMTVcIixcbiAgXCI1MTExN1wiLFxuICBcIjUxMTE5XCIsXG4gIFwiNTExMjFcIixcbiAgXCI1MTEyNVwiLFxuICBcIjUxMTI3XCIsXG4gIFwiNTExMzFcIixcbiAgXCI1MTEzM1wiLFxuICBcIjUxMTM1XCIsXG4gIFwiNTExMzdcIixcbiAgXCI1MTEzOVwiLFxuICBcIjUxMTQxXCIsXG4gIFwiNTExNDNcIixcbiAgXCI1MTE0NVwiLFxuICBcIjUxMTQ3XCIsXG4gIFwiNTExNDlcIixcbiAgXCI1MTE1M1wiLFxuICBcIjUxMTU1XCIsXG4gIFwiNTExNTdcIixcbiAgXCI1MTE1OVwiLFxuICBcIjUxMTYxXCIsXG4gIFwiNTExNjNcIixcbiAgXCI1MTE2NVwiLFxuICBcIjUxMTY3XCIsXG4gIFwiNTExNjlcIixcbiAgXCI1MTE3MVwiLFxuICBcIjUxMTczXCIsXG4gIFwiNTExNzVcIixcbiAgXCI1MTE3N1wiLFxuICBcIjUxMTc5XCIsXG4gIFwiNTExODFcIixcbiAgXCI1MTE4M1wiLFxuICBcIjUxMTg1XCIsXG4gIFwiNTExODdcIixcbiAgXCI1MTE5MVwiLFxuICBcIjUxMTkzXCIsXG4gIFwiNTExOTVcIixcbiAgXCI1MTE5N1wiLFxuICBcIjUxMTk5XCIsXG5dO1xuXG4vLyBSZWdpb25zXG5jb25zdCBOb3J0aGVyblJlZ2lvbiA9IHtcbiAgQ1NVczogW0NTVTE2LCBDU1UxNywgQ1NVMTgsIENTVTE5LCBDU1UyMCwgQ1NVMjYsIENTVTMxXSxcbiAgbmFtZTogXCJOb3J0aGVybiBSZWdpb25cIixcbiAgc2x1ZzogXCJub3J0aFwiLFxufTtcblxuY29uc3QgU291dGhlcm5SZWdpb24gPSB7XG4gIENTVXM6IFtDU1U1LCBDU1U2LCBDU1UxMSwgQ1NVMTIsIENTVTEzXSxcbiAgbmFtZTogXCJTb3V0aGVybiBSZWdpb25cIixcbiAgc2x1ZzogXCJzb3V0aFwiLFxufTtcblxuY29uc3QgRWFzdGVyblJlZ2lvbiA9IHtcbiAgQ1NVczogW0NTVTEsIENTVTIsIENTVTJBLCBDU1UzLCBDU1U0XSxcbiAgbmFtZTogXCJFYXN0ZXJuIFJlZ2lvblwiLFxuICBzbHVnOiBcImVhc3RcIixcbn07XG5cbmNvbnN0IFdlc3Rlcm5SZWdpb24gPSB7XG4gIENTVXM6IFtDU1UyMSwgQ1NVMjcsIENTVTI4LCBDU1UyOSwgQ1NVMzBdLFxuICBuYW1lOiBcIldlc3Rlcm4gUmVnaW9uXCIsXG4gIHNsdWc6IFwid2VzdFwiLFxufTtcblxuY29uc3QgQ2VudHJhbFJlZ2lvbiA9IHtcbiAgQ1NVczogW0NTVTcsIENTVTgsIENTVTksIENTVTE0LCBDU1UxNV0sXG4gIG5hbWU6IFwiQ2VudHJhbCBSZWdpb25cIixcbiAgc2x1ZzogXCJjZW50cmFsXCIsXG59O1xuXG5jb25zdCBNaWRXZXN0UmVnaW9uID0ge1xuICBDU1VzOiBbQ1NVMTAsIENTVTIyLCBDU1UyMywgQ1NVMjQsIENTVTI1XSxcbiAgbmFtZTogXCJNaWR3ZXN0IFJlZ2lvblwiLFxuICBzbHVnOiBcIm1pZHdlc3RcIixcbn07XG5cbmV4cG9ydCBjb25zdCBDU1VTdHJ1Y3R1cmUgPSBbXG4gIEVhc3Rlcm5SZWdpb24sXG4gIFNvdXRoZXJuUmVnaW9uLFxuICBDZW50cmFsUmVnaW9uLFxuICBOb3J0aGVyblJlZ2lvbixcbiAgV2VzdGVyblJlZ2lvbixcbiAgTWlkV2VzdFJlZ2lvbixcbl07XG5cbmV4cG9ydCBjb25zdCByZWdpb25DU1VzID0ge1xuICBOb3J0aGVyblJlZ2lvbixcbiAgU291dGhlcm5SZWdpb24sXG4gIEVhc3Rlcm5SZWdpb24sXG4gIFdlc3Rlcm5SZWdpb24sXG4gIENlbnRyYWxSZWdpb24sXG4gIE1pZFdlc3RSZWdpb24sXG59O1xuXG5leHBvcnQgY29uc3QgaXNMb2NhbGl0eUluUmVnaW9uID0gKHJlZ2lvbiwgbG9jYWxpdHkpID0+IHtcbiAgbGV0IGZvdW5kID0gZmFsc2U7XG4gIHJlZ2lvbi5DU1VzLmZvckVhY2goKGNzdSkgPT4ge1xuICAgIGlmIChjc3UubG9jYWxpdGllcy5pbmNsdWRlcyhsb2NhbGl0eSkpIHtcbiAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZm91bmQ7XG59O1xuXG5leHBvcnQgY29uc3QgaXNMb2NhbGl0eUluUmVnaW9uSUQgPSAocmVnaW9uSUQsIGxvY2FsaXR5KSA9PiB7XG4gIGNvbnN0IHJlZ2lvbiA9IENTVVN0cnVjdHVyZS5maW5kKChyZWdpb24pID0+IHJlZ2lvbi5zbHVnID09PSByZWdpb25JRCk7XG4gIHJldHVybiBpc0xvY2FsaXR5SW5SZWdpb24ocmVnaW9uLCBsb2NhbGl0eSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNMb2NhbGl0eUluQ1NVSUQgPSAoY3N1SUQsIGxvY2FsaXR5KSA9PiB7XG4gIGNvbnN0IGNzdSA9IHNvcnRlZENTVXMuZmluZCgoY3N1KSA9PiBjc3Uuc2x1ZyA9PT0gY3N1SUQpO1xuICByZXR1cm4gY3N1LmxvY2FsaXRpZXMuaW5jbHVkZXMobG9jYWxpdHkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNzdUxpc3RGcm9tRklQUyA9IChmaXBzTGlzdCkgPT4ge1xuICBjb25zdCBjc3VOYW1lcyA9IG5ldyBTZXQoKTtcbiAgc29ydGVkQ1NVcy5mb3JFYWNoKChjc3UpID0+IHtcbiAgICBpZiAoY3N1LmxvY2FsaXRpZXMuc29tZSgobG9jYWxpdHkpID0+IGZpcHNMaXN0LmluY2x1ZGVzKGxvY2FsaXR5KSkpIHtcbiAgICAgIGNzdU5hbWVzLmFkZChjc3UubmFtZSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIFsuLi5jc3VOYW1lc107XG59O1xuIiwiLy9jb25uZWN0IHRvIGRhdGEgZmlsZVxuY29uc3QgZ2V0WE1MID0gYXN5bmMgKGZpbGVuYW1lKSA9PiB7XG4gIGNvbnN0IENvbm5lY3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgQ29ubmVjdC5vcGVuKFwiR0VUXCIsIGZpbGVuYW1lLCBmYWxzZSk7XG4gIENvbm5lY3Quc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQveG1sXCIpO1xuICBDb25uZWN0LnNlbmQobnVsbCk7XG4gIHJldHVybiBDb25uZWN0LnJlc3BvbnNlWE1MO1xufTtcblxuY29uc3QgZGF0YSA9IGF3YWl0IGdldFhNTChcIi9kYXRhL2RzcHMueG1sXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBkYXRhO1xuIiwiaW1wb3J0IHsgQVBJIH0gZnJvbSBcIi4uLy4uL2FwaS9hcGkuanNcIjtcbmltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHsgcmVnaW9uQ1NVcywgc29ydGVkQ1NVcywgaXNMb2NhbGl0eUluUmVnaW9uIH0gZnJvbSBcIi4uL2NzdS5qc1wiO1xuXG5jb25zdCBsb2NhbGl0aWVzRnJvbVJlZ2lvbiA9IChyZWdpb24pID0+IHtcbiAgbGV0IGxvY2FsaXRpZXMgPSBbXTtcbiAgcmVnaW9uLkNTVXMuZm9yRWFjaCgoY3N1KSA9PiB7XG4gICAgbG9jYWxpdGllcyA9IGxvY2FsaXRpZXMuY29uY2F0KGNzdS5sb2NhbGl0aWVzKTtcbiAgfSk7XG4gIHJldHVybiBsb2NhbGl0aWVzO1xufTtcblxuY29uc3QgcmVnaW9ucyA9IHtcbiAgMDoge1xuICAgIHN0YXRlczogbG9jYWxpdGllc0Zyb21SZWdpb24ocmVnaW9uQ1NVcy5Ob3J0aGVyblJlZ2lvbiksXG4gICAgbmFtZTogXCJOb3J0aGVybiBSZWdpb25cIixcbiAgICBjb2xvcjogY29sb3JzLk5vcnRoZXJuQ29sb3IsXG4gIH0sXG4gIDE6IHtcbiAgICBzdGF0ZXM6IGxvY2FsaXRpZXNGcm9tUmVnaW9uKHJlZ2lvbkNTVXMuQ2VudHJhbFJlZ2lvbiksXG4gICAgbmFtZTogXCJDZW50cmFsIFJlZ2lvblwiLFxuICAgIGNvbG9yOiBjb2xvcnMuQ2VudHJhbENvbG9yLFxuICB9LFxuICAyOiB7XG4gICAgc3RhdGVzOiBsb2NhbGl0aWVzRnJvbVJlZ2lvbihyZWdpb25DU1VzLldlc3Rlcm5SZWdpb24pLFxuICAgIG5hbWU6IFwiV2VzdGVybiBSZWdpb25cIixcbiAgICBjb2xvcjogY29sb3JzLldlc3Rlcm5Db2xvcixcbiAgfSxcbiAgMzoge1xuICAgIHN0YXRlczogbG9jYWxpdGllc0Zyb21SZWdpb24ocmVnaW9uQ1NVcy5Tb3V0aGVyblJlZ2lvbiksXG4gICAgbmFtZTogXCJTb3V0aGVybiBSZWdpb25cIixcbiAgICBjb2xvcjogY29sb3JzLlNvdXRoZXJuQ29sb3IsXG4gIH0sXG4gIDQ6IHtcbiAgICBzdGF0ZXM6IGxvY2FsaXRpZXNGcm9tUmVnaW9uKHJlZ2lvbkNTVXMuRWFzdGVyblJlZ2lvbiksXG4gICAgbmFtZTogXCJFYXN0ZXJuIFJlZ2lvblwiLFxuICAgIGNvbG9yOiBjb2xvcnMuRWFzdGVybkNvbG9yLFxuICB9LFxuICA1OiB7XG4gICAgc3RhdGVzOiBsb2NhbGl0aWVzRnJvbVJlZ2lvbihyZWdpb25DU1VzLk1pZFdlc3RSZWdpb24pLFxuICAgIG5hbWU6IFwiTWlkd2VzdCBSZWdpb25cIixcbiAgICBjb2xvcjogY29sb3JzLk1pZFdlc3Rlcm5Db2xvcixcbiAgfSxcbn07XG5cbmNvbnN0IHJlZ2lvbkNvbG9yID0gKGxvY2FsaXR5KSA9PiB7XG4gIGlmIChpc0xvY2FsaXR5SW5SZWdpb24ocmVnaW9uQ1NVcy5Ob3J0aGVyblJlZ2lvbiwgbG9jYWxpdHkpKSB7XG4gICAgcmV0dXJuIGNvbG9ycy5Ob3J0aGVybkNvbG9yO1xuICB9IGVsc2UgaWYgKGlzTG9jYWxpdHlJblJlZ2lvbihyZWdpb25DU1VzLkNlbnRyYWxSZWdpb24sIGxvY2FsaXR5KSkge1xuICAgIHJldHVybiBjb2xvcnMuQ2VudHJhbENvbG9yO1xuICB9IGVsc2UgaWYgKGlzTG9jYWxpdHlJblJlZ2lvbihyZWdpb25DU1VzLldlc3Rlcm5SZWdpb24sIGxvY2FsaXR5KSkge1xuICAgIHJldHVybiBjb2xvcnMuV2VzdGVybkNvbG9yO1xuICB9IGVsc2UgaWYgKGlzTG9jYWxpdHlJblJlZ2lvbihyZWdpb25DU1VzLlNvdXRoZXJuUmVnaW9uLCBsb2NhbGl0eSkpIHtcbiAgICByZXR1cm4gY29sb3JzLlNvdXRoZXJuQ29sb3I7XG4gIH0gZWxzZSBpZiAoaXNMb2NhbGl0eUluUmVnaW9uKHJlZ2lvbkNTVXMuRWFzdGVyblJlZ2lvbiwgbG9jYWxpdHkpKSB7XG4gICAgcmV0dXJuIGNvbG9ycy5FYXN0ZXJuQ29sb3I7XG4gIH0gZWxzZSBpZiAoaXNMb2NhbGl0eUluUmVnaW9uKHJlZ2lvbkNTVXMuTWlkV2VzdFJlZ2lvbiwgbG9jYWxpdHkpKSB7XG4gICAgcmV0dXJuIGNvbG9ycy5NaWRXZXN0ZXJuQ29sb3I7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFwiIzAwMDAwMFwiO1xuICB9XG59O1xuXG5jb25zdCBsb2NhbGl0eVBhZ2VQYXRoID0gKCkgPT4ge1xuICBjb25zdCBwYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLmluY2x1ZGVzKFwicGFnZXNcIikpIHtcbiAgICByZXR1cm4gXCIuLi9sb2NhbGl0eS9pbmRleC5odG1sXCI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFwiLi9wYWdlcy9sb2NhbGl0eS9pbmRleC5odG1sXCI7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBzZXRNYXBDU1VSZWdpb25zID0gKCkgPT4ge1xuICAvLyBAdHMtaWdub3JlIChnbG9iYWwgdmFyaWFibGUpXG4gIHNpbXBsZW1hcHNfc3RhdGVtYXBfbWFwZGF0YS5yZWdpb25zID0gcmVnaW9ucztcblxuICAvLyBAdHMtaWdub3JlIChnbG9iYWwgdmFyaWFibGUpXG4gIGNvbnN0IGxvY2FsaXRpZXMgPSBzaW1wbGVtYXBzX3N0YXRlbWFwX21hcGRhdGEuc3RhdGVfc3BlY2lmaWM7XG4gIGZvciAobGV0IGxvY2FsaXR5IGluIGxvY2FsaXRpZXMpIHtcbiAgICBsb2NhbGl0aWVzW2xvY2FsaXR5XS5jb2xvciA9IHJlZ2lvbkNvbG9yKGxvY2FsaXR5KTtcbiAgICBjb25zdCBwYXRoID0gbG9jYWxpdHlQYWdlUGF0aCgpO1xuICAgIGxvY2FsaXRpZXNbbG9jYWxpdHldLnVybCA9IGAke3BhdGh9P2lkPSR7bG9jYWxpdHl9YDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHNldE1hcExvY2F0aW9ucyA9IChwcm92aWRlcklEKSA9PiB7XG4gIGNvbnN0IGxvY2F0aW9ucyA9IEFQSS5nZXRBbGxMb2NhdGlvbnMocHJvdmlkZXJJRCk7XG5cbiAgdmFyIG9mZmljZVVSTCA9IFwicGFnZXMvcHJvdmlkZXIvaW5kZXguaHRtbD9pZD1cIjtcbiAgbG9jYXRpb25zLmZvckVhY2goKGxvY2F0aW9uLCBpbmRleCkgPT4ge1xuICAgIC8vIEB0cy1pZ25vcmUgKGdsb2JhbCB2YXJpYWJsZSlcbiAgICBzaW1wbGVtYXBzX3N0YXRlbWFwX21hcGRhdGEubG9jYXRpb25zW2luZGV4XSA9IHtcbiAgICAgIGxhdDogbG9jYXRpb24ubGF0LFxuICAgICAgbG5nOiBsb2NhdGlvbi5sbmcsXG4gICAgICBuYW1lOiBsb2NhdGlvbi5wcm92aWRlck5hbWUsXG4gICAgICBjb2xvcjogY29sb3JzLkVCQUJsdWUsXG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgbG9jYXRpb24uc3RyZWV0ICtcbiAgICAgICAgXCI8YnI+XCIgK1xuICAgICAgICBsb2NhdGlvbi5jaXR5ICtcbiAgICAgICAgXCIsIFwiICtcbiAgICAgICAgbG9jYXRpb24uc3RhdGUgK1xuICAgICAgICBcIiBcIiArXG4gICAgICAgIGxvY2F0aW9uLnppcCArXG4gICAgICAgIFwiPGJyPlwiICtcbiAgICAgICAgbG9jYXRpb24ucGhvbmUsXG4gICAgICB1cmw6IG9mZmljZVVSTCArIGxvY2F0aW9uLnByb3ZpZGVySWQsXG4gICAgICBzaXplOiBcImRlZmF1bHRcIixcbiAgICAgIHR5cGU6IFwiZGVmYXVsdFwiLFxuICAgICAgaW1hZ2VfdXJsOiBcImRlZmF1bHRcIixcbiAgICAgIG9wYWNpdHk6IFwiZGVmYXVsdFwiLFxuICAgIH07XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFJlZ2lvbkJ5Q1NVID0gKGNzdSkgPT4ge1xuICAvLyBAdHMtaWdub3JlIChnbG9iYWwgdmFyaWFibGUpXG4gIHNpbXBsZW1hcHNfc3RhdGVtYXBfbWFwZGF0YS5yZWdpb25zID0ge307XG4gIC8vIGl0ZXJhdGUgb3ZlciBhbGwgQ1NVcyBhbmQgc2V0IHRoZW0gYXMgcmVnaW9uc1xuICBzb3J0ZWRDU1VzLmZvckVhY2goKGNzdSkgPT4ge1xuICAgIC8vIEB0cy1pZ25vcmUgKGdsb2JhbCB2YXJpYWJsZSlcbiAgICBzaW1wbGVtYXBzX3N0YXRlbWFwX21hcGRhdGEucmVnaW9uc1tjc3Uuc2x1Z10gPSB7XG4gICAgICBzdGF0ZXM6IGNzdS5sb2NhbGl0aWVzLFxuICAgICAgbmFtZTogY3N1Lm5hbWUsXG4gICAgICB1cmw6IFwiaW5kZXguaHRtbD9pZD1cIiArIGNzdS5zbHVnLFxuICAgIH07XG4gIH0pO1xuXG4gIC8vIEB0cy1pZ25vcmUgKGdsb2JhbCB2YXJpYWJsZSlcbiAgc2ltcGxlbWFwc19zdGF0ZW1hcF9tYXBkYXRhLm1haW5fc2V0dGluZ3MuaW5pdGlhbF96b29tID0gY3N1LnNsdWc7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0QWxsRGVmYXVsdENvbG9yID0gKCkgPT4ge1xuICAvLyBAdHMtaWdub3JlIChnbG9iYWwgdmFyaWFibGUpXG4gIGNvbnN0IGxvY2FsaXRpZXMgPSBzaW1wbGVtYXBzX3N0YXRlbWFwX21hcGRhdGEuc3RhdGVfc3BlY2lmaWM7XG4gIGZvciAobGV0IGxvY2FsaXR5IGluIGxvY2FsaXRpZXMpIHtcbiAgICBsb2NhbGl0aWVzW2xvY2FsaXR5XS5jb2xvciA9IFwiZGVmYXVsdFwiO1xuICB9XG4gIC8vc2FtZSBmb3IgcmVnaW9uc1xuICAvLyBAdHMtaWdub3JlIChnbG9iYWwgdmFyaWFibGUpXG4gIGNvbnN0IHJlZ2lvbnMgPSBzaW1wbGVtYXBzX3N0YXRlbWFwX21hcGRhdGEucmVnaW9ucztcbiAgZm9yIChsZXQgcmVnaW9uIGluIHJlZ2lvbnMpIHtcbiAgICByZWdpb25zW3JlZ2lvbl0uY29sb3IgPSBcImRlZmF1bHRcIjtcbiAgfVxufTtcblxuLy8gd29yayBhcm91bmQgZm9yIHRoZSB6b29tIGZ1bmN0aW9uXG4vLyBzaW1wbGVtYXBzIG1ldGhvZHMgbm90IGF2YWlsYWJsZSBwcmUtbG9hZFxuZXhwb3J0IGNvbnN0IHpvb21Ub0ZJUFMgPSAoZmlwc0lEKSA9PiB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgc2ltcGxlbWFwc19zdGF0ZW1hcF9tYXBkYXRhLnJlZ2lvbnMgPSB7fTtcbiAgLy9hZGQgY3VycmVudCBsb2NhbGl0eSB0byB0aGUgb25lIHJlZ2lvblxuICAvLyBAdHMtaWdub3JlXG4gIHNpbXBsZW1hcHNfc3RhdGVtYXBfbWFwZGF0YS5yZWdpb25zW1wiMFwiXSA9IHtcbiAgICBzdGF0ZXM6IFtmaXBzSURdLFxuICAgIG5hbWU6IFwiRm9jdXNcIixcbiAgfTtcbiAgLy8gQHRzLWlnbm9yZVxuICBzaW1wbGVtYXBzX3N0YXRlbWFwX21hcGRhdGEubWFpbl9zZXR0aW5ncy5pbml0aWFsX3pvb20gPSAwO1xufTtcblxuZXhwb3J0IGNvbnN0IHpvb21Ub1JlZ2lvbiA9IChyZWdpb25JRCkgPT4ge1xuICAvLyBAdHMtaWdub3JlXG4gIHNpbXBsZW1hcHNfc3RhdGVtYXBfbWFwZGF0YS5tYWluX3NldHRpbmdzLmluaXRpYWxfem9vbSA9IHJlZ2lvbklEO1xufTtcblxuZXhwb3J0IGNvbnN0IGNvbG9yRklQUyA9IChmaXBzTGlzdCwgY29sb3IpID0+IHtcbiAgaWYgKCFmaXBzTGlzdCkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0IGxvY2FsaXRpZXMgPSBzaW1wbGVtYXBzX3N0YXRlbWFwX21hcGRhdGEuc3RhdGVfc3BlY2lmaWM7XG4gIGZpcHNMaXN0LmZvckVhY2goKGZpcHMpID0+IHtcbiAgICBsb2NhbGl0aWVzW2ZpcHNdLmNvbG9yID0gY29sb3I7XG4gICAgbG9jYWxpdGllc1tmaXBzXS5ob3Zlcl9jb2xvciA9IGNvbG9yO1xuICB9KTtcbn07XG5cbmNvbnN0IGxhbmd1YWdlc0FycmF5RXhhbXBsZSA9IFtcbiAgeyBTcGFuaXNoOiBbXCI1MTA5MlwiLCBcIjUxMDkzXCIsIFwiNTEwOTRcIiwgXCI1MTA5NVwiLCBcIjUxMDk2XCJdIH0sXG4gIHsgRnJlbmNoOiBbXCI1MTA5MlwiLCBcIjUxMDk3XCIsIFwiNTEwOThcIiwgXCI1MTA5OVwiLCBcIjUxMTAwXCIsIFwiNTExMDFcIl0gfSxcbl07XG5cbmV4cG9ydCBjb25zdCBhZGRMYW5ndWFnZURlc2NyaXB0aW9ucyA9IChsYW5ndWFnZXNBcnJheSkgPT4ge1xuICBjb25zdCBmaXBzTWFwID0gbmV3IE1hcCgpO1xuICBsYW5ndWFnZXNBcnJheS5mb3JFYWNoKChsYW5nT2JqKSA9PiB7XG4gICAgT2JqZWN0LmtleXMobGFuZ09iaikuZm9yRWFjaCgobGFuZykgPT4ge1xuICAgICAgbGFuZ09ialtsYW5nXS5mb3JFYWNoKChmaXBzKSA9PiB7XG4gICAgICAgIGlmIChmaXBzTWFwLmhhcyhmaXBzKSkge1xuICAgICAgICAgIGZpcHNNYXAuZ2V0KGZpcHMpLmFkZChsYW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaXBzTWFwLnNldChmaXBzLCBuZXcgU2V0KFtsYW5nXSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIGZpcHNNYXAuZm9yRWFjaCgobGFuZ3VhZ2VzLCBmaXBzKSA9PiB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHNpbXBsZW1hcHNfc3RhdGVtYXBfbWFwZGF0YS5zdGF0ZV9zcGVjaWZpY1tmaXBzXS5kZXNjcmlwdGlvbiA9XG4gICAgICBcIkF2YWlsYWJsZSBpbiBcIiArIFsuLi5sYW5ndWFnZXNdLmpvaW4oXCIsIFwiKTtcbiAgfSk7XG59O1xuIiwiZXhwb3J0IGNvbnN0IHJlbW92ZUR1cGxpY2F0ZXMgPSAobnVtKSA9PiB7XG4gIHZhciB4LFxuICAgIGxlbiA9IG51bS5sZW5ndGgsXG4gICAgb3V0ID0gW10sXG4gICAgb2JqID0ge307XG5cbiAgZm9yICh4ID0gMDsgeCA8IGxlbjsgeCsrKSB7XG4gICAgb2JqW251bVt4XV0gPSAwO1xuICB9XG4gIGZvciAoeCBpbiBvYmopIHtcbiAgICBvdXQucHVzaCh4KTtcbiAgfVxuICByZXR1cm4gb3V0O1xufTtcbiIsImltcG9ydCB7IEFQSSB9IGZyb20gXCIuLi8uLi9hcGkvYXBpLmpzXCI7XG5jb25zdCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG5jb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHF1ZXJ5U3RyaW5nKTtcbmV4cG9ydCBjb25zdCBwcm92aWRlcklEID0gdXJsUGFyYW1zLmdldChcImlkXCIpO1xuXG5leHBvcnQgY29uc3Qgc2VydmljZUZJUFMgPSAoLyoqIEB0eXBlIHtzdHJpbmd9ICovIHNlcnZpY2VOYW1lKSA9PiB7XG4gIHJldHVybiBBUEkuZ2V0U2VydmljZU1hcEZJUFMoeyBwcm92aWRlcklELCBzZXJ2aWNlTmFtZSB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXJ2aWNlTmFtZXMgPSBBUEkuZ2V0UHJvdmlkZXJTZXJ2aWNlcyhwcm92aWRlcklEKTtcbmV4cG9ydCBjb25zdCBwcm92aWRlckluZm8gPSBBUEkuZ2V0UHJvdmlkZXJJbmZvKHByb3ZpZGVySUQpO1xuZXhwb3J0IGNvbnN0IGFsbEZJUFMgPSBBUEkuZ2V0QWxsRklQUyhwcm92aWRlcklEKTtcbmV4cG9ydCBjb25zdCBwcm92aWRlckxhbmd1YWdlcyA9IEFQSS5nZXRBbGxMYW5ndWFnZXMocHJvdmlkZXJJRCk7XG4iLCJpbXBvcnQgZHNwc1hNTCBmcm9tIFwiLi4vLi4vbGliL2dldFhNTC5qc1wiO1xuaW1wb3J0IHtcbiAgcHJvdmlkZXJJRCxcbiAgc2VydmljZUZJUFMsXG4gIHNlcnZpY2VOYW1lcyxcbiAgcHJvdmlkZXJJbmZvLFxuICBhbGxGSVBTLFxuICBwcm92aWRlckxhbmd1YWdlcyxcbn0gZnJvbSBcIi4vYXBpLmpzXCI7XG5pbXBvcnQgY29sb3JzIGZyb20gXCIuLi8uLi9saWIvY29sb3JzLmpzXCI7XG5pbXBvcnQgeyByZW1vdmVEdXBsaWNhdGVzIH0gZnJvbSBcIi4uLy4uL2xpYi91dGlscy5qc1wiO1xuaW1wb3J0IHsgQ1NVU3RydWN0dXJlLCBjc3VMaXN0RnJvbUZJUFMgfSBmcm9tIFwiLi4vLi4vbGliL2NzdS5qc1wiO1xuaW1wb3J0IHtcbiAgc2V0TWFwQ1NVUmVnaW9ucyxcbiAgc2V0QWxsRGVmYXVsdENvbG9yLFxuICBzZXRNYXBMb2NhdGlvbnMsXG4gIHpvb21Ub1JlZ2lvbixcbiAgY29sb3JGSVBTLFxuICBhZGRMYW5ndWFnZURlc2NyaXB0aW9ucyxcbn0gZnJvbSBcIi4uLy4uL2xpYi9zaW1wbGVtYXBzL3V0aWxzLmpzXCI7XG5cbmNvbnN0IHsgUmVnQ29sb3IsIFRyYXZlbENvbG9yIH0gPSBjb2xvcnM7XG5cbmNvbnN0IHtcbiAgcHJvdmlkZXJOYW1lLFxuICBjb250YWN0TmFtZSxcbiAgY29udGFjdEVtYWlsLFxuICB3ZWJzaXRlLFxuICBsYXN0VXBkYXRlZCxcbiAgbWFwWm9vbSxcbn0gPSBwcm92aWRlckluZm87XG5cbmNvbnN0IGxhc3RVcGRhdGVkRGF0ZVBhcnRzID0gbGFzdFVwZGF0ZWQuc3BsaXQoXCItXCIpO1xuY29uc3QgbGFzdFVwZGF0ZWRUZXh0ID0gYCR7bGFzdFVwZGF0ZWREYXRlUGFydHNbMV19LyR7bGFzdFVwZGF0ZWREYXRlUGFydHNbMl19LyR7bGFzdFVwZGF0ZWREYXRlUGFydHNbMF19YDtcblxuc2V0TWFwQ1NVUmVnaW9ucygpO1xuc2V0QWxsRGVmYXVsdENvbG9yKCk7XG5zZXRNYXBMb2NhdGlvbnMocHJvdmlkZXJJRCk7XG56b29tVG9SZWdpb24obWFwWm9vbSk7XG5cbmNvbnN0IHByb3ZpZGVyTmFtZVNwYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcInByb3ZpZGVyTmFtZVwiKTtcbnByb3ZpZGVyTmFtZVNwYW4uZm9yRWFjaCgoc3BhbikgPT4gKHNwYW4uaW5uZXJUZXh0ID0gcHJvdmlkZXJOYW1lKSk7XG5cbmNvbnN0IHByb3ZpZGVySW5mb0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvdmlkZXJJbmZvXCIpO1xucHJvdmlkZXJJbmZvRGl2LmlubmVySFRNTCA9XG4gIFwiPHA+TGFzdCBVcGRhdGVkOiBcIiArXG4gIGxhc3RVcGRhdGVkVGV4dCArXG4gIFwiPC9wPlwiICtcbiAgXCI8cD5XZWJzaXRlOiA8YSBocmVmPSdcIiArXG4gIHdlYnNpdGUgK1xuICBcIic+XCIgK1xuICB3ZWJzaXRlICtcbiAgXCI8L2E+PC9wPlwiICtcbiAgXCI8cD5Db250YWN0OiBcIiArXG4gIGNvbnRhY3ROYW1lICtcbiAgXCI8L3A+XCIgK1xuICBcIjxwPkVtYWlsOiA8YSBocmVmPSdtYWlsdG86XCIgK1xuICBjb250YWN0RW1haWwgK1xuICBcIic+XCIgK1xuICBjb250YWN0RW1haWwgK1xuICBcIjwvYT48L3A+XCI7XG5cbmNvbnN0IHNlcnZpY2VTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcInNlcnZpY2VTZWxlY3RcIilbMF07XG5zZXJ2aWNlTmFtZXMuZm9yRWFjaCgoc2VydmljZU5hbWUpID0+IHtcbiAgY29uc3Qgc2VydmljZU9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gIHNlcnZpY2VPcHRpb24udmFsdWUgPSBzZXJ2aWNlTmFtZTtcbiAgc2VydmljZU9wdGlvbi50ZXh0ID0gc2VydmljZU5hbWU7XG4gIHNlcnZpY2VTZWxlY3QuYXBwZW5kQ2hpbGQoc2VydmljZU9wdGlvbik7XG59KTtcblxuY29uc3QgZGlzcGxheVNlcnZpY2UgPSAoKSA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkU2VydmljZU5hbWUgPVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBzZXJ2aWNlU2VsZWN0Lm9wdGlvbnNbc2VydmljZVNlbGVjdC5zZWxlY3RlZEluZGV4XS50ZXh0O1xuICBjb25zdCBmaXBzTGlzdHMgPSBzZXJ2aWNlRklQUyhzZWxlY3RlZFNlcnZpY2VOYW1lKTtcbiAgY29sb3JGSVBTKGZpcHNMaXN0cy5hdmFpbGFibGUsIFJlZ0NvbG9yKTtcbiAgY29sb3JGSVBTKGZpcHNMaXN0cy5saW1pdGVkLCBUcmF2ZWxDb2xvcik7XG4gIGFkZExhbmd1YWdlRGVzY3JpcHRpb25zKGZpcHNMaXN0cy5sYW5ndWFnZXMpO1xuICAvLyBAdHMtaWdub3JlXG4gIGlmICh0eXBlb2Ygc2ltcGxlbWFwc19zdGF0ZW1hcC5yZWZyZXNoID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgc2ltcGxlbWFwc19zdGF0ZW1hcC5yZWZyZXNoKCk7XG4gIH1cbn07XG5zZXJ2aWNlU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZGlzcGxheVNlcnZpY2UpO1xuZGlzcGxheVNlcnZpY2UoKTtcblxuY29uc3QgY3N1TGlzdCA9IGNzdUxpc3RGcm9tRklQUyhhbGxGSVBTKTtcbmNvbnN0IHByb3ZpZGVyQ1NVTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvdmlkZXJDU1VzXCIpO1xuY3N1TGlzdC5mb3JFYWNoKChjc3UpID0+IHtcbiAgY29uc3QgY3N1TEkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIGNzdUxJLmlubmVyVGV4dCA9IGNzdTtcbiAgcHJvdmlkZXJDU1VMaXN0LmFwcGVuZENoaWxkKGNzdUxJKTtcbn0pO1xuXG5jb25zdCBjb3VudHlMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm92aWRlckNvdW50aWVzXCIpO1xuY29uc3QgY2l0eUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb3ZpZGVyQ2l0aWVzXCIpO1xuYWxsRklQUy5mb3JFYWNoKChmaXBzKSA9PiB7XG4gIGNvbnN0IGxvY2FsaXR5TEkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIC8vIEB0cy1pZ25vcmVcbiAgbG9jYWxpdHlMSS5pbm5lclRleHQgPSBzaW1wbGVtYXBzX3N0YXRlbWFwX21hcGRhdGEuc3RhdGVfc3BlY2lmaWNbZmlwc10ubmFtZTtcbiAgaWYgKE51bWJlcihmaXBzKSA+IDUxNTAwKSB7XG4gICAgY2l0eUxpc3QuYXBwZW5kQ2hpbGQobG9jYWxpdHlMSSk7XG4gIH0gZWxzZSB7XG4gICAgY291bnR5TGlzdC5hcHBlbmRDaGlsZChsb2NhbGl0eUxJKTtcbiAgfVxufSk7XG5cbmNvbnN0IHByb3ZpZGVyU2VydmljZUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb3ZpZGVyU2VydmljZXNcIik7XG5zZXJ2aWNlTmFtZXMuZm9yRWFjaCgoc2VydmljZU5hbWUpID0+IHtcbiAgY29uc3Qgc2VydmljZUxJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBzZXJ2aWNlTEkuaW5uZXJUZXh0ID0gc2VydmljZU5hbWU7XG4gIHByb3ZpZGVyU2VydmljZUxpc3QuYXBwZW5kQ2hpbGQoc2VydmljZUxJKTtcbn0pO1xuXG5jb25zdCBsYW5ndWFnZUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb3ZpZGVyTGFuZ3VhZ2VzXCIpO1xucHJvdmlkZXJMYW5ndWFnZXMuZm9yRWFjaCgobGFuZ3VhZ2UpID0+IHtcbiAgY29uc3QgbGFuZ3VhZ2VMSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgbGFuZ3VhZ2VMSS5pbm5lclRleHQgPSBsYW5ndWFnZTtcbiAgbGFuZ3VhZ2VMaXN0LmFwcGVuZENoaWxkKGxhbmd1YWdlTEkpO1xufSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwidmFyIHdlYnBhY2tRdWV1ZXMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2woXCJ3ZWJwYWNrIHF1ZXVlc1wiKSA6IFwiX193ZWJwYWNrX3F1ZXVlc19fXCI7XG52YXIgd2VicGFja0V4cG9ydHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2woXCJ3ZWJwYWNrIGV4cG9ydHNcIikgOiBcIl9fd2VicGFja19leHBvcnRzX19cIjtcbnZhciB3ZWJwYWNrRXJyb3IgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2woXCJ3ZWJwYWNrIGVycm9yXCIpIDogXCJfX3dlYnBhY2tfZXJyb3JfX1wiO1xudmFyIHJlc29sdmVRdWV1ZSA9IChxdWV1ZSkgPT4ge1xuXHRpZihxdWV1ZSAmJiBxdWV1ZS5kIDwgMSkge1xuXHRcdHF1ZXVlLmQgPSAxO1xuXHRcdHF1ZXVlLmZvckVhY2goKGZuKSA9PiAoZm4uci0tKSk7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0gPyBmbi5yKysgOiBmbigpKSk7XG5cdH1cbn1cbnZhciB3cmFwRGVwcyA9IChkZXBzKSA9PiAoZGVwcy5tYXAoKGRlcCkgPT4ge1xuXHRpZihkZXAgIT09IG51bGwgJiYgdHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIikge1xuXHRcdGlmKGRlcFt3ZWJwYWNrUXVldWVzXSkgcmV0dXJuIGRlcDtcblx0XHRpZihkZXAudGhlbikge1xuXHRcdFx0dmFyIHF1ZXVlID0gW107XG5cdFx0XHRxdWV1ZS5kID0gMDtcblx0XHRcdGRlcC50aGVuKChyKSA9PiB7XG5cdFx0XHRcdG9ialt3ZWJwYWNrRXhwb3J0c10gPSByO1xuXHRcdFx0XHRyZXNvbHZlUXVldWUocXVldWUpO1xuXHRcdFx0fSwgKGUpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFcnJvcl0gPSBlO1xuXHRcdFx0XHRyZXNvbHZlUXVldWUocXVldWUpO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgb2JqID0ge307XG5cdFx0XHRvYmpbd2VicGFja1F1ZXVlc10gPSAoZm4pID0+IChmbihxdWV1ZSkpO1xuXHRcdFx0cmV0dXJuIG9iajtcblx0XHR9XG5cdH1cblx0dmFyIHJldCA9IHt9O1xuXHRyZXRbd2VicGFja1F1ZXVlc10gPSB4ID0+IHt9O1xuXHRyZXRbd2VicGFja0V4cG9ydHNdID0gZGVwO1xuXHRyZXR1cm4gcmV0O1xufSkpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5hID0gKG1vZHVsZSwgYm9keSwgaGFzQXdhaXQpID0+IHtcblx0dmFyIHF1ZXVlO1xuXHRoYXNBd2FpdCAmJiAoKHF1ZXVlID0gW10pLmQgPSAtMSk7XG5cdHZhciBkZXBRdWV1ZXMgPSBuZXcgU2V0KCk7XG5cdHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cdHZhciBjdXJyZW50RGVwcztcblx0dmFyIG91dGVyUmVzb2x2ZTtcblx0dmFyIHJlamVjdDtcblx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqKSA9PiB7XG5cdFx0cmVqZWN0ID0gcmVqO1xuXHRcdG91dGVyUmVzb2x2ZSA9IHJlc29sdmU7XG5cdH0pO1xuXHRwcm9taXNlW3dlYnBhY2tFeHBvcnRzXSA9IGV4cG9ydHM7XG5cdHByb21pc2Vbd2VicGFja1F1ZXVlc10gPSAoZm4pID0+IChxdWV1ZSAmJiBmbihxdWV1ZSksIGRlcFF1ZXVlcy5mb3JFYWNoKGZuKSwgcHJvbWlzZVtcImNhdGNoXCJdKHggPT4ge30pKTtcblx0bW9kdWxlLmV4cG9ydHMgPSBwcm9taXNlO1xuXHRib2R5KChkZXBzKSA9PiB7XG5cdFx0Y3VycmVudERlcHMgPSB3cmFwRGVwcyhkZXBzKTtcblx0XHR2YXIgZm47XG5cdFx0dmFyIGdldFJlc3VsdCA9ICgpID0+IChjdXJyZW50RGVwcy5tYXAoKGQpID0+IHtcblx0XHRcdGlmKGRbd2VicGFja0Vycm9yXSkgdGhyb3cgZFt3ZWJwYWNrRXJyb3JdO1xuXHRcdFx0cmV0dXJuIGRbd2VicGFja0V4cG9ydHNdO1xuXHRcdH0pKVxuXHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblx0XHRcdGZuID0gKCkgPT4gKHJlc29sdmUoZ2V0UmVzdWx0KSk7XG5cdFx0XHRmbi5yID0gMDtcblx0XHRcdHZhciBmblF1ZXVlID0gKHEpID0+IChxICE9PSBxdWV1ZSAmJiAhZGVwUXVldWVzLmhhcyhxKSAmJiAoZGVwUXVldWVzLmFkZChxKSwgcSAmJiAhcS5kICYmIChmbi5yKyssIHEucHVzaChmbikpKSk7XG5cdFx0XHRjdXJyZW50RGVwcy5tYXAoKGRlcCkgPT4gKGRlcFt3ZWJwYWNrUXVldWVzXShmblF1ZXVlKSkpO1xuXHRcdH0pO1xuXHRcdHJldHVybiBmbi5yID8gcHJvbWlzZSA6IGdldFJlc3VsdCgpO1xuXHR9LCAoZXJyKSA9PiAoKGVyciA/IHJlamVjdChwcm9taXNlW3dlYnBhY2tFcnJvcl0gPSBlcnIpIDogb3V0ZXJSZXNvbHZlKGV4cG9ydHMpKSwgcmVzb2x2ZVF1ZXVlKHF1ZXVlKSkpO1xuXHRxdWV1ZSAmJiBxdWV1ZS5kIDwgMCAmJiAocXVldWUuZCA9IDApO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdtb2R1bGUnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3BhZ2VzL3Byb3ZpZGVyL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9