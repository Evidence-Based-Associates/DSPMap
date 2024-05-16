import { providers } from "./api.js";

const providerList = document.getElementById("providerList");
providers.forEach((name, id) => {
  const providerLI = document.createElement("li");
  providerLI.innerHTML = `<a href='../provider/index.html?id=${id}'>${name}</a>`;
  providerList.appendChild(providerLI);
});
