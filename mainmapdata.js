/*
mainmapdata.js contains global functions and variables. The Virginia map is defined in this file.

Evidence Based Associates - Virginia DJJ Service Continuum Project
*/

//Mapdata from simplemaps.com
//default settings for map throughout the directory.
var simplemaps_statemap_mapdata = {
  main_settings: {
    //General settings
    width: "700", //or 'responsive' 700
    background_color: "#FFFFFF",
    background_transparent: "yes",
    border_color: "#ffffff",
    popups: "detect",

    //State defaults
    state_description: "",
    state_color: "#517ba0", // original: 88A4BC
    state_hover_color: "#3B729F", //original: 3B729F
    state_url: "",
    border_size: 1.5,
    all_states_inactive: "no",
    all_states_zoomable: "no",

    //Location defaults
    location_description: "Location description",
    location_color: EBABlue,
    location_opacity: "1",
    location_hover_opacity: 1,
    location_url: "",
    location_size: "25",
    location_type: "circle",
    location_image_source: "frog.png",
    location_border_color: "#FFFFFF",
    location_border: 2,
    location_hover_border: 2.5,
    all_locations_inactive: "no",
    all_locations_hidden: "no",

    ///Label defaults
    label_color: "#d5ddec",
    label_hover_color: "#d5ddec",
    label_size: 22,
    label_font: "Arial",
    hide_labels: "no",

    //Zoom settings
    zoom: "yes",
    back_image: "no",
    arrow_color: "#3B729F",
    arrow_color_border: "#88A4BC",
    initial_back: "no",
    initial_zoom: -1,
    initial_zoom_solo: "no",
    region_opacity: 1,
    region_hover_opacity: 0.6,
    zoom_out_incrementally: "yes",
    zoom_percentage: 0.99,
    zoom_time: 0.5,

    //Popup settings
    popup_color: "white",
    popup_opacity: 0.9,
    popup_shadow: 1,
    popup_corners: 5,
    popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
    popup_nocss: "no",

    //Advanced settings
    div: "coveragemap",
    rotate: "0",
    auto_load: "yes",
    url_new_tab: "no",
    images_directory: "default",
    fade_time: 0.1,
    link_text: "(Link)",
    location_image_url: "",
  },
  state_specific: {
    51001: {
      name: "Accomack",
      description: "default",
      hover_color: "default",
      url: localityUrl + "51001",
      hide: "default",
      inactive: "default",
      zoomable: "default",
    },
    51003: {
      name: "Albemarle",
    },
    51005: {
      name: "Alleghany",
    },
    51007: {
      name: "Amelia",
    },
    51009: {
      name: "Amherst",
    },
    51011: {
      name: "Appomattox",
    },
    51013: {
      name: "Arlington",
    },
    51015: {
      name: "Augusta",
    },
    51017: {
      name: "Bath",
    },
    51019: {
      name: "Bedford",
    },
    51021: {
      name: "Bland",
    },
    51023: {
      name: "Botetourt",
    },
    51025: {
      name: "Brunswick",
    },
    51027: {
      name: "Buchanan",
    },
    51029: {
      name: "Buckingham",
    },
    51031: {
      name: "Campbell",
    },
    51033: {
      name: "Caroline",
    },
    51035: {
      name: "Carroll",
    },
    51036: {
      name: "Charles City",
    },
    51037: {
      name: "Charlotte",
    },
    51041: {
      name: "Chesterfield",
    },
    51043: {
      name: "Clarke",
    },
    51045: {
      name: "Craig",
    },
    51047: {
      name: "Culpeper",
    },
    51049: {
      name: "Cumberland",
    },
    51051: {
      name: "Dickenson",
    },
    51053: {
      name: "Dinwiddie",
    },
    51057: {
      name: "Essex",
    },
    51059: {
      name: "Fairfax (County)",
    },
    51061: {
      name: "Fauquier",
    },
    51063: {
      name: "Floyd",
    },
    51065: {
      name: "Fluvanna",
    },
    51067: {
      name: "Franklin",
    },
    51069: {
      name: "Frederick",
    },
    51071: {
      name: "Giles",
    },
    51073: {
      name: "Gloucester",
    },
    51075: {
      name: "Goochland",
    },
    51077: {
      name: "Grayson",
    },
    51079: {
      name: "Greene",
    },
    51081: {
      name: "Greensville",
    },
    51083: {
      name: "Halifax",
    },
    51085: {
      name: "Hanover",
    },
    51087: {
      name: "Henrico",
    },
    51089: {
      name: "Henry",
    },
    51091: {
      name: "Highland",
    },
    51093: {
      name: "Isle of Wight",
    },
    51095: {
      name: "James City",
    },
    51097: {
      name: "King and Queen",
    },
    51099: {
      name: "King George",
    },
    51101: {
      name: "King William",
    },
    51103: {
      name: "Lancaster",
    },
    51105: {
      name: "Lee",
    },
    51107: {
      name: "Loudoun",
    },
    51109: {
      name: "Louisa",
    },
    51111: {
      name: "Lunenburg",
    },
    51113: {
      name: "Madison",
    },
    51115: {
      name: "Mathews",
    },
    51117: {
      name: "Mecklenburg",
    },
    51119: {
      name: "Middlesex",
    },
    51121: {
      name: "Montgomery",
    },
    51125: {
      name: "Nelson",
    },
    51127: {
      name: "New Kent",
    },
    51131: {
      name: "Northampton",
    },
    51133: {
      name: "Northumberland",
    },
    51135: {
      name: "Nottoway",
    },
    51137: {
      name: "Orange",
    },
    51139: {
      name: "Page",
    },
    51141: {
      name: "Patrick",
    },
    51143: {
      name: "Pittsylvania",
    },
    51145: {
      name: "Powhatan",
    },
    51147: {
      name: "Prince Edward",
    },
    51149: {
      name: "Prince George",
    },
    51153: {
      name: "Prince William",
    },
    51155: {
      name: "Pulaski",
    },
    51157: {
      name: "Rappahannock",
    },
    51159: {
      name: "Richmond (County)",
    },
    51161: {
      name: "Roanoke (County)",
    },
    51163: {
      name: "Rockbridge",
    },
    51165: {
      name: "Rockingham",
    },
    51167: {
      name: "Russell",
    },
    51169: {
      name: "Scott",
    },
    51171: {
      name: "Shenandoah",
    },
    51173: {
      name: "Smyth",
    },
    51175: {
      name: "Southampton",
    },
    51177: {
      name: "Spotsylvania",
    },
    51179: {
      name: "Stafford",
    },
    51181: {
      name: "Surry",
    },
    51183: {
      name: "Sussex",
    },
    51185: {
      name: "Tazewell",
    },
    51187: {
      name: "Warren",
    },
    51191: {
      name: "Washington",
    },
    51193: {
      name: "Westmoreland",
    },
    51195: {
      name: "Wise",
    },
    51197: {
      name: "Wythe",
    },
    51199: {
      name: "York",
    },
    51510: {
      name: "Alexandria",
    },
    51520: {
      name: "Bristol",
    },
    51530: {
      name: "Buena Vista",
    },
    51540: {
      name: "Charlottesville",
    },
    51550: {
      name: "Chesapeake",
    },
    51570: {
      name: "Colonial Heights",
    },
    51580: {
      name: "Covington",
    },
    51590: {
      name: "Danville",
    },
    51595: {
      name: "Emporia",
    },
    51600: {
      name: "Fairfax (City)",
    },
    51610: {
      name: "Falls Church",
    },
    51620: {
      name: "Franklin",
    },
    51630: {
      name: "Fredericksburg",
    },
    51640: {
      name: "Galax",
    },
    51650: {
      name: "Hampton",
    },
    51660: {
      name: "Harrisonburg",
    },
    51670: {
      name: "Hopewell",
    },
    51678: {
      name: "Lexington",
    },
    51680: {
      name: "Lynchburg",
    },
    51683: {
      name: "Manassas",
    },
    51685: {
      name: "Manassas Park",
    },
    51690: {
      name: "Martinsville",
    },
    51700: {
      name: "Newport News",
    },
    51710: {
      name: "Norfolk",
    },
    51720: {
      name: "Norton",
    },
    51730: {
      name: "Petersburg",
    },
    51735: {
      name: "Poquoson",
    },
    51740: {
      name: "Portsmouth",
    },
    51750: {
      name: "Radford",
    },
    51760: {
      name: "Richmond (City)",
    },
    51770: {
      name: "Roanoke (City)",
    },
    51775: {
      name: "Salem",
    },
    51790: {
      name: "Staunton",
    },
    51800: {
      name: "Suffolk",
    },
    51810: {
      name: "Virginia Beach",
    },
    51820: {
      name: "Waynesboro",
    },
    51830: {
      name: "Williamsburg",
    },
    51840: {
      name: "Winchester",
    },
  },
  locations: {},
  regions: {
    0: {
      states: localitiesFromRegion(NorthernRegion),
      name: "Northern Region",
      color: NorthernColor,
    },
    1: {
      states: localitiesFromRegion(CentralRegion),
      name: "Central Region",
      color: CentralColor,
    },
    2: {
      states: localitiesFromRegion(WesternRegion),
      name: "Western Region",
      color: WesternColor,
    },
    3: {
      states: localitiesFromRegion(SouthernRegion),
      name: "Southern Region",
      color: SouthernColor,
    },
    4: {
      states: localitiesFromRegion(EasternRegion),
      name: "Eastern Region",
      color: EasternColor,
    },
    5: {
      states: localitiesFromRegion(MidWestRegion),
      name: "Midwest Region",
      color: MidWesternColor,
    },
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
  if (isLocalityInRegion(NorthernRegion, locality)) {
    return NorthernColor;
  } else if (isLocalityInRegion(CentralRegion, locality)) {
    return CentralColor;
  } else if (isLocalityInRegion(WesternRegion, locality)) {
    return WesternColor;
  } else if (isLocalityInRegion(SouthernRegion, locality)) {
    return SouthernColor;
  } else if (isLocalityInRegion(EasternRegion, locality)) {
    return EasternColor;
  } else if (isLocalityInRegion(MidWestRegion, locality)) {
    return MidWesternColor;
  } else {
    return "#000000";
  }
};

const localities = simplemaps_statemap_mapdata.state_specific;
for (locality in localities) {
  localities[locality].url = localityUrl + locality;
  localities[locality].color = regionColor(locality);
}
