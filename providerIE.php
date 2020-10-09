<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Provider Coverage Map</title>
    <script src="mainmapdata.js?v=7.10.2017-7"></script>
    <script src="statemap.js"></script>
    <link rel="stylesheet" type="text/css" href="pdstyle.css">   
    </head>
    <body>
<script>
//connect to data file
var Connect = new XMLHttpRequest();
Connect.open("GET", "dsps.xml", false);
Connect.setRequestHeader("Content-Type", "text/xml");
Connect.send(null);
// Place the response in an XML document.
var dspsXML = Connect.responseXML;
// alter mainmap data here
    
//remove colors to allow coverage to be seen
simplemaps_statemap_mapdata.regions["0"].color = "default";
simplemaps_statemap_mapdata.regions["1"].color = "default";
simplemaps_statemap_mapdata.regions["2"].color = "default";
simplemaps_statemap_mapdata.regions["3"].color = "default";
simplemaps_statemap_mapdata.regions["4"].color = "default";
    
//remove locality colors
for (i=0;i<allFips.length;i++){
    var ColorChange = allFips[i];
    simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "default";
}
    
//get provider info.    
//var provider = dspsXML.getElementById("p0");
//var provider = dspsXML.getElementsByName("p0").item(0);
var providerList = dspsXML.getElementsByTagName("Provider");
for (var i=0;i<providerList.length;i++){
    if (providerList.item(i).getAttribute("id") == pageID){
        var provider = providerList.item(i);
    }
}    
    
var providerName = provider.getElementsByTagName("Name");
var providerUpdated = provider.getElementsByTagName("LastUpdated").item(0).textContent.split("-");
var providerWebsite = provider.getElementsByTagName("Website");
var providerContact = provider.getElementsByTagName("ContactName");
var providerEmail = provider.getElementsByTagName("ContactEmail");
var mapZoom = provider.getElementsByTagName("MapZoom");
var officeCount = provider.getElementsByTagName("Office").length;
    
//office info tags  
var officeLat = provider.getElementsByTagName("Lat");   
var officeLng = provider.getElementsByTagName("Lng");
var officeStreet = provider.getElementsByTagName("Street");
var officeCity = provider.getElementsByTagName("City");
var officeState = provider.getElementsByTagName("State");
var officeZip = provider.getElementsByTagName("Zip");
var officePhone = provider.getElementsByTagName("Phone");
var officeFax = provider.getElementsByTagName("Fax");
    
//populate only this provider's locations
//needs to be outside of the loop
var locationCounter = 0;
//cycle through all locations
for (i=0;i<officeCount;i++){
    //add the office data to a map location
    simplemaps_statemap_mapdata.locations[locationCounter] = {
        lat: officeLat.item(i).textContent,
        lng: officeLng.item(i).textContent,
        name: providerName.item(0).textContent,
        color: "default",
        description: officeStreet.item(i).textContent + "<br>" + officeCity.item(i).textContent + ", " + officeState.item(i).textContent + " " + officeZip.item(i).textContent + "<br>" + officePhone.item(i).textContent,
        url: "",
        size: "default",
        type: "default",
        image_url: "default",
        opacity: "default"
    }
    //update counter so it doesn't overwrite a location
    locationCounter++;
}

//set this provider's map zoom
simplemaps_statemap_mapdata.main_settings.initial_zoom = mapZoom.item(0).textContent;
var services = provider.getElementsByTagName("ServiceGroupMap");    
//if this is the landing page for the provider then show all-service coverage area
if (mapLayer == "all"){ //show entire coverage area for landing page
    var serviceZoom = provider.getElementsByTagName("MapZoom");
    serviceZoom = serviceZoom.item(0).textContent;
    var locations = provider.getElementsByTagName("FIPs");
    var mapDescription = "Provider's Complete Coverage Area";
} else { //this is for a specific map
    var serviceZoom = services.item(mapLayer).getAttribute("serviceZoom");
    var locations = services.item(mapLayer).getElementsByTagName("FIPs");
    var mapDescription = services.item(mapLayer).getAttribute("type");
}
if (serviceZoom > 51000){
    //empty the regions, and set focus on the service locality
    //this should apply when a provider serves a map in only one locality.
    simplemaps_statemap_mapdata.regions = {};
    //fill with focus CSU
    simplemaps_statemap_mapdata.regions[0] = {
        states: [serviceZoom],
        name: ""
    };
    simplemaps_statemap_mapdata.main_settings.initial_zoom = 0;
} else if (serviceZoom < 5){
    simplemaps_statemap_mapdata.main_settings.initial_zoom = serviceZoom;
}
    
