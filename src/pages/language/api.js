import { API } from "../../api/api.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const languageID = urlParams.get("id");

export const languageName = API.getAllLanguages()[languageID];
export const providers = API.getAllProvidersOfLanguage(languageName);
