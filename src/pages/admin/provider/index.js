import {
  GOOGLE_API_KEY,
  allAvailableServiceNames,
  allAvailableLanguages,
  saveProvider,
  existingProviders,
  getProviderInfo,
  getProviderServices,
  getProviderLocations,
} from "./api";
import {
  appState,
  setService,
  initService,
  setLanguageMode,
  setLanguage,
  initLanguage,
  setServiceZoom,
  resetAppState,
  loadServices,
} from "./state";
import { regions } from "../../../lib/simplemaps/utils";

const existingProviderSelect = document.getElementById(
  "existingProviderSelect"
);

const selectedServices = document.getElementById("selectedServices");
const allServicesSelect = document.getElementById("allServicesSelect");
const coveragemap = document.getElementById("coveragemap");
const defaultMapZoomSelect = document.getElementById("defaultMapZoom");
const serviceMapZoomSelect = document.getElementById("serviceMapZoom");
const serviceMapZoomLabel = document.getElementById("serviceMapZoomLabel");
const serviceMapZoom = document.getElementById("serviceMapZoom");
const providerForm = document.getElementById("providerForm");
const providerNameInput = document.getElementById("providerName");
const websiteInput = document.getElementById("website");
const submitButton = document.getElementById("submitButton");
const contactNameInput = document.getElementById("contactName");
const contactEmailInput = document.getElementById("contactEmail");
const street = document.getElementsByName("street");
const city = document.getElementsByName("city");
const state = document.getElementsByName("state");
const zip = document.getElementsByName("zip");
const phoneInput = document.getElementsByName("phone");
const latInput = document.getElementsByName("lat");
const lngInput = document.getElementsByName("lng");
const addOfficeButton = document.getElementById("addOfficeButton");
const additionalOffices = document.getElementById("additionalOffices");
const officeSection = document.getElementById("officeList");

const languageModeSwitch = document.getElementById("languageModeSwitch");
const allLanguagesSelect = document.getElementById("allLanguagesSelect");
const allLanguagesSelectLabel = document.getElementById(
  "allLanguagesSelectLabel"
);
const selectedLanguagesLabel = document.getElementById(
  "selectedLanguagesLabel"
);
const selectedLanguages = document.getElementById("selectedLanguages");

const successAlert = document.getElementById("successAlert");
const errorAlert = document.getElementById("errorAlert");

const languageControls = [
  allLanguagesSelect,
  allLanguagesSelectLabel,
  selectedLanguagesLabel,
  selectedLanguages,
];
if (existingProviderSelect) {
  existingProviders.forEach((provider) => {
    const option = document.createElement("option");
    option.value = provider.providerName;
    option.text = provider.providerName;
    existingProviderSelect.appendChild(option);
  });
}
existingProviderSelect?.addEventListener("change", async () => {
  if (existingProviderSelect.value === "") {
    // reset form
    // @ts-ignore
    providerForm.reset();

    // @ts-ignore
    providerNameInput?.removeAttribute("readonly");
    resetAppState();
    return;
  }

  // @ts-ignore
  const selectedProvider = existingProviderSelect.value;
  const provider = await getProviderInfo(selectedProvider);
  const providerServices = await getProviderServices(selectedProvider);
  const providerLocations = await getProviderLocations(selectedProvider);
  // @ts-ignore
  loadServices(providerServices);
  // @ts-ignore
  providerNameInput.value = provider.providerName;
  // @ts-ignore
  providerNameInput.setAttribute("readonly", "true");
  // @ts-ignore
  defaultMapZoomSelect.value = provider.defaultMapZoom;
  // @ts-ignore
  websiteInput.value = provider.website;
  // @ts-ignore
  contactNameInput.value = provider.contactName;
  // @ts-ignore
  contactEmailInput.value = provider.contactEmail;

  const officeCount = providerLocations.length;

  if (additionalOffices) {
    additionalOffices.innerHTML = "";
    for (let i = 0; i < officeCount; i++) {
      const office = providerLocations[i];
      // @ts-ignore
      street[i].value = office.street;
      // @ts-ignore
      city[i].value = office.city;
      // @ts-ignore
      state[i].value = office.state;
      // @ts-ignore
      zip[i].value = office.zip;
      // @ts-ignore
      phoneInput[i].value = office.phone;
      // @ts-ignore
      latInput[i].value = office.lat;
      // @ts-ignore
      lngInput[i].value = office.lng;
      // if this is the last office, don't add a new one
      if (officeCount > i + 1) {
        addOfficeButton?.click();
      }
    }
  }

  // @ts-ignore
  const options = allServicesSelect.options;
  for (let i = 0; i < options.length; i++) {
    const targetOption = options[i];
    targetOption.selected = providerServices.some(
      (service) => service.serviceName === targetOption.value
    );
  }

  // @ts-ignore
  selectedServices.innerHTML = "";
  providerServices.forEach((service) => {
    const option = document.createElement("option");
    option.value = service.serviceName;
    option.text = service.serviceName;
    option.selected = true;
    selectedServices.appendChild(option);
  });
  selectedServices.removeAttribute("disabled");

  coveragemap?.removeAttribute("hidden");
  selectedServices?.dispatchEvent(new Event("change"));
});

