import { providers, languageName } from "./api.js";

const providerSection = document.getElementById("providerList");
providers.forEach((name, id) => {
  const providerItem = document.createElement("div");
  providerItem.className = "col-3 mx-2 my-2";
  providerItem.innerHTML = `<a href='../provider/index.html?id=${id}'>${name}</a>`;
  providerSection && providerSection.appendChild(providerItem);
});

const languageNameSpans = document.getElementsByName("langaugeText");
languageNameSpans.forEach((span) => {
  span.innerHTML = languageName;
});
