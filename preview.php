<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Preview Changes</title>
    <script src="globals.js?v=08.20.2021-0"></script>
    <script src="mainmapdata.js?v=7.10.2017-3"></script>
    <script src="statemap.js"></script>
    <link rel="stylesheet" type="text/css" href="pdstyle.css">
    <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-103149868-1', 'auto');
  ga('send', 'pageview');

</script>
    </head>
    <body>
<script>
//parse the variable from the edit tool
parser = new DOMParser();
previewDSP = parser.parseFromString(sessionStorage.DSPCode,"text/xml");
    
function passCode(){
    document.getElementsByName("DSPXMLCode")[0].value = sessionStorage.DSPCode;
    document.getElementsByName("submitterN")[0].value = sessionStorage.submitterName;
    document.getElementsByName("submitterE")[0].value = sessionStorage.submitterEmail;
    
}    
//clear the map
for (i=0;i<allFips.length;i++){
        simplemaps_statemap_mapdata.state_specific[allFips[i]].url = "";
        simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "default";
        simplemaps_statemap_mapdata.state_specific[allFips[i]].border_color = "default";
        simplemaps_statemap_mapdata.state_specific[allFips[i]].description = "default";
}
//alert(sessionStorage.DSPCode);
//functions
function displayService(){
    //Clear the map
    //alert("here");
    for (i=0;i<allFips.length;i++){
        //simplemaps_statemap_mapdata.state_specific[allFips[i]].url = "javascript:toggleTravel("+allFips[i]+")";
        simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "default";
        simplemaps_statemap_mapdata.state_specific[allFips[i]].border_color = "default";
        simplemaps_statemap_mapdata.state_specific[allFips[i]].description = "default";
    }
    //load up color code for first map
    //alert(document.getElementById(serviceSelect).value);
    var locations = providerServices.item(document.getElementById("serviceSelect").value).getElementsByTagName("FIPs");
    //alert("locations is "+providerServices.item(0).textContent);
    //alert("location attribute "+ locations.item(0).getAttribute('travelReq'));
    for (var i=0; i<locations.length; i++){
        if (locations.item(i).getAttribute("travelReq") == "Y"){
            simplemaps_statemap_mapdata.state_specific[locations[i].textContent].color = TravelColor;
            simplemaps_statemap_mapdata.state_specific[locations[i].textContent].hover_color = TravelColor;
        }
        if (locations.item(i).getAttribute("travelReq") == "N"){
            simplemaps_statemap_mapdata.state_specific[locations[i].textContent].color = RegColor;
            simplemaps_statemap_mapdata.state_specific[locations[i].textContent].hover_color = RegColor;
        }
        if (locations.item(i).getAttribute("languages")){
            //simplemaps_statemap_mapdata.state_specific[locations[i].textContent].border_color = LanguageColor;
            simplemaps_statemap_mapdata.state_specific[locations[i].textContent].description = "Available in "+locations.item(i).getAttribute("languages");
        }
    }
    simplemaps_statemap.refresh();
}
    
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
//var provider = dspsXML.getElementById(pageID);
var providerList = dspsXML.getElementsByTagName("Provider");
for (var i=0;i<providerList.length;i++){
    if (providerList.item(i).getAttribute("id") == pageID){
        var provider = providerList.item(i);
    }
}
    
var providerName = previewDSP.getElementsByTagName("Name");
var providerUpdated = previewDSP.getElementsByTagName("LastUpdated").item(0).textContent.split("-");
var providerWebsite = previewDSP.getElementsByTagName("Website");
var providerContact = previewDSP.getElementsByTagName("ContactName");
var providerEmail = previewDSP.getElementsByTagName("ContactEmail");
var mapZoom = previewDSP.getElementsByTagName("MapZoom");
var officeCount = previewDSP.getElementsByTagName("Office").length;
    
