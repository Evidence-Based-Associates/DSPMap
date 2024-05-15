import dspsXML from "../../src/getXML.js";
import { removeDuplicates } from "../../src/utils.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const languageID = urlParams.get("id");

var allLocations = dspsXML.getElementsByTagName("FIPs");
var allLanguagesArray = [];
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
      allLanguagesArray.push(allLocations.item(i).getAttribute("languages"));
    }
  }
}

allLanguagesArray = removeDuplicates(allLanguagesArray);
allLanguagesArray.sort();
const languageText = document.getElementsByName("langaugeText");
languageText.forEach((element) => {
  element.innerText = allLanguagesArray[languageID];
});

var allLocations = dspsXML.getElementsByTagName("FIPs");
var providerInfoArray = [];
for (let i = 0; i < allLocations.length; i++) {
  if (allLocations.item(i).getAttribute("languages")) {
    var serviceLanguage = allLocations.item(i).getAttribute("languages");
    if (serviceLanguage.includes(allLanguagesArray[languageID])) {
      var provider = allLocations.item(i).parentNode;
      provider = provider.parentNode;
      var providerID = provider.getAttribute("id");
      var providerName = provider.getElementsByTagName("Name");
      providerInfoArray.push(
        providerName.item(0).textContent + "!" + providerID
      );
    }
  }
}
providerInfoArray = removeDuplicates(providerInfoArray);
providerInfoArray.sort();

// Show the providers offering this service
const providerList = document.getElementById("providerList");
for (let k = 0; k < providerInfoArray.length; k++) {
  var providerInfo = providerInfoArray[k].split("!"); //1=ID, 2=Name, 3=programs
  const providerLI = document.createElement("li");
  providerLI.innerHTML = `<a href='provider.html?id=${providerInfo[1]}'>${providerInfo[0]}</a>`;
  providerList.appendChild(providerLI);
}
