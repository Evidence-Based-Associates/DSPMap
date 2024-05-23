import { XML_API } from "./xml.js";
import { FIREBASE_API } from "./firebase.js";
import { config, API_OPTIONS } from "../config.js";

export const API =
  config.API === API_OPTIONS.XML ? new XML_API() : new FIREBASE_API();

export default API;