//office info tags  
var officeLat = previewDSP.getElementsByTagName("Lat");   
var officeLng = previewDSP.getElementsByTagName("Lng");
var officeStreet = previewDSP.getElementsByTagName("Street");
var officeCity = previewDSP.getElementsByTagName("City");
var officeState = previewDSP.getElementsByTagName("State");
var officeZip = previewDSP.getElementsByTagName("Zip");
var officePhone = previewDSP.getElementsByTagName("Phone");
var officeFax = previewDSP.getElementsByTagName("Fax");
    
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
        
var services = previewDSP.getElementsByTagName("Service");    
//if this is the landing page for the provider then show all-service coverage area
if (mapLayer == "all"){ //previewDSP entire coverage area for landing page
    var serviceZoom = previewDSP.getElementsByTagName("MapZoom");
    serviceZoom = serviceZoom.item(0).textContent;
    var locations = previewDSP.getElementsByTagName("FIPs");
    var mapDescription = "Provider's Complete Coverage Area";
} else { //this is for a specific map
    var serviceZoom = services.item(Number(mapLayer)).getAttribute("serviceZoom");
    var locations = services.item(Number(mapLayer)).getElementsByTagName("FIPs");
    var mapDescription = services.item(Number(mapLayer)).getAttribute("type");
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
//***PAGE DISPLAY GOES BELOW***
</script>
<center>
<h2 class="ebaBlue">Instructions:</h2>
<br><i>Scroll below to see how your changes would appear in the provider directory.</i>
<!--
<br><br><b>If this is correct then <a href="javascript:window.print()">Print this page as a PDF</a></b> and <a href="mailto:joelnwalkley@gmail.com?Subject=[ProviderUpdate]">email the attachment here</a>.</i><br>
Do not physically print and scan, but rather save electronically and mail that as an attachment.
<br><br>
-->
<br><br><i>If your entry appears complete and accurate as you would like for it to appear in the EBA directory, please click the "Submit Change Request"</i><br>
Be sure to check all service maps, languages, localities both on the map and the information below.<br><br>
<form method="post" action="submitedit.php" onsubmit="passCode()">
<input type="submit" style="background-color:lightblue;height:50px;width:225px" value="Submit Change Request">
<input type="hidden" name="DSPXMLCode" value="NONE"/>
<input type="hidden" name="submitterN" value="NONE"/>
<input type="hidden" name="submitterE" value="NONE"/>
</form>
<br><br>
OR
<br><br>
<a href="editprovider.php">Click Here to Continue Editing</a>
<br><br>
You can continue making as many revisions to your entry as neccessary, however please only submit a single change request.
<br><br>
(to restart from the existing entry, close your browser and return to the edit page in a new session)
<h1>---BEGIN PREVIEW---</h1>
</center>
<hr>
<a href="#"><i>Return to Provider Map Directory</i></a>.
<table cellpadding="10">
    <tr>
        <td>
            <h2><u><script>document.write(providerName.item(0).textContent);</script></u></h2>
            <i>(scroll below the map for additional information about this provider)</i><br><br>
            <i><b>Select Service To View Coverage Area</b></i>:<br>  
<script>
            //document.write("<br><br><br><i><b>"+mapDescription+"</b></i>");   
            var providerServices = previewDSP.getElementsByTagName("Service");
            document.write('<select id="serviceSelect" onchange="displayService()">');
            for (var i=0; i< providerServices.length;i++){
                document.write('<option value="'+i+'">'+providerServices.item(i).getAttribute("serviceName")+'</option>');   
            }
            document.write('</select></td>');
</script>
<td>
<table>
    <tr valign="top">
        <td>Service Area:</td>
        <td width=10></td>
        <td><div style="width:30px;height:30px;border:1px solid #000;background-color:#008000;"></div></td>
    </tr>
    <tr valign="top">
        <td>Limited Service:</td>
        <td width=10></td>
        <td><div style="width:30px;height:30px;border:1px solid #000;background-color:#90EE90;"></div></td>
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
        <td><div style="width:30px;height:30px;border:1px solid #000;background-color:#88A4BC;"></div></td>
    </tr>
    <!-- get rid of language border for now
    <tr valign="top">
        <td>Non-English Available:<br><i>click to zoom-in, then hover for language list.</i>
        <td width=10></td>
        <td><div style="width:50px;height:50px;border:1px solid #ffa500;background-color:#008000;"></div></td>
    </tr>
    -->
</table>
</td></tr></table>
<script>
//load up color code for first map
var locations = providerServices.item(0).getElementsByTagName("FIPs");
//alert("locations lenght is "+providerServices.length);
for (var i=0; i<locations.length; i++){
    //alert("location attribute "+ locations.item(i).getAttribute('travelReq'));
    if (locations.item(i).getAttribute("travelReq") == "Y"){
        simplemaps_statemap_mapdata.state_specific[locations[i].textContent].color = TravelColor;
        simplemaps_statemap_mapdata.state_specific[locations[i].textContent].hover_color = TravelColor;
    }
    if (locations.item(i).getAttribute("travelReq") == "N"){
        simplemaps_statemap_mapdata.state_specific[locations[i].textContent].color = RegColor;
        simplemaps_statemap_mapdata.state_specific[locations[i].textContent].hover_color = RegColor;
    }
    if (locations.item(i).getAttribute("languages")){
        //simplemaps_statemap_mapdata.state_specific[locations[i].textContent].border_color = LanguageColor;
        simplemaps_statemap_mapdata.state_specific[locations[i].textContent].description = "Available in "+locations.item(i).getAttribute("languages");
    }
}

</script>
<!-- blank cell between -->
<!-- get rid of the key, save explaination in the text below?-->
<div id="coveragemap"></div>
<!-- coverage area defined -->
<div class="tooltip">Coverage Areas, Defined
<span class="tooltiptext">
One goal of the DJJ Service Continuum is to ensure that court-involved youth and families receive evidence-based services within their home community. <br><br><b><u>Coverage Area</u></b> (in darker green) means the service provider regularly delivers community-based services in the locality. <b><u>Limited Service</u></b> (in lighter green) means the service provider does not have a regular presence in the locality but will travel as-needed to deliver services such as specialized assessments, evaluations, outpatient services at a CSU office, short-term group programs, or to underserved areas with low or infrequent service needs. <br><br>To view language availability, click to zoom in by region and then hover over a locality.
</span>
</div>
<script>
        //check if there is no map
        if (mapDescription == "Information is not available regarding this provider's coverage area."){
            document.write("<i>*A blank map may indicate that geographic coverage information has not yet been received by EBA.</i>");
        }
</script>
<br>
If you see any errors or missing information for this provider, <a href="mailto:joelnwalkley@gmail.com?Subject=[ProviderPage]">please let us know!</a><br><br>
<script>
document.write("<h2 class='ebaBlue'><u>"+providerName.item(0).textContent+"</u></h2>");
document.write("<ul>");
document.write("<li><b>Provider's information was last updated: </b>"+providerUpdated[1]+"-"+providerUpdated[2]+"-"+providerUpdated[0]+"</li>");
document.write("<li><b>Website</b>: <a href='http://"+providerWebsite.item(0).textContent+"'>"+providerWebsite.item(0).textContent+"</a></li>");
document.write("<li><b>Main Office:</b></li>");
document.write("<ul>")
document.write("<li>"+officeStreet.item(0).textContent+"<br>"+officeCity.item(0).textContent+", "+officeState.item(0).textContent+" "+officeZip.item(0).textContent+"<br>Phone: "+officePhone.item(0).textContent+"<br>Fax: "+officeFax.item(0).textContent+"</li>");
document.write("</ul>"); 
document.write("<li><b>Contact:</b> "+providerContact.item(0).textContent+"</li>");
document.write("<li><b>Contact Email:</b> "+providerEmail.item(0).textContent+"</li>");
document.write("</ul>");
document.write("<h2 class='ebaBlue'><u>Providing Services in the Following CSUs:</u></h2>");
    
//get provider's CSU coverage:
var providerAllLocations = previewDSP.getElementsByTagName("FIPs");
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
document.write("<br><b>Counties:</b>");
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
var allProviderServices = previewDSP.getElementsByTagName("Service");
var allProviderServicesArray = [];
for (i=0;i<allProviderServices.length;i++){
    //var serviceNote = allProviderServices.item(i).getAttribute("note");
    allProviderServicesArray.push(allProviderServices.item(i).getAttribute("serviceName"));
}
allProviderServicesArray.sort();
allProviderServicesArray = removeDuplicates(allProviderServicesArray);
for (i=0;i<allProviderServicesArray.length;i++){
    var serviceInfo = [];
    serviceInfo = allProviderServicesArray[i].split("!");
    document.write("<li>"+serviceInfo[0]);
    if (serviceInfo[1] != "null"){
        //document.write(" <b><u>note:</u></b> "+serviceInfo[1]+"</li>");
    } else {
        document.write("</li>");
    }
}
document.write("</ul>");

//Display language menu:
//Display service menu:
document.write("<h2 class='ebaBlue'><u>With Services in the Following Language:</div></u></h2>");
document.write("<br><i>consult the map above for specific language availability</i>");
document.write("<ul>");
//place into array in order to alphabetize
var allProviderLocations = previewDSP.getElementsByTagName("FIPs");
var allProviderLanguagesArray = [];
//alert ("lenght "+allProviderServices.length);
for (var i=0;i<allProviderLocations.length;i++){
    //var serviceNote = allProviderServices.item(i).getAttribute("note");
    //allProviderLanguagesArray.push(allProviderServices.item(i).getAttribute("serviceName"));
    if (allProviderLocations.item(i).getAttribute("languages")){
        var serviceLanguageStr = allProviderLocations.item(i).getAttribute("languages");
        serviceLanguageStr = serviceLanguageStr.replace(" ","");
        //alert("attribute is "+allProviderLocations.item(i).getAttribute("languages"));
        if (serviceLanguageStr.includes(",")){
            var serviceLanguages = serviceLanguageStr.split(",");
            for (var j=0;j<serviceLanguages.length;j++){
                allProviderLanguagesArray.push(serviceLanguages[j]);
            }
        } else {
            //var serviceLanguages = allProviderLocations.item(i).getAttribute("languages");
            allProviderLanguagesArray.push(allProviderLocations.item(i).getAttribute("languages"));
        }
    }
    //alert("serviceLanguageStr is "+serviceLanguageStr);
    //alert("attribute is "+allProviderLocations.item(i).getAttribute("languages"));
    //alert("serviceLanguages is "+serviceLanguages.item(i));
    //for (j=0;j<serviceLanguages.legth;j++){
    //    allProviderLanguagesArray.push(serviceLanguages[j]);
    //}
}

allProviderLanguagesArray = removeDuplicates(allProviderLanguagesArray);
allProviderLanguagesArray.sort();
        
for (i=0;i<allProviderLanguagesArray.length;i++){
    //var serviceInfo = [];
    //serviceInfo = allProviderServicesArray[i].split("!");
    //document.write("<li>"+serviceInfo[0]);
    document.write("<li>"+allProviderLanguagesArray[i]+"</li>");
}
document.write("</ul>");

</script>
<br><br>
If you see any errors or missing information for this provider, <a href="mailto:joelnwalkley@gmail.com?Subject=[ProviderPage]">please let us know!</a>
<br><br>
<hr>
<center><h1>---END PREVIEW---</h1><!--<i>for EBA use:</i></center><br>-->
<script>
//alert(sessionStorage.DSPCode);
//document.write();
//var DSPText = document.createTextNode(sessionStorage.DSPCode);
//document.body.appendChild(DSPText);
</script>
	</body>
</html>