//Change county colors based on key
//set colors based on coverage
//separate the loops to change all the travelRequired first, and then again to overwrite travel not required
for (var i = 0; i < locations.length; i++){
    //special case for "ALL"
    if (locations.item(i).textContent == "ALL"){
        if (locations.item(i).getAttribute("travelReq") == "Y"){
            for (j=0;j<allFips.length;j++){
                simplemaps_statemap_mapdata.state_specific[allFips[j]].color = TravelColor;    
            }
        } else if (locations.item(i).getAttribute("travelReq") == "N"){
            for (j=0;j<allFips.length;j++){
                simplemaps_statemap_mapdata.state_specific[allFips[j]].color = RegColor;    
            }
        } 
    } 
    else { //a FIPs code
        if (locations.item(i).getAttribute("travelReq") == "Y"){
            simplemaps_statemap_mapdata.state_specific[locations[i].innerHTML].color = TravelColor;
        } 
    }
}
//overwrite travel not required.
for (var i = 0; i < locations.length; i++){
    if (locations.item(i).getAttribute("travelReq") == "N"){
            simplemaps_statemap_mapdata.state_specific[locations.item(i).textContent].color = RegColor;
        }  
}
    
//***PAGE DISPLAY GOES BELOW***    
//write provider name
    document.write('<h2><u>'+providerName.item(0).textContent+'</u></h2><i>(scroll below the map for additional information about this provider)</i><br><br><table width=700px>\
    <tr><td align="left" valign="top" width="300">');
document.write("<a href=index.php>Return to Provider Map Directory</a>.");
document.write("<br><br><br><i><b>"+mapDescription+"</b></i>");
    
//if there are more map layers for this provider, display the links:
if (services.length>1){
    document.write("<br><br>View this provider's other coverage maps:<br>");
    document.write("<ul>");
    if (mapLayer != "all"){
        document.write("<li><a href=provider.php?id="+pageID+"?map=all>Provider's Complete Coverage Area.</a></li>"); 
    }
    //***Create a Loop for the coverage maps
    for (i=0;i<services.length;i++){
        //skip the map that is already displayed
        if (i != mapLayer){
            mapDescription = services.item(i).getAttribute("type");
            document.write("<li><a href=provider.php?id="+pageID+"?map="+i+">"+mapDescription+"</a></li>");     
        } 
    }
    document.write("</ul></td>");
}
</script>
<!-- blank cell between -->
<td width=50></td>
    <td valign="top" align="right">
    <table>
    <tr valign="top">
        <td>Service Area:</td>
        <td width=10></td>
        <td><div style="width:50px;height:50px;border:1px solid #000;background-color:#008000;"></div></td>
    </tr>
    <tr valign="top">
        <td>Limited Service:</td>
        <td width=10></td>
        <td><div style="width:50px;height:50px;border:1px solid #000;background-color:#90EE90;"></div></td>
    </tr>
    <tr valign="top">
        <td>Not Provided:
        <script>
        //check if there is no map
        if (mapDescription == "Information is not available regarding this provider's coverage area."){
            document.write("*:</td>");
        }
        </script>
        <td width=10></td>
        <td><div style="width:50px;height:50px;border:1px solid #000;background-color:#88A4BC;"></div></td>
    </tr>
    </table>
    </td>
</tr>
</table>
<br>
    <div id="map"></div>
<br>
<script>
        //check if there is no map
        if (mapDescription == "Information is not available regarding this provider's coverage area."){
            document.write("<i>*A blank map may indicate that geographic coverage information has not yet been received by EBA.</i>");
        }
