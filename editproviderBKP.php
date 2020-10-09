<!DOCserviceName html>
<html lang="en">
<head>
    <meta http-equiv="content-serviceName" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Update Your Agency Information</title>
    <script src="globals.js"></script>
    <script src="statemap.js"></script>
    <script src="mainmapdata.js?v=2.8.2018-1"></script>
    <script type='text/javascript'>	
	   var coverageMap=simplemaps_statemap.create();
    </script>
    <script src="languagemapdata.js"></script>
    <script type='text/javascript'>	
	   var languageMap=simplemaps_statemap.create();
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3syaKZAxQ_ku0EsmiaLtFwhZMqAUJP8s"></script>
    <link rel="stylesheet" type="text/css" href="pdstyle.css">
</head>
<body onload="checkProviderNode()">
<script>
//for css tabs.
var acc = document.getElementsByClassName("accordion");
var i;
//---SET THE MAPS---
//set colors back to plain
coverageMap.mapdata.regions["0"].color = "default";
coverageMap.mapdata.regions["1"].color = "default";
coverageMap.mapdata.regions["2"].color = "default";
coverageMap.mapdata.regions["3"].color = "default";
coverageMap.mapdata.regions["4"].color = "default";
languageMap.mapdata.regions["0"].color = "default";
languageMap.mapdata.regions["1"].color = "default";
languageMap.mapdata.regions["2"].color = "default";
languageMap.mapdata.regions["3"].color = "default";
languageMap.mapdata.regions["4"].color = "default";
    
//add toggle urls
for (i=0;i<allFips.length;i++){
    coverageMap.mapdata.state_specific[allFips[i]].url = "javascript:toggleTravel("+allFips[i]+")";
    coverageMap.mapdata.state_specific[allFips[i]].color = "default";
    languageMap.mapdata.state_specific[allFips[i]].url = "javascript:toggleLanguage("+allFips[i]+")";
    languageMap.mapdata.state_specific[allFips[i]].color = "default";
}
//---GLOBAL VARIABLES FOR THIS PAGE---
var provider;
var pID;
var thisXML = dspsXML; 
    
//approved service names for drop-down selection
var approvedServiceNames = ["Casey Life Skills / Mentoring",
                            "Gang Intervention",
                            "GPS / EM",
                            "Home-Based Service / Intensive In-Home",
                            "HFW Intensive Care Coordination",
                            "Family Partnership Meeting",
                            "Family Support Partner",
                            "Functional Family Therapy (FFT)",
                            "Groups",
                            "Multisystemic Therapy (MST)",
                            "Other Assessment / Evaluation",
                            "Psychological",
                            "Psycho-Sexual Evaluation",
                            "Outpatient Services",
                            "Outpatient Substance Abuse",
                            "Outpatient YSB Services (CSOTP)",
                            "Therapuetic Day Treatment (TDT)",
                            "Trauma Assessment",
                            "Trauma-Focused Cognitive Behavioral Therapy (TF-CBT)",
                            "Vocational / Employment Service",
                            "Residential Services",
                            "Residential Services (18+)",
                            "Residential Independent Living",
                            "Treatment Foster Care",
                            "Translation / Interpretation"];
approvedServiceNames.sort();
//List of providers from data file for provider select drop down box.
var providers = dspsXML.getElementsByTagName("Provider");
//sort them and keep ID with name
var sortedProviders = [];
for (i=0;i<providers.length;i++){
    var providerName = providers.item(i).getElementsByTagName("Name");
    var providerID = providers.item(i).getAttribute("id");
    sortedProviders.push(providerName.item(0).textContent +"!"+providerID);
}
//alphabetize
sortedProviders.sort(); 
    
//Counters
var officeCount = 0; //start at 0 to play nice with index
var serviceCount = 0;
var DSPCodeToken = 0;
   
