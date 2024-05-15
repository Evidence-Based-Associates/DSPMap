import colors from "../colors.js";
import { regionCSUs } from "../csu.js";

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

export const setMapCSURegions = () => {
  // @ts-ignore (global variable)
  simplemaps_statemap_mapdata.regions = regions;

  // @ts-ignore (global variable)
  const localities = simplemaps_statemap_mapdata.state_specific;
  for (let locality in localities) {
    localities[locality].color = regionColor(locality);
    localities[locality].url = "pages/locality/index.html?id=" + locality;
  }
};