</script>
<!-- coverage area defined -->
<div class="tooltip">Coverage Areas, Defined
<span class="tooltiptext">
One goal of the DJJ Service Continuum is to ensure that court-involved youth and families receive evidence-based services within their home community. <br><br><b><u>Coverage Area</u></b> (in darker green) means the service provider regularly delivers community-based services in the locality. <b><u>Limited Service</u></b> (in lighter green) means the service provider does not have a regular presence in the locality but will travel as-needed to deliver services such as specialized assessments, evaluations, outpatient services at a CSU office, short-term group programs, or to underserved areas with low or infrequent service needs. <br><br><i>Limited Service may also indicate a residential program which is able to accept youth from any locality.    
</span>
</div>
<br><br>
If you see any errors or missing information for this provider, <a href="mailto:jwalkley@ebanetwork.com?Subject=[ProviderPage]">please let us know!</a>
<script>
document.write("<h2 class='ebaBlue'><u>"+providerName.item(0).textContent+"</u></h2>");
document.write("<ul>");
document.write("<li><b>Provider's information was last updated: </b>"+providerUpdated[1]+"-"+providerUpdated[2]+"-"+providerUpdated[0]+"</li>");
document.write("<li><b>Website</b>: <a href=http://"+providerWebsite.item(0).textContent+">"+providerWebsite.item(0).textContent+"</a></li>");
document.write("<li><b>Main Office:</b></li>");
document.write("<ul>")
document.write("<li>"+officeStreet.item(0).textContent+"<br>"+officeCity.item(0).textContent+", "+officeState.item(0).textContent+" "+officeZip.item(0).textContent+"<br>Phone: "+officePhone.item(0).textContent+"<br>Fax: "+officeFax.item(0).textContent+"</li>");
document.write("</ul>"); 
document.write("<li><b>Contact:</b> "+providerContact.item(0).textContent+"</li>");
document.write("<li><b>Contact Email:</b> "+providerEmail.item(0).textContent+"</li>");
document.write("</ul>");
document.write("<h2 class='ebaBlue'><u>Providing Services in the Following CSUs:</u></h2>");
    
//get provider's CSU coverage:
var providerAllLocations = provider.getElementsByTagName("FIPs");
var serviceFIPsArray = [];
    
var oneTimeNotice = 1;
for (i=0;i<providerAllLocations.length;i++){
    if (providerAllLocations[i].innerHTML != "ALL"){
        serviceFIPsArray.push(providerAllLocations.item(i).textContent);   
    } else if (oneTimeNotice) {
        document.write("<i>This provider accepts referrals from any locality, but offers direct services in these CSUs:</i>");
        oneTimeNotice = 0;
    }
}
serviceFIPsArray = removeDuplicates(serviceFIPsArray);
    
var providerCSUArray = [];
//look for the CSU
//Cycle through regions
//priting as you cycle through the CSU structure will have the correct numerical sort 
document.write("<ul>");
for (i=0;i<CSUStructure.length;i++){   
    //cycle through region's CSUs
    for (j=0;j<CSUStructure[i].CSUs.length;j++){
        //cycle through the provider locations
        for (k=0;k<serviceFIPsArray.length;k++){
            if (CSUStructure[i].CSUs[j].localities.indexOf(serviceFIPsArray[k])>=0 && providerCSUArray.indexOf(CSUStructure[i].CSUs[j].name)==-1){  
                providerCSUArray.push(CSUStructure[i].CSUs[j].name);
                document.write("<li>"+CSUStructure[i].CSUs[j].name+"</li>");
            }    
        }
    }
}
//close ul
document.write("</ul>");
    
//Display service localities:
document.write("<h2 class='ebaBlue'><u>Providing Services in the Following Localities:</u></h2>");
var cityCountyBoundary = 0;
document.write("<b>Counties:</b>");
document.write("<ul>");
for (i=0;i<serviceFIPsArray.length;i++){
    if (Number(serviceFIPsArray[i]) > 51500 && cityCountyBoundary == 0){
        document.write("</ul><b>Cities:</b><ul>");
        cityCountyBoundary = 1;
    }
    document.write("<li>"+simplemaps_statemap_mapdata.state_specific[serviceFIPsArray[i]].name+"</li>");
}
document.write("</ul>");

//Display service menu:
document.write("<h2 class='ebaBlue'><u>Providing the Following Services:</div></u></h2>");
document.write("<ul>");
//place into array in order to alphabetize
var allProviderServices = provider.getElementsByTagName("ServiceItem");
var allProviderServicesArray = [];
for (i=0;i<allProviderServices.length;i++){
    var serviceNote = allProviderServices.item(i).getAttribute("note");
    allProviderServicesArray.push(allProviderServices.item(i).textContent+"!"+serviceNote);
}
allProviderServicesArray.sort();
allProviderServicesArray = removeDuplicates(allProviderServicesArray);
for (i=0;i<allProviderServicesArray.length;i++){
    var serviceInfo = [];
    serviceInfo = allProviderServicesArray[i].split("!");
    document.write("<li>"+serviceInfo[0]);
    if (serviceInfo[1] != "null"){
        document.write(" <b><u>note:</u></b> "+serviceInfo[1]+"</li>");
    } else {
        document.write("</li>");
    }
}
document.write("</ul>");
</script>
<br><br>
If you see any errors or missing information for this provider, <a href="mailto:jwalkley@ebanetwork.com?Subject=[ProviderPage]">please let us know!</a>
	</body>
</html>
