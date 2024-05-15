import { API } from "./api/api.js";

export const lastUpdated = API.getLastUpdated();
export const availableServices = API.getAllServiceNames();
