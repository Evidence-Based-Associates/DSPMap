import { isNew, headerText } from "./api";

const headerTextSpan = document.getElementById("headerText");
if (headerTextSpan) {
  headerTextSpan.innerHTML = headerText;
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
