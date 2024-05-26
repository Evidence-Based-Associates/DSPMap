import { API } from "../../api/api.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const languageID = urlParams.get("id");

const allLanguages = await API.getAllLanguages();

export const languageName = languageID ? allLanguages[languageID] : "";
export const providers = await API.getAllProvidersOfLanguage(languageName);
