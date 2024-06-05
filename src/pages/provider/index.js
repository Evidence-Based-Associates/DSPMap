import {
  serviceFIPS,
  serviceNames,
  providerInfo,
  allFIPS,
  providerLanguages,
  hasTelehealth,
} from "./api.js";
import colors from "../../lib/colors.js";
import { csuListFromFIPS } from "../../lib/csu.js";
import {
  colorFIPS,
  addLanguageDescriptions,
  setAllDefaultColor,
} from "../../lib/simplemaps/utils.js";

const { RegColor, TravelColor, NoServiceColor } = colors;

const { providerName, contactName, contactEmail, website, lastUpdated } =
  providerInfo;

const serviceAreaLegend = document.getElementById("serviceAreaLegend");
serviceAreaLegend.style.backgroundColor = RegColor;

const limitedServiceLegend = document.getElementById("limitedServiceLegend");
limitedServiceLegend.style.backgroundColor = TravelColor;

const notAvailableLegend = document.getElementById("notAvailableLegend");
notAvailableLegend.style.backgroundColor = NoServiceColor;

const providerNameSpan = document.getElementsByName("providerName");
providerNameSpan.forEach((span) => (span.innerText = providerName));

const providerInfoDiv = document.getElementById("providerInfo");
const lastUpdatedSpan = document.getElementById("lastUpdatedText");
lastUpdatedSpan.innerText = lastUpdated;

const contactNameSpan = document.getElementById("contactNameText");
contactNameSpan.innerText = contactName;

const contactEmailSpan = document.getElementById("contactEmailText");
contactEmailSpan.innerHTML = `<a href='mailto:${contactEmail}'>${contactEmail}</a>`;

const providerWebsiteButton = document.getElementById("providerWebsiteButton");

const websiteAddress = website.includes("http") ? website : "http://" + website;
providerWebsiteButton?.setAttribute("href", websiteAddress);
providerWebsiteButton?.setAttribute("target", "_blank");

const serviceSelect = document.getElementsByName("serviceSelect")[0];
serviceNames.forEach((serviceName) => {
  const serviceOption = document.createElement("option");
  serviceOption.value = serviceName;
  serviceOption.text = serviceName;
  serviceSelect.appendChild(serviceOption);
});

const displayService = () => {
  const selectedServiceName =
    // @ts-ignore
    serviceSelect.options[serviceSelect.selectedIndex].text;
  const fipsLists = serviceFIPS(selectedServiceName);
  setAllDefaultColor();
  colorFIPS(fipsLists.available, RegColor);
  colorFIPS(fipsLists.limited, TravelColor);
  addLanguageDescriptions(fipsLists.languages);
  // @ts-ignore
  if (typeof simplemaps_statemap.refresh === "function") {
    // @ts-ignore
    simplemaps_statemap.refresh();
  }
  const telehealthIndicatorText = document.getElementById(
    "telehealthIndicatorText"
  );

  if (telehealthIndicatorText) {
    telehealthIndicatorText.innerText = hasTelehealth(selectedServiceName)
      ? `${providerName} is also able to deliver ${selectedServiceName} via telehealth.`
      : "";
  }
};
serviceSelect.addEventListener("change", displayService);
displayService();

const csuList = csuListFromFIPS(allFIPS);
const providerCSUList = document.getElementById("providerCSUs");
csuList.forEach((csu) => {
  const csuLI = document.createElement("li");
  csuLI.className = "list-group-item";
  csuLI.innerText = csu;
  providerCSUList.appendChild(csuLI);
});

const countyList = document.getElementById("providerCounties");
const cityList = document.getElementById("providerCities");
allFIPS.forEach((fips) => {
  const localityLI = document.createElement("li");
  localityLI.className = "list-group-item";
  // @ts-ignore
  localityLI.innerText = simplemaps_statemap_mapdata.state_specific[fips].name;
  if (Number(fips) > 51500) {
    cityList.appendChild(localityLI);
  } else {
    countyList.appendChild(localityLI);
  }
});

const providerServiceList = document.getElementById("providerServices");
serviceNames.forEach((serviceName) => {
  const serviceLI = document.createElement("li");
  serviceLI.className = "list-group-item";
  serviceLI.innerText = serviceName;
  providerServiceList.appendChild(serviceLI);
});

const languageList = document.getElementById("providerLanguages");
providerLanguages.forEach((language) => {
  const languageLI = document.createElement("li");
  languageLI.className = "list-group-item";
  languageLI.innerText = language;
  languageList.appendChild(languageLI);
});
