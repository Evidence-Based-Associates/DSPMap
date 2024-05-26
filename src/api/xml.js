import { isLocalityInCSUID, isLocalityInRegionID } from "../lib/csu.js";

export class XML_API {
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
  getAllLocations(providerID = "") {
    let locations;
    if (providerID === "") {
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
  getServiceMapFIPS({ providerID = "", serviceName = "" }) {
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
        isLocalityInCSUID(locationID, fips.textContent)
      ) {
        isLocationMatch = true;
      }
      if (
        locationType === "Region" &&
        isLocalityInRegionID(locationID, fips.textContent)
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

  getGoogleMapsApiKey() {
    return "NOT AVAILABLE IN XML";
  }
}