//functions
function checkProviderNode() {
//sets the provider node and ID based on whether this page is first-run, or if it is returned from the preview page. 
    if (sessionStorage.DSPCode){
        var parser = new DOMParser();
        thisXML = parser.parseFromString(sessionStorage.DSPCode,"text/xml");
        pID = thisXML.getElementsByTagName("Provider").item(0).getAttribute("id");
        provider = thisXML.getElementById(pID);
        document.getElementById("ProviderSelect").value = pID;  
        //alert("here");
        loadDSP();
        document.getElementById("defaultOpen").click();
        DSPCodeToken = 1;
        document.getElementById("submitter").value = sessionStorage.submitterName;
        document.getElementById("submitterEmail").value = sessionStorage.submitterEmail;
    }
}
function sortNumber(a,b) {
    return a - b;
}
function clearTxt(x){
    document.getElementsByName(x)[0].value = "";
}
function clearAll(){
    //var pID = document.getElementsByName("DSPID")[0].value;
    //var provider = dspsXML.getElementById(pID);   
    //setProviderNode();
    var mapLayer = document.getElementById("serviceDropDown").selectedIndex;
    var service = provider.getElementsByTagName("Service");
    var locations = service.item(mapLayer).getElementsByTagName("FIPs");
    //var locationNode = serviceGroups.item(mapLayer).firstChild;
    //var serviceFips = locations.item(0).childNodes;
    //change the display map
    for (var i=0;i<allFips.length;i++){
        coverageMap.mapdata.state_specific[allFips[i]].color = "default";
        coverageMap.mapdata.state_specific[allFips[i]].hover_color = "default";
    }
    //remove from provider
    while (locations.length > 0){
        locations.item(0).parentNode.removeChild(locations.item(0));
    }
    coverageMap.refresh();
}
function allGreen(){
    clearAll();
    //var pID = document.getElementsByName("DSPID")[0].value;
    //var provider = dspsXML.getElementById(pID);
    var mapLayer = document.getElementById("serviceDropDown").selectedIndex;
    var service = provider.getElementsByTagName("Service");
    var locations = service.item(mapLayer).getElementsByTagName("FIPs");
    //change the display map
    for (var i=0;i<allFips.length;i++){
        coverageMap.mapdata.state_specific[allFips[i]].color = RegColor;
        coverageMap.mapdata.state_specific[allFips[i]].hover_color = RegColor;
        var newFIPs = dspsXML.createElement("FIPs");
        newFIPs.setAttribute("travelReq","N");
        newFIPs.innerHTML = allFips[i];
        service.item(mapLayer).appendChild(newFIPs);  
    }
    coverageMap.refresh();
}
function allLtGreen(){
    clearAll();
    //var pID = document.getElementsByName("DSPID")[0].value;
    //var provider = dspsXML.getElementById(pID);    
    var mapLayer = document.getElementById("serviceDropDown").selectedIndex;
    var service = provider.getElementsByTagName("Service");
    var locations = service.item(mapLayer).getElementsByTagName("FIPs");
    for (var i=0;i<allFips.length;i++){
        //this means it is already in there and the attribute needs to be changed to Y
        //cycle through the locations to find the clicked FIPS
        coverageMap.mapdata.state_specific[allFips[i]].color = TravelColor;
        coverageMap.mapdata.state_specific[allFips[i]].hover_color = TravelColor;
        //Then there is no entry for the FIPs, create a node.
        var newFIPs = dspsXML.createElement("FIPs");
        newFIPs.setAttribute("travelReq","Y");
        newFIPs.innerHTML = allFips[i];
        service.item(mapLayer).appendChild(newFIPs);  
    }
    coverageMap.refresh();
}
function changeService(serviceNum){
    //update the DOM
    //var pID = document.getElementsByName("DSPID")[0].value;
    //var provider = dspsXML.getElementById(pID);    
    var sel = document.getElementById("providerMap");
    var mapNum = sel.value;
    var serviceMenus = provider.getElementsByTagName("ServiceMenu");
    var serviceItem = serviceMenus.item(mapNum).getElementsByTagName("ServiceItem");
    serviceItem.item(serviceNum).textContent = document.getElementsByName("serviceDropDown")[serviceNum].value;
}
function nextAvailableID (){
    var currentProviders = dspsXML.getElementsByTagName("Provider");
    var providerCount = currentProviders.length;
    var firstEmpty = -1;
    var orderedId = [];
    for (var i=0;i<providerCount;i++){
        var idNum = Number(currentProviders.item(i).getAttribute("id"))
        orderedId.push(idNum);
    }
    orderedId.sort(sortNumber);
    for (var i=0; i<orderedId.length; i++){
        if (orderedId[i] != i.toString() && firstEmpty == -1){
            firstEmpty = i;
        }
    }
    if (firstEmpty == -1){
        firstEmpty = providerCount+1;
    }
    return firstEmpty;
}
function createDSP(){
    pID = nextAvailableID();
    document.getElementsByName("DSPID")[0].value = pID;
    var providerPlacement = dspsXML.getElementsByTagName("DSPs");
    //build a new Provider element
    var newDSP = dspsXML.createElement("Provider");
    newDSP.setAttribute("id",nextAvailableID());
    //first children elements
    var nName = dspsXML.createElement("Name");
    var nUpdate = dspsXML.createElement("LastUpdated");
    var nMapZoom = dspsXML.createElement("MapZoom");
    var nWebsite = dspsXML.createElement("Website");
    var nContactName = dspsXML.createElement("ContactName");
    var nContactEmail = dspsXML.createElement("ContactEmail");
    //var nOffices = dspsXML.createElement("Offices");
    //2nd layer children
    var nOffice = dspsXML.createElement("Office");
    //office elements
    var nLat = dspsXML.createElement("Lat");
    var nLng = dspsXML.createElement("Lng");
    var nStreet = dspsXML.createElement("Street");
    var nCity = dspsXML.createElement("City");
    var nState = dspsXML.createElement("State");
    var nZip = dspsXML.createElement("Zip");
    var nPhone = dspsXML.createElement("Phone");
    var nFax = dspsXML.createElement("Fax");
    //make a map
    //var nService = dspsXML.createElement("Service");
    //build the office element.
    nOffice.appendChild(nLat);
    nOffice.appendChild(nLng);
    nOffice.appendChild(nStreet);
    nOffice.appendChild(nCity);
    nOffice.appendChild(nState);
    nOffice.appendChild(nZip);
    nOffice.appendChild(nPhone);
    nOffice.appendChild(nFax);
    newDSP.appendChild(nName);
    newDSP.appendChild(nUpdate);
    newDSP.appendChild(nMapZoom);
    newDSP.appendChild(nWebsite);
    newDSP.appendChild(nContactName);
    newDSP.appendChild(nContactEmail);
    newDSP.appendChild(nOffice);
    //newDSP.appendChild(nService);
    //put it in the DOM
    providerPlacement.item(0).appendChild(newDSP);
    //alert("here  "+newDSP);
    provider = dspsXML.getElementById(pID);
}
function loadDSP(){
    officeCount = 0;
    if (document.getElementById("ProviderSelect").value == "newDSP"){
        createDSP();
        var x = document.getElementById('container');
        x.style.visibility = 'visible';
        //document.getElementById("defaultOpen").click();
        return;
    }
    if (!sessionStorage.DSPCode){
        pID = document.getElementById("ProviderSelect").value;
        provider = dspsXML.getElementById(pID); 
    }
    document.getElementById("DSPServiceGroup").innerHTML = ""; 
    document.getElementById("lastUpdateDiv").innerHTML = provider.getElementsByTagName("LastUpdated").item(0).textContent;
    document.getElementsByName("DSPID")[0].value = pID;
    document.getElementsByName("DSPName")[0].value = provider.getElementsByTagName("Name").item(0).textContent;
    document.getElementsByName("DefaultZoom")[0].value = provider.getElementsByTagName("MapZoom").item(0).textContent;
    document.getElementsByName("DSPWeb")[0].value = provider.getElementsByTagName("Website").item(0).textContent;
    document.getElementsByName("DSPContactName")[0].value = provider.getElementsByTagName("ContactName").item(0).textContent;
    document.getElementsByName("DSPContactEmail")[0].value = provider.getElementsByTagName("ContactEmail").item(0).textContent;
    document.getElementsByName("Lat")[0].value = provider.getElementsByTagName("Lat").item(0).textContent;
    document.getElementsByName("Lng")[0].value = provider.getElementsByTagName("Lng").item(0).textContent;
    document.getElementsByName("Street")[0].value = provider.getElementsByTagName("Street").item(0).textContent;
    document.getElementsByName("City")[0].value = provider.getElementsByTagName("City").item(0).textContent;
    document.getElementsByName("State")[0].value = provider.getElementsByTagName("State").item(0).textContent;
    document.getElementsByName("Zip")[0].value = provider.getElementsByTagName("Zip").item(0).textContent;
    document.getElementsByName("Phone")[0].value = provider.getElementsByTagName("Phone").item(0).textContent;
    document.getElementsByName("Fax")[0].value = provider.getElementsByTagName("Fax").item(0).textContent;
    //check for additional offices.
    var DSPOffices = provider.getElementsByTagName("Office");
    //alert("DSPOffices length "+DSPOffices.length);
    if (DSPOffices.length > 1){
        document.getElementById("DSPMoreOffices").innerHTML = "<hr><h3><u>Additional Offices:</u></h3>";
        //load the extra office
        for (i=1;i<DSPOffices.length;i++){
            addOffice();
        }
    }
    var DSPServiceGroups = provider.getElementsByTagName("Service");
    var x = document.getElementById('container');
    x.style.visibility = 'visible';
    //selectServiceGroup();
    loadServices();
    loadDSPMap(coverageMap);
    document.getElementById("defaultOpen").click();
}
function loadServices(){
    document.getElementById("ServiceList").innerHTML = "";
    //var pID = document.getElementsByName("DSPID")[0].value;
    //var provider = dspsXML.getElementById(pID);   
    var providerServices = provider.getElementsByTagName("Service");
    //alert("Service length is "+providerServices.length+" attribute is "+providerServices.item(0).getAttribute("serviceName"));
    var serviceListingTxt = "Editing the map for service: "
    serviceListingTxt += "<select id='serviceDropDown' onchange='loadDSPMap(coverageMap)'>";
    //serviceListingTxt += "<option value='NONE'>PLEASE SELECT</option>";
    for (var i=0;i<providerServices.length;i++){
        serviceListingTxt +="<option value='"+providerServices.item(i).getAttribute("serviceName")+"'";
        serviceListingTxt += ">"+providerServices.item(i).getAttribute("serviceName")+"</option>";
    }
    serviceListingTxt += "</select>";
    serviceListingTxt += "<button serviceName='button' style='background-color:lightblue' onclick='deleteService()'>DELETE THIS SERVICE</button>";
    serviceCount++;
    var newService = document.createElement("div");
    newService.setAttribute("name","serviceListItem");
    newService.innerHTML = serviceListingTxt;
    //document.getElementById("ServiceList").appendChild(newService);
    document.getElementById("ServiceList").innerHTML = serviceListingTxt;
}
function selectServiceGroup(){
    document.getElementById("DSPServiceGroup").innerHTML = "";
    //var pID = document.getElementsByName("DSPID")[0].value;
    //var provider = dspsXML.getElementById(pID);   
    //var providerMaps = provider.getElementsByTagName("Service");
    var serviceGroupsTxt = "";
    serviceGroupsTxt += "<br><u>Select Provider's Map to Edit (one at a time)</u><br>";
    serviceGroupsTxt += "Map:<select id='providerMap' onchange='loadDSPMap(coverageMap)'>;"
    for (var j=0;j<(providerMaps.length - 1);j++){
        serviceGroupsTxt +="<option value='"+j+"'>"+providerMaps.item(j).getAttribute("serviceName")+"</option>";   
    }
    serviceGroupsTxt +="<option value='"+j+"' selected>"+providerMaps.item(j).getAttribute("serviceName")+"</option>";
    serviceGroupsTxt += "</select>";
    //add zoom options
    serviceGroupsTxt += 'Service Zoom:<select id="ServiceMapZoom">';
    serviceGroupsTxt += '<option value="-1" selected>Entire State</option>';
    serviceGroupsTxt += '<option value="0">Northern Region</option>';
    serviceGroupsTxt += '<option value="1">Central Region</option>';
    serviceGroupsTxt += '<option value="2">Western Region</option>';
    serviceGroupsTxt += '<option value="-1">-</option>';
        for (i=0;i<allFips.length;i++){
            serviceGroupsTxt += "<option value='"+allFips[i]+"'>"+coverageMap.mapdata.state_specific[allFips[i]].name+"</option>";   
        }
    serviceGroupsTxt += '</select>';
    serviceGroupsTxt += "Rename this map to:<input serviceName='text' id='MapRename' size=50>";
    serviceGroupsTxt += '<button serviceName="button" id="renameMapButton" style="background-color:lightblue" onClick="renameMap()">Rename MAP</button>';
    serviceGroupsTxt += '<br><button serviceName="button" id="deleteMapButton" style="background-color:lightblue" onClick="deleteMap()">DELETE THIS MAP</button>';
    serviceGroupsTxt += "<br>Add a map called:<input serviceName='text' id='MapName' size=50>";
    serviceGroupsTxt += '  With Service Zoom:<select id="NewServiceMapZoom">';
    serviceGroupsTxt += '<option value="-1" selected>Entire State</option>';
    serviceGroupsTxt += '<option value="0">Northern Region</option>';
    serviceGroupsTxt += '<option value="1">Central Region</option>';
    serviceGroupsTxt += '<option value="2">Western Region</option>';
    serviceGroupsTxt += '<option value="-1">-</option>';
        for (i=0;i<allFips.length;i++){
            serviceGroupsTxt += "<option value='"+allFips[i]+"'>"+coverageMap.mapdata.state_specific[allFips[i]].name+"</option>";   
        }
    serviceGroupsTxt += '</select>';
    serviceGroupsTxt += '<button serviceName="button" id="addMapButton" style="background-color:lightblue" onClick="addMap()">ADD MAP</button>';
    var selectMap = document.createElement("div");
    selectMap.innerHTML = serviceGroupsTxt;
    document.getElementById("DSPServiceGroup").appendChild(selectMap);
}
function deleteMap(){
    var sel = document.getElementById("providerMap");
    var mapNum = sel.value;
    //var pID = document.getElementsByName("DSPID")[0].value;
    //var provider = dspsXML.getElementById(pID);   
    var providerMaps = provider.getElementsByTagName("Service");
    if (providerMaps.length <= 1){
        alert("YOU CANNOT DELETE THIS MAP\r At least one map is required!");
        return;
    } else {
        if (confirm("Are you sure? This cannot be undone. Serivces associated with this map will also be lost. Consider adding them to another map. If you make a mistake - CHANGES WILL NOT BE SAVED UNTIL YOU CLICK SAVE THESE CHANGES AT THE BOTTOM")){
            providerMaps.item(mapNum).parentNode.removeChild(providerMaps.item(mapNum));
            selectServiceGroup();
            loadDSPMap(coverageMap); 
            return;   
        }
    }
}
function renameMap(){
    var sel = document.getElementById("providerMap");
    var mapNum = sel.value;
    var mapSelection = sel.options[sel.selectedIndex].text;
    //var pID = document.getElementById("ProviderSelect").value;
    //var provider = dspsXML.getElementById(pID);    
    var providerMaps = provider.getElementsByTagName("Service");
    providerMaps.item(mapNum).setAttribute("serviceName",document.getElementById("MapRename").value);
    selectServiceGroup();
    document.getElementById("providerMap").value = mapNum;
    loadDSPMap(coverageMap);
}
function addMap(){
    //add it to the DOM
    var newMap = dspsXML.createElement("Service");
    newMap.setAttribute("serviceName",document.getElementById("MapName").value);
    newMap.setAttribute("serviceZoom",document.getElementById("NewServiceMapZoom").value);
    var newMapLTag = dspsXML.createElement("Locations");
    newMap.appendChild(newMapLTag);
    var newMapMTag = dspsXML.createElement("ServiceMenu");
    newMap.appendChild(newMapMTag);
    //var pID = document.getElementById("ProviderSelect").value;
    //var provider = dspsXML.getElementById(pID);    
    provider.appendChild(newMap);
    //now add it to the drop down list
    var newMapSelect = document.createElement("option");
    newMapSelect.setAttribute("value",Object.keys(providerMap).length);
    newMapSelect.setAttribute("selected","yes");
    newMapSelect.innerHTML = document.getElementById("MapName").value;
    document.getElementById("providerMap").appendChild(newMapSelect);
    document.getElementById("MapName").value = "";
    var mapNum = provider.getElementsByTagName("Service");
    sel = document.getElementById("providerMap");//.value = mapNum.length-1;
    sel.selectedIndex = mapNum.length - 1;
    selectServiceGroup();
    loadDSPMap(coverageMap);
}
function deleteService(){
    //remove from form
    //document.getElementsByName("serviceListItem")[serviceNum].innerHTML="";
    //remove from dropdown list
    //remove from DOM
    var sel = document.getElementById("serviceDropDown");
    var serviceNum = sel.selectedIndex;
    //alert ("index is "+ sel.selectedIndex);
    //var pID = document.getElementsByName("DSPID")[0].value;
    //var provider = dspsXML.getElementById(pID);   
    //var providerMaps = provider.getElementsByTagName("Service");
    var providerServices = provider.getElementsByTagName("Service");
    providerServices.item(serviceNum).parentNode.removeChild(providerServices.item(serviceNum));
    //serviceCount--;
    //repopulate the service dropdown
    loadServices();
    
}
function createServiceDropDowns(){
    serviceCount = 0;
    var mapLayer = document.getElementById("providerMap").value;
    //var pID = document.getElementsByName("DSPID")[0].value;
    //var provider = dspsXML.getElementById(pID);   
    var serviceMenus = provider.getElementsByTagName("ServiceMenu");
    //catch error if it's an empty map
    try {
        var serviceMapZoom = serviceMenus.item(mapLayer).parentElement.getAttribute("serviceZoom");
        document.getElementById("ServiceMapZoom").value = serviceMapZoom;
        var serviceItems = serviceMenus.item(mapLayer).children;
        var serviceListingTxt = "";
        serviceListingTxt += "<br><u>These Services are available per the map above:</u><br>";
        serviceListingTxt += "<i>toggle the selection to change service name, click button to delete</i><br>";
        var providerServices = [];
        var serviceCheck = dspsXML.getElementsByTagName("ServiceItem");
        for (var i=0;i<approvedServiceNames.length;i++){
            providerServices.push(approvedServiceNames.item(i).textContent);
        }
        providerServices = removeDuplicates(providerServices);
        providerServices.sort(); //for services.html the array index will be the service id.
        for (var i=0;i<serviceItems.length;i++){
            serviceListingTxt += "<div name='serviceListItem'>";
            serviceListingTxt += "<select name='serviceDropDown' onchange='changeService("+serviceCount+")'>";
            for (var j=0;j<providerServices.length;j++){
                serviceListingTxt +="<option value='"+providerServices[j]+"'>"+providerServices[j]+"</option>";
            }
            serviceListingTxt += "</select>";
            serviceListingTxt += "<button serviceName='button' style='background-color:lightblue'  onclick='deleteService()'>DELETE THIS SERVICE</button>";
            serviceListingTxt += "</div>";
            serviceCount++;
        }
        document.getElementById("ServiceList").innerHTML = serviceListingTxt;
        fillServiceDropDowns();
    }
    catch(err) {
        return;
    }
}
function fillServiceDropDowns(){
    var mapLayer = document.getElementById("providerMap").value;
    //var pID = document.getElementsByName("DSPID")[0].value;
    //var provider = dspsXML.getElementById(pID);   
    var serviceMenus = provider.getElementsByTagName("ServiceMenu");
    var serviceItems = serviceMenus.item(mapLayer).children;
    var serviceListingTxt = "";
    var serviceCheck = dspsXML.getElementsByTagName("ServiceItem");
    for (var i=0;i<serviceItems.length;i++){
        document.getElementsByName("serviceDropDown")[i].value = serviceItems.item(i).textContent;
    }
}
function copyService(){
    var newServiceName = document.getElementById("serviceDropDown").value;
    //alert("newServiceName is "+newServiceName);
    var copyFromServiceIndex = document.getElementById("copyServiceList").selectedIndex;
    //alert("copyFromServiceIndex is "+copyFromServiceIndex);
    //var pID = document.getElementsByName("DSPID")[0].value;
    //var provider = dspsXML.getElementById(pID);   
    var services = provider.getElementsByTagName("Service");
    var copyFromService = services.item(copyFromServiceIndex);
    //alert("copyfromservice is "+copyFromService.innerHTML);
    var newService = copyFromService.cloneNode(true);
    newService.setAttribute("serviceName",newServiceName);
    var copyToService = services.item(document.getElementById("serviceDropDown").selectedIndex);
    //alert("copytoService name is "+copyToService.getAttribute("serviceName"));
    provider.replaceChild(newService,copyToService);
    //
    //provider.appendChild(newService);
    loadDSPMap(coverageMap);
    //alert(serviceIndex);
}
function addService(){
    var serviceSelected = document.getElementById("newServiceDropDown").value;
    var serviceZoomSelected = document.getElementById("NewServiceMapZoom").value;
    //Add to the DOM
    //var mapLayer = document.getElementById("providerMap").value;
    //var pID = document.getElementById("ProviderSelect").value;
        //var pID = document.getElementById("ProviderSelect").value;
        //var provider = dspsXML.getElementById(pID);    
    //var pID = document.getElementsByName("DSPID")[0].value;
    //var provider = dspsXML.getElementById(pID);
    //var serviceMenus = provider.getElementsByTagName("ServiceMenu");
    //var serviceItems = serviceMenus.item(mapLayer).children;
    var newService = dspsXML.createElement("Service");
    newService.setAttribute("serviceName",serviceSelected);
    newService.setAttribute("serviceZoom",serviceZoomSelected);
    //serviceMenus.item(mapLayer).appendChild(newServiceXML);
    provider.appendChild(newService);
    var providerServices = provider.getElementsByTagName("Service");
    //alert("Service length is "+providerServices.length+" attribute is "+providerServices.item(0).getAttribute("serviceName"));
    var serviceListingTxt = "Editing the map for service: "
    serviceListingTxt += "<select id='serviceDropDown' onchange='loadDSPMap(coverageMap)'>";
    //serviceListingTxt += "<option value='NONE'>PLEASE SELECT</option>";
    for (var i=0;i<providerServices.length;i++){
        serviceListingTxt +="<option value='"+providerServices.item(i).getAttribute("serviceName")+"'";
        if (serviceSelected == providerServices.item(i).getAttribute("serviceName")){
            serviceListingTxt += ' selected';
        }
        serviceListingTxt += ">"+providerServices.item(i).getAttribute("serviceName")+"</option>";
    }
    serviceListingTxt += "</select>";
    serviceListingTxt += "<button serviceName='button' style='background-color:lightblue' onclick='deleteService()'>DELETE THIS SERVICE</button>";
    serviceCount++;
    var newService = document.createElement("div");
    newService.setAttribute("name","serviceListItem");
    newService.innerHTML = serviceListingTxt;
    //document.getElementById("ServiceList").appendChild(newService);
    document.getElementById("ServiceList").innerHTML = serviceListingTxt;
    loadDSPMap(coverageMap);
    coverageMap.refresh();
    document.getElementById("defaultOpen").click();
}
function deleteOffice(officeID){
    if (confirm("ARE YOU SURE? This DSP's Additional Office will be deleted. Note: there is no undo button, HOWEVER changes to this DSP will not be saved until you select save button at the bottom of the form.")){
        document.getElementById("office"+officeID).innerHTML = "";
        officeCount--;
    }
}
function geoOffice(officeNum){
    var officeAddress = "";
    officeAddress += document.getElementsByName("Street")[officeNum].value;
    officeAddress += " ";
    officeAddress += document.getElementsByName("City")[officeNum].value;
    officeAddress += ", ";
    officeAddress += document.getElementsByName("State")[officeNum].value;
    officeAddress += " ";
    officeAddress += document.getElementsByName("Zip")[officeNum].value;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': officeAddress}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        document.getElementsByName("Lat")[officeNum].value = results[0].geometry.location.lat();
        document.getElementsByName("Lng")[officeNum].value = results[0].geometry.location.lng();
        } 
    });
    //add it to the map below
    //Skip location dots (won't be able to select counties appropriately)
    /*
    coverageMap.mapdata.locations[officeNum] = {
            lat: document.getElementsByName("Lat")[officeNum].value,
            lng: document.getElementsByName("Lng")[officeNum].value,
            name: document.getElementsByName("DSPName")[0].value,
            color: "default",
            description: document.getElementsByName("Street")[officeNum].value + "<br>" + document.getElementsByName("City")[officeNum].value + ", " + document.getElementsByName("State")[officeNum].value + " " + document.getElementsByName("Zip")[officeNum].value + "<br>" + document.getElementsByName("Phone")[officeNum].value,
            url: "",
            size: "default",
            serviceName: "default",
            image_url: "default",
            opacity: "default"
        }
    */
    //alert(coverageMap.mapdata.locations[officeNum].lat);
    //simplemaps_statemap.refresh();
}
function addOffice(){
    officeCount++;
    //var pID = document.getElementById("ProviderSelect").value;
    //var provider = dspsXML.getElementById(pID);    
    var extraOffices = "";
    extraOffices += "<br><u>Additional Office #"+officeCount+":</u>";
    extraOffices += "<button serviceName='button' style='background-color:lightblue' onclick='deleteOffice("+officeCount+")'>DELETE THIS OFFICE</button><br>";
    extraOffices += "Latitude:<input serviceName='text' name='Lat' size=7>";
    extraOffices += "Longitude:<input serviceName='text' name='Lng' size=7><button serviceName='button' style='background-color:lightblue' onclick='geoOffice("+officeCount+")'>GEOTAG</button><br>";
    extraOffices += "Street:<input serviceName='text' name='Street' size=50><br>";
    extraOffices += "City:<input serviceName='text' name='City'><br>";
    extraOffices += "State:<input serviceName='text' name='State'><br>";
    extraOffices += "Zip:<input serviceName='text' name='Zip'><br>";
    extraOffices += "Phone:<input serviceName='text' name='Phone'><br>";
    extraOffices += "Fax:<input serviceName='text' name='Fax'>";
    var newOffice = document.createElement("div");
    newOffice.setAttribute("id","office"+officeCount);
    newOffice.innerHTML = extraOffices;
    document.getElementById("DSPMoreOffices").appendChild(newOffice);
    //alert("office count is "+officeCount);
    if (document.getElementById("ProviderSelect").value != "newDSP"){
        document.getElementsByName("Lat")[officeCount].value = provider.getElementsByTagName("Lat").item(officeCount).textContent;
        document.getElementsByName("Lng")[officeCount].value = provider.getElementsByTagName("Lng").item(officeCount).textContent;
        document.getElementsByName("Street")[officeCount].value = provider.getElementsByTagName("Street").item(officeCount).textContent;
        document.getElementsByName("City")[officeCount].value = provider.getElementsByTagName("City")   .item(officeCount).textContent;
        document.getElementsByName("State")[officeCount].value = provider.getElementsByTagName("State").item(officeCount).textContent;
        document.getElementsByName("Zip")[officeCount].value = provider.getElementsByTagName("Zip").item(officeCount).textContent;
        document.getElementsByName("Phone")[officeCount].value = provider.getElementsByTagName("Phone").item(officeCount).textContent;
        document.getElementsByName("Fax")[officeCount].value = provider.getElementsByTagName("Fax").item(officeCount).textContent;
    }
}
function toggleLanguage(fips){
    //cycle through
    //alert("in toggleLanguage");
    //var pID = document.getElementsByName("DSPID")[0].value;
    //var provider = dspsXML.getElementById(pID);   
    var serviceMapNum = document.getElementById("serviceDropDown").selectedIndex;//was mapLayer
    //alert("serviceMapNum is "+serviceMapNum);
    var services = provider.getElementsByTagName("Service");//was serviceGroups
    var locations = services.item(serviceMapNum).children;
    var locationNode = services.item(mapLayer).firstChild;
    var newLanguages = document.getElementById("languageInput").value;
    //var serviceFips = locations.item(0).childNodes;
    if (languageMap.mapdata.state_specific[fips].color == "default"){
        //Then there is no entry for the FIPs, create a node, notify user
        alert("You must mark this as a coverage area first");
    } else {
        //Paste language info from input
        //update the map
        languageMap.mapdata.state_specific[fips].description = "Availailbe in "+newLanguages;
        //update the dom
        for (var i=0;i<locations.length;i++){
            if (locations.item(i).textContent == fips){
                locations.item(i).setAttribute("languages",newLanguages);
            }
        }
        //if language data exists erase it.
    
    }
    languageMap.refresh_state(fips);    
}
function toggleTravel(fips){
    //cycle through
    //var pID = document.getElementsByName("DSPID")[0].value;
    //var provider = dspsXML.getElementById(pID);  
    var serviceMapNum = document.getElementById("serviceDropDown").selectedIndex;//was mapLayer
    var services = provider.getElementsByTagName("Service");//was serviceGroups
    var locations = services.item(serviceMapNum).children;
    var locationNode = services.item(mapLayer).firstChild;
    //var serviceFips = locations.item(0).childNodes;
    if (coverageMap.mapdata.state_specific[fips].color == "default"){
        //change the display map
        coverageMap.mapdata.state_specific[fips].color = RegColor;
        coverageMap.mapdata.state_specific[fips].hover_color = RegColor;
        //Then there is no entry for the FIPs, create a node.
        var newFIPs = dspsXML.createElement("FIPs");
        newFIPs.setAttribute("travelReq","N");
        newFIPs.textContent = fips;
        services.item(serviceMapNum).appendChild(newFIPs);//was locations.item(0).appendChild(newFIPs);
    } else if (coverageMap.mapdata.state_specific[fips].color == RegColor){
        //change the display map
        coverageMap.mapdata.state_specific[fips].color = TravelColor;
        coverageMap.mapdata.state_specific[fips].hover_color = TravelColor;
        //this means it is already in there and the attribute needs to be changed to Y
        //cycle through the locations to find the clicked FIPS
        //alert("locations(length) is "+locations.length);
        for (var i=0;i<locations.length;i++){
            if (locations.item(i).textContent == fips){
                locations.item(i).setAttribute("travelReq","Y");
            }
        }
    } else if (coverageMap.mapdata.state_specific[fips].color == TravelColor){
        //change the display map
        coverageMap.mapdata.state_specific[fips].color = "default";
        coverageMap.mapdata.state_specific[fips].hover_color = "default";
        //remove it from the DOM
        for (var i=0;i<locations.length;i++){
            if (locations.item(i).textContent == fips){
                locations.item(i).parentNode.removeChild(locations.item(i));
            }
        }
    }
    coverageMap.refresh_state(fips);
}
/*
function loadDSPMap(){
    //var mapLayer = document.getElementById("providerMap").value;
    var sel = document.getElementById("serviceDropDown");
    var mapLayer = sel.selectedIndex;
    //alert ("mapLayer is "+mapLayer);
    var pID = document.getElementsByName("DSPID")[0].value;
    var provider = dspsXML.getElementById(pID);
    var providerName = provider.getElementsByTagName("Name");
    var providerWebsite = provider.getElementsByTagName("Website");
    var providerContact = provider.getElementsByTagName("ContactName");
    var providerEmail = provider.getElementsByTagName("ContactEmail");
    var mapZoom = provider.getElementsByTagName("MapZoom");
    var officeCount = provider.getElementsByTagName("Office").length;
    //Clear the map
    for (i=0;i<allFips.length;i++){
        coverageMap.mapdata.state_specific[allFips[i]].url = "javascript:toggleTravel("+allFips[i]+")";
        coverageMap.mapdata.state_specific[allFips[i]].color = "default";
        coverageMap.mapdata.state_specific[allFips[i]].hover_color = "default";
    }
    
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
    //SKIP LOCATIONS - CANNOT CLICK ON CORRECT COUNTIES
    /*
    var locationCounter = 0;
    //cycle through all locations
    for (i=0;i<officeCount;i++){
        //add the office data to a map location
        coverageMap.mapdata.locations[locationCounter] = {
            lat: officeLat[i].innerHTML,
            lng: officeLng[i].innerHTML,
            name: providerName[0].innerHTML,
            color: "default",
            description: officeStreet[i].innerHTML + "<br>" + officeCity[i].innerHTML + ", " + officeState[i].innerHTML + " " + officeZip[i].innerHTML + "<br>" + officePhone[i].innerHTML,
            url: "",
            size: "default",
            serviceName: "default",
            image_url: "default",
            opacity: "default"
        }
        //update counter so it doesn't overwrite a location
        locationCounter++;
    }//this was commented out -ended
    
    coverageMap.mapdata.main_settings.initial_zoom = mapZoom.item(0).textContent;
    var services = provider.getElementsByTagName("Service");    
    
    //if this is the landing page for the provider then show all-service coverage area
    if (mapLayer == "all"){ //show entire coverage area for landing page
        var serviceZoom = provider.getElementsByTagName("MapZoom");
        serviceZoom = serviceZoom.item(0).textContent;
        var locations = provider.getElementsByTagName("FIPs");
        var mapDescription = "Provider's Complete Coverage Area";
    } else { //this is for a specific map
        var serviceZoom = services.item(mapLayer).getAttribute("serviceZoom");
        var locations = services.item(mapLayer).getElementsByTagName("FIPs");
        var mapDescription = services.item(mapLayer).getAttribute("serviceName");
    }
    if (mapZoom.item(0).textContent > 51000){
        //empty the regions, and set focus on the service locality
        //this should apply when a provider serves a map in only one locality.
        coverageMap.mapdata.regions = {};
        //fill with focus CSU
        coverageMap.mapdata.regions[0] = {
            states: [mapZoom.item(0).textContent],
            name: ""
        };
        coverageMap.mapdata.main_settings.initial_zoom = 0;
    } else if (mapZoom.item(0).textContent < 5){
        coverageMap.mapdata.main_settings.initial_zoom = mapZoom.item(0).textContent;
    }
    
    //Change county colors based on key
    //set colors based on coverage
    //separate the loops to change all the travelRequired first, and then again to overwrite travel not required
    for (var i = 0; i < locations.length; i++){  
        if (locations.item(i).getAttribute("travelReq") == "Y"){
            coverageMap.mapdata.state_specific[locations.item(i).textContent].color = TravelColor;
            coverageMap.mapdata.state_specific[locations.item(i).textContent].hover_color = TravelColor;
        } 
    }
    //overwrite travel not required.
    for (var i = 0; i < locations.length; i++){
        if (locations.item(i).getAttribute("travelReq") == "N"){
            coverageMap.mapdata.state_specific[locations.item(i).textContent].color = RegColor;
            coverageMap.mapdata.state_specific[locations.item(i).textContent].hover_color = RegColor;
        }  
    }
    for (var i = 0; i < locations.length; i++){
        if (locations.item(i).getAttribute("languages")){
            //coverageMap.mapdata.state_specific[locations[i].textContent].border_color = LanguageColor;
            coverageMap.mapdata.state_specific[locations[i].textContent].description = "Available in "+locations.item(i).getAttribute("languages");
        }
    }
    //simplemaps_statemap.refresh();
    coverageMap.refresh();
    document.getElementById("defaultOpen").click();
    //createServiceDropDowns();
}*/
function loadDSPMap(whichMap){
    //var pID = document.getElementsByName("DSPID")[0].value;
    //var provider = dspsXML.getElementById(pID);   
    var sel = document.getElementById("serviceDropDown");
    var mapLayer = sel.selectedIndex;

    //Clear the map
    for (i=0;i<allFips.length;i++){
        //whichMap.mapdata.state_specific[allFips[i]].url = "javascript:toggleTravel("+allFips[i]+")";
        whichMap.mapdata.state_specific[allFips[i]].color = "default";
        whichMap.mapdata.state_specific[allFips[i]].hover_color = "default";
        whichMap.mapdata.state_specific[allFips[i]].description = "";
    }
    var services = provider.getElementsByTagName("Service");    
    var serviceZoom = services.item(mapLayer).getAttribute("serviceZoom");
    var locations = services.item(mapLayer).getElementsByTagName("FIPs");
    var mapDescription = services.item(mapLayer).getAttribute("serviceName");
    
    //Change county colors based on key
    //set colors based on coverage
    //separate the loops to change all the travelRequired first, and then again to overwrite travel not required
    for (var i = 0; i < locations.length; i++){  
        if (locations.item(i).getAttribute("travelReq") == "Y"){
            whichMap.mapdata.state_specific[locations.item(i).textContent].color = TravelColor;
            whichMap.mapdata.state_specific[locations.item(i).textContent].hover_color = TravelColor;
        } 
    }
    //overwrite travel not required.
    for (var i = 0; i < locations.length; i++){
        if (locations.item(i).getAttribute("travelReq") == "N"){
            whichMap.mapdata.state_specific[locations.item(i).textContent].color = RegColor;
            whichMap.mapdata.state_specific[locations.item(i).textContent].hover_color = RegColor;
        }  
    }
    for (var i = 0; i < locations.length; i++){
        if (locations.item(i).getAttribute("languages") && locations.item(i).getAttribute("languages") !=""){
            whichMap.mapdata.state_specific[locations[i].textContent].description = "Available in "+locations.item(i).getAttribute("languages");
        }
    }
    var x = document.getElementById("CopyFromDiv");
    x.style.display = "block";
    var copyServiceListSelect = document.getElementById("copyServiceList");
    var serviceDropDownSelect = document.getElementById("serviceDropDown");
    for (var i=0;i<serviceDropDownSelect.options.length;i++){
        if (i != serviceDropDownSelect.selectedIndex){
            copyServiceListSelect.options[i] = new Option(serviceDropDownSelect.options[i].textContent, serviceDropDownSelect.options[i].textContent);      
        }  
    }
    document.getElementById('mapTabs').style.visibility = "visible";
    if (!sessionStorage.DSPCode){
        whichMap.refresh();  
    } else if(DSPCodeToken){
        whichMap.refresh();    
    }  
    //createServiceDropDowns();
}
function createXML(){
    if (confirm("ARE YOU SURE? There is no undo")){
        fetchInputUpdates();
        var xmlString = "";
        xmlString += dspsDTD.responseText;
        xmlString += '\r]>\r';
        xmlString += '<DSPs>\r';
        var dspEntry = dspsXML.getElementsByTagName("DSPs");
        xmlString += dspEntry[0].innerHTML;
        xmlString += '\r</DSPs>';
        document.getElementsByName("xmlCode")[0].value = xmlString;
        document.getElementsByName("providerID")[0].value = document.getElementsByName("DSPID")[0].value;
    }
}
function fetchInputUpdates(){   
    var today = new Date();
    var updateYear = today.getFullYear();
    var updateMonth = today.getMonth()+1;
    var updateDay = today.getDate();
    //alert("updateMonth is "+updateMonth+" which is a "+typeof(updateMonth));
    var date = updateYear+"-";//+updateMonth+"-"+updateDay;//today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    if (updateMonth<10){
        date += "0"+updateMonth;
    } else {
        date += updateMonth;
    }
    date += "-";
    if (updateDay<10){
        date += "0"+updateDay;
    } else {
        date += updateDay;
    }
    provider.getElementsByTagName("LastUpdated").item(0).textContent = date;
    provider.getElementsByTagName("Name").item(0).textContent = document.getElementsByName("DSPName")[0].value;
    provider.getElementsByTagName("MapZoom").item(0).textContent = document.getElementsByName("DefaultZoom")[0].value;
    provider.getElementsByTagName("Website").item(0).textContent = document.getElementsByName("DSPWeb")[0].value;
    provider.getElementsByTagName("ContactName").item(0).textContent = document.getElementsByName("DSPContactName")[0].value;
    provider.getElementsByTagName("ContactEmail").item(0).textContent = document.getElementsByName("DSPContactEmail")[0].value;
    var currentOfficeNum = provider.getElementsByTagName("Office").length;
    //dump the current offices
    while (provider.getElementsByTagName("Office").length > 0){
        var removeOffice = provider.getElementsByTagName("Office");
        removeOffice.item(0).parentNode.removeChild(removeOffice.item(0));
    }
    //add offices from inputs
    for (var i=0; i<document.getElementsByName("Street").length;i++){
        //create office element
        var newOffice = dspsXML.createElement("Office");
        var newLat = dspsXML.createElement("Lat");
        var newLng = dspsXML.createElement("Lng");
        var newStreet = dspsXML.createElement("Street");
        var newCity = dspsXML.createElement("City");
        var newState = dspsXML.createElement("State");
        var newZip = dspsXML.createElement("Zip");
        var newPhone = dspsXML.createElement("Phone");
        var newFax = dspsXML.createElement("Fax");
        newLat.textContent = document.getElementsByName("Lat")[i].value;
        newLng.textContent = document.getElementsByName("Lng")[i].value;
        newStreet.textContent = document.getElementsByName("Street")[i].value;
        newCity.textContent = document.getElementsByName("City")[i].value;
        newState.textContent = document.getElementsByName("State")[i].value;
        newZip.textContent = document.getElementsByName("Zip")[i].value;
        newPhone.textContent = document.getElementsByName("Phone")[i].value;
        newFax.textContent = document.getElementsByName("Fax")[i].value;
        newOffice.appendChild(newLat);
        newOffice.appendChild(newLng);
        newOffice.appendChild(newStreet);
        newOffice.appendChild(newCity);
        newOffice.appendChild(newState);
        newOffice.appendChild(newZip);
        newOffice.appendChild(newPhone);
        newOffice.appendChild(newFax);
        var serviceNode = provider.getElementsByTagName("Service");
        provider.insertBefore(newOffice,serviceNode.item(0));
    }
}
function createDSPXML(){
    fetchInputUpdates();   
    var providerTxt = '<Provider id="'+pID+'">\r';
    providerTxt += provider.innerHTML;//LOOK HERE LATER
    providerTxt += '</Provider>';
    document.getElementsByName("DSPXMLCode")[0].value = providerTxt;
    document.getElementsByName("submitterName")[0].value = document.getElementById("submitter").value;
    document.getElementsByName("submitterE")[0].value = document.getElementById("submitterEmail").value;
    sessionStorage.setItem("DSPCode",providerTxt);
    sessionStorage.setItem("submitterName",document.getElementById("submitter").value);
    sessionStorage.setItem("submitterEmail",document.getElementById("submitterEmail").value);
}
function testCreateDSPXML(){
    fetchInputUpdates();
    //var pID = document.getElementsByName("DSPID")[0].value;
    //var provider = dspsXML.getElementById(pID);     
    var providerTxt = '<Provider id="'+pID+'">\r';
    providerTxt += provider.innerHTML;
    providerTxt += '</Provider>\r';
    alert(providerTxt);
}
</script>
<center><i>[beta version]<br>works best in Chrome Browser</i></center>
      <br><br><a href="mailto:jwalkley@ebanetwork.com?Subject=[SelfService Report]" target="_top">Please report any problems with this edit page.</a><br> And THANK YOU for testing it out!<br>It is our hope that accurate geographic service information will help CSUs and POs make better use of available services!<hr>
