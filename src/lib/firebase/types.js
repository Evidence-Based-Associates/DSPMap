/**
 * @typedef Provider
 * @prop {string} providerName
 * @prop {string} website
 * @prop {string} contactName
 * @prop {string} contactEmail
 * @prop {number} defaultMapZoom
 * @prop {Office[]} offices
 */

/**
 * @typedef Office
 * @prop {string} providerName
 * @prop {string} street
 * @prop {string} city
 * @prop {string} state
 * @prop {string} zip
 * @prop {string} phone
 * @prop {number} lat
 * @prop {number} lng
 */

/**
 * @typedef Service
 * @prop {string} lastUpdated
 * @prop {string} lastUpdatedBy
 * @prop {number} mapZoom
 * @prop {string} providerName
 * @prop {string} serviceName
 * @prop {boolean} telehealth
 * @prop {string[]} allFIPS
 * @prop {string[]} limitedFIPS
 * @prop {Object.<string, string[]>} languageFIPS
 */

export const Types = {};
