import { isNew, headerText } from "./api";
import { CSUStructure } from "../../../lib/csu";

const headerTextSpan = document.getElementById("headerText");
if (headerTextSpan) {
  headerTextSpan.innerHTML = headerText;
}

const defaultMapZoomSelect = document.getElementById("defaultMapZoom");
if (defaultMapZoomSelect) {
  CSUStructure.forEach((region, index) => {
    const option = document.createElement("option");
    option.value = index.toString();
    option.text = region.name;
    defaultMapZoomSelect.appendChild(option);
  });
}

const providerForm = document.getElementById("providerForm");
const showData = () => {
  // @ts-ignore
  const formData = new FormData(providerForm);

  for (const [key, value] of formData) {
    console.log(`${key}: ${value}`);
  }
};

const submitButton = document.getElementById("submitButton");
if (submitButton) {
  submitButton.addEventListener("click", showData);
}
