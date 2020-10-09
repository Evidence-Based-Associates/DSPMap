<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>ADMIN</title>
    <script src="mainmapdata.js"></script>
    <script src="statemap.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3syaKZAxQ_ku0EsmiaLtFwhZMqAUJP8s&callback=myMap"></script>
<script>
//var availableServices = ["Psychological Evaluation","CSOTP Services for Youth with Sexualized Behaviors","Licensed Mental Health Services","Home Based (including Intensive In-Home)","Therapeutic Day Treatment (TDT)","Gang Intervention","Life Skills Mentoring","Independent Living Placement","Residential Treatment","Substance Abuse Services","Electronic Monitoring","Group Interventions","Vocational Services"];   
    
function loadServiceName(textID,dropDownID){
    document.getElementById(textID).value = document.getElementById(dropDownID).value;
}
function RenameApprovedService(){
    var service = servicesXML.getElementsByTagName("Name");
    if (confirm("Are you sure?\rRename '"+document.getElementById("ApprovedServiceDropDown").value+"' to '"+document.getElementById("RenameApprovedServiceText").value+"'?")){
        for (var i=0; i<service.length; i++){
            if (service[i].innerHTML == document.getElementById("ApprovedServiceDropDown").value){
                service[i].innerHTML = document.getElementById("RenameApprovedServiceText").value;
            }
        }
        createServiceXML();
    }
}
function RenameService(){
    var service = dspsXML.getElementsByTagName("ServiceItem");
    if (confirm("Are you sure?\rRename '"+document.getElementById("RenameServiceDropDown").value+"' to '"+document.getElementById("RenameServiceText").value+"'?")){
        for (var i=0; i<service.length; i++){
            if (service[i].innerHTML == document.getElementById("RenameServiceDropDown").value){
                service[i].innerHTML = document.getElementById("RenameServiceText").value;
            }
        }
        createDSPXML();
    }
}
function DeleteServiceName(){
    var service = dspsXML.getElementsByTagName("ServiceItem");
    if (confirm("Are you sure?\rDelete '"+document.getElementById("RenameServiceDropDown").value+"'?")){
        for (var i=0; i<service.length; i++){
            if (service[i].innerHTML == document.getElementById("RenameServiceDropDown").value){
                service[i].parentNode.removeChild(service[i]);
            }
        }
        createDSPXML();
    }
}
function DeleteApprovedServiceName(){
    var service = servicesXML.getElementsByTagName("Name");
    if (confirm("Are you sure?\rDelete '"+document.getElementById("ApprovedServiceDropDown").value+"'?")){
        for (var i=0; i<service.length; i++){
            if (service[i].innerHTML == document.getElementById("ApprovedServiceDropDown").value){
                service[i].parentNode.removeChild(service[i]);
            }
        }
        createServiceXML();
    }
}
function AddApprovedServiceName(){
    var newService = servicesXML.createElement("Name");
    var serviceList = servicesXML.getElementsByTagName("ServiceList");
    newService.innerHTML = document.getElementById("RenameApprovedServiceText").value;
    serviceList[0].appendChild(newService);
    createServiceXML();
}
function createDSPXML(){   
    var xmlString = "";
    xmlString += dspsDTD.responseText;
    xmlString += '\r]>\r';
    xmlString += '<DSPs>\r';
    var dspsString = dspsXML.getElementsByTagName("DSPs");
    xmlString += dspsString[0].innerHTML;
    xmlString += '</DSPs>';
    document.getElementsByName("xmlCode")[0].value = xmlString;
    document.getElementsByName("fileName")[0].value = "dsps.xml";
    //alert(xmlString); 
}
function createServiceXML(){
    var xmlString = "";
    xmlString += servicesDTD.responseText;
    xmlString += '\r';
    xmlString += servicesXML.getElementsByTagName("ServiceList")[0].innerHTML;
    xmlString += '</ServiceList>';
    document.getElementsByName("xmlCode")[0].value = xmlString;
    document.getElementsByName("fileName")[0].value = "serviceList.xml";
    //alert(xmlString);  
}
</script>
  </head>
  <body>

