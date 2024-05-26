import { isNew, headerText, GOOGLE_API_KEY } from "./api";
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
const showData = async () => {
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

const getLatLng = async (address) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`
  );
  const data = await response.json();
  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng };
};

const street = document.getElementsByName("street");
const city = document.getElementsByName("city");
const state = document.getElementsByName("state");
const zip = document.getElementsByName("zip");
const latInput = document.getElementsByName("lat");
const lngInput = document.getElementsByName("lng");

street.forEach((input, index) => {
  input.addEventListener("change", () => handleAddressChange(index));
});
city.forEach((input, index) => {
  input.addEventListener("change", () => handleAddressChange(index));
});
state.forEach((input, index) => {
  input.addEventListener("change", () => handleAddressChange(index));
});

const handleAddressChange = async (index) => {
  // @ts-ignore
  if (!street[index].value || !city[index].value || !state[index].value) {
    return;
  }
  // @ts-ignore
  const address = `${street[index].value}, ${city[index].value}, ${state[index].value}, ${zip[index].value}`;
  const latLng = await getLatLng(address);
  getLatLng(address).then(({ lat, lng }) => {
    // @ts-ignore
    latInput[index].value = lat;
    // @ts-ignore
    lngInput[index].value = lng;
  });
};
