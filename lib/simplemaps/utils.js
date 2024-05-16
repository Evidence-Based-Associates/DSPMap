import { API } from "../../api/api.js";
import colors from "../colors.js";
import { regionCSUs, sortedCSUs } from "../csu.js";

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

const isLocalityInRegion = (region, locality) => {
  let found = false;
  region.CSUs.forEach((csu) => {
    if (csu.localities.includes(locality)) {
      found = true;
    }
  });
  return found;
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
  console.log(window.location.pathname);
  if (window.location.pathname === "/index.html") {
    return "pages/locality/index.html";
  } else if (window.location.pathname.includes("pages")) {
    return "../locality/index.html";
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

export const setMapLocations = () => {
  const locations = API.getAllLocations();

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

// work around for the zoom function
// simplemaps methods not available pre-load
export const zoomToFIPS = (fipsID) => {
  // @ts-ignore
  simplemaps_statemap_mapdata.regions = {};
  //add current locality to the one region
  simplemaps_statemap_mapdata.regions["0"] = {
    states: [fipsID],
    name: "Focus",
  };
  simplemaps_statemap_mapdata.main_settings.initial_zoom = 0;
};
