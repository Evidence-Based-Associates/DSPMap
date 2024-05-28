import { colorFIPS } from "../../../lib/simplemaps/utils.js";
import colors from "../../../../src/lib/colors.js";
import { allFips } from "../../../lib/csu.js";

/**
 * @type {import("../../../lib/firebase/types.js").Service[]}
 */
export const providerServices = [];

//TODO: AFTER THIS IS BUILT UP, MOVE TO SINGLE TYPES LOCATION, ADDING IN REMAINING FIELDS
/**
 * @typedef Service
 * @prop {string} serviceName
 * @prop {number} mapZoom
 * @prop {Set<string>} allFIPS
 * @prop {Set<string>} availableFIPS
 * @prop {Set<string>} limitedFIPS
 * @prop {Object.<string, Set<string>>} languageFIPS
 */
/**
 * @typedef AppState
 * @prop {string} selectedService
 * @prop {string} selectedLanguage
 * @prop {boolean} isLanguageMode
 * @prop {Service[]} providerServices
 * @prop {Set<string>} availableFIPS
 * @prop {Set<string>} limitedFIPS
 */

/**
 * @type {AppState}
 */
export let appState = {
  selectedService: "",
  selectedLanguage: "",
  isLanguageMode: false,
  providerServices: [],
  availableFIPS: new Set(),
  limitedFIPS: new Set(),
};

/**
 *
 * @param {string} fips
 * @param {Service} service
 */
const addFIPSToAvailable = (fips, service) => {
  //   appState.availableFIPS.add(fips);
  service.availableFIPS.add(fips);
};

/**
 * @param {string} fips
 * @param {Service} service
 */
const moveFIPSToLimited = (fips, service) => {
  if (!service.availableFIPS.has(fips)) {
    console.log(`FIPS ${fips} not available!`);
    return;
  }
  service.availableFIPS.delete(fips);
  service.limitedFIPS.add(fips);
};

/**
 * @param {string} fips
 * @param {Service} service
 */
const removeFIPSFromLimited = (fips, service) => {
  service.limitedFIPS.delete(fips);
};

export const toggleServiceFIPS = (fips) => {
  // target the service by name
  const service = appState.providerServices.find(
    (service) => service.serviceName === appState.selectedService
  );
  if (!service) {
    return;
  }
  const isInAvailable = service.availableFIPS.has(fips);
  const isInLimited = service.limitedFIPS.has(fips);
  if (!isInAvailable && !isInLimited) {
    addFIPSToAvailable(fips, service);
    colorFIPS([fips], colors.RegColor);
  } else if (isInAvailable) {
    moveFIPSToLimited(fips, service);
    colorFIPS([fips], colors.TravelColor);
  } else {
    removeFIPSFromLimited(fips, service);
    colorFIPS([fips], "default");
  }
};

export const setService = (/** @type {string} */ serviceName) => {
  appState.selectedService = serviceName;
  const service = appState.providerServices.find(
    (service) => service.serviceName === serviceName
  );
  if (!service) {
    console.log(`Service ${serviceName} not found!`);
    return;
  }
  // set all FIPS to default color
  colorFIPS(Array.from(allFips), "default");
  // set available FIPS to RegColor
  colorFIPS(Array.from(service.availableFIPS), colors.RegColor);
  // set limited FIPS to TravelColor
  colorFIPS(Array.from(service.limitedFIPS), colors.TravelColor);
  // refresh
  // @ts-ignore
  simplemaps_statemap.refresh();
};

export const initService = (/** @type {string} */ serviceName) => {
  const service = appState.providerServices.find(
    (service) => service.serviceName === serviceName
  );
  if (service) {
    return;
  }
  appState.selectedService = serviceName;
  appState.providerServices.push({
    serviceName,
    mapZoom: -1,
    allFIPS: new Set(),
    availableFIPS: new Set(),
    limitedFIPS: new Set(),
    languageFIPS: {},
  });
};

export const initLanguage = (/** @type {string} */ language) => {
  appState.selectedLanguage = language;
  const service = appState.providerServices.find(
    (service) => service.serviceName === appState.selectedService
  );
  if (!service) {
    return;
  }
  if (Object.keys(service.languageFIPS).includes(language)) {
    return;
  }
  console.log(
    `service.languageFIPS[${language}] is:`,
    service.languageFIPS[language]
  );
  service.languageFIPS[language] = new Set();
};

export const setLanguageMode = (/** @type {boolean} */ isLanguageMode) => {
  appState.isLanguageMode = isLanguageMode;
};

export const toggleLanguageFIPS = (/** @type {string} */ fips) => {
  const service = appState.providerServices.find(
    (service) => service.serviceName === appState.selectedService
  );
  if (!service || !appState.selectedLanguage) {
    return;
  }
  const isInLanguageFIPS =
    service.languageFIPS[appState.selectedLanguage].has(fips);
  if (!isInLanguageFIPS) {
    addFIPSToLanguage(fips, service);
    colorFIPS([fips], colors.RegColor);
  } else {
    removeFIPSFromLanguage(fips, service);
    colorFIPS([fips], "default");
  }
};

const addFIPSToLanguage = (
  /** @type {string} */ fips,
  /** @type {Service} */ service
) => {
  service.languageFIPS[appState.selectedLanguage].add(fips);
};

const removeFIPSFromLanguage = (
  /** @type {string} */ fips,
  /** @type {Service} */ service
) => {
  service.languageFIPS[appState.selectedLanguage].delete(fips);
};

export const setLanguage = (/** @type {string} */ language) => {
  appState.selectedLanguage = language;

  const service = appState.providerServices.find(
    (service) => service.serviceName === appState.selectedService
  );
  if (!service) {
    return;
  }

  // set all FIPS to default color
  colorFIPS(Array.from(allFips), "default");
  // set available FIPS to RegColor
  colorFIPS(Array.from(service.languageFIPS[language]), colors.RegColor);

  // @ts-ignore
  simplemaps_statemap.refresh();
};

export const setServiceZoom = (/** @type {number} */ zoom) => {
  const service = appState.providerServices.find(
    (service) => service.serviceName === appState.selectedService
  );
  if (!service) {
    return;
  }
  service.mapZoom = zoom;
};
