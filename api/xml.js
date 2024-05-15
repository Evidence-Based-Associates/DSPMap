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

  getAllLocations() {
    if (this.data !== null && this.data !== undefined) {
      const locations = this.data.getElementsByTagName("Office");
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
    } else {
      return [];
    }
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

  getAllLanguages() {
    if (this.data !== null && this.data !== undefined) {
      var allLocations = this.data.getElementsByTagName("FIPs");
      let allLanguagesArray = [];
      for (var i = 0; i < allLocations.length; i++) {
        if (allLocations.item(i).getAttribute("languages")) {
          var serviceLanguageStr = allLocations
            .item(i)
            .getAttribute("languages");
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
    } else {
      return [];
    }
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