<script>
document.write("<div style='background-color:"+EBABlue+";'><font color='000000' size='4'><center><h2><u>Quick Stats</u></h2></center></div>");
var providerCount = dspsXML.getElementsByTagName("Provider");
document.write("Current Number of Providers Listed: "+providerCount.length);
</script>
<script>document.write("<div style='background-color:"+EBABlue+";'><font color='000000' size='4'><center><h2><u>Adjust Service Names</u></h2></center></div>");</script>
<form action="handleAdmin.php" method="post">
<br>Service Names Currently Found in dsps.xml:
<select id='RenameServiceDropDown' onchange="loadServiceName('RenameServiceText','RenameServiceDropDown')">
<option value='NONE'>PLEASE SELECT</option>
<script>
for (var j=0;j<availableServices.length;j++){
    document.write("<option value='"+availableServices[j]+"'>"+availableServices[j]+"</option>");
}   
</script>
</select>
<br>Rename to:<input type="text" id="RenameServiceText" size=50>
<input type="submit" style='background-color:lightblue' onclick="RenameService()" value="RENAME ALL">
<input type="submit" style='background-color:lightblue' onclick="DeleteServiceName()" value="DELETE ALL">

<hr><br>Approved Services List:
<select id='ApprovedServiceDropDown' onchange="loadServiceName('RenameApprovedServiceText','ApprovedServiceDropDown')">
<option value='NONE'>PLEASE SELECT</option>
<script>
var approvedServices = servicesXML.getElementsByTagName("Name");
for (var j=0;j<approvedServices.length;j++){
    document.write("<option value='"+approvedServices[j].innerHTML+"'>"+approvedServices[j].innerHTML+"</option>");
}   
</script>
</select>
<br>Rename to:<input type="text" id="RenameApprovedServiceText" size=50>
<input type="submit" style='background-color:lightblue' onclick="RenameApprovedService()" value="RENAME">
<input type="submit" style='background-color:lightblue' onclick="DeleteApprovedServiceName()" value="DELETE">
<input type="submit" style='background-color:lightblue' onclick="AddApprovedServiceName()" value="ADD SERVICE">
<input type="hidden" name="xmlCode" value="NONE">
<input type="hidden" name="fileName" value="NONE">
</form>
<div id="DSPInfo">
<script>document.write("<div style='background-color:"+EBABlue+";'><font color='000000' size='4'><center><h2><u>DSP General Info</u></h2></center></div>");</script>

Provider ID:
<input type="text" name="DSPID" value="" size=3 style="background-color : #d1d1d1;" readonly>
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

</div>
<div id="ServiceList"></div>
<br>Add a Service to this map:
<select id='newServiceDropDown'>
<option value='NONE'>PLEASE SELECT</option>
<script>
for (var j=0;j<availableServices.length;j++){
    document.write("<option value='"+availableServices[j]+"'>"+availableServices[j]+"</option>");
}   
</script>
</select>
<button type="button" id="addServiceButton" style="background-color:lightblue" onClick="addService()">ADD SERVICE</button>
<br><br>
<center>
<!-- 
<form method="post" action="handleEdit.php" onsubmit="createDSPXML()">
<input type="hidden" name="xmlCode" value="NONE"/>
<input type="hidden" name="providerID" value="NONE"/>
<input type="submit" style="background-color:lightblue;height:50px;width:225px" value="SAVE THESE CHANGES TO THIS DSP">
<br>
</form>
<br>
-->
<form method="post" action="handleSelfServ.php" onsubmit="createDSPXML()">
<textarea name="commentBox" rows="4" cols="50">
Please describe the changes your are requesting. Example "I'm adding a new office in ...."    
</textarea><br>
<input type="submit" style="background-color:lightblue;height:50px;width:225px" value="Submit Change Request">
<input type="hidden" name="DSPXMLCode" value="NONE"/>
<input type="hidden" name="submitterName" value="NONE"/>
<input type="hidden" name="submitterE" value="NONE"/>
</form>
<!--
<button type="button" id="testButton" style="background-color:lightblue" onClick="testCreateDSPXML()">TEST XML</button>
-->
</center>
</div>     
	</body>
</html>
