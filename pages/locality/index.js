import { fipsID, providers, providerServices } from "./api.js";
import { setMapLocations, zoomToFIPS } from "../../lib/simplemaps/utils.js";
import dspsXML from "../../lib/getXML.js";
import { removeDuplicates } from "../../lib/utils.js";

const localityText = document.getElementById("localityText");
localityText.innerText =
  // @ts-ignore
  simplemaps_statemap_mapdata.state_specific[fipsID].name;

setMapLocations();
zoomToFIPS(fipsID);

const providerUL = document.getElementById("providerList");
providers.forEach((provider, key) => {
  const providerLI = document.createElement("li");
  providerLI.className = "ebaBlue";
  providerLI.innerHTML = `<a href='../provider/index.html?id=${key}'>${provider}</a>`;
  providerUL.appendChild(providerLI);

  const providerServiceList = providerServices(key);

  const providerServiceUL = document.createElement("ul");
  providerServiceList.forEach((service) => {
    const serviceLI = document.createElement("li");
    serviceLI.innerText = service;
    providerServiceUL.appendChild(serviceLI);
  });
  providerUL.appendChild(providerServiceUL);
});
