import { serviceName, providers, serviceFIPS } from "./api.js";
import colors from "../../lib/colors.js";
import { colorFIPS, setAllDefaultColor } from "../../lib/simplemaps/utils.js";

const { TravelColor, RegColor } = colors;

const serviceNameText = document.getElementById("serviceNameText");
serviceNameText.innerText = serviceName;

setAllDefaultColor();
colorFIPS(serviceFIPS.limited, TravelColor);
colorFIPS(serviceFIPS.available, RegColor);

const providerUL = document.getElementById("providerUL");
providers.forEach((provider, key) => {
  const providerLI = document.createElement("li");
  providerLI.innerHTML = `<a href='../provider/index.html?id=${key}'>${provider}</a>`;
  providerUL.appendChild(providerLI);
});
