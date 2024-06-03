import { fipsID, providers, providerServices } from "./api.js";
import { setMapLocations, zoomToFIPS } from "../../lib/simplemaps/utils.js";

const localityText = document.getElementById("localityText");
if (localityText) {
  localityText.innerText =
    // @ts-ignore
    simplemaps_statemap_mapdata.state_specific[fipsID].name;
}

zoomToFIPS(fipsID);

const providerUL = document.getElementById("providerList");
providers.forEach(async (provider, key) => {
  const providerLI = document.createElement("li");
  providerLI.className = "ebaBlue";
  providerLI.innerHTML = `<a href='../provider/index.html?id=${key}'>${provider}</a>`;
  if (providerUL) {
    providerUL.appendChild(providerLI);
  }

  const providerServiceList = providerServices(key);

  const providerServiceUL = document.createElement("ul");
  providerServiceList.forEach((serviceName) => {
    const serviceLI = document.createElement("li");
    // const limitedServiceNote = isLimitedService ? "  (Limited Service)" : "";
    serviceLI.innerText = serviceName; //+ limitedServiceNote;
    providerServiceUL.appendChild(serviceLI);
  });
  if (providerUL) {
    providerUL.appendChild(providerServiceUL);
  }
});
