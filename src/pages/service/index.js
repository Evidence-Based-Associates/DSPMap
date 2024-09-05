import { serviceName, providers, serviceFIPS } from "./api.js";
import colors from "../../lib/colors.js";
import { colorFIPS, setAllDefaultColor } from "../../lib/simplemaps/utils.js";
import { config } from "../../../config.js";

if (config.ENV === "DEV") {
  const envAlert = document.getElementById("envAlert");
  envAlert?.removeAttribute("hidden");
}

const { TravelColor, RegColor } = colors;

const serviceNameText = document.getElementById("serviceNameText");
if (serviceNameText) {
  serviceNameText.innerText = serviceName;
}

setAllDefaultColor();
colorFIPS(serviceFIPS?.limited || [], TravelColor);
colorFIPS(serviceFIPS?.available || [], RegColor);

const providerSection = document.getElementById("providerList");
providers.forEach((provider, key) => {
  const providerItem = document.createElement("div");
  providerItem.className = "col-3 mx-2 my-2";
  providerItem.innerHTML = `<a href='../provider/index.html?id=${key}'>${provider}</a>`;
  if (providerSection) {
    providerSection.appendChild(providerItem);
  }
});
