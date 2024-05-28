import { colorFIPS } from "../../../lib/simplemaps/utils.js";
import colors from "../../../../src/lib/colors.js";

/**
 * @type {import("../../../lib/firebase/types.js").Service[]}
 */
export const providerServices = [];

/**
 * @type {object}
 * @prop {Set[]} availableFIPS
 * @prop {string[]} limitedFIPS
 */
export let appState = {
  availableFIPS: new Set(),
  limitedFIPS: new Set(),
};

appState.availableFIPS;

/**
 *
 * @param {string} fips
 */
const addFIPSToAvailable = (fips) => {
  appState.availableFIPS.add(fips);
};

/**
 * @param {string} fips
 */
const moveFIPSToLimited = (fips) => {
  if (!appState.availableFIPS.has(fips)) {
    console.log(`FIPS ${fips} not available!`);
    return;
  }
  appState.availableFIPS.delete(fips);
  appState.limitedFIPS.add(fips);
};

/**
 * @param {string} fips
 */
const removeFIPSFromLimited = (fips) => {
  appState.limitedFIPS.delete(fips);
};

export const toggleServiceFIPS = (fips) => {
  const isInAvailable = appState.availableFIPS.has(fips);
  const isInLimited = appState.limitedFIPS.has(fips);
  if (!isInAvailable && !isInLimited) {
    addFIPSToAvailable(fips);
    colorFIPS([fips], colors.RegColor);
  } else if (isInAvailable) {
    moveFIPSToLimited(fips);
    colorFIPS([fips], colors.TravelColor);
  } else {
    removeFIPSFromLimited(fips);
    colorFIPS([fips], "default");
  }
};
