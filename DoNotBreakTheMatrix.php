<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Edit DSPs</title>
    <script src="mainmapdata.js"></script>
    <script src="statemap.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3syaKZAxQ_ku0EsmiaLtFwhZMqAUJP8s&callback=myMap"></script>
<script>
var availableServices = ["Psychological Evaluation","CSOTP Services for Youth with Sexualized Behaviors","Licensed Mentalh Health Services","Home Based (including Intensive In-Home)","Therapeutic Day Treatment (TDT)","Gang Intervention","Life Skills Mentoring","Independent Living Placement","Residential Placement","Substance Use Therapys","Monitoring Services","Group Interventions","Vocational Services"];
//set the map
//set colors back to plain
simplemaps_statemap_mapdata.regions["0"].color = "default";
simplemaps_statemap_mapdata.regions["1"].color = "default";
simplemaps_statemap_mapdata.regions["2"].color = "default";
simplemaps_statemap_mapdata.regions["3"].color = "default";
simplemaps_statemap_mapdata.regions["4"].color = "default";
for (i=0;i<allFips.length;i++){
    simplemaps_statemap_mapdata.state_specific[allFips[i]].url = "javascript:toggleTravel("+allFips[i]+")";
    simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "default";
}
    
var providers = dspsXML.getElementsByTagName("Provider");
//sort them
var sortedProviders = [];
for (i=0;i<providers.length;i++){
    var providerName = providers[i].getElementsByTagName("Name");
    var providerID = providers[i].getAttribute("id");
    sortedProviders.push(providerName[0].innerHTML +"!"+providerID);
}
//alphabetize
sortedProviders.sort();   
var officeCount = 0; //start at 0 to play nice with index
var serviceGroupCount = 0;
var serviceCount = 0;
    
//define the map types
var mapTypes= {
    "0": {
        name: "Only one map",
        slug: "&OneMap;",
        xmlEnt: " "
    },
    "1": {
        name: "Community Based",
        slug: "&CommunityBased;",
        xmlEnt: "Community Based Services Map"
    },
    "2": {
        name: "Evaluation and Assessments",
        slug: "&EvalAssess;",
        xmlEnt: "Evaluation and Assessment Map"
    },
    "3": {
        name: "No Map",
        slug: "&NoMap;",
        xmlEnt: "Information is not available regarding this providers coverage area"
    },
    "4": {
        name: "Group Skills Map",
        slug: "Group Skills Map",
        xmlEnt: "Group Skills Map"
    },
    "5": {
        name: "Group Homes",
        slug: "&GroupHome;",
        xmlEnt: "Group Home"
    },
    "6": {
        name: "Monitoring Services",
        slug: "&EM;",
        xmlEnt: "Monitoring Services Map"
    },
    "7": {
        name: "Residential Treatment Center",
        slug: "&RTC;",
        xmlEnt: "Residential Treatment Center"
    },
    "8": {
        name: "Outpatient Therapy",
        slug: "&OP;",
        xmlEnt: "Outpatient Therapy"
    },
    "9": {
        name: "Therapuetic Day Treatment (TDT)",
        slug: "&TDT;",
        xmlEnt: "Therapuetic Day Treatment (TDT)"
    },
    "10": {
        name: "Substance Abuse Counseling",
        slug: "&SA-OP;",
        xmlEnt: "Substance Abuse Counseling"
    },
    "11": {
        name: "Thinking for a Change (T4C)",
        slug: "Thinking for a Change (T4C)",
        xmlEnt: "Thinking for a Change (T4C)"
    }
};
   
