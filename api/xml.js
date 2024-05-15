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

  getAllProviderNames() {
    if (this.data !== null && this.data !== undefined) {
      const providers = this.data.getElementsByTagName("Provider");
      const providerNames = [];
      for (let i = 0; i < providers.length; i++) {
        const providerName = providers
          .item(i)
          ?.getElementsByTagName("Name")
          ?.item(0)?.textContent;
        providerNames.push(providerName);
      }
      providerNames.sort();
      return providerNames;
    } else {
      return "No data available.";
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
