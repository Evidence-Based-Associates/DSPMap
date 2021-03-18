/*
VERSION CONTROL: 1.0 first stable build 4/3/2017
mainmapdata.js contains global functions and variables. The Virginia map is defined in this file.

Evidence Based Associates - Virginia DJJ Service Continuum Project

*/

//Mapdata from simplemaps.com
//default settings for map throughout the directory.
var simplemaps_statemap_mapdata={
  main_settings: {
    //General settings
	width: "700", //or 'responsive' 700
    background_color: "#FFFFFF",
    background_transparent: "yes",
    border_color: "#ffffff",
    popups: "detect",
    
	//State defaults
	state_description: "",
    state_color: "#517ba0",// original: 88A4BC
    state_hover_color: "#3B729F",//original: 3B729F
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
    location_image_url: ""
  },
  state_specific: {
    "51001": {
      name: "Accomack",
      description: "default",
      color: EasternColor,
      hover_color: "default",
      url:  localityUrl+"51001",
      hide: "default",
      inactive: "default",
      zoomable: "default"
    },
    "51003": {
      name: "Albemarle",
      url:  localityUrl+"51003",
      color: CentralColor
    },
    "51005": {
      name: "Alleghany",
      url:  localityUrl+"51005",
      color: CentralColor
    },
    "51007": {
      name: "Amelia",
      url:  localityUrl+"51007",
      color: SouthernColor
    },
    "51009": {
      name: "Amherst",
      url:  localityUrl+"51009",
      color: CentralColor
    },
    "51011": {
      name: "Appomattox",
      url:  localityUrl+"51011",
      color: SouthernColor
    },
    "51013": {
      name: "Arlington",
      url:  localityUrl+"51013",
      color: NorthernColor
    },
    "51015": {
      name: "Augusta",
      url:  localityUrl+"51015",
      color: CentralColor
    },
    "51017": {
      name: "Bath",
      url:  localityUrl+"51017",
      color: CentralColor
    },
    "51019": {
      name: "Bedford",
      url:  localityUrl+"51019",
      color: CentralColor
    },
    "51021": {
      name: "Bland",
      url:  localityUrl+"51021",
      color: WesternColor
    },
    "51023": {
      name: "Botetourt",
      url:  localityUrl+"51023",
      color: CentralColor
    },
    "51025": {
      name: "Brunswick",
      url:  localityUrl+"51025",
      color: SouthernColor
    },
    "51027": {
      name: "Buchanan",
      url:  localityUrl+"51027",
      color: WesternColor
    },
    "51029": {
      name: "Buckingham",
      url:  localityUrl+"51029",
      color: SouthernColor
    },
    "51031": {
      name: "Campbell",
      url:  localityUrl+"51031",
      color: CentralColor
    },
    "51033": {
      name: "Caroline",
      url:  localityUrl+"51033",
      color: CentralColor
    },
    "51035": {
      name: "Carroll",
      url:  localityUrl+"51035",
      color: WesternColor
    },
    "51036": {
      name: "Charles City",
      url:  localityUrl+"51036",
      color: CentralColor
    },
    "51037": {
      name: "Charlotte",
      url:  localityUrl+"51037",
      color: SouthernColor
    },
    "51041": {
      name: "Chesterfield",
      url:  localityUrl+"51041",
      color: SouthernColor
    },
    "51043": {
      name: "Clarke",
      url:  localityUrl+"51043",
      color: NorthernColor
    },
    "51045": {
      name: "Craig",
      url:  localityUrl+"51045",
      color: CentralColor
    },
    "51047": {
      name: "Culpeper",
      url:  localityUrl+"51047",
      color: CentralColor
    },
    "51049": {
      name: "Cumberland",
      url:  localityUrl+"51049",
      color: SouthernColor
    },
    "51051": {
      name: "Dickenson",
      url:  localityUrl+"51051",
      color: WesternColor
    },
    "51053": {
      name: "Dinwiddie",
      url:  localityUrl+"51053",
      color: SouthernColor
    },
    "51057": {
      name: "Essex",
      url:  localityUrl+"51057",
      color: CentralColor
    },
    "51059": {
      name: "Fairfax (County)",
      url:  localityUrl+"51059",
      color: NorthernColor
    },
    "51061": {
      name: "Fauquier",
      url:  localityUrl+"51061",
      color: NorthernColor
    },
    "51063": {
      name: "Floyd",
      url:  localityUrl+"51063",
      color: WesternColor
    },
    "51065": {
      name: "Fluvanna",
      url:  localityUrl+"51065",
      color: CentralColor
    },
    "51067": {
      name: "Franklin",
      url:  localityUrl+"51067",
      color: WesternColor
    },
    "51069": {
      name: "Frederick",
      url:  localityUrl+"51069",
      color: NorthernColor
    },
    "51071": {
      name: "Giles",
      url:  localityUrl+"51071",
      color: WesternColor
    },
    "51073": {
      name: "Gloucester",
      url:  localityUrl+"51073",
      color: CentralColor
    },
    "51075": {
      name: "Goochland",
      url:  localityUrl+"51075",
      color: CentralColor
    },
    "51077": {
      name: "Grayson",
      url:  localityUrl+"51077",
      color: WesternColor
    },
    "51079": {
      name: "Greene",
      url:  localityUrl+"51079",
      color: CentralColor
    },
    "51081": {
      name: "Greensville",
      url:  localityUrl+"51081",
      color: SouthernColor
    },
    "51083": {
      name: "Halifax",
      url:  localityUrl+"51083",
      color: SouthernColor
    },
    "51085": {
      name: "Hanover",
      url:  localityUrl+"51085",
      color: CentralColor
    },
    "51087": {
      name: "Henrico",
      url:  localityUrl+"51087",
      color: SouthernColor
    },
    "51089": {
      name: "Henry",
      url:  localityUrl+"51089",
      color: WesternColor
    },
    "51091": {
      name: "Highland",
      url:  localityUrl+"51091",
      color: CentralColor
    },
    "51093": {
      name: "Isle of Wight",
      url:  localityUrl+"51093",
      color: EasternColor
    },
    "51095": {
      name: "James City",
      url:  localityUrl+"51095",
      color: CentralColor
    },
    "51097": {
      name: "King and Queen",
      url:  localityUrl+"51097",
      color: CentralColor
    },
    "51099": {
      name: "King George",
      url:  localityUrl+"51099",
      color: CentralColor
    },
    "51101": {
      name: "King William",
      url:  localityUrl+"51101",
      color: CentralColor
    },
    "51103": {
      name: "Lancaster",
      url:  localityUrl+"51103",
      color: CentralColor
    },
    "51105": {
      name: "Lee",
      url:  localityUrl+"51105",
      color: WesternColor
    },
    "51107": {
      name: "Loudoun",
      url:  localityUrl+"51107",
      color: NorthernColor
    },
    "51109": {
      name: "Louisa",
      url:  localityUrl+"51109",
      color: CentralColor
    },
    "51111": {
      name: "Lunenburg",
      url:  localityUrl+"51111",
      color: SouthernColor
    },
    "51113": {
      name: "Madison",
      url:  localityUrl+"51113",
      color: CentralColor
    },
    "51115": {
      name: "Mathews",
      url:  localityUrl+"51115",
      color: CentralColor
    },
    "51117": {
      name: "Mecklenburg",
      url:  localityUrl+"51117",
      color: SouthernColor
    },
    "51119": {
      name: "Middlesex",
      url:  localityUrl+"51119",
      color: CentralColor
    },
    "51121": {
      name: "Montgomery",
      url:  localityUrl+"51121",
      color: WesternColor
    },
    "51125": {
      name: "Nelson",
      url:  localityUrl+"51125",
      color: CentralColor
    },
    "51127": {
      name: "New Kent",
      url:  localityUrl+"51127",
      color: CentralColor
    },
    "51131": {
      name: "Northampton",
      url:  localityUrl+"51131",
      color: EasternColor
    },
    "51133": {
      name: "Northumberland",
      url:  localityUrl+"51133",
      color: CentralColor
    },
    "51135": {
      name: "Nottoway",
      url:  localityUrl+"51135",
      color: SouthernColor
    },
    "51137": {
      name: "Orange",
      url:  localityUrl+"51137",
      color: CentralColor
    },
    "51139": {
      name: "Page",
      url:  localityUrl+"51139",
      color: NorthernColor
    },
    "51141": {
      name: "Patrick",
      url:  localityUrl+"51141",
      color: WesternColor
    },
    "51143": {
      name: "Pittsylvania",
      url:  localityUrl+"51143",
      color: WesternColor
    },
    "51145": {
      name: "Powhatan",
      url:  localityUrl+"51145",
      color: SouthernColor
    },
    "51147": {
      name: "Prince Edward",
      url:  localityUrl+"51147",
      color: SouthernColor
    },
    "51149": {
      name: "Prince George",
      url:  localityUrl+"51149",
      color: SouthernColor
    },
    "51153": {
      name: "Prince William",
      url:  localityUrl+"51153",
      color: NorthernColor
    },
    "51155": {
      name: "Pulaski",
      url:  localityUrl+"51155",
      color: WesternColor
    },
    "51157": {
      name: "Rappahannock",
      url:  localityUrl+"51157",
      color: NorthernColor
    },
    "51159": {
      name: "Richmond (County)",
      url:  localityUrl+"51159",
      color: CentralColor
    },
    "51161": {
      name: "Roanoke (County)",
      url:  localityUrl+"51161",
      color: WesternColor
    },
    "51163": {
      name: "Rockbridge",
      url:  localityUrl+"51163",
      color: CentralColor
    },
    "51165": {
      name: "Rockingham",
      url:  localityUrl+"51165",
      color: NorthernColor
    },
    "51167": {
      name: "Russell",
      url:  localityUrl+"51167",
      color: WesternColor
    },
    "51169": {
      name: "Scott",
      url:  localityUrl+"51169",
      color: WesternColor
    },
    "51171": {
      name: "Shenandoah",
      url:  localityUrl+"51171",
      color: NorthernColor
    },
    "51173": {
      name: "Smyth",
      url:  localityUrl+"51173",
      color: WesternColor
    },
    "51175": {
      name: "Southampton",
      url:  localityUrl+"51175",
      color: EasternColor
    },
    "51177": {
      name: "Spotsylvania",
      url:  localityUrl+"51177",
      color: CentralColor
    },
    "51179": {
      name: "Stafford",
      url:  localityUrl+"51179",
      color: CentralColor
    },
    "51181": {
      name: "Surry",
      url:  localityUrl+"51181",
      color: SouthernColor
    },
    "51183": {
      name: "Sussex",
      url:  localityUrl+"51183",
      color: SouthernColor
    },
    "51185": {
      name: "Tazewell",
      url:  localityUrl+"51185",
      color: WesternColor
    },
    "51187": {
      name: "Warren",
      url:  localityUrl+"51187",
      color: NorthernColor
    },
    "51191": {
      name: "Washington",
      url:  localityUrl+"51191",
      color: WesternColor
    },
    "51193": {
      name: "Westmoreland",
      url:  localityUrl+"51193",
      color: CentralColor
    },
    "51195": {
      name: "Wise",
      url:  localityUrl+"51195",
      color: WesternColor
    },
    "51197": {
      name: "Wythe",
      url:  localityUrl+"51197",
      color: WesternColor
    },
    "51199": {
      name: "York",
      url:  localityUrl+"51199",
      color: CentralColor
    },
    "51510": {
      name: "Alexandria",
      url:  localityUrl+"51510",
      color: NorthernColor
    },
    //may cause error?
    "51515": {
      name: "Bedford",
      url:  localityUrl+"51515",
      color: NorthernColor
    },
    "51520": {
      name: "Bristol",
      url:  localityUrl+"51520",
      color: WesternColor
    },
    "51530": {
      name: "Buena Vista",
      url:  localityUrl+"51530",
      color: CentralColor
    },
    "51540": {
      name: "Charlottesville",
      url:  localityUrl+"51540",
      color: CentralColor
    },
    "51550": {
      name: "Chesapeake",
      url:  localityUrl+"51550",
      color: EasternColor
    },
    "51570": {
      name: "Colonial Heights",
      url:  localityUrl+"51570",
      color: SouthernColor
    },
    "51580": {
      name: "Covington",
      url:  localityUrl+"51580",
      color: CentralColor
    },
    "51590": {
      name: "Danville",
      url:  localityUrl+"51590",
      color: WesternColor
    },
    "51595": {
      name: "Emporia",
      url:  localityUrl+"51595",
      color: SouthernColor
    },
    "51600": {
      name: "Fairfax (City)",
      url:  localityUrl+"51600",
      color: NorthernColor
    },
    "51610": {
      name: "Falls Church",
      url:  localityUrl+"51610",
      color: NorthernColor
    },
    "51620": {
      name: "Franklin",
      url:  localityUrl+"51620",
      color: EasternColor
    },
    "51630": {
      name: "Fredericksburg",
      url:  localityUrl+"51630",
      color: CentralColor
    },
    "51640": {
      name: "Galax",
      url:  localityUrl+"51640",
      color: WesternColor
    },
    "51650": {
      name: "Hampton",
      url:  localityUrl+"51650",
      color: EasternColor
    },
    "51660": {
      name: "Harrisonburg",
      url:  localityUrl+"51660",
      color: NorthernColor
    },
    "51670": {
      name: "Hopewell",
      url:  localityUrl+"51670",
      color: SouthernColor
    },
    "51678": {
      name: "Lexington",
      url:  localityUrl+"51678",
      color: CentralColor
    },
    "51680": {
      name: "Lynchburg",
      url:  localityUrl+"51680",
      color: CentralColor
    },
    "51683": {
      name: "Manassas",
      url:  localityUrl+"51683",
      color: NorthernColor
    },
    "51685": {
      name: "Manassas Park",
      url:  localityUrl+"51685",
      color: NorthernColor
    },
    "51690": {
      name: "Martinsville",
      url:  localityUrl+"51690",
      color: WesternColor
    },
    "51700": {
      name: "Newport News",
      url:  localityUrl+"51700",
      color: EasternColor
    },
    "51710": {
      name: "Norfolk",
      url:  localityUrl+"51710",
      color: EasternColor
    },
    "51720": {
      name: "Norton",
      url:  localityUrl+"51720",
      color: WesternColor
    },
    "51730": {
      name: "Petersburg",
      url:  localityUrl+"51730",
      color: SouthernColor
    },
    "51735": {
      name: "Poquoson",
      url:  localityUrl+"51735",
      color: CentralColor
    },
    "51740": {
      name: "Portsmouth",
      url:  localityUrl+"51740",
      color: EasternColor
    },
    "51750": {
      name: "Radford",
      url:  localityUrl+"51750",
      color: WesternColor
    },
    "51760": {
      name: "Richmond (City)",
      url:  localityUrl+"51760",
      color: SouthernColor
    },
    "51770": {
      name: "Roanoke (City)",
      url:  localityUrl+"51770",
      color: WesternColor
    },
    "51775": {
      name: "Salem",
      url:  localityUrl+"51775",
      color: WesternColor
    },
    "51790": {
      name: "Staunton",
      url:  localityUrl+"51790",
      color: CentralColor
    },
    "51800": {
      name: "Suffolk",
      url:  localityUrl+"51800",
      color: EasternColor
    },
    "51810": {
      name: "Virginia Beach",
      url:  localityUrl+"51810",
      color: EasternColor
    },
    "51820": {
      name: "Waynesboro",
      url:  localityUrl+"51820",
      color: CentralColor
    },
    "51830": {
      name: "Williamsburg",
      url:  localityUrl+"51830",
      color: CentralColor
    },
    "51840": {
      name: "Winchester",
      url:  localityUrl+"51840",
      color: NorthernColor
    }
  },
  locations: {
   
  },
  regions: {
    "0": {
      states: [
        "51069",
        "51139",
        "51840",
        "51171",
        "51165",
        "51660",
        "51187",
        "51157",
        "51061",
        "51043",
        "51107",
        "51153",
        "51683",
        "51685",
        "51059",
        "51600",
        "51013",
        "51510",
        "51610"
      ],
      name: "Northern Region",
      color: NorthernColor
    },
    "1": {
      states: [
        "51003",
        "51017",
        "51091",
        "51015",
        "51790",
        "51820",
        "51540",
        "51005",
        "51580",
        "51045",
        "51023",
        "51163",
        "51530",
        "51678",
        "51125",
        "51009",
        "51680",
        "51019",
        "51031",
        "51079",
        "51113",
        "51137",
        "51047",
        "51109",
        "51065",
        "51075",
        "51085",
        "51033",
        "51177",
        "51179",
        "51630",
        "51099",
        "51193",
        "51133",
        "51057",
        "51159",
        "51097",
        "51119",
        "51103",
        "51115",
        "51073",
        "51199",
        "51735",
        "51101",
        "51127",
        "51036",
        "51095",
        "51830"
      ],
      name: "Central Region",
      color: CentralColor
    },
    "2": {
      states: [
        "51105",
        "51143",
        "51590",
        "51169",
        "51195",
        "51720",
        "51051",
        "51027",
        "51167",
        "51185",
        "51191",
        "51520",
        "51173",
        "51021",
        "51071",
        "51197",
        "51155",
        "51121",
        "51077",
        "51161",
        "51770",
        "51640",
        "51035",
        "51063",
        "51067",
        "51141",
        "51089",
        "51690",
        "51750",
        "51775"
      ],
      name: "Western Region",
      color: WesternColor
    },
    "3": {
        states: [
        "51007",
        "51011",
        "51025",
        "51029",
        "51037",
        "51041",
        "51049",
        "51053",
        "51081",
        "51083",
        "51087",
        "51111",
        "51117",
        "51135",
        "51145",
        "51147",
        "51149",
        "51159",
        "51181",
        "51183",
        "51570",
        "51595",
        "51670",
        "51730",
        "51760"
      ],
      name: "Southern Region",
      color: SouthernColor
    },
    "4": {
        states: [
        "51067",
        "51093",
        "51001",
        "51131",
        "51175",
        "51550",
        "51620",
        "51650",
        "51700",
        "51710",
        "51740",
        "51800",
        "51810"
      ],
      name: "Eastern Region",
      color: EasternColor
    }
  }
};