//functions
function sortNumber(a,b) {
    return a - b;
}
function allGreen(){
    clearAll();
    var pID = document.getElementsByName("DSPID")[0].value;
    var provider = dspsXML.getElementById(pID);
    var mapLayer = document.getElementById("providerMap").value;
    var serviceGroups = provider.getElementsByTagName("ServiceGroupMap");
    var locations = serviceGroups[mapLayer].childNodes;
    var locationNode = serviceGroups[mapLayer].firstChild;
    var serviceFips = locations[0].childNodes;
    //change the display map
    for (var i=0;i<allFips.length;i++){
        simplemaps_statemap_mapdata.state_specific[allFips[i]].color = RegColor;
        simplemaps_statemap_mapdata.state_specific[allFips[i]].hover_color = RegColor;
        //Then there is no entry for the FIPs, create a node.
        var newFIPs = dspsXML.createElement("FIPs");
        newFIPs.setAttribute("travelReq","N");
        newFIPs.innerHTML = allFips[i];
        locations[0].appendChild(newFIPs);  
    }
    simplemaps_statemap.refresh();
}
function allLtGreen(){
    clearAll();
    var pID = document.getElementsByName("DSPID")[0].value;
    var provider = dspsXML.getElementById(pID);
    var mapLayer = document.getElementById("providerMap").value;
    var serviceGroups = provider.getElementsByTagName("ServiceGroupMap");
    var locations = serviceGroups[mapLayer].childNodes;
    var locationNode = serviceGroups[mapLayer].firstChild;
    var serviceFips = locations[0].childNodes;
    //change the display map
    for (var i=0;i<allFips.length;i++){
        //this means it is already in there and the attribute needs to be changed to Y
        //cycle through the locations to find the clicked FIPS
        simplemaps_statemap_mapdata.state_specific[allFips[i]].color = TravelColor;
        simplemaps_statemap_mapdata.state_specific[allFips[i]].hover_color = TravelColor;
        //Then there is no entry for the FIPs, create a node.
        var newFIPs = dspsXML.createElement("FIPs");
        newFIPs.setAttribute("travelReq","Y");
        newFIPs.innerHTML = allFips[i];
        locations[0].appendChild(newFIPs);  
    }
    simplemaps_statemap.refresh();
}
function clearAll(){
    var pID = document.getElementsByName("DSPID")[0].value;
    var provider = dspsXML.getElementById(pID);
    var mapLayer = document.getElementById("providerMap").value;
    var serviceGroups = provider.getElementsByTagName("ServiceGroupMap");
    var locations = serviceGroups[mapLayer].childNodes;
    var locationNode = serviceGroups[mapLayer].firstChild;
    var serviceFips = locations[0].childNodes;
    //change the display map
    //alert(serviceFips[0].innerHTML);
    for (var i=0;i<allFips.length;i++){
        simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "default";
        simplemaps_statemap_mapdata.state_specific[allFips[i]].hover_color = "default";
    }
    locations[0].innerHTML = "";
    //alert(locations[0].innerHTML);
    //alert(serviceFips.length);
    //just clear that map with inner...
    /*
    for (var i=0;i<serviceFips.length;i++){
        serviceFips[i].parentNode.removeChild(serviceFips[i]);
    }*/
    simplemaps_statemap.refresh();
}
function changeService(serviceNum){
    //alert("Change service!");
    //update the DOM
    var pID = document.getElementsByName("DSPID")[0].value;
    var provider = dspsXML.getElementById(pID);
    var sel = document.getElementById("providerMap");
    var mapNum = sel.value;
    var serviceMenus = provider.getElementsByTagName("ServiceMenu");
    var serviceItem = serviceMenus[mapNum].getElementsByTagName("ServiceItem");
    //alert("serviceItem[serviceNum] "+serviceItem[serviceNum].innerHTML);
    serviceItem[serviceNum].innerHTML = document.getElementsByName("serviceDropDown")[serviceNum].value;
}
function nextAvailableID (){
    var currentProviders = dspsXML.getElementsByTagName("Provider");
    var providerCount = currentProviders.length;
    var firstEmpty = -1;
    var orderedId = [];
    for (var i=0;i<providerCount;i++){
        var idNum = Number(currentProviders[i].getAttribute("id"))
        orderedId.push(idNum);
    }
    orderedId.sort(sortNumber);
    //alert(orderedId.join(","));
    for (var i=0; i<orderedId.length; i++){
        if (orderedId[i] != i.toString() && firstEmpty == -1){
            //alert(i+" is the first id# without a provider");
            firstEmpty = i;
        }
    }
    if (firstEmpty == -1){
        firstEmpty = providerCount+1;
    }
    return firstEmpty;
}
function createDSP(){
    //alert(nextAvailableID()+" will be used for the id");
    var providerPlacement = dspsXML.getElementsByTagName("DSPs");
    //build a new Provider element
    var newDSP = dspsXML.createElement("Provider");
    newDSP.setAttribute("id",nextAvailableID());
    //first children elements
    var nName = dspsXML.createElement("Name");
    var nMapZoom = dspsXML.createElement("MapZoom");
    var nWebsite = dspsXML.createElement("Website");
    var nContactName = dspsXML.createElement("ContactName");
    var nContactEmail = dspsXML.createElement("ContactEmail");
    var nOffices = dspsXML.createElement("Offices");
    //var nServiceGroupMap = dspsXML.createElement("ServiceGroupMap");//could be problem when adding maps
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
    //build the office element.
    nOffice.appendChild(nLat);
    nOffice.appendChild(nLng);
    nOffice.appendChild(nStreet);
    nOffice.appendChild(nCity);
    nOffice.appendChild(nState);
    nOffice.appendChild(nZip);
    nOffice.appendChild(nPhone);
    nOffice.appendChild(nFax);
    nOffices.appendChild(nOffice);
    newDSP.appendChild(nName);
    newDSP.appendChild(nMapZoom);
    newDSP.appendChild(nWebsite);
    newDSP.appendChild(nContactName);
    newDSP.appendChild(nContactEmail);
    newDSP.appendChild(nOffices);
    //newDSP.appendChild(nServiceGroupMap);
    
    //put it in the DOM
    //alert(providerPlacement[0].innerHTML);
    //alert("Provider placement lenght is "+providerPlacement.length);
    providerPlacement[0].appendChild(newDSP);
    //alert(providerPlacement[0].innerHTML);
    //alert(newDSP.innerHTML);
    //alert(dspsXML.textContent);
}
function loadDSP(){
    if (document.getElementById("ProviderSelect").value == "newDSP"){
        var pID = nextAvailableID();
        document.getElementsByName("DSPID")[0].value = pID;
        createDSP();
        return;
    }
    document.getElementById("DSPServiceGroup").innerHTML = "";
    var pID = document.getElementById("ProviderSelect").value;
    var provider = dspsXML.getElementById(pID);
    document.getElementsByName("DSPID")[0].value = pID;
    document.getElementsByName("DSPName")[0].value = provider.getElementsByTagName("Name")[0].innerHTML;
    document.getElementsByName("DefaultZoom")[0].value = provider.getElementsByTagName("MapZoom")[0].innerHTML;
    document.getElementsByName("DSPWeb")[0].value = provider.getElementsByTagName("Website")[0].innerHTML;
    document.getElementsByName("DSPContactName")[0].value = provider.getElementsByTagName("ContactName")[0].innerHTML;
    document.getElementsByName("DSPContactEmail")[0].value = provider.getElementsByTagName("ContactEmail")[0].innerHTML;
    document.getElementsByName("Lat")[0].value = provider.getElementsByTagName("Lat")[0].innerHTML;
    document.getElementsByName("Lng")[0].value = provider.getElementsByTagName("Lng")[0].innerHTML;
    document.getElementsByName("Street")[0].value = provider.getElementsByTagName("Street")[0].innerHTML;
    document.getElementsByName("City")[0].value = provider.getElementsByTagName("City")[0].innerHTML;
    document.getElementsByName("State")[0].value = provider.getElementsByTagName("State")[0].innerHTML;
    document.getElementsByName("Zip")[0].value = provider.getElementsByTagName("Zip")[0].innerHTML;
    document.getElementsByName("Phone")[0].value = provider.getElementsByTagName("Phone")[0].innerHTML;
    document.getElementsByName("Fax")[0].value = provider.getElementsByTagName("Fax")[0].innerHTML;
    //check for additional offices.
    var DSPOffices = provider.getElementsByTagName("Office");
    if (DSPOffices.length > 1){
        document.getElementById("DSPMoreOffices").innerHTML = "<hr><h3><font color='000000' size='4'><u>Additional Offices:</u></font></h3>";
        //load the extra office
        for (i=1;i<DSPOffices.length;i++){
            addOffice();
        }
    }
    var DSPServiceGroups = provider.getElementsByTagName("ServiceGroupMap");
    selectServiceGroup();
    loadDSPMap();
    /*for (i=0;i<DSPServiceGroups.length;i++){
        //only looping one time, what gives? - the problem is definitely in the called function; 2nd time
        //alert("DSPServiceGroups.length is "+DSPServiceGroups.length);
        addServiceGroup();
    }*/
}
function selectServiceGroup(){
    document.getElementById("DSPServiceGroup").innerHTML = "";
    //var pID = document.getElementById("ProviderSelect").value;
    var pID = document.getElementsByName("DSPID")[0].value;
    var provider = dspsXML.getElementById(pID);
    var providerMaps = provider.getElementsByTagName("ServiceGroupMap");
    var serviceGroupsTxt = "";
    serviceGroupsTxt += "<br><u>Select Provider's Map to Edit (one at a time)</u><br>";
    serviceGroupsTxt += "Map:<select id='providerMap' onchange='loadDSPMap()'>;"
    //need one outside of loop to set default selected
    //serviceGroupsTxt +="<option value='0' selected>"+mapTypes+"</option>";  
    serviceGroupsTxt +="<option value='0' selected>"+providerMaps[0].getAttribute("type")+"</option>"
    //alert("providermap length is "+providerMaps.length);
    for (var j=1;j<providerMaps.length;j++){
        serviceGroupsTxt +="<option value='"+j+"'>"+providerMaps[j].getAttribute("type")+"</option>";   
    }
    serviceGroupsTxt += "</select>";
    //add zoom options
    serviceGroupsTxt += 'Service Zoom:<select id="ServiceMapZoom">';
    serviceGroupsTxt += '<option value="-1" selected>Entire State</option>';
    serviceGroupsTxt += '<option value="0">Northern Region</option>';
    serviceGroupsTxt += '<option value="1">Central Region</option>';
    serviceGroupsTxt += '<option value="2">Western Region</option>';
    serviceGroupsTxt += '<option value="-1">-</option>';
        for (i=0;i<allFips.length;i++){
            serviceGroupsTxt += "<option value='"+allFips[i]+"'>"+simplemaps_statemap_mapdata.state_specific[allFips[i]].name+"</option>";   
        }
    serviceGroupsTxt += '</select>';
    serviceGroupsTxt += "Rename this map to:<input type='text' id='MapRename' size=50>";
    serviceGroupsTxt += '<button type="button" id="renameMapButton" style="background-color:lightblue" onClick="renameMap()">Rename MAP</button>';
    serviceGroupsTxt += '<br><button type="button" id="deleteMapButton" style="background-color:lightblue" onClick="deleteMap()">DELETE THIS MAP</button>';
    serviceGroupsTxt += "<br>Add a map called:<input type='text' id='MapName' size=50>";
    serviceGroupsTxt += '  With Service Zoom:<select id="NewServiceMapZoom">';
    serviceGroupsTxt += '<option value="-1" selected>Entire State</option>';
    serviceGroupsTxt += '<option value="0">Northern Region</option>';
    serviceGroupsTxt += '<option value="1">Central Region</option>';
    serviceGroupsTxt += '<option value="2">Western Region</option>';
    serviceGroupsTxt += '<option value="-1">-</option>';
        for (i=0;i<allFips.length;i++){
            serviceGroupsTxt += "<option value='"+allFips[i]+"'>"+simplemaps_statemap_mapdata.state_specific[allFips[i]].name+"</option>";   
        }
    serviceGroupsTxt += '</select>';
    serviceGroupsTxt += '<button type="button" id="addMapButton" style="background-color:lightblue" onClick="addMap()">ADD MAP</button>';
    var selectMap = document.createElement("div");
    //selectMap.setAttribute("id","serviceMap"+serviceGroupCount);
    selectMap.innerHTML = serviceGroupsTxt;
    document.getElementById("DSPServiceGroup").appendChild(selectMap);
    //document.getElementById("DSPServiceGroup").replaceChild(selectMap);
}
function deleteMap(){
    var sel = document.getElementById("providerMap");
    var mapNum = sel.value;
    //var pID = document.getElementById("ProviderSelect").value;
    var pID = document.getElementsByName("DSPID")[0].value;
    var provider = dspsXML.getElementById(pID);
    var providerMaps = provider.getElementsByTagName("ServiceGroupMap");
    //alert ("provider map length is "+providerMaps.length);
    if (providerMaps.length <= 1){
        alert("YOU CANNOT DELETE THIS MAP\r At least one map is required!");
        return;
    } else {
        if (confirm("Are you sure? This cannot be undone. Serivces associated with this map will also be lost. Consider adding them to another map. If you make a mistake - CHANGES WILL NOT BE SAVED UNTIL YOU CLICK SAVE THESE CHANGES AT THE BOTTOM")){
            providerMaps[mapNum].parentNode.removeChild(providerMaps[mapNum]);
            selectServiceGroup();
            loadDSPMap(); 
            return;   
        }
    }
}
function renameMap(){
    //alert("renaming map to..."+document.getElementById("MapRename").value);
    var sel = document.getElementById("providerMap");
    var mapNum = sel.value;
    var mapSelection = sel.options[sel.selectedIndex].text;
    //alert("mapNum is "+mapNum+" and mapSelection is "+mapSelection);
    //var pID = document.getElementById("ProviderSelect").value;
    var pID = document.getElementsByName("DSPID")[0].value;
    var provider = dspsXML.getElementById(pID);
    var providerMaps = provider.getElementsByTagName("ServiceGroupMap");
    providerMaps[mapNum].setAttribute("type",document.getElementById("MapRename").value);
    selectServiceGroup();
    document.getElementById("providerMap").value = mapNum;
    loadDSPMap();
}
function addMap(){
    //alert("adding a map called... "+document.getElementById("MapName").value);
    //add it to the DOM
    var newMap = dspsXML.createElement("ServiceGroupMap");
    newMap.setAttribute("type",document.getElementById("MapName").value);
    newMap.setAttribute("serviceZoom",document.getElementById("NewServiceMapZoom").value);
    var newMapLTag = dspsXML.createElement("Locations");
    //var newMapFTag = dspsXML.createElement("FIPs");
    //newMapLTag.appendChild(newMapFTag);
    newMap.appendChild(newMapLTag);
    var newMapMTag = dspsXML.createElement("ServiceMenu");
    newMap.appendChild(newMapMTag);
    var pID = document.getElementsByName("DSPID")[0].value;
    //alert("pID is "+pID+"which is a "+typeof(pID));
    //var testP = dspsXML.getElementById(10);
    //alert(dspsXML.textContent);
    var provider = dspsXML.getElementById(Number(pID));
    //alert("provider is "+provider.innerHTML);
    
    //if this is the first map, replace
    //var mapCount = provider.getElementsByTagName("ServiceGroupMap")
    provider.appendChild(newMap);
    //now add it to the drop down list
    var newMapSelect = document.createElement("option");
    newMapSelect.setAttribute("value",Object.keys(providerMap).length);
    newMapSelect.setAttribute("selected","yes");
    newMapSelect.innerHTML = document.getElementById("MapName").value;
    document.getElementById("providerMap").appendChild(newMapSelect);
    document.getElementById("MapName").value = "";
    //need to load/clear the map somehow...
    //alert(provider.innerHTML);
    //if create new, than update the drop downs.
    selectServiceGroup();
    loadDSPMap();
}
function deleteService(serviceNum){
    /*
    if (confirm("ARE YOU SURE? This DSP's service will be deleted. Note: there is no undo button, HOWEVER changes to this DSP will not be saved until you select save button at the bottom of the form.")){
        
    }
    */
    //remove from form
        //alert("serviceNum is "+serviceNum);
        document.getElementsByName("serviceListItem")[serviceNum].innerHTML="";
        //remove from DOM
        var sel = document.getElementById("providerMap");
        var mapNum = sel.value;
        //var pID = document.getElementById("ProviderSelect").value;
        var pID = document.getElementsByName("DSPID")[0].value;
        var provider = dspsXML.getElementById(pID);
        var providerMaps = provider.getElementsByTagName("ServiceGroupMap");
        var providerServices = providerMaps[mapNum].getElementsByTagName("ServiceItem");
        //alert("providerMaps[mapNum]  "+providerMaps[mapNum].innerHTML);
        providerServices[serviceNum].parentNode.removeChild(providerServices[serviceNum]);
        serviceCount--;
}
function createServiceDropDowns(){
    serviceCount = 0;
    var mapLayer = document.getElementById("providerMap").value;
    //var pID = document.getElementById("ProviderSelect").value;
    var pID = document.getElementsByName("DSPID")[0].value;
    var provider = dspsXML.getElementById(pID);
    var serviceMenus = provider.getElementsByTagName("ServiceMenu");
    //catch error if it's an empty map
    try {
        var serviceMapZoom = serviceMenus[mapLayer].parentElement.getAttribute("serviceZoom");
        document.getElementById("ServiceMapZoom").value = serviceMapZoom;
        var serviceItems = serviceMenus[mapLayer].children;
        var serviceListingTxt = "";
        serviceListingTxt += "<br><u>These Services are available per the map above:</u><br>";
        serviceListingTxt += "<i>toggle the selection to change service name, click button to delete</i><br>";
        var providerServices = [];
        var serviceCheck = dspsXML.getElementsByTagName("ServiceItem");
        for (var i=0;i<availableServices.length;i++){
            //providerServices.push(serviceCheck[i].innerHTML);
            providerServices.push(availableServices[i]);
        }
        providerServices = removeDuplicates(providerServices);
        providerServices.sort(); //for services.html the array index will be the service id.
        for (var i=0;i<serviceItems.length;i++){
            serviceListingTxt += "<div name='serviceListItem'>";
            serviceListingTxt += "<select name='serviceDropDown' onchange='changeService("+serviceCount+")'>";
            for (var j=0;j<providerServices.length;j++){
                serviceListingTxt +="<option value='"+providerServices[j]+"'>"+providerServices[j]+"</option>";
            }
            //alert("j is "+j);
            serviceListingTxt += "</select>";
            serviceListingTxt += "<button type='button' style='background-color:lightblue'  onclick='deleteService("+serviceCount+")'>DELETE THIS SERVICE</button>";
            serviceListingTxt += "</div>";
            //serviceListingTxt += "<br>";
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
    //var pID = document.getElementById("ProviderSelect").value;
    var pID = document.getElementsByName("DSPID")[0].value;
    var provider = dspsXML.getElementById(pID);
    var serviceMenus = provider.getElementsByTagName("ServiceMenu");
    var serviceItems = serviceMenus[mapLayer].children;
    var serviceListingTxt = "";
    //serviceListingTxt += "<br><u>These Services are available per the map above:</u><br>";
    //var availableServices = [];
    var serviceCheck = dspsXML.getElementsByTagName("ServiceItem");
    for (var i=0;i<serviceItems.length;i++){
        //alert("serviceItem is"+serviceItems[i].innerHTML);
        document.getElementsByName("serviceDropDown")[i].value = serviceItems[i].innerHTML;
        //document.getElementById("serviceDropDown"+i).value = serviceItems[i].innerHTML;
    }
}
function addService(){
    /*
    var newOffice = document.createElement("div");
    newOffice.setAttribute("id","office"+officeCount);
    newOffice.innerHTML = extraOffices;
    document.getElementById("DSPMoreOffices").appendChild(newOffice);
    */
    var serviceSelected = document.getElementById("newServiceDropDown").value;
    /*
    var availableServices = [];
    var serviceCheck = dspsXML.getElementsByTagName("ServiceItem");
    for (var i=0;i<serviceCheck.length;i++){
        availableServices.push(serviceCheck[i].innerHTML);
    }
    availableServices = removeDuplicates(availableServices);
    availableServices.sort();
    */
    //var serviceListingTxt = "<div name='serviceListItem'>";
    var serviceListingTxt = "<select name='serviceDropDown'>";
    serviceListingTxt += "<option value='NONE'>PLEASE SELECT</option>";
    for (var j=0;j<availableServices.length;j++){
        serviceListingTxt +="<option value='"+availableServices[j]+"'";
        if (serviceSelected == availableServices[j]){
            serviceListingTxt += ' selected';
        }
        serviceListingTxt += ">"+availableServices[j]+"</option>";
    }
    //alert("j is "+j);
    serviceListingTxt += "</select>";
    serviceListingTxt += "<button type='button' style='background-color:lightblue' onclick='deleteService("+serviceCount+")'>DELETE THIS SERVICE</button>";
    //serviceListingTxt += "</div>";
    serviceCount++;
    var newService = document.createElement("div");
    newService.setAttribute("name","serviceListItem");
    //var newServiceTxt = "";
    //newServiceTxt = "SERVICE<button type='button' style='background-color:lightblue' onclick='deleteService("+serviceCount+")'>DELETE THIS SERVICE</button>";
    newService.innerHTML = serviceListingTxt;
    document.getElementById("ServiceList").appendChild(newService);
    //Add to the DOM
    var mapLayer = document.getElementById("providerMap").value;
    //var pID = document.getElementById("ProviderSelect").value;
    var pID = document.getElementsByName("DSPID")[0].value;
    var provider = dspsXML.getElementById(pID);
    var serviceMenus = provider.getElementsByTagName("ServiceMenu");
    var serviceItems = serviceMenus[mapLayer].children;
    var newServiceXML = dspsXML.createElement("ServiceItem");
    newServiceXML.innerHTML = serviceSelected;
    serviceMenus[mapLayer].appendChild(newServiceXML);
}
function addServiceGroup(){
    //var pID = document.getElementById("ProviderSelect").value;
    var pID = document.getElementsByName("DSPID")[0].value;
    var provider = dspsXML.getElementById(pID);
    var serviceGroupsTxt = "";
    serviceGroupsTxt += "<br><u>Map #"+(serviceGroupCount+1)+":</u><br>";
    serviceGroupsTxt += "Map Type:<select name='mapType'>;"
    for (var j=0;j<Object.keys(mapTypes).length;j++){
        serviceGroupsTxt +="<option value='"+mapTypes[j].xmlEnt+"'>"+mapTypes[j].name+"</option>";   
    }
    serviceGroupsTxt += "</select>";
    
    //var newMapDiv = document.createElement("div");
    //newMapDiv.setAttribute("id","map"+serviceGroupCount);
    //newMapDiv.setAttribute("id","map");
    //newMapDiv.innerHTML = serviceGroupsTxt;
    //newMapDiv.innerHTML = "something";
    //document.getElementById("DSPServiceGroup").appendChild(newMapDiv);
    
    var newServiceGroupMap = document.createElement("div");
    newServiceGroupMap.setAttribute("id","serviceMap"+serviceGroupCount);
    newServiceGroupMap.innerHTML = serviceGroupsTxt;
    document.getElementById("DSPServiceGroup").appendChild(newServiceGroupMap);
    //left off HERE; need to define the allowable serviceGroup Types by drop down list
    document.getElementsByName("mapType")[serviceGroupCount].value = provider.getElementsByTagName("ServiceGroupMap")[serviceGroupCount].getAttribute("type");
    //var newMap = simplemaps_countymap.create();
    //alert("here, serviceGroupCount is "+serviceGroupCount);
    //loadDSPMap(serviceGroupCount);
    serviceGroupCount++;
}
function deleteOffice(officeID){
    if (confirm("ARE YOU SURE? This DSP's Additional Office will be deleted. Note: there is no undo button, HOWEVER changes to this DSP will not be saved until you select save button at the bottom of the form.")){
        document.getElementById("office"+officeID).innerHTML = "";
        officeCount--;
        //alert("officeCount is "+officeCount);
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
    //alert(officeAddress);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': officeAddress}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        document.getElementsByName("Lat")[officeNum].value = results[0].geometry.location.lat();
        document.getElementsByName("Lng")[officeNum].value = results[0].geometry.location.lng();
        } 
    });
}
function addOffice(){
    officeCount++;
    //alert("OfficeCount is "+officeCount);
    var pID = document.getElementsByName("DSPID")[0].value;
    var provider = dspsXML.getElementById(pID);
    var extraOffices = "";
    extraOffices += "<br><u>Additional Office #"+officeCount+":</u>";
    extraOffices += "<button type='button' style='background-color:lightblue' onclick='deleteOffice("+officeCount+")'>DELETE THIS OFFICE</button><br>";
    extraOffices += "Latitude:<input type='text' name='Lat' size=7>";
    extraOffices += "Longitude:<input type='text' name='Lng' size=7><button type='button' style='background-color:lightblue' onclick='geoOffice("+officeCount+")'>GEOTAG</button><br>";
    extraOffices += "Street:<input type='text' name='Street' size=50><br>";
    extraOffices += "City:<input type='text' name='City'><br>";
    extraOffices += "State:<input type='text' name='State'><br>";
    extraOffices += "Zip:<input type='text' name='Zip'><br>";
    extraOffices += "Phone:<input type='text' name='Phone'><br>";
    extraOffices += "Fax:<input type='text' name='Fax'>";
    var newOffice = document.createElement("div");
    newOffice.setAttribute("id","office"+officeCount);
    newOffice.innerHTML = extraOffices;
    document.getElementById("DSPMoreOffices").appendChild(newOffice);
    document.getElementsByName("Lat")[officeCount].value = provider.getElementsByTagName("Lat")[officeCount].innerHTML;
    document.getElementsByName("Lng")[officeCount].value = provider.getElementsByTagName("Lng")[officeCount].innerHTML;
    document.getElementsByName("Street")[officeCount].value = provider.getElementsByTagName("Street")[officeCount].innerHTML;
    document.getElementsByName("City")[officeCount].value = provider.getElementsByTagName("City")[officeCount].innerHTML;
    document.getElementsByName("State")[officeCount].value = provider.getElementsByTagName("State")[officeCount].innerHTML;
    document.getElementsByName("Zip")[officeCount].value = provider.getElementsByTagName("Zip")[officeCount].innerHTML;
    document.getElementsByName("Phone")[officeCount].value = provider.getElementsByTagName("Phone")[officeCount].innerHTML;
    document.getElementsByName("Fax")[officeCount].value = provider.getElementsByTagName("Fax")[officeCount].innerHTML;
    return false;
}
function toggleTravel(fips){
    //cycle through
    //NOW - not only change the map, change the DOM.
    //var pID = document.getElementById("ProviderSelect").value;
    var pID = document.getElementsByName("DSPID")[0].value;
    var provider = dspsXML.getElementById(pID);
    var mapLayer = document.getElementById("providerMap").value;
    var serviceGroups = provider.getElementsByTagName("ServiceGroupMap");
    var locations = serviceGroups[mapLayer].childNodes;
    var locationNode = serviceGroups[mapLayer].firstChild;
    //alert("locations[2] is "+locations.length);
    //var serviceFips = locations[1].children;
    //alert("test alert: "+locations[1].innerHTML);
    var serviceFips = locations[0].childNodes;
    if (simplemaps_statemap_mapdata.state_specific[fips].color == "default"){
        //change the display map
        simplemaps_statemap_mapdata.state_specific[fips].color = RegColor;
        simplemaps_statemap_mapdata.state_specific[fips].hover_color = RegColor;
        //Then there is no entry for the FIPs, create a node.
        var newFIPs = dspsXML.createElement("FIPs");
        newFIPs.setAttribute("travelReq","N");
        newFIPs.innerHTML = fips;
        //var testVar = serviceGroups[mapLayer].childNodes;
        //alert("serviceGroups child element... is "+serviceGroups[mapLayer].childElementCount);
        //alert("locations[] is "+locations[1].innerHTML);
        locations[0].appendChild(newFIPs);
        //serviceGroups[mapLayer].appendChild(newFIPs);
        //locationNode.appendChild(newFIPs);
        //alert("locationNode is "+locationNode.node);
    } else if (simplemaps_statemap_mapdata.state_specific[fips].color == RegColor){
        //change the display map
        simplemaps_statemap_mapdata.state_specific[fips].color = TravelColor;
        simplemaps_statemap_mapdata.state_specific[fips].hover_color = TravelColor;
        //this means it is already in there and the attribute needs to be changed to Y
        //cycle through the locations to find the clicked FIPS
        for (var i=0;i<serviceFips.length;i++){
            if (serviceFips[i].innerHTML == fips){
                serviceFips[i].setAttribute("travelReq","Y");
            }
        }
    } else if (simplemaps_statemap_mapdata.state_specific[fips].color == TravelColor){
        //change the display map
        simplemaps_statemap_mapdata.state_specific[fips].color = "default";
        simplemaps_statemap_mapdata.state_specific[fips].hover_color = "default";
        //remove it from the DOM
        for (var i=0;i<serviceFips.length;i++){
            if (serviceFips[i].innerHTML == fips){
                serviceFips[i].parentNode.removeChild(serviceFips[i]);
            }
        }
    }
    simplemaps_statemap.refresh_state(fips);
    //alert("You clicked "+fips);
    //alert("color is "+simplemaps_statemap_mapdata.state_specific[fips].color);
}
function loadDSPMap(){
    var mapLayer = document.getElementById("providerMap").value;
    //var pID = document.getElementById("ProviderSelect").value;
    var pID = document.getElementsByName("DSPID")[0].value;
    //var testVar = document.getElementById("Lat")[1].value;
    //alert("testVar is "+testVar);
    var provider = dspsXML.getElementById(pID);
    var providerName = provider.getElementsByTagName("Name");
    var providerWebsite = provider.getElementsByTagName("Website");
    var providerContact = provider.getElementsByTagName("ContactName");
    var providerEmail = provider.getElementsByTagName("ContactEmail");
    var mapZoom = provider.getElementsByTagName("MapZoom");
    var officeCount = provider.getElementsByTagName("Office").length;
    //Clear the map
    for (i=0;i<allFips.length;i++){
        simplemaps_statemap_mapdata.state_specific[allFips[i]].url = "javascript:toggleTravel("+allFips[i]+")";
        simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "default";
    }
    
    /* SKIP LOCATIONS FOR THIS TASK
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
            lat: officeLat[i].innerHTML,
            lng: officeLng[i].innerHTML,
            name: providerName[0].innerHTML,
            color: "default",
            description: officeStreet[i].innerHTML + "<br>" + officeCity[i].innerHTML + ", " + officeState[i].innerHTML + " " + officeZip[i].innerHTML + "<br>" + officePhone[i].innerHTML,
            url: "",
            size: "default",
            type: "default",
            image_url: "default",
            opacity: "default"
        }
        //update counter so it doesn't overwrite a location
        locationCounter++;
    }
    END SKIPPING LOCATIONS*/

    //set this provider's map zoom
    //alert("mapZoom[0] is "+mapZoom[0].innerHTML);
    simplemaps_statemap_mapdata.main_settings.initial_zoom = mapZoom[0].innerHTML;
    var services = provider.getElementsByTagName("ServiceGroupMap");    
    //if this is the landing page for the provider then show all-service coverage area
    if (mapLayer == "all"){ //show entire coverage area for landing page
        var serviceZoom = provider.getElementsByTagName("MapZoom");
        serviceZoom = serviceZoom[0].innerHTML;
        var locations = provider.getElementsByTagName("FIPs");
        var mapDescription = "Provider's Complete Coverage Area";
    } else { //this is for a specific map
        var serviceZoom = services[mapLayer].getAttribute("serviceZoom");
        var locations = services[mapLayer].getElementsByTagName("FIPs");
        var mapDescription = services[mapLayer].getAttribute("type");
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
        if (locations[i].innerHTML == "ALL"){
            if (locations[i].getAttribute("travelReq") == "Y"){
                for (j=0;j<allFips.length;j++){
                    simplemaps_statemap_mapdata.state_specific[allFips[j]].color = TravelColor;
                    simplemaps_statemap_mapdata.state_specific[allFips[j]].hover_color = TravelColor;
                }
            } else if (locations[i].getAttribute("travelReq") == "N"){
                for (j=0;j<allFips.length;j++){
                    simplemaps_statemap_mapdata.state_specific[allFips[j]].color = RegColor;
                    simplemaps_statemap_mapdata.state_specific[allFips[j]].hover_color = RegColor; 
                }
            } 
        }   
        else { //a FIPs code
            if (locations[i].getAttribute("travelReq") == "Y"){
                simplemaps_statemap_mapdata.state_specific[locations[i].innerHTML].color = TravelColor;
                simplemaps_statemap_mapdata.state_specific[locations[i].innerHTML].hover_color = TravelColor;
            } 
        }
    }
    //overwrite travel not required.
    for (var i = 0; i < locations.length; i++){
        if (locations[i].getAttribute("travelReq") == "N"){
            simplemaps_statemap_mapdata.state_specific[locations[i].innerHTML].color = RegColor;
            simplemaps_statemap_mapdata.state_specific[locations[i].innerHTML].hover_color = RegColor;
        }  
    }
    simplemaps_statemap.refresh();
    createServiceDropDowns();
}
function createXML(){
    if (confirm("ARE YOU SURE? There is no undo")){
        //var pID = document.getElementById("ProviderSelect").value;
        var pID = document.getElementsByName("DSPID")[0].value;
        var provider = dspsXML.getElementById(pID);
        var allServiceGroups = provider.getElementsByTagName("ServiceGroupMap");
        //alert("YOU BROKE THE MATRIX");
        //alert("Just joking :)");
        //use this function to build the ENTIRE XML Code to pass as a single variable.
        var xmlString = "";
        //alert(dspsDTD.responseText);
        xmlString += dspsDTD.responseText;
        xmlString += '\r]>\r';
        xmlString += '<DSPs>\r';
        //cycle through all provider IDs
        var providers = dspsXML.getElementsByTagName("Provider");
        //alert("providersLength is "+providers.length);
        for (var k=0;k<providers.length;k++){
            //skip the provider that was just edited!
            //alert("k is "+k+" and DSPID is "+document.getElementsByName("DSPID")[0].value);
            if (pID != providers[k].getAttribute("id")){
                //alert("It's true<br>DSPID...etc is a " + typeof(document.getElementsByName("DSPID")[0].value)+" but k is a "+typeof(k));
                //alert("Its true! K is "+k+"and Provider[k] is <br><br>"+providers[k].innerHTML);
                xmlString += '<Provider id="'+providers[k].getAttribute("id")+'">\r';
                xmlString += providers[k].innerHTML;
                xmlString += '</Provider>\r';
            } 
            else { //it is the provider being edited
                //alert("Its NOT true! K is "+k+"and Provider[k] is <br><br>"+providers[k].innerHTML);
                //PICK UP HERE!!!
                //ADD PROVIDER TAG INCLUDING ID
                //
                //alert("Its NOT true! K is "+k);
                xmlString += '<Provider id="'+document.getElementsByName("DSPID")[0].value+'">\r';
                xmlString += "\t<Name>"+document.getElementsByName("DSPName")[0].value+"</Name>\r";
                xmlString += "\t<MapZoom>"+document.getElementsByName("DefaultZoom")[0].value+"</MapZoom>\r";
                xmlString += "\t<Website>"+document.getElementsByName("DSPWeb")[0].value+"</Website>\r";
                xmlString += "\t<ContactName>"+document.getElementsByName("DSPContactName")[0].value+"</ContactName>\r";
                xmlString += "\t<ContactEmail>"+document.getElementsByName("DSPContactEmail")[0].value+"</ContactEmail>\r";
                xmlString += "\t<Offices>\r";
                //alert("Office Count is "+officeCount+" AND Lat[] is "+document.getElementsByName("Lat").length);
                for (var i=0;i<document.getElementsByName("Lat").length;i++){
                    xmlString += "\t\t<Office>\r";
                    xmlString += "\t\t\t<Lat>"+document.getElementsByName("Lat")[i].value+"</Lat>\r";
                    xmlString += "\t\t\t<Lng>"+document.getElementsByName("Lng")[i].value+"</Lng>\r";
                    xmlString += "\t\t\t<Street>"+document.getElementsByName("Street")[i].value+"</Street>\r";
                    xmlString += "\t\t\t<City>"+document.getElementsByName("City")[i].value+"</City>\r";
                    xmlString += "\t\t\t<State>"+document.getElementsByName("State")[i].value+"</State>\r";
                    xmlString += "\t\t\t<Zip>"+document.getElementsByName("Zip")[i].value+"</Zip>\r";
                    xmlString += "\t\t\t<Phone>"+document.getElementsByName("Phone")[i].value+"</Phone>\r";
                    xmlString += "\t\t\t<Fax>"+document.getElementsByName("Fax")[i].value+"</Fax>\r";
                    xmlString += "\t\t</Office>\r";
                }
                xmlString += "\t</Offices>\r";
                
                //REWRITE - just rewrite everything from the DOM (will need to go back and change clicks to update DOM too)
                //alert("there are "+document.getElementById("providerMap").length+" maps");
                for (var i=0;i<provider.getElementsByTagName("ServiceGroupMap").length;i++){
                    var tempGroup = allServiceGroups[i].cloneNode("true");
                    var tmpParent = document.createElement("p");
                    tmpParent.appendChild(document.createTextNode("Test"));
                    var tmp = document.createElement("div");
                    tmp.appendChild(tempGroup);
                    xmlString += tmp.innerHTML;
                    //alert(tmp.innerHTML);
                }
            xmlString += "</Provider>\r";
            }
        }
        xmlString += '</DSPs>';
        document.getElementsByName("xmlCode")[0].value = xmlString;
        document.getElementsByName("providerID")[0].value = document.getElementsByName("DSPID")[0].value;
        //alert(xmlString);
    }
}
function testPXML (){
    //var pID = document.getElementById("ProviderSelect").value;
    var pID = document.getElementsByName("DSPID")[0].value;
    var provider = dspsXML.getElementById(pID);
    alert(provider.innerHTML);
}
</script>
  </head>
  <body>