<h1>Update Your Agency Information</h1>
Use the form below to submit a request to change your agency's information which displays in the directory and map.<br>
A Regional Service Coordinator will confirm this change request with the agency contact person on file.<br><br>
<center><b>Please include <u>ALL</u> changes in a single submission.<br>That is, make changes to all maps, offices, services, etc.<br>The RSC will incorporate only the most recent change request, overwritting the prior information.</b></center>
<br><br>
Your Name:<input type="text" id="submitter" size=50><br>
Your Email:<input type="text" id="submitterEmail" size=50>
<hr>
<br>Select Your Agency:<br>
<select id="ProviderSelect" onchange="loadDSP()">
    <option value="none" selected>(please select)</option>
    <option value="newDSP">***WE ARE NEW***</option>
    <script>
        for (i=0;i<sortedProviders.length;i++){
            var providerInfo = sortedProviders[i].split("!");//providerInfo[0] is name [1] is ID  
            document.write("<option value='"+providerInfo[1]+"'>"+providerInfo[0]+"</option>");
        }
    </script>
</select>
<div id="container">
<div id="DSPInfo">
<div class='ebaBlue'><center><h2><u>Provider General Info</u></h2></center></div>
<button class="accordion">Click to Expand Instructions for this Section</button>
<div class="panel">
<p>This section includes agency-wide information.</p>
<p><b>Provider ID</b> is system generated and cannot be changed.</p>
<p><b>Default Map Zoom</b> is the locality or region the provider page will focus upon.</p>
</div>
<br>
    This Provider Was Last Updated: <b><div id="lastUpdateDiv"></div></b>
