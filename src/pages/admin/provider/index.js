import {
  isNew,
  headerText,
  GOOGLE_API_KEY,
  allAvailableServiceNames,
} from "./api";
import { appState, setService, initService } from "./state";
import { CSUStructure } from "../../../lib/csu";
import { doc } from "firebase/firestore";

const headerTextSpan = document.getElementById("headerText");
if (headerTextSpan) {
  headerTextSpan.innerHTML = headerText;
}

const allServicesSelect = document.getElementById("allServicesSelect");
if (allServicesSelect) {
  allAvailableServiceNames.forEach((serviceName) => {
    const option = document.createElement("option");
    option.value = serviceName;
    option.text = serviceName;
    allServicesSelect.appendChild(option);
  });
}
const selectedServices = document.getElementById("selectedServices");
allServicesSelect?.addEventListener("change", () => {
  if (!selectedServices) {
    return;
  }

  selectedServices.innerHTML = "";

  // @ts-ignore
  const options = allServicesSelect.options;
  for (let i = 0; i < options.length; i++) {
    const targetOption = options[i];
    if (targetOption.selected) {
      const selectedOption = document.createElement("option");
      selectedOption.value = targetOption.value;
      selectedOption.text = targetOption.text;
      selectedOption.selected = true;
      selectedServices.appendChild(selectedOption);
      initService(targetOption.value);
    }
  }
  selectedServices.removeAttribute("disabled");
  const coveragemap = document.getElementById("coveragemap");
  if (coveragemap) {
    coveragemap.removeAttribute("hidden");
  }
});
selectedServices?.addEventListener("change", () => {
  // @ts-ignore
  setService(selectedServices.value);
});

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
  const data = Object.fromEntries(formData);
  console.log(data);

  const streets = formData.getAll("street");
  console.log("streets", streets);

  for (const [key, value] of formData) {
    console.log(`${key}: ${value}`);
  }
  console.log("appState", appState);
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

const addAddressListeners = () => {
  const street = document.getElementsByName("street");
  const city = document.getElementsByName("city");
  const state = document.getElementsByName("state");

  street.forEach((input, index) => {
    input.addEventListener("change", () => handleAddressChange(index));
  });
  city.forEach((input, index) => {
    input.addEventListener("change", () => handleAddressChange(index));
  });
  state.forEach((input, index) => {
    input.addEventListener("change", () => handleAddressChange(index));
  });
};
addAddressListeners();

const handleAddressChange = async (index) => {
  const street = document.getElementsByName("street");
  const city = document.getElementsByName("city");
  const state = document.getElementsByName("state");
  const zip = document.getElementsByName("zip");
  const latInput = document.getElementsByName("lat");
  const lngInput = document.getElementsByName("lng");
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

const createOfficeInput = (id) => {
  const office = document.createElement("div");
  office.id = `office${id}`;
  office.innerHTML = `
  <h3 class="mt-3"><span id="officeHeading${id}">Additional Office ${id}:</span></h3>
  <button
          id="removeOfficeButton${id}"
          type="button"
          class="btn btn-outline-danger mt-3"
        >
          Remove Office ${id}
        </button>
  <div class="form-group">
    <label for="street${id}">Street:</label>
    <input
      class="form-control"
      type="text"
      id="street${id}"
      name="street"
      size="50"
    />
  </div>
  <div class="row mt-3">
    <div class="form-group col-md-6">
      <label for="city${id}">City:</label>
      <input
        class="form-control"
        type="text"
        id="city${id}"
        name="city"
        size="50"
      />
    </div>
    <div class="form-group col-md-4">
      <label for="state${id}">State:</label>
      <input
        class="form-control"
        type="text"
        id="state${id}"
        name="state"
        size="50"
        value="VA"
      />
    </div>
    <div class="form-group col-md-2">
      <label for="zip${id}">Zip:</label>
      <input
        class="form-control"
        type="text"
        id="zip${id}"
        name="zip"
        size="50"
      />
    </div>
  </div>
  <div class="form-group mt-3">
    <label for="phone${id}">Phone:</label>
    <input
      class="form-control"
      type="text"
      id="phone${id}"
      name="phone"
      size="50"
    />
  </div>
  <div class="row mt-3">
    <div class="form-group col-md-6">
      <label for="lat${id}">Latitude:</label>
      <input
        class="form-control"
        type="text"
        id="lat${id}"
        name="lat"
        size="7"
        disabled
      />
    </div>
    <div class="form-group col-md-6">
      <label for="lng${id}">Longitude:</label>
      <input
        class="form-control"
        type="text"
        id="lng${id}"
        name="lng"
        size="7"
        disabled
      />
    </div>
  </div>
    `;
  const removeOfficeButton = office.querySelector(`#removeOfficeButton${id}`);
  removeOfficeButton?.addEventListener("click", () => {
    handleRemoveOffice(id);
  });
  return office;
};

const addOfficeButton = document.getElementById("addOfficeButton");
addOfficeButton?.addEventListener("click", () => {
  const officeSection = document.getElementById("officeList");
  const officeCount = document.getElementsByName("street").length || 0;
  const newOffice = createOfficeInput(officeCount);
  if (officeSection) {
    officeSection.appendChild(newOffice);
    addAddressListeners();
  }
});

const handleRemoveOffice = (index) => {
  const office = document.getElementById(`office${index}`);
  if (office) {
    office.remove();
  }
};
const removeOfficeButton = document.getElementById("removeOfficeButton");
removeOfficeButton?.addEventListener("click", () => {
  handleRemoveOffice(1);
});