if (allServicesSelect) {
  allAvailableServiceNames.forEach((serviceName) => {
    const option = document.createElement("option");
    option.value = serviceName;
    option.text = serviceName;
    allServicesSelect.appendChild(option);
  });
}

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
  serviceMapZoomLabel?.removeAttribute("hidden");
  serviceMapZoom?.removeAttribute("hidden");

  selectedServices?.dispatchEvent(new Event("change"));

  if (languageModeSwitch) {
    languageModeSwitch.removeAttribute("disabled");
  }
  if (coveragemap) {
    coveragemap.removeAttribute("hidden");
  }
});
selectedServices?.addEventListener("change", () => {
  // @ts-ignore
  setService(selectedServices.value);
});

if (defaultMapZoomSelect && serviceMapZoomSelect) {
  Object.keys(regions).forEach((region, index) => {
    const option = document.createElement("option");
    option.value = index.toString();
    option.text = regions[index].name;
    defaultMapZoomSelect.appendChild(option);
    serviceMapZoomSelect.appendChild(option.cloneNode(true));
  });
}

serviceMapZoomSelect?.addEventListener("change", () => {
  // @ts-ignore
  setServiceZoom(serviceMapZoomSelect.value);
});

const handleSubmit = async () => {
  console.log("appState", appState);

  // @ts-ignore
  const formData = new FormData(providerForm);
  // TODO validate form data

  const streets = Array.from(formData.getAll("street"));
  const cities = Array.from(formData.getAll("city"));
  const states = Array.from(formData.getAll("state"));
  const zips = Array.from(formData.getAll("zip"));
  const phones = Array.from(formData.getAll("phone"));
  const lats = Array.from(formData.getAll("lat"));
  const lngs = Array.from(formData.getAll("lng"));
  const officeCount = streets.length;

  const offices = [];
  for (let i = 0; i < officeCount; i++) {
    const office = {
      street: streets[i] || "",
      city: cities[i] || "",
      state: states[i] || "",
      zip: zips[i] || "",
      phone: phones[i] || "",
      lat: lats[i] || "",
      lng: lngs[i] || "",
    };
    offices.push(office);
  }

  const providerInfo = {
    providerName: formData.get("providerName"),
    website: formData.get("website"),
    contactName: formData.get("contactName"),
    contactEmail: formData.get("contactEmail"),
    defaultMapZoom: formData.get("defaultMapZoom"),
    lastUpdated: new Date().toISOString(),
    offices: offices,
  };

  saveProvider(
    { ...providerInfo },
    [...appState.providerServices],
    [...offices]
  )
    .then(() => {
      if (errorAlert) {
        errorAlert.setAttribute("hidden", "true");
      }
      if (successAlert) {
        successAlert.removeAttribute("hidden");
      }
      // clear form and reset appState
      // @ts-ignore
      providerForm.reset();
      resetAppState();
    })
    .catch((error) => {
      console.error("Error saving provider", error);
      if (successAlert) {
        successAlert.setAttribute("hidden", "true");
      }
      if (errorAlert) {
        errorAlert.removeAttribute("hidden");
      }
    });
};

if (submitButton) {
  submitButton.addEventListener("click", handleSubmit);
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
  // @ts-ignore
  if (!street[index].value || !city[index].value || !state[index].value) {
    return;
  }
  // @ts-ignore
  const address = `${street[index].value}, ${city[index].value}, ${state[index].value}, ${zip[index].value}`;
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
  <h3 class="mt-3"><span id="officeHeading${id}">Additional Office:</span></h3>
  <button
          id="removeOfficeButton${id}"
          type="button"
          class="btn btn-outline-danger mt-3"
        >
          Remove Office
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
        readonly
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
        readonly
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

addOfficeButton?.addEventListener("click", () => {
  const officeCount = document.getElementsByName("street").length || 0;
  const newOffice = createOfficeInput(officeCount);
  if (additionalOffices) {
    additionalOffices.appendChild(newOffice);
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
removeOfficeButton?.addEventListener("click", (id) => {
  //TODO - check that this works
  handleRemoveOffice(id);
});

allAvailableLanguages.forEach((language) => {
  if (language === "Spanish") {
    return;
  }
  const option = document.createElement("option");
  option.value = language;
  option.text = language;
  allLanguagesSelect?.appendChild(option);
});

const handleLanguageModeSwitch = () => {
  // @ts-ignore
  if (languageModeSwitch?.checked) {
    setLanguageMode(true);
    languageControls.forEach((control) => {
      if (control) {
        control.removeAttribute("hidden");
      }
    });
    // @ts-ignore
    setLanguage(allLanguagesSelect?.value);
  } else {
    setLanguageMode(false);
    selectedServices?.dispatchEvent(new Event("change"));
    languageControls.forEach((control) => {
      if (control) {
        control.setAttribute("hidden", "true");
      }
    });
    setService(appState.selectedService);
  }
};
languageModeSwitch?.addEventListener("change", handleLanguageModeSwitch);

allLanguagesSelect?.addEventListener("change", () => {
  if (!selectedLanguages) {
    return;
  }

  selectedLanguages.innerHTML = "";

  // @ts-ignore
  const options = allLanguagesSelect.options;
  for (let i = 0; i < options.length; i++) {
    const targetOption = options[i];
    if (targetOption.selected) {
      const selectedOption = document.createElement("option");
      selectedOption.value = targetOption.value;
      selectedOption.text = targetOption.text;
      selectedOption.selected = true;
      selectedLanguages.appendChild(selectedOption);
      initLanguage(targetOption.value);
    }
  }
  selectedLanguages?.dispatchEvent(new Event("change"));
});
selectedLanguages?.addEventListener("change", () => {
  // @ts-ignore
  setLanguage(selectedLanguages.value);
});