<br>
Provider ID:
<input serviceName="text" name="DSPID" value="" size=3 style="background-color : #d1d1d1;" readonly>
Agency Name:
<input serviceName="text" name="DSPName" value="" size=100>
<br>
Default Map Zoom: 
<select name="DefaultZoom">
    <option value="-1" selected>Entire State</option>
    <option value="0">Northern Region</option>
    <option value="1">Central Region</option>
    <option value="2">Western Region</option>
    <option value="-1">-</option>
    <script>
        for (i=0;i<allFips.length;i++){
            document.write("<option value='"+allFips[i]+"'>"+coverageMap.mapdata.state_specific[allFips[i]].name+"</option>");   
        }
    </script>
</select>
<br>
Website (do not include http://):
<input serviceName="text" name="DSPWeb" value="" size=100>
<br>
Contact Name:
<input serviceName="text" name="DSPContactName" value="" size=50>
Contact Email:
<input serviceName="text" name="DSPContactEmail" value="" size=50>

<hr>
<div id="DSPMainOffice">
<div class="ebaBlue"><center><h2><u>Provider Office Information</u></h2></center></div>
<button class="accordion">Click to Expand Instructions for this Section</button>
<div class="panel">
<p>This section collects information about each agency office. The first office listed as "Main Office" will display on the provider's directory page.</p>
<p>Fill in the Street, City, and State first, then click "GeoTag" to generate the latitude and longitude items. If this is not selected, the office will not display properly on the map.</p>
<p>A fax number is optional.</p>
<p>Click the <b>Add Office</b> button to add another office. These will display as blue dots on the main directory as well as the agency-specific listing page.</p>
</div>
<h3><font color='000000' size='4'><u>Main Office:</u></font></h3>

Latitude:
<input serviceName="text" name="Lat" size=7>
Longitude:
<input serviceName="text" name="Lng" size=7>
<button serviceName='button' style='background-color:lightblue' onclick='geoOffice("0")'>GEOTAG</button><br>
Street:
<input serviceName="text" name="Street" size=50>
<br>
City:
<input serviceName="text" name="City">
<br>
State:
<input serviceName="text" name="State">
<br>
Zip:
<input serviceName="text" name="Zip">
<br>
Phone:
<input serviceName="text" name="Phone">
<br>
Fax:
<input serviceName="text" name="Fax">

</div>
<div id="DSPMoreOffices"></div>
<center>
<button serviceName="button" id="addOfficeButton" style="background-color:lightblue" onClick="addOffice()">ADD OFFICE</button>
</center>     
<hr>
<div class="ebaBlue"><center><h2><u>Provider Services</u></h2></center></div>
<button class="accordion">Click to Expand Instructions for this Section</button>
<div class="panel">
    <p>If you are a new provider be sure to add a service first!</p>
    <p>Select a service from the drop down list and click "Add Service." This will add the service name to the map editor below.</p>
    <p><b>Service Zoom</b> is the locality or region the directory will focus upon when this service map is active.</p>
    <p>Please note that you must select a pre-defined service name. This will make searching easier in the directory.</p>
    <p>If you want to add a service that is not listed, contact EBA to determine the best-fit or to request the addition of a service name.</p>
</div>
<div id="DSPServiceGroup">
<div id='providerMap' hidden></div>
</div>
<br>Add Service:
<select id='newServiceDropDown'>
<option value='NONE'>PLEASE SELECT</option>
<script>
for (var j=0;j<approvedServiceNames.length;j++){
    document.write("<option value='"+approvedServiceNames[j]+"'>"+approvedServiceNames[j]+"</option>");
}   
</script>
</select>
Zoomed to: <select id="NewServiceMapZoom">
<option value="-1" selected>Entire State</option>
<option value="0">Northern Region</option>
<option value="1">Central Region</option>
<option value="2">Western Region</option>
<option value="-1">-</option>
<script>
for (i=0;i<allFips.length;i++){
    document.write("<option value='"+allFips[i]+"'>"+coverageMap.mapdata.state_specific[allFips[i]].name+"</option>");  
}
</script>
</select>
<button serviceName="button" id="addServiceButton" style="background-color:lightblue" onClick="addService()">ADD SERVICE</button>
<div class="ebaBlue"><center><h2><u>Provider Maps</u></h2></center></div>
<button class="accordion">Click to Expand Instructions for this Section</button>
<div class="panel">
    <p>The service that is in the drop down menu is the one being edited on the map below.</p>
    <p>You can switch between multiple maps without loosing any information.</p>
    <p>Click on a locality to toggle your service availability.</p>
    <p>The map zooms in based on region. To zoom out to the whole state, click the return arrow inside the map.</p>
    <p><b>Dark Green</b> means you regularly provide service there.</p>
    <p><b>Light Green</b> means you offer limited service or are willing to travel.</p>
    <p>If you serve a large area, you can use the buttons below the map to mark all localities a certain color and then edit your selection accordingly.</p>
    <p>The service selected in the drop-down menu above the map are associated with the map you are editing.</p>
    <p>To select a different service, use the drop-down menus to select.</p>
    <p>Update the coverage area first, and then switch to the Language tab to add non-English language information.</p>
    <p>If you have multiple services which cover a simliar area, you can copy from an existing map using the button below.</p>
    <p>On the languages tab, type in the Languages you want to associate with a locality and click on that locality. To clear, leave the text box blank when you click. Separate multiple languages with a comma. To add languages to multiple service maps, return to the coverage tab and switch the map.</p>
</div>
<div id="mapTabs" class="tab">
  <button id="defaultOpen" class="tablinks" onclick="openTab(event, 'Coverage')">Coverage Area</button>
  <button class="tablinks" onclick="openTab(event, 'Languages')">Languages</button>
</div>
<div id="Coverage" class="tabcontent">
<hr>
<div id="ServiceList"></div>
<div id="CopyFromDiv" style="display:none"><i>Copy from existing map for service: </i>
<select id="copyServiceList"></select>
<button serviceName="button" id="copyServiceButton" style="background-color:lightblue" onClick="copyService()">COPY SERVICE</button>
</div>
<div id="coveragemap"></div>
    <button id="allGreen" onclick="allGreen()">Mark All Green</button> 
    <button id="allLtGreen" onclick="allLtGreen()">Mark All Light Green</button> 
    <button id="clearAll" onclick="clearAll()">Clear Map</button>
<br>
</div>
<div id="Languages" class="tabcontent">
Type Non-English Languages to add (separated by commas): <input serviceName="text" id="languageInput" size="50">
<br>
Click localities to paste language info. To clear use an empty text box.
<div id="languagemap"></div>
</div>
<center>
<!-- COMMENT OUT THE TWO BUTTONS BEFORE UPLOAD-->
<hr>
<form method="post"  action="handleEdit.php" onsubmit="createXML()">
<input type="hidden" name="xmlCode" value="NONE"/>
<input type="hidden" name="providerID" value="NONE"/>
<input type="submit" style="background-color:lightblue;height:50px;width:225px" value="SAVE THESE CHANGES TO THIS DSP">
<br>
</form>
<br><hr>
<button type="button" id="testButton" style="background-color:lightblue" onClick="testCreateDSPXML()">TEST XML</button>

 <!--END...COMMENT OUT THE TWO BUTTONS BEFORE UPLOAD-->
<br>
<form method="post" action="preview.php" onsubmit="createDSPXML()">
<input type="submit" style="background-color:lightblue;height:50px;width:225px" value="Preview Changes">
<input type="hidden" name="DSPXMLCode" value="NONE"/>
<input type="hidden" name="submitterName" value="NONE"/>
<input type="hidden" name="submitterE" value="NONE"/>
</form>
</center>
</div>

</div>
<script>
var x = document.getElementById('container');
//x.style.display = 'block';
//x.style.display = 'none';
x.style.visibility = 'hidden';
for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  }
}  
function openTab(evt, cityName) {
    loadDSPMap(coverageMap);
    loadDSPMap(languageMap);
    //coverageMap.refresh();
    //languageMap.refresh();
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        //tabcontent[i].style.visibility = "hidden";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    //document.getElementById(cityName).style.visibility = "visible";
    evt.currentTarget.className += " active";
}
</script>
	</body>
</html>