import { API } from "../../api/api.js";
import colors from "../colors.js";
import { regionCSUs, sortedCSUs, isLocalityInRegion } from "../csu.js";

const localitiesFromRegion = (region) => {
  let localities = [];
  region.CSUs.forEach((csu) => {
    localities = localities.concat(csu.localities);
  });
  return localities;
};

const regions = {
  0: {
    states: localitiesFromRegion(regionCSUs.NorthernRegion),
    name: "Northern Region",
    color: colors.NorthernColor,
  },
  1: {
    states: localitiesFromRegion(regionCSUs.CentralRegion),
    name: "Central Region",
    color: colors.CentralColor,
  },
  2: {
    states: localitiesFromRegion(regionCSUs.WesternRegion),
    name: "Western Region",
    color: colors.WesternColor,
  },
  3: {
    states: localitiesFromRegion(regionCSUs.SouthernRegion),
    name: "Southern Region",
    color: colors.SouthernColor,
  },
  4: {
    states: localitiesFromRegion(regionCSUs.EasternRegion),
    name: "Eastern Region",
    color: colors.EasternColor,
  },
  5: {
    states: localitiesFromRegion(regionCSUs.MidWestRegion),
    name: "Midwest Region",
    color: colors.MidWesternColor,
  },
};

const regionColor = (locality) => {
  if (isLocalityInRegion(regionCSUs.NorthernRegion, locality)) {
    return colors.NorthernColor;
  } else if (isLocalityInRegion(regionCSUs.CentralRegion, locality)) {
    return colors.CentralColor;
  } else if (isLocalityInRegion(regionCSUs.WesternRegion, locality)) {
    return colors.WesternColor;
  } else if (isLocalityInRegion(regionCSUs.SouthernRegion, locality)) {
    return colors.SouthernColor;
  } else if (isLocalityInRegion(regionCSUs.EasternRegion, locality)) {
    return colors.EasternColor;
  } else if (isLocalityInRegion(regionCSUs.MidWestRegion, locality)) {
    return colors.MidWesternColor;
  } else {
    return "#000000";
  }
};

const localityPagePath = () => {
  const path = window.location.pathname;
  if (window.location.pathname.includes("pages")) {
    return "../locality/index.html";
  } else {
    return "./pages/locality/index.html";
  }
};

export const setMapCSURegions = () => {
  // @ts-ignore (global variable)
  simplemaps_statemap_mapdata.regions = regions;

  // @ts-ignore (global variable)
  const localities = simplemaps_statemap_mapdata.state_specific;
  for (let locality in localities) {
    localities[locality].color = regionColor(locality);
    const path = localityPagePath();
    localities[locality].url = `${path}?id=${locality}`;
  }
};

export const setMapLocations = (locations) => {
  var officeURL = "pages/provider/index.html?id=";
  locations.forEach((location, index) => {
    // @ts-ignore (global variable)
    simplemaps_statemap_mapdata.locations[index] = {
      lat: location.lat,
      lng: location.lng,
      name: location.providerName,
      color: colors.EBABlue,
      description:
        location.street +
        "<br>" +
        location.city +
        ", " +
        location.state +
        " " +
        location.zip +
        "<br>" +
        location.phone,
      url: officeURL + location.providerId,
      size: "default",
      type: "default",
      image_url: "default",
      opacity: "default",
    };
  });
  simplemaps_statemap.refresh();
};

export const setRegionByCSU = (csu) => {
  // @ts-ignore (global variable)
  simplemaps_statemap_mapdata.regions = {};
  // iterate over all CSUs and set them as regions
  sortedCSUs.forEach((csu) => {
    // @ts-ignore (global variable)
    simplemaps_statemap_mapdata.regions[csu.slug] = {
      states: csu.localities,
      name: csu.name,
      url: "index.html?id=" + csu.slug,
    };
  });

  // @ts-ignore (global variable)
  simplemaps_statemap_mapdata.main_settings.initial_zoom = csu.slug;
};

export const setAllDefaultColor = () => {
  // @ts-ignore (global variable)
  const localities = simplemaps_statemap_mapdata.state_specific;
  for (let locality in localities) {
    localities[locality].color = "default";
  }
  //same for regions
  // @ts-ignore (global variable)
  const regions = simplemaps_statemap_mapdata.regions;
  for (let region in regions) {
    regions[region].color = "default";
  }
};

// work around for the zoom function
// simplemaps methods not available pre-load
export const zoomToFIPS = (fipsID) => {
  // @ts-ignore
  simplemaps_statemap_mapdata.regions = {};
  //add current locality to the one region
  // @ts-ignore
  simplemaps_statemap_mapdata.regions["0"] = {
    states: [fipsID],
    name: "Focus",
  };
  // @ts-ignore
  simplemaps_statemap_mapdata.main_settings.initial_zoom = 0;
};

export const zoomToRegion = (regionID) => {
  // @ts-ignore
  simplemaps_statemap_mapdata.main_settings.initial_zoom = regionID;
};

export const colorFIPS = (fipsList, color) => {
  if (!fipsList) {
    return;
  }
  // @ts-ignore
  const localities = simplemaps_statemap_mapdata.state_specific;
  fipsList.forEach((fips) => {
    localities[fips].color = color;
    localities[fips].hover_color = color;
  });
};

const languagesArrayExample = [
  { Spanish: ["51092", "51093", "51094", "51095", "51096"] },
  { French: ["51092", "51097", "51098", "51099", "51100", "51101"] },
];

export const addLanguageDescriptions = (languagesArray) => {
  const fipsMap = new Map();
  languagesArray.forEach((langObj) => {
    Object.keys(langObj).forEach((lang) => {
      langObj[lang].forEach((fips) => {
        if (fipsMap.has(fips)) {
          fipsMap.get(fips).add(lang);
        } else {
          fipsMap.set(fips, new Set([lang]));
        }
      });
    });
  });
  fipsMap.forEach((languages, fips) => {
    // @ts-ignore
    simplemaps_statemap_mapdata.state_specific[fips].description =
      "Available in " + [...languages].join(", ");
  });
};
