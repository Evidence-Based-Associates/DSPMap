export const API_OPTIONS = {
  XML: "XML",
  FIREBASE: "FIREBASE",
};

export const ENV_OPTIONS = {
  LOCAL: "LOCAL",
  DEV: "DEV",
  PROD: "PROD",
};

const ENV = process.env.ENV || ENV_OPTIONS.DEV;
export const config = {
  API: API_OPTIONS.FIREBASE,
  ENV: ENV_OPTIONS[ENV],
};