<br>Select Provider to Edit:<br>
<select id="ProviderSelect" onchange="loadDSP()">
    <option value="none" selected>(please select)</option>
    <option value="newDSP">***CREATE NEW***</option>
    <script>
        for (i=0;i<sortedProviders.length;i++){
            var providerInfo = sortedProviders[i].split("!");//providerInfo[0] is name [1] is ID  
            document.write("<option value='"+providerInfo[1]+"'>"+providerInfo[0]+"</option>");
        }
    </script>
</select>

<div id="DSPInfo">
<script>document.write("<div style='background-color:"+EBABlue+";'><font color='000000' size='4'><center><h2><u>DSP General Info</u></h2></center></div>");</script>

Provider ID:
<input type="text" name="DSPID" value="" size=3 readonly>
Name:
<input type="text" name="DSPName" value="" size=100>
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
            document.write("<option value='"+allFips[i]+"'>"+simplemaps_statemap_mapdata.state_specific[allFips[i]].name+"</option>");   
        }
    </script>
</select>
<br>
Website (do not include http://):
<input type="text" name="DSPWeb" value="" size=100>
<br>
Contact Name:
<input type="text" name="DSPContactName" value="" size=50>
Contact Email:
<input type="text" name="DSPContactEmail" value="" size=50>

<hr>
<div id="DSPMainOffice">
<script>document.write("<div style='background-color:"+EBABlue+";'><font color='000000' size='4'><center><h2><u>DSP Office Information</u></h2></center></div>");</script>
<h3><font color='000000' size='4'><u>Main Office:</u></font></h3>

Latitude:
<input type="text" name="Lat" size=7>
Longitude:
<input type="text" name="Lng" size=7>
<button type='button' style='background-color:lightblue' onclick='geoOffice("0")'>GEOTAG</button><br>
Street:
<input type="text" name="Street" size=50>
<br>
City:
<input type="text" name="City">
<br>
State:
<input type="text" name="State">
<br>
Zip:
<input type="text" name="Zip">
<br>
Phone:
<input type="text" name="Phone">
<br>
Fax:
<input type="text" name="Fax">

</div>
<div id="DSPMoreOffices"></div>
<center>
<button type="button" id="addOfficeButton" style="background-color:lightblue" onClick="addOffice()">ADD OFFICE</button>
</center>     
<hr>
<script>document.write("<div style='background-color:"+EBABlue+";'><font color='000000' size='4'><center><h2><u>DSP Maps</u></h2></center></div>");</script>
<div id="map"></div>
    <button id="allGreen" onclick="allGreen()">Mark All Green</button> 
    <button id="allLtGreen" onclick="allLtGreen()">Mark All Light Green</button> 
    <button id="clearAll" onclick="clearAll()">Clear Map</button>
<div id="DSPServiceGroup">
<br><u>Create A Map for this New Provider</u><br>
<select id='providerMap' hidden></select>
<br>Create a map called:<input type='text' id='MapName' size=50>  With Service Zoom:<select id="NewServiceMapZoom">
<option value="-1" selected>Entire State</option>
<option value="0">Northern Region</option>
<option value="1">Central Region</option>
<option value="2">Western Region</option>
<option value="-1">-</option>
<script>
for (i=0;i<allFips.length;i++){
    document.write("<option value='"+allFips[i]+"'>"+simplemaps_statemap_mapdata.state_specific[allFips[i]].name+"</option>");  
}
</script>
</select>
<button type="button" id="addMapButton" style="background-color:lightblue" onClick="addMap()">ADD MAP</button>
<!--
Map:<select id='providerMap' onchange='loadDSPMap()'>
<option value='0' selected>NoMap</option>
</select>
Service Zoom:<select id="ServiceMapZoom">
<option value="-1" selected>Entire State</option>
<option value="0">Northern Region</option>
<option value="1">Central Region</option>
<option value="2">Western Region</option>
<option value="-1">-</option>
<script>
        for (i=0;i<allFips.length;i++){
            document.write("<option value='"+allFips[i]+"'>"+simplemaps_statemap_mapdata.state_specific[allFips[i]].name+"</option>");  
        }
</script>
</select>
Rename this map to:<input type='text' id='MapRename' size=50>
<button type="button" id="renameMapButton" style="background-color:lightblue" onClick="renameMap()">Rename MAP</button>
<br><button type="button" id="deleteMapButton" style="background-color:lightblue" onClick="deleteMap()">DELETE THIS MAP</button>
<br>Add a map called:<input type='text' id='MapName' size=50>  With Service Zoom:<select id="NewServiceMapZoom">
<option value="-1" selected>Entire State</option>
<option value="0">Northern Region</option>
<option value="1">Central Region</option>
<option value="2">Western Region</option>
<option value="-1">-</option>
<script>
for (i=0;i<allFips.length;i++){
    document.write("<option value='"+allFips[i]+"'>"+simplemaps_statemap_mapdata.state_specific[allFips[i]].name+"</option>");  
}
</script>
</select>
<button type="button" id="addMapButton" style="background-color:lightblue" onClick="addMap()">ADD MAP</button>
-->
</div>
<div id="ServiceList"></div>
<br>Add a Service to this map:
<select id='newServiceDropDown'>
<option value='NONE'>PLEASE SELECT</option>
<script>
/*
var serviceCheck = dspsXML.getElementsByTagName("ServiceItem");
for (var i=0;i<serviceCheck.length;i++){
    availableServices.push(serviceCheck[i].innerHTML);
}
availableServices = removeDuplicates(availableServices);
availableServices.sort();
*/
for (var j=0;j<availableServices.length;j++){
    document.write("<option value='"+availableServices[j]+"'>"+availableServices[j]+"</option>");
}   
</script>
</select>
<button type="button" id="addServiceButton" style="background-color:lightblue" onClick="addService()">ADD SERVICE</button>
<br><br>
<center>
<!-- replace form action to handleEdit.php-->
<form method="post" action="handleEdit.php" onsubmit="createXML()">
<input type="hidden" name="xmlCode" value="NONE"/>
<input type="hidden" name="providerID" value="NONE"/>
<input type="submit" style="background-color:lightblue;height:50px;width:225px" value="SAVE THESE CHANGES TO THIS DSP">
<br>
</form>  

    <button type="button" style="background-color:lightblue;height:50px;width:225px" onclick="testPXML()">TEST XML</button>

</center>
</div>     
	</body>
</html>
