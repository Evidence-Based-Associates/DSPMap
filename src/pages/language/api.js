import { API } from "../../api/api.js";
import { getAllServicesByLanguage, getMetaData } from "../../firebase.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const languageID = urlParams.get("id");

const metaData = await getMetaData();
const allLanguages = metaData?.availableLanguages.sort() || [];

export const languageName = languageID ? allLanguages[languageID] : "";
const serviceCollection = await getAllServicesByLanguage(languageName);
export let providers = new Map();
if (serviceCollection) {
  // filter out the services that don't have the language
  // TODO: consider a different data model for querying services by language
  const filteredServices = serviceCollection.filter((service) =>
    Object.keys(service.languageFIPS).includes(languageName)
  );
  providers = new Map(
    filteredServices.map((service) => {
      return [service.providerName, service.providerName];
    })
  );
}
