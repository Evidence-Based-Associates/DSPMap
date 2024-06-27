import { fipsID, providers, providerServices } from "./api.js";
import { setMapLocations, zoomToFIPS } from "../../lib/simplemaps/utils.js";
import { headingList } from "../../lib/utils.js";
import { config } from "../../../config.js";

if (config.ENV === "DEV") {
  const envAlert = document.getElementById("envAlert");
  envAlert?.removeAttribute("hidden");
}

const localityText = document.getElementById("localityText");
if (localityText) {
  localityText.innerText =
    // @ts-ignore
    simplemaps_statemap_mapdata.state_specific[fipsID].name;
}

zoomToFIPS(fipsID);

const providerSection = document.getElementById("providerList");
providers.forEach(async (provider, key) => {
  const providerServiceList = providerServices(key);
  const providerLinkHTML = `<a href="../provider/index.html?id=${key}">${provider}</a>`;

  const list = headingList(providerLinkHTML, providerServiceList);
  const col = document.createElement("div");
  col.className = "col col-mb-3 mt-3";
  col.appendChild(list);

  providerSection?.appendChild(col);
  // const providerItem = document.createElement("div");
  // providerItem.className = "col-3 mx-2 my-2";
  // providerItem.innerHTML = `<a href='../provider/index.html?id=${key}'>${provider}</a>`;
  // if (provideSection) {
  //   // provideSection.appendChild(providerItem);
  // }

  // const providerServiceUL = document.createElement("ul");
  // providerServiceList.forEach((serviceName) => {
  //   const serviceLI = document.createElement("li");
  //   // const limitedServiceNote = isLimitedService ? "  (Limited Service)" : "";
  //   serviceLI.innerText = serviceName; //+ limitedServiceNote;
  //   providerServiceUL.appendChild(serviceLI);
  // });
  // if (providerSection) {
  //   providerSection.appendChild(providerServiceUL);
  // }
});
